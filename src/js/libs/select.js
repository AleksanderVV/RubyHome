
import { isMobile, _slideUp, _slideDown, _slideToggle, FLS } from "../files/functions.js";
import { flsModules } from "../files/modules.js";
import { formValidate } from "../files/forms/forms.js";

// 
// Base style - src/scss/forms.scss
//              src/scss/forms/select.scss

/*
Snippet (HTML): sel
*/
/*
// Seetings
for Select:
class="class_name" - modification
multiple - multiplу select
data-tags - only for multiple
data-scroll - enable scrolling for dropdown list, in addition, you can connect a custom scroll simplebar in app.js. The specified number for the attribute will limit the height
data-checkbox - styles elements checkbox (only multiple)
data-show-selected - disables hiding the selected item
data-search - allows to search by drop down list
data-open - select open immediately
data-submit - submits form on select change

data-one-select - selects inside a wrapper with an attribute will only be shown one at a time
data-pseudo-label - adds a pseudo element to the header of the select with the specified text

For placeholder (Placeholder -  option with value=""):
data-label adding label to select
data-show shows it in the list(only for single selection)

For element (option):
data-class="class name" - add class
data-asset="path to image or text" - adds 2 columns structure and data
data-href="адрес ссылки" - add link in list item
data-href-blank - open link in new tabs
*/

/*
// 
mobile popup
*/

// Class constructor Select
class SelectConstructor {
	constructor(props, data = null) {
		let defaultConfig = {
			init: true,
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props);
		// CSS classes
		this.selectClasses = {
			classSelect: "select", // Main block
			classSelectBody: "select__body", // Select body
			classSelectTitle: "select__title", // Title
			classSelectValue: "select__value", // Value in title
			classSelectLabel: "select__label", // label
			classSelectInput: "select__input", // Input
			classSelectText: "select__text", // text wrapper
			classSelectLink: "select__link", // link
			classSelectOptions: "select__options", // drop-down list
			classSelectOptionsScroll: "select__scroll", // wrapper scroll
			classSelectOption: "select__option", // Item
			classSelectContent: "select__content", // contant wrapper in list
			classSelectRow: "select__row", // row
			classSelectData: "select__asset", // additional data
			classSelectDisabled: "_select-disabled", // Disable
			classSelectTag: "_select-tag", // Tag class
			classSelectOpen: "_select-open", // List open
			classSelectActive: "_select-active", // List active
			classSelectFocus: "_select-focus", // List focus
			classSelectMultiple: "_select-multiple", // Multiple chose
			classSelectCheckBox: "_select-checkbox", // checkbox style
			classSelectOptionSelected: "_select-selected", // Select item
			classSelectPseudoLabel: "_select-pseudo-label", // Pseudo-label
		}
		this._this = this;
		// Init start
		if (this.config.init) {
			// get all select from page
			const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select');
			if (selectItems.length) {
				this.selectsInit(selectItems);
				this.setLogging(`Проснулся, построил селектов: (${selectItems.length})`);
			} else {
				this.setLogging('Сплю, нет ни одного select zzZZZzZZz');
			}
		}
	}
	// CSS Class constructor
	getSelectClass(className) {
		return `.${className}`;
	}
	// Getter pseudo-elements 
	getSelectElement(selectItem, className) {
		return {
			originalSelect: selectItem.querySelector('select'),
			selectElement: selectItem.querySelector(this.getSelectClass(className)),
		}
	}
	// Init all selects
	selectsInit(selectItems) {
		selectItems.forEach((originalSelect, index) => {
			this.selectInit(originalSelect, index + 1);
		});
		// Event handlers...
		// ...on click
		document.addEventListener('click', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...on button click
		document.addEventListener('keydown', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...on focus
		document.addEventListener('focusin', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...on focus out
		document.addEventListener('focusout', function (e) {
			this.selectsActions(e);
		}.bind(this));
	}
	// Init select
	selectInit(originalSelect, index) {
		const _this = this;
		// create wrapper
		let selectItem = document.createElement("div");
		selectItem.classList.add(this.selectClasses.classSelect);
		// Output shell before original select
		originalSelect.parentNode.insertBefore(selectItem, originalSelect);
		// put the original select in the shell
		selectItem.appendChild(originalSelect);
		// hide original select
		originalSelect.hidden = true;
		// assign a unique ID
		index ? originalSelect.dataset.id = index : null;

		// placeholder
		if (this.getSelectPlaceholder(originalSelect)) {
			// Remembering the placeholder
			originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
			// if label enable
			if (this.getSelectPlaceholder(originalSelect).label.show) {
				const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
				selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
			}
		}
		// Basic elements constructor
		selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
		// Launching the pseudoselect constructor
		this.selectBuild(originalSelect);

		// remember speed
		originalSelect.dataset.speed = originalSelect.dataset.speed ? originalSelect.dataset.speed : "150";
		// Event when original select changes
		originalSelect.addEventListener('change', function (e) {
			_this.selectChange(e);
		});
	}
	// Pseudoselect constructor
	selectBuild(originalSelect) {
		const selectItem = originalSelect.parentElement;
		// add select ID
		selectItem.dataset.id = originalSelect.dataset.id;
		// get the class of the original select, create a modifier and add it
		selectItem.classList.add(originalSelect.getAttribute('class') ? `select_${originalSelect.getAttribute('class')}` : "");
		// If multiple choice, add a class
		originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
		// Styling elements under a checkbox (multiple only)
		originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
		// Select header value setter
		this.setSelectTitleValue(selectItem, originalSelect);
		// List item setter (options)
		this.setOptions(selectItem, originalSelect);
		// If the data-search search option is enabled, run the handler
		originalSelect.hasAttribute('data-search') ? this.searchActions(selectItem) : null;
		// If the data-open setting is specified, open the select
		originalSelect.hasAttribute('data-open') ? this.selectAction(selectItem) : null;
		// disabled handler
		this.selectDisabled(selectItem, originalSelect);
	}
	// Event reaction function
	selectsActions(e) {
		const targetElement = e.target;
		const targetType = e.type;
		if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
			const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`);
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			if (targetType === 'click') {
				if (!originalSelect.disabled) {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
						// click on tag
						const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
						const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`);
						this.optionAction(selectItem, originalSelect, optionItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
						// click on title select
						this.selectAction(selectItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
						// click on select item
						const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
						this.optionAction(selectItem, originalSelect, optionItem);
					}
				}
			} else if (targetType === 'focusin' || targetType === 'focusout') {
				if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
					targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
				}
			} else if (targetType === 'keydown' && e.code === 'Escape') {
				this.selectsСlose();
			}
		} else {
			this.selectsСlose();
		}
	}
	// Close all selects
	selectsСlose(selectOneGroup) {
		const selectsGroup = selectOneGroup ? selectOneGroup : document;
		const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
		if (selectActiveItems.length) {
			selectActiveItems.forEach(selectActiveItem => {
				this.selectСlose(selectActiveItem);
			});
		}
	}
	// Closing Function of a Specific Select
	selectСlose(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		if (!selectOptions.classList.contains('_slide')) {
			selectItem.classList.remove(this.selectClasses.classSelectOpen);
			_slideUp(selectOptions, originalSelect.dataset.speed);
		}
	}
	// The function of opening/closing a specific select
	selectAction(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;

		// If the selects are placed on an element with a date attribute of data-one-select
		// close all open selects
		if (originalSelect.closest('[data-one-select]')) {
			const selectOneGroup = originalSelect.closest('[data-one-select]');
			this.selectsСlose(selectOneGroup);
		}

		if (!selectOptions.classList.contains('_slide')) {
			selectItem.classList.toggle(this.selectClasses.classSelectOpen);
			_slideToggle(selectOptions, originalSelect.dataset.speed);
		}
	}
	// Select header value setter
	setSelectTitleValue(selectItem, originalSelect) {
		const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
		const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
		if (selectItemTitle) selectItemTitle.remove();
		selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
	}
	// Header value constructor
	getSelectTitleValue(selectItem, originalSelect) {
		// Get selected text values
		let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
		// Handling multi-select values
		// If tag mode is enabled (data-tags setting specified)
		if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
			selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-select-id="${selectItem.dataset.id}" data-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
			// If the output of tags to the outer block
			if (originalSelect.dataset.tags && document.querySelector(originalSelect.dataset.tags)) {
				document.querySelector(originalSelect.dataset.tags).innerHTML = selectTitleValue;
				if (originalSelect.hasAttribute('data-search')) selectTitleValue = false;
			}
		}
		// Value(s) or placeholder
		selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.placeholder ? originalSelect.dataset.placeholder : '');
		// Если включен режим pseudo
		let pseudoAttribute = '';
		let pseudoAttributeClass = '';
		if (originalSelect.hasAttribute('data-pseudo-label')) {
			pseudoAttribute = originalSelect.dataset.pseudoLabel ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"` : ` data-pseudo-label="Заполните атрибут"`;
			pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
		}
		// If there is a value, add a class
		this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
		// Returning the search input field or text
		if (originalSelect.hasAttribute('data-search')) {
			// Display input field for search
			return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
		} else {
			// If an element with its own class is selected
			const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.class ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.class}` : '';
			// Output text value
			return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
		}
	}
	// Data constructor for header value
	getSelectElementContent(selectOption) {
		// If an image or text output is specified for the element, we rebuild the construction
		const selectOptionData = selectOption.dataset.asset ? `${selectOption.dataset.asset}` : '';
		const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
		let selectOptionContentHTML = ``;
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
		selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
		selectOptionContentHTML += selectOption.textContent;
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		return selectOptionContentHTML;
	}
	// Getting placeholder data
	getSelectPlaceholder(originalSelect) {
		const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
		if (selectPlaceholder) {
			return {
				value: selectPlaceholder.textContent,
				show: selectPlaceholder.hasAttribute("data-show"),
				label: {
					show: selectPlaceholder.hasAttribute("data-label"),
					text: selectPlaceholder.dataset.label
				}
			}
		}
	}
	// Getting Data from Selected Items
	getSelectedOptionsData(originalSelect, type) {
		// Get all selected objects from select
		let selectedOptions = [];
		if (originalSelect.multiple) {
			// If multiselect
			// We remove the placeholder, we get the rest of the selected elements
			selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
		} else {
			// If a single choice
			selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
		}
		return {
			elements: selectedOptions.map(option => option),
			values: selectedOptions.filter(option => option.value).map(option => option.value),
			html: selectedOptions.map(option => this.getSelectElementContent(option))
		}
	}
	// List Element Constructor
	getOptions(originalSelect) {
		// Element scroll settings
		let selectOptionsScroll = originalSelect.hasAttribute('data-scroll') ? `data-simplebar` : '';
		let selectOptionsScrollHeight = originalSelect.dataset.scroll ? `style="max-height:${originalSelect.dataset.scroll}px"` : '';
		// Getting the elements of a list
		let selectOptions = Array.from(originalSelect.options);
		if (selectOptions.length > 0) {
			let selectOptionsHTML = ``;
			// If the data-show setting is specified, show the placeholder in the list
			if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
				selectOptions = selectOptions.filter(option => option.value);
			}
			// We build and display the main structure
			selectOptionsHTML += selectOptionsScroll ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">` : '';
			selectOptions.forEach(selectOption => {
				// We get the construction of a specific list element
				selectOptionsHTML += this.getOption(selectOption, originalSelect);
			});
			selectOptionsHTML += selectOptionsScroll ? `</div>` : '';
			return selectOptionsHTML;
		}
	}
	// Constructor of a specific list item
	getOption(selectOption, originalSelect) {
		// If the element is selected and the multiselect mode is enabled, add the class
		const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
		// If the element is selectable and there is no data-show-selected setting, hide the element
		const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-show-selected') && !originalSelect.multiple ? `hidden` : ``;
		// If the class is specified for the element, add
		const selectOptionClass = selectOption.dataset.class ? ` ${selectOption.dataset.class}` : '';
		//If the link mode is specified
		const selectOptionLink = selectOption.dataset.href ? selectOption.dataset.href : false;
		const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank') ? `target="_blank"` : '';
		// Строим и возвращаем конструкцию элемента
		let selectOptionHTML = ``;
		selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
		selectOptionHTML += this.getSelectElementContent(selectOption);
		selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
		return selectOptionHTML;
	}
	// List item setter (options)
	setOptions(selectItem, originalSelect) {
		// Get the pseudoselect body object
		const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		// We launch the list element constructor (options) and add a pseudo-select to the body
		selectItemOptions.innerHTML = this.getOptions(originalSelect);
	}
	// List item click handler
	optionAction(selectItem, originalSelect, optionItem) {
		if (originalSelect.multiple) { // if multiselect
			// Select an element as a class
			optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
			// Clearing the selected items
			const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
			originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
				originalSelectSelectedItem.removeAttribute('selected');
			});
			//Selecting elements
			const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
			selectSelectedItems.forEach(selectSelectedItems => {
				originalSelect.querySelector(`option[value="${selectSelectedItems.dataset.value}"]`).setAttribute('selected', 'selected');
			});
		} else { // If a single choice
			// If the data-show-selected setting is not specified, hide the selected element
			if (!originalSelect.hasAttribute('data-show-selected')) {
				// Show everything first
				if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
					selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
				}
				// Hide the selected
				optionItem.hidden = true;
			}
			originalSelect.value = optionItem.hasAttribute('data-value') ? optionItem.dataset.value : optionItem.textContent;
			this.selectAction(selectItem);
		}
		// Update the select header
		this.setSelectTitleValue(selectItem, originalSelect);
		// We call the reaction on the change of the select
		this.setSelectChange(originalSelect);
	}
	// Reacting to a change in the original select
	selectChange(e) {
		const originalSelect = e.target;
		this.selectBuild(originalSelect);
		this.setSelectChange(originalSelect);
	}
	// Change handler in select
	setSelectChange(originalSelect) {
		// Instant validation of the select
		if (originalSelect.hasAttribute('data-validate')) {
			formValidate.validateInput(originalSelect);
		}
		// When the select is changed, submit the form
		if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
			let tempButton = document.createElement("button");
			tempButton.type = "submit";
			originalSelect.closest('form').append(tempButton);
			tempButton.click();
			tempButton.remove();
		}
		const selectItem = originalSelect.parentElement;
		// Callback function call
		this.selectCallback(selectItem, originalSelect);
	}
	// disabled handler
	selectDisabled(selectItem, originalSelect) {
		if (originalSelect.disabled) {
			selectItem.classList.add(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
		} else {
			selectItem.classList.remove(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
		}
	}
	// List element search handler
	searchActions(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption}`);
		const _this = this;
		selectInput.addEventListener("input", function () {
			selectOptionsItems.forEach(selectOptionsItem => {
				if (selectOptionsItem.textContent.toUpperCase().indexOf(selectInput.value.toUpperCase()) >= 0) {
					selectOptionsItem.hidden = false;
				} else {
					selectOptionsItem.hidden = true;
				}
			});
			// If the list is closed open
			selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
		});
	}
	//Callback function
	selectCallback(selectItem, originalSelect) {
		document.dispatchEvent(new CustomEvent("selectCallback", {
			detail: {
				select: originalSelect
			}
		}));
	}
	// Logging to the console
	setLogging(message) {
		this.config.logging ? FLS(`[select]: ${message}`) : null;
	}
}
// Run and add modules to the object
flsModules.select = new SelectConstructor({});


