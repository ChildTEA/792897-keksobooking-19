'use strict';

// Constants:
var ENTER_KEYCODE = 'Enter';
var SPACE_KEYCODE = 'Space';

var offersMap = document.querySelector('.map');
var filterForm = document.querySelector('form.map__filters');
var offerForm = document.querySelector('form.ad-form');
var addressInput = document.querySelector('#address');
var roomNumberSelect = document.querySelector('#room_number');
var roomCapacitySelect = document.querySelector('#capacity');
var mapPin = document.querySelector('.map__pin--main');

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * (number + 1));
};

var getRandomInteger = function (min, max) {
  var randomNumber = min + Math.random() * (max + 1 - min);

  return Math.floor(randomNumber);
};

var getRandomArrayItem = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var shuffleArray = function (array) {
  var clonedItems = array.concat();
  var j;
  var temp;
  for (var i = clonedItems.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = clonedItems[j];
    clonedItems[j] = clonedItems[i];
    clonedItems[i] = temp;
  }
  return clonedItems;
};

var randomlyCutArray = function (array) {
  var shuffledItems = shuffleArray(array);

  return shuffledItems.slice(getRandomNumber(shuffledItems.length));
};

var activateMap = function () {
  offersMap.classList.remove('map--faded');
  offerForm.classList.remove('ad-form--disabled');

  mapPin.removeEventListener('mousedown', onPinFirstClick);
  mapPin.removeEventListener('keydown', onPinFirstEnterPress);
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

var generateRandomOffers = function (quantity) {
  var RENT_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_URL = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var randomOffers = [];

  for (var i = 1; i <= quantity; i++) {
    var avatarIndex = (i < 10) ? '0' + i : i;
    var type = getRandomArrayItem(RENT_TYPES);
    var features = randomlyCutArray(FEATURES);
    var title = 'Сдаю апартаменты';
    var rooms = 0;
    var price = 0;
    var description = 'Что-то пошло не так...';
    var positionX = getRandomNumber(offersMap.clientWidth);
    var positionY = getRandomInteger(130, 630);

    switch (type) {
      case 'palace':
        title = 'Сдаю дворец!';
        rooms = getRandomInteger(10, 20);
        price = 100 * rooms + features.length * 20;
        description = '+100500 к авторитету';
        break;
      case 'flat':
        title = 'Сдаю квартиру';
        rooms = getRandomInteger(1, 4);
        price = 25 * rooms + features.length * 3;
        description = 'Невероятные виды из окна';
        break;
      case 'house':
        title = 'Сдаю дом';
        rooms = getRandomInteger(2, 6);
        price = 35 * rooms + features.length * 5;
        description = 'Енот в придачу, бесплатно!';
        break;
      case 'bungalo':
        title = 'Сдаю хату';
        rooms = getRandomInteger(1, 2);
        price = 10 * rooms + features.length * 2;
        description = 'Предыдущего владельца съели утки';
        break;
    }

    var randomOffer = {
      'author': {
        'avatar': 'img/avatars/user' + avatarIndex + '.png'
      },

      'offer': {
        'title': title,
        'address': positionX + ', ' + positionY,
        'price': price,
        'type': type,
        'rooms': rooms,
        'guests': rooms * getRandomInteger(2, 4),
        'checkin': getRandomArrayItem(CHECKIN_TIMES),
        'checkout': getRandomArrayItem(CHECKOUT_TIMES),
        'features': features,
        'description': description,
        'photos': randomlyCutArray(PHOTOS_URL)
      },
      'location': {
        'x': positionX,
        'y': positionY
      },
    };

    randomOffers.push(randomOffer);
  }

  return randomOffers;
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

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();

  pins.forEach(function (pin) {
    fragment.appendChild(renderPin(pin));
  });

  offersMap.appendChild(fragment);
};


var onPinFirstClick = function (evt) {
  if (evt.button === 0) {
    var rentOffers = generateRandomOffers(8);
    renderPins(rentOffers);

    activateMap();
    enableFormInputs(offerForm);
    enableFormInputs(filterForm);
    setOfferAddress();
  }
};

var onPinFirstEnterPress = function (evt) {
  if (evt.code === ENTER_KEYCODE || evt.code === SPACE_KEYCODE) {
    var rentOffers = generateRandomOffers(8);

    activateMap();
    renderPins(rentOffers);
    enableFormInputs(offerForm);
    enableFormInputs(filterForm);
    setOfferAddress();
  }
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

  mapPin.addEventListener('mousedown', onPinFirstClick);
  mapPin.addEventListener('keydown', onPinFirstEnterPress);
};

init();
