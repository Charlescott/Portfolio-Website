import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getPathwayDetail, getPortfolioData } from './portfolioService.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 4000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://localhost:5174';
const ALLOWED_ORIGINS = CLIENT_ORIGIN.split(',').map((origin) => origin.trim());

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/portfolio', async (_req, res) => {
  try {
    const data = await getPortfolioData();
    res.json(data);
  } catch (error) {
    console.error('Failed to load portfolio:', error);
    res.status(500).json({ error: 'Failed to load portfolio data' });
  }
});

app.get('/api/pathways/:slug', async (req, res) => {
  try {
    const data = await getPathwayDetail(req.params.slug);
    if (!data) {
      return res.status(404).json({ error: 'Pathway not found' });
    }
    return res.json(data);
  } catch (error) {
    console.error('Failed to load pathway:', error);
    return res.status(500).json({ error: 'Failed to load pathway data' });
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');
const clientIndexPath = path.join(clientDistPath, 'index.html');

if (fs.existsSync(clientIndexPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    return res.sendFile(clientIndexPath);
  });
} else {
  app.get('/', (_req, res) => {
    res.send('Portfolio API is running. Start the React dev server at http://localhost:5173 or http://localhost:5174');
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
