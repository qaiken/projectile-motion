function Projectile(options) {
  this.projectile = options.selector;
  this.initV = options.initV;
  this.g = options.g;

  this.frictionCo = options.frictionCo;
  this.frictionalA = this.getFrictionalA();

  this.theta = this.degreesToRadians(options.degrees);

  this.initXPos = options.initXPos;
  this.initYPos = options.initYPos;

  this.initVx = this.getInitVx();
  this.initVy = this.getInitVy();

  this.animationStartTime = 0;
  this.frictionStartTime = 0;
}

Projectile.prototype.getFrictionalA = function() {
  return this.frictionCo * this.g;
};

Projectile.prototype.degreesToRadians = function(degrees) {
  return degrees * (Math.PI/180);
};

Projectile.prototype.getInitVx = function() {
  return this.initV * Math.cos(this.theta);
};

Projectile.prototype.getInitVy = function() {
  return this.initV * Math.sin(this.theta);
};

Projectile.prototype.projectileFrame = function(t) {

  this.animationStartTime = this.animationStartTime || t;
  t = t - this.animationStartTime;

  // seconds
  t = t / 1000;

  var frictionTime = 0;

  var yPos = this.initYPos + (this.initVy * t) + (1/2)*this.g*Math.pow(t,2);
  yPos = Math.max(0,yPos);

  if( this.projectileAnimation > 1 && yPos === 0 ) {
    this.frictionStartTime = this.frictionStartTime || t;
    frictionTime = t - this.frictionStartTime;
  }

  var prevXPos = +this.projectile.style.left.slice(0, -2);
  var xPos = this.initXPos + (this.initVx * t) + (1/2)*this.frictionalA*Math.pow(frictionTime,2);

  xPos = Math.max(prevXPos,xPos);

  this.projectile.style.left = xPos + 'px';
  this.projectile.style.bottom = yPos + 'px';

  if( t === 0 || xPos !== prevXPos ) {
    this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
  } else {
    this.stopAnimation();
  }
};

Projectile.prototype.startAnimation = function() {

  this.projectile.style.left = this.initXPos + 'px';
  this.projectile.style.bottom = this.initYPos + 'px';

  this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
};

Projectile.prototype.stopAnimation = function() {
  cancelAnimationFrame(this.projectileAnimation);
  this.projectileAnimation = undefined;
};

module.exports = Projectile;