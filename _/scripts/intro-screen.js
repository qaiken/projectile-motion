module.exports = (function() {

  var mainTitle = document.querySelector('.main-title');
  var form = document.querySelector('.projectile-controls');
  var projectile = document.querySelector('.projectile');


  mainTitle.addEventListener('click',function(e) {
    
    this.classList.add('fade-out');

    form.classList.add('fade-in');
    projectile.classList.add('fade-in');
  });

  return true;

}());
