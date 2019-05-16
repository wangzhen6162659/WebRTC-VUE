<template>
  <Header class="header">
    <Menu mode="horizontal" theme="primary">
      <!-- <div class="logo-img"></div>
      <div class="layout-logo left">
        <p>"数聚高新" - {{title.chinese}}</p>
        <span>"Data Fusion in High-Tech Zone" - {{title.english}}</span>
      </div> -->
      <div class="layout-logo left">
        <p>云盘管理系统</p>
      </div>
      <div class="layout-nav right right-icon-box">
        <div class="icon-box" @click="goIndex">
          <img class="img" :src="indexIcon" />
          <span class="text">首页</span>
        </div>
        <!--<Poptip-->
          <!--title="消息"-->
          <!--trigger="hover"-->
          <!--placement="bottom-end"-->
          <!--style="float: left;">-->
          <!--<div class="icon-box" @click="gotoMessageCenter">-->
            <!--<img class="img" src="/cloud-v1/zy_static/imgs/msg.png" />-->
            <!--<span class="text">消息</span>-->
            <!--<div class="num" v-if="msgNum > 0"><span v-if="msgNum<100">{{msgNum}}</span><span v-if="msgNum>=100">99+</span></div>-->
          <!--</div>-->
          <!--<div slot="content" class="message-container">-->
            <!--<template v-if="messages.length > 0">-->
              <!--<ul>-->
                <!--<li v-for="(msg, idx) in messages" :key="`${idx}${msg.content}`" @click="jumpTo(msg.recId)">-->
                  <!--<div :title="`(${msg.detailedTypeDesc})${msg.content}`" class="message-title">({{msg.detailedTypeDesc}}){{msg.content}}</div>-->
                  <!--<div class="message-time">-->
                    <!--<span style="float: left;">{{msg.createTime}}</span>-->
                    <!--<span style="float: right;">{{msg.appName}}</span>-->
                  <!--</div>-->
                <!--</li>-->
              <!--</ul>-->
              <!--<div class="all-message" @click="gotoMessageCenter">查看全部消息</div>-->
            <!--</template>-->
            <!--<template v-else>-->
              <!--<div class="no-message">暂无消息</div>-->
            <!--</template>-->
          <!--</div>-->
        <!--</Poptip>-->
        <div class="icon-box userInfo">
          <img class="img" :src="photo"/>
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="icon-box" @click="userLogout">
          <img class="img" :src="quitIcon" />
          <span class="text">退出</span>
        </div>
      </div>
    </Menu>
  </Header>
</template>

<script>
import api from '@/api/axiosApi'
import apiList from '@/api/comApiList'
import { mapState } from 'vuex'

const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
export default {
  props: {
    title: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      messages: [],
      msgNum: 0,
      indexIcon: `${process.env.SYSTEM_STATIC.toLowerCase()}` + '/imgs/home_default.png',
      quitIcon: `${process.env.SYSTEM_STATIC.toLowerCase()}` + '/imgs/quit_default.png',
      photo: `${process.env.SYSTEM_STATIC.toLowerCase()}` + '/imgs/user.png'
    }
  },
  mounted () {
     this.setPhoto()
    // setInterval(this.getMessage, 30 * 1000)
    // this.welcome()
    // 一秒后执行
    // setTimeout(this.getMessage, 1000)
  },
  methods: {
    setPhoto () {
      const vm = this
      var img = new Image()
      img.src = vm.userInfo.photo
      img.onerror = () => {
         img.src = vm.photo
      }
      img.onload = () => {
         vm.photo = img.src
      }
    },
    welcome () { // 欢迎通知
      let date = new Date()
      let year = date.getFullYear()
      let mouth = date.getMonth() + 1
      let day = date.getDate()
      let week = date.getDay()
      this.$Notice.config({
        top: 70,
        duration: 3
      })
      this.$Notice.open({
        title: '欢迎回来，' + this.userInfo.name,
        desc: '当前时间：' + year + '-' + mouth + '-' + day + '，' + weeks[week],
        duration: 3
      })
    },
    userLogout () {
      location.href = this.$store.state.logoutUrl
      this.$store.state.userInfo = {}
      // constantModule.userToken = ''
      // constantModule.appToken = ''
      localStorage.removeItem(`${process.env.SYSTEM_APP.toLowerCase()}_token`)
    },
    goIndex () {
      location.href = this.$store.state.indexUrl
    },
    // 跳转到对应的消息的系统
    jumpTo (id) {
      api(apiList.toHandlerMsg, {
        recvMsgId: id
      }).then(res => {
        if (res.data.errcode === 0) {
          var handlerUrl = res.data.data
          window.open(handlerUrl)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 获取消息
    getMessage () {
      const vm = this
      api(apiList.getMessage, {
        data: {
          conditions: 'all',
          userId: vm.userInfo.userId
        },
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        if (res.data.errcode === 0) {
          const list = res.data.data.list
          vm.messages = list
          vm.msgNum = res.data.data.total
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 跳转到消息中心
    gotoMessageCenter () {
      window.open('/cloud-center/admin/home?type=all')
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }
}
</script>
<style lang="less" scoped="scoped">
html .ivu-layout-header, body .ivu-layout-header, #app .ivu-layout-header, .ivu-layout .ivu-layout-header{
  background: #0C66C7;
}
.header{
  height: 81px;
}
.header /deep/ .ivu-menu-primary {
  background: #0C66C7;
}
.logo-img{
  width: 44px;
  height: 81px;
  margin-right: 10px;
  background: url('./../../../static/imgs/logoImg.png') center center no-repeat;
  background-size: contain;
  float: left;
}
.icon-box{
  cursor: pointer;
  position: relative;
  text-align: center;
  line-height: 1;
  display: inline-block;
  width: auto;
  min-width: 70px;
  padding: 0 !important;
  i{
    margin-left: calc(50% - 18px);
  }
  .num{
    position: absolute;
    top: -7px;
    right: 16px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    line-height: 25px;
    background-color: red;
  }
  .img{
    width: 40px;
    height: 40px;
    // border-radius: 50%;
  }
  .text{
    display: block;
    line-height: 1;
  }
}
.userInfo{
  cursor: auto;
  img{
    border-radius: 50%;
  }
}
.message-container{
  width: 360px;
  color: #000;
  .message-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li{
    border-bottom: 1px solid #e9eaec;
    padding: 5px 0;
    cursor: pointer;
    &:hover{
      color: #0C66C7;
    }
    .message-time{
      &:after{
        content: '';
        display: block;
        clear: both;
        height: 0;
      }
    }
  }
  .all-message{
    text-align: center;
    color: #999999;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    &:hover{
      color: #0C66C7;
    }
  }
  .no-message{
    text-align: center;
  }
}
.right-icon-box{
  height: 60px;
}
.layout-logo{
  margin-top: 18px;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  p{
    margin-bottom: 5px;
  }
  span{
    font-size: 14px;
  }
}
</style>
