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

}());

module.exports = formControls;