
// Enable/Disable FLS (Full Logging System) (in work...)
window['FLS'] = true;

// Connecting main style file
import "../scss/style.scss";

import * as flsFunctions from "./files/functions.js";

/* Webp support check, adding class webp or no-webp for HTML */
/* (i) needed for correct display webp from css  */
flsFunctions.isWebp();

/* Adding classes touch for HTML if mobile browser */
// flsFunctions.addTouchClass();

/* Adding loaded for HTML after full screen loaded */
// flsFunctions.addLoadedClass();

// ===========  Burger Menu  =========== 
//flsFunctions.menuInit();

/* Accounting for a float bar on mobile devices when 100vh */
// flsFunctions.fullVHfix();

/*
Spollers
Documentation: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
// flsFunctions.spollers();

/*
Tabs
Documentation: https://template.fls.guru/template-docs/modul-taby.html
Snippet (HTML): tabs
*/
//flsFunctions.tabs();

/*
"Show more"
Documentation: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Snippet (HTML): showmore
*/
// flsFunctions.showMore();

/*
Popups
Documentation: https://template.fls.guru/template-docs/funkcional-popup.html
Snippet (HTML): pl
*/
//import './libs/popup.js'

/*
Parallax mouse
Snippet (HTML): 
*/
// import './libs/parallax-mouse.js'

// ===========  Forms  =========== 

import * as flsForms from "./files/forms/forms.js";

/* Form fields */
/* Documentation: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formFieldsInit({ viewPass: false });

/* Send forms */
/* Documentation: https://template.fls.guru/template-docs/rabota-s-formami.html */
// flsForms.formSubmit();

/* Form modules "quantity" */
// flsForms.formQuantity();

/* Star rating */
// flsForms.formRating();

/* Select. */
// import './libs/select.js'

// =========== Mask module (in work) ===========
/*
Connecting and setting in files js/files/forms/inputmask.js
Documentation: https://github.com/RobinHerbots/inputmask
Snippet(HTML):
*/
// import "./files/forms/inputmask.js";

// ===========  Range module  =========== 
/*
Connecting and setting in files js/files/forms/range.js
Documentation: https://refreshless.com/nouislider/
Snippet (HTML): range
*/
// import "./files/forms/range.js";

// ===========  Tip module (tippy)  =========== 
/*
Connecting plugin Tippy.js and its settings in files js/files/tippy.js
Documentation: https://atomiks.github.io/tippyjs/
Snippet (HTML): tip (adding attribute with tip for html tag)
*/
// import "./files/tippy.js";

// ===========  Slider - Swiper  =========== 

/*
Connecting Swiper and new sliders in files js/files/sliders.js
Documentation: https://swiperjs.com/
Snippet(HTML): swiper
*/
// import "./files/sliders.js";

//  =========== Page scroll modules  =========== 

/*
Change design scrollbar
In HTML adding block attribute - data-simplebar
Documentation: https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
Snippet(HTML): 
*/
// import './files/scroll/simplebar.js';

// Lazy loading
// Documentation: https://github.com/verlok/vanilla-lazyload
// Snippet(HTML):
// import './files/scroll/lazyload.js';

// Watcher with attribute - data-watch
// Snippet(HTML):
// import './libs/watcher.js'

// Functions scroll
import * as flsScroll from "./files/scroll/scroll.js";

// Smooth page navigation
// Documentation: https://template.fls.guru/template-docs/modul-plavnoj-navigacii-po-stranice.html
// flsScroll.pageNavigation();

// Add header classes on scroll
// Documentation: https://template.fls.guru/template-docs/modul-dobavleniya-klassov-k-shapke-pri-prokrutke-stranicy.html
// flsScroll.headerScroll();

// sticky Block
// flsScroll.stickyBlock();

// =========== Gallery  =========== 
/*
Documentation: https://www.lightgalleryjs.com/docs/
Snippet(HTML):
*/
// import "./files/gallery.js";

//=========== Other plugins ==========

/* Dinamic adaptive */
// import "./libs/dynamic_adapt.js";

/* Formating numbers */
// import './libs/wNumb.min.js';

/* Connecting our script */
import "./files/script.js";
