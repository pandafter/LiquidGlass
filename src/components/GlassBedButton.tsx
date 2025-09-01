import React from "react";
import IOS26Button from "./iOS26Button";

type GlassBedButtonProps = {
  children?: React.ReactNode;
  /** color de la cama (debajo del vidrio) */
  bedColor?: string;
  /** halo/glow exterior (opcional) */
  glowColor?: string;
  /** radio en px */
  radius?: number;
  /** tamaño (OBLIGATORIO si quieres uniformidad fija) */
  width: number | string;
  height: number | string;
  /** borde del vidrio */
  strokeWidth?: number;
  /** intensidad del borde (0..1) */
  intensity?: number;
  /** diagonal de color */
  cornerPair?: "tl-br" | "tr-bl";
  /** padding interno solo para el contenido (no altera el tamaño total) */
  contentPadding?: number | string;
  /** callbacks y estilos */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

/** Botón: cama coloreada + vidrio encima. TODAS las capas comparten EXACTO tamaño (100%). */
export default function GlassBedButton({
  children,
  bedColor = "#4da3ff22",
  glowColor,
  radius = 18,
  width,
  height,
  strokeWidth = 2,
  intensity = 0.95,
  cornerPair = "tl-br",
  contentPadding = 0,
  onClick,
  className,
  style,
}: GlassBedButtonProps) {
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const hostRef = React.useRef<HTMLDivElement>(null);
  const rippleId = React.useRef(0);

  function addRipple(e: React.PointerEvent<HTMLDivElement>) {
    if (!hostRef.current) return;
    const rect = hostRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 1.2; // círculo suficientemente grande
    const id = ++rippleId.current;
    setRipples((rs) => [...rs, { id, x, y, size }]);
    setTimeout(() => setRipples((rs) => rs.filter((r) => r.id !== id)), 520);
  }

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        // ⬇️ Tamaño maestro del botón (todo lo demás hereda 100%)
        width,
        height,
        borderRadius: radius,
        transformOrigin: "center",
        ...style,
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => { setHover(false); setPressed(false); }}
      onPointerDown={(e) => { setPressed(true); addRipple(e); }}
      onPointerUp={() => setPressed(false)}
      onClick={(e) => { e.preventDefault(); onClick?.(); }}
    >
      {/* CAMA (color real) — mismo tamaño */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: radius,
          background: bedColor,
          transition: "background-color 220ms ease, box-shadow 240ms ease, transform 180ms ease",
          boxShadow: [
            "inset 0 0 0 1px #ffffff14",
            hover ? `0 6px 24px ${glowColor ?? "transparent"}` : `0 2px 10px rgba(0,0,0,0.15)`
          ].join(", "),
          transform: pressed ? "scale(0.998)" : "scale(1)",
        }}
      />

      {/* RIPPLE (bajo el vidrio) — mismo tamaño */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: radius,
          overflow: "hidden",
          pointerEvents: "none",
          mixBlendMode: "soft-light",
        }}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              transform: "translate(-50%, -50%)",
              borderRadius: 9999,
              background: glowColor ?? "#ffffff66",
              opacity: 0.35,
              animation: "gbb-ripple 520ms ease-out forwards",
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* VIDRIO (iOS26) — mismo tamaño */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "inline-flex",
          borderRadius: radius,
          transform: pressed ? "scale(0.97)" : hover ? "scale(1.01)" : "scale(1)",
          transition: "transform 140ms ease, filter 180ms ease",
          filter: pressed ? "brightness(0.98)" : "none",
          overflow: "hidden", // por seguridad visual en escalado
        }}
      >
        <IOS26Button
          accent="auto"
          autoAccent
          bg="#ffffff0a"
          radius={radius}
          strokeWidth={strokeWidth}
          cornerPair={cornerPair}
          intensity={intensity}
          onClick={onClick}
          // ⬇️ Forzamos relleno al 100% del wrapper
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            backdropFilter: "saturate(140%) blur(8px)",
            WebkitBackdropFilter: "saturate(140%) blur(8px)",
          }}
        >
          {/* El contenido se centra, pero sin alterar el tamaño del botón */}
          <div
            style={{
              padding: contentPadding,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: radius,
            }}
          >
            {children}
          </div>
        </IOS26Button>
      </div>

      {/* keyframes del ripple */}
      <style>{`
        @keyframes gbb-ripple {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0.35; }
          70%  { opacity: 0.18; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
