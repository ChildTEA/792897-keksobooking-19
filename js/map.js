'use strict';

(function () {
  var offersMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var PINS_X_LIMIT = offersMap.clientWidth;
  var PINS_Y_MIN_LIMIT = 130;
  var PINS_Y_MAX_LIMIT = 360;


  var activateMap = function () {
    offersMap.classList.remove('map--faded');

    mainPin.removeEventListener('mousedown', onPinFirstClick);
    mainPin.removeEventListener('keydown', onPinFirstEnterPress);
  };

  var onPinFirstClick = function (evt) {
    if (evt.button === 0) {
      var rentOffers = window.data.generateRandomOffers(8, PINS_X_LIMIT, PINS_Y_MIN_LIMIT, PINS_Y_MAX_LIMIT);
      window.data.renderPins(offersMap, rentOffers);

      activateMap();
      window.form.enableOfferEditor();
      window.form.enableMapFilter();
    }
  };

  var onPinFirstEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      var rentOffers = window.data.generateRandomOffers(8, PINS_X_LIMIT, PINS_Y_MIN_LIMIT, PINS_Y_MAX_LIMIT);
      window.data.renderPins(offersMap, rentOffers);

      activateMap();
      window.form.enableOfferEditor();
      window.form.enableMapFilter();
      window.form.setOfferAddress();
    }
  };

  var init = function () {
    mainPin.addEventListener('mousedown', onPinFirstClick);
    mainPin.addEventListener('keydown', onPinFirstEnterPress);
  };

  init();
})();
