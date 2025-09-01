import React from "react";

type CSSVars = { [key: `--${string}`]: string | number };

type IOS26ButtonProps = {
  children?: React.ReactNode;
  accent?: string;
  autoAccent?: boolean;
  bg?: string;
  radius?: number;
  strokeWidth?: number;
  cornerPair?: "tl-br" | "tr-bl";
  intensity?: number;
  /** Blur global legacy (si lo usas) */
  blur?: number;
  padding?: number;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;

  /** NUEVO: blur con degradado centro→bordes */
  centerBlur?: number;   // px (ej 2)
  edgeBlur?: number;     // px (ej 10)
  vignette?: number;     // 0..1 hueco central relativo (ej 0.46)
  feather?: number;      // px transición suave (ej 18)
};

export default function IOS26Button({
  children,
  accent = "hsla(360 100% 100% / 0.02)",
  autoAccent,
  bg = "hsla(360 100% 100% / 0.02)",
  radius = 18,
  strokeWidth = 2,
  cornerPair = "tl-br",
  intensity = 0.9,
  blur = 0, // mantiene compatibilidad
  padding = 12,
  width,
  height,
  onClick,
  className,
  style,
  // defaults “agradables”
  centerBlur = 1,
  edgeBlur = 10,
  vignette = 0.8,
  feather = 30,
}: IOS26ButtonProps) {
  const rawId = React.useId();
  const safeId = React.useMemo(() => rawId.replace(/[^a-zA-Z0-9_-]/g, ""), [rawId]);
  const gradId = `ios26-stroke-${safeId}`;
  const maskId = `ios26-ring-mask-${safeId}`;

  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const [computedAccent, setComputedAccent] = React.useState<string | null>(null);

  React.useLayoutEffect(() => {
    const node = btnRef.current;
    if (!node) return;

    const shouldAuto = autoAccent || accent === "auto";
    if (!shouldAuto) {
      setComputedAccent(null);
      return;
    }

    const container = node.closest<HTMLElement>("[data-gradient-container]");
    if (!container) {
      setComputedAccent(null);
      return;
    }

    const styles = getComputedStyle(container);
    const from = (styles.getPropertyValue("--grad-from").trim() || "#2563EB").toUpperCase();
    const to = (styles.getPropertyValue("--grad-to").trim() || "#4338CA").toUpperCase();

    function recalc() {
      if (!btnRef.current) return;
      const btnRect = btnRef.current.getBoundingClientRect();
      const contRect = container!.getBoundingClientRect();
      if (contRect.height <= 0) return;
      const centerY = btnRect.top + btnRect.height / 2;
      const t = clamp01((centerY - contRect.top) / contRect.height);
      const c = lerpHex(from, to, t);
      setComputedAccent(c);
    }

    const ro = new ResizeObserver(() => recalc());
    ro.observe(node);
    window.addEventListener("scroll", recalc, { passive: true });
    window.addEventListener("resize", recalc);
    recalc();

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", recalc);
      window.removeEventListener("resize", recalc);
    };
  }, [autoAccent, accent]);

  const diagonal =
    cornerPair === "tl-br"
      ? { x1: 0, y1: 0, x2: 1, y2: 1 }
      : { x1: 1, y1: 0, x2: 0, y2: 1 };

  const strong = Math.max(0, Math.min(1, intensity));
  const innerA = 0.18;
  const innerB = 0.82;
  const inset = strokeWidth / 2;

  const finalAccent = (autoAccent || accent === "auto") && computedAccent ? computedAccent : accent;

  const styleVars: React.CSSProperties & CSSVars = {
    ["--btn-accent"]: finalAccent,
    ["--btn-bg"]: bg,
    ["--btn-radius"]: `${radius}px`,
    ["--btn-stroke"]: `${strokeWidth}px`,
    ["--btn-intensity"]: String(strong),
    ["--btn-padding"]: `${padding}px`,
    ["--btn-blur"]: `${blur}px`,

    // NUEVOS vars de blur radial
    ["--btn-blur-center"]: `${Math.max(0, centerBlur)}px`,
    ["--btn-blur-edge"]: `${Math.max(0, edgeBlur)}px`,
    // porcentaje del hueco central sin blur (0..100%)
    ["--btn-vignette"]: `${Math.round(clamp01(vignette) * 100)}%`,
    // feather/soften del borde de la máscara
    ["--btn-feather"]: `${Math.max(0, feather)}px`,
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={className}
      style={{
        ...styleVars,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
        background: "transparent",
        padding: 0,
        width,
        height,
        cursor: "pointer",
        borderRadius: radius,
        overflow: "hidden", // asegura que los layers respeten la forma
        ...style,
      }}
    >
      {/* Fondo (relleno interno) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: `linear-gradient(180deg, color-mix(in oklab, var(--btn-bg), #ffffff 4%), var(--btn-bg))`,
        }}
      />

      {/* BLUR BASE uniforme (suave) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          // blur suave en toda el área
          backdropFilter: "saturate(140%) blur(var(--btn-blur-center))",
          WebkitBackdropFilter: "saturate(140%) blur(var(--btn-blur-center))",
        }}
      />

      {/* BLUR DE BORDES (más fuerte) con máscara radial (centro transparente) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          backdropFilter: "blur(var(--btn-blur-edge))",
          WebkitBackdropFilter: "blur(var(--btn-blur-edge))",
          // máscara: centro TRANSPARENTE, bordes OPACOS → el blur fuerte sólo afecta bordes
          maskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0) var(--btn-vignette), rgba(0,0,0,1) calc(var(--btn-vignette) + var(--btn-feather)))",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0) var(--btn-vignette), rgba(0,0,0,1) calc(var(--btn-vignette) + var(--btn-feather)))",
        }}
      />

      {/* Borde diagonal en la línea */}
      <svg
        aria-hidden
        width="100%"
        height="100%"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: `var(--btn-radius)`,
          filter: blur > 0 ? `blur(var(--btn-blur))` : undefined,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient
            id={gradId}
            x1={diagonal.x1}
            y1={diagonal.y1}
            x2={diagonal.x2}
            y2={diagonal.y2}
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="var(--btn-accent)" stopOpacity={strong} />
            <stop offset={`${innerA * 100}%`} stopColor="var(--btn-accent)" stopOpacity="0" />
            <stop offset={`${innerB * 100}%`} stopColor="var(--btn-accent)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--btn-accent)" stopOpacity={strong} />
          </linearGradient>

          <mask id={maskId}>
            <rect x="0" y="0" width="100" height="40" rx={pxToView(radius)} ry={pxToView(radius)} fill="white" />
            <rect
              x={pxToView(inset, 100)}
              y={pxToView(inset, 40)}
              width={100 - pxToView(inset, 100) * 2}
              height={40 - pxToView(inset, 40) * 2}
              rx={pxToView(Math.max(0, radius - strokeWidth))}
              ry={pxToView(Math.max(0, radius - strokeWidth))}
              fill="black"
            />
          </mask>
        </defs>

        <rect
          x="0"
          y="0"
          width="100"
          height="40"
          rx={pxToView(radius)}
          ry={pxToView(radius)}
          fill={`url(#${gradId})`}
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          borderRadius: `var(--btn-radius)`,
          padding: "var(--btn-padding)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          lineHeight: 1.1,
          userSelect: "none",
          gap: 8,
        }}
      >
        {children ?? ""}
      </div>
    </button>
  );
}

/* Helpers */
function pxToView(px: number, axis: 40 | 100 = 40) {
  const v = Math.max(0, px);
  const unit = axis === 40 ? 1 : 2.5;
  return Math.min(axis / 2, v * unit);
}
function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
function lerpHex(a: string, b: string, t: number) {
  const ca = hexToRgb(a); const cb = hexToRgb(b); if (!ca || !cb) return a;
  const r = Math.round(ca.r + (cb.r - ca.r) * t);
  const g = Math.round(ca.g + (cb.g - ca.g) * t);
  const bl = Math.round(ca.b + (cb.b - ca.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}
function hexToRgb(hex: string) {
  let h = hex.trim();
  if (h.startsWith("rgb")) {
    const m = h.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (m) return { r: +m[1], g: +m[2], b: +m[3] };
    return null;
  }
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3) {
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return { r, g, b };
  }
  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return { r, g, b };
  }
  return null;
}
