<template>
  <div class="create-rules">
      <v-title title="编辑规格"></v-title>
      <v-rules :rulesF="ruleForm" handleFn="edit" :id="id"></v-rules>
  </div>
</template>

<script>
import api from "../../../utils/api.js";
import vTitle from "../../common/Title";
import vRules from "./changeRules";

export default {
  data() {
    return {
      id: "",
      ruleForm: {
        attrLevel: "",
        attrValue: "",
        sort: "",
        disabled: "false"
      }
    };
  },
  components: {
    vTitle,
    vRules
  },
  methods: {
    getRules() {
      this.id = this.$route.params.id;
      this.axios
        .get(`${api.attribute}/${this.id}`)
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            
            if (res.data.result.attrLevel == 1) {
              res.data.result.attrLevelStr = "一级";
            } else if (res.data.result.attrLevel == 2) {
              res.data.result.attrLevelStr = "二级";
            }
            this.$set(this.ruleForm, "attrLevel", res.data.result.attrLevelStr);
            this.$set(this.ruleForm, "attrValue", res.data.result.attrValue);
            this.$set(this.ruleForm, "sort", res.data.result.sort);
            this.$set(
              this.ruleForm,
              "disabled",
              res.data.result.disabled.toString()
            );
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
  created() {
    this.getRules();
  }
};
</script>


<style lang="less" scoped>
</style>
