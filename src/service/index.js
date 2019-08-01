import $ from '@/utils/fetch'
import md5 from 'md5'
export const Login = ({ userName, phone, email, account, password }) => {
  password = md5(password)
  return $.post('/login', { userName, phone, email, account, password })
}
export const LoginQut = () => {
  return $.post('/logout')
}
export const Menu = () => {
  return $.post('/mymenu')
}
export const Info = () => {
  return $.post('/myinfo')
}

// 后台管理
export const SyncOrg = () => $.post('/Admin/SyncOrg')

export const InitializeApp = () => $.post('/Admin/InitializeApp')

// 获取系统字典
export const sysDic = () => $.post('/sysDic')

// 字典Dic
export const addDic = ({ id, name, type, sort }) => {
  return $.post('/Dic/Add', { id, name, type, sort })
}
export const addDicItem = ({ parentId, sort, name }) => {
  return $.post('/Dic/AddItem', { parentId, sort, name })
}
export const undateDic = ({ id, name, type, sort }) => {
  return $.post('/Dic/Update', { id, name, type, sort })
}
export const deleteDic = ({ id }) => {
  return $.post('/Dic/Delete', { id })
}
export const listDic = ({ keyword }) => {
  return $.post('/Dic/List', { keyword })
}
export const getDicItems = ({ code }) => {
  return $.post('/Dic/GetItems', { code })
}

//export const backupDatabase = () => $.post('api/Admin/BackupDatabase')	//	备份数据库
//export const initializeApp = () => $.post('api/Admin/InitializeApp')	//	系统初始化
//export const initializeResource = () => $.post('api/Admin/InitializeResource')	//	初始化资源
//export const resetDatabase = () => $.post('api/Admin/ResetDatabase')	//	重置数据库
//export const syncOrg = () => $.post('api/Admin/SyncOrg')	//	同步机构
//export const syncUser = () => $.post('api/Admin/SyncUser')	//	同步用户
//export const updateFavicon = () => $.post('api/Admin/UpdateFavicon')	//	更新favicon
//export const batchDistribute = () => $.post('api/Admission/BatchDistribute')	//	房间批量分配
//export const checkIn = () => $.post('api/Admission/CheckIn')	//	入住登记
//export const checkOut = () => $.post('api/Admission/CheckOut')	//	退宿
//export const distribute = () => $.post('api/Admission/Distribute')	//	房间分配
//export const exchange = () => $.post('api/Admission/Exchange')	//	房间调换
//export const add = () => $.post('api/Building/Add')	//	新建楼栋
//export const 	delete	 = () => $.post('api/Building/Delete')	//	删除楼栋
//export const list = () => $.post('api/Building/List')	//	楼栋列表
//export const update = () => $.post('api/Building/Update')	//	修改楼栋
//export const add = () => $.post('api/Campus/Add')	//	创建校区
//export const 	delete	 = () => $.post('api/Campus/Delete')	//	删除校区
//export const list = () => $.post('api/Campus/List')	//	校区列表
//export const update = () => $.post('api/Campus/Update')	//	修改校区
//export const add = () => $.post('api/Class/Add')	//	创建班级
//export const 	delete	 = () => $.post('api/Class/Delete')	//	删除班级
//export const 	import	 = () => $.post('api/Class/Import')	//	班级导入
//export const list = () => $.post('api/Class/List')	//	班级列表
//export const update = () => $.post('api/Class/Update')	//	修改班级
//export const add = () => $.post('api/College/Add')	//	创建学院
//export const 	delete	 = () => $.post('api/College/Delete')	//	删除学院
//export const 	import	 = () => $.post('api/College/Import')	//	学院导入
//export const list = () => $.post('api/College/List')	//	学院列表
//export const update = () => $.post('api/College/Update')	//	修改学院
//export const add = () => $.post('api/Dept/Add')	//	创建部门
//export const 	delete	 = () => $.post('api/Dept/Delete')	//	删除部门
//export const 	import	 = () => $.post('api/Dept/Import')	//	部门导入
//export const list = () => $.post('api/Dept/List')	//	部门列表
//export const tree = () => $.post('api/Dept/Tree')	//	部门树
//export const update = () => $.post('api/Dept/Update')	//	修改部门
//export const add = () => $.post('api/Dic/Add')	//	创建字典
//export const addItem = () => $.post('api/Dic/AddItem')	//	创建字典项
//export const 	delete	 = () => $.post('api/Dic/Delete')	//	删除字典
//export const getItems = () => $.post('api/Dic/GetItems')	//	查询字典项
//export const list = () => $.post('api/Dic/List')	//	字典列表
//export const update = () => $.post('api/Dic/Update')	//	修改字典
//export const add = () => $.post('api/Discipine/Add')	//	创建专业
//export const 	delete	 = () => $.post('api/Discipine/Delete')	//	删除专业
//export const 	import	 = () => $.post('api/Discipine/Import')	//	专业导入
//export const list = () => $.post('api/Discipine/List')	//	专业列表
//export const update = () => $.post('api/Discipine/Update')	//	修改专业
//export const add = () => $.post('api/Faculty/Add')	//	创建系别
//export const 	delete	 = () => $.post('api/Faculty/Delete')	//	删除系别
//export const 	import	 = () => $.post('api/Faculty/Import')	//	系别导入
//export const list = () => $.post('api/Faculty/List')	//	系别列表
//export const update = () => $.post('api/Faculty/Update')	//	修改系别
//export const accessLog = () => $.post('api/Log/AccessLog')	//	站点访问日志查询
//export const dbBackupLog = () => $.post('api/Log/DbBackupLog')	//	数据库备份日志查询
//export const roleAuthorizLog = () => $.post('api/Log/RoleAuthorizLog')	//	角色授权日志查询
//export const roomCheckinLog = () => $.post('api/Log/RoomCheckinLog')	//	入住日志查询
//export const roomCheckoutLog = () => $.post('api/Log/RoomCheckoutLog')	//	退宿日志查询
//export const roomDistributeLog = () => $.post('api/Log/RoomDistributeLog')	//	房间分配日志查询
//export const roomExchangeLog = () => $.post('api/Log/RoomExchangeLog')	//	调宿日志查询
//export const userAuthorizLog = () => $.post('api/Log/UserAuthorizLog')	//	用户授权日志查询
//export const userOperateLog = () => $.post('api/Log/UserOperateLog')	//	用户操作日志查询
//export const list = () => $.post('api/Org/List')	//	机构列表
//export const tree = () => $.post('api/Org/Tree')	//	机构树
//export const add = () => $.post('api/Resource/Add')	//	添加资源
//export const 	delete	 = () => $.post('api/Resource/Delete')	//	删除资源
//export const 	import	 = () => $.post('api/Resource/Import')	//	导入资源
//export const list = () => $.post('api/Resource/List')	//	资源列表
//export const tree = () => $.post('api/Resource/Tree')	//	资源列表树
//export const update = () => $.post('api/Resource/Update')	//	修改资源
//export const add = () => $.post('api/Role/Add')	//	新建角色
//export const batchDelete = () => $.post('api/Role/BatchDelete')	//	批量删除角色
//export const 	delete	 = () => $.post('api/Role/Delete')	//	删除角色
//export const 	import	 = () => $.post('api/Role/Import')	//	导入角色
//export const list = () => $.post('api/Role/List')	//	角色列表
//export const update = () => $.post('api/Role/Update')	//	修改角色
//export const add = () => $.post('api/Room/Add')	//	创建房间
//export const 	delete	 = () => $.post('api/Room/Delete')	//	删除房间
//export const page = () => $.post('api/Room/Page')	//	房间查询
//export const update = () => $.post('api/Room/Update')	//	修改房间
//export const add = () => $.post('api/Staff/Add')	//	创建教职工
//export const 	delete	 = () => $.post('api/Staff/Delete')	//	删除教职工
//export const 	import	 = () => $.post('api/Staff/Import')	//	教职工导入
//export const list = () => $.post('api/Staff/List')	//	教职工列表
//export const page = () => $.post('api/Staff/Page')	//	教职工列表
//export const update = () => $.post('api/Staff/Update')	//	修改教职工
//export const add = () => $.post('api/Student/Add')	//	创建学生
//export const 	delete	 = () => $.post('api/Student/Delete')	//	删除学生
//export const 	import	 = () => $.post('api/Student/Import')	//	学生导入
//export const list = () => $.post('api/Student/List')	//	学生列表
//export const page = () => $.post('api/Student/Page')	//	学生列表
//export const update = () => $.post('api/Student/Update')	//	修改学生
//export const 	delete	 = () => $.post('api/User/Delete')	//	删除用户
//export const disable = () => $.post('api/User/Disable')	//	禁用用户
//export const enable = () => $.post('api/User/Enable')	//	启用用户
//export const 	import	 = () => $.post('api/User/Import')	//	导入用户
//export const page = () => $.post('api/User/Page')	//	用户查询
