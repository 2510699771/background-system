import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myCharts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(myCharts)

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')