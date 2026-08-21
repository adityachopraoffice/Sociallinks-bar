import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  Button,
  InlineStack,
  Icon,
  Badge,
  List,
  Box
} from "@shopify/polaris";
import { SettingsIcon, CreditCardIcon, CheckCircleIcon } from "@shopify/polaris-icons";

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

  return json({ settings, shop: session.shop });
};

export default function DashboardPage() {
  const { settings, shop } = useLoaderData();
  const navigate = useNavigate();

  const planColors = {
    free: "info",
    basic: "success",
    pro: "attention"
  };

  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            
            <Card padding="500">
              <BlockStack gap="400">
                <Text variant="headingXl" as="h1">Welcome to SocialLinks Bar! 👋</Text>
                <Text as="p" variant="bodyMd">
                  Your beautiful, customizable social media floating bar is just a few steps away from being live on your store. Follow the quick setup guide below to get started.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Quick Setup Guide</Text>
                <List type="number">
                  <List.Item>
                    <Text fontWeight="bold" as="span">Enable the App Embed:</Text> You must turn on the SocialLinks App Embed in your Shopify Theme Editor for the bar to appear on your storefront.
                    <Box paddingBlockStart="200">
                      <Button onClick={() => window.open(`https://${shop}/admin/themes/current/editor?context=apps`, "_blank")}>
                        Open Theme Editor
                      </Button>
                    </Box>
                  </List.Item>
                  <List.Item>
                    <Text fontWeight="bold" as="span">Configure your Social Links:</Text> Add your Instagram, TikTok, and other URLs in the Settings tab.
                  </List.Item>
                  <List.Item>
                    <Text fontWeight="bold" as="span">Customize the Design:</Text> Choose a premium template (like Glassmorphism) and set your custom colors to match your brand.
                  </List.Item>
                </List>
                <Box paddingBlockStart="200">
                  <Button primary onClick={() => navigate("/app/settings")} icon={SettingsIcon}>
                    Go to Settings
                  </Button>
                </Box>
              </BlockStack>
            </Card>

            <Layout>
              <Layout.Section variant="oneHalf">
                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                      <Text variant="headingMd" as="h2">Current Plan</Text>
                      <Badge tone={planColors[settings.currentPlan]}>
                        {settings.currentPlan.toUpperCase()}
                      </Badge>
                    </InlineStack>
                    <Text as="p">
                      {settings.currentPlan === "free" ? "You are currently on the Free plan. Upgrade to unlock more social platforms and premium templates." : "Thank you for supporting SocialLinks Bar! Enjoy your premium features."}
                    </Text>
                    <Button onClick={() => navigate("/app/billing")} icon={CreditCardIcon}>
                      Manage Subscription
                    </Button>
                  </BlockStack>
                </Card>
              </Layout.Section>
              
              <Layout.Section variant="oneHalf">
                <Card>
                  <BlockStack gap="400">
                    <InlineStack gap="200" blockAlign="center">
                      <Icon source={CheckCircleIcon} tone="success" />
                      <Text variant="headingMd" as="h2">App Status</Text>
                    </InlineStack>
                    <Text as="p">
                      Your app is installed and ready. Make sure your Social Links are configured correctly in the settings.
                    </Text>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>

          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
