import { LegalHeader } from '../components/LegalHeader'

export function CookiePolicyPage({
  pathname,
  onBackHome,
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) {
  return (
    <div className="legal-page">
      <LegalHeader
        activePath={pathname}
        onBackHome={onBackHome}
        onOpenCookiePolicy={onOpenCookiePolicy}
        onOpenPrivacyPolicy={onOpenPrivacyPolicy}
      />

      <main className="legal-page-content">
        <div className="legal-page-shell">
          <p className="legal-page-eyebrow">Cookie Policy</p>
          <h1>How Blueprint uses cookies.</h1>
          <p className="legal-page-intro">
            This Cookie Policy explains what cookies are, how Blueprint uses them on this
            website, and what choices you have regarding their use.
          </p>

          <section>
            <h2>1. What are cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They
              help websites remember information about your visit, improve performance, and
              support essential functionality.
            </p>
          </section>

          <section>
            <h2>2. How we use cookies</h2>
            <p>Blueprint may use cookies to:</p>
            <ul>
              <li>keep the site functioning correctly,</li>
              <li>understand basic traffic and usage patterns,</li>
              <li>improve performance and user experience,</li>
              <li>remember preferences when relevant.</li>
            </ul>
          </section>

          <section>
            <h2>3. Types of cookies we may use</h2>
            <ul>
              <li>
                <strong>Essential cookies:</strong> required for the site to operate properly.
              </li>
              <li>
                <strong>Analytics cookies:</strong> help us understand how visitors use the site.
              </li>
              <li>
                <strong>Preference cookies:</strong> remember basic settings or choices.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Third-party services</h2>
            <p>
              Some cookies may be placed by third-party tools we use for analytics, embedded
              content, or performance monitoring. Those providers manage their own cookies under
              their respective policies.
            </p>
          </section>

          <section>
            <h2>5. Managing cookies</h2>
            <p>
              You can usually control or delete cookies through your browser settings. Disabling
              some cookies may affect how certain parts of the website function.
            </p>
          </section>

          <section>
            <h2>6. Updates to this policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in the site,
              legal requirements, or the tools we use.
            </p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              If you have any questions about this policy, you can contact us at{' '}
              <a href="mailto:blueprint.studio@gmail.com">blueprint.studio@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
