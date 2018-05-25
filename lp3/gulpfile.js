// подключаем gulp
var gulp = require('gulp');
// подключаем sass для препроцессинга
var sass = require('gulp-sass');
// подключаем browser-sync для работы с браузером
var browserSync = require('browser-sync');
// подключаем useref для модификации html
var useref = require('gulp-useref')
    // подключаем gulp-uglify для минимификации js
var uglify = require('gulp-uglify')
    // подключаем gulp-minify-css
var mincss = require('gulp-minify-css')
    // подключаем gulp-if для выбора команд
var gulpif = require('gulp-if')
    // подключаем gulp-concat для объединения файлов
var concat = require('gulp-concat')
    // подключаем gulp-flatten для копирования в корень папки
var flatten = require('gulp-flatten')
    // подключаем gulp-imagemin для оптимизации картинок
var imagemin = require('gulp-imagemin')
    // подключаем imagemin-pngquant для оптимизации картинок
var pngquant = require('imagemin-pngquant')


// настраиваем компиляцию scss в css с обновлением браузера
gulp.task('sass-compile', function() {
    return gulp.src(['src/sass/main.scss'])
        .pipe(sass())
        .pipe(flatten())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//настраиваем watch
gulp.task('watch', ['copyImg', 'copyFonts', 'copyVideo', 'browserSync'], function() {
    // компиляция scss, сборка и минификация css и js  
    gulp.watch('src/sass/**/*.scss', ['sass-compile']);
    gulp.watch('src/css/*.css', ['useref']);
    gulp.watch('src/js/*.js', ['useref']);
});

//настраиваем обновление браузера
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'src'
        }
    })
});

//настраиваем сборку файлов с обновлением браузера
gulp.task('useref', ['libsJS', 'libsCSS'], function() {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', mincss()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});


//Оптимизируем и переносим картинки
gulp.task('copyImg', function() {
    gulp.src(['src/img/**/*.*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'))

});

//Переносим без имзенений  шрифты
gulp.task('copyFonts', function() {
    return gulp.src(['src/fonts/**/*.*'])
        .pipe(gulp.dest('dist/fonts'))
});
//Переносим без имзенений видео
gulp.task('copyVideo', function() {
    return gulp.src(['src/video/**/*.*'])
        .pipe(gulp.dest('dist/video'))
});

// собираем все библиотеки и свои скрипты в одну папку
gulp.task('libsJS', function() {
    return gulp.src(['src/packages/**/*.js', 'src/scripts/**/*.js'])
        .pipe(flatten())
        .pipe(gulp.dest('src/js'))
});

// собираем css из библиотек в папку со своими css
gulp.task('libsCSS', function() {
    return gulp.src(['src/packages/**/*.css'])
        .pipe(flatten())
        .pipe(gulp.dest('src/css'))
});