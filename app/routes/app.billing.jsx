import { json, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigation } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { PLAN_FREE, PLAN_BASIC, PLAN_PRO } from "../shopify.server";
import prisma from "../db.server";
import { Page, Layout, Card, BlockStack, Text, Button, InlineGrid, Badge, Box } from "@shopify/polaris";

export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);
  
  let activePlan = "free";
  try {
    const billingCheck = await billing.check({
      plans: [PLAN_FREE, PLAN_BASIC, PLAN_PRO],
      isTest: true,
    });

    if (billingCheck.hasActivePayment) {
      if (billingCheck.appSubscriptions.some(sub => sub.name === PLAN_PRO)) {
        activePlan = "pro";
      } else if (billingCheck.appSubscriptions.some(sub => sub.name === PLAN_BASIC)) {
        activePlan = "basic";
      }
    }
  } catch (error) {
    console.error("Billing check error:", error);
  }

  await prisma.shopSettings.upsert({
    where: { shop: session.shop },
    create: { shop: session.shop, currentPlan: activePlan },
    update: { currentPlan: activePlan },
  });

  return json({ currentPlan: activePlan });
};

export const action = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);
  const formData = await request.formData();
  const plan = formData.get("plan");

  if (plan === "free") {
    await prisma.shopSettings.update({
      where: { shop: session.shop },
      data: { currentPlan: "free" },
    });
    return redirect("/app/billing");
  }

  const shopifyPlan = plan === "basic" ? PLAN_BASIC : PLAN_PRO;
  
  await billing.request({
    plan: shopifyPlan,
    isTest: true,
    returnUrl: `${process.env.SHOPIFY_APP_URL || process.env.HOST}/app/billing`,
  });

  return null;
};

export default function BillingPage() {
  const { currentPlan } = useLoaderData();
  const submit = useSubmit();
  const nav = useNavigation();

  const handleUpgrade = (plan) => {
    submit({ plan }, { method: "post" });
  };

  const isSubmitting = nav.state === "submitting";

  return (
    <Page title="Billing">
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Box paddingBlockEnd="400">
              <Text variant="headingLg" as="h1">
                Current Plan: <Badge tone="success">{currentPlan.toUpperCase()}</Badge>
              </Text>
            </Box>
            <InlineGrid columns={{ xs: 1, sm: 3 }} gap="400">
              
              <Card>
                <BlockStack gap="400" align="space-between" style={{ height: "100%" }}>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2">Free</Text>
                    <Text variant="headingLg" as="p">$0/mo</Text>
                    <Box paddingBlockStart="200">
                      <ul>
                        <li><Text as="p">3 social links only (FB, IG, TW)</Text></li>
                        <li><Text as="p">Minimal template only</Text></li>
                        <li><Text as="p">No custom colors</Text></li>
                      </ul>
                    </Box>
                  </BlockStack>
                  <Button 
                    disabled={currentPlan === "free"} 
                    onClick={() => handleUpgrade("free")}
                    loading={isSubmitting && nav.formData?.get("plan") === "free"}
                  >
                    {currentPlan === "free" ? "Current Plan" : "Downgrade to Free"}
                  </Button>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400" align="space-between" style={{ height: "100%" }}>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2">Basic</Text>
                    <Text variant="headingLg" as="p">$4.99/mo</Text>
                    <Box paddingBlockStart="200">
                      <ul>
                        <li><Text as="p">All 8 social links</Text></li>
                        <li><Text as="p">All 4 templates</Text></li>
                        <li><Text as="p">No custom colors</Text></li>
                      </ul>
                    </Box>
                  </BlockStack>
                  <Button 
                    primary={currentPlan !== "basic"} 
                    disabled={currentPlan === "basic"}
                    onClick={() => handleUpgrade("basic")}
                    loading={isSubmitting && nav.formData?.get("plan") === "basic"}
                  >
                    {currentPlan === "basic" ? "Current Plan" : "Upgrade to Basic"}
                  </Button>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400" align="space-between" style={{ height: "100%" }}>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2">Pro</Text>
                    <Text variant="headingLg" as="p">$9.99/mo</Text>
                    <Box paddingBlockStart="200">
                      <ul>
                        <li><Text as="p">All 8 social links</Text></li>
                        <li><Text as="p">All 4 templates</Text></li>
                        <li><Text as="p">Full color customization</Text></li>
                      </ul>
                    </Box>
                  </BlockStack>
                  <Button 
                    primary={currentPlan !== "pro"} 
                    disabled={currentPlan === "pro"}
                    onClick={() => handleUpgrade("pro")}
                    loading={isSubmitting && nav.formData?.get("plan") === "pro"}
                  >
                    {currentPlan === "pro" ? "Current Plan" : "Upgrade to Pro"}
                  </Button>
                </BlockStack>
              </Card>

            </InlineGrid>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
