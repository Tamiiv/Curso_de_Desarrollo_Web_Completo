import {src, dest, watch} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

// sourcemaps para saber en que archivo de sass se encuentra el código para que lo modifiques
export function css(done){
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('build/css'), {sourcemaps: true})
    
    done()
}

export function dev(){
    // Va a buscar todos los archivos que tenga la extensión scss dentro de la carpeta scss
    watch('src/scss/**/*.scss', css)
}