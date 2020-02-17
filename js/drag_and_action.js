'use strict';

(function () {
  var replace = function (block, handler, limitTop, limitRight, limitBottom, limitLeft) {
    var onMouseDown = function (evt) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var isDragged = false;

      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        var newCoords = {
          x: block.offsetLeft - shift.x,
          y: block.offsetTop - shift.y
        };

        if (moveEvt.pageX > limitRight) {
          newCoords.x = limitRight;
        } else if (moveEvt.pageX < limitLeft) {
          newCoords.x = limitLeft;
        }
        if (moveEvt.pageY > limitBottom) {
          newCoords.y = limitBottom;
        } else if (moveEvt.pageY < limitTop) {
          newCoords.y = limitTop;
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
