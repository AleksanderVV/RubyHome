import LazyLoad from "vanilla-lazyload";

// Work with object has class ._lazy
const lazyMedia = new LazyLoad({
	elements_selector: '[data-src],[data-srcset]',
	class_loaded: '_lazy-loaded',
	use_native: true
});

// Update module
//lazyMedia.update();