;(function() {
  var utils = {
    getElementIndex: function (elem) {
      var siblings = elem.parentElement.children

      for (var i=0; i < siblings.length; i+=1) {
        if (siblings[i] === elem) {
          return i;
        }
      }

      return -1;
    },
    addClassToElement: function(elem, value) {
      var rspaces = /\s+/;
      var classNames = (value || "").split(rspaces);
      var className = " " + elem.className + " ",
        setClass = elem.className;
      for (var c = 0, cl = classNames.length; c < cl; c++) {
        if (className.indexOf(" " + classNames[c] + " ") < 0) {
          setClass += " " + classNames[c];
        }
      }
      elem.className = setClass.replace(/^\s+|\s+$/g, ''); //trim
    },
    removeClassFromElement: function(elem, value) {
      var rspaces = /\s+/;
      var rclass = /[\n\t]/g
      var classNames = (value || "").split(rspaces);
      var className = (" " + elem.className + " ").replace(rclass, " ");
      for (var c = 0, cl = classNames.length; c < cl; c++) {
        className = className.replace(" " + classNames[c] + " ", " ");
      }
      elem.className = className.replace(/^\s+|\s+$/g, ''); //trim
    }
  };

  var gallery = function(elem) {
    var activeImageIndex = 0;
    var thumbs = elem.querySelectorAll('.thumb');
    var images = elem.querySelectorAll('.image');

    var activateImage = function(index) {
      if (!thumbs[index]) {
        return;
      }

      activeImageIndex = index;

      var toggleActiveClass = function(el, i) {
        if (i === index) {
          utils.addClassToElement(el, 'active');
        } else {
          utils.removeClassFromElement(el, 'active');
        }
      };

      for (var i=0; i < thumbs.length; i+=1) {
        toggleActiveClass(thumbs[i], i);
        toggleActiveClass(images[i], i);
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
        return activateImage(utils.getElementIndex(this));
      };

      thumbs[i].addEventListener('click', onThumbClick, false);
    }
  };

  window.Gallery = gallery;
}());
