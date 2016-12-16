webpackJsonp([0,8],{

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(12);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(13);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _xhr = __webpack_require__(11);

	var _xhr2 = _interopRequireDefault(_xhr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var MsgService = function () {
	  function MsgService() {
	    (0, _classCallCheck3.default)(this, MsgService);
	  }

	  (0, _createClass3.default)(MsgService, [{
	    key: 'fetchList',
	    value: function fetchList(query) {
	      return (0, _xhr2.default)({
	        url: '/msg',
	        body: query
	      });
	    }
	  }, {
	    key: 'fetchAuthorList',
	    value: function fetchAuthorList() {
	      return (0, _xhr2.default)({
	        url: '/msg/authors'
	      });
	    }
	  }, {
	    key: 'fetchById',
	    value: function fetchById(msgId) {
	      return (0, _xhr2.default)({
	        url: '/msg/' + msgId
	      });
	    }
	  }, {
	    key: 'add',
	    value: function add(msgBody) {
	      return (0, _xhr2.default)({
	        method: 'post',
	        url: '/msg',
	        body: msgBody
	      });
	    }
	  }, {
	    key: 'update',
	    value: function update(msgBody) {
	      var msgId = msgBody.id;
	      delete msgBody.msgId;

	      return (0, _xhr2.default)({
	        method: 'put',
	        url: '/msg/' + msgId,
	        body: msgBody
	      });
	    }
	  }, {
	    key: 'del',
	    value: function del(msgId) {
	      return (0, _xhr2.default)({
	        method: 'delete',
	        url: '/msg/' + msgId
	      });
	    }
	  }]);
	  return MsgService;
	}();

	exports.default = new MsgService();

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _msgService = __webpack_require__(1);

	var _msgService2 = _interopRequireDefault(_msgService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    msg: { type: Object, required: true },
	    autoJump: { type: Boolean, default: false },
	    editBtn: { type: Boolean, default: true }
	  },
	  computed: {
	    shouldShowOptBtn: function shouldShowOptBtn() {
	      var userData = this.$root.userData;

	      if (!userData) return;
	      return userData.username === this.msg.author;
	    }
	  },
	  methods: {
	    handleDel: function handleDel() {
	      var _this = this;

	      window.swal({
	        title: '确认删除？',
	        text: '删除后不可恢复',
	        type: 'warning',
	        showCancelButton: true,
	        cancelButtonText: '取消',
	        confirmButtonColor: '#DD6B55',
	        confirmButtonText: '删除'
	      }, function (v) {
	        if (!v) return;

	        var msgId = _this.msg.id;

	        _msgService2.default.del(msgId).then(function () {
	          $.toast({ heading: '删除成功', icon: 'success' });
	          _this.autoJump ? _this.$router.replace('/msg') : _this.$dispatch('REFETCH_LIST');
	        });
	      });
	    }
	  }
	};

/***/ },

/***/ 15:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"btn-group\">\n  <slot><!-- 不具名插槽 --></slot>\n  <template v-if=\"shouldShowOptBtn\">\n    <a v-if=\"editBtn\" v-link=\"`/msg/update/${msg.id}`\"\n      class=\"btn btn-default\">\n      <i class=\"fa fa-pencil\"></i>\n    </a>\n    <button @click=\"handleDel\" class=\"btn btn-default\">\n      <i class=\"fa fa-trash-o\"></i>\n    </button>\n  </template>\n</div>\n";

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\_components\\OptBtnGroup.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(234);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _keys = __webpack_require__(233);

	var _keys2 = _interopRequireDefault(_keys);

	var _updateQuery2 = __webpack_require__(75);

	var _updateQuery3 = _interopRequireDefault(_updateQuery2);

	var _difference2 = __webpack_require__(192);

	var _difference3 = _interopRequireDefault(_difference2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_updateQuery3.default],

	  data: function data() {
	    return { specialFields_: [] };
	  },
	  watch: {
	    '$route.query': function $routeQuery(curQuery, oldQuery) {
	      var missingKeys = (0, _difference3.default)((0, _keys2.default)(oldQuery), (0, _keys2.default)(curQuery));
	      this.autoSyncWithQuery(missingKeys);
	    }
	  },
	  methods: {
	    _init: function _init() {
	      var specialFields = [];
	      for (var origField in this.$data) {
	        if (!origField.endsWith('$')) continue;

	        var field = origField.replace(/\$$/, '');
	        specialFields.push(field);
	        this._cache(origField);
	        this._watch(origField, field);
	      }
	      this.specialFields_ = specialFields;
	    },
	    _cache: function _cache(origField) {
	      this.$data[origField + '$'] = this[origField];
	    },
	    _restore: function _restore(origField) {
	      this[origField] = this.$data[origField + '$'];
	    },
	    _watch: function _watch(origField, field) {
	      this.$watch(origField, function (v) {
	        this.updateQuery((0, _defineProperty3.default)({}, field, v));
	      });
	    },
	    autoSyncWithQuery: function autoSyncWithQuery(missingKeys) {
	      var _this = this;

	      if (!missingKeys) this._init();var query = this.$route.query;

	      this.specialFields_.forEach(function (field) {
	        var origField = field + '$';
	        query[field] && (_this[origField] = query[field]);
	        missingKeys && missingKeys.includes(field) && _this._restore(origField);
	      });
	    }
	  }
	};

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _updateQuery2 = __webpack_require__(231);

	var _updateQuery3 = _interopRequireDefault(_updateQuery2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  methods: {
	    updateQuery: function updateQuery(newQsObj) {
	      this.$router.go((0, _updateQuery3.default)(this.$route.path, newQsObj));
	    }
	  }
	};

/***/ },

/***/ 111:
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(122);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array == null ? 0 : array.length;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },

/***/ 113:
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to inspect.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(55),
	    arrayIncludes = __webpack_require__(112),
	    arrayIncludesWith = __webpack_require__(113),
	    arrayMap = __webpack_require__(29),
	    baseUnary = __webpack_require__(59),
	    cacheHas = __webpack_require__(60);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee == null ? value : iteratee(value);

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },

/***/ 118:
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(30),
	    isFlattenable = __webpack_require__(159);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(118),
	    baseIsNaN = __webpack_require__(126),
	    strictIndexOf = __webpack_require__(189);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  return value === value
	    ? strictIndexOf(array, value, fromIndex)
	    : baseFindIndex(array, baseIsNaN, fromIndex);
	}

	module.exports = baseIndexOf;


/***/ },

/***/ 126:
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.isNaN` without support for number objects.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	 */
	function baseIsNaN(value) {
	  return value !== value;
	}

	module.exports = baseIsNaN;


/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(36),
	    overRest = __webpack_require__(178),
	    setToString = __webpack_require__(182);

	/**
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  return setToString(overRest(func, start, identity), func + '');
	}

	module.exports = baseRest;


/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	var constant = __webpack_require__(191),
	    defineProperty = __webpack_require__(61),
	    identity = __webpack_require__(36);

	/**
	 * The base implementation of `setToString` without support for hot loop shorting.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var baseSetToString = !defineProperty ? identity : function(func, string) {
	  return defineProperty(func, 'toString', {
	    'configurable': true,
	    'enumerable': false,
	    'value': constant(string),
	    'writable': true
	  });
	};

	module.exports = baseSetToString;


/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(7),
	    isArguments = __webpack_require__(37),
	    isArray = __webpack_require__(3);

	/** Built-in value references. */
	var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value) ||
	    !!(spreadableSymbol && value && value[spreadableSymbol]);
	}

	module.exports = isFlattenable;


/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(111);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * A specialized version of `baseRest` which transforms the rest array.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @param {Function} transform The rest array transform.
	 * @returns {Function} Returns the new function.
	 */
	function overRest(func, start, transform) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = transform(array);
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = overRest;


/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString = __webpack_require__(139),
	    shortOut = __webpack_require__(183);

	/**
	 * Sets the `toString` method of `func` to return `string`.
	 *
	 * @private
	 * @param {Function} func The function to modify.
	 * @param {Function} string The `toString` result.
	 * @returns {Function} Returns `func`.
	 */
	var setToString = shortOut(baseSetToString);

	module.exports = setToString;


/***/ },

/***/ 183:
/***/ function(module, exports) {

	/** Used to detect hot functions by number of calls within a span of milliseconds. */
	var HOT_COUNT = 800,
	    HOT_SPAN = 16;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeNow = Date.now;

	/**
	 * Creates a function that'll short out and invoke `identity` instead
	 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
	 * milliseconds.
	 *
	 * @private
	 * @param {Function} func The function to restrict.
	 * @returns {Function} Returns the new shortable function.
	 */
	function shortOut(func) {
	  var count = 0,
	      lastCalled = 0;

	  return function() {
	    var stamp = nativeNow(),
	        remaining = HOT_SPAN - (stamp - lastCalled);

	    lastCalled = stamp;
	    if (remaining > 0) {
	      if (++count >= HOT_COUNT) {
	        return arguments[0];
	      }
	    } else {
	      count = 0;
	    }
	    return func.apply(undefined, arguments);
	  };
	}

	module.exports = shortOut;


/***/ },

/***/ 189:
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.indexOf` which performs strict equality
	 * comparisons of values, i.e. `===`.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function strictIndexOf(array, value, fromIndex) {
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = strictIndexOf;


/***/ },

/***/ 191:
/***/ function(module, exports) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new constant function.
	 * @example
	 *
	 * var objects = _.times(2, _.constant({ 'a': 1 }));
	 *
	 * console.log(objects);
	 * // => [{ 'a': 1 }, { 'a': 1 }]
	 *
	 * console.log(objects[0] === objects[1]);
	 * // => true
	 */
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	module.exports = constant;


/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(117),
	    baseFlatten = __webpack_require__(119),
	    baseRest = __webpack_require__(137),
	    isArrayLikeObject = __webpack_require__(195);

	/**
	 * Creates an array of `array` values not included in the other given arrays
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons. The order and references of result values are
	 * determined by the first array.
	 *
	 * **Note:** Unlike `_.pullAll`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = baseRest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});

	module.exports = difference;


/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(38),
	    isObjectLike = __webpack_require__(6);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _autoSyncWithQuery = __webpack_require__(44);

	var _autoSyncWithQuery2 = _interopRequireDefault(_autoSyncWithQuery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_autoSyncWithQuery2.default],
	  ready: function ready() {
	    this.autoSyncWithQuery();
	  },

	  props: {
	    total: { type: Number, required: true }
	  },
	  data: function data() {
	    return { offset$: 0 };
	  },
	  computed: {
	    limit: function limit() {
	      return +this.$route.query.limit || 5;
	    },
	    isFirstPage: function isFirstPage() {
	      return +this.offset$ === 0 || this.limit >= this.total;
	    },
	    isLastPage: function isLastPage() {
	      return +this.offset$ + this.limit >= this.total;
	    },
	    totalPageIdx: function totalPageIdx() {
	      return Math.ceil(this.total / this.limit) - 1;
	    },
	    curPageIdx: function curPageIdx() {
	      return Math.ceil(+this.offset$ / this.limit);
	    },
	    displayPageBtns: function displayPageBtns() {
	      var n = this.totalPageIdx + 1;
	      var i = this.curPageIdx + 1;
	      if (n <= 7) return function (n) {
	        var arr = [];
	        while (n) {
	          arr.unshift(n--);
	        }
	        return arr;
	      }(n);

	      if (i <= 3 || n - i < 3) return [1, 2, 3, 0, n - 2, n - 1, n];

	      if (i === 4) return [1, 2, 3, 4, 0, n - 1, n];

	      if (i === n - 3) return [1, 2, 0, i, n - 2, n - 1, n];

	      return [1, 0, i - 1, i, i + 1, 0, n];
	    }
	  },
	  methods: {
	    handleClick: function handleClick(n) {
	      this.offset$ = (n - 1) * this.limit;
	    },
	    turnPage: function turnPage(i) {
	      if (i < 0 && this.isFirstPage || i > 0 && this.isLastPage) return;
	      this.offset$ = +this.offset$ + i * this.limit;
	    }
	  }
	};

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _autoSyncWithQuery = __webpack_require__(44);

	var _autoSyncWithQuery2 = _interopRequireDefault(_autoSyncWithQuery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_autoSyncWithQuery2.default],
	  data: function data() {
	    return { limit$: 5 };
	  },
	  ready: function ready() {
	    this.autoSyncWithQuery();
	  }
	};

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(22);

	var _extends3 = _interopRequireDefault(_extends2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    model: { twoWay: true, default: function _default() {
	        return [];
	      } },
	    models: { twoWay: true, default: '' },
	    options: { type: Array, required: true },
	    valueField: { type: String, default: 'value' },
	    textField: { type: String, default: 'text' },
	    config: { type: Object, default: function _default() {
	        return {};
	      } }
	  },
	  computed: {
	    conf: function conf() {
	      return (0, _extends3.default)({
	        allowClear: true
	      }, this.config);
	    }
	  },
	  attached: function attached() {
	    this.init();
	  },

	  watch: {
	    options: function options() {
	      this.init();
	    },
	    model: function model(v) {
	      this.init();
	      this.syncModelsWithModel();
	    },
	    models: function models(v) {
	      this.syncModelWithModels();
	    }
	  },
	  methods: {
	    init: function init() {
	      var _this = this;

	      this.$nextTick(function () {
	        var $el = $(_this.$el);
	        $el.select2(_this.conf);
	        $el.on('change', function () {
	          return _this.model = $el.val();
	        });
	      });
	    },
	    syncModelsWithModel: function syncModelsWithModel() {
	      if (!this.config.multiple) return;

	      if (!this.model) this.model = [];
	      this.models = this.model.join(',');
	    },
	    syncModelWithModels: function syncModelWithModels() {
	      if (!this.config.multiple) return;
	      this.model = this.models.split(',');
	    }
	  }
	};

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Select = __webpack_require__(297);

	var _Select2 = _interopRequireDefault(_Select);

	var _autoSyncWithQuery = __webpack_require__(44);

	var _autoSyncWithQuery2 = _interopRequireDefault(_autoSyncWithQuery);

	var _msgService = __webpack_require__(1);

	var _msgService2 = _interopRequireDefault(_msgService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_autoSyncWithQuery2.default],
	  components: { Select2: _Select2.default },
	  data: function data() {
	    return { authors$: '', authorList: [] };
	  },
	  computed: {
	    opts: function opts() {
	      return this.authorList.map(function (author) {
	        return { value: author, text: author };
	      });
	    }
	  },
	  attached: function attached() {
	    $(this.$els.addon).tooltip();
	  },
	  ready: function ready() {
	    this.autoSyncWithQuery();

	    if (_msgService2.default.authorList) return this.authorList = _msgService2.default.authorList;

	    this.loadOptions();
	  },

	  methods: {
	    loadOptions: function loadOptions(shouldNotify) {
	      var _this = this;

	      _msgService2.default.fetchAuthorList().then(function (authorList) {
	        _this.authorList = _msgService2.default.authorList = authorList;

	        shouldNotify && $.toast({
	          heading: '已刷新', icon: 'success', stack: false
	        });
	      });
	    }
	  }
	};

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Pagination = __webpack_require__(295);

	var _Pagination2 = _interopRequireDefault(_Pagination);

	var _LimitSelect = __webpack_require__(296);

	var _LimitSelect2 = _interopRequireDefault(_LimitSelect);

	var _AuthorSelect = __webpack_require__(303);

	var _AuthorSelect2 = _interopRequireDefault(_AuthorSelect);

	var _OptBtnGroup = __webpack_require__(16);

	var _OptBtnGroup2 = _interopRequireDefault(_OptBtnGroup);

	var _updateQuery = __webpack_require__(75);

	var _updateQuery2 = _interopRequireDefault(_updateQuery);

	var _msgService = __webpack_require__(1);

	var _msgService2 = _interopRequireDefault(_msgService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_updateQuery2.default],
	  components: { Pagination: _Pagination2.default, LimitSelect: _LimitSelect2.default, AuthorSelect: _AuthorSelect2.default, OptBtnGroup: _OptBtnGroup2.default },
	  data: function data() {
	    return { total: 0, msgs: [] };
	  },
	  route: {
	    data: function data() {
	      var _this = this;

	      _msgService2.default.fetchList(this.$route.query).then(function (_ref) {
	        var total = _ref.total;
	        var rows = _ref.rows;

	        _this.total = total;
	        _this.msgs = rows;
	      });
	    }
	  },
	  filters: {
	    cutLongText: function cutLongText(txt) {
	      var limit = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

	      return txt.length > limit ? txt.substr(0, limit) + '···' : txt;
	    }
	  },
	  events: {
	    REFETCH_LIST: function REFETCH_LIST() {
	      this.updateQuery({ _: Date.now() });
	    }
	  }
	};

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(22);

	var _extends3 = _interopRequireDefault(_extends2);

	exports.default = updateQuery;

	var _qs = __webpack_require__(42);

	var _qs2 = _interopRequireDefault(_qs);

	var _pickBy2 = __webpack_require__(41);

	var _pickBy3 = _interopRequireDefault(_pickBy2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function updateQuery(url, newQsObj) {
	  var _url = url.split('?');
	  var path = _url[0];
	  var curQs = _url[1];

	  var newQs = _qs2.default.stringify((0, _pickBy3.default)((0, _extends3.default)({}, _qs2.default.parse(curQs), newQsObj), function (v) {
	    return v;
	  }), { encode: false });
	  return newQs ? path + '?' + newQs : path;
	}

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(237), __esModule: true };

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(77);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(262);
	module.exports = __webpack_require__(14).Object.keys;

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(48)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(24);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(84)
	  , $keys    = __webpack_require__(81);

	__webpack_require__(252)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },

/***/ 265:
263,

/***/ 270:
263,

/***/ 272:
263,

/***/ 278:
/***/ function(module, exports) {

	module.exports = "\n<ul class=\"pagination m-t-0\">\n  <li :class=\"{ 'disabled': isFirstPage }\"\n    @click=\"turnPage(-1)\">\n    <a href=\"javascript:;\">\n      <i class=\"fa fa-arrow-left\"></i>\n    </a>\n  </li>\n  <li v-for=\"i in displayPageBtns\" track-by=\"$index\"\n    :class=\"{ 'active': i === curPageIdx + 1 }\">\n    <a v-if=\"i\" href=\"javascript:;\" @click=\"handleClick(i)\">\n      {{ i }}\n    </a>\n    <a v-else>···</a>\n  </li>\n  <li :class=\"{ 'disabled': isLastPage }\"\n    @click=\"turnPage(1)\">\n    <a href=\"javascript:;\">\n      <i class=\"fa fa-arrow-right\"></i>\n    </a>\n  </li>\n</ul>\n";

/***/ },

/***/ 279:
/***/ function(module, exports) {

	module.exports = "\n<label>\n  每页显示\n  <select\n    class=\"form-control input-sm inline-select\"\n    v-model=\"limit$\">\n    <option value=\"5\">5</option>\n    <option value=\"10\">10</option>\n    <option value=\"20\">20</option>\n    <option value=\"40\">40</option>\n    <option value=\"80\">80</option>\n    <option value=\"100\">100</option>\n  </select>\n条</label>\n";

/***/ },

/***/ 280:
/***/ function(module, exports) {

	module.exports = "\n<select v-model=\"model\" :multiple=\"conf.multiple\" :style=\"{ width: conf.width || '100%' }\">\n  <option v-for=\"opt in options\" :value=\"opt[valueField]\">\n    {{ opt[textField] }}\n  </option>\n</select>\n";

/***/ },

/***/ 286:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"input-group\">\n  <div v-el:addon @dblclick=\"loadOptions(true)\"\n    class=\"input-group-addon clickable unselectable\"\n    data-toggle=\"tooltip\" title=\"双击我刷新下拉框\">\n    <i class=\"fa fa-filter\"></i>\n    筛选发布者:\n  </div>\n  <select2\n    :models.sync=\"authors$\"\n    :options=\"opts\"\n    :config=\"{ multiple: true, placeholder: '请选择发布者...' }\">\n  </select2>\n</div>\n";

/***/ },

/***/ 290:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-5 col-lg-4\">\n      <author-select></author-select>\n    </div>\n    <div v-if=\"$root.userData\" class=\"col-sm-6 col-md-7 col-lg-8 clearfix\">\n      <a v-link=\"`/msg/add`\" class=\"btn btn-default btn-sm pull-right\">\n        <span class=\"fa-stack m-r-5\">\n          <i class=\"fa fa-comment-o fa-stack-2x\"></i>\n          <i class=\"fa fa-plus fa-stack-1x\"></i>\n        </span>\n        添加留言信息\n      </a>\n    </div>\n  </div>\n  \n  <div class=\"row min-h-180\">\n    <div class=\"col-sm-12\">\n      <ul class=\"list-group m-t-5\">\n        <li v-for=\"msg in msgs\" class=\"list-group-item clearfix\" track-by=\"id\">\n          <h4 class=\"list-group-item-heading\">\n            <a v-link=\"`/msg/detail/${msg.id}`\">\n              {{ msg.title | cutLongText }}\n            </a>\n            <small class=\"italic\"> by\n              <a v-link=\"{ path: '/msg', query: { authors: msg.author } }\">\n                {{ msg.author }}\n              </a>\n            </small>\n            <span class=\"badge pull-right\">\n              {{ msg.ctime | dateTimeFormatter }}\n            </span>\n          </h4>\n          <small class=\"list-group-item-text\">\n            {{ msg.content | cutLongText 20 }}\n          </small>\n          <opt-btn-group class=\"pull-right btn-group-xs\" :msg=\"msg\">\n            <a v-link=\"`/msg/detail/${msg.id}`\" class=\"btn btn-default\">\n              <i class=\"fa fa-search-plus\"></i>\n            </a>\n          </opt-btn-group>\n        </li>\n      </ul>\n\n      <h4 v-show=\"!total\" class=\"text-muted text-center line-h-150 italic\">\n        （暂无留言信息）\n      </h4>\n    </div>\n  </div>\n  \n  <div class=\"row\">\n    <div class=\"col-sm-6 nowrap\">\n      共 <span class=\"badge\">{{ total }}</span> 条记录，\n      <limit-select></limit-select>\n    </div>\n    <div class=\"col-sm-6 clearfix\">\n      <pagination :total=\"total\" class=\"pull-right\"></pagination>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(207)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Pagination.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(278)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(265)
	__vue_script__ = __webpack_require__(208)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Select\\LimitSelect.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(279)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(209)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\Select\\Select2.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(280)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(270)
	__vue_script__ = __webpack_require__(214)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\_components\\AuthorSelect.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(286)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(272)
	__vue_script__ = __webpack_require__(217)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(290)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})


/***/ }

});