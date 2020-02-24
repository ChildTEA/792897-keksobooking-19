'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  var addRequestHandlers = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        switch (xhr.status) {
          case 400:
            onError('Статус ответа: ' + xhr.status + '. Неправильный запрос.');
            break;

          case 404:
            onError('Статус ответа: ' + xhr.status + '. Запрашиваемый ресурс не найден');
            break;

          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
            break;
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('timeout', function () {
      onError('Ожидание ответа от сервера превысило ' + xhr.timeout + 'мс');
    });
  };

  var load = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    addRequestHandlers(xhr, onLoad, onError);

    xhr.open('GET', url);
    xhr.send();
  };


  window.backend = {
    load: load
  };
})();
