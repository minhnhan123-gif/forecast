"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vite = require("vite");

var _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

var _vite2 = _interopRequireDefault(require("@tailwindcss/vite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://vite.dev/config/
var _default = (0, _vite.defineConfig)({
  plugins: [(0, _pluginReact["default"])(), (0, _vite2["default"])()],
  base: "/forecast/"
});

exports["default"] = _default;
//# sourceMappingURL=vite.config.dev.js.map
