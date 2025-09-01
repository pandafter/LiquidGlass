import React from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import IOS26Button from "./iOS26Button";

type GlassBedSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  width?: number;
  height?: number;
  padding?: number;
  bedOn?: string;
  bedOff?: string;
  trackRadius?: number;
  thumbSize?: number;
  strokeWidth?: number;
  intensity?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  bgColor?: string;
  content?: React.ReactNode;
  glowOn?: string;
  glowOff?: string;

  /** tuning visual del “vidrio pulido” del thumb */
  thumbCenterBlur?: number; // px
  thumbEdgeBlur?: number;   // px
  thumbVignette?: number;   // 0..1
  thumbFeather?: number;    // px
};

export default function GlassBedSwitch({
  bgColor,
  checked,
  onChange,
  width = 68,
  height,
  padding = 3,
  bedOn = "#22c55e33",
  bedOff = "#ffffff18",
  trackRadius = 999,
  thumbSize = 28,
  strokeWidth = 2,
  intensity = 0.95,
  onClick,
  className,
  style,
  content,
  glowOn = "#22c55e55",
  glowOff = "transparent",
  // valores suaves para “piedra pulida”
  thumbCenterBlur = 1,
  thumbEdgeBlur = 8,
  thumbVignette = 0.62,
  thumbFeather = 34,
}: GlassBedSwitchProps) {
  const H = height ?? Math.max(thumbSize + padding * 2, Math.round(width / 2));
  const radius = Math.min(trackRadius, H / 2);

  const xMin = padding;
  const xMax = width - padding - thumbSize;
  const midpoint = (xMin + xMax) / 2;

  const x = useMotionValue(checked ? xMax : xMin);

  React.useEffect(() => {
    const target = checked ? xMax : xMin;
    const controls = animate(x, target, { type: "spring", stiffness: 500, damping: 40 });
    return controls.stop;
  }, [checked, x, xMax, xMin]);

  function toggle(to?: boolean) {
    const next = typeof to === "boolean" ? to : !checked;
    onChange(next);
  }

  return (
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className={className}
      style={{
        position: "relative",
        width,
        height: H,
        borderRadius: radius,
        cursor: "pointer",
        outline: "none",
        userSelect: "none",
        ...style,
      }}
      onClick={(e) => { e.preventDefault(); onClick?.(); toggle(); }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.code === "Space") { e.preventDefault(); toggle(); }
        if (e.key === "ArrowLeft") toggle(false);
        if (e.key === "ArrowRight") toggle(true);
      }}
    >
      {/* TRACK / CAMA */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background: checked ? bedOn : bedOff,
          transition: "background-color 200ms ease, box-shadow 220ms ease",
          boxShadow: [
            "inset 0 0 0 1px #ffffff12",
            checked ? `0 6px 20px ${glowOn}` : `0 6px 16px ${glowOff}`
          ].join(", "),
        }}
      />

      {/* BANDA INTERIOR OPCIONAL */}
      {bgColor && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: radius,
            boxSizing: "border-box",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "50%",
              backgroundColor: bgColor,
              borderRadius: radius,
              boxShadow: `0 0 6px 0px ${bgColor}`,
              transition: "background-color 120ms ease, opacity 160ms ease",
              opacity: 0.9,
            }}
          />
        </div>
      )}

      {/* THUMB (vidrio/piedra) — draggeable */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: padding,
          left: 0,
          x,
          width: thumbSize,
          height: thumbSize,
          borderRadius: thumbSize / 2,
        }}
        drag="x"
        dragConstraints={{ left: xMin, right: xMax }}
        dragElastic={0.12}
        dragMomentum={false}
        whileTap={{ scale: 0.97, filter: "brightness(0.98)" }}
        onDragEnd={() => {
          const current = x.get();
          const snapToOn = current > midpoint;
          const target = snapToOn ? xMax : xMin;
          animate(x, target, { type: "spring", stiffness: 600, damping: 38 });
          if (snapToOn !== checked) onChange(snapToOn);
        }}
      >
        {/* Capa de volumen: sombra interior muy leve */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow: "inset 0 1px 4px rgba(0,0,0,0.12)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* “Piedra pulida”: reutiliza IOS26Button con blur radial sutil y bordes diagonales */}
        <IOS26Button
          // NO actuará como botón: lo volvemos sólo visual
          onClick={undefined}
          className="thumb-glass"
          accent="auto"
          autoAccent
          radius={thumbSize / 2}
          strokeWidth={strokeWidth}
          intensity={intensity}
          cornerPair="tl-br"
          bg="rgba(255,255,255,0.10)"
          // blur radial suave (centro más limpio, bordes difusos)
          centerBlur={thumbCenterBlur}
          edgeBlur={thumbEdgeBlur}
          vignette={thumbVignette}
          feather={thumbFeather}
          style={{
            width: "100%",
            height: "100%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            borderRadius: thumbSize / 2,
            background: "transparent",
            backdropFilter: "saturate(140%)", // el blur lo aplican las capas internas del compo
            WebkitBackdropFilter: "saturate(140%)",
            pointerEvents: "none", // ← no captura clics; el drag vive en el motion.div
          }}
        >
          {content}
        </IOS26Button>

        {/* Highlight especular (reflexión) — sutil, adaptado a la forma */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 2,
            // mezcla de un reflejo superior y un toque lateral
            background:
              "radial-gradient(120% 80% at 50% -20%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)," +
              "linear-gradient(120deg, rgba(255,255,255,0.14), rgba(255,255,255,0.0) 40%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 70%, rgba(0,0,0,0))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.15) 70%, rgba(0,0,0,0))",
          }}
        />
      </motion.div>
    </div>
  );
}
