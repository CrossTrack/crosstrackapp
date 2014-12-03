/*gulpfile with livereload */
var gulp = require('gulp'),
    connect = require('gulp-connect');
 var browserSync = require('browser-sync');

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./*.html'], ['html']);
});

// gulp.task('serve', function() {
//     browserSync({
//         server: {
//             baseDir: "./"
//         }
//     });
// });
// , 'browser-sync'

gulp.task('default', ['connect', 'watch']);
