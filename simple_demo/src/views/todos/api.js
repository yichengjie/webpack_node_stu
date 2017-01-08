import Store from './store.js' ;
export default {
    queryUserList(){
        return new Promise((resolve,reject)=>{
            let userList = Store.fetch() ;
            resolve(userList) ;
        }) ;
    },
    addUser(user){
        return new Promise((resolve,reject)=>{
            Store.addUser(user) ;
            resolve('success') ;
        }) ;
    },
    updateUser(user){
        return new Promise((resolve,reject)=>{
            Store.updateUser(user) ;
            resolve('success') ;
        }) ;
    },
    deleteUserById(id){
        return new Promise((resolve,reject)=>{
            Store.deleteUserById(id) ;
            resolve('success') ;
        }) ;
    }
} ;