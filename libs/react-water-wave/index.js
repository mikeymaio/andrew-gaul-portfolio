"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var clean_react_props_1 = require("clean-react-props");
var $ = require("jquery");
require("jquery.ripples");
var useRipples = function (_a) {
    var imageUrl = _a.imageUrl, dropRadius = _a.dropRadius, perturbance = _a.perturbance, resolution = _a.resolution, interactive = _a.interactive, crossOrigin = _a.crossOrigin, rippleRef = _a.rippleRef;
    var target = React.useRef({
        ripples: function (_arg) {
            var _args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                _args[_i - 1] = arguments[_i];
            }
        },
    });
    React.useEffect(function () {
        target.current = $(rippleRef.current);
        target.current.ripples({
            imageUrl: imageUrl,
            dropRadius: dropRadius,
            perturbance: perturbance,
            resolution: resolution,
            interactive: interactive,
            crossOrigin: crossOrigin,
        });
        return function () {
            target.current.ripples('destroy');
        };
    }, [
        crossOrigin,
        dropRadius,
        imageUrl,
        interactive,
        perturbance,
        resolution,
        rippleRef,
    ]);
    var destroy = function () {
        target.current.ripples('destroy');
    };
    var drop = function (_a) {
        var x = _a.x, y = _a.y, radius = _a.radius, strength = _a.strength;
        target.current.ripples('drop', x, y, radius, strength);
    };
    var pause = function () {
        target.current.ripples('pause');
    };
    var play = function () {
        target.current.ripples('play');
    };
    var hide = function () {
        target.current.ripples('hide');
    };
    var show = function () {
        target.current.ripples('show');
    };
    var set = function (_a) {
        var property = _a.property, value = _a.value;
        target.current.ripples('set', property, value);
    };
    var updateSize = function () {
        target.current.ripples('updateSize');
    };
    return {
        destroy: destroy,
        pause: pause,
        play: play,
        hide: hide,
        show: show,
        drop: drop,
        set: set,
        updateSize: updateSize,
    };
};
var WaterEffect = function (_a) {
    var imageUrl = _a.imageUrl, dropRadius = _a.dropRadius, perturbance = _a.perturbance, resolution = _a.resolution, interactive = _a.interactive, crossOrigin = _a.crossOrigin, children = _a.children, otherProps = __rest(_a, ["imageUrl", "dropRadius", "perturbance", "resolution", "interactive", "crossOrigin", "children"]);
    var rippleRef = React.useRef(null);
    var _b = useRipples({
        imageUrl: imageUrl,
        dropRadius: dropRadius,
        perturbance: perturbance,
        resolution: resolution,
        interactive: interactive,
        crossOrigin: crossOrigin,
        rippleRef: rippleRef,
    }), destroy = _b.destroy, pause = _b.pause, play = _b.play, hide = _b.hide, show = _b.show, drop = _b.drop, set = _b.set, updateSize = _b.updateSize;
    return (React.createElement("div", __assign({ ref: rippleRef }, clean_react_props_1.default(otherProps)), children({
        destroy: destroy,
        pause: pause,
        play: play,
        hide: hide,
        show: show,
        drop: drop,
        set: set,
        updateSize: updateSize,
    })));
};
WaterEffect.defaultProps = {
    imageUrl: '',
    dropRadius: 20,
    perturbance: 0.03,
    resolution: 256,
    interactive: true,
    crossOrigin: '',
    children: function () { },
};
exports.default = WaterEffect;
//# sourceMappingURL=index.js.map