'use strict';

(function () {
  var offersMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var activateMap = function () {
    offersMap.classList.remove('map--faded');
    window.form.enableOfferEditor();
    window.form.setOfferAddress();
    window.filter.getOffersData();

    mainPin.removeEventListener('mousedown', onPinFirstClick);
    mainPin.removeEventListener('keydown', onPinFirstEnterPress);
  };

  var deactivateMap = function () {
    offersMap.classList.add('map--faded');

    mainPin.addEventListener('mousedown', onPinFirstClick);
    mainPin.addEventListener('keydown', onPinFirstEnterPress);
  };

  var onPinFirstClick = function (evt) {
    if (evt.button === 0) {
      activateMap();
    }
  };

  var onPinFirstEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      activateMap();
    }
  };

  var init = function () {
    mainPin.addEventListener('mousedown', onPinFirstClick);
    mainPin.addEventListener('keydown', onPinFirstEnterPress);
  };

  init();


  window.map = {
    deactivate: deactivateMap
  };
})();
