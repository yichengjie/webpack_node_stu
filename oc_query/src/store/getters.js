// getters are functions
const getters = {
   listCount:state => state.records7List.length ,
   records7List:state => state.records7List ,
   pageBar:state => state.pageBar ,
   queryDBFlag:state => state.queryDBFlag,
   dealPageOrderFlag:state => state.dealPageOrderFlag,
   orderTitleName:state => state.orderTitleName ,
   checkAllRecords7Flag: state => state.checkAllRecords7Flag,
   tableTitleOrder: state => state.tableTitleOrder ,
   formData: state => state.formData ,
   checkedIdArr: state => state.checkedIdArr
};

export default getters ;