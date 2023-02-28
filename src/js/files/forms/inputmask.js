/* Masks for field (in work...) */

// Connecting list active modules
import { flsModules } from "../modules.js";

// Connecting module
import "inputmask/dist/inputmask.min.js";

const inputMasks = document.querySelectorAll('input');
if (inputMasks.length) {
	flsModules.inputmask = Inputmask().mask(inputMasks);
}