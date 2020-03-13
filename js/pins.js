'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = document.querySelector('.map__pins');

  var renderPin = function (pinData) {
    var pinElement = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);

    pinElement.style.left = (pinData.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (pinData.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pinData.author.avatar;
    pinElement.querySelector('img').alt = pinData.offer.title;
    pinElement.addEventListener('click', function () {
      window.card.render(pinData);
    });

    return pinElement;
  };

  var renderPins = function (map, pins) {
    var fragment = document.createDocumentFragment();

    pins.forEach(function (pin) {
      fragment.appendChild(renderPin(pin));
    });

    map.appendChild(fragment);
  };

  var clearMap = function () {
    var existedPins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    existedPins.forEach(function (item) {
      item.remove();
    });
  };


  window.pins = {
    render: renderPins,
    clear: clearMap
  };
})();
