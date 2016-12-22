# § URL 就是应用的状态

在上篇[**谈状态管理**](./State-management.md)中，我们总结了没有引入 Vuex 的原因  
其实还有一个很重要的原因：我们使用了 `vue-router`，因此完全可以操控 URL 以表示应用的状态

例如，我们在 Google 输入框输入 `vue`，敲下回车，就跳转到了搜索结果的页面，此时 URL 是：  
`https://www.google.com/?gws_rd=cr,ssl#newwindow=1&safe=strict&q=vue`  
关键点是：`{ q: 'vue' }`

点击下一页（第 2 页）：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=10`  
关键点是：`{ q: 'vue', start: 10 }`

再点击下一页（第 3 页）：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=20`  
关键点是：`{ q: 'vue', start: 20 }`

既然我们发现了这种规律，那么直接访问：  
`https://www.google.com/?gws_rd=cr,ssl#q=vue&newwindow=1&safe=strict&start=30`  
显然就是第 4 页的搜索结果

综上：URL 可以表现应用的状态，而且在一定程度上，URL 就是应用状态的最佳表现形式

> 例如，https://github.com/kenberkeley 表示 kenberkeley 的 profile  
> 又例如，https://github.com/kenberkeley/vue-demo/issues/1 表示 vue-demo 的第一个 issue
>   
> 就连微信这种原生 APP，也有使用 URL 表征应用的状态（URL Schemes）  
> 例如访问 `weixin://dl/moments` 就会跳转到朋友圈页面 (不过当前微信已屏蔽掉这类链接的访问)

***

`vue-router` 提供的 [`data`](https://github.com/vuejs/vue-router/blob/1.0/docs/zh-cn/pipeline/data.md) 函数，极其方便地让我们响应路由的变化以进行 xhr 请求