import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from "v-charts"
import echarts from 'echarts'
import MyFron from './components/MyFrom/MyFrom'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.components("yron", MyFron);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')