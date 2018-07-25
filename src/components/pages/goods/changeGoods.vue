<template>
    <div class="change-goods">
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="200px" class="from">
        <el-form-item label="商品名称：" prop="goodsName">
          <el-input class="ipt" size="medium" v-model="goodsForm.goodsName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="商品主图：" prop="fileList">
            <!-- <el-upload
                class="ipt"
                action='http://172.29.36.84:8888/upload'
                list-type="picture"
                :file-list="fileList"
                :limit="1"
                :before-upload="handleUpload"
                :on-remove="handleRemove"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
             <el-upload
                  class="ipt"
                  action=""
                  list-type="picture"
                  :file-list="goodsForm.fileList"
                  :limit="1"
                  :before-upload="handleUpload"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed">
                  <el-button size="small" type="success">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，1-6张</div>
              </el-upload>
        </el-form-item>
     
        
        <el-form-item label="规格属性：">
            <p><el-tag type="info">一级规格</el-tag></p>
            <el-checkbox-group v-model="checkOneList">
              <el-checkbox v-for="one in attrsInfo.list1" :label="one" :key="one.id" :checked="one.checked">{{one.attrValue}}</el-checkbox>
            </el-checkbox-group>
            <p><el-tag type="info">二级规格</el-tag></p>
            <el-checkbox-group v-model="checkTwoList">
              <el-checkbox v-for="two in attrsInfo.list2" :label="two" :key="two.id" :checked="two.checked">{{two.attrValue}}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品SKU：" prop="skuList">
            <el-table  class="ipt"
                :data="skuList"
                border>
                <el-table-column
                prop="attributeNames"
                label="规格"
                width="140"
                align="center">
                </el-table-column>
                <el-table-column
                label="价格/元"
                width="150"
                align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.price" placeholder="请输入" @change="changeStu(scope.row, 'price')"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                label="库存/件"
                width="150"
                align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.stock" placeholder="请输入" @change="changeStu(scope.row, 'stock')"></el-input>
                  </template>
                </el-table-column>
            </el-table>
            <p class="sku-err" v-if="skuErr">{{skuErr}}</p>
        </el-form-item>

        <el-form-item label="使用说明：" prop="instructions">
          <div id="editor">
            <mavon-editor class="edit" :toolbars="toolbars" :boxShadow=false @imgAdd="$imgAdd" @change="$saveIns" v-model="goodsForm.instructionsText" :value="goodsForm.instructions"></mavon-editor>
          </div>
        </el-form-item>
        <el-form-item label="商品详情：" prop="details">
          <div id="editor">
            <mavon-editor class="edit" :toolbars="toolbars" :boxShadow=false @imgAdd="$imgAdd" @change="$saveDet" v-model="goodsForm.detailsText" :value="goodsForm.details"></mavon-editor>
          </div>
        </el-form-item>
        <el-form-item label="商品上架：" prop="disabled">
          <el-radio-group v-model="goodsForm.disabled"> 
            <el-radio label="false">上架</el-radio>
            <el-radio label="true">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsForm')">保存</el-button>
          <el-button @click="backGoods()">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import api from "../../../utils/api.js";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  props: ["goodsF", "handleFn", "id", "skuC"],
  data() {
    return {
      goodsForm: this.goodsF,
      optStatu: this.handleFn,
      skuCs: this.skuC,
      checkOneList: [],
      checkTwoList: [],
      skuErr: "",
      attrs: {},
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名字", trigger: "blur" }
        ],
        fileList: [
          { required: true, message: "请上传商品主图", trigger: "change" }
        ],

        instructions: [
          { required: true, message: "请输入使用说明", trigger: "change" }
        ],
        details: [
          { required: true, message: "请输入商品详情", trigger: "change" }
        ]
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        subfield: false, // 单双栏模式
        fullscreen: true, // 全屏编辑
        preview: true // 预览
      }
    };
  },
  components: {
    mavonEditor
  },
  computed: {
    fileList: function() {
      let ar = [];
      if (this.goodsForm.fileList.length > 0) {
        let fObj = {
          name: "1",
          url: this.goodsForm.fileList[0].url
        };
        ar.push(fObj);
      }
      return ar;
    },
    skuList: function() {
      let sArr = [];
      console.log(this.goodsForm);
      //
      if (this.optStatu == "add") {
        console.log("add");
        if (this.checkOneList.length == 0 && this.checkTwoList.length == 0) {
          sArr.push({
            price: "",
            stock: "",
            attributeIds: "",
            attributeNames: ""
          });
        } else if (this.checkOneList.length >= this.checkTwoList.length) {
          this.checkOneList.forEach(one => {
            if (this.checkTwoList.length > 0) {
              this.checkTwoList.forEach(two => {
                sArr.push({
                  price: "",
                  stock: "",
                  attributeIds: `${one.id}_${two.id}`,
                  attributeNames: `${one.attrValue}_${two.attrValue}`
                });
              });
            } else {
              this.attrs.list2.forEach(two => {
                sArr.push({
                  price: "",
                  stock: "",
                  attributeIds: `${one.id}_${two.id}`,
                  attributeNames: `${one.attrValue}_${two.attrValue}`
                });
              });
            }
          });
        } else if (this.checkOneList.length <= this.checkTwoList.length) {
          this.checkTwoList.forEach(two => {
            if (this.checkOneList.length > 0) {
              this.checkOneList.forEach(one => {
                sArr.push({
                  price: "",
                  stock: "",
                  attributeIds: `${one.id}_${two.id}`,
                  attributeNames: `${one.attrValue}_${two.attrValue}`
                });
              });
            } else {
              this.attrs.list1.forEach(one => {
                sArr.push({
                  price: "",
                  stock: "",
                  attributeIds: `${one.id}_${two.id}`,
                  attributeNames: `${one.attrValue}_${two.attrValue}`
                });
              });
            }
          });
        }
      } else if (this.optStatu == "edit") {
        console.log("edit");
        if (this.checkOneList.length == 0 && this.checkTwoList.length == 0) {
          sArr = this.goodsForm.skuList;
        } else if (this.checkOneList.length >= this.checkTwoList.length) {
          this.checkOneList.forEach(one => {
            if (this.checkTwoList.length > 0) {
              this.checkTwoList.forEach(two => {
                var flag = false;
                this.goodsForm.skuList.forEach(sk => {
                  var ids = `${one.id}_${two.id}`;
                  if (sk.attributeIds == ids) {
                    flag = true;
                    sArr.push({
                      price: sk.price,
                      stock: sk.stock,
                      attributeIds: `${one.id}_${two.id}`,
                      attributeNames: `${one.attrValue}_${two.attrValue}`
                    });
                  }
                });
                if (!flag) {
                  sArr.push({
                    price: "",
                    stock: "",
                    attributeIds: `${one.id}_${two.id}`,
                    attributeNames: `${one.attrValue}_${two.attrValue}`
                  });
                }
              });
            } else {
              this.attrs.list2.forEach(two => {
                var flag = false;
                this.goodsForm.skuList.forEach(skt => {
                  var ids = `${one.id}_${two.id}`;
                  if (skt.attributeIds == ids) {
                    flag = true;
                    sArr.push({
                      price: skt.price,
                      stock: skt.stock,
                      attributeIds: `${one.id}_${two.id}`,
                      attributeNames: `${one.attrValue}_${two.attrValue}`
                    });
                  }
                });
                if (!flag) {
                  sArr.push({
                    price: "",
                    stock: "",
                    attributeIds: `${one.id}_${two.id}`,
                    attributeNames: `${one.attrValue}_${two.attrValue}`
                  });
                }
              });
            }
          });
        } else if (this.checkOneList.length <= this.checkTwoList.length) {
          this.checkTwoList.forEach(two => {
            if (this.checkOneList.length > 0) {
              this.checkOneList.forEach(one => {
                var flag = false;
                this.goodsForm.skuList.forEach(skt => {
                  var ids = `${one.id}_${two.id}`;
                  if (skt.attributeIds == ids) {
                    flag = true;
                    sArr.push({
                      price: skt.price,
                      stock: skt.stock,
                      attributeIds: `${one.id}_${two.id}`,
                      attributeNames: `${one.attrValue}_${two.attrValue}`
                    });
                  }
                });
                if (!flag) {
                  sArr.push({
                    price: "",
                    stock: "",
                    attributeIds: `${one.id}_${two.id}`,
                    attributeNames: `${one.attrValue}_${two.attrValue}`
                  });
                }
              });
            } else {
              this.attrs.list1.forEach(one => {
                var flag = false;
                this.goodsForm.skuList.forEach(skt => {
                  var ids = `${one.id}_${two.id}`;
                  if (skt.attributeIds == ids) {
                    flag = true;
                    sArr.push({
                      price: skt.price,
                      stock: skt.stock,
                      attributeIds: `${one.id}_${two.id}`,
                      attributeNames: `${one.attrValue}_${two.attrValue}`
                    });
                  }
                });
                if (!flag) {
                  sArr.push({
                    price: "",
                    stock: "",
                    attributeIds: `${one.id}_${two.id}`,
                    attributeNames: `${one.attrValue}_${two.attrValue}`
                  });
                }
              });
            }
          });
        }
      }

      return sArr;
    },
    attrsInfo: function() {
      let ass = {};
      let oneL = [];
      let twoL = [];
      if (this.attrs && this.goodsForm && this.goodsForm.skuC) {
        if (this.attrs.list1 && this.attrs.list1.length > 0) {
          this.attrs.list1.forEach(one => {
            if (this.goodsForm.skuC.list1.length > 0) {
              this.goodsForm.skuC.list1.forEach(oneIt => {
                if (one.id == oneIt.key) {
                  one.checked = true;
                  oneL.push(one);
                }
              });
            }
          });
        }
        if (this.attrs.list2 && this.attrs.list2.length > 0) {
          this.attrs.list2.forEach(two => {
            if (this.goodsForm.skuC.list2.length > 0) {
              this.goodsForm.skuC.list2.forEach(twoIt => {
                if (two.id == twoIt.key) {
                  two.checked = true;
                  twoL.push(two);
                }
              });
            }
          });
        }
      }
      this.checkOneList = oneL;
      this.checkTwoList = twoL;
      ass = this.attrs;
      console.log(ass);
      return ass;
    }
  },
  methods: {
    changeStu(item, stu) {
      this.skuList.forEach(val => {
        if (!val.price || !val.stock) {
          this.skuErr = "价格或库存必须填写!";
          return;
        } else if (
          !/^[1-9]\d*$/.test(val.price) ||
          !/^[1-9]\d*$/.test(val.stock)
        ) {
          this.skuErr = "价格或库存必须为正整数!";
          return;
        } else {
          this.skuErr = "";
        }
      });
    },
    handleRemove() {
      this.$set(this.goodsForm, "fileList", []);
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleUpload(file) {
      var formdata = new FormData();
      formdata.append("file", file);
      formdata.append("type", 2);
      this.axios({
        method: "post",
        url: api.upload,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            let fArr = [];
            fArr.push(res.data.result);
            this.$set(this.goodsForm, "fileList", fArr);
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
    getAttrIds() {
      this.axios({
        method: "get",
        url: api.attribute
      })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.attrs = res.data.result;
          } else if (res.data.code == "1000005") {
            this.$router.push("/login");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    },

    submitForm(formName) {
      this.goodsForm.skuList = this.skuList;
      this.goodsForm.skuList.forEach(val => {
        if (!val.price || !val.stock) {
          this.skuErr = "价格或库存必须填写!";
          return;
        } else if (
          !/^[1-9]\d*$/.test(val.price) ||
          !/^[1-9]\d*$/.test(val.stock)
        ) {
          this.skuErr = "价格或库存必须为正整数!";
          return;
        }
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.optStatu == "add") {
            this.addGoods(this.goodsForm);
          } else if (this.optStatu == "edit") {
            delete this.goodsForm.skuC;

            let gObj = { ...this.goodsForm, id: this.id };
            this.editGoods(gObj);
          }
        } else {
          return false;
        }
      });
    },
    addGoods(goods) {
      this.axios
        .post(api.goods, goods)
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
    editGoods(goods) {
      this.axios
        .put(api.goods, goods)
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
    backGoods() {
      this.$router.back();
    },

    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      formdata.append("type", 3);
      this.axios({
        method: "post",
        url: api.upload,
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            let url = res.data.result.url;
            mavonEditor.$img2Url(pos, url);
          } else if (res.data.code == "1000005") {
            this.$router.push("/login");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .then(err => {
          console.log(err);
        });
    },
    $saveIns(val, rander) {
      this.goodsForm.instructions = rander;
      this.goodsForm.instructionsText = val;
    },
    $saveDet(val, rander) {
      this.goodsForm.details = rander;
      this.goodsForm.detailsText = val;
    }
  },
  mounted() {
    this.getAttrIds();
  },
  created() {}
};
</script>
<style lang='less' scoped>
.change-goods {
  .from {
    .el-form-item {
      margin-bottom: 35px;
      .ipt {
        width: 441px;
        margin-bottom: 5px;
      }
      .sku-err {
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
      }
    }
  }
}
</style>
