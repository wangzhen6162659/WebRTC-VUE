/**
 * 共用接口文档地址
 * author：liuguangrui
 */

const serviceModule = {
  getOperateMenu: { // 通过账号Id和应用Id获取可访问资源树(只访问菜单)
    url: '/admin/p/resource/findcanoperatemenu',
    method: 'post'
  },
  getOperateButton: { // 通过账号Id、[分组、资源Id]获取可访问按钮
    url: '/admin/p/resource/findcanoperatebutton',
    method: 'post'
  },
  // 获取当前登录用户的所有单位
  getMyOrgList: {
    url: '/mt/userConfi/getMyOrgList',
    method: 'get'
  },
  // 查询指定用户可见的应用列表
  FindAppVisibleForSelf: {
    url: '/developer/application/findAppVisibleForSelf',
    method: 'get'
  },
  // 获取消息
  getMessage: {
    url: '/msgs/bbs/msg/getNotReadMsg',
    method: 'post'
  },
  toHandlerMsg: {
    url: '/msgs/bbs/msg/flagReadedAndGetUrl',
    method: 'get'
  },
  findAppByAdminWithEnable: { // 查询我所管理的所有启用的应用或服务(1：应用；2：服务)
    url: '/developer/application/findAppByAdminWithEnable',
    method: 'get'
  },
  findDictionary: { // 获取数据字典
    url: '/admin/dictionary/findDictionary',
    method: 'get'
  },
  getCodeList: { // 获取数据字典某一个
    url: '/admin/dictionary/getCodeList',
    method: 'get'
  },
  metaDeleteById: { // 删除接口
    url: '/admin/holiday/delete',
    method: 'post',
    contentType: 'postparam'
  },
  areaFind: { // 获取省份等列表
    url: '/admin/area/find',
    method: 'get'
  },
  applicationFindList: { // 获取权限管理应用列表
    url: '/developer/application/findList',
    method: 'get'
  },
  downloadpackage: { // 下载一个文件或多个文件打包下载
    url: '/admin/file/downloadpackage',
    method: 'get'
  }
}
const comApiList = { ...serviceModule }

export default comApiList
