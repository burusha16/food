import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { ROUTES } from './static.paths';
import { environment } from './src/environments/environment';
import { createWindow } from 'domino';

const distFolder = join(__dirname, 'dist');
const staticPagesFolder = join(distFolder, 'server/static');
const index = readFileSync(join(distFolder, 'browser/index.html'), 'utf8');
const template = readFileSync(join(distFolder, 'browser/index.html')).toString();
const serverFiles = readdirSync(join(distFolder, 'server'));
const serverMainFiles = serverFiles.filter((file) => file.startsWith('main'));
const hash = serverMainFiles[0].split('.')[1];
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/server/main.${hash}`);
const win = createWindow(template);
let previousRender = Promise.resolve();

// polyfill undefined
global['window'] = win;
global['document'] = win.document;
global['CSS'] = null;

enableProdMode();
if (!existsSync(staticPagesFolder)) {
  mkdirSync(staticPagesFolder);
}

ROUTES.forEach((route) => {
  const fullPath = join(staticPagesFolder, route);
  let syncpath = staticPagesFolder;

  route.split('/').forEach((element) => {
    syncpath = join(syncpath, element);
    if (!existsSync(fullPath)) {
      mkdirSync(syncpath);
    }
  });

  previousRender = previousRender
    .then(() =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP),
          {
            provide: REQUEST,
            useValue: { cookie: '', headers: {} },
          },
          {
            provide: RESPONSE,
            useValue: {},
          },
          {
            provide: 'ORIGIN_URL',
            useValue: environment.host,
          },
        ],
      }),
    )
    .then((html) => writeFileSync(join(fullPath, 'index.html'), html));
});
copyFileSync(`${process.cwd()}/src/assets/robots.txt`, join(staticPagesFolder, 'robots.txt'));
