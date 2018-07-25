<template>
  <div class="rules-page">
      <v-title title="礼品卡管理"></v-title>
      <div class="opt">
        <el-button type="success" @click="addCardsClick()">新建礼品卡</el-button>
      </div>
      <el-table
        :data="cardsData"
        border
        style="width: 100%;padding-bottom:1px;">
        <el-table-column
          label="编号"
          width="80"
          align="center"
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          label="卡面主图"
          width="180"
          align="center">
          <template slot-scope="scope">
            <img class="tab-img" :src="scope.row.url">
          </template>
        </el-table-column>
        
        <el-table-column
          prop="giftName"
          label="卡名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="term"
          label="有效时段"
          align="center">
        </el-table-column>
        <el-table-column
          prop="goodsLen"
          label="关联商品数"
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
            <el-button type="text" size="small" @click="editCardsClick(scope.row.id)">编辑</el-button>
            <el-button type="text" size="small" @click="editCardsClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper" 
          :total="totalPages"
          >
        </el-pagination>
        
      </div>
  </div>
</template>

<script>
import vTitle from "../../common/Title";
import api from "../../../utils/api.js";
export default {
  data() {
    return {
      cardsData: [],
      currentPage: 1,
      totalPages: 1
    };
  },
  components: {
    vTitle
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    gecardsList() {
      this.axios
        .post(api.giftCardList, {
          pageIndex: 1,
          pageSize: 10
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.totalPages = res.data.result.pageTotal;
            res.data.result.result.map(it => {
              if (it.disabled) {
                it.disabledStr = "禁用";
              } else {
                it.disabledStr = "启用";
              }
              it.goodsLen = it.goodsList.length;
              if (it.fileList.length > 0) {
                it.url = it.fileList[0].url;
              }

              // if (it.attrLevel == 1) {
              //   it.attrLevelStr = "一级";
              // } else if (it.attrLevel == 2) {
              //   it.attrLevelStr = "二级";
              // }
              return it;
            });
            this.cardsData = res.data.result.result;
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
    addCardsClick() {
      this.$router.push({ path: "/addcards" });
    },
    editCardsClick(id) {
      this.$router.push({ path: `/editcards/${id}` });
    }
  },
  created() {
    this.gecardsList();
  }
};
</script>


<style lang="less" scoped>
.rules-page {
  .opt {
    text-align: left !important;
    padding-bottom: 25px;
  }
  .tab-img {
    width: 150px;
    height: 100px;
  }
  .pagination-wrap {
    margin-top: 25px;
    text-align: right;
  }
}
</style>
