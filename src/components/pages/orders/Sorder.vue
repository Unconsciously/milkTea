<template>
  <div class="order-page">
    <v-title title="订单管理"></v-title>
      <el-form :inline="true" :model="formOrder" class="searchs">
        <el-form-item label="订单号：">
          <el-input v-model="formOrder.orderNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="流水号：">
          <el-input v-model="formOrder.transactionNo" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="formOrder.status" placeholder="请选择">
            <el-option label="全部" value="null"></el-option>
            <el-option label="待付款" value="1"></el-option>
            <el-option label="待赠送" value="2"></el-option>
            <el-option label="待领取" value="3"></el-option>
            <el-option label="待核销" value="4"></el-option>
            <el-option label="待发货" value="5"></el-option>
            <el-option label="待收货" value="6"></el-option>
            <el-option label="交易完成" value="7"></el-option>
            <el-option label="已失效" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单时间：">
          <el-date-picker
          label="订单时间"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table
        :data="ordersData"
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        class="tabs">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div label-position="left" inline>
              <div v-for="goods in props.row.goodsList" :key="goods.id" class="g-item">
                <p><b>商品名称：</b><span>{{goods.goodsName}}</span></p>
                <p><b>商品规格：</b><span>{{goods.attributeNames}}</span></p>
                <p><b>数量：</b><span>{{goods.goodsNum}}</span></p>
                <p v-if="props.row.buyTime"><b>下单时间：</b><span>{{props.row.buyTime}}</span></p>
                <p v-if="props.row.payTime"><b>付款时间：</b><span>{{props.row.payTime}}</span></p>
                <p v-if="goods.payTime"><b>实付款：</b><span>{{goods.price}}</span></p>
                <p v-if="props.row.termStartTime || props.row.termEndTime"><b>有效期：</b><span>{{props.row.termStartTime}}-{{props.row.termEndTime}}</span></p>
                <p v-if="props.row.giveTime"><b>赠送时间：</b><span>{{props.row.giveTime}}</span></p>
                <p v-if="props.row.receiveTime"><b>领取时间：</b><span>{{props.row.receiveTime}}</span></p>
                <p v-if="props.row.closureTime"><b>核销时间：</b><span>{{props.row.closureTime}}</span></p>
                
              </div>
              
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="卡名称"
          prop="cardName">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="orderNo">
        </el-table-column>
        <el-table-column
          label="流水号"
          prop="transactionNoStr">
        </el-table-column>
        <el-table-column
          label="买家"
          prop="buyerName">
        </el-table-column>
        
        <el-table-column
          label="交易状态"
          prop="statusStr">
        </el-table-column>
        <el-table-column
          label="总费用"
          prop="totalAmount">
        </el-table-column>
        <el-table-column
          label="总件数"
          prop="totalNum">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 4" type="text" size="small" @click="takeOrderClick(scope.row.id)">核销</el-button>
            <span v-else>暂无操作</span>
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
      date: "",
      formOrder: {
        orderNo: null,
        transactionNo: null,
        status: null,
        startTime: null,
        endTime: null
      },
      ordersData: [],
      getRowKeys(row) {
        return row.id;
      },
      expands: [],
      pages: {
        currentPage: 1,
        totalPages: 1
      }
    };
  },
  components: {
    vTitle
  },
  methods: {
    onSubmit() {
      if (this.date && this.date.length == 2) {
        this.formOrder.startTime = this.date[0];
        this.formOrder.endTime = this.date[1];
      }
      this.getOrdersList(1, this.formOrder);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getOrdersList(val);
    },
    getOrdersList(curPage, obj) {
      var cObj = obj || {};
      this.axios
        .post(api.orderList, {
          pageIndex: curPage,
          pageSize: 5,
          condition: cObj
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.$set(this.pages, "currentPage", res.data.result.pageIndex);
            this.$set(this.pages, "totalPages", res.data.result.pageTotal);
            console.log(res.data);
            var ids = [];
            res.data.result.result.map(it => {
              if (it.status == 1) {
                it.statusStr = "待付款";
              } else if (it.status == 2) {
                it.statusStr = "待赠送";
              } else if (it.status == 3) {
                it.statusStr = "待领取";
              } else if (it.status == 4) {
                it.statusStr = "待核销";
              } else if (it.status == 5) {
                it.statusStr = "待发货";
              } else if (it.status == 6) {
                it.statusStr = "待收货";
              } else if (it.status == 7) {
                it.statusStr = "交易完成";
              } else if (it.status == 0) {
                it.statusStr = "已失效";
              }
              if (it.goodsList.length > 0) {
                it.cardName = it.goodsList[0].cardName;
              }
              it.transactionNoStr = it.transactionNo || "-- --";
              ids.push(it.id);

              return it;
            });
            this.ordersData = res.data.result.result;
            this.expands = ids;
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
    takeOrderClick(id) {
      console.log(id);
      this.$confirm("确定要核销该订单吗?", "是否核销", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`${api.take}/${id}`)
            .then(res => {
              if (
                res.status == 200 &&
                res.data.status == 200 &&
                res.data.result == 1
              ) {
                console.log(res.data);
                this.$message({
                  type: "success",
                  message: "核销成功成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            })
            .then(err => {
              console.log(err);
              
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消核销"
          });
        });
    }
  },
  created() {
    this.getOrdersList(1);
  },
  mounted() {}
};
</script>


<style scoped lang="less">
.order-page {
  .searchs {
    .s-row {
      padding-bottom: 25px;
      .ipt {
        width: 220px;
      }
    }
  }
  .tabs {
    width: 100%;
    margin-top: 25px;
    .g-item {
      border-top: 1px dotted #cdcdcd;
      &:first-child {
        border-top: none;
      }
    }
  }
  .pagination-wrap {
    text-align: right;
    margin-top: 25px;
  }
}
</style>
