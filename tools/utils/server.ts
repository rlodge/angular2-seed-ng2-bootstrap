import * as util from 'gulp-util';
import * as express from 'express';
import * as openResource from 'open';
import * as serveStatic from 'serve-static';
import * as codeChangeTool from './code_change_tools';
import {resolve} from 'path';
import {APP_BASE, APP_DEST, DOCS_DEST, DOCS_PORT, PORT} from '../config';

export function serveSPA() {
  let server = express();
  codeChangeTool.listen();
  server.use.apply(server, codeChangeTool.middleware);

  //Redirect everything that doesn't end in an extension to index.html
  var indexPath = resolve(process.cwd(), APP_DEST + '/index.html');
  server.get(/^(.{1,6}|.*[^\.]{5})$/, function(request, response) {
    util.log("Redirecting request for " + request.url + " to " + indexPath);
    response.sendFile(indexPath);
  });

  server.listen(PORT, () => {
    util.log('Server is listening on port: ' + PORT);
    openResource('http://localhost:' + PORT + APP_BASE + APP_DEST);
  });
}

export function notifyLiveReload(e) {
  let fileName = e.path;
  codeChangeTool.changed(fileName);
}

export function serveDocs() {
  let server = express();

   server.use(
    APP_BASE,
    serveStatic(resolve(process.cwd(), DOCS_DEST))
  );

   server.listen(DOCS_PORT, () =>
    openResource('http://localhost:' + DOCS_PORT + APP_BASE)
  );
}
