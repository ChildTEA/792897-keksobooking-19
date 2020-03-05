'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var offersMap = document.querySelector('.map');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_ACTIVE_Z_INDEX = '2';
  var MAIN_PIN_DRAG_LIMIT_TOP = 130;
  var MAIN_PIN_DRAG_LIMIT_BOTTOM = 630;

  var onFirstMainPinMousedown = function (evt) {
    if (evt.button === 0) {
      mainPin.style.zIndex = MAIN_PIN_ACTIVE_Z_INDEX;
      mainPin.removeEventListener('mousedown', onFirstMainPinMousedown);
      mainPin.removeEventListener('keydown', onFirstMainPinEnterPress);
    }
  };

  var onFirstMainPinEnterPress = function (evt) {
    if (evt.code === window.util.ENTER_KEYCODE) {
      mainPin.style.zIndex = MAIN_PIN_ACTIVE_Z_INDEX;
      mainPin.removeEventListener('mousedown', onFirstMainPinMousedown);
      mainPin.removeEventListener('keydown', onFirstMainPinEnterPress);
    }
  };

  var replace = function () {

    var onMouseDown = function (evt) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {

        var mainPinDragLimits = {
          top: MAIN_PIN_DRAG_LIMIT_TOP,
          right: offersMap.offsetWidth,
          bottom: MAIN_PIN_DRAG_LIMIT_BOTTOM,
          left: 0
        };

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        if (shift.x !== 0 || shift.y !== 0) {
          isDragged = true;
          window.form.setOfferAddress();
        }

        var pinEdge = {
          x: parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2) - shift.x,
          y: parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT - shift.y
        };

        if (pinEdge.y < mainPinDragLimits.top) {
          mainPin.style.top = mainPinDragLimits.top;
        } else if (pinEdge.y > mainPinDragLimits.bottom) {
          mainPin.style.top = mainPinDragLimits.bottom;
        } else {
          mainPin.style.top = pinEdge.y - MAIN_PIN_HEIGHT + 'px';
        }

        if (pinEdge.x < mainPinDragLimits.left) {
          mainPin.style.left = mainPinDragLimits.left - Math.round(MAIN_PIN_WIDTH / 2) + 'px';
        } else if (pinEdge.x > mainPinDragLimits.right) {
          mainPin.style.left = mainPinDragLimits.right - Math.round(MAIN_PIN_WIDTH / 2) + 'px';
        } else {
          mainPin.style.left = pinEdge.x - Math.round(MAIN_PIN_WIDTH / 2) + 'px';
        }

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (isDragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mainPin.removeEventListener('click', onClickPreventDefault);
          };
          mainPin.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    mainPin.addEventListener('mousedown', onMouseDown);
  };


  mainPin.addEventListener('mousedown', onFirstMainPinMousedown);
  mainPin.addEventListener('keydown', onFirstMainPinEnterPress);

  replace();
})();
