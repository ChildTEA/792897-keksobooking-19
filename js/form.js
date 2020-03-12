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
  var OFFER_FORM_UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var mainPin = document.querySelector('.map__pin--main');

  var filterForm = document.querySelector('form.map__filters');
  var filterByType = filterForm.querySelector('#housing-type');
  var filterByPrice = filterForm.querySelector('#housing-price');
  var filterByRooms = filterForm.querySelector('#housing-rooms');
  var filterByGuests = filterForm.querySelector('#housing-guests');
  var filterFeatures = filterForm.querySelectorAll('input[name="features"]');

  var offerForm = document.querySelector('form.ad-form');
  var titleInput = offerForm.querySelector('#title');
  var addressInput = offerForm.querySelector('#address');
  var typeSelect = offerForm.querySelector('#type');
  var priceInput = offerForm.querySelector('#price');
  var timeinSelect = offerForm.querySelector('#timein');
  var timeoutSelect = offerForm.querySelector('#timeout');
  var roomNumberSelect = offerForm.querySelector('#room_number');
  var roomCapacitySelect = offerForm.querySelector('#capacity');
  var offerFeatures = offerForm.querySelectorAll('input[name="features"]');
  var descriptionTextarea = offerForm.querySelector('#description');
  var avatarInput = offerForm.querySelector('#avatar');
  var avatarLabel = offerForm.querySelector('.ad-form-header__drop-zone');
  var offerImagesInput = offerForm.querySelector('#images');
  var offerImagesLabel = offerForm.querySelector('.ad-form__drop-zone');
  var offerFormReset = offerForm.querySelector('.ad-form__reset');

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

  var addIncorrectInputStyle = function (input) {
    input.style.outline = '2px solid ' + window.util.RED_COLOR;
    input.style.outlineOffset = '-2px';
  };

  var removeIncorrectInputStyle = function (input) {
    input.style.outline = '';
  };

  var validateInputLength = function (input, minLength, maxLength) {
    if (input.value.length < minLength) {
      input.setCustomValidity('Минимальное количество символов: ' + minLength);
      addIncorrectInputStyle(input);
    } else if (input.value.length >= maxLength) {
      input.setCustomValidity('Максимальное количество символов: ' + maxLength);
      addIncorrectInputStyle(input);
    } else {
      input.setCustomValidity('');
      removeIncorrectInputStyle(input);
    }
  };

  var validateNumberValue = function (input, minValue, maxValue) {
    if (input.value < minValue) {
      input.setCustomValidity('Минимальное допустимое значение: ' + minValue);
      addIncorrectInputStyle(input);
    } else if (input.value > maxValue) {
      input.setCustomValidity('Максимальное допустимое значение: ' + maxValue);
      addIncorrectInputStyle(input);
    } else {
      input.setCustomValidity('');
      removeIncorrectInputStyle(input);
    }
  };

  var validateTitle = function () {
    validateInputLength(titleInput, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
  };

  var setPricePlaceholder = function () {
    switch (typeSelect.value) {
      case 'bungalo':
        priceInput.placeholder = '0';
        break;
      case 'flat':
        priceInput.placeholder = '1 000';
        break;
      case 'house':
        priceInput.placeholder = '5 000';
        break;
      case 'palace':
        priceInput.placeholder = '10 000';
        break;
      default:
        priceInput.placeholder = '0';
    }
  };

  var validatePrice = function () {
    switch (typeSelect.value) {
      case 'bungalo':
        validateNumberValue(priceInput, MIN_BUNGALO_PRICE, MAX_PRICE);
        break;
      case 'flat':
        validateNumberValue(priceInput, MIN_FLAT_PRICE, MAX_PRICE);
        break;
      case 'house':
        validateNumberValue(priceInput, MIN_HOUSE_PRICE, MAX_PRICE);
        break;
      case 'palace':
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
      addIncorrectInputStyle(timeoutSelect);
    } else {
      timeoutSelect.setCustomValidity('');
      removeIncorrectInputStyle(timeinSelect);
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
      addIncorrectInputStyle(roomCapacitySelect);
    } else {
      roomCapacitySelect.setCustomValidity('');
      removeIncorrectInputStyle(roomCapacitySelect);
    }
  };

  var validateFileInput = function (input, elementToStyle, extensions) {
    var file = input.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = extensions.some(function (extension) {
        return fileName.endsWith(extension);
      });
    }

    if (matches || !file) {
      input.setCustomValidity('');
      removeIncorrectInputStyle(elementToStyle);
    } else {
      input.setCustomValidity('Недопустимое расширение файла');
      addIncorrectInputStyle(elementToStyle);
    }
  };

  var initialOfferValidation = function () {
    setPricePlaceholder();
    setTimeoutSelect();
    validateCapacity();
    validateRoomsCapacity();
  };

  titleInput.addEventListener('input', function () {
    validateTitle();
  });
  typeSelect.addEventListener('change', function () {
    setPricePlaceholder();
    validatePrice();
  });
  priceInput.addEventListener('input', function () {
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
    validateFileInput(avatarInput, avatarLabel, IMG_EXTENSION);
  });
  offerImagesInput.addEventListener('change', function () {
    validateFileInput(offerImagesInput, offerImagesLabel, IMG_EXTENSION);
  });

  offerForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(OFFER_FORM_UPLOAD_URL, new FormData(offerForm), onLoad, onError);
  });

  var showSuccessMessage = function () {
    var message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

    var onMessageClick = function () {
      message.remove();

      message.removeEventListener('click', onMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageEscPress = function (evt) {
      if (evt.code === window.util.ESCAPE_KEYCODE) {
        message.remove();

        message.removeEventListener('click', onMessageClick);
        document.removeEventListener('keydown', onMessageEscPress);
      }
    };

    document.querySelector('main').insertAdjacentElement('beforeend', message);

    document.addEventListener('keydown', onMessageEscPress);
    message.addEventListener('click', onMessageClick);
  };

  var showErrorMessage = function () {
    var message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var button = message.querySelector('.error__button');

    var onButtonClick = function () {
      message.remove();

      button.removeEventListener('click', onButtonClick);
      message.removeEventListener('click', onMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageClick = function () {
      message.remove();

      button.removeEventListener('click', onButtonClick);
      message.removeEventListener('click', onMessageClick);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var onMessageEscPress = function (evt) {
      if (evt.code === window.util.ESCAPE_KEYCODE) {
        message.remove();

        button.removeEventListener('click', onButtonClick);
        message.removeEventListener('click', onMessageClick);
        document.removeEventListener('keydown', onMessageEscPress);
      }
    };

    document.querySelector('main').insertAdjacentElement('beforeend', message);
    button.addEventListener('click', onButtonClick);
    message.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var resetFilterForm = function () {
    filterByType.selectedIndex = 0;
    filterByPrice.selectedIndex = 0;
    filterByRooms.selectedIndex = 0;
    filterByGuests.selectedIndex = 0;
    filterFeatures.forEach(function (item) {
      item.checked = false;
    });
  };

  var resetOfferForm = function () {
    titleInput.value = '';
    typeSelect.selectedIndex = 1;
    priceInput.value = '';
    setPricePlaceholder();
    timeinSelect.selectedIndex = 0;
    setTimeoutSelect();
    roomNumberSelect.selectedIndex = 0;
    roomCapacitySelect.selectedIndex = 0;
    descriptionTextarea.value = '';
    avatarInput.value = '';
    validateFileInput(avatarInput, avatarLabel, IMG_EXTENSION);
    offerImagesInput.value = '';
    validateFileInput(offerImagesInput, offerImagesLabel, IMG_EXTENSION);

    offerFeatures.forEach(function (item) {
      item.checked = false;
    });

    window.mainPin.resetPlace();
    window.preview.clear();
  };

  var onLoad = function () {
    showSuccessMessage();
    window.map.deactivate();
    resetFilterForm();
    resetOfferForm();
    offerForm.classList.add('ad-form--disabled');
    disableFormInputs(offerForm);
    disableFormInputs(filterForm);
    window.card.removeCurrent();
    window.pins.clear();
    window.mainPin.resetPlace();
    setInitialOfferAddress();
  };

  var onError = function () {
    showErrorMessage();
  };

  offerFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetOfferForm();
    setOfferAddress();
    resetFilterForm();

    window.filter.refresh();
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
    setOfferAddress: setOfferAddress,
    setInitialOfferAddress: setInitialOfferAddress
  };
})();
