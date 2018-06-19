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

/***/ "./src/geometry/position.js":
/*!**********************************!*\
  !*** ./src/geometry/position.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Position {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\n\nexports.default = Position;\n\n//# sourceURL=webpack:///./src/geometry/position.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _position = __webpack_require__(/*! ./geometry/position */ \"./src/geometry/position.js\");\n\nvar _position2 = _interopRequireDefault(_position);\n\nvar _world = __webpack_require__(/*! ./world */ \"./src/world/index.js\");\n\nvar _world2 = _interopRequireDefault(_world);\n\nvar _ball = __webpack_require__(/*! ./world/ball */ \"./src/world/ball.js\");\n\nvar _ball2 = _interopRequireDefault(_ball);\n\nvar _board = __webpack_require__(/*! ./world/board */ \"./src/world/board.js\");\n\nvar _board2 = _interopRequireDefault(_board);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconst world = new _world2.default();\nworld.spawn('board', _board2.default);\nworld.spawn('ball1', _ball2.default, new _position2.default(_ball2.default.RADIUS, _ball2.default.RADIUS));\n\nconst loop = timestamp => {\n  world.update(timestamp - lastRender);\n\n  lastRender = timestamp;\n  window.requestAnimationFrame(loop);\n};\n\nlet lastRender = 0;\nwindow.requestAnimationFrame(loop);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/math-helper.js":
/*!****************************!*\
  !*** ./src/math-helper.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconst rad360 = 2 * Math.PI;\nconst rad540 = 3 * Math.PI;\n\nexports.default = { rad360, rad540 };\n\n//# sourceURL=webpack:///./src/math-helper.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nclass Sprite {\n  constructor({ backgroundColor, borderRadius }) {\n    this.element = document.createElement('div');\n\n    this.element.style.backgroundColor = backgroundColor;\n    this.element.style.borderRadius = borderRadius;\n\n    this.element.style.position = 'absolute';\n    this.element.style.top = '0';\n    this.element.style.left = '0';\n\n    document.body.appendChild(this.element);\n  }\n\n  draw(position, rotation, radius, scale, viewportHeight) {\n    const drawSize = radius * 2 * scale;\n    const drawX = (position.x - radius) * scale;\n    const drawY = viewportHeight - (position.y + radius) * scale;\n\n    this.updateElement(drawSize, drawX, drawY, rotation);\n  }\n\n  updateElement(drawSize, drawX, drawY, rotation) {\n    this.element.style.height = `${drawSize}px`;\n    this.element.style.width = `${drawSize}px`;\n    this.element.style.transform = `translate(${drawX}px, ${drawY}px) rotate(${rotation}deg)`;\n  }\n}\n\nexports.default = Sprite;\n\n//# sourceURL=webpack:///./src/view/sprite.js?");

/***/ }),

/***/ "./src/view/text-sprite.js":
/*!*********************************!*\
  !*** ./src/view/text-sprite.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _sprite = __webpack_require__(/*! ./sprite */ \"./src/view/sprite.js\");\n\nvar _sprite2 = _interopRequireDefault(_sprite);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass TextSprite extends _sprite2.default {\n  constructor({ backgroundColor, borderRadius, textColor, fontFamily, text }) {\n    super({ backgroundColor, borderRadius });\n\n    this.element.style.textAlign = 'center';\n    this.element.style.color = textColor, this.element.style.fontFamily = fontFamily;\n    this.element.innerHTML = text;\n  }\n\n  updateElement(drawSize, drawX, drawY, rotation) {\n    super.updateElement(drawSize, drawX, drawY, rotation);\n\n    this.element.style.lineHeight = `${drawSize}px`;\n    this.element.style.fontSize = `${drawSize * 0.8}px`;\n  }\n}\n\nexports.default = TextSprite;\n\n//# sourceURL=webpack:///./src/view/text-sprite.js?");

/***/ }),

/***/ "./src/world/ball.js":
/*!***************************!*\
  !*** ./src/world/ball.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _mathHelper = __webpack_require__(/*! ../math-helper */ \"./src/math-helper.js\");\n\nvar _mathHelper2 = _interopRequireDefault(_mathHelper);\n\nvar _textSprite = __webpack_require__(/*! ../view/text-sprite */ \"./src/view/text-sprite.js\");\n\nvar _textSprite2 = _interopRequireDefault(_textSprite);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass Ball {\n\n  constructor(initialPosition) {\n    this.rotation = 0;\n    this.position = initialPosition;\n    this.heading = Math.PI / 4; // 45°\n\n    this.view = new _textSprite2.default({\n      backgroundColor: 'darkblue',\n      borderRadius: '50%',\n      textColor: 'white',\n      fontFamily: 'Helvetica Neue',\n      text: '&uarr;'\n    });\n  }\n\n  update(step, height) {\n    this.catchResize(height);\n    this.rotate(step);\n    this.translate(step, height);\n  }\n\n  draw(scale, viewportHeight) {\n    this.view.draw(this.position, this.rotation, Ball.RADIUS, scale, viewportHeight);\n  }\n\n  // private\n\n  catchResize(height) {\n    if (this.position.y > height - Ball.RADIUS) this.position.y = height - Ball.RADIUS;\n  }\n\n  rotate(step) {\n    const angle = step / (1000 / Ball.SPEED);\n\n    this.rotation += angle;\n    if (this.rotation >= 360) this.rotation -= 360;\n  }\n\n  translate(step, height) {\n    const distance = step / (1000 / Ball.SPEED);\n\n    const projectedPosX = this.calculatePosX(distance);\n    const projectedPosY = this.calculatePosY(distance);\n    const newHeading = this.bounceOfWalls(projectedPosX, projectedPosY, height);\n\n    if (newHeading === this.heading) {\n      this.position.x = projectedPosX;\n      this.position.y = projectedPosY;\n    } else {\n      this.heading = newHeading;\n      this.position.x = this.calculatePosX(distance);\n      this.position.y = this.calculatePosY(distance);\n    }\n  }\n\n  calculatePosX(distance) {\n    return this.position.x + Math.cos(this.heading) * distance;\n  }\n\n  calculatePosY(distance) {\n    return this.position.y + Math.sin(this.heading) * distance;\n  }\n\n  bounceOfWalls(posX, posY, height) {\n    let newHeading = this.heading;\n\n    if (posX < Ball.RADIUS || posX > 1000 - Ball.RADIUS) newHeading = _mathHelper2.default.rad540 - newHeading;\n\n    if (posY < Ball.RADIUS || posY > height - Ball.RADIUS) newHeading = _mathHelper2.default.rad360 - newHeading;\n\n    return newHeading;\n  }\n}\n\nBall.RADIUS = 100;\nBall.SPEED = 200;\nexports.default = Ball;\n\n//# sourceURL=webpack:///./src/world/ball.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _browserWindow = __webpack_require__(/*! ./browser-window */ \"./src/world/browser-window.js\");\n\nvar _browserWindow2 = _interopRequireDefault(_browserWindow);\n\nvar _view = __webpack_require__(/*! ../view */ \"./src/view/index.js\");\n\nvar _view2 = _interopRequireDefault(_view);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nclass World {\n  constructor() {\n    this.items = new Map();\n\n    this.browserWindow = new _browserWindow2.default();\n    this.view = new _view2.default();\n  }\n\n  spawn(key, klass, ...options) {\n    this.items.set(key, new klass(...options));\n  }\n\n  update(step) {\n    this.items.forEach(item => item.update(step, this.browserWindow.normalizedHeight()));\n\n    this.view.draw(this.items.values(), this.browserWindow.scale(), this.browserWindow.viewportHeight());\n  }\n}\n\nexports.default = World;\n\n//# sourceURL=webpack:///./src/world/index.js?");

/***/ })

/******/ });