'use strict';

(function () {
  var FEATURES_ITEM_CLASS_TEMPLATE = 'popup__feature popup__feature--';

  var offersMap = document.querySelector('.map');
  var filterContainer = offersMap.querySelector('.map__filters-container');

  var createCard = function (offerData) {
    var cardPopup = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

    var endingNormalize = function (number, forms) {
      number = Number(number);
      if (number % 100 === 11) {
        return forms[0];
      }
      var remainder = number % 10;
      switch (true) {
        case remainder === 0 || remainder > 4:
          return forms[0];
        case remainder === 1:
          return forms[1];
        default:
          return forms[2];
      }
    };

    var roomsEndingNormalize = function (number) {
      var forms = ['комнат', 'комната', 'комнаты'];
      return endingNormalize(number, forms);
    };

    var guestsEndingNormalize = function (number) {
      var forms = ['гостей', 'гостя', 'гостей'];
      return endingNormalize(number, forms);
    };

    var translateOfferType = function () {
      switch (offerData.offer.type) {
        case 'palace':
          return 'Дворец';
        case 'house':
          return 'Дом';
        case 'flat':
          return 'Квартира';
        case 'bungalo':
          return 'Бунгало';
        default:
          return 'Тип не указан';
      }
    };

    var getOfferFeatures = function () {
      var cardFeaturesList = cardPopup.querySelector('.popup__features');
      cardFeaturesList.innerHTML = '';
      var fragment = document.createDocumentFragment();

      if (offerData.offer.features.length > 0) {
        offerData.offer.features.forEach(function (item) {
          var newElement = document.createElement('li');
          newElement.className = FEATURES_ITEM_CLASS_TEMPLATE + item;
          fragment.appendChild(newElement);
        });

        cardFeaturesList.appendChild(fragment);
      } else {
        cardFeaturesList.remove();
      }
    };

    var getOfferPhotos = function () {
      var photosContainer = cardPopup.querySelector('.popup__photos');
      photosContainer.innerHTML = '';
      var fragment = document.createDocumentFragment();

      if (offerData.offer.photos.length > 0) {
        offerData.offer.photos.forEach(function (item) {
          var newImgElement = document.createElement('img');
          newImgElement.className = 'popup__photo';
          newImgElement.src = item;
          newImgElement.alt = 'Фотография жилья';
          newImgElement.width = '40';
          newImgElement.height = '40';
          fragment.appendChild(newImgElement);
        });

        photosContainer.appendChild(fragment);
      } else {
        photosContainer.remove();
      }
    };

    cardPopup.querySelector('.popup__avatar').src = offerData.author.avatar;
    cardPopup.querySelector('.popup__title').textContent = offerData.offer.title;
    cardPopup.querySelector('.popup__text--address').textContent = offerData.offer.address;
    cardPopup.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
    cardPopup.querySelector('.popup__type').textContent = translateOfferType();
    cardPopup.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' ' + roomsEndingNormalize(offerData.offer.rooms) + ' для ' + offerData.offer.guests + ' ' + guestsEndingNormalize(offerData.offer.guests);
    cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;

    if (offerData.offer.description) {
      cardPopup.querySelector('.popup__description').textContent = offerData.offer.description;
    } else {
      cardPopup.querySelector('.popup__description').remove();
    }

    getOfferFeatures();
    getOfferPhotos();

    return cardPopup;
  };

  var renderCard = function (offerData) {
    removeCurrentCard();

    filterContainer.insertAdjacentElement('beforebegin', createCard(offerData));
    addCloserEventListener();
  };

  var removeCurrentCard = function () {
    var currentCard = offersMap.querySelector('article.map__card.popup');
    if (currentCard) {
      currentCard.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  var onEscPress = function (evt) {
    if (evt.code === window.util.ESCAPE_KEYCODE && evt.target.type !== 'text') {
      removeCurrentCard();
    }
  };

  var addCloserEventListener = function () {
    var closer = offersMap.querySelector('article.map__card.popup .popup__close');

    closer.addEventListener('click', function () {
      removeCurrentCard();
    });

    document.addEventListener('keydown', onEscPress);
  };


  window.card = {
    render: renderCard,
    removeCurrent: removeCurrentCard
  };
})();
