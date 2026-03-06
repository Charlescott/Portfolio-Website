import { Link } from 'react-router-dom';

export function MusicCompositionPage() {
  return (
    <section className="container section music-detail-page">
      <p className="eyebrow">Music Production and Composition</p>
      <h1>Composition Detail</h1>
      <p className="lede">
        Cinematic and media-focused composition rooted in orchestral writing, rhythmic identity,
        and production discipline.
      </p>

      <div className="music-detail-grid">
        <article className="panel music-detail-panel">
          <h3>Creative Focus</h3>
          <ul>
            <li>Cinematic scoring</li>
            <li>Orchestral hybrid production</li>
            <li>Percussion-driven textures</li>
            <li>Custom scoring for film and media</li>
          </ul>
        </article>

        <article className="panel music-detail-panel">
          <h3>Expanded Credits</h3>
          <ul>
            <li>Feature-length scoring projects</li>
            <li>Media licensing work</li>
            <li>Commercial and entertainment arrangement work</li>
            <li>Ensemble and orchestral background supporting compositional voice</li>
          </ul>
        </article>
      </div>

      <div className="card-actions">
        <a href="https://soundcloud.com/scottfairdosi" target="_blank" rel="noreferrer" className="btn solid">
          Listen to Music
        </a>
        <Link to="/music/commission-inquiry" className="btn ghost">
          Commission Original Music
        </Link>
        <Link to="/music" className="btn ghost">
          Back to Music
        </Link>
      </div>
    </section>
  );
}
