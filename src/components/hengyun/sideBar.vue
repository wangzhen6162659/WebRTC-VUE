<template>
  <!-- <Sider ref="side1" hide-trigger collapsible :collapsed-width="70" width="220" v-model="isCollapsed"> -->
    <Menu
      class="menu"
      :class="menuitemClasses"
      :style="{width: !shrink?'20%':'60px'}"
      style="float:left;max-width: 250px;"
      :active-name="activeName"
      :open-names="['0']"
      :accordion="true">
      <menu-item name="-1" class="text-center" disabled @click.native="collapsedSider">
        <Icon :class="rotateIcon" type="ios-arrow-back" size="24"></Icon>
      </menu-item>
      <template v-for="(menu, index) in menus">
        <div :key="`m${index}`" v-show="!shrink">
          <menu-item :name="menu.link" v-if="!menu.subMenu" :key="index" @click.native="goTo(menu.link,menu.name)">
            <i class="icomoon" :class="menu.icon" v-if="menu.icon"></i>
            <span>{{menu.name}}</span>
          </menu-item>
          <Submenu :name="`${index}`" v-else>
            <template slot="title">
              <i class="icomoon" :class="menu.icon" v-if="menu.icon"></i>
              <span>{{menu.name}}</span>
            </template>
            <menu-item v-for="subMenu in menu.subMenu" :key="subMenu.link"  @click.native="goTo(subMenu.link,subMenu.name)" :name="subMenu.link" style="padding-left:60px;">
              <i class="icomoon" :class="subMenu.icon" v-if="subMenu.icon"></i>
              <span>{{subMenu.name}}</span>
            </menu-item>
          </Submenu>
        </div>
        <div style="text-align: center;" :key="`div${index}`" v-show="shrink">
          <Dropdown transfer v-if="!menu.subMenu" placement="right-start" :key="`drop${index}`" @on-click="goTo(menu.link,menu.name)">
            <div class="dropDownItem" @click="goTo(menu.link,menu.name)" style="width: 70px;margin-left: -5px;padding:10px 0;">
              <i class="icomoon" :class="menu.icon" v-if="menu.icon"></i>
            </div>
            <DropdownMenu style="width: 200px;" slot="list">
              <DropdownItem :name="menu.name" :key="`d${index}`"><i class="icomoon" :class="menu.icon" v-if="menu.icon"></i><span style="padding-left:10px;">{{menu.name}}</span></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown transfer v-else placement="right-start" :key="`drop${index}`" @on-click="changeMenu">
            <div class="dropDownItem" style="width: 70px;margin-left: -5px;padding:10px 0;">
              <i class="icomoon" :class="menu.icon" v-if="menu.icon"></i>
            </div>
            <DropdownMenu style="width: 200px;" slot="list">
              <template v-for="subMenu in menu.subMenu">
                <DropdownItem :name="subMenu.link" :key="subMenu.link">
                  <i class="icomoon" :class="subMenu.icon" v-if="subMenu.icon"></i>
                  <span style="padding-left:10px;">{{subMenu.name}}</span>
                </DropdownItem>
              </template>
            </DropdownMenu>
          </Dropdown>
        </div>
      </template>
    </Menu>
  <!-- </Sider> -->
</template>
<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isCollapsed: false,
      url: '',
      route: '',
      shrink: false
    }
  },
  inject: ['reload'],
  computed: {
    activeName () {
      if (this.$route.path) { // 判断url是否存在地址跳转
        return this.$route.path
      }
      if (this.menus.length > 0 && this.menus[0].subMenu) {
        return '/home'
      }
      return '/home'
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.shrink ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.shrink ? 'collapsed-menu' : 'item-menu'
      ]
    }
  },
  watch: {
    '$route': function (route) {
      this.route = route.name
    }
  },
  methods: {
    collapsedSider () {
      this.shrink = !this.shrink
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    },
    changeMenu (name) {
      this.goTo(name, '')
    },
    goTo (path, name) {
      if (this.url === path && this.url.indexOf(this.route) !== -1) { // 判断是否当前页面刷新
        this.reload() // 右侧栏目重载
      } else {
        this.$store.state.title = name
        this.$router.push({
          path: path
        })
        this.url = path
      }
    }
  }
}
</script>
<style type="text/css" scoped="scoped">
.menu a.router-link-active{
  color: #2d8cf0 !important;
}
.item-menu i{
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu i{
  transform: rotate(-180deg) !important;
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
