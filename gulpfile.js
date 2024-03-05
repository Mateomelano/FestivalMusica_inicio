const {src,dest, watch,parallel} = require('gulp');
//Css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');

//Javascript

const terser = require('gulp-terser-js');


function css(done) {
    console.log('compilando');
    src('src/scss/**/*.scss') //Identifircar Sass
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilar
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')); //Almacenarlo en el disco duro

    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('img/**/*.{png,jpg}')
        .pipe(imagemin(opciones))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    }
    src('img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'));

    done();
}

function javascaript(done){
    src('src//scss/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
    done();
}

function dev(done){
    
    watch('src/scss/**/*.scss',css);
    watch('src/scss/js/**/*.js',javascaript);


    done();
}

exports.css = css
exports.js = javascaript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.dev = parallel(css,javascaript,imagenes,versionWebp,dev)