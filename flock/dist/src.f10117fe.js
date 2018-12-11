// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/engine/browser-window.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var BrowserWindow =
/** @class */
function () {
  function BrowserWindow() {
    this._htmlDocument = document.documentElement;
    this.update();
  }

  Object.defineProperty(BrowserWindow.prototype, "viewportWidth", {
    get: function get() {
      return this._viewportWidth;
    },
    enumerable: true,
    configurable: true
  });
  ;
  Object.defineProperty(BrowserWindow.prototype, "viewportHeight", {
    get: function get() {
      return this._viewportHeight;
    },
    enumerable: true,
    configurable: true
  });
  ;
  Object.defineProperty(BrowserWindow.prototype, "viewportRatio", {
    get: function get() {
      return this._viewportRatio;
    },
    enumerable: true,
    configurable: true
  });
  ;

  BrowserWindow.prototype.update = function () {
    this._viewportWidth = this._htmlDocument.clientWidth;
    this._viewportHeight = this._htmlDocument.clientHeight;
    this._viewportRatio = this._viewportHeight / this.viewportWidth;
  };

  return BrowserWindow;
}();

exports["default"] = BrowserWindow;
},{}],"src/engine/world.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var World =
/** @class */
function () {
  function World() {
    this.items = new Map();
    this.items.set(World.ALL_ITEMS, []);
  }

  World.prototype.addItem = function (item, tags) {
    this.items.get(World.ALL_ITEMS).push(item);

    for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
      var tag = tags_1[_i];
      var tagList = this.items.get(tag);

      if (tagList) {
        tagList.push(item);
      } else {
        this.items.set(tag, [item]);
      }
    }
  };

  World.prototype.getItems = function (tag) {
    if (tag === void 0) {
      tag = World.ALL_ITEMS;
    }

    return this.items.get(tag);
  };

  World.ALL_ITEMS = '__all__';
  return World;
}();

exports["default"] = World;
},{}],"src/engine/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var browser_window_1 = __importDefault(require("./browser-window"));

var world_1 = __importDefault(require("./world"));

var Engine =
/** @class */
function () {
  function Engine() {
    this.browserWindow = new browser_window_1["default"]();
    this.world = new world_1["default"]();
  }

  Engine.prototype.spawn = function (item, tags) {
    if (tags === void 0) {
      tags = [];
    }

    item.world = this.world;
    this.world.addItem(item, tags);
    return this;
  };

  Engine.prototype.start = function () {
    var _this = this;

    var loop = function loop(timestamp) {
      _this.browserWindow.update();

      _this.update(timestamp - lastRender).render();

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    };

    var lastRender = 0;
    window.requestAnimationFrame(loop);
  }; // private --------


  Engine.prototype.update = function (step) {
    for (var _i = 0, _a = this.world.getItems(); _i < _a.length; _i++) {
      var item = _a[_i];
      item.update(step, this.browserWindow.viewportRatio);
    }

    return this;
  };

  ;

  Engine.prototype.render = function () {
    for (var _i = 0, _a = this.world.getItems(); _i < _a.length; _i++) {
      var item = _a[_i];
      item.render(this.browserWindow);
    }

    ;
    return this;
  };

  return Engine;
}();

exports["default"] = Engine;
},{"./browser-window":"src/engine/browser-window.ts","./world":"src/engine/world.ts"}],"src/engine/geometry/point2d.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Point2D =
/** @class */
function () {
  function Point2D(x, y) {
    this.x = x;
    this.y = y;
  }

  Point2D.center = function (points) {
    if (points.length === 1) {
      return points[0];
    } else {
      return points.reduce(function (centerPoint, point) {
        return centerPoint.add(point);
      }).divide(points.length);
    }
  };

  Point2D.prototype.clone = function () {
    return new Point2D(this.x, this.y);
  };

  Point2D.prototype.add = function (other) {
    return new Point2D(this.x + other.x, this.y + other.y);
  };

  Point2D.prototype.substract = function (other) {
    return new Point2D(this.x - other.x, this.y - other.y);
  };

  Point2D.prototype.multiply = function (scalar) {
    return new Point2D(this.x * scalar, this.y * scalar);
  };

  Point2D.prototype.divide = function (scalar) {
    return new Point2D(this.x / scalar, this.y / scalar);
  };

  Point2D.prototype.mirrorHorizontal = function () {
    return new Point2D(this.x, -this.y);
  };

  Point2D.prototype.mirrorVertical = function () {
    return new Point2D(-this.x, this.y);
  };

  Point2D.prototype.negate = function () {
    return new Point2D(-this.x, -this.y);
  };

  Point2D.prototype.rotateDeg = function (angle) {
    return this.rotateRad(angle * Math.PI / 180);
  };

  Point2D.prototype.rotateRad = function (angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    return new Point2D(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
  };

  Point2D.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Point2D.prototype.normalize = function () {
    return this.divide(this.length());
  };

  Point2D.prototype.dot = function (other) {
    return this.x * other.x + this.y * other.y;
  };

  Point2D.prototype.orientationDeg = function () {
    return (this.y < 0 ? 180 : 0) - this.angleRad() * 180 / Math.PI;
  };

  Point2D.prototype.orientationRad = function () {
    return (this.y < 0 ? Math.PI : 0) - this.angleRad();
  };

  Point2D.prototype.quadDistance = function (other) {
    return Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2);
  };

  Point2D.prototype.distance = function (other) {
    return Math.sqrt(this.quadDistance(other));
  }; // private --------


  Point2D.prototype.angleRad = function () {
    return Math.atan(this.x / this.y);
  };

  return Point2D;
}();

exports["default"] = Point2D;
},{}],"src/engine/physics/peg.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var point2d_1 = __importDefault(require("../geometry/point2d"));

var Peg =
/** @class */
function () {
  function Peg(position, heading) {
    if (position === void 0) {
      position = new point2d_1["default"](0, 0);
    }

    if (heading === void 0) {
      heading = new point2d_1["default"](0, 0);
    }

    this.position = position;
    this.heading = heading;
  }

  Peg.prototype.executeMovement = function (step) {
    this.position = this.position.add(new point2d_1["default"](step * this.heading.x, step * this.heading.y));
    return this;
  };

  Peg.prototype.bounceOfWalls = function (boardRatio) {
    if (this.position.x < 0 && this.heading.x < 0 || this.position.x > 1 && this.heading.x > 0) {
      this.heading = this.heading.mirrorVertical();
    }

    if (this.position.y < 0 && this.heading.y < 0 || this.position.y > boardRatio && this.heading.y > 0) {
      this.heading = this.heading.mirrorHorizontal();
    }

    return this;
  };

  return Peg;
}();

exports["default"] = Peg;
},{"../geometry/point2d":"src/engine/geometry/point2d.ts"}],"src/engine/view/sprite.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var Sprite =
/** @class */
function () {
  function Sprite(parentElement, cssClass, dimensions) {
    this.dimensions = dimensions;
    this.htmlElement = document.createElement('div');
    this.htmlElement.className = cssClass;
    this.htmlElement.style.position = 'absolute';
    this.htmlElement.style.top = '0';
    this.htmlElement.style.left = '0';
    parentElement.appendChild(this.htmlElement);
  }

  Sprite.prototype.render = function (browserWindow, position, heading) {
    if (heading === void 0) {
      heading = null;
    }

    var screenX = (position.x - this.dimensions.x / 2) * browserWindow.viewportWidth;
    var screenY = browserWindow.viewportHeight - (position.y + this.dimensions.y / 2) * browserWindow.viewportWidth;
    var rotation = heading ? -heading.orientationDeg() : 0;
    var scale = this.dimensions.x * browserWindow.viewportWidth / this.htmlElement.clientWidth;
    this.htmlElement.style.transform = "translate(" + screenX + "px, " + screenY + "px)\n       rotate(" + rotation + "deg)\n       scale(" + scale + ", " + scale + ")";
  };

  return Sprite;
}();

exports["default"] = Sprite;
},{}],"src/flock/bird.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var point2d_1 = __importDefault(require("../engine/geometry/point2d"));

var peg_1 = __importDefault(require("../engine/physics/peg"));

var sprite_1 = __importDefault(require("../engine/view/sprite"));

var Bird =
/** @class */
function () {
  function Bird(turnRate) {
    this.turnRate = turnRate;
    this.peg = new peg_1["default"](new point2d_1["default"](0, 0), new point2d_1["default"](0.0002, 0.0002));
    this.sprite = new sprite_1["default"](document.documentElement, 'bird', new point2d_1["default"](0.05, 0.05));
  }

  Bird.prototype.update = function (step, boardRatio) {
    this.peg.heading = this.peg.heading.rotateDeg(this.turnRate);
    this.peg.executeMovement(step).bounceOfWalls(boardRatio);
  };

  Bird.prototype.render = function (browserWindow) {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  };

  return Bird;
}();

exports["default"] = Bird;
},{"../engine/geometry/point2d":"src/engine/geometry/point2d.ts","../engine/physics/peg":"src/engine/physics/peg.ts","../engine/view/sprite":"src/engine/view/sprite.ts"}],"src/flock/hunter.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var point2d_1 = __importDefault(require("../engine/geometry/point2d"));

var peg_1 = __importDefault(require("../engine/physics/peg"));

var sprite_1 = __importDefault(require("../engine/view/sprite"));

var Hunter =
/** @class */
function () {
  function Hunter() {
    this.peg = new peg_1["default"](new point2d_1["default"](0, 0.5), new point2d_1["default"](0.0001, 0.0002));
    this.sprite = new sprite_1["default"](document.documentElement, 'hunter', new point2d_1["default"](0.1, 0.1));
  }

  Hunter.prototype.update = function (step, boardRatio) {
    // follow the nearest bird --------
    var birds = this.world.getItems('bird');
    var nearestDistance = 9999;
    var nearestBird = null;

    for (var _i = 0, birds_1 = birds; _i < birds_1.length; _i++) {
      var bird = birds_1[_i];
      var distance = this.peg.position.quadDistance(bird.peg.position);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestBird = bird;
      }
    }

    var directionToBird = nearestBird.peg.position.substract(this.peg.position);
    var directionOrientation = directionToBird.orientationDeg();
    var hunterOrientation = this.peg.heading.orientationDeg();
    var orientationDiff = directionOrientation - hunterOrientation;

    if (orientationDiff > 15) {
      this.peg.heading = this.peg.heading.rotateDeg(15);
    } else if (orientationDiff < -15) {
      this.peg.heading = this.peg.heading.rotateDeg(-15);
    } else {
      this.peg.heading = this.peg.heading.rotateDeg(orientationDiff);
    } // --------


    this.peg.executeMovement(step).bounceOfWalls(boardRatio);
  };

  Hunter.prototype.render = function (browserWindow) {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  };

  return Hunter;
}();

exports["default"] = Hunter;
},{"../engine/geometry/point2d":"src/engine/geometry/point2d.ts","../engine/physics/peg":"src/engine/physics/peg.ts","../engine/view/sprite":"src/engine/view/sprite.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var engine_1 = __importDefault(require("./engine"));

var bird_1 = __importDefault(require("./flock/bird"));

var hunter_1 = __importDefault(require("./flock/hunter"));

var engine = new engine_1["default"]();
engine.spawn(new bird_1["default"](0.75), ['bird']).spawn(new bird_1["default"](-0.5), ['bird']).spawn(new bird_1["default"](0.25), ['bird']).spawn(new hunter_1["default"]()).start();
},{"./engine":"src/engine/index.ts","./flock/bird":"src/flock/bird.ts","./flock/hunter":"src/flock/hunter.ts"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51626" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.map