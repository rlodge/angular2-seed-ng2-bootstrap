import * as slash from 'slash';
import {join} from 'path';
import {APP_BASE, APP_DEST} from '../config';

let injectables: string[] = [];

export function injectableAssetsRef() {
  return injectables;
}

export function registerInjectableAssetsRef(paths: string[], target: string = '') {
  injectables = injectables.concat(
    paths
      .filter(path => !/(\.map)$/.test(path))
      .map(path => join(target, slash(path).split('/').pop()))
  );
}

export function transformPath(plugins, env) {
  return function (filepath) {
    if (env === 'prod') {
      filepath = filepath.replace(`/${APP_DEST}`, '').replace(/^\//,'');
      arguments[0] = filepath;
    } else {
      arguments[0] = join(APP_BASE, filepath);
    }
	  var s = slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    console.log(filepath + " --> " + s);
    return s;
  };
}
