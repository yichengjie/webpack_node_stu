import Store from './store.js' ;
export function queryUserList(){
    return new Promise(function(resolve,reject){
        let userList = Store.fetch() ;
        resolve(userList) ;
    }) ;
}
export function addUser(user){
    return new Promise(function(resolve,reject){
        Store.addUser(user) ;
        resolve('success') ;
    }) ;
}