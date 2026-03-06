import { Link } from 'react-router-dom';

export function MusicEducationPage() {
  return (
    <section className="container section music-detail-page">
      <p className="eyebrow">Percussion Education</p>
      <h1>Education Detail</h1>
      <p className="lede">
        Professional percussion training with a structured approach for student growth, audition
        readiness, and long-term musicianship development.
      </p>

      <div className="music-detail-grid">
        <article className="panel music-detail-panel">
          <h3>Education and Credentials</h3>
          <ul>
            <li>Master of Music (Percussion), Indiana University</li>
            <li>Bachelor of Music Education, Texas Tech University</li>
            <li>TEA and PPR Certified</li>
          </ul>
        </article>

        <article className="panel music-detail-panel">
          <h3>Teaching Experience</h3>
          <ul>
            <li>Percussion / Assistant Band Director - Angleton HS and JH</li>
            <li>Percussion / Assistant Band Director - Marshall HS and Missouri City MS</li>
            <li>Percussion Director - Roberson MS</li>
          </ul>
        </article>

        <article className="panel music-detail-panel">
          <h3>Professional Performance</h3>
          <ul>
            <li>Brazosport Symphony Orchestra</li>
            <li>Houston Civic Symphony</li>
            <li>ECHO Orchestra of Houston</li>
            <li>Houston Rockets Drumline</li>
          </ul>
        </article>

        <article className="panel music-detail-panel">
          <h3>Program Leadership</h3>
          <ul>
            <li>Coordinated 6th-12th grade percussion curriculum</li>
            <li>Arranged percussion books for marching productions</li>
            <li>Led contest preparation and drumline competitions</li>
            <li>Implemented recruitment and retention strategies</li>
          </ul>
        </article>
      </div>

      <article className="panel music-detail-panel">
        <h3>Endorsements</h3>
        <div className="chips">
          <span>SABIAN</span>
          <span>Innovative Percussion</span>
        </div>
      </article>

      <div className="card-actions">
        <Link to="/music" className="btn ghost">
          Back to Music
        </Link>
        <Link to="/music/private-lessons" className="btn solid">
          Sign Up for Private Lessons
        </Link>
        <Link to="/music/masterclass-inquiry" className="btn ghost">
          Directors Request a Masterclass
        </Link>
      </div>
    </section>
  );
}
