<template>
    <div class="title">
        {{title}}
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
