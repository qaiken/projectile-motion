var Projectile = require('physics-projectile').default;

var formControls = (function() {
  var inputs,
    input,
    form,
    runningAnimation,
    container,
    projectile,
    angleLine,
    angleLineInitXPos,
    angleLineInitYPos;

  var maxInitPos = function() {
    var projectileWidth = projectile.clientWidth;
    var projectileHeight = projectile.clientHeight;

    initXPos.max = container.clientWidth - projectileWidth;
    initYPos.max = container.clientHeight - projectileHeight;
  };

  var formValueDisplays = function() {
    var initXPos = document.getElementById('initXPos');
    var initYPos = document.getElementById('initYPos');
    var theta = document.getElementById('theta');

    maxInitPos();

    window.addEventListener('resize', maxInitPos);

    for (var i = 0; i < inputs.length; i++) {
      input = inputs[i];

      // init values
      input.parentNode.querySelector('span').textContent = input.value;

      input.addEventListener('input', function(e) {
        this.parentNode.querySelector('span').textContent = this.value;

        if (
          (!runningAnimation || !runningAnimation.projectileAnimation) &&
          (this.id === 'initXPos' ||
            this.id === 'initYPos' ||
            this.id === 'theta')
        ) {
          projectile.style.left = initXPos.value + 'px';
          projectile.style.bottom = initYPos.value + 'px';

          angleLine.style.left =
            Number(angleLineInitXPos) + Number(initXPos.value) + 'px';
          angleLine.style.bottom =
            Number(angleLineInitYPos) + Number(initYPos.value) + 'px';
          angleLine.style.webkitTransform = 'rotate(-' + theta.value + 'deg)';
          angleLine.style.transform = 'rotate(-' + theta.value + 'deg)';
        }
      });
    }
  };

  var startAnimation = function() {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var initV = document.getElementById('initV').value;
      var g = document.getElementById('ga').value;
      var fc = document.getElementById('fc').value;
      var theta = document.getElementById('theta').value;
      var initXPos = document.getElementById('initXPos').value;
      var initYPos = document.getElementById('initYPos').value;

      if (runningAnimation) {
        runningAnimation.stopAnimation();
      }

      runningAnimation = new Projectile({
        selector: projectile,
        initV: +initV,
        g: +g,
        frictionCo: +fc,
        degrees: +theta,
        initXPos: +initXPos,
        initYPos: +initYPos
      });

      runningAnimation.startAnimation();
    });
  };

  var init = function(options) {
    form = options.form;
    projectile = options.projectile;
    container = options.simulationContainer;
    angleLine = options.angleLine;
    inputs = form.querySelectorAll('input[type=range]');

    angleLineInitXPos = projectile.offsetWidth / 2;
    angleLineInitYPos = projectile.offsetHeight / 2;

    formValueDisplays();
    startAnimation();
  };

  return {
    init: init
  };
})();

module.exports = formControls;
