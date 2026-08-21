const ICONS = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5a2.89 2.89 0 0 1-2.89-2.89a2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05a6.34 6.34 0 0 0-6.34 6.34a6.34 6.34 0 0 0 6.34 6.34a6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>`,
  pinterest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.41l1.52-6.43s-.39-.77-.39-1.92c0-1.8 1.04-3.14 2.34-3.14c1.1 0 1.64.83 1.64 1.82c0 1.11-.71 2.77-1.07 4.31c-.3 1.29.64 2.34 1.9 2.34c2.28 0 3.83-2.92 3.83-6.38c0-2.63-1.77-4.63-4.97-4.63c-3.63 0-5.9 2.71-5.9 5.74c0 1.04.3 1.78.77 2.35c.22.26.25.36.17.66l-.28 1.1c-.09.36-.36.49-.66.36c-1.83-.75-2.69-2.77-2.69-5.04c0-3.75 3.17-8.23 9.47-8.23c5.04 0 8.37 3.66 8.37 7.58c0 5.2-2.88 9.1-7.1 9.1c-1.42 0-2.76-.77-3.22-1.64l-.93 3.63c-.28 1.03-1.03 2.32-1.53 3.1A12 12 0 1 0 12 0z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`
};

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("sociallinks-wrapper");
  if (!wrapper) return;

  const shop = wrapper.getAttribute("data-shop");
  if (!shop) return;

  fetch(`/apps/sociallinks-bar/api/settings?shop=${shop}`)
    .then((res) => res.json())
    .then((settings) => {
      if (!settings || settings.error) return;

      const platforms = ["facebook", "instagram", "twitter", "youtube", "tiktok", "pinterest", "linkedin", "whatsapp"];
      let enabledLinks = platforms.filter((p) => settings[`${p}Enabled`]);

      if (settings.currentPlan === "free") {
        enabledLinks = enabledLinks.filter((p) => ["facebook", "instagram", "twitter"].includes(p));
      }

      if (enabledLinks.length === 0) return;

      // Inject premium CSS
      const styleId = "sociallinks-premium-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          .sociallinks-bar-wrapper {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
          }
          .sociallinks-bar-wrapper:hover {
            transform: translateY(-3px) scale(1.02);
            filter: brightness(1.05);
          }
          .sociallinks-bar-wrapper a {
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, filter 0.25s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.85;
          }
          .sociallinks-bar-wrapper a:hover {
            transform: scale(1.2) translateY(-2px);
            opacity: 1;
            filter: brightness(1.2);
          }
        `;
        document.head.appendChild(style);
      }

      const bar = document.createElement("div");
      bar.className = "sociallinks-bar-wrapper";

      // Template styles
      let template = settings.selectedTemplate || "minimal";
      let baseStyles = "gap: 14px;";

      let background = "rgba(255, 255, 255, 0.95)";
      let border = "1px solid #eaeaea";
      let color = "#333333";
      let borderRadius = "8px";
      let padding = "8px 14px";
      let boxShadow = "0 2px 10px rgba(0,0,0,0.05)";

      if (template === "bold") {
        background = "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)";
        border = "none";
        color = "#FFFFFF";
        borderRadius = "16px";
        padding = "12px 18px";
        boxShadow = "0 8px 20px rgba(255, 75, 43, 0.4)";
      } else if (template === "elegant") {
        background = "#fdfbf7";
        border = "1px solid #d4af37";
        color = "#d4af37";
        borderRadius = "50px";
        padding = "10px 24px";
        boxShadow = "0 10px 25px rgba(212, 175, 55, 0.15)";
      } else if (template === "dark") {
        background = "#111111";
        border = "1px solid #00ffcc";
        color = "#00ffcc";
        borderRadius = "4px";
        padding = "10px 16px";
        boxShadow = "0 0 15px rgba(0, 255, 204, 0.3)";
      } else if (template === "glass") {
        background = "rgba(255, 255, 255, 0.25)";
        border = "1px solid rgba(255, 255, 255, 0.4)";
        color = "#1f1f1f";
        borderRadius = "24px";
        padding = "12px 18px";
        boxShadow = "0 8px 32px 0 rgba(31, 38, 135, 0.15)";
      }

      if (settings.currentPlan === "pro") {
        if (settings.bgColor) background = settings.bgColor;
        if (settings.iconColor) color = settings.iconColor;
      }

      // Positioning
      let posStyles = "";
      if (settings.position === "left") {
        posStyles = "position: fixed; left: 20px; top: 50%; transform: translateY(-50%); flex-direction: column;";
      } else if (settings.position === "right") {
        posStyles = "position: fixed; right: 20px; top: 50%; transform: translateY(-50%); flex-direction: column;";
      } else {
        posStyles = "position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); flex-direction: row;";
      }

      bar.style.cssText = `${baseStyles} background: ${background}; border: ${border}; border-radius: ${borderRadius}; padding: ${padding}; box-shadow: ${boxShadow}; ${posStyles}`;

      enabledLinks.forEach((p) => {
        const a = document.createElement("a");
        a.href = settings[`${p}Url`] || "#";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.style.cssText = `color: ${color}; width: ${settings.iconSize}; height: ${settings.iconSize}; display: flex; align-items: center; justify-content: center;`;
        a.innerHTML = ICONS[p];
        bar.appendChild(a);
      });

      document.body.appendChild(bar);
    })
    .catch((err) => console.error("SocialLinks error:", err));
});
