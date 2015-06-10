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
