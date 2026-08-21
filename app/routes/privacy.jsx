import styles from "./_index/styles.module.css";
import { Link } from "@remix-run/react";

export default function PrivacyPolicy() {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>SocialLinks Bar</div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
        </nav>
      </header>

      <main className={styles.container}>
        <div className={styles.privacyCard}>
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={styles.lastUpdated}>Last updated: August 21, 2026</p>

          <div className={styles.privacyContent}>
            <h2>1. Information We Collect</h2>
            <p>
              When you install the SocialLinks Bar app on your Shopify store, we automatically access certain types of information from your Shopify account:
            </p>
            <ul>
              <li><strong>Shop Information:</strong> Your shop domain, shop name, and plan information to provide the app service.</li>
              <li><strong>App Settings:</strong> Configuration data such as your selected templates, custom colors, and social media URLs which are securely stored in our database.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the collected information solely to:</p>
            <ul>
              <li>Provide, operate, and maintain the SocialLinks Bar app on your storefront.</li>
              <li>Authenticate your access to the app settings within the Shopify Admin.</li>
              <li>Provide customer support and respond to your inquiries.</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your Personally Identifiable Information or store data to outside parties. We only share information with third parties when necessary to provide the service (such as our database hosting provider).
            </p>

            <h2>4. Data Retention</h2>
            <p>
              We retain your store's configuration data for as long as the app is installed. If you uninstall the app, we receive a webhook from Shopify and your data will be permanently deleted from our systems within 48 hours in compliance with Shopify's data retention policies.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              If you are a merchant using our app, you have the right to request access to or deletion of your data. To exercise these rights, please uninstall the app or contact us directly.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@adityastore.com.
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
