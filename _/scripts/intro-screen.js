module.exports = (function() {
  var mainTitle, form, projectile, angleLine;
  var clicked = false;

  var titleClick = function() {
    mainTitle.addEventListener('click', function(e) {
      clicked = true;

      this.classList.add('fade-out');

      form.classList.add('fade-in');
      projectile.classList.add('fade-in');
      angleLine.classList.add('fade-in');
    });
  };

  var init = function(options) {
    mainTitle = options.title;
    form = options.form;
    projectile = options.projectile;
    angleLine = options.angleLine;

    titleClick();
  };

  return {
    init: init,
    clicked: function() {
      return clicked;
    }
  };
})();
