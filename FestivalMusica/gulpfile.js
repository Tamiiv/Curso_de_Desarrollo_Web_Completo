// series permite ejecutar múltiples tareas
import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

export function js(done) {
    src('src/js/app.js')
    .pipe( dest('build/js'))
    done()
}

// sourcemaps para saber en que archivo de sass se encuentra el código para que lo modifiques
export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'), {sourcemaps: true})
    
    done()
}

export function dev() {
    // Va a buscar todos los archivos que tenga la extensión scss dentro de la carpeta scss
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
}

export default series(js, css, dev)