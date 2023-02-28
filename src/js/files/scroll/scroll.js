
import { isMobile, getHash } from "../functions.js";
// Scroll to block module
import { gotoBlock } from "./gotoblock.js";
// Controll variable add event window scroll.
let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// Page smooth navigation 
export function pageNavigation() {
	// data-goto - block ID
	// data-goto-header - header
	// data-goto-top - unscrew to specified size
	// data-goto-speed - speed (if use added plugin)
	// click Menu
	document.addEventListener("click", pageNavigationAction);
	// If scrollWatcher connect, highlight the current menu item
	document.addEventListener("watcherCallback", pageNavigationAction);
	// Base function
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// Handling Navigation Items, if value specified navigator highlight the current menu item
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// If see object
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// don`t see object
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// Scroll by hash
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
	}
}
// Work header
export function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("windowScroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				} else {
					// upscroll code
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}
				timer = setTimeout(() => {
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}, headerShowTimer);
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}
// Sticky Block
export function stickyBlock() {
	addWindowScrollEvent = true;
	// data-sticky  for the parent inside which the block sticks
	// data-sticky-header for parrent, with header hight
	// data-sticky-top="" for parrent, can set margin top
	// data-sticky-bottom="" for parrent, can set margin bottom
	// data-sticky-item for sticky block
	function stickyBlockInit() {
		const stickyParents = document.querySelectorAll('[data-sticky]');
		if (stickyParents.length) {
			stickyParents.forEach(stickyParent => {
				let stickyConfig = {
					media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
					top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
					bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
					header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header.header').offsetHeight : 0
				}
				stickyBlockItem(stickyParent, stickyConfig);
			});
		}
	}
	function stickyBlockItem(stickyParent, stickyConfig) {
		const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
		const headerHeight = stickyConfig.header;
		const offsetTop = headerHeight + stickyConfig.top;
		const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

		document.addEventListener("windowScroll", stickyBlockActions);
		//window.addEventListener("resize", stickyBlockActions);

		function stickyBlockActions(e) {
			const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
			let stickyItemValues = {
				position: "relative",
				bottom: "auto",
				top: "0px",
				left: "0px",
				width: "auto"
			}
			if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
				if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
					if (scrollY >= startPoint && scrollY <= endPoint) {
						stickyItemValues.position = `fixed`;
						stickyItemValues.bottom = `auto`;
						stickyItemValues.top = `${offsetTop}px`;
						stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Учесть разницу в ширине экрана?
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					} else if (scrollY >= endPoint) {
						stickyItemValues.position = `absolute`;
						stickyItemValues.bottom = `${stickyConfig.bottom}px`;
						stickyItemValues.top = `auto`;
						stickyItemValues.left = `0px`;
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					}
				}
			}
			stickyBlockType(stickyBlockItem, stickyItemValues);
		}
	}
	function stickyBlockType(stickyBlockItem, stickyItemValues) {
		stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
	}
	stickyBlockInit();
}
// When the module is connected, the event handler will run automatically
setTimeout(() => {
	if (addWindowScrollEvent) {
		let windowScroll = new Event("windowScroll");
		window.addEventListener("scroll", function (e) {
			document.dispatchEvent(windowScroll);
		});
	}
}, 0);