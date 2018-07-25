<template>
  <div class="create-rules">
      <v-title title="创建礼品卡"></v-title>
      <v-cards :cardsF="cardsForm" handleFn="add" id="000"></v-cards>
  </div>
</template>

<script>
import api from "../../../utils/api.js";
import vTitle from "../../common/Title";
import vCards from "./changeCards";

export default {
  data() {
   
    return {
      cardsForm: {
        giftName: "",
        term: "",
        instructions: "",
        receiveInstructions: "",
        fileList: [],
        goodsList: [],
        sort: "",
        disabled: "false"
      },
      
    };
  },
  components: {
    vTitle,
    vCards
  },
  methods: {
    
  }
};
</script>


<style lang="less" scoped>

</style>
