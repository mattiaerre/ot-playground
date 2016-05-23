var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	gutil = require('gulp-util'),
	typescript = require('gulp-tsc');

gulp.task('develop', function () {
	nodemon(
		{
			script: 'index.js',
			ext: '*',
			ignore: ['node_modules/*']
		})
		.on('restart', function () {
			console.log('restarted!');
		});
});

gulp.task('watch-ts', function () {
	return gulp.watch(['src/**/*.ts'], ['compile-ts']);
});

gulp.task('compile-ts', function () {
	gulp.src(['src/**/*.ts'])
		.pipe(typescript({ module: 'commonjs' }))
		.pipe(gulp.dest('lib/'));
});
