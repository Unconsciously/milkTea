<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" :default-active="$route.path"
        background-color="#878d92" text-color="#fff" active-text-color="#85CE61" router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-menu",
          index: "1",
          title: "系统管理",
          subs: [
            {
              index: "/rules",
              title: "规格管理"
            }
          ]
        },
        {
          icon: "el-icon-goods",
          index: "2",
          title: "商品管理",
          subs: [
            {
              index: "/cards",
              title: "礼品卡"
            },
            {
              index: "/goods",
              title: "商品"
            }
          ]
        },
        {
          icon: "el-icon-edit-outline",
          index: "3",
          title: "订单管理",
          subs: [
            {
              index: "/sorder",
              title: "订单列表"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang='less' scoped>
@import "../../assets/less/them.less";

.sidebar {
  display: block;
  width: 200px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: hidden;
  background-color: @left-color;
  padding-top: 30px;
  &::-webkit-scrollbar {
    width: 0;
  }
  ul {
    li {
      i {
        color: #fff !important;
      }
    }
  }
}

</style>
