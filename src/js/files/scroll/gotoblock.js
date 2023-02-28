
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Connecting add-on to increase the expansion 
// Documentation: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Module smooth scrool to block
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			headerItemHeight = document.querySelector(headerItem).offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Close Menu
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// Scroll with add-on
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// Standart scroll
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Юхуу...едем к ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${targetBlock}`);
	}
};