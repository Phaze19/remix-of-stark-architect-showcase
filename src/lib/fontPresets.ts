export type FontPresetId =
  | "editorial-serif"
  | "modern-industrial"
  | "corporate-trust"
  | "precision-tech";

export type FontPreset = {
  id: FontPresetId;
  label: string;
  description: string;
  display: string;
  body: string;
};

export const FONT_PRESETS: FontPreset[] = [
  {
    id: "editorial-serif",
    label: "Editorial Serif",
    description: "Instrument Serif · Work Sans",
    display: "'Instrument Serif', 'Work Sans', serif",
    body: "'Work Sans', system-ui, sans-serif",
  },
  {
    id: "modern-industrial",
    label: "Modern Industrial",
    description: "Space Grotesk · DM Sans",
    display: "'Space Grotesk', 'DM Sans', sans-serif",
    body: "'DM Sans', system-ui, sans-serif",
  },
  {
    id: "corporate-trust",
    label: "Corporate Trust",
    description: "Libre Baskerville · IBM Plex Sans",
    display: "'Libre Baskerville', Georgia, serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
  },
  {
    id: "precision-tech",
    label: "Precision Tech",
    description: "Sora · Manrope",
    display: "'Sora', 'Manrope', sans-serif",
    body: "'Manrope', system-ui, sans-serif",
  },
];

export const DEFAULT_FONT_PRESET: FontPresetId = "editorial-serif";
export const FONT_PRESET_STORAGE_KEY = "rational-font-preset";

export const applyFontPreset = (id: FontPresetId) => {
  const preset = FONT_PRESETS.find((p) => p.id === id) ?? FONT_PRESETS[0];
  const root = document.documentElement;
  root.style.setProperty("--font-display", preset.display);
  root.style.setProperty("--font-sans", preset.body);
  root.dataset.fontPreset = preset.id;
};
