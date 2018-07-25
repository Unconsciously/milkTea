<template>
  <div class="welcome-page">
      <p>欢迎使用商家管理后台！</p>
      <img src="../../assets/images/welcome.png" alt="">
  </div>
</template>

<script>
import api from "../../utils/api.js";

export default {
  data: function() {
    return {};
  },
  methods: {
    searchUserInfo() {
      this.axios
        .get(api.isLogin)
        .then(res => {
          if (res.status == 200 && res.data.status == 200) {
            console.log(res);
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
    this.searchUserInfo();
  }
};
</script>

<style lang="less" scoped>
.welcome-page {
  padding-top: 15%;
  text-align: center;
  p {
    font-size: 24px;
    color: #000;
    line-height: 45px;
  }
}
</style>

