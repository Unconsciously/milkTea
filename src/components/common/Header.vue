<template>
    <div class="header">
        <div class="title">商家管理后台</div>
        <div class="header-right">
            <div class="header-user-con">
                <div class="user-avator"><img src="../../assets/images/icon.png"></div>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
    handleCommand(command) {
      if (command == "logout") {
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
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import "../../assets/less/them.less";

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background: @base;
  color: #fff;
  .title {
    width: 100%;
    line-height: 70px;
    background: rgba(103, 194, 58, 0.25);
    text-align: left;
    padding-left: 50px;
  }
  .header-right {
    padding-right: 50px;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    .header-user-con {
      display: flex;
      height: 70px;
      align-items: center;
      .user-avator {
        margin-left: 20px;
        .user-avator img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .user-name {
        margin-left: 10px;
        .el-dropdown-link {
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
