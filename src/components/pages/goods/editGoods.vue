<template>
  <div class="create-rules">
      <v-title title="添加商品"></v-title>
      <v-goods :goodsF="goodsForm" handleFn="edit" :skuC="skuC" :id="id"></v-goods>
  </div>
</template>

<script>
import api from "../../../utils/api.js";
import vTitle from "../../common/Title";
import vGoods from "./changeGoods";

export default {
  data() {
   
    return {
      id: "",
      skuC: "",
      goodsForm: {
        goodsName: "",
        fileList: [],
        skuList: [],
        instructions: "",
        instructionsText: "",
        details: "",
        detailsText: "",
        disabled: "false",
        skuC: ""
      }
      
    };
  },
  components: {
    vTitle,
    vGoods
  },
  methods: {
    getGoods() {
      this.id = this.$route.params.id;
      this.axios
        .get(`${api.goods}/${this.id}`)
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            console.log(res.data);
            
            this.$set(this.goodsForm, "goodsName", res.data.result.goodsName);
            this.$set(this.goodsForm, "fileList", res.data.result.fileList);
            this.$set(this.goodsForm, "skuList", res.data.result.skuList);
            this.$set(this.goodsForm, "instructions", res.data.result.instructions);
            this.$set(this.goodsForm, "instructionsText", res.data.result.instructionsText);
            this.$set(this.goodsForm, "details", res.data.result.details);
            this.$set(this.goodsForm, "detailsText", res.data.result.detailsText);
            this.$set(this.goodsForm, "disabled", res.data.result.disabled.toString());
            this.$set(this.goodsForm, "skuC", res.data.result.selectSkuMap);
            this.skuC = res.data.result.selectSkuMap;

            this.id = res.data.result.id;

            // this.$set(this.goodsForm, "oneList", res.data.result.disabled);
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
  },
  mounted () {
    this.getGoods();
  },
  created() {
    this.getGoods();
  }
};
</script>


<style lang="less" scoped>
</style>
