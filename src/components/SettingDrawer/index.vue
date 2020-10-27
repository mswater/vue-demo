<template>
  <div>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <div>
        <h4>整体风格</h4>
        <a-radio-group
          name="theme"
          :value="$route.query.navTheme || 'dark'"
          @change="e => handleSettingChange('navTheme', e.target.value)"
        >
          <a-radio :value="'dark'">
            Dark
          </a-radio>
          <a-radio :value="'light'">
            Light
          </a-radio>
        </a-radio-group>
        <h4>导航模式</h4>
        <a-radio-group
          name="layout"
          :value="$route.query.navLayout || 'left'"
          @change="e => handleSettingChange('navLayout', e.target.value)"
        >
          <a-radio :value="'left'">
            Left
          </a-radio>
          <a-radio :value="'top'">
            Top
          </a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleSettingChange(type, val) {
      this.$router.push({ query: { ...this.$route.query, [type]: val } });
    },
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.handle {
  position: absolute;
  top: 50%;
  right: 100%;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  background: #1890ff;
  border-radius: 6px;
  color: #ffffff;
}
</style>
