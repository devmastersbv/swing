"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sister = require("sister");

var _sister2 = _interopRequireDefault(_sister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouchEvents = function TouchEvents(element) {
  var eventEmitter = void 0;

  var construct = function construct() {
    eventEmitter = (0, _sister2.default)();

    var touchWrapper = element;
    var dragged = false;
    var baseCoord = null;
    var x = void 0;
    var y = void 0;
    var start = function start(e) {
      var coords = e.touches ? e.touches[0] : e;
      dragged = false;
      baseCoord = coords;
      x = y = 0;
    };
    touchWrapper.addEventListener("touchstart", start);
    touchWrapper.addEventListener("mousedown", start);

    var move = function move(e) {
      if (!baseCoord) return;
      var coords = e.touches ? e.touches[0] : e;

      x = coords.clientX - baseCoord.clientX;
      y = coords.clientY - baseCoord.clientY;
      if (Math.abs(x) >= 2 || Math.abs(y) >= 2) {
        if (!dragged) {
          dragged = true;
          eventEmitter.trigger('panstart');
        }
      }

      if (dragged) {
        eventEmitter.trigger('panmove', {
          deltaX: x,
          deltaY: y
        });
      }
    };
    touchWrapper.addEventListener("touchmove", move);
    touchWrapper.addEventListener("mousemove", move);

    var up = function up(e) {
      var c = baseCoord;
      baseCoord = null;

      if (!c || !dragged) return;

      eventEmitter.trigger('panend', {
        deltaX: x,
        deltaY: y
      });
    };
    touchWrapper.addEventListener("touchend", up);
    touchWrapper.addEventListener("mouseup", up);
    touchWrapper.addEventListener("mouseleave", up);
  };

  construct();

  var on = eventEmitter.on;

  return {
    on: on
  };
};

exports.default = TouchEvents;
module.exports = exports["default"];