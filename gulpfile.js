// Import main module
import gulp from "gulp";
// Import main plugins
import { plugins } from "./config/gulp-plugins.js";
// Import path
import { path } from "./config/gulp-settings.js";

// Passing values to a global variable
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	isWebP: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
	gulp: gulp,
	path: path,
	plugins: plugins
}

// Import Tasks
import { reset } from "./config/gulp-tasks/reset.js";
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { jsDev } from "./config/gulp-tasks/js-dev.js";
import { images } from "./config/gulp-tasks/images.js";
import { ftp } from "./config/gulp-tasks/ftp.js";
import { zip } from "./config/gulp-tasks/zip.js";
import { sprite } from "./config/gulp-tasks/sprite.js";
import { gitignore } from "./config/gulp-tasks/gitignore.js";
import { otfToTtf, ttfToWoff, fonstStyle } from "./config/gulp-tasks/fonts.js";

// Sequential font processing
const fonts = gulp.series(reset, otfToTtf, ttfToWoff, fonstStyle);
// We will perform the main tasks in parallel after processing the fonts
const devTasks = gulp.parallel(fonts, gitignore);
// We will perform the main tasks in parallel after processing the fonts
const buildTasks = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, images, gitignore));

// Export Tasks
export { html }
export { css }
export { js }
export { jsDev }
export { images }
export { fonts }
export { sprite }
export { ftp }
export { zip }

// Building scenarios for executing tasks
const development = gulp.series(devTasks);
const build = gulp.series(buildTasks);
const deployFTP = gulp.series(buildTasks, ftp);
const deployZIP = gulp.series(buildTasks, zip);

// Export scenarios
export { development }
export { build }
export { deployFTP }
export { deployZIP }

// Executing the Default Script
gulp.task('default', development);






