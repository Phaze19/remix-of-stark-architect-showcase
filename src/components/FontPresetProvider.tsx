import * as React from "react";
import {
  DEFAULT_FONT_PRESET,
  FONT_PRESET_STORAGE_KEY,
  FONT_PRESETS,
  FontPresetId,
  applyFontPreset,
} from "@/lib/fontPresets";

type FontPresetState = {
  preset: FontPresetId;
  setPreset: (id: FontPresetId) => void;
};

const FontPresetContext = React.createContext<FontPresetState>({
  preset: DEFAULT_FONT_PRESET,
  setPreset: () => null,
});

const isValid = (value: string | null): value is FontPresetId =>
  !!value && FONT_PRESETS.some((p) => p.id === value);

export const FontPresetProvider = ({ children }: { children: React.ReactNode }) => {
  const [preset, setPresetState] = React.useState<FontPresetId>(() => {
    if (typeof window === "undefined") return DEFAULT_FONT_PRESET;
    const stored = window.localStorage.getItem(FONT_PRESET_STORAGE_KEY);
    return isValid(stored) ? stored : DEFAULT_FONT_PRESET;
  });

  React.useEffect(() => {
    applyFontPreset(preset);
  }, [preset]);

  const setPreset = React.useCallback((id: FontPresetId) => {
    setPresetState(id);
    try {
      window.localStorage.setItem(FONT_PRESET_STORAGE_KEY, id);
    } catch {
      /* storage unavailable — preset still applies for this session */
    }
  }, []);

  return (
    <FontPresetContext.Provider value={{ preset, setPreset }}>
      {children}
    </FontPresetContext.Provider>
  );
};

export const useFontPreset = () => React.useContext(FontPresetContext);
