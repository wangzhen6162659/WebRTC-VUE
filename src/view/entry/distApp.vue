<template>
  <div>
    <template span="8">
    </template>
    <Layout>
      <Layout class="ivu-layout-has-sider" v-if="true">
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {

  },
  mounted () {
    // this.getOperateMenu()
  },
  methods: {
      getOperateMenu () {
        this.$router.push({
          path: '/home/1/1/1'
        })
      },
    }
  }
</script>

<style lang="less">
  .demo-spin-col-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #ee212a;
  }
  #hySpin{
    z-index: 8888;
    background-color: rgba(255,255,255,.5);
  }
  .mask_btn{
    margin-top: 10px;
  }
</style>
