<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider
      v-if="navLayout == 'left'"
      :theme="navTheme"
      v-model="collapsed"
      collapsible
      :trigger="null"
    >
      <div class="logo">
        ms_water
      </div>
      <a-menu
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        :theme="navTheme"
        mode="inline"
      >
        <template v-for="item in menuData">
          <a-sub-menu v-if="item.children" :key="item.path">
            <span
              slot="title"
              @click="
                () => {
                  $router.push({ path: item.path, query: $route.query });
                }
              "
            >
              <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </span>
            <a-menu-item
              v-for="child in item.children"
              :key="child.path"
              @click="
                () => {
                  $router.push({ path: child.path, query: $route.query });
                }
              "
            >
              {{ child.meta.title }}
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item
            v-else
            :key="item.path"
            @click="
              () => {
                $router.push({ path: item.path, query: $route.query });
              }
            "
          >
            <a-icon v-if="item.meta.icon" :type="item.meta.icon"></a-icon>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="normal-header">
          <div class="l-part">
            <a-icon
              v-if="navLayout == 'left'"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="collapsed = !collapsed"
            ></a-icon>
          </div>
          <div class="r-part">
            <router-link to="/user/login">登录</router-link>
            <a-divider type="vertical" />
            <router-link to="/user/register">注册</router-link>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2020 Created by ms_water
      </a-layout-footer>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </a-layout>
</template>
<script>
import SettingDrawer from "../components/SettingDrawer/index";
import { check } from "../utils/auth";

export default {
  name: "BasicLayout",
  components: {
    SettingDrawer
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes, null, null);
    console.log(this.selectedKeysMap, this.openKeysMap);
    return {
      collapsed: false,
      menuData,
      selectedKeys: [this.selectedKeysMap[this.$route.path]],
      openKeys: this.collapsed
        ? []
        : [this.openKeysMap[this.$route.path || this.selectedKeys]]
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = [this.selectedKeysMap[val]];
      this.openKeys = this.collapsed ? [] : [this.openKeysMap[val]];
    },
    collapsed: function() {
      this.openKeys = this.collapsed
        ? []
        : [this.openKeysMap[this.$route.path || this.selectedKeys]];
    }
  },
  methods: {
    /**
     * 获取menuData
     * @param routes
     * @param parentPath
     * @param secParentPath  对于三级以上subMenu，menu不显示，因此三级subMenu对应的openKeys是其根parent
     * @returns {[]}
     */
    getMenuData(routes, parentPath, secParentPath) {
      let menu = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        if (item.name && !item.hideInMenu) {
          let newItem = { ...item };
          delete newItem.children;
          this.selectedKeysMap[item.path] = secParentPath
            ? parentPath
            : item.path;
          this.openKeysMap[item.path] = secParentPath
            ? secParentPath
            : parentPath;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, item.path, null);
          } else if (item.children) {
            this.getMenuData(
              item.children,
              item.path,
              this.openKeysMap[this.selectedKeysMap[item.path]]
            );
          }
          menu.push(newItem);
        } else if (item.children && !item.hideInMenu) {
          menu.push(...this.getMenuData(item.children, item.path, null));
        }
      }
      return menu;
    }
  }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  text-align: center;
  font-size: 20px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #ffd700;
  overflow: hidden;
}
.normal-header {
  margin: 0 16px;
  display: flex;
}
.l-part {
  flex: 1;
}
.l-part .anticon {
  font-size: 20px;
}
.r-part {
  flex: 1;
  text-align: right;
}
</style>
