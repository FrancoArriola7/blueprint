export function ServiceCard({ id, title, description, available, onKnowMore }) {
  return (
    <article
      className={`service-card ${available ? 'service-card-active' : 'service-card-soon'}`}
      aria-disabled={!available}
    >
      <div className="service-card-glow" />
      <div className="service-card-content">
        <div>
          <div className="service-card-topline">
            <span className="service-card-status">{available ? 'Active' : 'Soon'}</span>
            <span className="service-card-id">{id}</span>
          </div>

          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        {available ? (
          <button type="button" className="service-card-link" onClick={onKnowMore}>
            Know more
            <span aria-hidden="true">{'\u2197'}</span>
          </button>
        ) : (
          <span className="service-card-soon-label">Soon</span>
        )}
      </div>
    </article>
  )
}
