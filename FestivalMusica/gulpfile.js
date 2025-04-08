import path from 'path'
import fs from 'fs'
import { glob } from 'glob'

// series permite ejecutar múltiples tareas
import {src, dest, watch, series} from 'gulp'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'

const sass = gulpSass(dartSass);

// instalamos gulp-terser para minificar el archivo js para un mejor performance
import terser from 'gulp-terser'
import sharp from 'sharp'

export function js(done) {
    src('src/js/app.js')
    .pipe(terser())
    .pipe( dest('build/js'))
    done()
}

// sourcemaps para saber en que archivo de sass se encuentra el código para que lo modifiques
// outputStyle: 'compressed' minificar css para mejor performance
export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('build/css'), {sourcemaps: true})
    
    done()
}

// instalar sharp
// Código de node.js crea versiones más pequeñas de las imagenes requiriendo las dependencias de sharp y fs
export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}

// Generamos imagenes WebP para una mejor performance - instalamos la dependencia de glob
// Imagenes se encarga de buscar esas imagenes y procesarImagenes de generar en formato .WebP y/o .avif
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

// Procesa los archivos scss, js y las imágenes
export function dev() {
    // Va a buscar todos los archivos que tenga la extensión scss dentro de la carpeta scss
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/img/**/*.{png,jpg}', imagenes)
}

export default series(imagenes, crop, js, css, dev)