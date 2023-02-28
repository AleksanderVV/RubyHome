/*
Documentation: https://swiperjs.com/
Snippet(HTML): swiper
*/

// Connecting Swiper from node_modules
// Connect add-on
// Example: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Base modules:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
https://swiperjs.com/
*/

// Styles Swiper
// 
import "../../scss/base/swiper.scss";
// Full styles from scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Full styles from node_modules
// import 'swiper/css';

// Sliders initialization
function initSliders() {
	// List sliders
	// If page contain slider
	if (document.querySelector('.swiper')) { // class our slider
		// Create slider
		new Swiper('.swiper', { // class our slider
			// connect modules
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Effect
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Pagination
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Scrollbar
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Buttons Left-Right
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Breakpoints
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// event
			on: {

			}
		});
	}
}
// Scroll slider (class swiper_scroll for wrapper slider)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Init sliders
	initSliders();
	// Init Slider Scroll (class swiper_scroll)
	//initSlidersScroll();
});