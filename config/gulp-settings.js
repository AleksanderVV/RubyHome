// Get the project folder name
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

// Paths to the source folder and the result folder
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Paths to the project files and folders 
export const path = {
	build: {
		html: `${buildFolder}/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		html: `${srcFolder}/*.html`,
		pug: `${srcFolder}/pug/*.pug`,
		js: `${srcFolder}/js/app.js`,
		scss: `${srcFolder}/scss/style.scss`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		fonts: `${srcFolder}/fonts/*.*`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	rootFolder: rootFolder,
	srcFolder: srcFolder,
	ftp: `` // Path to the desired folder on the remote server. Gulp will add the project folder name automatically
};

// Setting up to FTP connection
export const configFTP = {
	host: "", // FTP server address
	user: "", // User name
	password: "", // Password
	parallel: 5 // Number of concurrent threads
}