import { useState } from "react";
import IOS26Button from "./components/iOS26Button";
import GlassBedButton from "./components/GlassBedButton";
import GlassCard from "./components/GlassCard";
import QuickToggles from "./components/QuickToggles";

export default function App() {
  const [wifi, setWifi] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [focus, setFocus] = useState(false);

  return (
    <div
      className="relative min-h-screen w-full text-white overflow-hidden"
      data-gradient-container
      style={
        {
          // Gradiente base para autoAccent
          ["--grad-from" as any]: "#2563EB",
          ["--grad-to" as any]: "#312E81",
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(255,255,255,0.22), rgba(255,255,255,0) 60%), radial-gradient(800px 800px at 85% 20%, rgba(99,102,241,0.35), rgba(99,102,241,0) 60%), radial-gradient(800px 800px at 15% 30%, rgba(59,130,246,0.35), rgba(59,130,246,0) 60%), linear-gradient(180deg, #2563EB 0%, #312E81 55%, #1E1B4B 100%)",
          isolation: "isolate",
        } as React.CSSProperties
      }
    >

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23n)%22 opacity=%220.5%22/></svg>')",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.15), rgba(255,255,255,0) 60%)" }}
      />


      <header className="relative z-10 mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <div className="font-semibold tracking-tight text-lg">Liquid Glass</div>
        <div className="text-white/75">Desarrollo UX/UI</div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-20">

        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            Vidrio Líquido para softwares modernos
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/85 max-w-3xl mx-auto">
            Componentes inspirados en iOS&nbsp;26: borde diagonal con acento dinámico,
            vidrio flotante y cama de color separada. Rendimiento, claridad y wow-factor.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 md:gap-6">
            <GlassBedButton
              width="12rem"
              height="3.5rem"
              bedColor="#a78bfa22"
              glowColor="#a78bfa55"
              radius={24}
              contentPadding="0.5rem 1rem"
            >
              Empezar ahora
            </GlassBedButton>

            <IOS26Button
              accent="auto"
              autoAccent
              bg="#ffffff16"
              radius={26}
              centerBlur={8}
              edgeBlur={10}
              vignette={0.8}
              feather={50}
              strokeWidth={2}
              intensity={0.92}
              style={{
                width: "12rem",
                height: "3.5rem",
                padding: 0,
                backdropFilter: "saturate(140%) blur(10px)",
                WebkitBackdropFilter: "saturate(140%) blur(10px)",
              }}
            >
              Ver demo
            </IOS26Button>
          </div>

          {/* Social proof light */}
          <div className="mt-10 opacity-80 text-sm">
            Confiado por equipos de data, fintech y plataformas B2B.
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="mt-16 md:mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          <GlassCard title="UX clara" subtitle="Menos fricción" className="bg-white/5 backdrop-blur-md">
            <ul className="text-white/85 text-sm space-y-2">
              <li>Lectura limpia y jerarquías visibles.</li>
              <li>Estados y feedback inmediatos.</li>
              <li>Interacciones suaves sin sobrecargar.</li>
            </ul>
          </GlassCard>

          <GlassCard title="Rendimiento" subtitle="Sin trucos pesados" className="bg-white/5 backdrop-blur-md">
            <ul className="text-white/85 text-sm space-y-2">
              <li>Sin postprocesado; CSS + SVG optimizados.</li>
              <li>Memo de cálculos sólo cuando importa.</li>
              <li>Compatibles con SSR e hidratan limpio.</li>
            </ul>
          </GlassCard>

          <GlassCard title="Accesible" subtitle="Teclado y ARIA" className="bg-white/5 backdrop-blur-md">
            <ul className="text-white/85 text-sm space-y-2">
              <li>Roles ARIA correctos, foco visible.</li>
              <li>Arrastre + teclado en switches.</li>
              <li>Contraste de borde configurable.</li>
            </ul>
          </GlassCard>
        </section>

        {/* DEMO INTERACTIVA (QuickToggles) */}
        <section className="mt-16 md:mt-24">
          <QuickToggles
            title="Panel interactivo"
            subtitle="Prueba el vidrio líquido"
            items={[
              { id: "wifi", label: "Wi-Fi", value: wifi, onChange: setWifi, bgColorOn: "#22c55e", bgColorOff: "#FF040033" },
              { id: "air", label: "Modo avión", value: airplane, onChange: setAirplane, bgColorOn: "#f59e0b", bgColorOff: "#FF040033" },
              { id: "focus", label: "Focus", value: focus, onChange: setFocus, bgColorOn: "#8b5cf6", bgColorOff: "#FF040033" },
            ]}
          />
        </section>

        {/* ACCIONES Y VARIANTES */}
        <section className="mt-16 md:mt-24 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Acciones rápidas */}
          <GlassCard title="Acciones" subtitle="Rápidas" className="backdrop-blur-md bg-white/5">
            <div className="grid grid-cols-2 gap-3">
              <GlassBedButton width="8rem" height="3rem" bedColor="#22c55e12" glowColor="#22c55e" radius={18}>
                Guardar
              </GlassBedButton>
              <GlassBedButton width="8rem" height="3rem" bedColor="#ef4444" glowColor="#ef4444" radius={18}>
                Borrar
              </GlassBedButton>

              <IOS26Button accent="auto" autoAccent bg="#ffffff12" radius={18} strokeWidth={2} style={{ width: "8rem", height: "3rem" }}>
                Compartir
              </IOS26Button>
              <IOS26Button accent="auto" autoAccent bg="#ffffff12" radius={18} strokeWidth={2} style={{ width: "8rem", height: "3rem" }}>
                Exportar
              </IOS26Button>
            </div>
          </GlassCard>

          {/* Variantes de botones */}
          <GlassCard title="Variantes" subtitle="iOS26Button" className="backdrop-blur-md bg-white/5">
            <div className="flex flex-wrap items-center gap-4">
              <IOS26Button accent="auto" autoAccent bg="#ffffff10" radius={28} strokeWidth={2} style={{ width: "10.5rem", height: "3rem" }}>
                Continuar
              </IOS26Button>

              <IOS26Button accent="auto" autoAccent bg="#ffffff10" radius={12} strokeWidth={2} style={{ width: 48, height: 48 }}>
                ➕
              </IOS26Button>

              <IOS26Button accent="auto" autoAccent bg="#ffffff06" radius={20} strokeWidth={2} style={{ width: "9rem", height: "2.75rem" }}>
                Secundario
              </IOS26Button>

              <IOS26Button accent="auto" autoAccent bg="#ffffff18" radius={20} intensity={0.97} strokeWidth={2} style={{ width: "9rem", height: "2.75rem" }}>
                Destacar
              </IOS26Button>
            </div>
          </GlassCard>

          {/* Borde diagonal showcase */}
          <GlassCard title="Borde diagonal" subtitle="Dos esquinas activas" className="backdrop-blur-md bg-white/5">
            <div className="flex flex-wrap items-center gap-4">
              <IOS26Button accent="auto" autoAccent bg="#ffffff10" radius={22} cornerPair="tl-br" style={{ width: "8.5rem", height: "2.75rem" }}>
                TL→BR
              </IOS26Button>
              <IOS26Button accent="auto" autoAccent bg="#ffffff10" radius={22} cornerPair="tr-bl" style={{ width: "8.5rem", height: "2.75rem" }}>
                TR→BL
              </IOS26Button>
              <IOS26Button accent="auto" autoAccent bg="#ffffff14" radius={14} strokeWidth={3} style={{ width: "8rem", height: "2.5rem" }}>
                Stroke 3
              </IOS26Button>
              <IOS26Button accent="auto" autoAccent bg="#ffffff08" radius={28} intensity={0.85} style={{ width: "10rem", height: "2.75rem" }}>
                Intensity 0.85
              </IOS26Button>
            </div>
          </GlassCard>
        </section>

        {/* CTA FINAL */}
        <section className="mt-20 md:mt-28 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Lleva tu producto al siguiente nivel</h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto">
            Integra nuestros componentes de vidrio líquido y dale a tu suite un acabado premium sin sacrificar desempeño.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <GlassBedButton width="12rem" height="3.25rem" bedColor="#22c55e22" glowColor="#22c55e55" radius={22}>
              Solicitar demo
            </GlassBedButton>
            <IOS26Button accent="auto" autoAccent bg="#ffffff14" radius={22} strokeWidth={2} style={{ width: "12rem", height: "3.25rem" }}>
              Documentación
            </IOS26Button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 md:mt-32 pb-16 text-center text-white/65">
          <div className="flex items-center justify-center gap-2">
            <span className="text-white/80">Hecho por</span>
            <span aria-hidden>Nicolas Leyva • Sebastian Rodriguez</span>
          </div>
          <div className="mt-2 text-sm">Inspirado en el look &amp; feel de iOS&nbsp;26.</div>
        </footer>
      </main>
    </div>
  );
}
