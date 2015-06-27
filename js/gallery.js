;(function() {
  'use strict';
  var init = function (elem) {
    var activeImageIndex = 0;
    var thumbs = elem.querySelector('.thumbs').querySelectorAll('div');
    var images = elem.querySelector('.images').querySelectorAll('div');

    var activateImage = function(index) {
      if (!thumbs[index]) {
        return;
      }

      activeImageIndex = index;

      var toggleActiveClass = function(el, i) {
        if (i === index) {
          el.className = 'active';
        } else {
          el.className = '';
        }
      };

      for (var i=0; i < thumbs.length; i+=1) {
        toggleActiveClass(thumbs[i], i);
        toggleActiveClass(images[i], i); // Both `.thumbs` and `.images`
                                         // have the same number of elements
      }
    };


    var imagesHammer = new Hammer(elem.querySelector('.images'));

    imagesHammer.on('swipeleft', function () {
      activateImage(activeImageIndex + 1);
    });

    imagesHammer.on('swiperight', function () {
      activateImage(activeImageIndex - 1);
    });

    var onThumbClick = function () {
      for (var i=0; i < thumbs.length; i+=1) {
        if (thumbs[i] === this) {
          activateImage(i);
          return;
        }
      }
    };

    for (var i=0; i < thumbs.length; i+=1) {
      thumbs[i].addEventListener('click', onThumbClick, false);
    }
  };

  window.Gallery = {
    init: init
  };
}());
