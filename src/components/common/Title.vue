<template>
    <div class="title">
        {{title}}<i class="el-icon-edit"></i>
    </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: ['title'],
  methods: {
  }
};
</script>
<style lang='less' scoped>
.title {
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    padding-bottom: 25px;
}

</style>
