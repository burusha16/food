import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as compression from 'compression';
// import * as cookieparser from 'cookie-parser';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const domino = require('domino');
const app = express();
const distFolder = join(__dirname, '.', 'dist');
const template = readFileSync(join(distFolder, 'browser/index.html')).toString();
const win = domino.createWindow(template);
const serverFiles = readdirSync(join(distFolder, 'server'));
const mainServerFiles = serverFiles.filter((file) => file.startsWith('main'));
const hash = mainServerFiles[0].split('.')[1];
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main.${hash}`);
const PORT = process.env.PORT || 4000;

// polyfill undefined
global['window'] = win;
global['document'] = win.document;
global['Event'] = domino.impl.Event;
global['ErrorEvent'] = domino.impl.Event;

enableProdMode();
app.use(compression());
// app.use(cookieparser());

app.use((req, res, next) => {
  const redirectowww = false;
  const redirectohttps = false;
  const wwwredirecto = true;

  if (req.url === '/index.html') {
    res.redirect(301, 'https://' + req.hostname);
  }
  if (
    redirectohttps &&
    req.headers['x-forwarded-proto'] !== 'https' &&
    req.hostname !== 'localhost'
  ) {
    if (req.url === '/robots.txt') {
      next();
      return;
    }
    res.redirect(301, 'https://' + req.hostname + req.url);
  }

  if (redirectowww && !req.hostname.startsWith('www.')) {
    res.redirect(301, 'https://www.' + req.hostname + req.url);
  }
  if (wwwredirecto && req.hostname.startsWith('www.')) {
    const host = req.hostname.slice(4, req.hostname.length);
    res.redirect(301, 'https://' + host + req.url);
  }
  next();
});

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)],
  }),
);

app.set('view engine', 'html');
app.set('views', 'src');

app.use(express.static(join(distFolder,  'server/static')));
app.get('/api/actual', (req, res) => {
  const response = JSON.parse(
    readFileSync('./dist/browser/api/actual.json', 'utf8'),
  );
  res.send(response);
});
app.get('/api/menu', (req, res) => {
  const response = JSON.parse(
    readFileSync('./dist/browser/api/menu.json', 'utf8'),
  );
  res.send(response);
});
app.get('/api/app-config', (req, res) => {
  const response = JSON.parse(
    readFileSync('./dist/browser/api/app-config.json', 'utf8'),
  );
  res.send(response);
});
app.get('/api/feedback', (req, res) => {
  const response = JSON.parse(
    readFileSync('./dist/browser/api/feedback.json', 'utf8'),
  );
  res.send(response);
});

app.get('*', (req, res) => {
  global['navigator'] = req['headers']['user-agent'];
  const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];

  const url = req.originalUrl;
  // tslint:disable-next-line:no-console
  console.time(`GET: ${url}`);
  res.render(
    '../dist/browser/index',
    {
      req: req,
      res: res,
      providers: [
        {
          provide: REQUEST,
          useValue: req,
        },
        {
          provide: RESPONSE,
          useValue: res,
        },
        {
          provide: 'ORIGIN_URL',
          useValue: `${http}://${req.headers.host}`,
        },
      ],
    },
    (err, html) => {
      if (!!err) {
        throw err;
      }

      // tslint:disable-next-line:no-console
      res.send(html);
    },
  );
});

app.listen(PORT);
