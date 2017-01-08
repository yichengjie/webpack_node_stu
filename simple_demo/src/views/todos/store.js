const TODOLISTUSER = "todo_list_user" ;
export default {
    addUser(user){
        let flag = isSupportLocalStorage() ;
        if(!flag) return false ;
        let userList = getUserList() ;
        //将数据保存到localstrage中去
        userList.push(user) ;
        window.localStorage.setItem(TODOLISTUSER,JSON.stringify(userList)) ;
    },
    fetch(){
       let flag = isSupportLocalStorage() ;
       if(!flag) return false ;
       let userList = getUserList() ;
       return userList ;
    }
} ;//localStorage
function isSupportLocalStorage(){
    if(window.localStorage){
        return true ;
    }
    console.warn('浏览器不支持localStorage...') ;
    return false;
}
function getUserList (){
    let userList = window.localStorage.getItem(TODOLISTUSER) ;
    //判断todo-list-user是否存在
    if(userList!=null){
        userList = JSON.parse(userList) ;
    }else{
        userList = [] ;
    }
    return userList ;
}