// Подключение функционала "Чертогов Фрилансера"
import { isMobile, uniqArray, FLS } from "../files/functions.js";
import { flsModules } from "../files/modules.js";

// Watcher
// data-watch - for custom code
// data-watch-root - watcher`s parrent 
// data-watch-margin - margin
// data-watch-threshold - percent object open for start
// data-watch-once - one time watch
// _watcher-view - class added then object full wiew

class ScrollWatcher {
	constructor(props) {
		let defaultConfig = {
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props);
		this.observer;
		!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
	}
	// Constructor
	scrollWatcherUpdate() {
		this.scrollWatcherRun();
	}
	// Start constructor
	scrollWatcherRun() {
		document.documentElement.classList.add('watcher');
		this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
	}
	// Watchers constructor
	scrollWatcherConstructor(items) {
		if (items.length) {
			this.scrollWatcherLogging(`Проснулся, слежу за объектами (${items.length})...`);
			// uniqe parametres
			let uniqParams = uniqArray(Array.from(items).map(function (item) {
				return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
			}));
			// get groups objects with same parametres,
			// create seetings, init watcher
			uniqParams.forEach(uniqParam => {
				let uniqParamArray = uniqParam.split('|');
				let paramsWatch = {
					root: uniqParamArray[0],
					margin: uniqParamArray[1],
					threshold: uniqParamArray[2]
				}
				let groupItems = Array.from(items).filter(function (item) {
					let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
					let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
					let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
					if (
						String(watchRoot) === paramsWatch.root &&
						String(watchMargin) === paramsWatch.margin &&
						String(watchThreshold) === paramsWatch.threshold
					) {
						return item;
					}
				});

				let configWatcher = this.getScrollWatcherConfig(paramsWatch);

				// init watcher with own parametres
				this.scrollWatcherInit(groupItems, configWatcher);
			});
		} else {
			this.scrollWatcherLogging('Сплю, нет объектов для слежения. ZzzZZzz');
		}
	}
	// Create seetings
	getScrollWatcherConfig(paramsWatch) {
		// 
		let configWatcher = {}
		// parrent
		if (document.querySelector(paramsWatch.root)) {
			configWatcher.root = document.querySelector(paramsWatch.root);
		} else if (paramsWatch.root !== 'null') {
			this.scrollWatcherLogging(`Эмм... родительского объекта ${paramsWatch.root} нет на странице`);
		}
		// Trip offset
		configWatcher.rootMargin = paramsWatch.margin;
		if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
			this.scrollWatcherLogging(`Ой ой, настройку data-watch-margin нужно задавать в PX или %`);
			return
		}
		// Trigger points
		if (paramsWatch.threshold === 'prx') {
			// paralacs
			paramsWatch.threshold = [];
			for (let i = 0; i <= 1.0; i += 0.005) {
				paramsWatch.threshold.push(i);
			}
		} else {
			paramsWatch.threshold = paramsWatch.threshold.split(',');
		}
		configWatcher.threshold = paramsWatch.threshold;

		return configWatcher;
	}
	// create new watcher with own seetings
	scrollWatcherCreate(configWatcher) {
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				this.scrollWatcherCallback(entry, observer);
			});
		}, configWatcher);
	}
	// Init watcher with own seetings
	scrollWatcherInit(items, configWatcher) {
		// create new watcher with own seetings
		this.scrollWatcherCreate(configWatcher);
		// Passing Elements to an Observer
		items.forEach(item => this.observer.observe(item));
	}
	// Processing function for basic actions of trigger points
	scrollWatcherIntersecting(entry, targetElement) {
		if (entry.isIntersecting) {
			// See object
			// add class
			!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;
			this.scrollWatcherLogging(`Я вижу ${targetElement.classList}, добавил класс _watcher-view`);
		} else {
			// Not see object
			// remove class
			targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;
			this.scrollWatcherLogging(`Я не вижу ${targetElement.classList}, убрал класс _watcher-view`);
		}
	}
	// Object Tracking Disable Function
	scrollWatcherOff(targetElement, observer) {
		observer.unobserve(targetElement);
		this.scrollWatcherLogging(`Я перестал следить за ${targetElement.classList}`);
	}
	// Console output function
	scrollWatcherLogging(message) {
		this.config.logging ? FLS(`[Наблюдатель]: ${message}`) : null;
	}
	// Observation processing function
	scrollWatcherCallback(entry, observer) {
		const targetElement = entry.target;
		// Handling Basic Action Point Actions
		this.scrollWatcherIntersecting(entry, targetElement);
		// If there is a data-watch-once attribute, we remove watching
		targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
		// Create your own callback event
		document.dispatchEvent(new CustomEvent("watcherCallback", {
			detail: {
				entry: entry
			}
		}));

		/*
		// Selecting the required objects
		if (targetElement.dataset.watch === 'some value') {
			// writing a unique
		}
		if (entry.isIntersecting) {
			// see object
		} else {
			// not see object
		}
		*/
	}
}
// Run and add modules to the object
flsModules.watcher = new ScrollWatcher({});
