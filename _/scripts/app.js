var domElements = require('./dom-elements');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');
var jumpers = require('./jumpers');

jumpers.init(40);

introScreen.init(domElements);

formControls.init(domElements);
