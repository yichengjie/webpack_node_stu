const TODOLISTUSER = "todo_list_user" ;
export default {
    addUser(user){
        let flag = _isSupportLocalStorage() ;
        if(!flag) return false ;
        let userList = _getUserList() ;
        //将数据保存到localstrage中去
        userList.push(user) ;
        _saveUserList(userList) ;
    },
    fetch(){
       let flag = _isSupportLocalStorage() ;
       if(!flag) return false ;
       let userList = _getUserList() ;
       return userList ;
    },
    updateUser(user){
        let flag = _isSupportLocalStorage() ;
        if(!flag) return false ;
        let id = user.id ;
        let userList = _getUserList() ;
        let tmp = userList.find(_findUserById(id)) ;
        Object.assign(tmp,user) ;
        _saveUserList(userList) ;
    }
} ;//localStorage
//从localStorage中获取userlist数组
function _getUserList (){
    let userList = window.localStorage.getItem(TODOLISTUSER) ;
    //判断todo-list-user是否存在
    if(userList!=null){
        userList = JSON.parse(userList) ;
    }else{
        userList = [] ;
    }
    return userList ;
}
//将list保存到localStorage中
function _saveUserList(userList){
    window.localStorage.setItem(TODOLISTUSER,JSON.stringify(userList)) ;
}

function _isSupportLocalStorage(){
    if(window.localStorage){
        return true ;
    }
    console.warn('浏览器不支持localStorage...') ;
    return false;
}
function _findUserById(id) {
    return function(user){
      return user.id === id;
    }
}