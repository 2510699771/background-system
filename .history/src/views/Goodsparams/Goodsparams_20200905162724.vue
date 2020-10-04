<template>
  <el-card class="box-card">
    <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" :closable="false" show-icon></el-alert>
    <el-form style="margin-top:20px">
      <el-form-item label="选择商品分类">
        <el-cascader v-model="value" :options="orieslist" @change="mangchose"></el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" size="mini" :disabled="addattribute">添加参数</el-button>

  <myfrom
    :roleList="allrole"
    :columns="columns"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :total="allrole.length" 
    :showPaging="showPaging"
    :indexOptions="indexOptions"
    :table="table"
  >
    <template v-slot:state="scope">
      <el-switch v-model="scope.scope.row.mg_state"></el-switch>
    </template>
    <template v-slot:tag="scope">
      <div v-if="scope.scope.row.lev===1">
        <el-tag type="success">{{scope.scope.row.level}}</el-tag>
      </div>
      <div v-if="scope.scope.row.lev===2">
        <el-tag type="info">{{scope.scope.row.level}}</el-tag>
      </div>
      <div v-if="scope.scope.row.lev===3">
        <el-tag type="warning">{{scope.scope.row.level}}</el-tag>
      </div>
      <div v-if="scope.scope.row.lev===4">
        <el-tag type="danger">{{scope.scope.row.level}}</el-tag>
      </div>
    </template>
    <!-- <template v-slot:action="scope">
      <el-button type="primary" size="mini" @click="editor(scope.scope.row)">编辑</el-button>
      <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
      <el-button type="warning" size="mini" @click="c(scope.scope)">分配权限</el-button>
    </template>-->
  </myfrom>

      </el-tab-pane>

      <el-tab-pane label="静态属性" name="second">
        <el-button type="primary" size="mini" :disabled="addattribute">添加属性</el-button>




      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("good");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      activeName: "first", //静态参数为首页
      value: [], //多级选择绑定内容
      type: [1, 2],
      pagenum: "",
      pagesize: "",
      addattribute: true, //添加属性
    };
  },
  methods: {
    //方法展开
    ...userActions(["categories", "getcategories", "addgoods"]),
    mangchose(val) {
      console.log(val);
      if (val) {
        this.addattribute = false;
      }
    },
    handleClick() {},
  },
  mounted() {
    this.categories({
      type: this.type,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["orieslist", "parameter"]),
  },
};
</script>

<style scoped lang='scss'>
</style>