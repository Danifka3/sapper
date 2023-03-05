// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/box.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBox = createBox;
exports.timer = void 0;
var _ = require("..");
var _matrix = require("./matrix");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
localStorage.setItem("gameCondition", '-1');
var appElem = document.getElementById("app");
var timer;
exports.timer = timer;
var win = 0;
var Box = /*#__PURE__*/function () {
  function Box(isBomb, coordinates) {
    _classCallCheck(this, Box);
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }
  _createClass(Box, [{
    key: "open",
    value: function open() {
      this.isOpenned = true;
      this.boxElem.classList.remove("initial");
      this.boxElem.classList.remove("question");
      this.boxElem.classList.add("bomb-count-".concat(this.value));
      if (this.boxElem.classList.contains("flag")) {
        if (this.boxElem.classList.contains("bomb")) {
          this.boxElem.classList.add("bomb--defused");
          this.boxElem.classList.remove("flag");
        } else {
          this.boxElem.classList.remove("flag");
        }
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.isOpenned = true;
    }
  }, {
    key: "createBoxOnArea",
    value: function createBoxOnArea() {
      var _this = this;
      var boxElem = document.createElement("div");
      boxElem.classList.add("box");
      boxElem.classList.add("initial");
      this.boxElem = boxElem;
      this.boxElem.addEventListener("click", function () {
        return _this.onBoxClick();
      });
      this.boxElem.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        _this.setFlag(_this.isFlagged);
      });
      this.boxElem.addEventListener("mousedown", function (event) {
        if (!_this.boxElem.classList.contains('flag')) {
          _this.boxElem.classList.add('click');
          _.startBtn.classList.add('scared');
          if (_this.boxElem.classList.contains('question')) _this.boxElem.classList.add('question--clicked');
        }
      });
      this.boxElem.addEventListener("mouseup", function (event) {
        _this.boxElem.classList.remove('click');
        _.startBtn.classList.remove('scared');
        _this.boxElem.classList.remove('question--clicked');
      });
      this.boxElem.addEventListener("mouseout", function (event) {
        _this.boxElem.classList.remove('click');
        _.startBtn.classList.remove('scared');
        _this.boxElem.classList.remove('question--clicked');
      });
      appElem.appendChild(boxElem);
    }
  }, {
    key: "onBoxClick",
    value: function onBoxClick() {
      var allowOpenNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (localStorage.getItem("gameCondition") === "0") {
        (0, _matrix.addBombs)(this.coordinates);
        clearInterval(timer);
        exports.timer = timer = setInterval(_.growTime, 1000);
        (0, _matrix.setBoxType)();
        localStorage.gameCondition = 1;
      }
      if (localStorage.getItem("gameCondition") !== "-1") {
        if (allowOpenNumber) {
          this.boxElem.classList.remove('flag');
        }
        if ((!this.value || this.value === '0') && !this.isOpenned && !this.isBomb && !this.boxElem.classList.contains('flag')) {
          this.open();
          var allNeighbors = (0, _matrix.getAllNeighbors)(this.coordinates);
          allNeighbors.forEach(function (neighbor) {
            if (!neighbor.isOpenned) {
              neighbor.onBoxClick(true);
            }
          });
        } else if (!this.isBomb && this.value && this.value !== '0' && allowOpenNumber && !this.boxElem.classList.contains("flag") || typeof this.value === "number" && this.value !== '0' && !this.isBomb && !this.boxElem.classList.contains("flag")) {
          this.open();
        } else if (this.isBomb && !this.boxElem.classList.contains("flag")) {
          (0, _matrix.openAllBombs)(this.coordinates);
          _.startBtn.classList.add('wasted');
          localStorage.gameCondition = -1;
        }
        if (win >= 40) {
          (0, _matrix.openAllBombs)(this.coordinates);
          _.startBtn.classList.add('win');
          win = 0;
          localStorage.gameCondition = -1;
        }
      }
    }
  }, {
    key: "setFlag",
    value: function setFlag(isFlagged) {
      if (localStorage.getItem("gameCondition") !== "-1") {
        if (!isFlagged && this.boxElem.classList.contains("initial")) {
          this.boxElem.classList.add("flag");
          this.isFlagged = !isFlagged;
          (0, _.decreaseFlag)();
          if (this.isBomb === true) {
            win++;
          }
        } else if (isFlagged && !this.boxElem.classList.contains("question") && this.boxElem.classList.contains("initial")) {
          this.boxElem.classList.add("question");
          this.boxElem.classList.remove("flag");
          (0, _.growFlag)();
          if (this.isBomb === true) {
            win--;
          }
        } else {
          this.boxElem.classList.remove("question");
          this.isFlagged = !isFlagged;
        }
        if (win >= 40) {
          (0, _matrix.openAllBombs)(this.coordinates);
          _.startBtn.classList.add('win');
          win = 0;
          localStorage.gameCondition = -1;
        }
      }
    }
  }]);
  return Box;
}();
function createBox(isBomb, coordinates) {
  var newBox = new Box(isBomb, coordinates);
  newBox.createBoxOnArea();
  return newBox;
}
},{"..":"src/index.js","./matrix":"src/utils/matrix.js"}],"src/utils/getRandom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandom = generateRandom;
function generateRandom() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  // find diff
  var difference = max - min;

  // generate random number
  var rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;
  return rand;
}
},{}],"src/utils/matrix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addBombs = addBombs;
exports.clearField = clearField;
exports.createMatrix = createMatrix;
exports.getAllNeighbors = getAllNeighbors;
exports.matrix = void 0;
exports.openAllBombs = openAllBombs;
exports.setBoxType = setBoxType;
var _box = require("./box");
var _getRandom = require("./getRandom");
var matrix = [];
exports.matrix = matrix;
function createMatrix() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  exports.matrix = matrix = Array.from({
    length: height
  }, function () {
    return Array.from({
      length: width
    }, function () {
      return 0;
    });
  });
  matrix.forEach(function (matrixLine, y) {
    matrixLine.forEach(function (matrixElem, x) {
      matrix[y][x] = (0, _box.createBox)(Boolean(matrixElem), {
        x: x,
        y: y
      });
    });
  });
}
function addBombs(coordinates) {
  var bombCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 40;
  var currentBombCount = bombCount;
  var xBox = coordinates.x;
  var yBox = coordinates.y;
  var matrixHeight = matrix.length;
  var matrixWidth = matrix[0].length;
  while (currentBombCount) {
    var x = (0, _getRandom.generateRandom)(0, matrixWidth - 1);
    var y = (0, _getRandom.generateRandom)(0, matrixHeight - 1);
    if (!matrix[y][x].isBomb && x !== xBox && y !== yBox) {
      matrix[y][x].isBomb = true;
      currentBombCount--;
    }
  }
}
function clearField() {
  var bombCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
  var currentBombCount = bombCount;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].isBomb) {
        matrix[i][j].isBomb = false;
        matrix[i][j].boxElem.classList.remove('bomb');
        currentBombCount--;
      }
      matrix[i][j].value = 0;
      matrix[i][j].isOpenned = false;
      matrix[i][j].isFlagged = false;
      matrix[i][j].boxElem.classList.contains('flag') ? matrix[i][j].boxElem.classList.remove('flag') : "";
      matrix[i][j].boxElem.classList.contains('question') ? matrix[i][j].boxElem.classList.remove('question') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-1') ? matrix[i][j].boxElem.classList.remove('bomb-count-1') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-2') ? matrix[i][j].boxElem.classList.remove('bomb-count-2') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-3') ? matrix[i][j].boxElem.classList.remove('bomb-count-3') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-4') ? matrix[i][j].boxElem.classList.remove('bomb-count-4') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-5') ? matrix[i][j].boxElem.classList.remove('bomb-count-5') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-6') ? matrix[i][j].boxElem.classList.remove('bomb-count-6') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-7') ? matrix[i][j].boxElem.classList.remove('bomb-count-7') : "";
      matrix[i][j].boxElem.classList.contains('bomb-count-8') ? matrix[i][j].boxElem.classList.remove('bomb-count-8') : "";
      matrix[i][j].boxElem.classList.contains('bomb--defused') ? matrix[i][j].boxElem.classList.remove('bomb--defused') : "";
      matrix[i][j].boxElem.classList.contains('bomb--red') ? matrix[i][j].boxElem.classList.remove('bomb--red') : "";
      !matrix[i][j].boxElem.classList.contains('initial') ? matrix[i][j].boxElem.classList.add('initial') : "";
    }
  }
}
function getAllNeighbors(coordinates) {
  var _matrix, _matrix2, _matrix$y, _matrix3, _matrix4, _matrix5, _matrix$y2, _matrix6;
  var x = coordinates.x,
    y = coordinates.y;
  var n_1 = (_matrix = matrix[y - 1]) === null || _matrix === void 0 ? void 0 : _matrix[x];
  var n_2 = (_matrix2 = matrix[y - 1]) === null || _matrix2 === void 0 ? void 0 : _matrix2[x + 1];
  var n_3 = (_matrix$y = matrix[y]) === null || _matrix$y === void 0 ? void 0 : _matrix$y[x + 1];
  var n_4 = (_matrix3 = matrix[y + 1]) === null || _matrix3 === void 0 ? void 0 : _matrix3[x + 1];
  var n_5 = (_matrix4 = matrix[y + 1]) === null || _matrix4 === void 0 ? void 0 : _matrix4[x];
  var n_6 = (_matrix5 = matrix[y + 1]) === null || _matrix5 === void 0 ? void 0 : _matrix5[x - 1];
  var n_7 = (_matrix$y2 = matrix[y]) === null || _matrix$y2 === void 0 ? void 0 : _matrix$y2[x - 1];
  var n_8 = (_matrix6 = matrix[y - 1]) === null || _matrix6 === void 0 ? void 0 : _matrix6[x - 1];
  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(function (item) {
    return typeof item !== "undefined";
  });
}
function openAllBombs(coordinates) {
  var xBox = coordinates.x;
  var yBox = coordinates.y;
  matrix[yBox][xBox].boxElem.classList.add('bomb--red');
  matrix.forEach(function (matrixLine) {
    matrixLine.forEach(function (box) {
      if (box.isBomb) {
        box.open();
      } else {
        box.close();
      }
    });
  });
}
function setBoxType() {
  var bombCount = 0;
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j].isBomb) {
        matrix[i][j].boxElem.classList.add("bomb");
      }
      var allNeighbors = getAllNeighbors(matrix[i][j].coordinates);
      bombCount = 0;
      allNeighbors.forEach(function (neighbor) {
        if (neighbor.isBomb || neighbor === 1) {
          bombCount++;
        }
      });
      if (bombCount) {
        matrix[i][j].value = bombCount;
      }
    }
  }
}
},{"./box":"src/utils/box.js","./getRandom":"src/utils/getRandom.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decreaseFlag = decreaseFlag;
exports.growFlag = growFlag;
exports.growTime = growTime;
exports.startBtn = void 0;
var _matrix = require("./utils/matrix");
var _box = require("./utils/box");
var startBtn = document.querySelector("#start-btn");
exports.startBtn = startBtn;
var bcount1 = document.querySelector("#bcount1");
var bcount2 = document.querySelector("#bcount2");
var time1 = document.querySelector("#time1");
var time2 = document.querySelector("#time10");
var time3 = document.querySelector("#time100");
var time;
var flagsCount;
openGame();
startBtn.addEventListener("click", function (event) {
  clearInterval(_box.timer);
  time = 0;
  flagsCount = 40;
  for (var i = 0; i < 10; i++) {
    bcount1.classList.remove("bcount".concat(i));
    bcount2.classList.remove("bcount".concat(i));
    time1.classList.remove("bcount".concat(i));
    time2.classList.remove("bcount".concat(i));
    time3.classList.remove("bcount".concat(i));
  }
  bcount1.classList.add("bcount".concat(flagsCount / 10 % 10));
  bcount2.classList.add("bcount".concat(flagsCount % 10));
  time1.classList.add("bcount");
  time2.classList.add("bcount");
  time3.classList.add("bcount");
  (0, _matrix.clearField)();
  localStorage.gameCondition = 0;
});
startBtn.addEventListener("mousedown", function (event) {
  startBtn.classList.remove('wasted');
  startBtn.classList.remove('win');
  startBtn.classList.add('smile--clicked');
});
startBtn.addEventListener("mouseup", function (event) {
  startBtn.classList.remove('smile--clicked');
});
function growTime() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    var current = ++time;
    if (current < 10) {
      time3.classList.add("bcount".concat(time % 10));
    } else if (current < 100) {
      for (var i = 0; i < 10; i++) {
        time3.classList.remove("bcount".concat(i));
      }
      time2.classList.add("bcount".concat(Math.floor(time / 10 % 10)));
      time3.classList.add("bcount".concat(time % 10));
    } else {
      for (var _i = 0; _i < 10; _i++) {
        time2.classList.remove("bcount".concat(_i));
        time3.classList.remove("bcount".concat(_i));
      }
      time1.classList.add("bcount".concat(Math.floor(time / 100 % 10)));
      time2.classList.add("bcount".concat(Math.floor(time / 10 % 10)));
      time3.classList.add("bcount".concat(time % 10));
    }
  }
}
function openGame() {
  (0, _matrix.createMatrix)();
}
function decreaseFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    var current = --flagsCount;
    if (current > -1) {
      if (current < 10) {
        bcount1.classList.remove("bcount1");
        for (var i = 0; i < 10; i++) {
          bcount2.classList.remove("bcount".concat(i));
        }
        bcount2.classList.add("bcount".concat(flagsCount % 10));
      } else {
        for (var _i2 = 0; _i2 < 10; _i2++) {
          bcount1.classList.remove("bcount".concat(_i2));
          bcount2.classList.remove("bcount".concat(_i2));
        }
        bcount1.classList.add("bcount".concat(Math.floor(flagsCount / 10 % 10)));
        bcount2.classList.add("bcount".concat(flagsCount % 10));
      }
    }
  }
}
function growFlag() {
  if (localStorage.getItem("gameCondition") !== "-1") {
    var current = ++flagsCount;
    if (current > -1) {
      if (current < 10) {
        for (var i = 0; i < 10; i++) {
          bcount2.classList.remove("bcount".concat(i));
        }
        bcount2.classList.add("bcount".concat(flagsCount % 10));
      } else {
        for (var _i3 = 0; _i3 < 10; _i3++) {
          bcount1.classList.remove("bcount".concat(_i3));
          bcount2.classList.remove("bcount".concat(_i3));
        }
        bcount1.classList.add("bcount".concat(Math.floor(flagsCount / 10 % 10)));
        bcount2.classList.add("bcount".concat(flagsCount % 10));
      }
    }
  }
}
},{"./utils/matrix":"src/utils/matrix.js","./utils/box":"src/utils/box.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60478" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map