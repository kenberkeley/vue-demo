// https://github.com/tildeio/route-recognizer 路由库
var router = require('RouteRecognizer');
// https://github.com/typicode/lowdb 前后端通用的微型数据库 
var lowdb = require('lowdb');

// 数据库实例（db.json 为数据文件名或 LocalStorage 键名）
var db = lowdb('db.json');
db.defaults({ msgs: [], session: null }).value(); // 默认值

router.add([{
  path: '/msg',
  handler: {
    GET: function () {

    },
    POST: function () {

    }
  }
}]);

router.add([{
  path: '/msg/:msgId',
  handler: {
    GET: function () {

    },
    PUT: function () {

    },
    DELETE: function () {

    }
  }
}]);

router.add([{
  path: '/user/checkLogin',
  handler: {
    GET: function () {

    }
  }
}]);

router.add([{
  path: '/user/login',
  handler: {
    POST: function () {

    }
  }
}]);

router.add([{
  path: '/user/logout',
  handler: {
    DELETE: function () {

    }
  }
}]);
