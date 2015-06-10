function Projectile(options) {
  this.projectile = document.querySelector(options.selector);
  this.initV = options.initV;
  this.g = options.g;
  this.frictionCo = options.frictionCo;
  this.theta = this.degreesToRadians(options.degrees);
  this.initXPos = options.initXPos;
  this.initYPos = options.initYPos;
  this.frictionStartTime = 0;
}

Projectile.prototype.frictionalA = function() {
  return this.frictionCo * this.g;
};

Projectile.prototype.degreesToRadians = function(degrees) {
  return degrees * (Math.PI/180);
};

Projectile.prototype.initVx = function() {
  return this.initV * Math.cos(this.theta);
};

Projectile.prototype.initVy = function() {
  return this.initV * Math.sin(this.theta);
};

Projectile.prototype.projectileFrame = function(t) {
  // seconds
  t = t / 1000;

  var frictionTime = 0;

  var yPos = this.initYPos + (this.initVy() * t) + (1/2)*this.g*Math.pow(t,2);
  yPos = Math.max(0,yPos);

  if( yPos === 0 ) {
    this.frictionStartTime = this.frictionStartTime || t;
    frictionTime = t - this.frictionStartTime;
  }

  var prevXPos = +this.projectile.style.left.slice(0, -2);
  var xPos = this.initXPos + (this.initVx() * t) + (1/2)*this.frictionalA()*Math.pow(frictionTime,2);
  xPos = Math.max(prevXPos,xPos);

  this.projectile.style.left = xPos + 'px';
  this.projectile.style.bottom = yPos + 'px';

  if(xPos !== prevXPos) {
    this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
  }
};

Projectile.prototype.startAnimation = function() {
  this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
};

module.exports = Projectile;