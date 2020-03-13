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
  var housingWifiCheckbox = offersFilter.querySelector('#filter-wifi');
  var housingDishwasherCheckbox = offersFilter.querySelector('#filter-dishwasher');
  var housingParkingCheckbox = offersFilter.querySelector('#filter-parking');
  var housingWasherCheckbox = offersFilter.querySelector('#filter-washer');
  var housingElevatorCheckbox = offersFilter.querySelector('#filter-elevator');
  var housingConditionerCheckbox = offersFilter.querySelector('#filter-conditioner');

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

  var isValidOffer = function (data) {
    if (!data.offer) {
      return false;
    }

    return true;
  };

  var isTypeAppropriate = function (data) {
    if (housingTypeSelect.value === 'any') {
      return true;
    }

    return data.offer.type === housingTypeSelect.value;
  };

  var isPriceAppropriate = function (data) {
    if (housingPriceSelect.value === 'any') {
      return true;
    }

    return data.offer.price >= pricesMap[housingPriceSelect.value].min && data.offer.price < pricesMap[housingPriceSelect.value].max;
  };

  var isRoomsAppropriate = function (data) {
    if (housingRoomsSelect.value === 'any') {
      return true;
    }

    return data.offer.rooms === Number(housingRoomsSelect.value);
  };

  var isGuestsAppropriate = function (data) {
    if (housingGuestsSelect.value === 'any') {
      return true;
    } else if (housingGuestsSelect.value === '0') {
      return data.offer.guests > MAX_OFFER_GUESTS;
    }

    return data.offer.guests === Number(housingGuestsSelect.value);
  };

  var isFeaturePresent = function (data, checkbox) {
    if (checkbox.checked) {
      return data.offer.features.includes(checkbox.value);
    }

    return true;
  };

  var filterOffers = function () {
    var filteredOffers = offersData.filter(function (item) {

      if (!isValidOffer(item)) {
        return false;
      }

      if (!isTypeAppropriate(item)) {
        return false;
      }

      if (!isPriceAppropriate(item)) {
        return false;
      }

      if (!isRoomsAppropriate(item)) {
        return false;
      }

      if (!isGuestsAppropriate(item)) {
        return false;
      }

      if (!isFeaturePresent(item, housingWifiCheckbox)) {
        return false;
      }

      if (!isFeaturePresent(item, housingDishwasherCheckbox)) {
        return false;
      }

      if (!isFeaturePresent(item, housingParkingCheckbox)) {
        return false;
      }

      if (!isFeaturePresent(item, housingWasherCheckbox)) {
        return false;
      }

      if (!isFeaturePresent(item, housingElevatorCheckbox)) {
        return false;
      }

      if (!isFeaturePresent(item, housingConditionerCheckbox)) {
        return false;
      }

      return true;
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
    getOffersData: getOffersData,
    refresh: refreshOffers
  };
})();
