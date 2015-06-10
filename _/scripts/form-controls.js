var Projectile = require('./Projectile');

var formControls = (function() {

  var inputs, input, form, runningAnimation, projectile;

  var formValueDisplays = function() {
    for(var i = 0; i < inputs.length; i++) {

      input = inputs[i];

      // init values
      input.parentNode.querySelector('span').textContent = input.value;

      input.addEventListener('change',function(e) {
        this.parentNode.querySelector('span').textContent = this.value;
      })
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

}());

module.exports = formControls;