# § 跨域与代理

目前主要是两种方案：跨域与代理

## ⊙ 跨域（不推荐）
```
        xhr 接口  <--------（跨域）--------> API 服务器
           ↕
   BrowserSync 多端调试服务
           ↕
        开发服务器
```

> Chrome 可以使用 [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) 插件解除同源策略的限制

## ⊙ 代理（推荐）
```
        xhr 接口
           ↕
   BrowserSync 多端调试服务
           ↕
        开发服务器
           ↑
           |（代理）
           ↓
        API 服务器
```

***

> xhr 接口的配置位于 `src/services/xhr/config.js`  
> BrowserSync 的基本配置位于 `build/webpack.dev.conf.js`  
> 开发服务器的基本配置位于 `build/dev.js`  
> 上述所有服务的端口配置位于 `build/config/PORTS.js`
