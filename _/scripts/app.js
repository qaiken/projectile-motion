var cssClasses = require('./css-classes');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');

formControls.init({
  'simulationContainer' : cssClasses.container,
  'formContainer' : cssClasses.form,
  'projectile' : cssClasses.projectile
});