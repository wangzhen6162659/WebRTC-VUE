/* eslint-disable */
import loginConfig from './config.js'
import store from '@/view/store'

window.hy_auth_login = function (){
  var loginController = {};
  if(!loginConfig){
    console.log("请加载登录配置信息")
    return ;
  }
  loginController.isLogined = function (){
    var token = loginController.getUserToken();
    return token?true:false;
  }
  /**
   * 获取当前项目的登录人信息（包含了token，用户名，用户id。）
   * 因为系统内部包含了多个平台，而且每个平台的token都是不一样的，故登录人信息是和平台绑定的，
   * 一个平台一个登录人信息，各自是隔离开的。
   */
  loginController.getLoginUserInfo = function (){

    //开发测试用
    localStorage.setItem(this.getContentPath()+"_token","{\"logined\":true,\"userid\":\"1\",\"account\":\"admin\",\"photo\":\"http://139.159.241.21:6080/group1/M00/00/A9/wKgANVuN46iARPOxAAB_WR82GUk180.jpg\",\"name\":\"管理员\",\"errorCode\":null,\"errorMsg\":null,\"userToken\":\"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwiYWNjb3VudCI6ImFkbWluIiwibmFtZSI6IueuoeeQhuWRmCIsInJvbGVzIjoxMDM4MzMxLCJsb2dpbmZsYWciOjI2ODQzNTYwMywib3JnaWQiOiI2NjE2NDYyMTU0ODI2Nzk0OTI3Iiwib3JnbmFtZSI6IumBteS5ieW4guawkeaUv-WxgCIsImRlcGFydG1lbnRpZCI6Ii00MzEyNzM5NjUwNDk3OTg2NTU4IiwiZGVwYXJ0bWVudG5hbWUiOiLlip7lhazlrqQiLCJleHAiOjE1NjQ0MTQ3MDB9.WC6pPknZy9A39zC1dP5PRzz5cxgvnfi-qCNDwXihLBAFfZrmuldxx0iqGvZfgFVMX3i2I8Svx7BZXSba025lckP0q_wd2UkJDTPEhQ4JDLs9ZNpxS9nfrsh4Yn8Wqv8YzIhyly5JgA49Tij7Z8M2PGF5o8TYz9cyJc_r7on127M\",\"appToken\":\"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NWtqNjM1MiIsImFwcG5hbWUiOiLkupHnm5jnrqHnkIbns7vnu58iLCJleHAiOjE1NjQ0MTg0MDB9.MOuZ-SptTyPWDgdWBtQGeaFidLEbR1GP_41yMaKYI7NvaBdEHe1Em51JQr3MnlH2s32iINTNAaYzMVx9AC9aIP04kb9RuQSwSvPrMlmzMnuFK552c3xwJfXS2m27BXyX4Qp-gBeiBM_ZiGj9ohJ0Ee2xqNrwQyKnKcqSGtd4rds\"}")

    var loginInfo = window.localStorage.getItem(this.getContentPath()+"_token");
    if(loginInfo){
      return eval("("+loginInfo+")");
    }
    return null;
  }

  loginController.setLoginUserInfo = function(token){

    window.localStorage.setItem(this.getContentPath()+"_token",  token);

    store.commit('GETUSERINFO');

  }
  loginController.emptyLoginUserInfo = function(){

    delete window.localStorage[this.getContentPath()+"_token"];
  }
  /**
   * 完整的登录流程，集成了单点登录。在未登录的情况之下，请调用此方法来进行登录。
   * 在已经登录的情况之下，将不会做任何事，直接返回了。
   *
   */
  loginController.loginFlow = function(){
    if(this.isLogined()){
      //已经登录了   不需要登录
      return ;
    }
    //在登录成功后，回调时会传入token
    var token = this.getRequestParamToken();
    if(token){
      //若有token，表示用户登录了，需要通过token去换取用户登录信息
      this.getLoginInfo(token);
    }else{
      //记录执行登录前的请求地址
      window.localStorage.setItem(this.getContentPath()+"login_before_targte_url",location.href);
      //去执行登录
      this.toLogin();
    }
  }

  loginController.toLogin = function(){
    // 暂时取消判断登陆
    location.href=this.getLoginUrl();
  }

  loginController.getLoginUrl = function (){
    //因为同时集成了多个平台在一个系统，所以在登录时，需要知道是登录哪一个系统
    var protocol_ip_port = window.location.protocol + '//' + window.location.host + '/';
    var path = this.getContentPath();
    var service = protocol_ip_port + path;
    var prefix = `${process.env.SYSTEM_PREFIX.toLowerCase()}`
    service = protocol_ip_port + prefix + path + '/index.html';
    var loginUrl = loginConfig.sso_login_url + "?service=" + service;
    return loginUrl;
  }

  loginController.getRequestParamToken = function(){

    var para=window.location.search;//当前请求的url的参数部分
    return loginController.GetQueryString(para,"ticket");
  }


  //根据参数部分和参数名来获取参数值
  loginController.GetQueryString = function (paraPart,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = paraPart.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
  /**
   * 获取用户级token
   */
  loginController.getUserToken = function (){

    var loginUserInfo = this.getLoginUserInfo();
    return loginUserInfo && loginUserInfo.appToken;
  }
  /**
   * 获取登录人的名字
   */
  loginController.getUserName = function (){

    var loginUserInfo = this.getLoginUserInfo();
    return loginUserInfo && loginUserInfo.name;
  }
  /**
   * 获取登录人的id
   */
  loginController.getUserId = function (){

    var loginUserInfo = this.getLoginUserInfo();
    return loginUserInfo && loginUserInfo.userid;
  }
  /**
   * 获取登录人的账号
   */
  loginController.getUserAccount = function (){

    var loginUserInfo = this.getLoginUserInfo();
    return loginUserInfo && loginUserInfo.account;
  }

  loginController.getLoginInfo = function (token){

    $.ajax({
      url: loginConfig.sso_validate_url +"?ticket="+token+"&appKey="+loginConfig[this.getContentPath()+"_appKey"],
      type:"get",
      dataType:"json",
      async: false,
      success:function (r){
        if(r && r.logined){
          loginController.setLoginUserInfo(JSON.stringify(r));
          var login_before_targte_url = window.localStorage.getItem(loginController.getContentPath() + "login_before_targte_url");
          if(login_before_targte_url){
            //恢复执行登录前的访问请求
            window.localStorage.removeItem(loginController.getContentPath() + "login_before_targte_url");
            location.href=login_before_targte_url;
          }
        } else{
          loginController.toLogin();
        }
      }
    });
  }

  /**
   * 获取contentPath。
   * 列如：http://139.159.241.21:10086/cloud-security/#/interfacePermission
   * contenPath： cloud-security
   */
  loginController.getContentPath = function (){

    return window.location.pathname.split('/')[2];
  }
  window.loginController = loginController;

  /**
   * 因为localStorage可以跨多个窗口共享数据，而sessionStorage是单窗口共享数据。
   * 而localStorage是关闭浏览器依然存在，不会被删除的。
   * 而sessionStorage是关闭浏览器就消除了的。
   * 故我这里间接的实现localStorage在关闭浏览器后失效的功能。
   *
   */
  (function (){

    function BrowserIsReopen(){

      return document.cookie.indexOf("rsdf125w5s21d1_3g5v3b9t9y5f") < 0;
    }

    function FlagBrowserNotIsReopen(){
      document.cookie = "rsdf125w5s21d1_3g5v3b9t9y5f=0;path=/;";
    }

    var browserIsReopen = BrowserIsReopen();
    if(browserIsReopen){
      window.localStorage.clear();
      FlagBrowserNotIsReopen();
    }
  })()

  //暂时取消登录,用默认用户
  // loginController.loginFlow()
}
