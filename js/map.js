'use strict';

(function () {
  var offersMap = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var PINS_X_LIMIT = offersMap.clientWidth;
  var PINS_Y_MIN_LIMIT = 130;
  var PINS_Y_MAX_LIMIT = 360;


  var activateMap = function () {
    offersMap.classList.remove('map--faded');

    mapPin.removeEventListener('mousedown', onPinFirstClick);
    mapPin.removeEventListener('keydown', onPinFirstEnterPress);
  };

  var onPinFirstClick = function (evt) {
    if (evt.button === 0) {
      var rentOffers = window.data.generateRandomOffers(8, PINS_X_LIMIT, PINS_Y_MIN_LIMIT, PINS_Y_MAX_LIMIT);
      window.data.renderPins(offersMap, rentOffers);

      activateMap();
      window.form.enableOfferForm();
      window.form.enableFilterForm();
    }
  };

  var onPinFirstEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      var rentOffers = window.data.generateRandomOffers(8, PINS_X_LIMIT, PINS_Y_MIN_LIMIT, PINS_Y_MAX_LIMIT);
      window.data.renderPins(offersMap, rentOffers);

      activateMap();
      window.form.enableOfferForm();
      window.form.enableFilterForm();
      window.form.setOfferAddress();
    }
  };

  var init = function () {
    mapPin.addEventListener('mousedown', onPinFirstClick);
    mapPin.addEventListener('keydown', onPinFirstEnterPress);
  };

  init();
})();
