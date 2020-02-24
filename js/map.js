'use strict';

(function () {
  var OFFERS_DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var RED_COLOR = 'rgba(255, 0, 0, 0.9)';
  var WHITE_COLOR = '#FFFFFF';
  var offersMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');


  var activateMap = function () {
    offersMap.classList.remove('map--faded');
    window.form.enableOfferEditor();
    window.form.enableMapFilter();
    window.form.setOfferAddress();
    window.backend.load(OFFERS_DOWNLOAD_URL, onRequestSuccess, onRequestError);

    mainPin.removeEventListener('mousedown', onPinFirstClick);
    mainPin.removeEventListener('keydown', onPinFirstEnterPress);
  };

  var renderPin = function (pinData) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var pinElement = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    pinElement.style.left = (pinData.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (pinData.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;

    return pinElement;
  };

  var renderPins = function (map, pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    map.appendChild(fragment);
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

  var onRequestSuccess = function (pins) {
    renderPins(offersMap, pins);
  };

  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = WHITE_COLOR;
    node.style.backgroundColor = RED_COLOR;

    node.textContent = errorMessage;

    offersMap.prepend(node);
  };

  var init = function () {
    mainPin.addEventListener('mousedown', onPinFirstClick);
    mainPin.addEventListener('keydown', onPinFirstEnterPress);
  };

  init();
})();
