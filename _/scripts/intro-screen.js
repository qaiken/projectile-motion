var cssClasses = require('./css-classes');

module.exports = (function() {

  var mainTitle;
  var form;
  var projectile;
  var clicked = false;

  var titleClick = function() {

    mainTitle.addEventListener('click',function(e) {
      clicked = true;
      
      this.classList.add('fade-out');

      form.classList.add('fade-in');
      projectile.classList.add('fade-in');
    });

  };

  var init = function() {
    mainTitle = document.querySelector(cssClasses.title);
    form = document.querySelector(cssClasses.form);
    projectile = document.querySelector(cssClasses.projectile);

    titleClick();
  };

  return {
    init: init,
    clicked: function() {
      return clicked;
    }
  };

}());
