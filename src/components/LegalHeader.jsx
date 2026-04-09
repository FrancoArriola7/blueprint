export function LegalHeader({
  activePath,
  onBackHome,
  onOpenCookiePolicy,
  onOpenPrivacyPolicy,
}) {
  return (
    <header className="legal-page-header">
      <button type="button" onClick={onBackHome} className="legal-page-brand">
        blueprint
      </button>

      <nav className="legal-page-tabs" aria-label="Legal navigation">
        <button
          type="button"
          onClick={onOpenCookiePolicy}
          className={`legal-page-tab ${
            activePath === '/cookie-policy' ? 'legal-page-tab-active' : ''
          }`}
        >
          Cookie Policy
        </button>
        <button
          type="button"
          onClick={onOpenPrivacyPolicy}
          className={`legal-page-tab ${
            activePath === '/privacy-policy' ? 'legal-page-tab-active' : ''
          }`}
        >
          Privacy Policy
        </button>
      </nav>

      <button type="button" onClick={onBackHome} className="legal-page-home-link">
        Back to home
      </button>
    </header>
  )
}
