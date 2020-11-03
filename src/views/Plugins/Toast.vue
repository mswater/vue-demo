<template>
  <div>
    <div class="ms-toast">
      <span>{{ msg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      msg: "toast"
    };
  }
};
</script>

<style scoped>
.ms-toast {
  position: absolute;
  left: 35%;
  bottom: 40px;
  width: 30%;
  height: 60px;
  margin: 0 auto;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
  color: #ffffff;
  border-radius: 10px;
  background: rgba(200, 200, 200, 0.5);
}
</style>
