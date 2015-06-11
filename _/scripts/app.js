var cssClasses = require('./css-classes');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');
var jumpers = require('./jumpers');

formControls.init({
  'simulationContainer' : cssClasses.container,
  'formContainer' : cssClasses.form,
  'projectile' : cssClasses.projectile
});

console.log(jumpers);

jumpers.init(40);