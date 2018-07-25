<template>
  <div class="goods-page">
      <v-title title="商品管理"></v-title>
      <div class="opt">
        <el-button type="success" @click="addGoodsClick()">新建商品</el-button>
      </div>
      <el-table
        :data="goodsData"
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
          label="商品主图"
          width="180"
          align="center">
          <template slot-scope="scope">
            <img class="tab-img" :src="scope.row.url">
          </template>
        </el-table-column>
        
        <el-table-column
          prop="goodsName"
          label="商品名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存"
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cardCount"
          label="关联卡数/张"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="disabledStr"
          label="状态"
          width="110"
          align="center">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editGoodsClick(scope.row.id)">编辑</el-button>
             <el-button
                @click.native.prevent="deleteRow(scope.$index, scope.row.id, goodsData)"
                type="text"
                size="small">
                删除
              </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pages.currentPage"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :page-count="pages.totalPages">
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
      goodsData: [],
      pages: {
        currentPage: 1,
        totalPages: 5
      }
    };
  },
  components: {
    vTitle
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getGoodsList(val);

    },
    getGoodsList(curPage) {
      this.axios
        .post(api.goodsList, {
          pageIndex: curPage,
          pageSize: 5
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.$set(this.pages, "currentPage", res.data.result.pageIndex);
            this.$set(this.pages, "totalPages", res.data.result.pageTotal);
            console.log(this.pages);
            res.data.result.result.map(it => {
              if (it.disabled) {
                it.disabledStr = "下架";
              } else {
                it.disabledStr = "上架";
              }
              if (it.fileList.length > 0) {
                it.url = it.fileList[0].url;
              }
              return it;
            });
            this.goodsData = res.data.result.result;
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
    addGoodsClick() {
      this.$router.push({ path: "/addgoods" });
    },
    editGoodsClick(id) {
      this.$router.push({ path: `/editgoods/${id}` });
    },
    deleteRow(index, id, rows) {
      this.axios({
        method: "delete",
        url: `${api.goods}/${id}`
      })
        .then(res => {
          if (
            res.status == 200 &&
            res.data.status == 200 &&
            res.data.result == 1
          ) {
            this.getGoodsList(1);
          } else if (res.data.code == "1000005") {
            this.$router.push("/login");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getGoodsList(1);
  }
};
</script>


<style lang="less" scoped>
.goods-page {
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
