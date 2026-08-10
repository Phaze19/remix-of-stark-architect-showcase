import { useState } from "react";
import { Type, X, Check } from "lucide-react";
import { useFontPreset } from "@/components/FontPresetProvider";
import { FONT_PRESETS } from "@/lib/fontPresets";

const FontPresetSwitcher = () => {
  const { preset, setPreset } = useFontPreset();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 print:hidden">
      {open && (
        <div className="w-[260px] border border-border bg-background shadow-elegant">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/50">
              Font Style
            </span>
            <button
              type="button"
              aria-label="Close font styles"
              onClick={() => setOpen(false)}
              className="text-foreground/50 transition-colors hover:text-rational-red"
            >
              <X size={14} />
            </button>
          </div>
          <ul>
            {FONT_PRESETS.map((option) => {
              const active = option.id === preset;
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => setPreset(option.id)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 border-b border-border/60 px-4 py-3 text-left transition-colors last:border-b-0 ${
                      active ? "bg-muted" : "hover:bg-muted/60"
                    }`}
                  >
                    <span>
                      <span
                        className="block text-lg leading-tight text-foreground"
                        style={{ fontFamily: option.display }}
                      >
                        {option.label}
                      </span>
                      <span
                        className="mt-0.5 block text-[11px] uppercase tracking-[0.12em] text-muted-foreground"
                        style={{ fontFamily: option.body }}
                      >
                        {option.description}
                      </span>
                    </span>
                    {active && <Check size={14} className="shrink-0 text-rational-red" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change font style"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center border border-border bg-background text-foreground shadow-elegant transition-colors hover:border-rational-red hover:text-rational-red"
      >
        <Type size={18} />
      </button>
    </div>
  );
};

export default FontPresetSwitcher;
