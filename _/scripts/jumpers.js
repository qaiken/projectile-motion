var Projectile = require('./Projectile');
var utils = require('./utils');
var introScreen = require('./intro-screen');

module.exports = (function() {
  var jumper, numJumpers;

  var winWidth = window.outerWidth;

  var frag = document.createDocumentFragment();

  var initJumpers = function() {
    for (var i = 0; i < numJumpers; ++i) {
      jumper = document.createElement('i');

      jumper.classList.add('jumper');
      jumper.classList.add('jumper-' + i);
      jumper.classList.add('icon-soccer-ball');

      jumper.style.zIndex = utils.randNumber(0, 10);

      frag.appendChild(jumper);
    }

    document.body.appendChild(frag);
  };

  var jumpEm = function() {
    for (var i = 0; i < numJumpers; ++i) {
      (function(i) {
        var initDelay = utils.randNumber(0, 5000);
        var initV = utils.randNumber(250, 750);
        var g = utils.randNumber(-1000, 0);
        var degrees = utils.randNumber(70, 90);
        var initXPos = utils.randNumber(0, winWidth);

        setTimeout(function Jump() {
          var runningAnimation = new Projectile({
            selector: document.querySelector('.jumper-' + i),
            initV: initV,
            g: g,
            frictionCo: 0.5,
            degrees: degrees,
            initXPos: initXPos,
            initYPos: -50
          });

          runningAnimation.startAnimation();

          var checkifStopped = setInterval(function() {
            // if animation has stopped
            // and the main title has not been clicked,
            // start up the animation again
            if (
              !introScreen.clicked() &&
              !runningAnimation.projectileAnimation
            ) {
              clearInterval(checkifStopped);
              Jump();
            }

            if (introScreen.clicked()) {
              clearInterval(checkifStopped);
            }
          }, 1000);
        }, initDelay);
      })(i);
    }
  };

  var init = function(jumperCount) {
    numJumpers = jumperCount;

    initJumpers();
    jumpEm();
  };

  return {
    init: init
  };
})();
