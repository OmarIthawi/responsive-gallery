;(function() {
  var gallery = function(elem) {
    var activeImageIndex = 0;
    var thumbs = elem.querySelector('.thumbs').children;
    var images = elem.querySelector('.images').children;

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

    imagesHammer.on('swipeleft', function(e) {
      activateImage(activeImageIndex + 1);
    });

    imagesHammer.on('swiperight', function(e) {
      activateImage(activeImageIndex - 1);
    });


    for (var i=0; i < thumbs.length; i+=1) {
      var onThumbClick = function () {
        var siblings = this.parentElement.children;

        for (var i=0; i < siblings.length; i+=1) {
          if (siblings[i] === this) {
            activateImage(i);
            return;
          }
        }
      };

      thumbs[i].addEventListener('click', onThumbClick, false);
    }
  };

  window.Gallery = gallery;
}());
