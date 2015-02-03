'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');

var bundleShare = function(b, dest, bundleName, mode) {
    var bundle = b.bundle();
    bundle
        .on('error', function(err) {
            gutil.log(gutil.colors.red('Browserify failed', '\n', err.message));
            bundle.end();
        })
        .pipe(source(bundleName))
        .pipe(buffer())
        .pipe(gulp.dest(dest));
};

var browserifyShare = function(singleRun, src, dest, bundleName, mode) {
    bundleName = bundleName || 'bundle.js';
    // we need to pass these config options to browserify
    var b = browserify({
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    if (singleRun) {
        b = watchify(b);
    }
    b.on('update', function() {
        bundleShare(b, dest, bundleName, mode);
    });

    b.on('log', function(msg) {
        gutil.log(gutil.colors.green('browserify'), msg);
    });

    b.add(src);
    bundleShare(b, dest, bundleName, mode);

};
gulp.task('browserify', function() {
    var dest = './dist';
    browserifyShare(false, './src/index.js', dest, 'bundle.js', 'dev');

});

gulp.task('watchify', function() {
    var dest = './dist';
    browserifyShare(true, './src/index.js', dest, 'bundle.js', 'dev');

});
