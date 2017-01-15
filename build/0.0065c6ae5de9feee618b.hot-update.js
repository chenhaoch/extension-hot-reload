webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.info = info;
	exports.warn = warn;
	exports.error = error;
	
	/* eslint no-console: "off" */
	var isDev = ("development") === 'development';
	
	function info() {
	  if (isDev) {
	    var _console$info;
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    (_console$info = console.info).call.apply(_console$info, [console].concat(args));
	  }
	}
	
	function warn() {
	  var _console$warn;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  (_console$warn = console.warn).call.apply(_console$warn, [console].concat(args));
	}
	
	function error() {
	  var _console$error;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  (_console$error = console.error).call.apply(_console$error, [console].concat(args));
	}

/***/ }

})
//# sourceMappingURL=sourcemap/0.0065c6ae5de9feee618b.hot-update.js.map