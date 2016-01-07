import {join} from 'path';
import {APP_SRC, APP_DEST, CSS_DEST} from '../config';
import * as merge from 'merge-stream';

export = function buildAssetsProd(gulp, plugins) {

  return function () {
    merge(buildImagesProd(), buildSassProd());
  };

  function buildImagesProd() {
    return gulp.src([
        join(APP_SRC, '**/*.gif'),
        join(APP_SRC, '**/*.jpg'),
        join(APP_SRC, '**/*.png'),
        join(APP_SRC, '**/*.svg')
      ])
      .pipe(gulp.dest(APP_DEST));
  }

  function buildSassProd() {
    return gulp.src(join(APP_SRC, 'assets/*.scss'))
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(CSS_DEST));
  }

}
