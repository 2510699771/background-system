import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from "v-charts"
import echarts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')