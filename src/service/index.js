import $ from '@/utils/fetch'
import md5 from 'md5'
export const Login = ({ userName, phone, email, account, password }) => {
    return $.post('/Login', { userName, phone, email, account, password: md5(password) })
}
export const LoginQut = () => {
    return $.post('/Logout')
}
export const Menu = () => {
    return $.post('/MyMenu')
}
export const Info = () => {
    return $.post('/MyInfo')
}

// Admin
export const SyncOrg = () => {
    return $.post('/Admin/SyncOrg')
}
export const InitializeApp = () => {
    return $.post('/Admin/InitializeApp')
}
// 获取系统字典
export const sysDic = () => {
    return $.post('/sysDic')
}

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

// 资源
export const updateResource = ({ id, name, parentId, icon, url, sort, type }) => {
    return $.post('/Resource/update', { id, name, parentId, icon, url, sort, type })
}
export const addResource = ({ name, parentId, icon, url, sort, type }) => {
    return $.post('/Resource/add', { name, parentId, icon, url, sort, type })
}
export const deleteResource = ({ id }) => {
    return $.post('/Resource/Delete', { id })
}
export const listResource = ({ type,keyword }) => {
    return $.post('/Resource/List', { type,keyword })
}
export const treeResource = () => {
    return $.post('/Resource/Tree')
}
export const importResoure = ([...{id, name, parentId, icon, url, sort, type,typeName,childNodes}])=>{
    return $.post('/Resource/Import',[...{id, name, parentId, icon, url, sort, type,typeName,childNodes}])
}

//校区列表
export const getCampusList = ({ keyword }) => {
    return $.post('/Campus/List', {
        keyword
    })
}

// 获取楼栋列表
export const getBuildingList = () => {
    return $.post('/Building/List')
}