<template>
  <div class="create-rules">
      <v-title title="编辑礼品卡"></v-title>
      <v-cards :cardsF="cardsForm" handleFn="edit" :id="id"></v-cards>
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
      }
    };
  },
  components: {
    vTitle,
    vCards
  },
  methods: {
    getCards() {
      this.id = this.$route.params.id;
      this.axios
        .get(`${api.giftCard}/${this.id}`)
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            console.log(res.data);

            this.$set(this.cardsForm, "giftName", res.data.result.giftName);
            this.$set(this.cardsForm, "fileList", res.data.result.fileList);
            this.$set(this.cardsForm, "goodsList", res.data.result.goodsList);
            this.$set(
              this.cardsForm,
              "instructions",
              res.data.result.instructions
            );
            this.$set(
              this.cardsForm,
              "receiveInstructions",
              res.data.result.receiveInstructions
            );
            this.$set(this.cardsForm, "sort", res.data.result.sort);
            this.$set(this.cardsForm, "term", res.data.result.term);
            this.$set(
              this.cardsForm,
              "disabled",
              res.data.result.disabled.toString()
            );

            this.id = res.data.result.id;
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
    this.getCards();
  }
};
</script>


<style lang="less" scoped>
</style>
