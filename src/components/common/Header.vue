<template>
    <div class="header primary">
        <div class="title">商家管理后台</div>
        <div class="header-right">
            <div class="header-users">
              <span class="user">{{username}}</span>
              <img @click="doLogout()" src="../../assets/images/quit.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import api from "../../utils/api.js";
export default {
  data() {
    return {
      name: "未命名"
    };
  },
  computed: {
    username() {
      let username = localStorage.getItem("admin");
      return username ? username : this.name;
    }
  },
  methods: {
    doLogout() {
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          this.axios
            .get(api.logout)
            .then(res => {
              if (res.status == 200 && res.data.status == 200) {
                console.log(res);
                localStorage.removeItem("admin");
                this.$router.push("/login");
              } else {
                this.$message.error(res.data.message);
              }
            })
            .then(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/less/them.less";

.header {
  display: flex;
  justify-content: space-between;
  .title {
    width: 200px;
    font-size: 27px;
    color: #fff;
    line-height: 70px;
    text-align: center;
    border-right: 1px solid #fff;
  }
  .header-right {
    min-width: 100px;
    padding-right: 25px;
    .header-users {
      position: relative;
      span {
        color: #fff;
        line-height: 70px;
      }
      img {
        position: absolute;
        top: 20px;
        width: 25px;
        height: 25px;
        padding-left: 5px;
      }
    }
  }
}
</style>
