'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var offersMap = document.querySelector('.map');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_LIMIT_TOP = 130;
  var MAIN_PIN_LIMIT_BOTTOM = 630;

  var OFFER_MAP_BOUNDING_RECT = offersMap.getBoundingClientRect();

  var mainPinDragLimits = {
    top: MAIN_PIN_LIMIT_TOP - MAIN_PIN_HEIGHT,
    right: OFFER_MAP_BOUNDING_RECT.right - MAIN_PIN_WIDTH / 2,
    bottom: MAIN_PIN_LIMIT_BOTTOM - MAIN_PIN_HEIGHT,
    left: OFFER_MAP_BOUNDING_RECT.left - MAIN_PIN_WIDTH / 2
  };

  window.dragAndAction.replace(mainPin, mainPin, offersMap, mainPinDragLimits);


  window.pin = {
    mainPin: mainPin
  };
})();
