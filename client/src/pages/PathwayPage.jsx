import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPathway } from '../api';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';

export function PathwayPage({ slug, accent }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPathway = () => {
    setIsLoading(true);
    setError('');
    setData(null);
    fetchPathway(slug)
      .then(setData)
      .catch(() => setError('Unable to load this pathway right now. Please try again.'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPathway();
  }, [slug]);

  if (error) {
    return <ErrorState message={error} onRetry={loadPathway} />;
  }

  if (isLoading || !data) {
    return <LoadingState message="Loading pathway details..." />;
  }

  return (
    <>
      <section className={`container hero pathway-hero ${accent}`}>
        <p className="eyebrow">Career Pathway</p>
        <h1>{data.name}</h1>
        <p className="lede">{data.intro}</p>
        <div className="card-actions">
          <a href={data.primary_link_url} target="_blank" rel="noreferrer" className="btn solid">
            {data.primary_link_label}
          </a>
          <Link to="/" className="btn ghost">
            Back to Split View
          </Link>
        </div>
      </section>

      <section className="container section grid-two">
        <article className="panel">
          <h3>Core Skills</h3>
          {data.skills.map((skill) => (
            <div key={skill.category} className="skill-group">
              <h4>{skill.category}</h4>
              <div className="chips">
                {skill.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </article>

        <article className="panel">
          <h3>Experience Highlights</h3>
          {data.experiences.map((experience) => (
            <div key={`${experience.role}-${experience.period_label}`} className="experience-block">
              <h4>{experience.role}</h4>
              <p className="meta">
                {experience.organization} | {experience.period_label}
              </p>
              <ul>
                {experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      </section>

      <section className="container section">
        <h3>Featured Work</h3>
        <div className="projects-grid">
          {data.projects.map((project) => (
            <article key={`${project.name}-${project.period_label}`} className="project-card">
              <p className="meta">{project.period_label}</p>
              <h4>{project.name}</h4>
              <p>{project.summary}</p>
              <div className="chips">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <ul>
                {project.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="card-actions">
                {project.repo_url && (
                  <a href={project.repo_url} target="_blank" rel="noreferrer" className="btn ghost">
                    Repository
                  </a>
                )}
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="btn ghost">
                    Live / Reference
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
