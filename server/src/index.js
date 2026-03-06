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

const INQUIRY_TO_EMAIL = process.env.INQUIRY_TO_EMAIL || 'scottfairdosi@yahoo.com';
const INQUIRY_FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || process.env.SMTP_USER || INQUIRY_TO_EMAIL;

async function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  let nodemailer;
  try {
    ({ default: nodemailer } = await import('nodemailer'));
  } catch (_error) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

app.post('/api/inquiries', async (req, res) => {
  const { inquiryType, formTitle, subject, fields } = req.body ?? {};

  if (!inquiryType || !formTitle || !subject || !Array.isArray(fields) || fields.length === 0) {
    return res.status(400).json({ error: 'Invalid inquiry payload' });
  }

  const transporter = await createTransporter();
  if (!transporter) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const cleanedFields = fields
    .filter((field) => field && typeof field.label === 'string' && typeof field.value === 'string')
    .map((field) => ({ label: field.label.trim(), value: field.value.trim() }));

  if (cleanedFields.length === 0) {
    return res.status(400).json({ error: 'Inquiry fields are required' });
  }

  const lines = [
    `Form: ${formTitle}`,
    `Type: ${inquiryType}`,
    `Submitted: ${new Date().toISOString()}`,
    '',
    ...cleanedFields.flatMap(({ label, value }) => [label, value || '(not provided)', '']),
  ];

  try {
    await transporter.sendMail({
      from: INQUIRY_FROM_EMAIL,
      to: INQUIRY_TO_EMAIL,
      subject,
      text: lines.join('\n'),
      replyTo: cleanedFields.find((field) => field.label.toLowerCase() === 'email')?.value || undefined,
    });
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send inquiry email:', error);
    return res.status(500).json({ error: 'Failed to send inquiry' });
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
