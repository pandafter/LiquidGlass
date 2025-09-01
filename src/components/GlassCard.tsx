import React from "react";
import IOS26Button from "./iOS26Button";

type Props = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export default function GlassCard({ title, subtitle, actions, className, children }: Props) {
  return (
    <section
      className={
        "rounded-2xl bg-white/5 backdrop-blur-md ring-1 ring-white/10 p-5 md:p-6 " +
        (className ?? "")
      }
    >
      <header className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-white/70 mt-0.5">{subtitle}</p>}
        </div>

        {actions ?? (
          <IOS26Button accent="auto" autoAccent bg="#ffffff12" radius={14} strokeWidth={2}>
            <div className="px-3 py-1.5 text-sm">Editar</div>
          </IOS26Button>
        )}
      </header>

      <div className="mt-4">{children}</div>
    </section>
  );
}
