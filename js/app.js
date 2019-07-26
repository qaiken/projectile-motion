(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  title: document.querySelector('.main-title'),
  simulationContainer: document.querySelector('.simulation-container'),
  form: document.querySelector('.projectile-controls'),
  projectile: document.querySelector('.projectile'),
  jumpers: document.querySelector('.jumper'),
  angleLine: document.querySelector('.angle')
};

},{}],2:[function(require,module,exports){
var jumpers = require('physics-jumpy').default;

var domElements = require('./dom-elements');
var formControls = require('./form-controls');
var introScreen = require('./intro-screen');

jumpers.init(40, 'icon-soccer-ball');
introScreen.init(domElements, jumpers.stop);

formControls.init(domElements);

},{"./dom-elements":1,"./form-controls":3,"./intro-screen":4,"physics-jumpy":5}],3:[function(require,module,exports){
var Projectile = require('physics-projectile').default;

var formControls = (function() {
  var inputs,
    input,
    form,
    runningAnimation,
    container,
    projectile,
    angleLine,
    angleLineInitXPos,
    angleLineInitYPos;

  var maxInitPos = function() {
    var projectileWidth = projectile.clientWidth;
    var projectileHeight = projectile.clientHeight;

    initXPos.max = container.clientWidth - projectileWidth;
    initYPos.max = container.clientHeight - projectileHeight;
  };

  var formValueDisplays = function() {
    var initXPos = document.getElementById('initXPos');
    var initYPos = document.getElementById('initYPos');
    var theta = document.getElementById('theta');

    maxInitPos();

    window.addEventListener('resize', maxInitPos);

    for (var i = 0; i < inputs.length; i++) {
      input = inputs[i];

      // init values
      input.parentNode.querySelector('span').textContent = input.value;

      input.addEventListener('input', function(e) {
        this.parentNode.querySelector('span').textContent = this.value;

        if (
          (!runningAnimation || !runningAnimation.projectileAnimation) &&
          (this.id === 'initXPos' ||
            this.id === 'initYPos' ||
            this.id === 'theta')
        ) {
          projectile.style.left = initXPos.value + 'px';
          projectile.style.bottom = initYPos.value + 'px';

          angleLine.style.left =
            Number(angleLineInitXPos) + Number(initXPos.value) + 'px';
          angleLine.style.bottom =
            Number(angleLineInitYPos) + Number(initYPos.value) + 'px';
          angleLine.style.webkitTransform = 'rotate(-' + theta.value + 'deg)';
          angleLine.style.transform = 'rotate(-' + theta.value + 'deg)';
        }
      });
    }
  };

  var startAnimation = function() {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var initV = document.getElementById('initV').value;
      var g = document.getElementById('ga').value;
      var fc = document.getElementById('fc').value;
      var theta = document.getElementById('theta').value;
      var initXPos = document.getElementById('initXPos').value;
      var initYPos = document.getElementById('initYPos').value;

      if (runningAnimation) {
        runningAnimation.stopAnimation();
      }

      runningAnimation = new Projectile({
        selector: projectile,
        initV: +initV,
        g: +g,
        frictionCo: +fc,
        degrees: +theta,
        initXPos: +initXPos,
        initYPos: +initYPos
      });

      runningAnimation.startAnimation();
    });
  };

  var init = function(options) {
    form = options.form;
    projectile = options.projectile;
    container = options.simulationContainer;
    angleLine = options.angleLine;
    inputs = form.querySelectorAll('input[type=range]');

    angleLineInitXPos = projectile.offsetWidth / 2;
    angleLineInitYPos = projectile.offsetHeight / 2;

    formValueDisplays();
    startAnimation();
  };

  return {
    init: init
  };
})();

module.exports = formControls;

},{"physics-projectile":7}],4:[function(require,module,exports){
module.exports = (function() {
  var mainTitle, form, projectile, angleLine, onTitleClick;

  var handleTitleClick = function() {
    mainTitle.addEventListener('click', function(e) {
      this.classList.add('fade-out');

      form.classList.add('fade-in');
      projectile.classList.add('fade-in');
      angleLine.classList.add('fade-in');

      onTitleClick();
    });
  };

  var init = function(options, onClick) {
    mainTitle = options.title;
    form = options.form;
    projectile = options.projectile;
    angleLine = options.angleLine;

    onTitleClick = onClick;
    handleTitleClick();
  };

  return {
    init: init
  };
})();

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _physicsProjectile = _interopRequireDefault(require("physics-projectile"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function () {
  let numJumpers, jumpyClass;
  let isRunning = false;
  const winWidth = window.outerWidth;
  const frag = document.createDocumentFragment();

  const initJumpers = function () {
    for (let i = 0; i < numJumpers; ++i) {
      const jumper = document.createElement('i');
      jumper.classList.add('jumper', `jumper-${i}`, jumpyClass);
      jumper.style.zIndex = (0, _utils.getRandomNum)(0, 10);
      frag.appendChild(jumper);
    }

    document.body.appendChild(frag);
  };

  const jumpEm = function () {
    for (let i = 0; i < numJumpers; ++i) {
      (function (i) {
        let initDelay = (0, _utils.getRandomNum)(0, 5000);
        let initV = (0, _utils.getRandomNum)(250, 750);
        let g = (0, _utils.getRandomNum)(-1000, 0);
        let degrees = (0, _utils.getRandomNum)(70, 90);
        let initXPos = (0, _utils.getRandomNum)(0, winWidth);
        setTimeout(function Jump() {
          let runningAnimation = new _physicsProjectile.default({
            selector: document.querySelector(`.jumper-${i}`),
            initV: initV,
            g: g,
            frictionCo: 0.5,
            degrees: degrees,
            initXPos: initXPos,
            initYPos: -50
          });
          runningAnimation.startAnimation();
          const checkifStopped = setInterval(function () {
            if (isRunning && !runningAnimation.projectileAnimation) {
              clearInterval(checkifStopped);
              Jump();
            }

            if (!isRunning) {
              clearInterval(checkifStopped);
            }
          }, 1000);
        }, initDelay);
      })(i);
    }
  };

  const init = function (jumperCount = 20, className = 'jumpy-class') {
    numJumpers = jumperCount;
    jumpyClass = className;
    isRunning = true;
    initJumpers();
    jumpEm();
    return true;
  };

  const stop = function () {
    isRunning = false;
    return true;
  };

  return {
    init,
    stop,
    start: jumpEm
  };
}();

exports.default = _default;
},{"./utils":6,"physics-projectile":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomNum = void 0;

const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

exports.getRandomNum = getRandomNum;
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Projectile {
  constructor({
    selector,
    initV = 250,
    g = -10,
    frictionCo = 0.5,
    degrees = 90,
    initXPos = 0,
    initYPos = -50
  }) {
    if (!selector) {
      throw new Error('must supply a selector');
    }

    this.projectile = selector;
    this.initV = initV;
    this.g = g;
    this.frictionCo = frictionCo;
    this.frictionalA = this.getFrictionalA();
    this.theta = this.degreesToRadians(degrees);
    this.initXPos = initXPos;
    this.initYPos = initYPos;
    this.initVx = this.getInitVx();
    this.initVy = this.getInitVy();
    this.animationStartTime = 0;
    this.frictionStartTime = 0;
  }

  getFrictionalA() {
    return this.frictionCo * this.g;
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  getInitVx() {
    return this.initV * Math.cos(this.theta);
  }

  getInitVy() {
    return this.initV * Math.sin(this.theta);
  }

  projectileFrame(t) {
    this.animationStartTime = this.animationStartTime || t;
    t = t - this.animationStartTime; // seconds

    t = t / 1000;
    let frictionTime = 0;
    let yPos = this.initYPos + this.initVy * t + 1 / 2 * this.g * Math.pow(t, 2);
    yPos = Math.max(0, yPos);

    if (this.projectileAnimation > 1 && yPos === 0) {
      this.frictionStartTime = this.frictionStartTime || t;
      frictionTime = t - this.frictionStartTime;
    }

    let prevXPos = +this.projectile.style.left.slice(0, -2);
    let xPos = this.initXPos + this.initVx * t + 1 / 2 * this.frictionalA * Math.pow(frictionTime, 2);
    xPos = Math.max(prevXPos, xPos);
    this.projectile.style.left = xPos + 'px';
    this.projectile.style.bottom = yPos + 'px';

    if (t === 0 || xPos !== prevXPos) {
      this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
      return null;
    }

    this.stopAnimation();
  }

  startAnimation() {
    this.projectile.style.left = this.initXPos + 'px';
    this.projectile.style.bottom = this.initYPos + 'px';
    this.projectileAnimation = requestAnimationFrame(this.projectileFrame.bind(this));
    return true;
  }

  stopAnimation() {
    cancelAnimationFrame(this.projectileAnimation);
    this.projectileAnimation = undefined;
    return true;
  }

}

var _default = Projectile;
exports.default = _default;
},{}]},{},[2])