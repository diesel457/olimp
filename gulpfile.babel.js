import gulp from 'gulp'
import stylus from 'gulp-stylus'
import concat from 'gulp-concat'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import postcssFilenamePrefix from 'postcss-filename-prefix'
import fs from 'fs'

const appsFolder = 'apps'
let apps = fs.readdirSync(appsFolder)

const processors = [autoprefixer, postcssFilenamePrefix]

function css() {
    for (let app of apps) {
        gulp.src(['styles/index.styl', `${appsFolder}/${app}/**/*.styl`])
            .pipe(stylus({
                'include css': true,
                import: [
                    __dirname + '/styles/variables.styl'
                ]
            }))
            .pipe(postcss(processors))
            .pipe(concat(`${app}.styles.css`))
            .pipe(gulp.dest('public/css/apps'))
    }
}

gulp.task('css', css)

gulp.task('watch', () => {
    for (let app of apps) {
        gulp.watch(`${appsFolder}/${app}/**/*.styl`, ['css'])
    }
    gulp.watch('styles/**/*.styl', ['css'])
})

gulp.task('default', ['css', 'watch'])

gulp.task('build', ['css'])