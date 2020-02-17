'use strict';

(function () {
  var replace = function (block, handler, limitBox, limits) {
    var onMouseDown = function (evt) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        var limitBoxOffsetX = limitBox.getBoundingClientRect().x;
        var limitBoxOffsetY = limitBox.getBoundingClientRect().y;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var newCoords = {
          x: block.offsetLeft - shift.x,
          y: block.offsetTop - shift.y
        };

        if (moveEvt.pageX > limits.right) {
          newCoords.x = limits.right - limitBoxOffsetX;
        } else if (moveEvt.pageX < limits.left) {
          newCoords.x = limits.left - limitBoxOffsetX;
        }
        if (moveEvt.pageY > limits.bottom) {
          newCoords.y = limits.bottom - limitBoxOffsetY;
        } else if (moveEvt.pageY < limits.top) {
          newCoords.y = limits.top - limitBoxOffsetY;
        }

        if (shift.x !== 0 || shift.y !== 0) {
          isDragged = true;
        }

        block.style.top = newCoords.y + 'px';
        block.style.left = newCoords.x + 'px';

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

  var reset = function (block, x, y) {
    block.style.left = x ? (x + 'px') : '';
    block.style.top = y ? (y + 'px') : '';
  };


  window.dragAndAction = {
    replace: replace,
    reset: reset
  };
})();
