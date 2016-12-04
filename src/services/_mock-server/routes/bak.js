var RouteRecognizer = require('route-recognizer');
var router = new RouteRecognizer();

router.add([
  { path: '/msg', method: 'get', handler: {} }
]);

router.add([
  { path: '/msg/:msgId', handler: function(){} }
]);

router.add([
  { path: '/msg/sss/:sss', handler: function(){} }
]);

console.log(router.recognize('/msg/1122?offset=200'))

// router.add([{ path: "/posts/edit", handler: function(){} }]);
// router.add([{ path: "/posts/:id", handler: function(){} }]);
// router.add([{ path: "/posts/new", handler: function(){} }]);

// var result1 = router.recognize("/posts/edit");
// console.log(result1)


// console
// 
{ '0': 
   { handler: [Function],
     params: { msgId: '1122' },
     isDynamic: true },
  queryParams: { offset: '200' },
  length: 1 }
[Finished in 0.2s]