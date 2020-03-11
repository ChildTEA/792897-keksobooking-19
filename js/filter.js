'use strict';

(function () {
  var OFFERS_DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var MAX_PINS_ON_MAP = 5;
  var MAX_OFFER_GUESTS = 6;
  var offersMap = document.querySelector('.map');
  var mapPins = offersMap.querySelector('.map__pins');
  var offersFilter = document.querySelector('.map__filters');
  var housingTypeSelect = offersFilter.querySelector('#housing-type');
  var housingPriceSelect = offersFilter.querySelector('#housing-price');
  var housingRoomsSelect = offersFilter.querySelector('#housing-rooms');
  var housingGuestsSelect = offersFilter.querySelector('#housing-guests');
  var housingFeatures = [].slice.call(offersFilter.querySelectorAll('input[name="features"]'));

  var pricesMap = {
    'low': {
      min: 0,
      max: 10000
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var offersData = [];

  var refreshOffers = window.debounce(function () {
    window.pins.clear();
    window.card.removeCurrent();
    window.pins.render(mapPins, filterOffers());
  });

  var filterByType = function (items) {
    var offerType = housingTypeSelect.value;

    var filteredItems = items.filter(function (item) {
      if (offerType === 'any') {
        return true;
      }
      return item.offer.type === offerType;
    });

    return filteredItems;
  };

  var filterByPrice = function (items) {
    var offerPrice = housingPriceSelect.value;

    var filteredItems = items.filter(function (item) {
      if (offerPrice === 'any') {
        return true;
      }
      return item.offer.price >= pricesMap[offerPrice].min && item.offer.price < pricesMap[offerPrice].max;
    });

    return filteredItems;
  };

  var filterByRooms = function (items) {
    var offerRooms = housingRoomsSelect.value;

    var filteredItems = items.filter(function (item) {
      if (offerRooms === 'any') {
        return true;
      }
      return item.offer.rooms === Number(offerRooms);
    });

    return filteredItems;
  };

  var filterByGuests = function (items) {
    var offerGuests = housingGuestsSelect.value;

    var filteredItems = items.filter(function (item) {
      if (offerGuests === 'any') {
        return true;
      } else if (offerGuests === '0') {
        return item.offer.guests > MAX_OFFER_GUESTS;
      }
      return item.offer.guests === Number(offerGuests);
    });

    return filteredItems;
  };

  var filterByFeatures = function (items) {
    var filteredItems = items.slice();
    var offerFeatures = housingFeatures.filter(function (item) {
      return item.checked;
    });

    if (offerFeatures.length > 0) {
      offerFeatures.forEach(function (feature) {
        filteredItems = filteredItems.filter(function (data) {
          return data.offer.features.includes(feature.value);
        });
      });

      return filteredItems;
    }

    return filteredItems;
  };

  var filterOffers = function () {
    var filteredOffers = offersData.filter(function (item) {
      if (!item.offer) {
        return false;
      }
      return true;
    });

    filteredOffers = filterByType(filteredOffers);
    filteredOffers = filterByPrice(filteredOffers);
    filteredOffers = filterByRooms(filteredOffers);
    filteredOffers = filterByGuests(filteredOffers);
    filteredOffers = filterByFeatures(filteredOffers);

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

  offersFilter.addEventListener('change', onFilterSettingsChange);


  window.filter = {
    getOffersData: getOffersData
  };
})();
