import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, query } from '../src/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = await fs.readFile(schemaPath, 'utf8');
  await query(schemaSql);

  await query('DELETE FROM skills');
  await query('DELETE FROM experiences');
  await query('DELETE FROM projects');
  await query('DELETE FROM pathways');
  await query('DELETE FROM education');
  await query('DELETE FROM links');
  await query('DELETE FROM profiles');

  const profileResult = await query(
    `INSERT INTO profiles (full_name, title, location, phone, email, summary, transition_story)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      'Scott Fairdosi',
      'Full Stack Software Developer',
      'Houston, TX',
      '832-520-6172',
      'ScottFairdosi@yahoo.com',
      'Full stack web developer with React, Node.js, Express, and PostgreSQL experience, plus 8+ years leading high-pressure projects with clear communication and strong systems thinking.',
      'I am transitioning from leading music programs to building reliable software products. The same discipline I used as a band director now drives how I design, debug, and ship full-stack applications.'
    ]
  );

  const pathways = [
    {
      slug: 'music',
      name: 'Music Background',
      tagline: 'Educator, performer, and producer with years of leadership under pressure.',
      intro:
        'My music journey shaped how I lead teams, communicate clearly, and deliver under deadline. I have directed multi-campus programs, managed six-figure budgets, and built a production portfolio that reflects precision and creativity.',
      label: 'Listen on SoundCloud',
      url: 'https://soundcloud.com/scottfairdosi'
    },
    {
      slug: 'engineering',
      name: 'Software Engineering Background',
      tagline: 'Full stack builder focused on practical, user-centered products.',
      intro:
        'I build full-stack web applications with React, Express, and PostgreSQL. My engineering work emphasizes clean architecture, secure APIs, practical debugging, and consistent delivery in collaborative environments.',
      label: 'View LinkedIn',
      url: 'https://www.linkedin.com/in/scott-fairdosi-1330b382/'
    }
  ];

  const pathwayIds = {};
  for (const p of pathways) {
    const res = await query(
      `INSERT INTO pathways (slug, name, tagline, intro, primary_link_label, primary_link_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, slug`,
      [p.slug, p.name, p.tagline, p.intro, p.label, p.url]
    );
    pathwayIds[res.rows[0].slug] = res.rows[0].id;
  }

  const skillRows = [
    [pathwayIds.engineering, 'Languages', ['JavaScript (ES6+)', 'SQL', 'HTML5', 'CSS3'], 1],
    [pathwayIds.engineering, 'Frontend', ['React', 'JSX', 'React Router', 'Responsive Design'], 2],
    [pathwayIds.engineering, 'Backend', ['Node.js', 'Express', 'REST APIs'], 3],
    [pathwayIds.engineering, 'Databases & Workflow', ['PostgreSQL', 'Git', 'GitHub', 'npm', 'Agile/Scrum'], 4],
    [pathwayIds.music, 'Leadership', ['Program Direction', 'Staff and Stakeholder Communication', 'Budget Ownership'], 1],
    [pathwayIds.music, 'Performance & Education', ['Band Direction', 'Curriculum Design', 'Live Event Execution'], 2],
    [pathwayIds.music, 'Production', ['Music Arrangement', 'Studio Workflow', 'Digital Audio Production'], 3]
  ];

  for (const row of skillRows) {
    await query(
      `INSERT INTO skills (pathway_id, category, items, sort_order)
       VALUES ($1, $2, $3, $4)`,
      row
    );
  }

  const experienceRows = [
    [
      pathwayIds.engineering,
      'Full Stack Developer Trainee',
      'Fullstack Academy',
      '2025',
      [
        'Built and deployed React-based applications using modern frontend patterns.',
        'Implemented RESTful APIs with Node.js and Express for authentication and CRUD.',
        'Designed normalized PostgreSQL schemas and connected clean data flows across the stack.'
      ],
      1
    ],
    [
      pathwayIds.music,
      'High School Band Director',
      'Multiple Campuses',
      'Aug 2015 - Present',
      [
        'Led a multi-year program serving grades 6-12 across multiple campuses.',
        'Managed a six-figure budget with forecasting and resource planning.',
        'Planned and executed off-site event logistics with transportation and vendor coordination.',
        'Resolved operational issues in real time under public-facing constraints.'
      ],
      1
    ]
  ];

  for (const row of experienceRows) {
    await query(
      `INSERT INTO experiences (pathway_id, role, organization, period_label, bullets, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      row
    );
  }

  const projectRows = [
    [
      pathwayIds.engineering,
      'Gratitude Jar',
      'December 2025',
      ['React', 'Node.js', 'Express', 'PostgreSQL'],
      'Full-stack app for creating and sharing gratitude entries in private groups.',
      [
        'Implemented protected routes and role-aware access controls.',
        'Built secure REST APIs for user and entry management.',
        'Resolved real-world UI, routing, and responsive layout issues during deployment.'
      ],
      null,
      null,
      1
    ],
    [
      pathwayIds.engineering,
      'Frontend React Applications',
      '2025',
      ['React', 'JavaScript', 'CSS'],
      'Collection of component-focused frontend apps with reusable logic and clear state handling.',
      [
        'Refactored legacy code for readability and maintainability.',
        'Improved UX consistency across components and responsive breakpoints.'
      ],
      'https://github.com/',
      null,
      2
    ],
    [
      pathwayIds.music,
      'Music Portfolio',
      'Ongoing',
      ['Performance', 'Production', 'Arrangement'],
      'A body of performance and production work that demonstrates tone, structure, and musical direction.',
      [
        'Produced and arranged recordings for personal and collaborative work.',
        'Maintained a public portfolio to document growth and style.'
      ],
      null,
      'https://soundcloud.com/scottfairdosi',
      1
    ],
    [
      pathwayIds.music,
      'Legacy Artist Website',
      'Archive',
      ['Branding', 'Content', 'Live Booking Presence'],
      'Original artist site used for bookings, background, and showcase material.',
      [
        'Centralized bio, media, and contact information.',
        'Served as a public landing page for opportunities.'
      ],
      null,
      'https://scottfairdosi.wixsite.com/scottfairdosi',
      2
    ]
  ];

  for (const row of projectRows) {
    await query(
      `INSERT INTO projects (pathway_id, name, period_label, stack, summary, highlights, repo_url, live_url, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      row
    );
  }

  const educationRows = [
    ['Fullstack Academy', 'Software Engineering Certificate', '2025', 1],
    ['Indiana University', 'Master of Music Performance', '2014', 2],
    ['Texas Tech University', 'Bachelor of Music Education', '2012', 3]
  ];

  for (const row of educationRows) {
    await query(
      `INSERT INTO education (school, credential, period_label, sort_order)
       VALUES ($1, $2, $3, $4)`,
      row
    );
  }

  const linkRows = [
    ['LinkedIn', 'https://www.linkedin.com/in/scott-fairdosi-1330b382/', 'linkedin', 1],
    ['SoundCloud', 'https://soundcloud.com/scottfairdosi', 'soundcloud', 2],
    ['Music Site Archive', 'https://scottfairdosi.wixsite.com/scottfairdosi', 'website', 3],
    ['GitHub', 'https://github.com/', 'github', 4]
  ];

  for (const row of linkRows) {
    await query(
      `INSERT INTO links (label, url, platform, sort_order)
       VALUES ($1, $2, $3, $4)`,
      row
    );
  }

  console.log(`Seeded profile ${profileResult.rows[0].id} and portfolio data.`);
}

seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
