
import { isMobile } from "./functions.js";
// Active modules
import { flsModules } from "./modules.js";
// Bootstrap
import bootstrap from 'bootstrap';


// function selectOpen(label,select) {
//   const labelUse = document.querySelector(label);
//   const selectUse = document.getElementById(select);

//   labelUse.addEventListener('click', () => {

//     let event = new MouseEvent('mousedown', {
//       'view': window,
//       'bubbles': true,
//       'cancelable': true
//     });
//     selectUse.dispatchEvent(event);

//     event = new MouseEvent('mouseup', {
//       'view': window,
//       'bubbles': true,
//       'cancelable': true
//     });
//     selectUse.dispatchEvent(event);
//   });
// }
function selectOpen(label, select) {
  const labelUse = document.querySelector(label);
  const selectUse = document.getElementById(select);

  labelUse.addEventListener('click', () => {
    selectUse.focus();
  });
}

selectOpen('label[for="buy-location-select"]', 'buy-location-select');
selectOpen('label[for="buy-type-select"]', 'buy-type-select');
selectOpen('label[for="buy-price-select"]', 'buy-price-select');

// selectOpen('label[for="buy-location-select"]','buy-location-select');
// selectOpen('label[for="buy-type-select"]','buy-type-select');
// selectOpen('label[for="buy-price-select"]','buy-price-select');

// selectOpen('label[for="rent-location-select"]','rent-location-select');
// selectOpen('label[for="rent-type-select"]','rent-type-select');
// selectOpen('label[for="rent-price-select"]','rent-price-select');

// selectOpen('label[for="sell-location-select"]','sell-location-select');
// selectOpen('label[for="sell-type-select"]','sell-type-select');
// selectOpen('label[for="sell-price-select"]','sell-price-select');


