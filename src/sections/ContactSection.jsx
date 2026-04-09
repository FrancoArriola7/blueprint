import { forwardRef } from 'react'

export const ContactSection = forwardRef(function ContactSection(_, ref) {
  return (
    <section ref={ref} id="contact" className="section-frame snap-start">
      <div className="section-inner contact-section-inner">
        <div className="content-wrap contact-layout">
          <div className="contact-copy">
            <p className="contact-eyebrow">Contact</p>
            <h2>
              Let’s talk about your next project
            </h2>
            <p className="contact-intro">
              Have a project in mind, need a new website, or want to explore a custom digital solution? We’d love to hear from you.
            </p>

            <div className="contact-details">
              <div>
                <span>Email:</span>
                <a href="mailto:hello@blueprint.studio">blueprint.studio@gmail.com</a>
              </div>
              <p>We usually reply within 24 hours.</p>
            </div>

            <a
              href="https://www.instagram.com/blueprint.devs/"
              target="_blank"
              rel="noreferrer"
              className="contact-instagram-button"
            >
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z" />
                </svg>
              </span>
              Instagram
            </a>
          </div>

          <form className="contact-form">
            <div className="contact-form-grid">
              <label>
                <span>First Name</span>
                <input type="text" placeholder="Enter your first name..." />
              </label>
              <label>
                <span>Last Name</span>
                <input type="text" placeholder="Enter your last name..." />
              </label>
            </div>

            <label>
              <span>Email</span>
              <input type="email" placeholder="Enter your email address..." />
            </label>

            <label>
              <span>How can we help you?</span>
              <textarea rows="6" placeholder="Enter your message..." />
            </label>

            <div className="contact-form-actions">
              <button type="button">
                Send Message
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
})
