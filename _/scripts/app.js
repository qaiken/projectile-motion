var cssClasses = require('./css-classes');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');
var jumpers = require('./jumpers');

jumpers.init(40);

introScreen.init();

formControls.init({
  'simulationContainer' : cssClasses.container,
  'formContainer' : cssClasses.form,
  'projectile' : cssClasses.projectile,
  'angle': cssClasses.angle
});
