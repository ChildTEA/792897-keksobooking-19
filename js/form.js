'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MIN_BUNGALO_PRICE = 0;
  var MIN_FLAT_PRICE = 1000;
  var MIN_HOUSE_PRICE = 5000;
  var MIN_PALACE_PRICE = 10000;
  var MAX_PRICE = 1000000;
  var IMG_EXTENSION = ['gif', 'jpg', 'jpeg', 'png'];
  var mainPin = document.querySelector('.map__pin--main');

  var filterForm = document.querySelector('form.map__filters');
  var offerForm = document.querySelector('form.ad-form');
  var titleInput = offerForm.querySelector('#title');
  var addressInput = offerForm.querySelector('#address');
  var typeSelect = offerForm.querySelector('#type');
  var priceInput = offerForm.querySelector('#price');
  var timeinSelect = offerForm.querySelector('#timein');
  var timeoutSelect = offerForm.querySelector('#timeout');
  var roomNumberSelect = offerForm.querySelector('#room_number');
  var roomCapacitySelect = offerForm.querySelector('#capacity');
  var avatarInput = offerForm.querySelector('#avatar');
  var offerImagesInput = offerForm.querySelector('#images');

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
    var MAP_PIN_WIDTH = mainPin.clientWidth;
    var MAP_PIN_HEIGHT = mainPin.clientHeight;

    var x = mainPin.offsetLeft + (MAP_PIN_WIDTH / 2);
    var y = mainPin.offsetTop + MAP_PIN_HEIGHT / 2;

    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var setOfferAddress = function () {
    var MAP_PIN_WIDTH = mainPin.clientWidth;
    var MAP_PIN_HEIGHT = 84;
    var x = mainPin.offsetLeft + (MAP_PIN_WIDTH / 2);
    var y = mainPin.offsetTop + MAP_PIN_HEIGHT;

    addressInput.value = Math.round(x) + ', ' + Math.round(y);
  };

  var validateInputLength = function (input, minLength, maxLength) {
    if (input.value.length < minLength) {
      input.setCustomValidity('Минимальное количество символов: ' + minLength);
    } else if (input.value.length >= maxLength) {
      input.setCustomValidity('Максимальное количество символов: ' + maxLength);
    } else {
      input.setCustomValidity('');
    }
  };

  var validateNumberValue = function (input, minValue, maxValue) {
    if (input.value < minValue) {
      input.setCustomValidity('Минимальное допустимое значение: ' + minValue);
    } else if (input.value > maxValue) {
      input.setCustomValidity('Максимальное допустимое значение: ' + maxValue);
    } else {
      input.setCustomValidity('');
    }
  };

  var validateTitle = function () {
    validateInputLength(titleInput, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
  };

  var validatePrice = function () {
    switch (typeSelect.value) {
      case 'bungalo':
        priceInput.placeholder = '0';
        validateNumberValue(priceInput, MIN_BUNGALO_PRICE, MAX_PRICE);
        break;
      case 'flat':
        priceInput.placeholder = '1 000';
        validateNumberValue(priceInput, MIN_FLAT_PRICE, MAX_PRICE);
        break;
      case 'house':
        priceInput.placeholder = '5 000';
        validateNumberValue(priceInput, MIN_HOUSE_PRICE, MAX_PRICE);
        break;
      case 'palace':
        priceInput.placeholder = '10 000';
        validateNumberValue(priceInput, MIN_PALACE_PRICE, MAX_PRICE);
        break;
      default:
        validateNumberValue(priceInput, 0, MAX_PRICE);
        break;
    }
  };

  var setTimeinSelect = function () {
    timeinSelect.selectedIndex = timeoutSelect.selectedIndex;
  };

  var setTimeoutSelect = function () {
    timeoutSelect.selectedIndex = timeinSelect.selectedIndex;
  };

  var validateTime = function () {
    if (timeinSelect.value !== timeoutSelect.value) {
      timeoutSelect.setCustomValidity('Время выезда отличается от времени заезда');
    } else {
      timeoutSelect.setCustomValidity('');
    }
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

  var validateRoomsCapacity = function () {
    if (roomCapacitySelect[roomCapacitySelect.selectedIndex].disabled) {
      roomCapacitySelect.setCustomValidity('Неподходящее количество гостей');
    } else {
      roomCapacitySelect.setCustomValidity('');
    }
  };

  var validateFileInput = function (input, extensions) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = extensions.some(function (extension) {
        return fileName.endsWith(extension);
      });
    }

    if (matches) {
      input.setCustomValidity('');
    } else {
      input.setCustomValidity('Недопустимое расширение файла');
    }
  };

  var initialOfferValidation = function () {
    validatePrice();
    setTimeoutSelect();
    validateCapacity();
    validateRoomsCapacity();
  };

  titleInput.addEventListener('change', function () {
    validateTitle();
  });
  typeSelect.addEventListener('change', function () {
    validatePrice();
  });
  priceInput.addEventListener('change', function () {
    validatePrice();
  });
  timeinSelect.addEventListener('change', function () {
    setTimeoutSelect();
    validateTime();
  });
  timeoutSelect.addEventListener('change', function () {
    setTimeinSelect();
    validateTime();
  });

  roomNumberSelect.addEventListener('change', function () {
    validateCapacity();
    validateRoomsCapacity();
  });

  roomCapacitySelect.addEventListener('change', function () {
    validateRoomsCapacity();
  });

  avatarInput.addEventListener('change', function () {
    validateFileInput(avatarInput, IMG_EXTENSION);
  });
  offerImagesInput.addEventListener('change', function () {
    validateFileInput(offerImagesInput, IMG_EXTENSION);
  });

  offerForm.addEventListener('submit', function () {
    validateRoomsCapacity();
  });


  disableFormInputs(offerForm);
  disableFormInputs(filterForm);
  initialOfferValidation();
  setInitialOfferAddress();


  window.form = {
    disableMapFilter: disableMapFilter,
    disableOfferEditor: disableOfferForm,
    enableMapFilter: enableFilterForm,
    enableOfferEditor: enableOfferEditor,
    setOfferAddress: setOfferAddress
  };
})();
