'use strict';

(function () {
  var ENTER_KEYCODE = 'Enter';
  var SPACE_KEYCODE = 'Space';

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


  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    SPACE_KEYCODE: SPACE_KEYCODE,
    getRandomArrayItem: getRandomArrayItem,
    getRandomInteger: getRandomInteger,
    getRandomNumber: getRandomNumber,
    randomlyCutArray: randomlyCutArray,
    shuffleArray: shuffleArray
  };
})();
