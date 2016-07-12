## CROS（跨域）
本示例项目前后端异服务器，因此后端Node.js服务器必须设置跨域相关项：
```javascript
// vue-starter-backend/middlewares/crossDomain.js
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
res.setHeader('Access-Control-Allow-Credentials', true);
...
```
而且，您必须处理浏览器的[`preflight OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)请求，否则会报错：
```
XMLHttpRequest cannot load http://localhost:9000/XXX. Response for preflight has invalid HTTP status code 404
```
在`vue-starter-backend`中的处理是：
```javascript
// preflight OPTIONS request handler
if (req.method === 'OPTIONS') {
  return res.send(true);
}
```
请根据实际情况自行处理

## 模板绑定中莫名的报错
在部分模板中，有如下处理：
```html
<!-- 这里加@click.stop主要是因为会莫名报错，可能是因为使用了BootStrap的缘故 -->
<!-- 错误详情：Uncaught TypeError: a.getAttribute is not a function  jquery.min.js:2-->
<a @click.stop
  v-link="{ name: 'detailMsg', params: { msgId: msg.id } }">
  <b>{{ msg.title }}</b>
</a>
```
