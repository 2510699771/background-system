import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from "v-charts"
import echarts from 'echarts'
import MyFrom from './components/MyFrom/MyFrom'
import Mydialog from './components/Mydialog/Mydialog'
import ZkTable from 'vue-table-with-tree-grid'
import qs from 'qs'
import "./bus"
// import draggable from 'vuedraggable'

Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.component("myfrom", MyFrom);
Vue.component("mydialog", Mydialog);
Vue.component('tree-table', ZkTable)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')