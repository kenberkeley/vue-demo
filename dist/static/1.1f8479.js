webpackJsonp([1,8],{

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

/***/ 43:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: {
	    msg: { type: Object, required: true, twoWay: true }
	  },
	  computed: {
	    allowToSubmit: function allowToSubmit() {
	      var _msg = this.msg;
	      var title = _msg.title;
	      var content = _msg.content;

	      return title && content;
	    }
	  }
	};

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

/***/ 51:
263,

/***/ 52:
/***/ function(module, exports) {

	module.exports = "\n<form @submit.prevent class=\"p-10\">\n  <div class=\"form-group\">\n    <label for=\"title\">标题</label>\n    <input type=\"text\" v-model=\"msg.title\" id=\"title\"\n      class=\"form-control\" placeholder=\"请输入标题...\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"content\">内容</label>\n    <textarea v-model=\"msg.content\" id=\"content\" required\n      class=\"form-control\" rows=\"5\" placeholder=\"请输入留言信息...\"\n    ></textarea>\n  </div>\n  <div class=\"clearfix\">\n    <div class=\"pull-right\">\n      <span v-show=\"allowToSubmit\">\n        <slot name=\"opt\"><!-- 操作按钮插槽 --></slot>\n      </span>\n      <span v-show=\"!allowToSubmit\">\n        <button class=\"btn\" disabled>\n          <i class=\"fa fa-pencil-square-o m-r-5\"></i>\n          请完整填写表单\n        </button>\n      </span>\n    </div>\n  </div>\n</form>\n";

/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(51)
	__vue_script__ = __webpack_require__(43)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\_components\\MsgForm.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(52)
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

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _MsgForm = __webpack_require__(53);

	var _MsgForm2 = _interopRequireDefault(_MsgForm);

	var _OptBtnGroup = __webpack_require__(16);

	var _OptBtnGroup2 = _interopRequireDefault(_OptBtnGroup);

	var _msgService = __webpack_require__(1);

	var _msgService2 = _interopRequireDefault(_msgService);

	var _autoLoadByParams = __webpack_require__(47);

	var _autoLoadByParams2 = _interopRequireDefault(_autoLoadByParams);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_autoLoadByParams2.default],
	  components: { MsgForm: _MsgForm2.default, OptBtnGroup: _OptBtnGroup2.default },
	  data: function data() {
	    return { msg: {} };
	  },
	  methods: {
	    handleSubmit: function handleSubmit() {
	      var _this = this;

	      _msgService2.default.update(this.msg).then(function (_ref) {
	        var id = _ref.id;

	        $.toast({
	          heading: '更新成功',
	          text: '已自动跳转到详情页',
	          icon: 'success'
	        });
	        _this.$router.replace('/msg/detail/' + id);
	      });
	    }
	  },
	  events: {
	    MSG_LOADED: function MSG_LOADED() {
	      if (this.msg.author !== this.$root.userData.username) {
	        $.toast({ heading: '非法访问', icon: 'error' });
	        this.$router.replace('/msg');
	      }
	    }
	  }
	};

/***/ },

/***/ 291:
/***/ function(module, exports) {

	module.exports = "\n<div>\n  <msg-form :msg.sync=\"msg\">\n    <opt-btn-group slot=\"opt\"\n      :msg=\"msg\"\n      :edit-btn=\"false\"\n      :auto-jump=\"true\">\n      <button @click=\"handleSubmit\"\n        type=\"button\" class=\"btn btn-default\">\n        <i class=\"fa fa-floppy-o\"></i>\n      </button>\n    </opt-btn-group>\n  </msg-form>\n</div>\n";

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(218)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\msg\\update.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(291)
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