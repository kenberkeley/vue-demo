webpackJsonp([2,8],{

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

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _msgService = __webpack_require__(1);

	var _msgService2 = _interopRequireDefault(_msgService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  route: {
	    activate: function activate(_ref) {
	      var _this = this;

	      var next = _ref.next;

	      _msgService2.default.fetchById(this.$route.params.msgId).then(function (msg) {
	        _this.msg = msg;
	        _this.$emit('MSG_LOADED');
	        next();
	      });
	    }
	  }
	};

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _OptBtnGroup = __webpack_require__(16);

	var _OptBtnGroup2 = _interopRequireDefault(_OptBtnGroup);

	var _autoLoadByParams = __webpack_require__(47);

	var _autoLoadByParams2 = _interopRequireDefault(_autoLoadByParams);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_autoLoadByParams2.default],
	  components: { OptBtnGroup: _OptBtnGroup2.default },
	  data: function data() {
	    return { msg: {} };
	  },
	  computed: {
	    isMine: function isMine() {
	      var author = this.msg.author;
	      var userData = this.$root.userData;

	      if (!author || !userData) return;
	      return author === userData.username;
	    }
	  }
	};

/***/ },

/***/ 271:
263,

/***/ 288:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"panel panel-default\">\n  <div class=\"panel-heading clearfix\">\n    标题：<strong>{{ msg.title }}</strong>\n    <span class=\"badge pull-right\">\n      {{ msg.ctime | dateTimeFormatter }}\n    </span>\n    <br>\n    发布者：\n    <a v-link=\"`/msg?authors=${msg.author}`\">\n      {{ msg.author }}\n    </a>\n  </div>\n  <div class=\"panel-body min-h-160 max-h-300 overflow-fix\">\n    <p class=\"lead\">{{ msg.content }}</p>\n  </div>\n  <div class=\"clearfix\">\n    <div class=\"pull-right m-t-5\">\n      <opt-btn-group\n        :msg=\"msg\" :auto-jump=\"true\">\n      </opt-btn-group>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(271)
	__vue_script__ = __webpack_require__(216)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\detail.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(288)
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