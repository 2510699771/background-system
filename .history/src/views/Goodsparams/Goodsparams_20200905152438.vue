<template>
 <div>
分类参数
 </div>
 <el-card class="box-card">
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</template>

<script>
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