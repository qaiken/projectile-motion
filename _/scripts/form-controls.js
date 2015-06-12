var Projectile = require('./Projectile');

var formControls = (function() {

  var inputs, input, form,
  runningAnimation, container, projectile;

  var maxInitPos = function () {
    var projectileWidth = projectile.clientWidth;
    var projectileHeight = projectile.clientHeight;

    initXPos.max = container.clientWidth - projectileWidth;
    initYPos.max = container.clientHeight - projectileHeight;
  };

  var formValueDisplays = function() {

    var initXPos = document.getElementById('initXPos');
    var initYPos = document.getElementById('initYPos');

    maxInitPos();

    window.addEventListener('resize',maxInitPos);

    for(var i = 0; i < inputs.length; i++) {
      input = inputs[i];

      // init values
      input.parentNode.querySelector('span').textContent = input.value;

      input.addEventListener('input',function(e) {
        this.parentNode.querySelector('span').textContent = this.value;

        if( (!runningAnimation || !runningAnimation.projectileAnimation) && (this.id === 'initXPos' || this.id === 'initYPos') ) {
          projectile.style.left = initXPos.value + 'px';
          projectile.style.bottom = initYPos.value + 'px';
        }
      });
    }
  };

  var startAnimation = function() {

    form.addEventListener('submit',function(e) {

      e.preventDefault();

      var initV = document.getElementById('initV').value;
      var g = document.getElementById('ga').value;
      var fc = document.getElementById('fc').value;
      var theta = document.getElementById('theta').value;
      var initXPos = document.getElementById('initXPos').value;
      var initYPos = document.getElementById('initYPos').value;

      if(runningAnimation) {
        runningAnimation.stopAnimation();
      }

      runningAnimation = new Projectile({
        'selector': projectile,
        'initV': +initV,
        'g': +g,
        'frictionCo': +fc,
        'degrees': +theta,
        'initXPos': +initXPos,
        'initYPos': +initYPos
      });

      runningAnimation.startAnimation();

    });

  };

  var init = function(options) {

    form = document.querySelector(options.formContainer);
    projectile = document.querySelector(options.projectile);
    container = document.querySelector(options.simulationContainer);
    inputs = form.querySelectorAll('input[type=range]');

    formValueDisplays();
    startAnimation();
  };

  return {
    init: init
  };

}());

module.exports = formControls;