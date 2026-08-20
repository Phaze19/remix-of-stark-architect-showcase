/**
 * Global image failure handling.
 *
 * - Logs a console error with the failing URL so missing images are obvious.
 * - Applies a visible "IMAGE UNAVAILABLE" placeholder in place of the broken image.
 *
 * Uses a capturing listener on window because <img> error events do not bubble.
 */
const FLAG = "data-image-failed";

const PLACEHOLDER_STYLE_ID = "image-fallback-styles";

const injectStyles = () => {
  if (document.getElementById(PLACEHOLDER_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = PLACEHOLDER_STYLE_ID;
  style.textContent = `
img[${FLAG}] {
  background-color: hsl(var(--muted));
  background-image:
    repeating-linear-gradient(
      45deg,
      hsl(var(--muted-foreground) / 0.12) 0 8px,
      transparent 8px 16px
    );
  border: 1px dashed hsl(var(--muted-foreground) / 0.4);
  object-fit: contain;
  min-height: 120px;
  position: relative;
}
img[${FLAG}]::after {
  content: "IMAGE UNAVAILABLE";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans, sans-serif);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: hsl(var(--muted-foreground));
  background-color: hsl(var(--muted));
  text-align: center;
  padding: 0.5rem;
}
`;
  document.head.appendChild(style);
};

export const initImageFallback = () => {
  if (typeof window === "undefined") return;
  injectStyles();

  window.addEventListener(
    "error",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.tagName !== "IMG") return;
      const img = target as HTMLImageElement;
      if (img.hasAttribute(FLAG)) return;

      img.setAttribute(FLAG, "true");
      img.setAttribute("data-original-src", img.currentSrc || img.src);
      // Neutralize the broken-image glyph while keeping layout intact.
      img.removeAttribute("srcset");
      img.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="4" height="3"></svg>'
        );

      console.error(
        `[image-fallback] Failed to load image: ${img.getAttribute("data-original-src")}`,
        { alt: img.alt || "(no alt)", element: img }
      );
    },
    true
  );
};
