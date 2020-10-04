<template>
  <el-card>
    <div>
      <div style="margin-bottom:20px">
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
      <!-- 表格组件(全) -->
      <myfrom
        :roleList="roleList"
        :columns="columns"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="roleList.length"
        :showPaging="showPaging"
        :indexOptions="indexOptions"
        :table="table"
        :expandOptions="expandOptions"
      >
        <!-- 开关插槽 -->
        <template v-slot:state="scope">
          <el-switch v-model="scope.scope.row.mg_state"></el-switch>
        </template>
        <!-- 展开表格行插槽 -->
        <template v-slot:expand="scope">
          <div v-if="scope.scope.row.children.length===0">暂无数据</div>
          <div
            v-else
            v-for="item in scope.scope.row.children"
            :key="item.id"
            style="display:flex;align-items: center;border-top:1px solid #eee"
          >
            <div style="width:20vw">
              <el-tag
                closable
                type="primary"
                @close="guanbi(item,scope.scope.row,)"
              >{{item.authName}}</el-tag>
              <i class="el-icon-caret-right"></i>
            </div>
            <div>
              <div
                v-for="ite in item.children"
                :key="ite.id"
                style="align-items: center;width:100%;display:flex;padding:20px 0;border-bottom:1px solid #eee"
              >
                <div style="width:20vw">
                  <el-tag
                    closable
                    type="success"
                    @close="guanbi(ite,scope.scope.row)"
                  >{{ite.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </div>
                <div style="display:flex;flex-wrap:wrap;width:700px">
                  <div v-for="it in ite.children" :key="it.id" style="margin:10px">
                    <div>
                      <el-tag
                        closable
                        type="warning"
                        @close="guanbi(it,scope.scope.row)"
                      >{{it.authName}}</el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 操作按钮插槽 -->
        <template v-slot:action="scope">
          <el-button type="primary" size="mini" @click="editor(scope.scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(scope.scope)">删除</el-button>
          <el-button type="warning" size="mini" @click="distributionclick(scope.scope)">分配权限</el-button>
        </template>
      </myfrom>

      <!-- 对话框组件(全) -->
      <mydialog
        :Visible.sync="Visible"
        :Dialogfrom="Dialogfrom"
        @cancel="cancel"
        @confirm="confirm"
        @Visible="present"
        :title="title"
      >
        <!-- <template v-slot:footer>
          <el-button >取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </template>-->
      </mydialog>

      <!-- 对话框组件 -->
      <mydialog
        :Visible.sync="Visible1"
        :Dialogfrom="Dialogfrom1"
        @cancel="cancel"
        @confirm="add"
        @Visible="present"
        :title="title1"
      ></mydialog>

      <!-- 分配权限 -->
      <div v-if="openpermissions">
        <el-dialog title="分配权限" :visible.sync="openpermissions" :before-close="handleClose">
          <el-tree
            :data="distribution"
            show-checkbox
            node-key="id"
            res
            :default-expanded-keys="keyid"
            :default-checked-keys="keyid"
            :props="defaultProps"
            empty-text="暂无数据"
          ></el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="treeok = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("permissions");
const { mapState: userState, mapActions: userActions } = userModule;
export default {
  name: "",
  //接受父组件传递的数据
  props: {},
  //注册组件
  components: {},
  data() {
    return {
      keyid: [], //分配权限高亮的内容(唯一标识符)
      expandOptions: true, //是否展示表格的行展开
      id: "", //编辑提交角色id
      type: "tree",
      openpermissions: false,
      defaultProps: {
        children: "children",
        label: "authName",
      },
      //表格的配置项
      columns: [
        {
          label: "职位",
          prop: "roleName",
          align: "center",
        },
        {
          label: "描述",
          prop: "roleDesc",
          align: "center",
        },
        // {
        //   label: "状态",
        //   align: "center",
        //   prop: "ms",
        //   width: "400",
        //   slots: "state",
        // },
        {
          label: "操作",
          align: "center",
          slots: "action",
        },
      ],

      //table配置
      table: {
        //是否创建带斑马纹
        stripe: true,
        //是否需要竖直方向的边框
        border: true,
        //Table 的尺寸medium / small / mini
        size: "medium",
      },

      //表格配置
      indexOptions: {
        label: "#",
        align: "center",
        indexMethod: 0,
        showIndex: true,
      },
      //是否展示分页
      showPaging: false,
      //第几页
      currentPage: 1,
      //每页数据数量
      pageSizes: [5, 10, 20, 30],
      //默认每页多少条数据
      pageSize: 5,

      //编辑对话框是否打开
      Visible1: false,
      //对话框标题
      title1: "编辑角色",
      dialogWidth: "800px",
      //添加对话框配置内容
      Dialogfrom1: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "角色名",
          value: "",
          //验证规则
          prop: "rolename",
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
          },
        },
        {
          type: "input",
          lable: "角色描述",
          prop: "roledescribe",
          value: "",
          rules: [],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
          },
        },
      ],
      //编辑对话框是否打开
      Visible: false,
      //对话框标题
      title: "编辑角色",

      //对话框配置内容
      Dialogfrom: [
        //单个输入框配置项目
        {
          type: "input",
          lable: "角色名",
          value: "",
          //验证规则
          prop: "rolename",
          rules: [
            {
              required: true,
              message: "角色名不能为空",
              trigger: "blur",
            },
          ],
          //attrs内写输入框的单个配置
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
          },
        },
        {
          type: "input",
          lable: "角色描述",
          prop: "roledescribe",
          value: "",
          rules: [
            {
              required: true,
              message: "描述不能为空",
              trigger: "blur",
            },
          ],
          attrs: {
            placeholder: "请输入",
            //清空输入框图标
            clearable: true,
            "show-password": false,
          },
        },
        // {
        //   type: "select",
        //   lable: "角色描述",
        //   prop: "chose",
        //   value: "",
        //   attrs: {
        //     placeholder: "请选择",
        //     //清空输入框图标
        //     clearable: false,
        //     "show-password": false,
        //   },
        //   children: [
        //     {
        //       type: "option",
        //       value: "选项1",
        //       label: "黄金糕",
        //     },
        //     {
        //       type: "option",
        //       value: "选项2",
        //       label: "双皮奶",
        //     },
        //     {
        //       type: "option",
        //       value: "选项3",
        //       label: "蚵仔煎",
        //     },
        //     {
        //       type: "option",
        //       value: "选项4",
        //       label: "龙须面",
        //     },
        //     {
        //       type: "option",
        //       value: "选项5",
        //       label: "北京烤鸭",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    //方法展开
    ...userActions([
      "getRoles",
      "SubmitRole",
      "adRole",
      "delRole",
      "getRights",
      "delroles",
    ]),
    //分配权限取消
    handleClose() {
      this.openpermissions = false;
      this.keyid = [];
      console.log(this.keyid);
    },
    //分配权限确定
    treeok() {
      this.openpermissions = false;
    },
    //删除标签
    guanbi(a, b) {
      //a用于循环判断 ，b用于请求数据
      console.log(a, b);
      console.log(this.distribution, "4141");
      this.roleList.map((item, index) => {
        if (item.id === a.id) {
          this.roleList.splice(index, 1);
        } else if (item.id != a.id && item.children) {
          item.children.map((item1, index1) => {
            if (item1.id === a.id) {
              item.children.splice(index1, 1);
            } else if (item1.id != a.id && item1.children) {
              item1.children.map((item2, index2) => {
                if (item2.id === a.id) {
                  item1.children.splice(index2, 1);
                } else if (item2.id != a.id && item2.children) {
                  item2.children.map((item3, index3) => {
                    if (item3.id === a.id) {
                      item2.children.splice(index3, 1);
                    }
                  });
                }
              });
            }
          });
        }
      });
      this.delroles({ roleId: b.id, rightId: a.id });
    },
    //打开权限列表对话框
    distributionclick(e) {
      this.openpermissions = true;
      this.id = e.row.id; //角色ID
      this.keyid = [];
      if (e.row.children) {
        e.row.children.map((item) => {
          if (item.children) {
            item.children.map((item1) => {
              if (item1.children) {
                item1.children.map((item2) => {
                  this.keyid.push(item2.id);
                });
              }
            });
          }
        });
      }
    },
    add(val) {
      val.myfrom.validate((vaild) => {
        if (vaild) {
          this.adRole({
            roleName: val.value.rolename,
            roleDesc: val.value.roledescribe,
          });
          this.Visible1 = false;
          this.$message.success("点击了确定");
          // val.myfrom.resetFields();
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    del(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delRole({ id: scope.row.id });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //点击编辑打开对话框
    editor(e) {
      this.id = e.id;
      //给子组件传值
      this.Dialogfrom[0].value = e.roleName;
      this.Visible = true;
    },
    //对话框取消
    cancel(val) {
      this.$message("点击了取消");
      this.Visible = false;
      val.myfrom.resetFields(); //清空表格
    },
    //对话框确定
    confirm(val) {
      val.myfrom.validate((vaild) => {
        if (vaild) {
          this.SubmitRole({
            id: this.id,
            roleName: val.value.rolename,
            roleDesc: val.value.roledescribe,
          });
          this.Visible = false;
          this.$message.success("点击了确定");
          // val.myfrom.resetFields();
        } else {
          this.$message.error("表单填写有误，请检查");
        }
      });
    },
    //子组件分发事件(点旁边空白或右上角X号关闭)
    present() {
      this.Visible = false;
      this.Visible1 = false;
    },
    //添加角色
    addRole() {
      this.Visible1 = true;
    },
  },
  mounted() {
    this.getRoles();
    this.getRights({ type: this.type });
  },
  watch: {},
  computed: {
    //数据展开
    ...userState(["roleList", "distribution"]),
  },
};
</script>

<style scoped lang='scss'>
.liv1 {
  display: flex;

  flex: 1;
}
.live2 {
  display: flex;
  flex: 1;
}
.allliv1 {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border: 1px solid red;
}
.live3 {
  display: flex;
  flex-direction: column;
}
.allliv2 {
  border: 3px solid green;
  flex: 1;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.allliv3 {
  flex: 1;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>