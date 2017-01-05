export let formData ={
    firstMaintenanceDate:'',
    lastMaintenanceDate:'',
    serviceNumberMinimum:'',
    serviceNumberMaximum:'',
    description:'',
    fareBasis:'',
    discountCode:'',
    availability:'',
    select2:'',
    useDateLimitTye:'',//使用时间限制类型[时间段:'']或[期限:'1']
    effectivePeriodType:'',
    effectivePeriodNumber:'',
    effectivePeriodUnit:'',
    firstUseDate:'',
    lastUseDate:'',
    freeBaggageAllowancePieces:'',
    firstExcessOccurrence:'',
    lastExcessOccurrence:'',
    freeBaggageAllowanceWeight:'',
    freeBaggageAllowanceUnit:'',
    baggageTravelApplication:''/*行李使用范围*/,
    list196VO:[],
    noChargeNotAvailable:'',/*是否收费*/
    discountOrNot:false,
    list170VO:[],
    list201VO:[],
    specSevFeeAndOrIndicator:'',/*或-和*/
    mileageExchangeIndicator:'',/*里程积分兑换标识*/
    specifiedServiceFeeMileage:'',/*里程费*/
    specifiedServiceFeeApp:'',/**适用于 */
    specServiceFeeColSub:'',/*包含-扣除*/
    specServiceFeeNetSell:'',/*净价-销售价*/
    indicatorComission:'Y',/*有无代理费*/
    taxApplication:'Y',/*有无税费*/
    sequenceNumber:'',/*优先级序号*/
    passengerTypeCode:'',/**旅客类型*/
    minPassengerAge:'',/*年龄范围*/
    maxPassengerAge:'',
    allowancePeopleMinimum:'',/*服务人数范围*/
    allowancePeopleMaximum:'',
    firstPassengerOccurrence:'',/*旅客序号范围*/
    lastPassengerOccurrence:'',
    frequentFlyerStatus:'',/*常旅客状态*/
    customerIndexScoreMinimum:'',/**客户积分范围*/
    customerIndexScoreMaxmum:'',
    list172VO:[],/*大客户-特殊客户**/
    list178VO:[],/**发布对象*/
    publicPrivateIndicator:'',/*公布私有**/
    geoSpecFromToWithin:'',/*区域限制*/
    geoSpecSectPortJourney:'',/**区域部分全程*/
    geoSpecTravelIndicator:'',/*指定区域*/
    geoSpecExceptionStopTime:'',/*经停时间*/
    geoSpecExceptionStopUnit:'',/*经停单位*/
    geoSpecStopConnDes:'',/*经停类型*/
    geoSpecLoc1Type:'',/*区域1*/
    geoSpecLoc1:'',
    list178Loc1:[],
    geoSpecLoc2Type:'',/*区域2*/
    geoSpecLoc2:'',
    list178Loc2:[],
    geoSpecLoc3Type:'',/*区域3*/
    geoSpecLoc3:'',
    list178Loc3:[],
    mileageMinimum:'',/*里程范围*/
    mileageMaximum:'',
    indicatorInterline:'Y',/*是否联程*/
    travelStartDate:'',/*旅行开始日期*/
    travelEndDate:'',/*旅行截止日期*/
    startTime:'',/*起始时刻*/
    stopTime:'',/*结束时刻*/
    dayOfWeek:['3'],/*星期*/
    equipment:'',/*机型*/
    cabin:'',/*舱位等级*/
    upgradeToCabin:'',/*升舱到的服务等级*/
    advancedPurchasePeriod:'',/*提前购票时间*/
    advancedPurchaseUnit:'',/*提前购票时间单位*/
    tourCode:'',/*旅行编码*/
    tariff:'',/*TARIFF NO.**/
    rule:'',/*RULE NO.*/
    advancedPurchaseTktIssue:'',/*与机票同时出票**/
    indicatorReissueRefund:'',/**是否可退*/
    formOfRefund:''/*退款形式*/
} ;

export let showHideState = {
    list170VOAnd201:true
} ;

export let serviceData ={
    recordS5Id:'',
    serviceType:'',
    group:'',
    subGroup:'',
    subCode:'',
    serviceChooseList:[]
};

export let otherData = {//discountOrNot
    list163:[]
} ;

export let optionsData ={
    effectivePeriodType:[/**使用时间限制 */
        {name:"选择","value":"",disabled:false},{name:"距购买服务后",value:"A",disabled:false},
        {name:"距服务兑换后",value:"B",disabled:false},
        {name:"距航班起飞前",value:"D",disabled:false}
    ] ,
    effectivePeriodUnit:[/**使用时间限制 */
        {name:"天",value:"D",disabled:false},{name:"月",value:"M",disabled:false},
        {name:"小时",value:"H",disabled:false}
    ],
    availability:[/**是否检查库存 */
        {name:"是",value:"Y",disabled:false},{name:"否",value:"N",disabled:false}
    ],
    baggageTravelApplication:[/**行李适用范围 */
        {"name":"必须匹配所有的航段","value":"A",disabled:false},{"name":"至少匹配一个航段","value":"S",disabled:false},
        {"name":"必须匹配旅行航段中的主航段","value":"M",disabled:false},{"name":"必须匹配整个行程的每一段","value":"J",disabled:false},
        {"name":"不限制","value":"",disabled:false}
    ],
    freeBaggageAllowanceUnit:[/**行李重量单位 */
        {"name":"选择","value":"",disabled:false},{"name":"千克","value":"K",disabled:false},{"name":"磅","value":"P",disabled:false}
    ],
    specSevFeeAndOrIndicator:[/*或-和*/
        {name:"或",value:"",disabled:false},{name:"和",value:"A",disabled:false},
    ],
    mileageExchangeIndicator:[/*里程积分兑换标识*/
        {name:"不兑换",value:'',disabled:false},{name:"兑换，用里程支付",value:'1',disabled:false},
        {name:"兑换，用里程或金额支付",value:'2',disabled:false}
    ],
    noChargeNotAvailable:[/**是否收费 */
        {"name":"收费","value":"",disabled:false},{"name":"不适用","value":"X",disabled:false},
        {"name":"免费，不出EMD单","value":"F",disabled:false},{"name":"免费，出EMD单","value":"E",disabled:false},
        {"name":"免费，不出EMD单，不要求预定","value":"G",disabled:false},{"name":"免费，出EMD单，不要求预定","value":"H",disabled:false},
        {"name":"免费，行李规则遵循市场方航空公司规则","value":"D",disabled:false},{"name":"免费，行李规则遵循承运方航空公司规则","value":"O",disabled:false}
    ],
    specifiedServiceFeeApp:[/*适用于*/
        {"name":"选择","value":"",disabled:false},
        {"name":"每一个票价组成部分算一次服务费用","value":"1",disabled:false},{"name":"每一个票价组成部分算一半的服务费用","value":"2",disabled:false},
        {"name":"每用一次服务算一次服务费用","value":"3",disabled:false},{"name":"匹配的部分航程算一次服务费用","value":"4",disabled:false},
        {"name":"往返程服务费用【F/R/T】","value":"5",disabled:false},{"name":"每公斤按公布运价的0.5%收费","value":"H",disabled:false},
        {"name":"每公斤按公布运价的1%收费","value":"C",disabled:false},{"name":"每公斤按公布运价的1.5%收费","value":"P",disabled:false},
        {"name":"按每公斤收费","value":"K",disabled:false},{"name":"按每5公斤收费","value":"F",disabled:false}
    ],
    specServiceFeeColSub:[/*包含扣除**/
        {"name":"包含在票价中","value":"I",disabled:false},{"name":"单独收费","value":"",disabled:false}
    ],
    specServiceFeeNetSell:[
        {"name":"销售价","value":"",disabled:false},{"name":"净价","value":"N",disabled:false}
    ],
    indicatorComission:[/*有无代理费*/
        {"name":"有","value":"Y",disabled:false},{"name":"无","value":"N",disabled:false}
    ],
    taxApplication:[/*有无税费*/
        {"name":"有","value":"Y",disabled:false},{"name":"无","value":"N",disabled:false}  
    ],
    passengerTypeCode:[/**旅客类型(这个数据从后台查询过来)*/
        {name:'选择',value:'',disabled:false}
    ],
    frequentFlyerStatus:[/*常旅客状态(这个数据从后台查询过来)*/
        {name:'选择',value:'',disabled:false}
    ],
    equipment:[/*机型(这个数据从后台查询过来)**/
        {name:'选择',value:'',disabled:false}
    ],
    publicPrivateIndicator:[/*公布-私有*/
        {name:'公布',value:'',disabled:false},{name:'私有',value:'P',disabled:false}
    ],
    geoSpecFromToWithin:[/**区域限制*/
        {name:'不限区域',value:'',disabled:false},{name:'区域1→2',value:'1',disabled:false},
        {name:'区域2→1',value:'2',disabled:false},{name:'区域1内部',value:'W',disabled:false}
    ],
    geoSpecSectPortJourney:[/**区域-部分-全程*/
        {"name":"选择","value":"",disabled:false},{"name":"Sector","value":"S",disabled:false},
        {"name":"Portion","value":"P",disabled:false},{"name":"Journey","value":"J",disabled:false}
    ],
    geoSpecExceptionStopUnit:[/**经停时间单位*/
        {"name":"选择","value":"",disabled:false},{"name":"分","value":"N",disabled:false},
        {"name":"小时","value":"H",disabled:false},{"name":"天","value":"D",disabled:false},
        {"name":"月","value":"M",disabled:false}
    ],
    geoSpecLoc1Type:[/**区域单位*/
        {"name":"选择","value":"",disabled:false},
        {"name":"大区","value":"A",disabled:false},{"name":"城市","value":"C",disabled:false},
        {"name":"国家","value":"N",disabled:false},{"name":"机场","value":"P",disabled:false},
        {"name":"州","value":"S",disabled:false},{"name":"区域","value":"Z",disabled:false}
    ],
    indicatorInterline:[
        {"name":"是","value":"Y",disabled:false},{"name":"否","value":"N",disabled:false}
    ],
    dayOfWeek:[
        {"name":"星期一","value":"1",disabled:false},{"name":"星期二","value":"2",disabled:false},
        {"name":"星期三","value":"3",disabled:false},{"name":"星期四","value":"4",disabled:false},
        {"name":"星期五","value":"5",disabled:false},{"name":"星期六","value":"6",disabled:false},
        {"name":"星期日","value":"7",disabled:false}
    ],
    cabin:[/*舱位等级*/
        {"name":"选择","value":"",disabled:false},
        {"name":"豪华头等舱","value":"R",disabled:false},{"name":"头等舱","value":"F",disabled:false},
        {"name":"豪华商务舱","value":"J",disabled:false},{"name":"商务舱","value":"C",disabled:false},
        {"name":"豪华经济舱","value":"P",disabled:false},{"name":"经济舱","value":"Y",disabled:false}
    ],
    advancedPurchaseUnit:[/*提前购票时间单位*/
        {"name":"选择","value":"",disabled:false},
        {"name":"分","value":"N",disabled:false}, {"name":"小时","value":"H",disabled:false},
        {"name":"天","value":"D",disabled:false}, {"name":"月","value":"M",disabled:false}
    ],
    advancedPurchaseTktIssue:[/**与机票同时出票*/
        {"name":"是","value":"",disabled:false}, {"name":"否","value":"X",disabled:false},
    ],
    indicatorReissueRefund:[/*是否可退*/
        {"name":"不可退款","value":"N",disabled:false},
        {"name":"可退款","value":"Y",disabled:false}, {"name":"可改","value":"R",disabled:false}
    ],
    formOfRefund:[/**退款形式*/
        {"name":"选择","value":"",disabled:false},{"name":"按原付款渠道退款","value":"1",disabled:false},
        {"name":"按电子凭证退款","value":"2",disabled:false}
    ]
} ; 