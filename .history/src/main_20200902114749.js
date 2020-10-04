import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
Vue.component('chart', ECharts)
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$echarts = echarts;

作者： 六小登登
链接： https: //www.imooc.com/article/267202?block_id=tuijian_wz
  来源： 慕课网
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')