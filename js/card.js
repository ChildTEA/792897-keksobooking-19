'use strict';

(function () {
  var offersMap = document.querySelector('.map');
  var FEATURES_ITEM_CLASS_TEMPLATE = 'popup__feature popup__feature--';
  var filterContainer = offersMap.querySelector('.map__filters-container');

  var createCard = function (offerData) {
    var cardPopup = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);

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

    var removeDisabledFeatures = function () {
      var cardFeaturesList = cardPopup.querySelector('.popup__features');
      cardFeaturesList.innerHTML = '';
      var fragment = document.createDocumentFragment();

      offerData.offer.features.forEach(function (item) {
        var newElement = document.createElement('li');
        newElement.className = FEATURES_ITEM_CLASS_TEMPLATE + item;
        fragment.appendChild(newElement);
      });
      cardFeaturesList.appendChild(fragment);
    };

    var getOfferPhotos = function () {
      var photosContainer = cardPopup.querySelector('.popup__photos');
      photosContainer.innerHTML = '';
      var fragment = document.createDocumentFragment();

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
    };

    cardPopup.querySelector('.popup__avatar').src = offerData.author.avatar;
    cardPopup.querySelector('.popup__title').textContent = offerData.offer.title;
    cardPopup.querySelector('.popup__text--address').textContent = offerData.offer.address;
    cardPopup.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
    cardPopup.querySelector('.popup__type').textContent = translateOfferType();
    cardPopup.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
    cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ', выезд до ' + offerData.offer.checkout;
    cardPopup.querySelector('.popup__description').textContent = offerData.offer.description;

    removeDisabledFeatures();
    getOfferPhotos();

    return cardPopup;
  };

  var renderCard = function (offerData) {
    removeCurrentCard();

    filterContainer.insertAdjacentElement('beforebegin', createCard(offerData));
    addCloserEventListener();
  };

  var addCloserEventListener = function () {
    var closer = offersMap.querySelector('article.map__card.popup .popup__close');

    closer.addEventListener('click', function () {
      var popup = offersMap.querySelector('article.map__card.popup');
      popup.remove();
    });
  };

  var removeCurrentCard = function () {
    var currentCard = offersMap.querySelector('article.map__card.popup');
    if (currentCard) {
      currentCard.remove();
    }
  };


  window.card = {
    render: renderCard
  };
})();
