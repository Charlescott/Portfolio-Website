CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  summary TEXT NOT NULL,
  transition_story TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pathways (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  intro TEXT NOT NULL,
  primary_link_label TEXT,
  primary_link_url TEXT
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  pathway_id INTEGER NOT NULL REFERENCES pathways(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  items TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  pathway_id INTEGER NOT NULL REFERENCES pathways(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period_label TEXT NOT NULL,
  bullets TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  pathway_id INTEGER NOT NULL REFERENCES pathways(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  period_label TEXT NOT NULL,
  stack TEXT[] NOT NULL DEFAULT '{}',
  summary TEXT NOT NULL,
  highlights TEXT[] NOT NULL DEFAULT '{}',
  repo_url TEXT,
  live_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  school TEXT NOT NULL,
  credential TEXT NOT NULL,
  period_label TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  platform TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
