<template>
  <el-container class="wrapper">
    <el-header class="header-wrap"><v-head></v-head></el-header>
    <el-container class="content-box">
      <el-aside width="200px"><v-sidebar></v-sidebar></el-aside>
      <el-main class="main">
        <transition name="move" mode="out-in">
            <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  data() {
    return {
    };
  },
  components: {
    vHead,
    vSidebar
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/less/them.less";
.wrapper {
  .header-wrap {
    padding: 0 !important;
    height: 70px !important;
    background-color: @base;
  }
  .content-box {
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    .main {
      padding: 30px 50px;
    }
  }
}
</style>
