<template>
 <div>
商品列表
 </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("permissions");
const { mapState: userState, mapActions: userActions } = userModule;
 export default {
   name: '',
//接受父组件传递的数据
   props: {
   },
//注册组件
   components: {

   },
   data () {
     return {

     }
   },
   methods: {
    //方法展开
    ...userActions(["getRoles"]),
   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>

</style>