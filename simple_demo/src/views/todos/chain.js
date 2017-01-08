export var nextFlagStr = 'nextSuccessor' ;
var Chain = function(fn){
    this.fn = fn ;
    this.successor = null ;
}
Chain.prototype.setNextSuccessor = function(successor){
    return this.successor = successor ;
    //return this.successor ;
}
Chain.prototype.passRequest = function(){
    //console.info('args : ' , arguments) ;
    var ret = this.fn.apply(this,arguments) ;
    if(ret === nextFlagStr){
       // return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
       return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
    }
    return ret ;
}
Chain.prototype.next = function(){
    return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
}

export default Chain ;
