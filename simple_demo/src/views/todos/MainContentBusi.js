import UserOperApi from './api.js' ;
import _ from 'lodash' ;
import util from 'common/util.js' ;
export default {
    fetchAllUserList(vvm){
        let promise = UserOperApi.queryUserList() ;
        promise.then((userList)=>{
            userList.forEach(item=>vvm.list.push(item)) ;
            let curPage = 1 ;
            let pageSize = 15 ;
            let recordCount = 75 ;
            let recordList = userList ;
            let pageBeanModel = util.assamblePageBean(curPage, pageSize, recordCount, recordList) ;
            console.info('pageBeanModel : ' , pageBeanModel) ;
            //console.info('vvm.pageBean : ' ,vvm.pageBean) ;
            let pageBean = util.convertPageBeanModelToPageBean(pageBeanModel) ;
            Object.assign(vvm.pageBean,pageBean) ;
        }) ;
        //util.assamblePageBean = function(curPage, pageSize, recordCount, recordList) {
    },
    newAddUser(user,vvm){/*处理新加用户操作*/
        var t = new Date().getTime() ;
        //注意这里不能直接使用_.uniqueId('id_")
        //因为loadash可能只能保证一个生命周期内生成的id不同，
        //如果使用了localStorage，刷新页面后就不能保证了
        let id = _.uniqueId('id_'+t+"_") ;
        user.id = id ;
        let newUser = Object.assign({},user) ;
        //这里之所以传一个新的user过去是为了防止在api.addUser方法内部
        //修改了user对象，从而影响后面对user的使用
        let promise = UserOperApi.addUser(newUser) ;
        promise.then((msg) =>{
            console.info('新增用户成功...') ;
            vvm.list.push(user) ;
        }) ;
    },
    updateUser(user,vvm){/*处理更新用户操作*/
        let id = user.id ;
        //更新页面上的用户信息
        let promise = UserOperApi.updateUser(user) ;
        promise.then(msg=>{
            let tmp = vvm.list.find(findUserById(id)) ;
            Object.assign(tmp,user) ;
        }) ;
    },
    handleDeleteUser(id,vvm){
        let promise = UserOperApi.deleteUserById(id) ;
        promise.then(msg=>{
            console.info('删除用户成功...')
            let newUserList = vvm.list.filter(item1=>{
                return item1.id !== id ;
            }) ; 
            vvm.list.splice(0) ;
            newUserList.forEach(item2=>{
                vvm.list.push(item2) ;
            }) ;
        }) ;
    },
    getFilterList(vvm){
        let{list,queryCondation}  = vvm ;
        let newList = list ;
        let keys = Object.keys(queryCondation) ;
        keys.forEach(propName=>{
            newList = fileterList(newList,propName,queryCondation[propName]) ;
        }) ;
        return newList ;
    }
} ;

function findUserById(id) {
    return function(user){
        return user.id === id;
    }
}

function fileterList (list,propName,filterKey){
    if(filterKey == null || filterKey.trim().length === 0){
        return list;
    }
    //如果filterKey存在
    return list.filter(item=>{
        let index = item[propName].indexOf(filterKey) ;
        if( index!==-1 ){
           return true ; 
        }
        return false; 
    }) ;
}