import { query } from './db.js';

async function getProfile() {
  const result = await query('SELECT * FROM profiles LIMIT 1');
  return result.rows[0] ?? null;
}

async function getEducation() {
  const result = await query('SELECT school, credential, period_label FROM education ORDER BY sort_order ASC, id ASC');
  return result.rows;
}

async function getLinks() {
  const result = await query('SELECT label, url, platform FROM links ORDER BY sort_order ASC, id ASC');
  return result.rows;
}

async function getPathways() {
  const result = await query(
    `SELECT slug, name, tagline, intro, primary_link_label, primary_link_url
     FROM pathways
     ORDER BY id ASC`
  );
  return result.rows;
}

async function getPathwayDetail(slug) {
  const pathwayResult = await query(
    `SELECT id, slug, name, tagline, intro, primary_link_label, primary_link_url
     FROM pathways
     WHERE slug = $1`,
    [slug]
  );

  const pathway = pathwayResult.rows[0];
  if (!pathway) {
    return null;
  }

  const [skillsResult, experiencesResult, projectsResult] = await Promise.all([
    query(
      `SELECT category, items
       FROM skills
       WHERE pathway_id = $1
       ORDER BY sort_order ASC, id ASC`,
      [pathway.id]
    ),
    query(
      `SELECT role, organization, period_label, bullets
       FROM experiences
       WHERE pathway_id = $1
       ORDER BY sort_order ASC, id ASC`,
      [pathway.id]
    ),
    query(
      `SELECT name, period_label, stack, summary, highlights, repo_url, live_url
       FROM projects
       WHERE pathway_id = $1
       ORDER BY sort_order ASC, id ASC`,
      [pathway.id]
    )
  ]);

  return {
    ...pathway,
    skills: skillsResult.rows,
    experiences: experiencesResult.rows,
    projects: projectsResult.rows,
  };
}

export async function getPortfolioData() {
  const [profile, education, links, pathways] = await Promise.all([
    getProfile(),
    getEducation(),
    getLinks(),
    getPathways(),
  ]);

  return {
    profile,
    education,
    links,
    pathways,
  };
}

export { getPathwayDetail };
