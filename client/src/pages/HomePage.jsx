import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../api';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';

export function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPortfolio = () => {
    setIsLoading(true);
    setError('');
    fetchPortfolio()
      .then(setData)
      .catch(() => setError('Unable to load portfolio data. Check that the API server is running and try again.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  if (error) {
    return <ErrorState message={error} onRetry={loadPortfolio} />;
  }

  if (isLoading || !data) {
    return <LoadingState message="Loading your portfolio overview..." />;
  }

  const { profile, pathways, links, education } = data;

  return (
    <>
      <section className="hero container">
        <p className="eyebrow">Portfolio</p>
        <h1>{profile.full_name}</h1>
        <h2>{profile.title}</h2>
        <p className="lede">{profile.transition_story}</p>
        <div className="chips">
          <span>{profile.location}</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/[^0-9]/g, '')}`}>{profile.phone}</a>
        </div>
      </section>

      <section className="container section split-grid">
        {pathways.map((pathway) => (
          <article key={pathway.slug} className={`pathway-card ${pathway.slug}`}>
            <p className="card-kicker">Pathway</p>
            <h3>{pathway.name}</h3>
            <p>{pathway.tagline}</p>
            <p>{pathway.intro}</p>
            <div className="card-actions">
              <Link to={`/${pathway.slug}`} className="btn solid">
                Explore {pathway.name}
              </Link>
              <a href={pathway.primary_link_url} target="_blank" rel="noreferrer" className="btn ghost">
                {pathway.primary_link_label}
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="container section grid-two">
        <article className="panel">
          <h3>Professional Summary</h3>
          <p>{profile.summary}</p>
        </article>
        <article className="panel">
          <h3>Education</h3>
          <ul>
            {education.map((item) => (
              <li key={`${item.school}-${item.period_label}`}>
                <strong>{item.school}</strong> - {item.credential} ({item.period_label})
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="container section">
        <h3>Connect</h3>
        <div className="link-list">
          {links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="btn ghost">
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
