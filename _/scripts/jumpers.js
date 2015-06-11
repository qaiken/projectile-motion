var Projectile = require('./Projectile');

module.exports = (function() {

  var jumper;

  var frag = document.createDocumentFragment();

  var initJumpers = function(numJumpers) {
    for(var i = 0; i < numJumpers; ++i) {

      jumper = document.createElement('div');

      jumper.classList.add('jumper');
      jumper.classList.add('jumper-'+i);

      frag.appendChild(jumper);
    }

    document.body.appendChild(frag);
  };

  var init = function(numJumpers) {
    initJumpers(numJumpers);
  };

  return {
    init: init
  };

}());