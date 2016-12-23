# § Ajax 接口

```
[路由页面组件 A [普通组件 B [普通组件 C]] ...]
      ↕             ↕          ↕
------------------------------------------
| aService      bService   cService      |  服务层
------------------------------------------
      ↕             ↕          ↕
------------------------------------------
|                  xhr                   |  Ajax 接口
------------------------------------------
                    ↕
                   API
```

```
/**
 * xhr 接口（详见 src/services/xhr/index.js）
 * @param  {String} options.method 请求方法（默认为 get）
 * @param  {String} options.url    请求路径（基于 rootPath 地址）
 * @param  {Object} options.body   请求体（例如后端 Express 可使用 req.body 获取该对象）
 * @return {Promise}
 */
```

封装 xhr 接口的好处是显而易见的：
* 若项目升级需要替换 Ajax 请求库，则仅需要重新实现 xhr 即可，服务层与组件层完全不需要改动
* 统一化处理：自定义拦截、API 格式变更、数据格式转换、错误处理、mock 等
