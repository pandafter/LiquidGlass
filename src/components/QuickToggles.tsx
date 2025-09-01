import GlassCard from "./GlassCard";
import GlassBedSwitch from "./GlassBedSwitch";

export type ToggleItem = {
  id: string;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  bedOn?: string;
  bedOff?: string;
  bgColorOn?: string;
  bgColorOff?: string;
};

type Props = {
  title?: string;
  subtitle?: string;
  items: ToggleItem[];
};

export default function QuickToggles({
  title = "Preferencias",
  subtitle = "Controles rápidos",
  items
}: Props) {
  return (
    <GlassCard title={title} subtitle={subtitle} className="backdrop-blur-md bg-white/5">
      <ul className="space-y-5">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between">
            <span className="text-white/90">{it.label}</span>
            <GlassBedSwitch
              checked={it.value}
              onChange={it.onChange}
              width={68}
              thumbSize={28}
              bedOn={it.bedOn ?? "#22c55e33"}
              bedOff={it.bedOff ?? "#ffffff18"}
              bgColor={it.value ? it.bgColorOn : it.bgColorOff}
            />
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
