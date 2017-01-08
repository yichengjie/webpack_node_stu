import Store from './store.js' ;
export default {
    queryUserList(){
        return new Promise(function(resolve,reject){
            let userList = Store.fetch() ;
            resolve(userList) ;
        }) ;
    },
    addUser(user){
        return new Promise(function(resolve,reject){
            Store.addUser(user) ;
            resolve('success') ;
        }) ;
    },
    updateUser(user){
        return new Promise(function(resolve,reject){
            Store.updateUser(user) ;
            resolve('success') ;
        }) ;
    }
} ;