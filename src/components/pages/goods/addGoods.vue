<template>
  <div class="create-rules">
      <v-title title="添加商品"></v-title>
      <v-goods :goodsF="goodsForm" handleFn="add" id="000" :skuC="skuC"></v-goods>
  </div>
</template>

<script>
import api from "../../../utils/api.js";
import vTitle from "../../common/Title";
import vGoods from "./changeGoods";

export default {
  data() {
    return {
      skuC: "",
      goodsForm: {
        goodsName: "",
        fileList: [],
        skuList: [],
        instructions: "",
        instructionsText: "",
        details: "",
        detailsText: "",
        disabled: "false"
      }
    };
  },
  components: {
    vTitle,
    vGoods
  },
  methods: {
    submitRules(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addRules(this.ruleForm);
        } else {
          return false;
        }
      });
    },

    getRules() {
      this.axios
        .get(`${api.attribute}/${id}`)
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            this.$alert("提示", "操作成功，返回列表", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/rules");
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
    }
  }
};
</script>


<style lang="less" scoped>
</style>
