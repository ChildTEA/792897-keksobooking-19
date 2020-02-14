'use strict';

(function () {
  var replace = function (block, handler) {
    var onMouseDown = function (evt) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        isDragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        block.style.top = (block.offsetTop - shift.y) + 'px';
        block.style.left = (block.offsetLeft - shift.x) + 'px';

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);

        if (isDragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            handler.removeEventListener('click', onClickPreventDefault);
          };
          handler.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    };

    handler.addEventListener('mousedown', onMouseDown);
  };

  var reset = function (block) {
    block.style.top = '';
    block.style.left = '';
  };


  window.dragAndAction = {
    replace: replace,
    reset: reset
  };
})();
