#!/usr/bin/env node

import path from 'path';
import { createRequestHandler } from '@expo/server/adapter/express';

import express from 'express';
import compression from 'compression';
import morgan from 'morgan';

process.env.NODE_ENV = 'production';

const WEBUI_ROOT = path.resolve(__dirname, '../../../webui')
const CLIENT_BUILD_DIR = path.join(WEBUI_ROOT, 'dist/client');
const SERVER_BUILD_DIR = path.join(WEBUI_ROOT, 'dist/server');

const app = express();

app.use(compression());

// Fix to compensate for faulty server root
app.use((req, res, next) => {
  if (req.url.startsWith('/_expo/plugins/metro-bundle-plugin')) {
    req.url = req.url.replace('/_expo/plugins/metro-bundle-plugin', '');
  }
  next();
});

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

app.use(
  express.static(CLIENT_BUILD_DIR, {
    maxAge: '1h',
    extensions: ['html'],
  })
);

app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    build: SERVER_BUILD_DIR,
  })
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
