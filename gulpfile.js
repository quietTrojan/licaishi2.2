var gulp = require('gulp'); //本地安装gulp所用到的地方
var less = require('gulp-less');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var prefix = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var styleInject = require("gulp-style-inject");

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

//定义一个testLess任务（自定义任务名称）
gulp.task('less_css', function () {
    return gulp.src(['src/less/hongbao_all_v2.2.less','src/less/test.less','src/less/jieguoye.less']) //该任务针对的文件
        .pipe(less()).on('error', handleError)
        .pipe(prefix()).on('error', handleError)
        .pipe(gulp.dest('dist/css/'));
    console.log('less编译',new Date().getTime());
});

//gulp.task('default', ['less_css']);

gulp.task('imagemin', function(){
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

//gulp.task('default', ['concat_js','less_css','file_include']);

 gulp.task('styleInject',['less_css'],function () {
    gulp.src(['src/htmlTel/*'])
        .pipe(styleInject())
        .pipe(gulp.dest("dist/"));
});

gulp.task('watch', function () {
    var watcher01 = gulp.watch(['src/**/*',], ['less_css']);
    watcher01.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    var watcher02 = gulp.watch(['src/htmlTel/*','src/less/jieguoye.less'], ['styleInject']);
    watcher02.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
