<template>
    <div class="change-cards">
      <el-form :model="cardsForm" :rules="rules" ref="cardsForm" label-width="200px" class="from">
        <el-form-item label="礼品卡名称：" prop="giftName">
          <el-input class="ipt" size="medium" v-model="cardsForm.giftName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="礼品卡卡面：" prop="fileList">
            <el-upload
                class="ipt"
                action=""
                list-type="picture"
                :file-list="cardsForm.fileList"
                :limit="3"
                :before-upload="handleUpload"
                :on-remove="handleRemove"
                :on-exceed="handleExceed">
                <el-button size="small" type="success" icon="el-icon-upload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，1-6张</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="有效期：" prop="term">
          <el-input class="ipt" size="medium" v-model="cardsForm.term" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input class="ipt" size="medium" v-model="cardsForm.sort" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="添加商品：" prop="goodsList">
            <el-button type="success" size="small" @click="openGoodsBox()" icon="el-icon-sold-out">添加商品</el-button>
            <el-row type="flex" class="goods-list" v-if="multipleSelection.length>0">
              <el-col class="goods-box" :span="6" v-for="o in multipleSelection" :key="o.id">
                <div class="gb-card">
                  <img :src="o.fileList[0].url" class="gb-image">
                  <div class="gb-info">
                    <span>{{o.goodsName}}</span>
                    <div>
                      <el-button class="gb-btn" @click="doDelGoods(o)">删除</el-button>
                    </div>
                  </div>
                </div>
              </el-col>

            </el-row>
            <p class="err-tip" v-if="multipleSelection.length<1 && isGoV">请选择商品！ </p>
        </el-form-item>
        
        <el-form-item label="领取页面使用说明：" prop="instructions">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 7}"
            placeholder="请输入"
            v-model="cardsForm.instructions" 
            class="ipt">
          </el-input>
        </el-form-item>
        <el-form-item label="领取成功页面使用说明：" prop="receiveInstructions">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 7}"
            placeholder="请输入"
            v-model="cardsForm.receiveInstructions"
            class="ipt">
          </el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="disabled">
          <el-radio-group v-model="cardsForm.disabled"> 
            <el-radio label="false">启用</el-radio>
            <el-radio label="true">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
    
        <el-form-item class="wrap-opts">
          <el-button type="success" @click="submitForm('cardsForm')" icon="el-icon-check">保存</el-button>
          <el-button @click="backCards()" icon="el-icon-back">返回</el-button>
        </el-form-item>
      </el-form>


      <el-dialog class="goods-dialog" title="商品列表" :visible.sync="dialogTableVisible" width="70%">
        <el-table ref="multipleTable" :data="goodsData" :row-key="getRowKeys" @selection-change="selectionChange">
          <el-table-column
            type="selection"
            width="55" :reserve-selection="true">
          </el-table-column>
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
          <el-table-column prop="goodsName" label="商品名称" width="150"></el-table-column>
          <el-table-column prop="stock" label="库存" width="200"></el-table-column>
          <el-table-column prop="price" label="价格" width="200"></el-table-column>
          <el-table-column prop="disabledStr" label="状态" width="200"></el-table-column>
        </el-table> 
        <div class="pagination-wrap">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pages.currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :page-count="pages.totalPages">
          </el-pagination>
        </div>

        <div class="close-box">
          <el-button type="success" @click="closeGoodsBox()">确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import api from "../../../utils/api.js";

export default {
  props: ["cardsF", "handleFn", "id"],
  data() {
    var validateTerm = (term, value, callback) => {
      if (value == "") {
        callback(new Error("不可为空!"));
      } else if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error("必须为正整数!"));
      } else {
        callback();
      }
    };
    var validateSort = (sort, value, callback) => {
      if (value == "") {
        callback();
      } else if (!/^[1-9]\d*$/.test(value)) {
        callback(new Error("必须为正整数!"));
      } else {
        callback();
      }
    };

    return {
      cardsForm: this.cardsF,
      optStatu: this.handleFn,
      dialogTableVisible: false,
      goodsData: [],
      multipleSelection: [],
      isGoV: false,
      getRowKeys(row) {
        return row.id;
      },
      pages: {
        currentPage: 1,
        totalPages: 10
      },
      rules: {
        giftName: [
          { required: true, message: "请输入商品名字", trigger: "blur" }
        ],
        fileList: [
          { required: true, message: "请上传商品主图", trigger: "change" }
        ],
        term: [
          {
            required: true,
            validator: validateTerm,
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: false,
            validator: validateSort,
            trigger: "blur"
          }
        ],
        details: [
          { required: true, message: "请输入商品详情", trigger: "change" }
        ]
      }
    };
  },
  components: {},
  watch: {
    cardsForm: {
      handler(curVal, oldVal) {
        if (curVal.goodsList.length > 0) {
          this.multipleSelection = curVal.goodsList;
        }
      },
      deep: true
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      this.getGoodsList(val);
    },
    selectionChange(rs) {
      var newArr = [];
      for (var i = 0, len = rs.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
          if (rs[i].id === rs[j].id) {
            ++i;
          }
        }
        newArr.push(rs[i]);
      }

      this.multipleSelection = newArr;
      this.selectIds = [];
      if (newArr) {
        newArr.forEach(row => {
          if (row) {
            this.selectIds.push(row.id);
          }
        });
      }
    },
    getGoodsList(curPage) {
      this.axios
        .post(api.goodsList, {
          pageIndex: curPage,
          pageSize: 10
        })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.$set(this.pages, "currentPage", res.data.result.pageIndex);
            this.$set(this.pages, "totalPages", res.data.result.pageTotal);

            res.data.result.result.forEach(it => {
              if (it.disabled) {
                it.disabledStr = "下架";
              } else {
                it.disabledStr = "上架";
              }
              if (it.fileList.length > 0) {
                it.url = it.fileList[0].url;
              }
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
    openGoodsBox() {
      this.dialogTableVisible = true;
      this.getGoodsList(1);
      this.toggleSelection(this.multipleSelection);
    },
    closeGoodsBox() {
      this.dialogTableVisible = false;
    },
    doDelGoods(item) {
      var [...goodsArr] = this.multipleSelection;
      this.multipleSelection.forEach((good, index) => {
        if (item.id == good.id) {
          goodsArr.splice(index, 1);
        }
      });
      this.multipleSelection = goodsArr;
    },
    toggleSelection(rows) {
      if (rows.length > 0 && this.$refs.multipleTable) {
        rows.forEach(row => {
          if (row) {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        });
      }
    },

    handleRemove(file, fileList) {
      this.$set(this.cardsForm, "fileList", fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleUpload(file) {
      this.file = file;
      var formdata = new FormData();
      formdata.append("file", this.file);
      formdata.append("type", 1);

      this.axios({
        method: "post",
        url: api.upload,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            let fArr = this.cardsForm.fileList;
            fArr.push(res.data.result);
            this.$set(this.cardsForm, "fileList", fArr);
          } else if (res.data.code == "1000005") {
            this.$router.push("/login");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
      return false;
    },
    submitForm(formName) {
      this.isGoV = true;
      this.cardsForm.goodsList = this.multipleSelection;
      if (this.multipleSelection.length < 1) {
        return;
      }

      console.log(this.cardsForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.optStatu == "add") {
            console.log("add");
            this.addCards(this.cardsForm);
          } else if (this.optStatu == "edit") {
            let rObj = { ...this.cardsForm, id: this.id };
            this.editCards(rObj);

            console.log("edit");
          }
        } else {
          return false;
        }
      });
    },
    addCards(card) {
      this.axios
        .post(api.giftCard, card)
        .then(res => {
          if (
            res.status == 200 &&
            res.data.status == 200 &&
            res.data.result == 1
          ) {
            this.$alert("提示", "操作成功，返回列表", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back();
              }
            });
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
    editCards(card) {
      this.axios
        .put(api.giftCard, card)
        .then(res => {
          if (
            res.status == 200 &&
            res.data.status == 200 &&
            res.data.result == 1
          ) {
            this.$alert("提示", "操作成功，返回列表", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.back();
              }
            });
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
    backCards() {
      this.$router.back();
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.change-cards {
  .from {
    .el-form-item {
      margin-bottom: 35px;
      .ipt {
        width: 441px;
        margin-bottom: 5px;
      }
      .err-tip {
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        padding-top: 2px;
        position: absolute;
        top: 100%;
        left: 0;
      }
      #editor {
        margin-top: 25px;
        margin-bottom: 5px;
        width: 80%;
        height: 510px;
        .edit {
          height: 100%;
        }
        .wrap-opts {
          margin-top: 55px;
        }
      }
      .goods-list {
        padding: 25px 200px 25px 0;
        align-content: flex-start;
        flex-wrap: wrap;
        .goods-box {
          margin-bottom: 15px;
          min-width: 250px;
          padding-right: 25px;
          .gb-card {
            overflow: hidden;
            border: 1px solid #f5f5f5;
            box-shadow: 5px 1px 1px #cfcfcf;
            border-radius: 12px;
            padding-bottom: 15px;
            img {
              display: block;
              width: 100% !important;
              height: 180px !important;
            }
            .gb-info {
              padding: 0 15px !important;
              .gb-btn {
                float: right;
                font-size: 12px;
                color: #f56c6c;
                border: 1px solid #f56c6c;
                padding: 3px 7px;
              }
            }
          }
        }
      }
    }
  }
  .goods-dialog {
    .tab-img {
      width: 150px;
      height: 100px;
    }
    .close-box {
      text-align: right;
      margin-top: 20px;
    }
    .pagination-wrap {
      margin-top: 25px;
      text-align: right;
    }
  }
}
</style>
