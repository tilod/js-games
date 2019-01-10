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
    this._browserWindow = new browser_window_1["default"]();
    this._world = new world_1["default"]();
  }

  Engine.prototype.spawn = function (itemConstructor, tags) {
    if (tags === void 0) {
      tags = [];
    }

    this._world.addItem(new itemConstructor(this._world), tags);

    return this;
  };

  Engine.prototype.start = function () {
    var _this = this;

    var loop = function loop(timestamp) {
      _this._browserWindow.update();

      var step = timestamp - lastRender;

      _this.plan().move(step).render();

      lastRender = timestamp;
      window.requestAnimationFrame(loop);
    };

    var lastRender = 0;
    window.requestAnimationFrame(loop);
  };

  Engine.prototype.plan = function () {
    for (var _i = 0, _a = this._world.getItems(); _i < _a.length; _i++) {
      var item = _a[_i];
      item.plan();
    }

    return this;
  };

  ;

  Engine.prototype.move = function (step) {
    for (var _i = 0, _a = this._world.getItems(); _i < _a.length; _i++) {
      var item = _a[_i];
      item.move(step, this._browserWindow.viewportRatio);
    }

    return this;
  };

  ;

  Engine.prototype.render = function () {
    for (var _i = 0, _a = this._world.getItems(); _i < _a.length; _i++) {
      var item = _a[_i];
      item.render(this._browserWindow);
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

  Point2D.prototype.rotateDegMax = function (angle, maxTurnRate) {
    if (angle > maxTurnRate) return this.rotateDeg(maxTurnRate);
    if (angle < -maxTurnRate) return this.rotateDeg(-maxTurnRate);
    return this.rotateDeg(angle);
  };

  Point2D.prototype.rotateRad = function (angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    return new Point2D(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
  };

  Point2D.prototype.rotateRadMax = function (angle, maxTurnRate) {
    if (angle > maxTurnRate) return this.rotateRad(maxTurnRate);
    if (angle < -maxTurnRate) return this.rotateRad(-maxTurnRate);
    return this.rotateRad(angle);
  };

  Point2D.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Point2D.prototype.normalize = function (length) {
    if (length === void 0) {
      length = 1;
    }

    return this.divide(this.length() / length);
  };

  Point2D.prototype.dot = function (other) {
    return this.x * other.x + this.y * other.y;
  };

  Point2D.prototype.angleRad = function (other) {
    return Math.acos(this.dot(other) / (this.length() * other.length()));
  };

  Point2D.prototype.angleDeg = function (other) {
    return this.angleRad(other) * 180 / Math.PI;
  };

  Point2D.prototype.orientationDeg = function () {
    return (this.y < 0 ? 180 : 0) - Math.atan(this.x / this.y) * 180 / Math.PI;
  };

  Point2D.prototype.orientationRad = function () {
    return (this.y < 0 ? Math.PI : 0) - Math.atan(this.x / this.y);
  };

  Point2D.prototype.quadDistance = function (other) {
    return Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2);
  };

  Point2D.prototype.distance = function (other) {
    return Math.sqrt(this.quadDistance(other));
  };

  Point2D.prototype.interpolate = function (other, loading) {
    return this.multiply(1 - loading).add(other.multiply(loading));
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

  Peg.prototype.setupFrame = function (step, boardRatio) {
    this._step = step;
    this._boardRatio = boardRatio;
    return this;
  };

  Peg.prototype.turn = function (direction) {
    this.heading = direction.normalize(this.headingLength());
    return this;
  };

  Peg.prototype.turnWithMax = function (direction, maxTurnRate) {
    var angle = this.heading.angleDeg(direction);
    var maxTurnAngle = this.step * maxTurnRate / 1000;

    if (angle > maxTurnAngle) {
      return this.turn(this.heading.interpolate(direction.normalize(this.headingLength()), maxTurnAngle / angle));
    } else {
      return this.turn(direction);
    }
  };

  Peg.prototype.executeMovement = function () {
    this.position = this.position.add(new point2d_1["default"](this.step * this.heading.x, this.step * this.heading.y));
    return this;
  };

  Peg.prototype.bounceOfWalls = function () {
    if (this.position.x < 0 && this.heading.x < 0 || this.position.x > 1 && this.heading.x > 0) {
      this.heading = this.heading.mirrorVertical();
    }

    if (this.position.y < 0 && this.heading.y < 0 || this.position.y > this.boardRatio && this.heading.y > 0) {
      this.heading = this.heading.mirrorHorizontal();
    }

    return this;
  };

  Object.defineProperty(Peg.prototype, "step", {
    get: function get() {
      return this._step;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Peg.prototype, "boardRatio", {
    get: function get() {
      return this._boardRatio;
    },
    enumerable: true,
    configurable: true
  });

  Peg.prototype.headingLength = function () {
    return this._headingLength || (this._headingLength = this.heading.length());
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
},{}],"src/engine/ai/flock_ai.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var point2d_1 = __importDefault(require("../geometry/point2d"));

var FlockAI =
/** @class */
function () {
  function FlockAI(world, item, tag, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.cohesionDistance,
        cohesionDistance = _c === void 0 ? 0.2 : _c,
        _d = _b.cohesionWeight,
        cohesionWeight = _d === void 0 ? 1 : _d,
        _e = _b.alignmentDistance,
        alignmentDistance = _e === void 0 ? 0.1 : _e,
        _f = _b.alignmentWeight,
        alignmentWeight = _f === void 0 ? 2 : _f,
        _g = _b.separationDistance,
        separationDistance = _g === void 0 ? 0.01 : _g,
        _h = _b.separationWeight,
        separationWeight = _h === void 0 ? 4 : _h;

    this._world = world;
    this._item = item;
    this._tag = tag;
    this._quadCohesionDistance = cohesionDistance * cohesionDistance;
    this._cohesionWeight = cohesionWeight;
    this._quadAlignmentDistance = alignmentDistance * alignmentDistance;
    this._alignmentWeight = alignmentWeight, this._quadSeparationDistance = separationDistance * separationDistance;
    this._separationWeight = separationWeight;
  }

  FlockAI.prototype.direction = function () {
    var position = this._item.peg.position;
    var heading = this._item.peg.heading;
    var cohesionNeighborCount = 1;
    var cohesionPosition = position;
    var alignmentNeighborCount = 1;
    var alignmentHeading = heading;
    var separationNeighborCount = 0;
    var separationPosition = new point2d_1["default"](0, 0);

    for (var _i = 0, _a = this._world.getItems(this._tag); _i < _a.length; _i++) {
      var item = _a[_i];
      if (item === this._item) continue;
      var quadDistance = position.quadDistance(item.peg.position);
      if (quadDistance > this._quadCohesionDistance) continue;
      ++cohesionNeighborCount;
      cohesionPosition = cohesionPosition.add(item.peg.position);
      if (quadDistance > this._quadAlignmentDistance) continue;
      ++alignmentNeighborCount;
      alignmentHeading = alignmentHeading.add(item.peg.heading);
      if (quadDistance > this._quadSeparationDistance) continue;
      ++separationNeighborCount;
      separationPosition = separationPosition.add(item.peg.position.substract(position));
    }

    var cohesionDirection = cohesionNeighborCount > 1 ? cohesionPosition.divide(cohesionNeighborCount).substract(position).normalize(this._cohesionWeight) : heading.normalize(1);
    var alignmentDirection = alignmentNeighborCount > 2 ? alignmentHeading.divide(alignmentNeighborCount).normalize(this._alignmentWeight) : heading.normalize(1);
    var separationDirection = separationNeighborCount > 0 ? separationPosition.divide(separationNeighborCount).negate().normalize(this._separationWeight) : heading.normalize(1);
    return cohesionDirection.add(alignmentDirection).add(separationDirection);
  };

  return FlockAI;
}();

exports["default"] = FlockAI;
},{"../geometry/point2d":"src/engine/geometry/point2d.ts"}],"src/engine/ai/escape_nearest_ai.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var EscapeNearestAI =
/** @class */
function () {
  function EscapeNearestAI(world, item, tag, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.escapeDistance,
        escapeDistance = _c === void 0 ? 0.1 : _c,
        _d = _b.escapeWeight,
        escapeWeight = _d === void 0 ? 16 : _d;

    this._world = world;
    this._item = item;
    this._tag = tag;
    this._quadEscapeDistance = escapeDistance * escapeDistance;
    this._escapeWeight = escapeWeight;
  }

  EscapeNearestAI.prototype.direction = function () {
    var position = this._item.peg.position;

    var hunters = this._world.getItems(this._tag);

    var nearestDistance = 1;
    var nearestHunter = null;
    var escapeDirection = null;
    var escapeMode = false;

    for (var _i = 0, hunters_1 = hunters; _i < hunters_1.length; _i++) {
      var hunter = hunters_1[_i];
      var distance = position.quadDistance(hunter.peg.position);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestHunter = hunter;
      }
    }

    if (nearestDistance < this._quadEscapeDistance) {
      escapeMode = true;
      escapeDirection = nearestHunter.peg.position.substract(position).negate().normalize(this._escapeWeight);
    } else {
      escapeDirection = this._item.peg.heading;
    }

    return [escapeDirection, escapeMode];
  };

  return EscapeNearestAI;
}();

exports["default"] = EscapeNearestAI;
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

var flock_ai_1 = __importDefault(require("../engine/ai/flock_ai"));

var escape_nearest_ai_1 = __importDefault(require("../engine/ai/escape_nearest_ai"));

var Bird =
/** @class */
function () {
  function Bird(world) {
    this._world = world;
    this._flockAI = new flock_ai_1["default"](world, this, 'bird');
    this._escapeAI = new escape_nearest_ai_1["default"](world, this, 'hunter');
    this.peg = new peg_1["default"](new point2d_1["default"](Math.random(), Math.random()), new point2d_1["default"](Math.random() - 0.5, Math.random() - 0.5).normalize(0.0002));
    this.sprite = new sprite_1["default"](document.documentElement, 'bird', new point2d_1["default"](0.005, 0.005));
  }

  Bird.prototype.plan = function () {
    var _a = this._escapeAI.direction(),
        escapeDirection = _a[0],
        escapeMode = _a[1];

    this._turnTo = this._flockAI.direction().add(escapeDirection);
    this._escapeMode = escapeMode;
  };

  Bird.prototype.move = function (step, boardRatio) {
    var maxTurnRate = this._escapeMode ? 1020 : 360;
    this.peg.setupFrame(step, boardRatio).turnWithMax(this._turnTo, maxTurnRate).executeMovement().bounceOfWalls();
  };

  Bird.prototype.render = function (browserWindow) {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  };

  return Bird;
}();

exports["default"] = Bird;
},{"../engine/geometry/point2d":"src/engine/geometry/point2d.ts","../engine/physics/peg":"src/engine/physics/peg.ts","../engine/view/sprite":"src/engine/view/sprite.ts","../engine/ai/flock_ai":"src/engine/ai/flock_ai.ts","../engine/ai/escape_nearest_ai":"src/engine/ai/escape_nearest_ai.ts"}],"src/engine/ai/turn_to_three_nearest_ai.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var point2d_1 = __importDefault(require("../geometry/point2d"));

var TurnToThreeNearestAI =
/** @class */
function () {
  function TurnToThreeNearestAI(world, item, tag) {
    this._world = world;
    this._item = item;
    this._tag = tag;
  }

  TurnToThreeNearestAI.prototype.direction = function () {
    var position = this._item.peg.position;

    var items = this._world.getItems(this._tag);

    var nearestDistance = 1;
    var nearestItem = null;
    var secondNearestDistance = 1.1;
    var secondNearestItem = null;
    var thirdNearestDistance = 1.2;
    var thirdNearestItem = null;

    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
      var item = items_1[_i];
      var distance = position.quadDistance(item.peg.position);

      if (distance < thirdNearestDistance) {
        if (distance < secondNearestDistance) {
          if (distance < nearestDistance) {
            thirdNearestDistance = secondNearestDistance;
            thirdNearestItem = secondNearestItem;
            secondNearestDistance = nearestDistance;
            nearestDistance = distance;
            secondNearestItem = nearestItem;
            nearestItem = item;
          } else {
            thirdNearestDistance = secondNearestDistance;
            thirdNearestItem = secondNearestItem;
            secondNearestDistance = distance;
            secondNearestItem = item;
          }
        } else {
          thirdNearestDistance = distance;
          thirdNearestItem = item;
        }
      }
    }

    return point2d_1["default"].center([nearestItem.peg.position, secondNearestItem.peg.position, thirdNearestItem.peg.position]).substract(position);
  };

  return TurnToThreeNearestAI;
}();

exports["default"] = TurnToThreeNearestAI;
},{"../geometry/point2d":"src/engine/geometry/point2d.ts"}],"src/flock/hunter.ts":[function(require,module,exports) {
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

var turn_to_three_nearest_ai_1 = __importDefault(require("../engine/ai/turn_to_three_nearest_ai"));

var Hunter =
/** @class */
function () {
  function Hunter(world) {
    this._world = world;
    this._followAI = new turn_to_three_nearest_ai_1["default"](world, this, 'bird');
    this.peg = new peg_1["default"](new point2d_1["default"](Math.random(), Math.random()), new point2d_1["default"](Math.random() - 0.5, Math.random() - 0.5).normalize(0.0003));
    this.sprite = new sprite_1["default"](document.documentElement, 'hunter', new point2d_1["default"](0.02, 0.02));
  }

  Hunter.prototype.plan = function () {
    this._turnTo = this._followAI.direction();
  };

  Hunter.prototype.move = function (step, boardRatio) {
    this.peg.setupFrame(step, boardRatio).turnWithMax(this._turnTo, 360).executeMovement().bounceOfWalls();
  };

  Hunter.prototype.render = function (browserWindow) {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  };

  return Hunter;
}();

exports["default"] = Hunter;
},{"../engine/geometry/point2d":"src/engine/geometry/point2d.ts","../engine/physics/peg":"src/engine/physics/peg.ts","../engine/view/sprite":"src/engine/view/sprite.ts","../engine/ai/turn_to_three_nearest_ai":"src/engine/ai/turn_to_three_nearest_ai.ts"}],"src/index.ts":[function(require,module,exports) {
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

for (var i = 0; i < 100; ++i) {
  engine.spawn(bird_1["default"], ['bird']);
}

engine.spawn(hunter_1["default"], ['hunter']);
engine.spawn(hunter_1["default"], ['hunter']);
engine.start();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49592" + '/');

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