import { json } from "@remix-run/node";
import prisma from "../db.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");

  if (!shop) {
    return json({ error: "Missing shop parameter" }, { 
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" } 
    });
  }

  let settings = await prisma.shopSettings.findUnique({
    where: { shop },
  });

  if (!settings) {
    // Default settings
    settings = {
      shop,
      selectedTemplate: "minimal",
      position: "right",
      bgColor: "#FFFFFF",
      iconColor: "#000000",
      iconSize: "24px",
      currentPlan: "free",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      youtubeUrl: "",
      tiktokUrl: "",
      pinterestUrl: "",
      linkedinUrl: "",
      whatsappUrl: "",
      facebookEnabled: false,
      instagramEnabled: false,
      twitterEnabled: false,
      youtubeEnabled: false,
      tiktokEnabled: false,
      pinterestEnabled: false,
      linkedinEnabled: false,
      whatsappEnabled: false,
    };
  }

  // Enforce Free plan restrictions server-side
  if (settings.currentPlan === "free") {
    settings.youtubeEnabled = false;
    settings.tiktokEnabled = false;
    settings.pinterestEnabled = false;
    settings.linkedinEnabled = false;
    settings.whatsappEnabled = false;
  }

  return json(settings, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
