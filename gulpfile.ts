import * as gulp from 'gulp';
import {StandardGulpBuild} from './node_modules/angular2-gulp-build/index';

// --------------
// Clean (override).
gulp.task('clean',       StandardGulpBuild.task('clean', 'all'));
gulp.task('clean.dist',  StandardGulpBuild.task('clean', 'dist'));
gulp.task('clean.test',  StandardGulpBuild.task('clean', 'test'));
gulp.task('clean.tmp',   StandardGulpBuild.task('clean', 'tmp'));

gulp.task('check.versions', StandardGulpBuild.task('check.versions'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  StandardGulpBuild.runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  StandardGulpBuild.runSequence('clean.dist',
              'tslint',
              'build.sass.dev',
              'build.assets.dev',
              'build.js.dev',
              'build.index',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  StandardGulpBuild.runSequence('clean.dist',
              'clean.tmp',
              'tslint',
              'build.assets.prod',
              'build.html_css.prod',
              'build.deps',
              'build.js.prod',
              'build.bundles',
              'build.index',
              done));

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  StandardGulpBuild.runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
  StandardGulpBuild.runSequence('build.test',
              'watch.test',
              done));

// --------------
// Test.
gulp.task('test', done =>
  StandardGulpBuild.runSequence('clean.test',
              'tslint',
              'build.test',
              'karma.start',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  StandardGulpBuild.runSequence('build.dev',
              'server.start',
              'watch.serve',
              done));

// --------------
// Docs
// Disabled until https://github.com/sebastian-lenz/typedoc/issues/162 gets resolved
// gulp.task('docs', done =>
//   StandardGulpBuild.runSequence('build.docs',
//               'serve.docs',
//               done));
