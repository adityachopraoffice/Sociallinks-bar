import { json } from "@remix-run/node";
import { useLoaderData, useSubmit, useActionData, useNavigation } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  TextField,
  Checkbox,
  Button,
  Banner,
  Select,
  Box
} from "@shopify/polaris";
import { useState, useEffect } from "react";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  let settings = await prisma.shopSettings.findUnique({
    where: { shop: session.shop },
  });

  if (!settings) {
    settings = await prisma.shopSettings.create({
      data: { shop: session.shop },
    });
  }

  return json({ settings });
};

export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const selectedTemplate = formData.get("selectedTemplate") || "minimal";
  const position = formData.get("position") || "right";
  const bgColor = formData.get("bgColor") !== null ? formData.get("bgColor") : "";
  const iconColor = formData.get("iconColor") !== null ? formData.get("iconColor") : "";
  const iconSize = formData.get("iconSize") || "24px";
  
  const updates = {
    selectedTemplate,
    position,
    bgColor,
    iconColor,
    iconSize,
  };

  const platforms = ["facebook", "instagram", "twitter", "youtube", "tiktok", "pinterest", "linkedin", "whatsapp"];
  for (const platform of platforms) {
    updates[`${platform}Enabled`] = formData.get(`${platform}Enabled`) === "true";
    updates[`${platform}Url`] = formData.get(`${platform}Url`) || "";
  }

  const settings = await prisma.shopSettings.update({
    where: { shop: session.shop },
    data: updates,
  });

  return json({ success: true, settings });
};

const ICONS = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5a2.89 2.89 0 0 1-2.89-2.89a2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05a6.34 6.34 0 0 0-6.34 6.34a6.34 6.34 0 0 0 6.34 6.34a6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>`,
  pinterest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.41l1.52-6.43s-.39-.77-.39-1.92c0-1.8 1.04-3.14 2.34-3.14c1.1 0 1.64.83 1.64 1.82c0 1.11-.71 2.77-1.07 4.31c-.3 1.29.64 2.34 1.9 2.34c2.28 0 3.83-2.92 3.83-6.38c0-2.63-1.77-4.63-4.97-4.63c-3.63 0-5.9 2.71-5.9 5.74c0 1.04.3 1.78.77 2.35c.22.26.25.36.17.66l-.28 1.1c-.09.36-.36.49-.66.36c-1.83-.75-2.69-2.77-2.69-5.04c0-3.75 3.17-8.23 9.47-8.23c5.04 0 8.37 3.66 8.37 7.58c0 5.2-2.88 9.1-7.1 9.1c-1.42 0-2.76-.77-3.22-1.64l-.93 3.63c-.28 1.03-1.03 2.32-1.53 3.1A12 12 0 1 0 12 0z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`
};

const PLATFORMS = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "twitter", label: "Twitter" },
  { id: "youtube", label: "YouTube" },
  { id: "tiktok", label: "TikTok" },
  { id: "pinterest", label: "Pinterest" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "whatsapp", label: "WhatsApp" },
];

export default function SettingsPage() {
  const { settings } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const nav = useNavigation();

  const [formState, setFormState] = useState(settings);

  useEffect(() => {
    if (actionData?.success && window.shopify) {
      window.shopify.toast.show("Settings saved");
    }
  }, [actionData]);

  const handleChange = (value, id) => {
    if (id === "selectedTemplate") {
      setFormState((prev) => ({ 
        ...prev, 
        [id]: value,
        bgColor: "",
        iconColor: ""
      }));
    } else {
      setFormState((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSave = () => {
    submit(formState, { method: "post" });
  };

  const isFree = formState.currentPlan === "free";
  const isBasic = formState.currentPlan === "basic";
  const isPro = formState.currentPlan === "pro";

  const getTemplateStyles = (templateId) => {
    let base = {
      display: "flex",
      gap: "14px",
      alignItems: "center",
      justifyContent: "center",
    };
    if (templateId === "minimal") {
      return { ...base, background: "rgba(255, 255, 255, 0.95)", border: "1px solid #eaeaea", color: "#333333", borderRadius: "8px", padding: "8px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" };
    }
    if (templateId === "bold") {
      return { ...base, background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", border: "none", color: "#FFFFFF", borderRadius: "16px", padding: "12px 18px", boxShadow: "0 8px 20px rgba(255, 75, 43, 0.4)" };
    }
    if (templateId === "elegant") {
      return { ...base, background: "#fdfbf7", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "50px", padding: "10px 24px", boxShadow: "0 10px 25px rgba(212, 175, 55, 0.15)" };
    }
    if (templateId === "dark") {
      return { ...base, background: "#111111", border: "1px solid #00ffcc", color: "#00ffcc", borderRadius: "4px", padding: "10px 16px", boxShadow: "0 0 15px rgba(0, 255, 204, 0.3)" };
    }
    if (templateId === "glass") {
      return { ...base, background: "rgba(255, 255, 255, 0.25)", border: "1px solid rgba(255, 255, 255, 0.4)", color: "#1f1f1f", borderRadius: "24px", padding: "12px 18px", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" };
    }
    return base;
  };

  const currentPreviewStyles = getTemplateStyles(formState.selectedTemplate);
  if (isPro) {
    if (formState.bgColor) currentPreviewStyles.background = formState.bgColor;
    if (formState.iconColor) currentPreviewStyles.color = formState.iconColor;
  }

  return (
    <Page title="SocialLinks Bar Settings">
      <Layout>
        {/* LEFT COLUMN: Configuration */}
        <Layout.Section variant="oneHalf">
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Social Links</Text>
                {isFree && (
                  <Banner title="Upgrade to Basic" status="info">
                    Unlock all 8 social platforms by upgrading to the Basic plan.
                  </Banner>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {PLATFORMS.map((platform, idx) => {
                  const isLocked = isFree && idx >= 3;
                  if (isLocked) return null;
                  return (
                    <Box key={platform.id} paddingBlockEnd="200">
                      <BlockStack gap="200">
                        <InlineStack align="start" blockAlign="center" gap="200">
                          <Checkbox
                            label={platform.label}
                            checked={formState[`${platform.id}Enabled`]}
                            onChange={(val) => handleChange(val, `${platform.id}Enabled`)}
                          />
                          <Box style={{ width: "20px", height: "20px" }} dangerouslySetInnerHTML={{ __html: ICONS[platform.id] }} />
                        </InlineStack>
                        <TextField
                          labelHidden
                          label={`${platform.label} URL`}
                          value={formState[`${platform.id}Url`]}
                          onChange={(val) => handleChange(val, `${platform.id}Url`)}
                          autoComplete="off"
                          placeholder={`Enter ${platform.label} URL`}
                        />
                      </BlockStack>
                    </Box>
                  );
                })}
                </div>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Colors & Sizing</Text>
                {!isPro && (
                  <Banner title="Upgrade to Pro" status="info">
                    Unlock custom colors by upgrading to the Pro plan.
                  </Banner>
                )}
                <TextField
                  label="Custom Background Color (Leave empty for template default)"
                  value={formState.bgColor}
                  onChange={(val) => handleChange(val, "bgColor")}
                  disabled={!isPro}
                  autoComplete="off"
                  clearButton
                  onClearButtonClick={() => handleChange("", "bgColor")}
                  placeholder="e.g. #FF0000 or linear-gradient(...)"
                />
                <TextField
                  label="Custom Icon Color (Leave empty for template default)"
                  value={formState.iconColor}
                  onChange={(val) => handleChange(val, "iconColor")}
                  disabled={!isPro}
                  autoComplete="off"
                  clearButton
                  onClearButtonClick={() => handleChange("", "iconColor")}
                  placeholder="e.g. #FFFFFF"
                />
                <TextField
                  label="Icon Size (e.g. 24px)"
                  value={formState.iconSize}
                  onChange={(val) => handleChange(val, "iconSize")}
                  autoComplete="off"
                />
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>

        {/* RIGHT COLUMN: Appearance & Preview */}
        <Layout.Section variant="oneHalf">
          <div style={{ position: "sticky", top: "20px" }}>
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Appearance</Text>
                  <Select
                    label="Position"
                    options={[
                      { label: "Left", value: "left" },
                      { label: "Right", value: "right" },
                      { label: "Bottom Center", value: "bottom" },
                    ]}
                    value={formState.position}
                    onChange={(val) => handleChange(val, "position")}
                  />
                  
                  <Text variant="headingSm" as="h3">Templates</Text>
                  {(isFree) && (
                    <Banner title="Upgrade to Basic" status="info">
                      Unlock Bold, Elegant, Dark, and Glass templates.
                    </Banner>
                  )}
                  <InlineStack gap="400" wrap={true}>
                    {["minimal", "bold", "elegant", "dark", "glass"].map((template) => {
                      const locked = isFree && template !== "minimal";
                      return (
                        <Box 
                          key={template}
                          onClick={() => !locked && handleChange(template, "selectedTemplate")}
                          padding="400"
                          style={{
                            cursor: locked ? "not-allowed" : "pointer",
                            opacity: locked ? 0.5 : 1,
                            border: formState.selectedTemplate === template ? "2px solid #005BD3" : "2px solid transparent",
                            borderRadius: "12px",
                            boxShadow: formState.selectedTemplate === template ? "0 4px 12px rgba(0, 91, 211, 0.15)" : "none",
                            background: "#f4f6f8",
                            flex: "1 1 120px",
                            textAlign: "center",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <Text as="p" alignment="center" fontWeight="bold">{template.charAt(0).toUpperCase() + template.slice(1)}</Text>
                          <div style={{ marginTop: "12px", ...getTemplateStyles(template), width: "100%", boxSizing: "border-box" }}>
                            <Box style={{ width: "20px", height: "20px" }} dangerouslySetInnerHTML={{ __html: ICONS.facebook }} />
                            <Box style={{ width: "20px", height: "20px" }} dangerouslySetInnerHTML={{ __html: ICONS.instagram }} />
                          </div>
                          {locked && <Box paddingBlockStart="200"><Text as="span" tone="subdued">Locked</Text></Box>}
                        </Box>
                      );
                    })}
                  </InlineStack>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Live Preview</Text>
                  
                  <style dangerouslySetInnerHTML={{__html: `
                    .sociallinks-bar-wrapper {
                      backdrop-filter: blur(12px);
                      -webkit-backdrop-filter: blur(12px);
                      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                      z-index: 999;
                    }
                    .sociallinks-bar-wrapper:hover {
                      transform: translateY(-3px) scale(1.02);
                      filter: brightness(1.05);
                    }
                    .sociallinks-bar-wrapper a {
                      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease, filter 0.25s ease;
                      opacity: 0.85;
                      display: flex;
                    }
                    .sociallinks-bar-wrapper a:hover {
                      transform: scale(1.2) translateY(-2px);
                      opacity: 1;
                      filter: brightness(1.2);
                    }
                    .black-save-button button {
                      background-color: #000000 !important;
                      color: #ffffff !important;
                      border-radius: 8px !important;
                      border: none !important;
                      box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
                      font-size: 16px !important;
                      padding: 12px !important;
                    }
                    .black-save-button button:hover {
                      background-color: #222222 !important;
                      box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
                    }
                  `}} />

                  <Box padding="400" style={{ background: "#e1e3e5", position: "relative", minHeight: "340px", borderRadius: "12px", overflow: "hidden", backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", boxShadow: "inset 0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div className="sociallinks-bar-wrapper" style={{
                      ...currentPreviewStyles,
                      position: "absolute",
                      ...(formState.position === "left" ? { left: "20px", top: "50%", transform: "translateY(-50%)", flexDirection: "column" } : {}),
                      ...(formState.position === "right" ? { right: "20px", top: "50%", transform: "translateY(-50%)", flexDirection: "column" } : {}),
                      ...(formState.position === "bottom" ? { bottom: "20px", left: "50%", transform: "translateX(-50%)", flexDirection: "row" } : {}),
                    }}>
                      {PLATFORMS.filter(p => formState[`${p.id}Enabled`] && (!isFree || ["facebook", "instagram", "twitter"].includes(p.id))).map((p) => (
                        <a href="#" key={p.id} style={{ color: currentPreviewStyles.color, width: formState.iconSize, height: formState.iconSize }} dangerouslySetInnerHTML={{ __html: ICONS[p.id] }} />
                      ))}
                    </div>
                  </Box>
                </BlockStack>
              </Card>

              <div className="black-save-button">
                <Button primary size="large" fullWidth onClick={handleSave} loading={nav.state === "submitting"}>
                  Save All Settings
                </Button>
              </div>
            </BlockStack>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
