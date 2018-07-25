<template>
  <div class="create-rules">
      <v-title title="添加规格"></v-title>
      <v-rules :rulesF="ruleForm" handleFn="add" id="000"></v-rules>
  </div>
</template>

<script>
import api from "../../../utils/api.js";
import vTitle from "../../common/Title";
import vRules from "./changeRules";

export default {
  data() {
   
    return {
      ruleForm: {
        attrLevel: "",
        attrValue: "",
        sort: "",
        disabled: "false"
      },
      
    };
  },
  components: {
    vTitle,
    vRules
  },
  methods: {
    
  }
};
</script>


<style lang="less" scoped>

</style>
