module.exports = (function() {
  var mainTitle, form, projectile, angleLine, onTitleClick;

  var handleTitleClick = function() {
    mainTitle.addEventListener('click', function(e) {
      this.classList.add('fade-out');

      form.classList.add('fade-in');
      projectile.classList.add('fade-in');
      angleLine.classList.add('fade-in');

      onTitleClick();
    });
  };

  var init = function(options, onClick) {
    mainTitle = options.title;
    form = options.form;
    projectile = options.projectile;
    angleLine = options.angleLine;

    onTitleClick = onClick;
    handleTitleClick();
  };

  return {
    init: init
  };
})();
