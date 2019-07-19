const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

const paths = {
	styles: {
		src: 'src/assets/scss/common/*.scss',
		dest: './dist/css',
		srcWatch: 'src/assets/scss/**/*.scss',
	},
	htmls: {
		src: 'src/views/common/**/*.pug',
		dest: './dist/html',
	}
};

const htmls = () => {
	return gulp.src([
		paths.htmls.src,
		'!src/views/common/_layouts/*.pug',
		'!src/views/common/_partials/**/*.pug',
	])
		.pipe(pug({
			pretty: true,
		}))
		.pipe(gulp.dest(paths.htmls.dest));
};
const styles = () => {
	return gulp.src(paths.styles.src)
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false,
		}))
		.pipe(gulp.dest(paths.styles.dest));
};

const watch = () => {
	gulp.watch(paths.styles.srcWatch, styles);
	gulp.watch('src/views/common/**/*.pug', htmls);
};

const build = gulp.series(gulp.parallel(styles, htmls));

exports.styles = styles;
exports.htmls = htmls;
exports.watch = watch;
exports.build = build;

exports.default = build;
