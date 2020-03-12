'use strict';

(function () {
  var IMG_EXTENSION = ['gif', 'jpg', 'jpeg', 'png'];

  var offerForm = document.querySelector('form.ad-form');
  var avatarInput = offerForm.querySelector('#avatar');
  var avatarPreview = offerForm.querySelector('.ad-form-header__preview');
  var avatarInitialContent = avatarPreview.innerHTML.trim();
  var imagesInput = offerForm.querySelector('#images');
  var imagesPreview = offerForm.querySelector('.ad-form__photo');

  var renderPreview = function (input, preview) {
    var file = input.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = IMG_EXTENSION.some(function (extension) {
        return fileName.endsWith(extension);
      });
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {

        var content = '<img src="' + reader.result + '" alt="Превью загруженного изображения" style="max-width: 100%; max-height: 100%">';
        preview.innerHTML = content;
        preview.style = 'display: flex; justify-content: center; align-items: center; padding: 0; overflow: hidden';
      });

      reader.readAsDataURL(file);
    } else if (file) {
      preview.innerHTML = '';
      preview.style = '';
    }
  };

  avatarInput.addEventListener('change', function () {
    renderPreview(avatarInput, avatarPreview);
  });

  imagesInput.addEventListener('change', function () {

    renderPreview(imagesInput, imagesPreview);
  });

  var clearPreview = function () {
    avatarPreview.innerHTML = avatarInitialContent;
    avatarPreview.style = '';
    imagesPreview.innerHTML = '';
    imagesPreview.style = '';
  };

  window.preview = {
    clear: clearPreview
  };
})();
