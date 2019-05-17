/**
 * 云盘管理系统接口文档地址
 */

const serviceModule = {
  saveUser: {//用户新增
    url: '/video/anno/user',
    method: 'post'
  },
  getDecode: {
    url: '/video/anno/user/getDecode',
    method: 'post'
  },
  saveMeet: {
    url: 'video/anno/meet',
    method: 'post'
  },
  getMeet: {
    url: 'video/anno/meet/get',
    method: 'get'
  },
  login: {
    url: 'video/anno/user/getUserByPhone',
    method: 'get'
  },
  meetingSeach: {
    url: 'video/anno/meet/findBySelect',
    method: 'post'
  }
  // findTyrzJoinLastYear: { // 近一年系统统一认证接入情况
  //   url: '/developer/serviceModule/findTyrzJoinLastYear',
  //   method: 'get'
  // },
  // findResourAndRoleLastYear: { // 近一年资源-角色完善情况
  //   url: '/admin/resource/findResourAndRoleLastYear',
  //   method: 'get'
  // },
  // getOrgStatisticsNum: { // 卡片数据
  //   url: '/admin/gxqpt/org/getOrgStatisticsNum',
  //   method: 'get'
  // },
  // getFastEntryRank: { // 常用快捷入口菜单排名
  //   url: '/admin/fastEntry/getFastEntryRank',
  //   method: 'get'
  // },
  // getBySource: { // 获取体系来源列表
  //   url: '/admin/system/getBySource',
  //   method: 'get'
  // },
  // findSystemList: { // 获取体系列表
  //   url: '/admin/system/findSystemList',
  //   method: 'post'
  // },
  // findHolidayOriginalPage: { // 获取节假日数据列表
  //   url: '/admin/holiday/findHolidayOriginalPage',
  //   method: 'post'
  // },
  // orgFind: { // 获取组织机构列表
  //   url: '/admin/gxqpt/org/find',
  //   method: 'get'
  // },
  // orgPageByIds: { // 获取单位列表
  //   url: '/admin/gxqpt/org/pageByIds',
  //   method: 'post'
  // },
  // orgRemove: { // 删除单位
  //   url: '/admin/gxqpt/org/remove',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // orgGetById: { // 获取详情
  //   url: '/admin/gxqpt/org/getById',
  //   method: 'get'
  // },
  // findEmpListBySelect: { // 获取单位管理员
  //   url: '/admin/emp/findEmpListBySelect',
  //   method: 'post'
  // },
  // orgSave: { // 新增单位
  //   url: '/admin/gxqpt/org/save',
  //   method: 'post'
  // },
  // orgUpdate: { // 更新单位信息
  //   url: '/admin/gxqpt/org/update',
  //   method: 'post'
  // },
  // orgUpdateEnable: { // 启用、禁用（批量）
  //   url: '/admin/gxqpt/org/updateEnable',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // newsManagementSave: {// 新增节假日
  //   url: '/admin/holiday/save',
  //   method: 'post'
  // },
  // applicationFindAll: { // 获取所有应用
  //   url: '/developer/application/findAll',
  //   method: 'post'
  // },
  // applicationFindAllList: { // 获取所有应用非分页
  //   url: '/developer/application/findAllList',
  //   method: 'get'
  // },
  // orgGetShares: { // 获取已分享的列表
  //   url: '/admin/gxqpt/org/getShares',
  //   method: 'get'
  // },
  // orgUpdateShare: { // 更新分享列表
  //   url: '/admin/gxqpt/org/updateShare',
  //   method: 'post'
  // },
  // orgExport: { // 单位导出
  //   url: '/admin/gxqpt/org/export',
  //   method: 'get'
  // },
  // orgImport: { // 单位导入
  //   url: '/admin/gxqpt/org/saveOrgs',
  //   method: 'post'
  // },
  // downLoadTemplet: { // 单位daoru 模板下载
  //   url: '/admin/gxqpt/org/downLoadTemplet',
  //   method: 'post'
  // },
  // downLoadPartTemplet: { // 部门模板下载
  //   url: '/admin/gxqpt/dpm/downloadTemplet',
  //   method: 'get'
  // },
  // orgSaveManagerByOrg: { // 绑定单位数据管理员
  //   url: '/admin/gxqpt/org/saveManagerByOrg',
  //   method: 'get'
  // },
  // orgDeleteManagerByOrg: { // 绑定单位数据管理员
  //   url: '/admin/gxqpt/org/deleteManagerByOrg',
  //   method: 'get'
  // },
  // dpmPageLike: { // 根据id获取部门列表
  //   url: '/admin/gxqpt/dpm/pageLike',
  //   method: 'post'
  // },
  // dpmRemove: { // 删除部门
  //   url: '/admin/gxqpt/dpm/remove',
  //   method: 'get',
  // },
  // dpmGet: { // 获取部门详情
  //   url: '/admin/gxqpt/dpm/get',
  //   method: 'get'
  // },
  // dpmSave: { // 保存新部门
  //   url: '/admin/gxqpt/dpm/save',
  //   method: 'post'
  // },
  // dpmUpdate: { // 更新部门
  //   url: '/admin/gxqpt/dpm/update',
  //   method: 'post'
  // },
  // dpmUpdateEnable: { // 启用、禁用（批量）
  //   url: '/admin/gxqpt/dpm/updateEnable',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // dpmExport: { // 部门导出
  //   url: '/admin/gxqpt/dpm/export',
  //   method: 'get'
  // },
  // dpmImport: { // 部门导入
  //   url: '/admin/gxqpt/dpm/saveDpms',
  //   method: 'post'
  // },
  // saveImportEmp: { // 人员导入
  //   url: '/admin/emp/saveImportEmp',
  //   method: 'post'
  // },
  // empFindEmpList: { // 获取人员列表
  //   url: '/admin/emp/findEmpList',
  //   method: 'post'
  // },
  // empEnnable: { // 启用（批量）
  //   url: '/admin/emp/ennable',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // empDisable: { // 禁用（批量）
  //   url: '/admin/emp/disable',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // empRemoveById: { // 删除人员
  //   url: '/admin/emp/removeById',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // downloadEmpList: { // 人员导出
  //   url: '/admin/emp/downloadEmpList',
  //   method: 'get'
  // },
  // empUpdateOrgPower: { // 绑定单位数据管理员
  //   url: '/admin/emp/updateOrgPower',
  //   method: 'get'
  // },
  // pageEmpAndPower: { // 获取单位下人员对数据的可读操作性
  //   url: '/admin/emp/pageEmpAndPower',
  //   method: 'post'
  // },
  // dutiesFindDutiesList: { // 获取职务列表
  //   url: '/admin/duties/findDutiesList',
  //   method: 'post'
  // },
  // empGetById: { // 获取详情
  //   url: '/admin/emp/getById',
  //   method: 'get'
  // },
  // dictionaryGetCodeList: { // 获取字典
  //   url: '/admin/dictionary/getCodeList',
  //   method: 'get'
  // },
  // postFindPostList: { // 获取岗位列表
  //   url: '/admin/post/findPostList',
  //   method: 'post'
  // },
  // postGet: { // 获取岗位详情
  //   url: '/admin/post/getPostById',
  //   method: 'get'
  // },
  // postSave: { // 新增岗位
  //   url: '/admin/post/save',
  //   method: 'post'
  // },
  // postUpdate: { // 修改岗位
  //   url: '/admin/post/updateById',
  //   method: 'post'
  // },
  // postRemove: { // 删除岗位
  //   url: '/admin/post/removeById',
  //   method: 'get'
  // },
  // dutyFindPostList: { // 获取职务列表
  //   url: '/admin/duties/findDutiesList',
  //   method: 'post'
  // },
  // dutyGet: { // 获取职务详情
  //   url: '/admin/duties/getDutiesById',
  //   method: 'get'
  // },
  // dutySave: { // 新增职务
  //   url: '/admin/duties/save',
  //   method: 'post'
  // },
  // dutyUpdate: { // 修改职务
  //   url: '/admin/duties/updateById',
  //   method: 'post'
  // },
  // dutyRemove: { // 删除职务
  //   url: '/admin/duties/removeById',
  //   method: 'get'
  // },
  // empSave: { // 新增人员
  //   url: '/admin/emp/save',
  //   method: 'post'
  // },
  // empUpdateById: { // 更新人员
  //   url: '/admin/emp/updateById',
  //   method: 'post'
  // },
  // empIdentitySave: { // 新增身份
  //   url: '/admin/empIdentity/save',
  //   method: 'post'
  // },
  // empIdentityUpdateById: { // 修改身份
  //   url: '/admin/empIdentity/updateById',
  //   method: 'post'
  // },
  // empIdentityPage: { // 获取身份列表
  //   url: '/admin/empIdentity/page',
  //   method: 'post'
  // },
  // empSettingIdentity: { // 设置主身份
  //   url: '/admin/emp/settingIdentity',
  //   method: 'post'
  // },
  // empIdentityRemoveById: { // 删除身份
  //   url: '/admin/empIdentity/removeById',
  //   method: 'get'
  // },
  // empIdentityGetById: { // 获取身份信息详情
  //   url: '/admin/empIdentity/getById',
  //   method: 'get'
  // },
  // empUpdatePasswordById: { // 修改密码
  //   url: '/admin/emp/updatePasswordById',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // empGetEmpBindUser: { // 获取绑定详情
  //   url: '/admin/emp/getEmpBindUser',
  //   method: 'get'
  // },
  // rolePage: { // 系统角色管理获取角色列表
  //   url: '/admin/role/page',
  //   method: 'post'
  // },
  // roleSave: { // 系统角色管理保存角色
  //   url: '/admin/role/save',
  //   method: 'post'
  // },
  // roleUpdate: { // 系统角色管理修改角色
  //   url: '/admin/role/update',
  //   method: 'post'
  // },
  // roleDetail: { // 系统角色管理获取详情
  //   url: '/admin/role/detail',
  //   method: 'get'
  // },
  // roleDisable: { // 系统角色管理角色禁用
  //   url: '/admin/role/disable',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // roleEnabled: { // 系统角色管理角色启用
  //   url: '/admin/role/enabled',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // pageRolesBindByUserAndAppId: { // 获取某人某个App下的所有角色绑定信息
  //   url: '/admin/role/pageRolesBindByUserAndAppId',
  //   method: 'post'
  // },
  // getBaseOrgInfo: { // 获取角色用户单位列表
  //   url: '/admin/role/getBaseOrgInfo',
  //   method: 'get'
  // },
  // getBaseOrgDpmInfo: { // 获取角色用户单位部门列表
  //   url: '/admin/gxqpt/dpm/find',
  //   method: 'get'
  // },
  // findEmpList: { // 获取角色用户列表
  //   url: '/admin/emp/findEmpList',
  //   method: 'post'
  // },
  // getUser: { // 获取角色用户列表选中用户
  //   url: '/admin/role/getUser',
  //   method: 'get'
  // },
  // setroleuser: { // 用户列表设置保存
  //   url: '/admin/role/setroleuser',
  //   method: 'post'
  // },
  // resourceGetTree: { // 获取角色权限资源
  //   url: '/admin/resource/getTree',
  //   method: 'get'
  // },
  // getowerresource: { // 获取资源权限列表
  //   url: '/admin/role/getowerresource',
  //   method: 'get'
  // },
  // roleRoleauth: { // 资源权限列表设置保存
  //   url: '/admin/role/roleauth',
  //   method: 'post'
  // },
  // ptRolePage: { // 平台角色管理获取角色列表
  //   url: '/admin/role/ptRolePage',
  //   method: 'post'
  // },
  // /* 权限管理栏目接口 **/
  // findResList: { // 获取权限管理-管理应用列表名单
  //   url: '/developer/application/findList',
  //   method: 'get'
  // },
  // findAllList: { // 获取权限管理-所有应用列表名单
  //   url: '/developer/application/findAllList',
  //     method: 'get'
  // },
  // getResTree: { // 根据应用id获取资源结构的树形目录
  //   url: '/admin/resource/getTree',
  //   method: 'get'
  // },
  // dragItem: { // 拖拽排序
  //   url: '/admin/resource/drag',
  //   method: 'get'
  // },
  // saveItem: { // 新增
  //   url: '/admin/resource/save',
  //   method: 'post'
  // },
  // updateItem: { // 编辑
  //   url: '/admin/resource/update',
  //   method: 'post'
  // },
  // deleteItem: { // 删除
  //   url: '/admin/resource/delete',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // detailItem: { // 详情
  //   url: '/admin/resource/detail',
  //   method: 'get'
  // },
  // userPage: { // 权限管理用户管理获取列表
  //   url: '/admin/user/page',
  //   method: 'post'
  // },
  // pageEmpAndUser: { // 获取关联用户列表
  //   url: '/admin/user/pageEmpAndUser',
  //   method: 'post'
  // },
  // userIsLogin: { // 设置用户是否允许登录
  //   url: '/admin/user/update',
  //   method: 'post'
  // },
  // pageManagerByOrg: { // 设置用户是否允许登录
  //   url: '/admin/user/pageManagerByOrg',
  //   method: 'post'
  // },
  // regioninfoByIds: { // 获取地区信息列表
  //   url: '/admin/area/get',
  //   method: 'get'
  // },
  // newsManagementDetail: { // 获取元数据详情
  //   url: '/admin/holiday/getHolidayOriginal',
  //   method: 'get'
  // },
  // metaDeleteById: { // 节假日元删除接口
  //   url: '/admin/holiday/delete',
  //   method: 'get',
  //   contentType: 'postparam'
  // },
  // newsManagementUpdate: {
  //   url: '/admin/holiday/update',
  //   method: 'post'
  // },
  // findAreaTree: { // 获取地区列表
  //   url: '/admin/area/findAreaTree',
  //   method: 'get'
  // },
  // dictionaryDictionaryTree: { // 获取数据字典目录
  //   url: '/admin/dictionary/dictionaryTree',
  //   method: 'get'
  // },
  // applicationFindList: { // 获取应用列表
  //   url: '/developer/application/findList',
  //   method: 'get'
  // },
  // dictionaryPage: { // 获取字典列表
  //   url: '/admin/dictionary/page',
  //   method: 'post'
  // },
  // dictionarySave: { // 保存新条目
  //   url: '/admin/dictionary/save',
  //   method: 'post'
  // },
  // dictionaryGet: { // 获取条目信息
  //   url: '/admin/dictionary/get',
  //   method: 'get'
  // },
  // dictionaryUpdate: { // 更新条目信息
  //   url: '/admin/dictionary/update',
  //   method: 'post'
  // },
  // dictionaryDelete: { // 删除字典
  //   url: '/admin/dictionary/delete',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // dictionaryDeleteType: { // 删除字典类型
  //   url: '/admin/dictionary/deleteType',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // dictionarySaveType: { // 新增目录
  //   url: '/admin/dictionary/saveType',
  //   method: 'post'
  // },
  // dictionaryUpdateType: { // 修改目录
  //   url: '/admin/dictionary/updateType',
  //   method: 'post'
  // },
  // dictionaryGetType: { // 获取字典目录详情
  //   url: '/admin/dictionary/getType',
  //   method: 'get'
  // },
  // dictionarySaveregion: { // 新增地区信息
  //   url: '/admin/area/save',
  //   method: 'post'
  // },
  // getDataList: { // 获取节假日数据
  //   url: '/admin/holiday/getDataList',
  //   method: 'get'
  // },
  // createHolidayDate: { // 生成节假日信息
  //   url: '/admin/holiday/createHolidayDate',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // updateHolidayData: { // 更新节假日信息
  //   url: '/admin/holiday/updateHolidayData',
  //   method: 'POST'
  // },
  // areaDelete: { // 删除地区信息
  //   url: '/admin/area/delete',
  //   method: 'get',
  //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  // },
  // areaSave: { // 增加地区
  //   url: '/admin/area/save',
  //   method: 'post'
  // },
  // areaUpdate: { // 更新地区信息
  //   url: '/admin/area/update',
  //   method: 'post'
  // },
  // saveHolidayData: {// 新增节假日
  //   url: '/admin/holiday/saveHolidayData',
  //   method: 'post'
  // },
  // getHolidayById: { // 修改节假日信息
  //   url: '/admin/holiday/getHolidayById',
  //   method: 'get'
  // }
}
const comApiList = { ...serviceModule }

export default comApiList
