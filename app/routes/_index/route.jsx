import { redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { login } from "../../shopify.server";
import styles from "./styles.module.css";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>SocialLinks Bar</div>
        <nav className={styles.nav}>
          <Link to="/privacy" className={styles.navLink}>Privacy Policy</Link>
        </nav>
      </header>

      <main className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.heading}>The Ultimate Social Media Bar for Shopify</h1>
          <p className={styles.text}>
            Instantly connect with your customers. Add a stunning, fully customizable floating social media bar to your Shopify storefront in seconds.
          </p>
        </div>

        {showForm && (
          <div className={styles.authCard}>
            <Form className={styles.form} method="post" action="/auth/login">
              <label className={styles.label}>
                <span>Install or Login to Your Store</span>
                <input 
                  className={styles.input} 
                  type="text" 
                  name="shop" 
                  placeholder="e.g: my-store.myshopify.com"
                  required
                />
              </label>
              <button className={styles.button} type="submit">
                Connect Shopify Store
              </button>
            </Form>
          </div>
        )}

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✨</div>
            <h3>Premium Designs</h3>
            <p>
              Choose from beautiful presets like Glassmorphism, Neon Cyberpunk, or Luxury Minimalist to perfectly match your brand's aesthetic.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔗</div>
            <h3>8+ Social Platforms</h3>
            <p>
              Connect Facebook, Instagram, TikTok, YouTube, WhatsApp, and more. Give your customers instant access to all your channels.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡️</div>
            <h3>Zero Code Setup</h3>
            <p>
              No liquid code required. Simply toggle the App Embed from your Theme Editor and configure everything visually from your dashboard.
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} SocialLinks Bar. All rights reserved.</p>
      </footer>
    </div>
  );
}
