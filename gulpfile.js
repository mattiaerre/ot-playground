var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

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