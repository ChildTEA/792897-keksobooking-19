'use strict';

(function () {
  var OFFERS_DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var MAX_PINS_ON_MAP = 5;
  var offersMap = document.querySelector('.map');
  var mapPins = offersMap.querySelector('.map__pins');
  var offersFilter = document.querySelector('.map__filters');
  var housingTypeSelect = offersFilter.querySelector('#housing-type');
  var offersData = [];

  var filterStats = {
    onTypeChange: window.debounce(function (option) {
      window.pins.clear();
      window.pins.render(mapPins, filterOffers(option));
    })
  };

  var filterOffers = function (offerType) {
    var filteredOffers = [];
    if (offerType === 'any') {
      filteredOffers = offersData.concat();
    } else {
      filteredOffers = offersData.filter(function (item) {
        return item.offer.type === offerType;
      });
    }

    return filteredOffers.slice(0, MAX_PINS_ON_MAP);
  };

  var onHousingTypeChange = function () {
    filterStats.onTypeChange(housingTypeSelect.value);
  };


  var getOffersData = function () {
    window.backend.load(OFFERS_DOWNLOAD_URL, onRequestSuccess, onRequestError);
  };

  var onRequestSuccess = function (pins) {
    offersData = pins;
    window.form.enableMapFilter();
    filterStats.onTypeChange(housingTypeSelect.value);
  };

  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = window.util.WHITE_COLOR;
    node.style.backgroundColor = window.util.RED_COLOR;

    node.textContent = errorMessage;

    offersMap.prepend(node);
  };

  housingTypeSelect.addEventListener('change', onHousingTypeChange);


  window.filter = {
    getOffersData: getOffersData
  };
})();
