
import { isMobile, FLS } from "../files/functions.js";
import { flsModules } from "../files/modules.js";

/*
Specify an attribute for the object that will move after the mouse - data-prlx-mouse.

// =========


Attribute											  Default value
-------------------------------------------------------------------------------------------------------------------
data-prlx-cx="х"					100							value more - less shift percentage
data-prlx-cy="y"					100							value more - less shift percentage
data-prlx-dxr																		against axis X
data-prlx-dyr																		against axis Y
data-prlx-a="animation speed"				50								more value - more speed

// =========
If you need to read the mouse movement in the parent block, specify the attribute for that parent - data-prlx-mouse-wrapper

If paralax has image - width > 100%. 
Example:
	width: 130%;
	height: 130%;
	top: -15%;
	left: -15%;
*/
class MousePRLX {
	constructor(props, data = null) {
		let defaultConfig = {
			init: true,
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props);
		if (this.config.init) {
			const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
			if (paralaxMouse.length) {
				this.paralaxMouseInit(paralaxMouse);
				this.setLogging(`Проснулся, слежу за объектами: (${paralaxMouse.length})`);
			} else {
				this.setLogging('Нет ни одного объекта. Сплю...zzZZZzZZz...');
			}
		}
	}
	paralaxMouseInit(paralaxMouse) {
		paralaxMouse.forEach(el => {
			const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

			//  X 
			const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
			//  У 
			const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
			// Direction Х
			const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
			// Direction У
			const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
			// Animation speed
			const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


			// 
			let positionX = 0, positionY = 0;
			let coordXprocent = 0, coordYprocent = 0;

			setMouseParallaxStyle();

			// I check for the presence of a parent in which the position of the mouse will be read
			if (paralaxMouseWrapper) {
				mouseMoveParalax(paralaxMouseWrapper);
			} else {
				mouseMoveParalax();
			}

			function setMouseParallaxStyle() {
				const distX = coordXprocent - positionX;
				const distY = coordYprocent - positionY;
				positionX = positionX + (distX * paramAnimation / 1000);
				positionY = positionY + (distY * paramAnimation / 1000);
				el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
				requestAnimationFrame(setMouseParallaxStyle);
			}
			function mouseMoveParalax(wrapper = window) {
				wrapper.addEventListener("mousemove", function (e) {
					const offsetTop = el.getBoundingClientRect().top + window.scrollY;
					if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
						// Get height and width block
						const parallaxWidth = window.innerWidth;
						const parallaxHeight = window.innerHeight;
						// 0 center
						const coordX = e.clientX - parallaxWidth / 2;
						const coordY = e.clientY - parallaxHeight / 2;
						// Get percents
						coordXprocent = coordX / parallaxWidth * 100;
						coordYprocent = coordY / parallaxHeight * 100;
					}
				});
			}
		});
	}
	// Logging console
	setLogging(message) {
		this.config.logging ? FLS(`[PRLX Mouse]: ${message}`) : null;
	}
}
// Start and added in modules object
flsModules.mousePrlx = new MousePRLX({});

