import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const STORAGE_KEY = 'cookie_preferences'
const CONSENT_KEY = 'cookie_consent_given'

const cookieCategories = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    description:
      'Required for core website functionality, security, and basic operations. These cannot be disabled.',
    required: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.2-2.3 8-7 10-4.7-2-7-5.8-7-10V6l7-3Z" />
        <path d="M9.5 12l1.5 1.5 3.5-3.5" />
      </svg>
    ),
  },
  {
    id: 'analytics',
    name: 'Analytics & Performance',
    description:
      'Help us understand how visitors interact with our website by collecting anonymous usage data.',
    required: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
      </svg>
    ),
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    description:
      'Enable personalized ads and marketing content across websites and social platforms.',
    required: false,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export function CookieConsent({ onOpenCookiePolicy }) {
  const [mounted, setMounted] = useState(false)
  const [showBanner, setShowBanner] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [preferences, setPreferences] = useState(() =>
    cookieCategories.map((category) => category.required),
  )

  useEffect(() => {
    setMounted(true)

    try {
      const consentGiven = window.localStorage.getItem(CONSENT_KEY) === 'true'
      const storedPreferences = window.localStorage.getItem(STORAGE_KEY)

      if (consentGiven && storedPreferences) {
        const parsedPreferences = JSON.parse(storedPreferences)

        if (
          Array.isArray(parsedPreferences) &&
          parsedPreferences.length === cookieCategories.length
        ) {
          setPreferences(parsedPreferences)
          return
        }
      }
    } catch {
      // Ignore malformed stored preferences and show the banner again.
    }

    setShowBanner(true)
  }, [])

  useEffect(() => {
    if (!showDialog) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowDialog(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [showDialog])

  const savePreferences = useCallback((nextPreferences) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences))
      window.localStorage.setItem(CONSENT_KEY, 'true')
    } catch {
      // Ignore storage write failures.
    }

    setPreferences(nextPreferences)
    setShowBanner(false)
    setShowDialog(false)
  }, [])

  const handleAcceptAll = useCallback(() => {
    savePreferences(cookieCategories.map(() => true))
  }, [savePreferences])

  const handleRejectAll = useCallback(() => {
    savePreferences(cookieCategories.map((category) => category.required))
  }, [savePreferences])

  const handleToggle = useCallback((index) => {
    if (cookieCategories[index]?.required) return

    setPreferences((current) => {
      const next = [...current]
      next[index] = !next[index]
      return next
    })
  }, [])

  if (!mounted) return null

  return (
    <>
      {showBanner ? (
        <div className="cookie-consent-banner" role="dialog" aria-label="Cookie preferences">
          <div className="cookie-consent-card">
            <div className="cookie-consent-head">
              <div className="cookie-consent-icon-wrap">
                <svg
                  className="cookie-consent-banner-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M12 3a9 9 0 1 0 9 9 6 6 0 0 1-9-9Z" />
                  <path d="M8 8h.01" />
                  <path d="M15 9h.01" />
                  <path d="M10 14h.01" />
                </svg>
              </div>
              <h2>Cookie Preferences</h2>
            </div>

            <div className="cookie-consent-body">
              <p>
                We use cookies to enhance your experience, personalize content, and analyze
                traffic.
              </p>
              <button
                type="button"
                className="cookie-consent-policy-link"
                onClick={onOpenCookiePolicy}
              >
                Cookie Policy
                <span aria-hidden="true">{'>'}</span>
              </button>
            </div>

            <div className="cookie-consent-actions">
              <button
                type="button"
                className="cookie-consent-primary"
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
              <button
                type="button"
                className="cookie-consent-secondary"
                onClick={() => setShowDialog(true)}
              >
                Customize
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showDialog
        ? createPortal(
            <div className="cookie-consent-modal-root" role="presentation">
              <div className="cookie-consent-modal-backdrop" onClick={() => setShowDialog(false)} />
              <div
                className="cookie-consent-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="cookie-consent-title"
              >
                <div className="cookie-consent-modal-header">
                  <div>
                    <h3 id="cookie-consent-title">Manage Cookies</h3>
                    <p>Customize your cookie preferences below.</p>
                  </div>
                  <button
                    type="button"
                    className="cookie-consent-close"
                    onClick={() => setShowDialog(false)}
                    aria-label="Close cookie preferences"
                  >
                    {'\u00D7'}
                  </button>
                </div>

                <div className="cookie-consent-modal-body">
                  {cookieCategories.map((category, index) => (
                    <div
                      key={category.id}
                      className={`cookie-consent-category ${
                        preferences[index] ? 'cookie-consent-category-active' : ''
                      }`}
                    >
                      <div className="cookie-consent-category-top">
                        <div className="cookie-consent-category-label">
                          <div className="cookie-consent-category-icon">{category.icon}</div>
                          <div>
                            <div className="cookie-consent-category-title-row">
                              <strong>{category.name}</strong>
                              {category.required ? (
                                <span className="cookie-consent-required-chip">Required</span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`cookie-consent-switch ${
                            preferences[index] ? 'cookie-consent-switch-on' : ''
                          }`}
                          onClick={() => handleToggle(index)}
                          aria-pressed={preferences[index]}
                          aria-label={`Toggle ${category.name}`}
                          disabled={category.required}
                        >
                          <span />
                        </button>
                      </div>

                      <p>{category.description}</p>
                    </div>
                  ))}
                </div>

                <div className="cookie-consent-modal-footer">
                  <button
                    type="button"
                    className="cookie-consent-secondary"
                    onClick={handleRejectAll}
                  >
                    Reject All
                  </button>
                  <button
                    type="button"
                    className="cookie-consent-primary"
                    onClick={() => savePreferences(preferences)}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
