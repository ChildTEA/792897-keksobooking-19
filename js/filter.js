'use strict';

(function () {
  var OFFERS_DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var MAX_PINS_ON_MAP = 5;
  var offersMap = document.querySelector('.map');
  var mapPins = offersMap.querySelector('.map__pins');
  var offersFilter = document.querySelector('.map__filters');
  var housingTypeSelect = offersFilter.querySelector('#housing-type');
  var offersData = [];

  var refreshOffers = window.debounce(function () {
    window.pins.clear();
    window.pins.render(mapPins, filterOffers());
  });

  var filterOffers = function () {
    var filteredOffers = [];
    var offerType = housingTypeSelect.value;

    filteredOffers = offersData.filter(function (item) {
      if (offerType === 'any') {
        return true;
      }
      return item.offer.type === offerType;
    });

    return filteredOffers.slice(0, MAX_PINS_ON_MAP);
  };

  var onFilterSettingsChange = function () {
    refreshOffers();
  };

  var getOffersData = function () {
    window.backend.load(OFFERS_DOWNLOAD_URL, onRequestSuccess, onRequestError);
  };

  var onRequestSuccess = function (pins) {
    offersData = pins;
    window.form.enableMapFilter();
    refreshOffers();
  };

  var onRequestError = function (errorMessage) {
    // Код ниже - для временной отрисовки меток, пока сервера Академии глючат
    var PINS_QUANTITY = 5;
    var MAP_LIMIT_TOP = 130;
    var MAP_LIMIT_BOTTOM = 630;
    var MAP_WIDTH = 1200;
    // ***********************************************************************
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
    // Код ниже - для временной отрисовки меток, пока сервера Академии глючат
    offersData = window.data.generateRandomOffers(PINS_QUANTITY, MAP_WIDTH, MAP_LIMIT_TOP, MAP_LIMIT_BOTTOM);
    window.form.enableMapFilter();
    refreshOffers();
    // ***********************************************************************
  };

  offersFilter.addEventListener('change', onFilterSettingsChange);


  window.filter = {
    getOffersData: getOffersData
  };
})();
