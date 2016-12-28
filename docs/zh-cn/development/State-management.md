# § 谈状态管理

Vue 参照 [Flux](https://github.com/facebook/flux) / [Redux](https://github.com/reactjs/redux)，实现出 [Vuex](https://github.com/vuejs/vuex)，专注于**应用层级**的状态管理。
我们并没有引入 Vuex ，主要是基于以下考量：

如果您看过最简单的例子 [Example·Counter](https://github.com/vuejs/vuex/tree/dev/examples/counter)，您应该会觉得 Vuex 把简单问题复杂化了（的确如此）。为了实现全局状态管理，把原本简单纯粹的双向绑定以及操作方法都剥离开来，抽象成 Vuex 的 `state / mutation / action`。对于绝大部分中小型项目而言，这显然是过度设计，牛刀杀鸡。

对于这个问题，作者尤雨溪有如下评述：
> &nbsp;&nbsp;&nbsp;当你的应用还很简单的时候，你多半并不需要 Vuex。也不建议过早地使用  Vuex。但如果你正在构建一个中型以上规模的 SPA，你很有可能已经需要思考应该如何更好地归纳 Vue 之外，应用的其他组成部分。这就是 Vuex 要大显身手的时刻。  
&nbsp;&nbsp;&nbsp;我们在单独使用 Vue.js 的时候，通常会把状态储存在组件的内部。也就是说，每一个组件都拥有当前应用状态的一部分，整个应用的状态是分散在各个角落的。然而我们经常会需要把状态的一部分共享给多个组件。一个常见的解决策略为：使用定制的事件系统，让一个组件把一些状态“发送”到其他组件中。这种模式的问题在于，大型组件树中的事件流会很快变得非常繁杂，并且调试时很难去找出究竟哪错了。  
&nbsp;&nbsp;&nbsp;为了更好的解决在大型应用中状态的共用问题，我们需要对组件的 组件本地状态（component local state）和 应用层级状态（application level state）进行区分。应用级的状态不属于任何特定的组件，但每一个组件仍然可以监视（Observe）其变化从而响应式地更新 DOM。通过汇总应用的状态管理于一处，我们就不必到处传递事件。因为任何牵扯到一个以上组件的逻辑，都应该写在这里。此外，这样做也能让我们更容易地记录并观察状态的变更（Mutation，原意为突变），甚至可以实现出华丽如时光旅行一般的调试效果。

React 作为一个 View 层，不具备数据的双向绑定能力，其数据流是单向的。既然是**单向数据流**，那么将整个应用状态汇于一处集中管理（这就是传统意义上的 Model 层，只是改名为 Store 层罢了），抽离出操作方法等（Controller 层，在此为 Action 与 Reducer 层），也是自然而然的。这是基于大型项目协作开发中，前人踩坑后的最佳经验总结，同时也是当前前端 MVC 的最佳实践。

但 Vue 乃轻量级的 MVVM 框架，若完全照搬相对抽象的 Flux / Redux 架构，未免有点舍本逐末了。私认为，对于一个使用 MVVM 模式构建的单页应用而言，需要置于 Store 层的，仅限于**全局通用**且**状态持久**的数据（例如用户认证信息）。若把所有应用数据（尤指一些实时性较高的数据以及非共享的数据）都糅合在一处，那就像是把所有变量都挂载到全局。

> 「**Local state is fine**」，见 Redux 作者 Dan Abramov 的 [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)

结合尤大的说法，Vue 状态管理的最佳实践应为：**组件自包含状态数据（组件本地状态），全局持久性通用数据（应用层级状态）集中管理**。

***

可是，**全局通用**且**状态持久**的数据占极少数，若为此而引入 Vuex，实在是太不值得了。  
这个时候，就需要借鉴 AngularJS 的一些经验实践来实现 Vuex 的状态存储功能：

在 Angular 1.x 中，组件状态一般是挂载到 `$scope` 上，对应着 Vue 组件内部的 `$data`。  
若是全局通用（包括模板中）需要用到的状态数据，就挂载到 `$rootScope` 上，对应着 Vue 根组件的 `$data`。  
由此，在 Vue 组件中，直接使用 **`this.$root`** 即可访问全局状态。

***

结合实际情况，我们需要的可能不是炫酷的“时光旅行”，皆因 [Devtools](https://github.com/vuejs/vue-devtools) 与代码热更替已经带给我们足够好的开发体验。结构约定俗成，条理清晰；代码风格统一，高内聚低耦合；容易上手、接手与维护······ 最理想的状态也莫过于此。引入 Vuex，虽可使数据流动明确，但破坏了组件的直观性，尤其是团队水平参差不齐的情况下，全局的状态管理很容易成为项目开发与维护的负担。就像 Vuex [文档](http://vuex.vuejs.org/zh-cn/intro.html)中提到的：

> 虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。 
>  
> 如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 [global event bus](http://vuejs.org/guide/components.html#Non-Parent-Child-Communication) 就足够您所需了。但是，如果您需要构建是一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：
> 
> Flux 架构就像眼镜：您自会知道什么时候需要它。

在此安利一波我写的 [Redux 教程](https://github.com/kenberkeley/redux-simple-tutorial)，可以让您快速理解 Flux 架构究竟好在哪。
