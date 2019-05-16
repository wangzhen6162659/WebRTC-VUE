function getServerInfoConfig () {
  var con = {
    sso_ip: '58.16.181.23',
    sso_port: '10087'
  }
  // var con = {
  //   sso_ip: '192.168.1.124',
  //   sso_port: '10086'
  // }
  var host = window.location.host
  if (host.indexOf('192') === -1 && host.indexOf('localhost') === -1) {
    con.sso_ip = window.location.hostname
    con.sso_port = window.location.port
  }
  return con
}

const serverInfoConfig = getServerInfoConfig()
const loginConfig = {
  sso_login_url: `http://${serverInfoConfig.sso_ip}:${serverInfoConfig.sso_port}/${process.env.PLATFORM.toLowerCase()}-center/slogin`,          //登录
  sso_validate_url: `http://${serverInfoConfig.sso_ip}:${serverInfoConfig.sso_port}/${process.env.PLATFORM.toLowerCase()}-center/svalidate`,    //验证
  sso_logout_url: `http://${serverInfoConfig.sso_ip}:${serverInfoConfig.sso_port}/${process.env.PLATFORM.toLowerCase()}-center/prepare/logout`, //退出
  center_index_url: `http://${serverInfoConfig.sso_ip}:${serverInfoConfig.sso_port}/zysjtl-data/zy-index/#/home`,                               //首页
  dist_local_service_url: `${process.env.SYSTEM_APP.toLowerCase()}/index.html`,
  "dist_appKey": 'XzN9V8tQjanJ8vtCturrfFZitNtmv8TenkbzpNRotSfpD9RVkz00e'
}

export default loginConfig
