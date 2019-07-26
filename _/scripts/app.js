var jumpers = require('physics-jumpy').default;

var domElements = require('./dom-elements');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');

jumpers.init(40, 'icon-soccer-ball');
introScreen.init(domElements, jumpers.stop);

formControls.init(domElements);
