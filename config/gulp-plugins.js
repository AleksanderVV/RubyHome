// Import Modules
import notify from "gulp-notify";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import ifPlugin from "gulp-if";
import prettier from "gulp-prettier";
import rename from 'gulp-rename';

// Export Object
export const plugins = {
	notify,
	if: ifPlugin,
	prettier,
	newer,
	plumber,
	rename
}