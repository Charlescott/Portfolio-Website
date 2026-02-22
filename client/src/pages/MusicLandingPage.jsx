import { Link } from 'react-router-dom';

export function MusicLandingPage() {
  return (
    <>
      <section className="container hero pathway-hero music">
        <p className="eyebrow">Music</p>
        <h1>Music Background</h1>
        <p className="lede">
          Scott Fairdosi is a Houston-based percussion educator, performer, and composer whose work
          lives at the intersection of disciplined training and creative expression. With a Master
          of Music in Percussion from Indiana University and a Bachelor of Music Education from
          Texas Tech University, he brings conservatory-level technique and classroom-tested
          pedagogy to every student he teaches. His experience spans public school program
          leadership, drum corps performance with Blue Knights Drum and Bugle Corps, and
          professional ensemble work across the Houston area.
        </p>
        <p className="lede">
          Alongside his work in education, Scott is an active composer and producer, creating
          cinematic, percussion-driven music for film and media. His scoring and media credits
          include feature-length film work, commercial music licensing, and arrangement projects
          for entertainment organizations. Whether developing young percussionists or crafting music
          for the screen, his work is grounded in rhythmic precision, musical depth, and a
          commitment to artistic excellence.
        </p>
      </section>

      <section className="container section music-pillars-grid">
        <article className="panel music-pillar education">
          <h3>Percussion Education</h3>
          <h4>Focus</h4>
          <ul>
            <li>Technical development (snare, mallets, drum set)</li>
            <li>All-Region and audition preparation</li>
            <li>Drumline training</li>
            <li>Musical literacy and performance mindset</li>
          </ul>
          <p className="meta">
            Currently serving as a Percussion / Assistant Band Director in Texas public schools.
          </p>
          <div className="card-actions">
            <Link to="/music/education" className="btn ghost">
              See More
            </Link>
            <Link to="/music/private-lessons" className="btn solid">
              Sign Up for Private Lessons
            </Link>
            <a
              href="mailto:scottfairdosi@yahoo.com?subject=Masterclass%20Request"
              className="btn ghost"
            >
              Directors Request a Masterclass
            </a>
          </div>
        </article>

        <article className="panel music-pillar composition">
          <h3>Music Composition</h3>
          <h4>Credits</h4>
          <ul>
            <li>Film Composer - Surviving the Storm</li>
            <li>Character Theme Compositions - NFT Liyart</li>
            <li>Founder - Hollon Productions</li>
            <li>Media Composer / Consultant - Kauderer Music</li>
            <li>Contributing Composer - Pond5, Audiosparx, Luckstock</li>
            <li>Music Arranger - Houston Rockets Entertainment</li>
            <li>Music Arranger - Texas Tech Drumline</li>
          </ul>
          <h4>Published Works</h4>
          <ul>
            <li>Snare Solo: Deleclusiastics</li>
            <li>Marimba Solo: Reminiscence</li>
            <li>Publications released through RowLoff</li>
          </ul>
          <div className="card-actions">
            <a href="https://soundcloud.com/scottfairdosi" target="_blank" rel="noreferrer" className="btn solid">
              Listen to Music
            </a>
            <a
              href="mailto:scottfairdosi@yahoo.com?subject=Composition%20Inquiry"
              className="btn ghost"
            >
              Inquire About Composition
            </a>
            <Link to="/music/composition" className="btn ghost">
              See More
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
