'use strict';

var offersMap = document.querySelector('.map');

var activateMap = function () {
  offersMap.classList.remove('map--faded');
};

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

    if (type === 'palace') {
      title = 'Сдаю дворец!';
      rooms = getRandomInteger(10, 20);
      price = 100 * rooms + features.length * 20;
      description = '+100500 к авторитету';
    }
    if (type === 'flat') {
      title = 'Сдаю квартиру';
      rooms = getRandomInteger(1, 4);
      price = 25 * rooms + features.length * 3;
      description = 'Невероятные виды из окна';
    }
    if (type === 'house') {
      title = 'Сдаю дом';
      rooms = getRandomInteger(2, 6);
      price = 35 * rooms + features.length * 5;
      description = 'Енот в придачу, бесплатно!';
    }
    if (type === 'bungalo') {
      title = 'Сдаю хату';
      rooms = getRandomInteger(1, 2);
      price = 10 * rooms + features.length * 2;
      description = 'Предыдущего владельца съели утки';
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


var rentOffers = generateRandomOffers(8);
renderPins(rentOffers);
activateMap();
