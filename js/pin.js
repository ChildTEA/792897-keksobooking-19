'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var offersMap = document.querySelector('.map');
  var MAIN_PIN_INITIAL_X = 570;
  var MAIN_PIN_INITIAL_Y = 375;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = 84;

  var mainPinDragLimits = {
    top: offersMap.offsetTop,
    right: offersMap.offsetWidth + offersMap.offsetLeft - MAIN_PIN_WIDTH / 2,
    bottom: offersMap.offsetHeight + offersMap.offsetTop - MAIN_PIN_HEIGHT,
    left: offersMap.offsetLeft
  };

  window.dragAndAction.replace(mainPin, mainPin, mainPinDragLimits.top, mainPinDragLimits.right, mainPinDragLimits.bottom, mainPinDragLimits.left);


  window.pin = {
    mainPin: mainPin
  };
})();
