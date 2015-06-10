var Projectile = require('./Projectile');

var thing = new Projectile({
  'selector': '.projectile',
  'initV': 1000,
  'g': -200,
  'frictionCo': 0.7,
  'degrees': 70,
  'initXPos': 0,
  'initYPos': 0
});

thing.startAnimation();