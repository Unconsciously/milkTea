<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box">
            <div class="content" v-loading="loading">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  data() {
    return {
      loading: false
    };
  },
  components: {
    vHead,
    vSidebar
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  .content-box {
    position: absolute;
    top: 70px;
    left: 208px;
    right: 0;
    bottom: 0;
    background-color: #545c64;
    overflow-y: scroll;
    .content {
      background-color: #fff;
      margin: 1% 1% 0;
      border-radius: 12px 12px 0 0;
      padding: 25px;
      height: 93%;
      overflow-y: scroll;
    }
  }
}
</style>
