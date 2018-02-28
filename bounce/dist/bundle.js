/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__browser_window_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pointer_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scene_js__ = __webpack_require__(5);





const browserWindow = Object(__WEBPACK_IMPORTED_MODULE_1__browser_window_js__["a" /* default */])();
const scene = Object(__WEBPACK_IMPORTED_MODULE_3__scene_js__["a" /* default */])();
scene.spawn('board', __WEBPACK_IMPORTED_MODULE_0__board_js__["a" /* default */]);
scene.spawn('pointer', __WEBPACK_IMPORTED_MODULE_2__pointer_js__["a" /* default */]);

const loop = (timestamp) => {
  scene.update(timestamp - lastRender, browserWindow.normalizedHeight());
  scene.draw(browserWindow.scale());

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Board = () => {
  let element = document.body;

  // initialize ----------------------------------------------------------------

  element.style.backgroundColor = 'lightblue';

  // public --------------------------------------------------------------------

  const update = () => {};

  const draw = () => {};

  return { update, draw };
};

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BrowserWindow = () => {
  let html = document.documentElement;

  const scale = () => {
    return html.scrollWidth / 1000;
  }

  const normalizedHeight = () => {
    return 1000 * (html.clientHeight / html.clientWidth);
  };

  return { scale, normalizedHeight };
};

/* harmony default export */ __webpack_exports__["a"] = (BrowserWindow);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_helper_js__ = __webpack_require__(4);


const Pointer = (key) => {
  const RADIUS = 100;
  const SPEED = 200;

  const element = document.createElement('div');

  let rotation = 0;
  let positionX = RADIUS;
  let positionY = RADIUS;
  let heading = Math.PI / 4; // 45°

  // initialize ----------------------------------------------------------------

  element.innerHTML = '&uarr;';
  element.style.backgroundColor = 'darkblue';
  element.style.borderRadius = '50%';
  element.style.color = 'white';
  element.style.fontFamily = 'Helvetica Neue';
  element.style.left = '0';
  element.style.position = 'absolute';
  element.style.textAlign = 'center';
  element.style.top = '0';
  document.body.appendChild(element);

  // public --------------------------------------------------------------------

  const update = (step, height) => {
    catchResize(height);
    rotate(step);
    translate(step, height);
  };

  const draw = (scale) => {
    const drawSize = RADIUS * 2 * scale;
    const drawX = (positionX - RADIUS) * scale;
    const drawY = document.documentElement.clientHeight - ((positionY + RADIUS) * scale);

    element.style.height = `${drawSize}px`;
    element.style.width =`${drawSize}px`;
    element.style.lineHeight = `${drawSize}px`;
    element.style.fontSize = `${drawSize * 0.8}px`;
    element.style.transform = `translateX(${drawX}px) translateY(${drawY}px) rotateZ(${rotation}deg)`;
  };

  const die = () => {
    element.parentNode.removeChild(element);
  };

  // private -------------------------------------------------------------------

  const _key = () => {
    return key;
  };

  const catchResize = (height) => {
    if (positionY > height - RADIUS) positionY = height - RADIUS;
  }

  const rotate = (step) => {
    const angle = step / (1000 / SPEED);

    rotation += angle;
    if (rotation >= 360) rotation -= 360;
  };

  const translate = (step, height) => {
    const distance = step / (1000 / SPEED);

    const projectedPositionX = calculatePositionX(distance);
    const projectedPositionY = calculatePositionY(distance);
    const newHeading = bounce(projectedPositionX, projectedPositionY, height);

    if (newHeading === heading) {
      positionX = projectedPositionX;
      positionY = projectedPositionY;
    } else {
      heading = newHeading;
      positionX = calculatePositionX(distance);
      positionY = calculatePositionY(distance);
    }
  };

  const calculatePositionX = (distance) => {
    return positionX + Math.cos(heading) * distance;
  };

  const calculatePositionY = (distance) => {
    return positionY + Math.sin(heading) * distance;
  };

  const bounce = (posX, posY, height) => {
    let newHeading = heading;

    if (posX < RADIUS || posX > (1000 - RADIUS))
      newHeading = __WEBPACK_IMPORTED_MODULE_0__math_helper_js__["a" /* default */].rad540 - newHeading;

    if (posY < RADIUS || posY > (height - RADIUS))
      newHeading = __WEBPACK_IMPORTED_MODULE_0__math_helper_js__["a" /* default */].rad360 - newHeading;

    return newHeading;
  };

  return { update, draw, die };
}

/* harmony default export */ __webpack_exports__["a"] = (Pointer);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const rad360 = 2 * Math.PI;
const rad540 = 3 * Math.PI;

/* harmony default export */ __webpack_exports__["a"] = ({ rad360, rad540 });


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Scene = () => {
  let items = new Map();

  const spawn = (key, construct) => {
    items.set(key, construct(key));
  };

  const kill = (key) => {
    item = item.get(key);
    if (item && item.die) item.die();
    items.delete(key);
  };

  const update = (step, height) => {
    items.forEach(item => item.update(step, height));
  };

  const draw = (scale) => {
    items.forEach(item => item.draw(scale));
  }

  return { spawn, kill, update, draw };
};

/* harmony default export */ __webpack_exports__["a"] = (Scene);


/***/ })
/******/ ]);