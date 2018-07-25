<template>
  <div class="rules-page">
      <v-title title="规格管理"></v-title>
      <div class="opt">
        <el-button type="success" @click="addRulesClick()">新建规格</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
         
          label="编号"
          width="80"
          align="center"
          type="index"
          :index="indexMethod">
        </el-table-column>
        
        <el-table-column
          prop="attrValue"
          label="规格值"
          align="center">
        </el-table-column>
        <el-table-column
          prop="attrLevelStr"
          label="规格等级"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="disabledStr"
          label="状态"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRulesClick(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
   
      </el-table>
  </div>
</template>

<script>
import vTitle from "../../common/Title";
import api from "../../../utils/api.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    vTitle
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    getAttributeList() {
      this.axios
        .post(api.attributeList, {
          pageIndex: 1,
          pageSize: 999999
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            res.data.result.result.map(it => {
              if (it.disabled) {
                it.disabledStr = "禁用";
              } else {
                it.disabledStr = "启用";
              }

              if (it.attrLevel == 1) {
                it.attrLevelStr = "一级";
              } else if (it.attrLevel == 2) {
                it.attrLevelStr = "二级";
              }
              return it;
            });
            this.tableData = res.data.result.result;
          } else if (res.data.code == "1000005") {
            this.$alert("提示", res.data.message, {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/login");
              }
            });
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    },
    addRulesClick() {
      this.$router.push({ path: "/addrules" });
    },
    editRulesClick(id) {
      this.$router.push({ path: `/editrules/${id}` });
    }
  },
  created() {
    this.getAttributeList();
  }
};
</script>


<style lang="less" scoped>
.rules-page {
  .opt {
    text-align: left !important;
    padding-bottom: 25px;
  }
}
</style>
