/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// 把加载的模块的对外接口整个赋值给一个变量
	var c=__webpack_require__(2);
	c.a();
	// 把加载的模块的对外接口的某个属性赋值给一个变量
	var a=__webpack_require__(2).a;
	a();
	function b(){
	    console.log('b')
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__filename) {exports.a=function (){
	    console.log('a')
	    console.log(__filename)
	    c();
	}
	var c=function(){
	    console.log('c');
	}
	// 完整写法需要加上module，但是模块中内部实现了exports=module.exports，所以不需要加module
	// module.exports.a=function (){
	//     console.log(1)
	// }
	exports.c=function(){
	    console.log('c')
	}
	/* WEBPACK VAR INJECTION */}.call(exports, "/index.js"))

/***/ }
/******/ ]);