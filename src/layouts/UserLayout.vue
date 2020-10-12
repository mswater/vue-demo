<template>
  <div>
    <div class="desc">欢迎进入我们的系统</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserLayout"
};
</script>

<style scoped>
.desc {
  text-align: center;
  font-size: 28px;
}
</style>
