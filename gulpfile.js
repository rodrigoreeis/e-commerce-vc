const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify');
const del = require('del');
const browserify = require('gulp-browserify')
const babelify = require('babelify')
const pug = require('gulp-pug')

const paths = {
    styles: {
        src: "src/assets/scss/common/*.scss",
        dest: "./dist/assets/css",
        srcWatch: "src/assets/scss/**/*.scss"
    },
    scripts: {
        src: "src/assets/js/common/*.js",
        dest: "./dist/assets/js",
        srcWatch: "src/assets/**/*.js"
    },
    htmls: {
        src: "src/views/common/**/*.pug",
        dest: "./dist/views/html"
    }
};

function clean(){
    return del(['dist'])
}
function htmls(){
    return gulp.src([
        paths.htmls.src,
        "!src/views/common/_layouts/*.pug",
        "!src/views/common/_partials/*.pug"
    ])
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(paths.htmls.dest))
}
function styles(){
    return gulp.src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

function scripts(){
    return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(browserify({
        transform: ['babelify'],
      }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch(){
    gulp.watch(paths.styles.srcWatch, styles);
    gulp.watch(paths.scripts.srcWatch, scripts);
    gulp.watch("src/views/common/**/*.pug", htmls)
}


const build = gulp.series(clean, gulp.parallel(styles, scripts, htmls));

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.htmls = htmls;
exports.watch = watch;
exports.build = build;

exports.default = build;
