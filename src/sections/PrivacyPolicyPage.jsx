import { LegalHeader } from '../components/LegalHeader'

export function PrivacyPolicyPage({
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
          <p className="legal-page-eyebrow">Privacy Policy</p>
          <h1>How Blueprint handles personal information.</h1>
          <p className="legal-page-intro">
            This Privacy Policy explains what information Blueprint may collect, how it is used,
            and the choices available to visitors and clients who interact with this website.
          </p>

          <section>
            <h2>1. Information we may collect</h2>
            <p>Depending on how you use this site, we may collect:</p>
            <ul>
              <li>basic contact details you submit through forms or email,</li>
              <li>messages or inquiries you send to us,</li>
              <li>technical usage data such as browser type, device information, and page visits.</li>
            </ul>
          </section>

          <section>
            <h2>2. How we use information</h2>
            <p>Blueprint may use personal information to:</p>
            <ul>
              <li>respond to inquiries and project requests,</li>
              <li>communicate about services, proposals, or collaboration,</li>
              <li>improve the website and understand how it is used,</li>
              <li>maintain security and protect against misuse.</li>
            </ul>
          </section>

          <section>
            <h2>3. Legal basis and consent</h2>
            <p>
              Where required, we rely on consent, legitimate business interests, or the need to
              take steps before entering into a service relationship.
            </p>
          </section>

          <section>
            <h2>4. Sharing information</h2>
            <p>
              We do not sell personal information. Information may be shared with trusted service
              providers involved in hosting, analytics, communication, or operational support,
              only where reasonably necessary.
            </p>
          </section>

          <section>
            <h2>5. Data retention</h2>
            <p>
              Personal information is kept only for as long as needed to respond to inquiries,
              provide services, meet legal obligations, or maintain business records.
            </p>
          </section>

          <section>
            <h2>6. Your rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul>
              <li>access the information we hold about you,</li>
              <li>request corrections or updates,</li>
              <li>request deletion where appropriate,</li>
              <li>withdraw consent where consent was relied upon.</li>
            </ul>
          </section>

          <section>
            <h2>7. Security</h2>
            <p>
              We take reasonable measures to protect personal information, though no online system
              can be guaranteed completely secure.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or your information, contact us at{' '}
              <a href="mailto:blueprint.studio@gmail.com">blueprint.studio@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
