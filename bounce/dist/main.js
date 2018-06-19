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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/geometry/point2d.js":
/*!*********************************!*\
  !*** ./src/geometry/point2d.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Point2D {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  add(other) {\n    return new Point2D(this.x + other.x, this.y + other.y);\n  }\n\n  substract(other) {\n    return new Point2D(this.x - other.x, this.y - other.y);\n  }\n\n  multiply(scalar) {\n    return new Point2D(this.x * scalar, this.y * scalar);\n  }\n\n  divide(scalar) {\n    return new Point2D(this.x / scalar, this.y / scalar);\n  }\n\n  mirrorVertical() {\n    return new Point2D(this.x, -this.y);\n  }\n\n  mirrorHorizontal() {\n    return new Point2D(-this.x, this.y);\n  }\n\n  negate() {\n    return new Point2D(-this.x, -this.y);\n  }\n\n  length() {\n    return Math.sqrt(this.x * this.x + this.y * this.y);\n  }\n\n  normalize() {\n    return this.divide(this.length());\n  }\n\n  dot(other) {\n    return this.x * other.x + this.y * other.y;\n  }\n}\n\nexports.default = Point2D;\n\n//# sourceURL=webpack:///./src/geometry/point2d.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _world = __webpack_require__(/*! ./world */ \"./src/world/index.js\");\n\nvar _world2 = _interopRequireDefault(_world);\n\nvar _ball = __webpack_require__(/*! ./world/ball */ \"./src/world/ball.js\");\n\nvar _ball2 = _interopRequireDefault(_ball);\n\nvar _board = __webpack_require__(/*! ./world/board */ \"./src/world/board.js\");\n\nvar _board2 = _interopRequireDefault(_board);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst world = new _world2.default();\nworld.spawn('board', _board2.default);\nworld.spawn('blue-ball', _ball2.default, {\n  size: 100,\n  position: [100, 100],\n  heading: [1, 1],\n  view: { backgroundColor: 'darkblue' }\n});\nworld.spawn('red-ball', _ball2.default, {\n  size: 100,\n  position: [900, 100],\n  heading: [-1, 2],\n  view: { backgroundColor: 'red' }\n});\n\nconst loop = timestamp => {\n  world.update(timestamp - lastRender);\n\n  lastRender = timestamp;\n  window.requestAnimationFrame(loop);\n};\n\nlet lastRender = 0;\nwindow.requestAnimationFrame(loop);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/physics/index.js":
/*!******************************!*\
  !*** ./src/physics/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Physics {\n  reflect(collisions) {\n    for (let collision of collisions) {\n      const item1 = collision[0];\n      const item2 = collision[1];\n      const contactNormal1 = item1.position.normalize(item1.position.substract(item2.position));\n      const contactNormal2 = contactNormal1.negate();\n\n      item1.heading = item1.heading.substract(contactNormal1.multiply(2).multiply(contactNormal1.dot(item1.heading)));\n      item2.heading = item2.heading.substract(contactNormal2.multiply(2).multiply(contactNormal2.dot(item2.heading)));\n    }\n  }\n\n  // private\n\n  doCollide(p1, s1, p2, s2) {\n    return (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y) <= (s1 + s2) * (s1 + s2);\n  }\n}\n\nexports.default = Physics;\n\n//# sourceURL=webpack:///./src/physics/index.js?");

/***/ }),

/***/ "./src/view/background.js":
/*!********************************!*\
  !*** ./src/view/background.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Background {\n  constructor({ backgroundColor }) {\n    this.element = document.body;\n    this.element.style.backgroundColor = backgroundColor;\n  }\n\n  draw() {}\n}\n\nexports.default = Background;\n\n//# sourceURL=webpack:///./src/view/background.js?");

/***/ }),

/***/ "./src/view/index.js":
/*!***************************!*\
  !*** ./src/view/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass View {\n  draw(items, scale, viewportHeight) {\n    for (let item of items) item.draw(scale, viewportHeight);\n  }\n}\n\nexports.default = View;\n\n//# sourceURL=webpack:///./src/view/index.js?");

/***/ }),

/***/ "./src/view/sprite.js":
/*!****************************!*\
  !*** ./src/view/sprite.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Sprite {\n  constructor({ backgroundColor, borderRadius }) {\n    this.element = document.createElement('div');\n\n    this.element.style.backgroundColor = backgroundColor;\n    this.element.style.borderRadius = borderRadius;\n\n    this.element.style.position = 'absolute';\n    this.element.style.top = '0';\n    this.element.style.left = '0';\n\n    document.body.appendChild(this.element);\n  }\n\n  draw(position, rotation, radius, scale, viewportHeight) {\n    const drawSize = radius * 2 * scale;\n    const drawX = (position.x - radius) * scale;\n    const drawY = viewportHeight - (position.y + radius) * scale;\n\n    this.updateElement(drawSize, drawX, drawY);\n  }\n\n  updateElement(drawSize, drawX, drawY) {\n    this.element.style.height = `${drawSize}px`;\n    this.element.style.width = `${drawSize}px`;\n    this.element.style.transform = `translate(${drawX}px, ${drawY}px) rotate(0deg)`;\n  }\n}\n\nexports.default = Sprite;\n\n//# sourceURL=webpack:///./src/view/sprite.js?");

/***/ }),

/***/ "./src/world/ball.js":
/*!***************************!*\
  !*** ./src/world/ball.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _point2d = __webpack_require__(/*! ../geometry/point2d */ \"./src/geometry/point2d.js\");\n\nvar _point2d2 = _interopRequireDefault(_point2d);\n\nvar _sprite = __webpack_require__(/*! ../view/sprite */ \"./src/view/sprite.js\");\n\nvar _sprite2 = _interopRequireDefault(_sprite);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Ball {\n  constructor({\n    size = 100,\n    position = [Ball.RADIUS, Ball.RADIUS],\n    heading = [1, 1],\n    view\n  }) {\n    this.size = size;\n    this.position = new _point2d2.default(position[0], position[1]);\n    this.heading = new _point2d2.default(heading[0], heading[1]);\n\n    this.view = new _sprite2.default(Object.assign({\n      backgroundColor: 'red',\n      borderRadius: '50%'\n    }, view));\n\n    this.colliding = false;\n  }\n\n  update(step, height) {\n    this.catchResize(height);\n    this.translate(step);\n    this.bounceOfWalls(height);\n  }\n\n  draw(scale, viewportHeight) {\n    this.view.draw(this.position, this.heading, this.size, scale, viewportHeight);\n  }\n\n  // private\n\n  catchResize(height) {\n    if (this.position.y > height - this.size) this.position.y = height - this.size;\n  }\n\n  translate(step) {\n    this.position = this.position.add(this.heading.multiply(step / 10));\n  }\n\n  bounceOfWalls(height) {\n    if (this.position.x < this.size || this.position.x > 1000 - this.size) this.heading = this.heading.mirrorHorizontal();\n\n    if (this.position.y < this.size || this.position.y > height - this.size) this.heading = this.heading.mirrorVertical();\n  }\n}\n\nexports.default = Ball;\n\n//# sourceURL=webpack:///./src/world/ball.js?");

/***/ }),

/***/ "./src/world/board.js":
/*!****************************!*\
  !*** ./src/world/board.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _background = __webpack_require__(/*! ../view/background */ \"./src/view/background.js\");\n\nvar _background2 = _interopRequireDefault(_background);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Board {\n  constructor() {\n    this.view = new _background2.default({ backgroundColor: 'lightblue' });\n  }\n\n  update() {}\n  draw() {}\n}\n\nexports.default = Board;\n\n//# sourceURL=webpack:///./src/world/board.js?");

/***/ }),

/***/ "./src/world/browser-window.js":
/*!*************************************!*\
  !*** ./src/world/browser-window.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass BrowserWindow {\n  constructor() {\n    this.html = document.documentElement;\n  }\n\n  scale() {\n    return this.html.scrollWidth / 1000;\n  }\n\n  normalizedHeight() {\n    return 1000 * (this.viewportHeight() / this.viewportWidth());\n  }\n\n  viewportWidth() {\n    return this.html.clientWidth;\n  }\n\n  viewportHeight() {\n    return this.html.clientHeight;\n  }\n}\n\nexports.default = BrowserWindow;\n\n//# sourceURL=webpack:///./src/world/browser-window.js?");

/***/ }),

/***/ "./src/world/index.js":
/*!****************************!*\
  !*** ./src/world/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _browserWindow = __webpack_require__(/*! ./browser-window */ \"./src/world/browser-window.js\");\n\nvar _browserWindow2 = _interopRequireDefault(_browserWindow);\n\nvar _physics = __webpack_require__(/*! ../physics */ \"./src/physics/index.js\");\n\nvar _physics2 = _interopRequireDefault(_physics);\n\nvar _view = __webpack_require__(/*! ../view */ \"./src/view/index.js\");\n\nvar _view2 = _interopRequireDefault(_view);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass World {\n  constructor() {\n    this.items = new Map();\n\n    this.physics = new _physics2.default();\n    this.browserWindow = new _browserWindow2.default();\n    this.view = new _view2.default();\n  }\n\n  spawn(key, klass, options = {}) {\n    this.items.set(key, new klass(options));\n  }\n\n  update(step) {\n    this.items.forEach(item => item.update(step, this.browserWindow.normalizedHeight()));\n\n    // REFACTOR to Physics\n    // ---- >8 ----\n    const collisions = [];\n    const blue = this.items.get('blue-ball');\n    const red = this.items.get('red-ball');\n    if (this.physics.doCollide(blue.position, blue.size, red.position, red.size)) {\n      if (!blue.colliding && !red.colliding) {\n        blue.colliding = true;\n        red.colliding = true;\n        collisions.push([blue, red]);\n      }\n    } else {\n      blue.colliding = false;\n      red.colliding = false;\n    }\n    // ---- 8< ----\n\n    this.physics.reflect(collisions);\n\n    this.view.draw(this.items.values(), this.browserWindow.scale(), this.browserWindow.viewportHeight());\n  }\n}\n\nexports.default = World;\n\n//# sourceURL=webpack:///./src/world/index.js?");

/***/ })

/******/ });