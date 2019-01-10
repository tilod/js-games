parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"MlSr":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(){this._htmlDocument=document.documentElement,this.update()}return Object.defineProperty(t.prototype,"viewportWidth",{get:function(){return this._viewportWidth},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewportHeight",{get:function(){return this._viewportHeight},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewportRatio",{get:function(){return this._viewportRatio},enumerable:!0,configurable:!0}),t.prototype.update=function(){this._viewportWidth=this._htmlDocument.clientWidth,this._viewportHeight=this._htmlDocument.clientHeight,this._viewportRatio=this._viewportHeight/this.viewportWidth},t}();exports.default=t;
},{}],"xUrU":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(){this.items=new Map,this.items.set(t.ALL_ITEMS,[])}return t.prototype.addItem=function(e,s){this.items.get(t.ALL_ITEMS).push(e);for(var i=0,o=s;i<o.length;i++){var r=o[i],n=this.items.get(r);n?n.push(e):this.items.set(r,[e])}},t.prototype.getItems=function(e){return void 0===e&&(e=t.ALL_ITEMS),this.items.get(e)},t.ALL_ITEMS="__all__",t}();exports.default=t;
},{}],"x7M/":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};exports.__esModule=!0;var r=t(require("./browser-window")),e=t(require("./world")),o=function(){function t(){this._browserWindow=new r.default,this._world=new e.default}return t.prototype.spawn=function(t,r){return void 0===r&&(r=[]),this._world.addItem(new t(this._world),r),this},t.prototype.start=function(){var t=this,r=0;window.requestAnimationFrame(function e(o){t._browserWindow.update();var n=o-r;t.plan().move(n).render(),r=o,window.requestAnimationFrame(e)})},t.prototype.plan=function(){for(var t=0,r=this._world.getItems();t<r.length;t++){r[t].plan()}return this},t.prototype.move=function(t){for(var r=0,e=this._world.getItems();r<e.length;r++){e[r].move(t,this._browserWindow.viewportRatio)}return this},t.prototype.render=function(){for(var t=0,r=this._world.getItems();t<r.length;t++){r[t].render(this._browserWindow)}return this},t}();exports.default=o;
},{"./browser-window":"MlSr","./world":"xUrU"}],"eMjC":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t,n){this.x=t,this.y=n}return t.center=function(t){return 1===t.length?t[0]:t.reduce(function(t,n){return t.add(n)}).divide(t.length)},t.prototype.clone=function(){return new t(this.x,this.y)},t.prototype.add=function(n){return new t(this.x+n.x,this.y+n.y)},t.prototype.substract=function(n){return new t(this.x-n.x,this.y-n.y)},t.prototype.multiply=function(n){return new t(this.x*n,this.y*n)},t.prototype.divide=function(n){return new t(this.x/n,this.y/n)},t.prototype.mirrorHorizontal=function(){return new t(this.x,-this.y)},t.prototype.mirrorVertical=function(){return new t(-this.x,this.y)},t.prototype.negate=function(){return new t(-this.x,-this.y)},t.prototype.rotateDeg=function(t){return this.rotateRad(t*Math.PI/180)},t.prototype.rotateDegMax=function(t,n){return t>n?this.rotateDeg(n):t<-n?this.rotateDeg(-n):this.rotateDeg(t)},t.prototype.rotateRad=function(n){var e=Math.sin(n),r=Math.cos(n);return new t(r*this.x-e*this.y,e*this.x+r*this.y)},t.prototype.rotateRadMax=function(t,n){return t>n?this.rotateRad(n):t<-n?this.rotateRad(-n):this.rotateRad(t)},t.prototype.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)},t.prototype.normalize=function(t){return void 0===t&&(t=1),this.divide(this.length()/t)},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y},t.prototype.angleRad=function(t){return Math.acos(this.dot(t)/(this.length()*t.length()))},t.prototype.angleDeg=function(t){return 180*this.angleRad(t)/Math.PI},t.prototype.orientationDeg=function(){return(this.y<0?180:0)-180*Math.atan(this.x/this.y)/Math.PI},t.prototype.orientationRad=function(){return(this.y<0?Math.PI:0)-Math.atan(this.x/this.y)},t.prototype.quadDistance=function(t){return Math.pow(t.x-this.x,2)+Math.pow(t.y-this.y,2)},t.prototype.distance=function(t){return Math.sqrt(this.quadDistance(t))},t.prototype.interpolate=function(t,n){return this.multiply(1-n).add(t.multiply(n))},t}();exports.default=t;
},{}],"r8Fl":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};exports.__esModule=!0;var i=t(require("../geometry/point2d")),e=function(){function t(t,e){void 0===t&&(t=new i.default(0,0)),void 0===e&&(e=new i.default(0,0)),this.position=t,this.heading=e}return t.prototype.setupFrame=function(t,i){return this._step=t,this._boardRatio=i,this},t.prototype.turn=function(t){return this.heading=t.normalize(this.headingLength()),this},t.prototype.turnWithMax=function(t,i){var e=this.heading.angleDeg(t),n=this.step*i/1e3;return e>n?this.turn(this.heading.interpolate(t.normalize(this.headingLength()),n/e)):this.turn(t)},t.prototype.executeMovement=function(){return this.position=this.position.add(new i.default(this.step*this.heading.x,this.step*this.heading.y)),this},t.prototype.bounceOfWalls=function(){return(this.position.x<0&&this.heading.x<0||this.position.x>1&&this.heading.x>0)&&(this.heading=this.heading.mirrorVertical()),(this.position.y<0&&this.heading.y<0||this.position.y>this.boardRatio&&this.heading.y>0)&&(this.heading=this.heading.mirrorHorizontal()),this},Object.defineProperty(t.prototype,"step",{get:function(){return this._step},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"boardRatio",{get:function(){return this._boardRatio},enumerable:!0,configurable:!0}),t.prototype.headingLength=function(){return this._headingLength||(this._headingLength=this.heading.length())},t}();exports.default=e;
},{"../geometry/point2d":"eMjC"}],"nawu":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t,e,i){this.dimensions=i,this.htmlElement=document.createElement("div"),this.htmlElement.className=e,this.htmlElement.style.position="absolute",this.htmlElement.style.top="0",this.htmlElement.style.left="0",t.appendChild(this.htmlElement)}return t.prototype.render=function(t,e,i){void 0===i&&(i=null);var n=(e.x-this.dimensions.x/2)*t.viewportWidth,s=t.viewportHeight-(e.y+this.dimensions.y/2)*t.viewportWidth,l=i?-i.orientationDeg():0,h=this.dimensions.x*t.viewportWidth/this.htmlElement.clientWidth;this.htmlElement.style.transform="translate("+n+"px, "+s+"px)\n       rotate("+l+"deg)\n       scale("+h+", "+h+")"},t}();exports.default=t;
},{}],"fCMr":[function(require,module,exports) {
"use strict";var i=this&&this.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};exports.__esModule=!0;var t=i(require("../geometry/point2d")),e=function(){function i(i,t,e,a){var n=void 0===a?{}:a,s=n.cohesionDistance,o=void 0===s?.2:s,d=n.cohesionWeight,h=void 0===d?1:d,r=n.alignmentDistance,g=void 0===r?.1:r,_=n.alignmentWeight,u=void 0===_?2:_,c=n.separationDistance,p=void 0===c?.01:c,l=n.separationWeight,m=void 0===l?4:l;this._world=i,this._item=t,this._tag=e,this._quadCohesionDistance=o*o,this._cohesionWeight=h,this._quadAlignmentDistance=g*g,this._alignmentWeight=u,this._quadSeparationDistance=p*p,this._separationWeight=m}return i.prototype.direction=function(){for(var i=this._item.peg.position,e=this._item.peg.heading,a=1,n=i,s=1,o=e,d=0,h=new t.default(0,0),r=0,g=this._world.getItems(this._tag);r<g.length;r++){var _=g[r];if(_!==this._item){var u=i.quadDistance(_.peg.position);u>this._quadCohesionDistance||(++a,n=n.add(_.peg.position),u>this._quadAlignmentDistance||(++s,o=o.add(_.peg.heading),u>this._quadSeparationDistance||(++d,h=h.add(_.peg.position.substract(i)))))}}var c=a>1?n.divide(a).substract(i).normalize(this._cohesionWeight):e.normalize(1),p=s>2?o.divide(s).normalize(this._alignmentWeight):e.normalize(1),l=d>0?h.divide(d).negate().normalize(this._separationWeight):e.normalize(1);return c.add(p).add(l)},i}();exports.default=e;
},{"../geometry/point2d":"eMjC"}],"88Du":[function(require,module,exports) {
"use strict";exports.__esModule=!0;var t=function(){function t(t,e,i,s){var a=void 0===s?{}:s,n=a.escapeDistance,o=void 0===n?.1:n,r=a.escapeWeight,p=void 0===r?16:r;this._world=t,this._item=e,this._tag=i,this._quadEscapeDistance=o*o,this._escapeWeight=p}return t.prototype.direction=function(){for(var t=this._item.peg.position,e=1,i=null,s=null,a=!1,n=0,o=this._world.getItems(this._tag);n<o.length;n++){var r=o[n],p=t.quadDistance(r.peg.position);p<e&&(e=p,i=r)}return e<this._quadEscapeDistance?(a=!0,s=i.peg.position.substract(t).negate().normalize(this._escapeWeight)):s=this._item.peg.heading,[s,a]},t}();exports.default=t;
},{}],"11d2":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=e(require("../engine/geometry/point2d")),i=e(require("../engine/physics/peg")),n=e(require("../engine/view/sprite")),r=e(require("../engine/ai/flock_ai")),o=e(require("../engine/ai/escape_nearest_ai")),a=function(){function e(e){this._world=e,this._flockAI=new r.default(e,this,"bird"),this._escapeAI=new o.default(e,this,"hunter"),this.peg=new i.default(new t.default(Math.random(),Math.random()),new t.default(Math.random()-.5,Math.random()-.5).normalize(2e-4)),this.sprite=new n.default(document.documentElement,"bird",new t.default(.005,.005))}return e.prototype.plan=function(){var e=this._escapeAI.direction(),t=e[0],i=e[1];this._turnTo=this._flockAI.direction().add(t),this._escapeMode=i},e.prototype.move=function(e,t){var i=this._escapeMode?1020:360;this.peg.setupFrame(e,t).turnWithMax(this._turnTo,i).executeMovement().bounceOfWalls()},e.prototype.render=function(e){this.sprite.render(e,this.peg.position,this.peg.heading)},e}();exports.default=a;
},{"../engine/geometry/point2d":"eMjC","../engine/physics/peg":"r8Fl","../engine/view/sprite":"nawu","../engine/ai/flock_ai":"fCMr","../engine/ai/escape_nearest_ai":"88Du"}],"tC4L":[function(require,module,exports) {
"use strict";var t=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};exports.__esModule=!0;var e=t(require("../geometry/point2d")),i=function(){function t(t,e,i){this._world=t,this._item=e,this._tag=i}return t.prototype.direction=function(){for(var t=this._item.peg.position,i=1,o=null,n=1.1,r=null,s=1.2,u=null,p=0,l=this._world.getItems(this._tag);p<l.length;p++){var a=l[p],_=t.quadDistance(a.peg.position);_<s&&(_<n?_<i?(s=n,u=r,n=i,i=_,r=o,o=a):(s=n,u=r,n=_,r=a):(s=_,u=a))}return e.default.center([o.peg.position,r.peg.position,u.peg.position]).substract(t)},t}();exports.default=i;
},{"../geometry/point2d":"eMjC"}],"7KDb":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;var t=e(require("../engine/geometry/point2d")),n=e(require("../engine/physics/peg")),i=e(require("../engine/view/sprite")),r=e(require("../engine/ai/turn_to_three_nearest_ai")),o=function(){function e(e){this._world=e,this._followAI=new r.default(e,this,"bird"),this.peg=new n.default(new t.default(Math.random(),Math.random()),new t.default(Math.random()-.5,Math.random()-.5).normalize(3e-4)),this.sprite=new i.default(document.documentElement,"hunter",new t.default(.02,.02))}return e.prototype.plan=function(){this._turnTo=this._followAI.direction()},e.prototype.move=function(e,t){this.peg.setupFrame(e,t).turnWithMax(this._turnTo,360).executeMovement().bounceOfWalls()},e.prototype.render=function(e){this.sprite.render(e,this.peg.position,this.peg.heading)},e}();exports.default=o;
},{"../engine/geometry/point2d":"eMjC","../engine/physics/peg":"r8Fl","../engine/view/sprite":"nawu","../engine/ai/turn_to_three_nearest_ai":"tC4L"}],"9B6d":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};exports.__esModule=!0;for(var r=e(require("./engine")),t=e(require("./flock/bird")),u=e(require("./flock/hunter")),a=new r.default,n=0;n<100;++n)a.spawn(t.default,["bird"]);a.spawn(u.default,["hunter"]),a.spawn(u.default,["hunter"]),a.start();
},{"./engine":"x7M/","./flock/bird":"11d2","./flock/hunter":"7KDb"}]},{},["9B6d"], null)
//# sourceMappingURL=src.d07d3f16.map