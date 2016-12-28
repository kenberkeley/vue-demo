# § 跨域与代理

目前主要是两种方案：直接跨域与代理转发

### ⊙ 直接跨域（不推荐）
```
xhr 接口  <--（直接跨域）--> API 服务器
```

> 开发过程中，Chrome 可以使用 [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) 插件解除同源策略的限制

### ⊙ 代理转发（推荐）
```
xhr 接口 <--（开发服务器代理转发）--> API 服务器
```

> 实际上 `xhr 接口` 与 `开发服务器` 中间还有一层 [`BrowserSync`](https://browsersync.io/) 代理（用于多端联合同步调试），但与本篇讨论的跨域代理无关

***

#### 相关配置
* `xhr 接口`：见 `src/services/xhr/`  
* `开发服务器代理转发`：见 `build/dev.js` 中使用 [`http-proxy-middleware`](https://github.com/chimurai/http-proxy-middleware) 实现
* `BrowserSync`：见 `build/webpack.dev.conf.js` 中的 [`BrowserSyncPlugin`](https://github.com/Va1/browser-sync-webpack-plugin) 配置
* 上述各项服务的端口配置：`build/config/PORTS.js`

#### 生产环境下的代理
一般是使用 Nginx 部署 `dist/`，配置 `proxy_pass` 到对应的后端服务（详情请自行查阅相关资料）
