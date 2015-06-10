var cssClasses = require('./css-classes');

module.exports = (function() {

  var mainTitle = document.querySelector(cssClasses.title);
  var form = document.querySelector(cssClasses.form);
  var projectile = document.querySelector(cssClasses.projectile);

  mainTitle.addEventListener('click',function(e) {
    
    this.classList.add('fade-out');

    form.classList.add('fade-in');
    projectile.classList.add('fade-in');
  });

  return true;

}());
