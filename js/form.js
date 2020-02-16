'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');

  var filterForm = document.querySelector('form.map__filters');
  var offerForm = document.querySelector('form.ad-form');
  var addressInput = document.querySelector('#address');
  var roomNumberSelect = document.querySelector('#room_number');
  var roomCapacitySelect = document.querySelector('#capacity');

  var disableFormInputs = function (form) {
    var inputs = form.querySelectorAll('input');
    var selects = form.querySelectorAll('select');
    var textareas = form.querySelectorAll('textarea');
    var buttons = form.querySelectorAll('button');

    inputs.forEach(function (input) {
      input.setAttribute('disabled', 'disabled');
    });

    selects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    textareas.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });

    buttons.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
  };

  var disableMapFilter = function () {
    disableFormInputs(filterForm);
  };

  var disableOfferForm = function () {
    disableFormInputs(offerForm);
  };

  var enableFormInputs = function (form) {
    var inputs = form.querySelectorAll('input');
    var selects = form.querySelectorAll('select');
    var textareas = form.querySelectorAll('textarea');
    var buttons = form.querySelectorAll('button');

    inputs.forEach(function (input) {
      input.removeAttribute('disabled');
    });

    selects.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    textareas.forEach(function (select) {
      select.removeAttribute('disabled');
    });

    buttons.forEach(function (select) {
      select.removeAttribute('disabled');
    });
  };

  var enableFilterForm = function () {
    enableFormInputs(filterForm);
  };

  var enableOfferEditor = function () {
    offerForm.classList.remove('ad-form--disabled');
    enableFormInputs(offerForm);
  };

  var setInitialOfferAddress = function () {
    var MAP_PIN_WIDTH = mapPin.clientWidth;
    var MAP_PIN_HEIGHT = mapPin.clientHeight;

    var x = mapPin.offsetLeft + (MAP_PIN_WIDTH / 2);
    var y = mapPin.offsetTop + MAP_PIN_HEIGHT / 2;

    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var setOfferAddress = function () {
    var MAP_PIN_WIDTH = mapPin.clientWidth;
    var MAP_PIN_HEIGHT = mapPin.clientHeight;
    var PIN_EDGE_HEIGHT = 19;
    var x = mapPin.offsetLeft + (MAP_PIN_WIDTH / 2);
    var y = mapPin.offsetTop + MAP_PIN_HEIGHT + PIN_EDGE_HEIGHT;

    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var onPinMousedown = function () {
    var onMouseMove = function () {
      setOfferAddress();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  var validateCapacity = function () {
    var options = roomCapacitySelect.querySelectorAll('option');
    options.forEach(function (option) {
      option.disabled = true;
    });

    switch (roomNumberSelect.value) {
      case '1':
        roomCapacitySelect[0].disabled = false;
        break;
      case '2':
        roomCapacitySelect[0].disabled = false;
        roomCapacitySelect[1].disabled = false;
        break;
      case '3':
        roomCapacitySelect[0].disabled = false;
        roomCapacitySelect[1].disabled = false;
        roomCapacitySelect[2].disabled = false;
        break;
      case '100':
        roomCapacitySelect[3].disabled = false;
        break;
    }
  };

  var checkRoomsCapacityValidity = function () {
    if (roomCapacitySelect[roomCapacitySelect.selectedIndex].disabled) {
      roomCapacitySelect.setCustomValidity('Неподходящее количество гостей');
    } else {
      roomCapacitySelect.setCustomValidity('');
    }
  };

  var offerFormValidation = function () {
    validateCapacity();
    checkRoomsCapacityValidity();
  };

  roomNumberSelect.addEventListener('change', function () {
    validateCapacity();
    checkRoomsCapacityValidity();
  });

  roomCapacitySelect.addEventListener('change', function () {
    checkRoomsCapacityValidity();
  });

  offerForm.addEventListener('submit', function () {
    checkRoomsCapacityValidity();
  });

  var init = function () {
    disableFormInputs(offerForm);
    disableFormInputs(filterForm);
    offerFormValidation();
    setInitialOfferAddress();

    mapPin.addEventListener('mousedown', onPinMousedown);
  };

  init();


  window.form = {
    disableMapFilter: disableMapFilter,
    disableOfferEditor: disableOfferForm,
    enableMapFilter: enableFilterForm,
    enableOfferEditor: enableOfferEditor,
    setOfferAddress: setOfferAddress
  };
})();
