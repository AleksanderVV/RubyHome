
import { isMobile, FLS } from "./functions.js";
// Active modules
import { flsModules } from "./modules.js";

// Connect from node_modules
import tippy from 'tippy.js';

// Connect style from src/scss/libs
import "../../scss/libs/tippy.scss";
// Connect style from node_modules
//import 'tippy.js/dist/tippy.css';

// Start and adding
flsModules.tippy = tippy('[data-tippy-content]', {

});