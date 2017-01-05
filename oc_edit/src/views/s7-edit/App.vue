<template>
    <div class ="s7editpage">
        <div class="header-container ">
            <div class="navbar-fixed-top">
                 <Navbar/>
                <QuerySection
                    :handleSaveForm="handleSaveForm"
                    :handleResetForm="handleResetForm"/>
            </div>
        </div>

        <div class="container-fluid main_content" >
           <oc-form id="s7_form" :model ="formData" :rules="rules" ref ="editForm" label-width ="120px" v-show ="!otherData.showSubTableFlag" >
               <NewVersionService :value ="serviceData.recordS5Id" :serviceData="serviceData"
                    :optionsData="optionsData" :formData="formData" :list163 ="otherData.list163"/>
               <DataSection left ="2.确定费用" right ="描述 | 费用">
                   <ContentLayout title="描述">
                        <oc-form-item1 label="销售生效日期" :required="true" prop ="firstMaintenanceDate">
                            <oc-datetimepicker pickerType="datetime" :minDate="minDate" v-model ="formData.firstMaintenanceDate"  />
                        </oc-form-item1>
                        <oc-form-item1 label="销售截止日期"  prop ="lastMaintenanceDate">
                            <oc-datetimepicker pickerType="datetime" :minDate="minDate" v-model ="formData.lastMaintenanceDate"   />
                        </oc-form-item1>
                        <oc-form-item2 label="使用时间限制"  prop="useDateLimit" errorPosition ="bottom"
                            :serviceType="serviceData.serviceType"
                            :subGroupList="['FP','FL']"
                            :subGroup="serviceData.subGroup"
                            :names="['firstUseDate','lastUseDate','effectivePeriodType','effectivePeriodNumber','effectivePeriodUnit']">
                            <div class="col-sm-4">
                                <UseDateLimitChangeBtn v-model ="formData.useDateLimitTye"  :formData="formData"
                                    :subGroup="serviceData.subGroup"/>
                                <div class = "table_layout" style="width: 100%;" v-show="formData.useDateLimitTye==''">
                                    <oc-datetimepicker v-model="formData.firstUseDate" style="width:48%;display: inline-block;" />
                                    <oc-datetimepicker v-model="formData.lastUseDate" style="width:48%;display: inline-block;" />
                                </div>
                                <div class = "table_layout" style="width: 100%;" v-show="formData.useDateLimitTye=='1'">
                                    <oc-select v-model="formData.effectivePeriodType" style="width:48%;display: inline-block;"
                                        :options ="optionsData.effectivePeriodType"/>
                                    <oc-input v-model ="formData.effectivePeriodNumber" style="width:24%;display: inline-block;" />
                                    <oc-select v-model ="formData.effectivePeriodUnit" style="width:24%;display: inline-block;"
                                        :options ="optionsData.effectivePeriodUnit"/>
                                </div>
                            </div>
                        </oc-form-item2>


                        <oc-form-item2 label="服务套数" prop ="serviceNumber"
                            :names ="['serviceNumberMinimum','serviceNumberMaximum']"
                            :serviceTypeList="['F','R','T','A','B','C','E','P']"
                            :serviceType="serviceData.serviceType"
                            :groupList="['FP']"
                            :group="serviceData.group"
                            >
                            <div class="col-sm-2">
                                <oc-input-number slot="slot1" :min="0" :max ="999" placeholder="0-999"
                                    v-model ="formData.serviceNumberMinimum" />
                            </div>
                            <div class="col-sm-2">
                                 <oc-input-number slot="slot2" :min="0" :max ="999" placeholder="0-999"
                                    v-model ="formData.serviceNumberMaximum" />
                            </div>
                        </oc-form-item2>
                        <oc-form-item1 label="描述"  prop ="description"
                            :serviceTypeList="['F','M','R','T','B','E']"
                            :serviceType="serviceData.serviceType">
                            <oc-textarea v-model ="formData.description" placeholder ="描述信息" />
                        </oc-form-item1>
                        <oc-form-item1 label="产品代号"  prop ="fareBasis">
                            <oc-input v-model ="formData.fareBasis" maxlength="20" :upper="true"  />
                        </oc-form-item1>
                        <oc-form-item1 label="折扣代码"  prop ="discountCode">
                            <oc-input v-model ="formData.discountCode" maxlength="5"/>
                        </oc-form-item1>
                         <oc-form-item1 label="是否检查库存"  prop ="availability">
                            <oc-radio v-model ="formData.availability" :options="optionsData.availability"/>
                        </oc-form-item1>
                   </ContentLayout>
                    <ContentLayout title="行李" v-show="serviceData.serviceType == 'A' || serviceData.serviceType == 'C' || serviceData.serviceType == 'P'">
                        <oc-form-item1 label="免费行李件数"  prop ="freeBaggageAllowancePieces"
                            :serviceTypeList="['A']" :serviceType="serviceData.serviceType">
                            <oc-input-number v-model ="formData.freeBaggageAllowancePieces" :min="1" :max ="99" placeholder ="1-99" />
                        </oc-form-item1>
                        <oc-form-item2 label="收费行李件数"  prop ="excessOccurrence"
                            :names="['firstExcessOccurrence','lastExcessOccurrence']"
                            :serviceTypeList="['C','P']" :serviceType="serviceData.serviceType">
                            <div class="col-sm-2">
                                 <oc-input-number v-model ="formData.firstExcessOccurrence" :min="1" :max="99" placeholder ="1-99"/>
                            </div>
                            <div class="col-sm-2">
                                 <oc-input-number v-model ="formData.lastExcessOccurrence" :min="1" :max ="99" placeholder ="1-99"  />
                            </div>
                        </oc-form-item2>
                         <oc-form-item2 label="行李重量"  prop ="freeBaggageAllowanceWeightAndUnit" :names="['freeBaggageAllowanceWeight','freeBaggageAllowanceUnit']"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <div class="col-sm-2">
                                 <oc-input-number v-model.trim ="formData.freeBaggageAllowanceWeight" :min="1" :max ="9999" placeholder ="1-9999"/>
                            </div>
                            <div class="col-sm-2">
                                 <oc-select v-model ="formData.freeBaggageAllowanceUnit" :options="optionsData.freeBaggageAllowanceUnit"/>
                            </div>
                        </oc-form-item2>
                        <oc-form-item1 label="行李适用范围"  prop ="baggageTravelApplication"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <oc-select v-model.trim ="formData.baggageTravelApplication" :options="optionsData.baggageTravelApplication"/>
                        </oc-form-item1>
                        <oc-form-item1 label="备注例外行李"  prop ="list196VO"
                            :serviceTypeList="['A','C','P']" :serviceType="serviceData.serviceType">
                            <oc-input placeholder="这里是子表号" />
                        </oc-form-item1>
                    </ContentLayout>

                    <ContentLayout title="费用">
                      <oc-form-item1 label="是否收费"  prop ="noChargeNotAvailable">
                          <oc-select :options ="optionsData.noChargeNotAvailable" v-model ="formData.noChargeNotAvailable"/>
                      </oc-form-item1>
                      <oc-form-item0 label="金额"  prop ="list170VOAndlist201VO">
                          <div class="col-sm-6">
                              <Switch170201Btn :otherData="otherData" :formData="formData" :list163 ="otherData.list163">
                                  <ShowHideTable :showHideState ="showHideState" 
                                      name="list170VOAnd201">
                                  </ShowHideTable> 
                                  <ReuseTableNo></ReuseTableNo>
                              </Switch170201Btn>
                              <TableLayout :showFlag="showHideState.list170VOAnd201" :footer="!formData.discountOrNot" width="500">
                                  <Table170 :list = "formData.list170VO" v-show ="!formData.discountOrNot"></Table170>
                                  <Table201 :list="formData.list201VO" v-show ="formData.discountOrNot"></Table201>
                              </TableLayout>
                          </div>
                      </oc-form-item0>
                      <oc-form-item1 label="或/和"  prop ="specSevFeeAndOrIndicator" :serviceTypeList ='["F","M","R","T","C","P"]'
                            :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.specSevFeeAndOrIndicator" :options ="optionsData.specSevFeeAndOrIndicator"/>
                      </oc-form-item1>
                      <oc-form-item1 label="里程兑换标识"  prop ="mileageExchangeIndicator" :span="6"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.mileageExchangeIndicator" :options ="optionsData.mileageExchangeIndicator"/>
                      </oc-form-item1>
                      <oc-form-item1 label="里程费"  prop ="specifiedServiceFeeMileage"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-input-number  v-model ="formData.specifiedServiceFeeMileage" :min ="0"  maxlength="8" placeholder="非负整数"  />
                      </oc-form-item1>
                      <oc-form-item1 label="适用于"  prop ="specifiedServiceFeeApp"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specifiedServiceFeeApp" :options ="optionsData.specifiedServiceFeeApp" />
                      </oc-form-item1>
                      <oc-form-item1 label="包含/扣除"  prop ="specServiceFeeColSub"
                            :serviceTypeList ='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specServiceFeeColSub" :options ="optionsData.specServiceFeeColSub" />
                      </oc-form-item1>
                      <oc-form-item1 label="净价/销售价"  prop ="specServiceFeeNetSell"
                            :serviceTypeList ='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                          <oc-select  v-model ="formData.specServiceFeeNetSell" :options ="optionsData.specServiceFeeNetSell" />
                      </oc-form-item1>
                      <oc-form-item1 label="有无代理费"  prop ="indicatorComission"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.indicatorComission" :options ="optionsData.indicatorComission" />
                      </oc-form-item1>
                      <oc-form-item1 label="有无税费"  prop ="taxApplication"
                            :serviceTypeList ='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                          <oc-radio  v-model ="formData.taxApplication" :options ="optionsData.taxApplication" />
                      </oc-form-item1>
                    </ContentLayout>
               </DataSection>

               <DataSection left ="3.规则详细" right ="序号 | 旅客 | 发布 | 航程 | 航班 | 购买 | 票价 | 票证 | 退款">
                   <ContentLayout title="序号">
                       <oc-form-item1 label ="优先级序号" prop ="sequenceNumber">
                           <oc-input-number v-model ="formData.sequenceNumber" :min="1" maxlength ="7" placeholder="序号越小，优先级越高" />
                       </oc-form-item1>
                   </ContentLayout>
                   <ContentLayout title="旅客">
                       <oc-form-item1 label ="旅客类型" prop ="passengerTypeCode"
                         :serviceTypeList ='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.passengerTypeCode" :options ="optionsData.passengerTypeCode" />
                       </oc-form-item1>
                       <oc-form-item2 label="年龄范围"  prop ="minAndMaxPassengerAge" :names="['minPassengerAge','maxPassengerAge']"
                            :serviceTypeList='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.minPassengerAge" :min="1" :max ="99" placeholder="1-99" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.maxPassengerAge" :min="1" :max ="99"  placeholder="1-99" /></div>
                       </oc-form-item2>
                       <oc-form-item2 label="服务适用人数范围"  prop ="allowancePeopleMinAndMaximum" :names="['allowancePeopleMinimum','allowancePeopleMaximum']"
                            :serviceTypeList='["F","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.allowancePeopleMinimum" :min ="1" :max ="999" placeholder="1-999" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.allowancePeopleMaximum" :min ="1" :max ="999" placeholder="1-999"/></div>
                       </oc-form-item2>

                       <oc-form-item2 label="旅客序号范围"  prop ="firstAndLastPassengerOccurrence" :names="['firstPassengerOccurrence','lastPassengerOccurrence']"
                            :serviceTypeList='["F","M","R","T"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.firstPassengerOccurrence" :min ="1" :max ="999" placeholder="1-999" /></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.lastPassengerOccurrence"  :min ="1" :max ="999" placeholder="1-999" /></div>
                       </oc-form-item2>
                       <oc-form-item1 label ="常旅客状态" prop ="frequentFlyerStatus"
                         :serviceTypeList ='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.frequentFlyerStatus" :options ="optionsData.frequentFlyerStatus" />
                       </oc-form-item1>
                       <oc-form-item2 label="客户积分范围"  prop ="customerIndexScoreMiniAndMaxmum" :names="['customerIndexScoreMinimum','customerIndexScoreMaxmum']"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.customerIndexScoreMinimum" :min ="1" maxlength="6"  placeholder="正整数"/></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.customerIndexScoreMaxmum"  :min ="1" maxlength="6" placeholder="正整数"/></div>
                       </oc-form-item2>
                       <oc-form-item1 label="大客户/特殊客户"  prop ="list172VO"
                            :serviceTypeList='["F","M","R","T","A","B","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-input-number />
                       </oc-form-item1>
                   </ContentLayout>

                  <ContentLayout title="发布">
                      <oc-form-item1 label="发布对象"  prop ="list178VO"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input-number />
                      </oc-form-item1>
                      <oc-form-item1 label="公布私有"  prop ="publicPrivateIndicator"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.publicPrivateIndicator" :options ="optionsData.publicPrivateIndicator" />
                      </oc-form-item1>
                  </ContentLayout>

                  <ContentLayout title="航程">
                      <oc-form-item1 label="区域限制"  prop ="geoSpecFromToWithin" :span="4"
                            :serviceTypeList='["F","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.geoSpecFromToWithin" :options ="optionsData.geoSpecFromToWithin" />
                      </oc-form-item1>
                      <oc-form-item1 label="Sector/Portion/Journey"  prop ="geoSpecSectPortJourney" :tooltip ="true"
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-select v-model ="formData.geoSpecSectPortJourney" :options ="optionsData.geoSpecSectPortJourney" />
                      </oc-form-item1>
                      <oc-form-item1 label="指定区域"  prop ="geoSpecTravelIndicator"
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input v-model ="formData.geoSpecTravelIndicator" />
                      </oc-form-item1>
                      <oc-form-item2 label="经停时间"  prop ="geoSpecExceptionStopTimeAndUnit" :names="['geoSpecExceptionStopTime','geoSpecExceptionStopUnit']"
                            :serviceTypeList='["F","R","A","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.geoSpecExceptionStopTime" :min ="0" maxlength="3" placeholder="0-999"  /></div>
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecExceptionStopUnit" :options ="optionsData.geoSpecExceptionStopUnit" /></div>
                      </oc-form-item2>
                      <oc-form-item1 label="经停类型"  prop ="geoSpecStopConnDes"
                            :serviceTypeList='["F","R","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <oc-input v-model ="formData.geoSpecStopConnDes"  maxlength ="1" :upper="true"/>
                      </oc-form-item1>
                      <oc-form-item2 label="区域1"  prop ="geoSpec1" :names="['geoSpecLoc1Type','geoSpecLoc1']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLoc1Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input v-model ="formData.geoSpecLoc1"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="区域2"  prop ="geoSpec2" :names="['geoSpecLoc2Type','geoSpecLoc2']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLoc2Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input v-model ="formData.geoSpecLoc2"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="经过区域"  prop ="geoSpec3" :names="['geoSpecLoc3Type','geoSpecLoc3']">
                           <div class="col-sm-2"><oc-select v-model ="formData.geoSpecLoc3Type" :options ="optionsData.geoSpecLoc1Type" /></div>
                           <div class="col-sm-2"><oc-input v-model ="formData.geoSpecLoc3"  /></div>
                      </oc-form-item2>
                      <oc-form-item2 label="里程范围"  prop ="mileageMinAndMaximum" :names="['mileageMinimum','mileageMaximum']"
                            :serviceTypeList='["F","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.mileageMinimum" :min ="0" maxlength ="6"  placeholder="非负数"/></div>
                           <div class="col-sm-2"><oc-input-number v-model ="formData.mileageMaximum" :min ="0" maxlength ="6"  placeholder="非负数" /></div>
                      </oc-form-item2>
                      <oc-form-item1 label="是否联程"  prop ="indicatorInterline"
                            :serviceTypeList='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                           <oc-radio v-model ="formData.indicatorInterline" :options ="optionsData.indicatorInterline" />
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="航班">
                      <oc-form-item1 label="旅行开始日期"  prop ="travelStartDate"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker v-model ="formData.travelStartDate" :minDate="minDate" />
                      </oc-form-item1>
                      <oc-form-item1 label="旅行结束日期"  prop ="travelEndDate"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker v-model ="formData.travelEndDate" :minDate="minDate" />
                      </oc-form-item1>
                      <oc-form-item1 label="开始时刻"  prop ="startTime"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker pickerType="time" v-model ="formData.startTime" />
                      </oc-form-item1>
                      <oc-form-item1 label="结束时刻"  prop ="stopTime"
                            :serviceTypeList='["F","M","R","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-datetimepicker pickerType="time" v-model ="formData.stopTime" />
                      </oc-form-item1>
                      <oc-form-item1 label="星期"  prop ="dayOfWeek" :span ="7"
                            :serviceTypeList='["F","T","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-checkbox v-model ="formData.dayOfWeek" :options ="optionsData.dayOfWeek">
                      </oc-form-item1>
                      <oc-form-item1 label="机型"  prop ="equipmentAndlist165" :names ="['equipment']"
                            :serviceTypeList='["F","A","B","C","E","P"]' :serviceType="serviceData.serviceType">
                            <oc-select v-model ="formData.equipment" :options ="optionsData.equipment">
                      </oc-form-item1>
                      <oc-form-item1 label ="航班号" prop ="list186VO">
                          <oc-input  />
                      </oc-form-item1>
                      <oc-form-item1 label ="舱位等级" prop ="cabin">
                          <oc-select v-model ="formData.cabin" :options ="optionsData.cabin">
                      </oc-form-item1>
                      <oc-form-item1 label ="升舱到的服务等级" prop ="upgradeToCabin">
                          <oc-select v-model ="formData.upgradeToCabin" :options ="optionsData.cabin">
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="购买" v-show ="serviceData.serviceType !== 'A' && serviceData.serviceType !== 'B' &&serviceData.serviceType !== 'E'">
                       <oc-form-item2 label="提前购票时间"  prop ="advancedPurchasePeriodAndUnit" :names="['advancedPurchasePeriod','advancedPurchaseUnit']"
                            :serviceTypeList='["F","M","R","T","C","P"]' :serviceType="serviceData.serviceType">
                           <div class="col-sm-2"><oc-input-number v-model ="formData.advancedPurchasePeriod"  /></div>
                           <div class="col-sm-2"><oc-select v-model ="formData.advancedPurchaseUnit" :options ="optionsData.advancedPurchaseUnit"  /></div>
                      </oc-form-item2>
                  </ContentLayout>
                  <ContentLayout title="兑换">
                      <oc-form-item0 label ="允许兑换的服务" >
                          <div class="table_control text-info">
                              航班号
                          </div>
                      </oc-form-item0>
                  </ContentLayout>
                  <ContentLayout title="票价">
                      <oc-form-item1 label ="旅行编码" prop ="tourCode">
                          <oc-input v-model ="formData.tourCode" />
                      </oc-form-item1>
                      <oc-form-item1 label ="TARIFF NO." prop ="tariff">
                          <oc-input v-model ="formData.tariff" />
                      </oc-form-item1>
                      <oc-form-item1 label ="RULE NO." prop ="rule">
                          <oc-input v-model ="formData.rule" />
                      </oc-form-item1>
                  </ContentLayout>

                  <ContentLayout title="票价">
                      <oc-form-item1 label ="与机票同时出票" prop ="advancedPurchaseTktIssue">
                          <oc-radio v-model ="formData.advancedPurchaseTktIssue" :options ="optionsData.advancedPurchaseTktIssue" />
                      </oc-form-item1>
                  </ContentLayout>
                  <ContentLayout title="退款">
                      <oc-form-item1 label ="是否可退" prop ="indicatorReissueRefund" :span ="6">
                          <oc-radio v-model ="formData.indicatorReissueRefund" :options ="optionsData.indicatorReissueRefund" />
                      </oc-form-item1>
                      <oc-form-item1 label ="退款形式" prop ="formOfRefund" :span ="6">
                          <oc-radio v-model ="formData.formOfRefund" :options ="optionsData.formOfRefund" />
                      </oc-form-item1>
                  </ContentLayout>
               </DataSection>
           </oc-form>
        </div>
    </div>
</template>
<script>
import Navbar from '../common/Navbar.vue' ;
import QuerySection from './QuerySection.vue' ;
import DataSection from './DataSection.vue' ;
import ContentLayout from './ContentLayout.vue' ;
import NewVersionService from './NewVersionService.vue' ;
import UseDateLimitChangeBtn from './UseDateLimitChangeBtn.vue' ;
import ShowHideTable from './ShowHideTable.vue' ;
import Switch170201Btn from './Switch170201Btn.vue' ;
import ReuseTableNo from './ReuseTableNo.vue' ;
import TableLayout from './TableLayout.vue' ;
import Table170 from './Table170.vue' ;
import Table201 from './Table201.vue' ;
import {formData,serviceData,optionsData,otherData,showHideState} from './busi/jsonData.js' ;
import {initPageData,handleSaveForm,findRecordS5Id} from './busi/appBusi.js' ;
import {wrapValidateFn,validateFirstMaintenanceDate,validateLastMaintenanceDate,validateServiceNumber,
    validateUseDateLimit,validateLettersOrNumber,validateBiggerNumber,validateAllEmptyOrNot,
    validateNoChargeNotAvailable,validateSpecifiedServiceFeeApp,validatGeoSpec,validateSpecifiedServiceFeeMileage,
    validateSequenceNumber,validateLetter,validateBiggerCurrentDate,validateTravelEndDate,validateGeoSpecFromToWithin,
    validateGeoSpecSectPortJourney} from './busi/validate.js' ;
export default {
    name:'app',
    components:{
        Navbar,QuerySection,DataSection,ContentLayout,
        NewVersionService,UseDateLimitChangeBtn,ShowHideTable,
        Switch170201Btn,ReuseTableNo,TableLayout,Table170,Table201
    },
    data(){
        //所有的校验方法
        //销售生效日期
        let firstMaintenanceDate = wrapValidateFn(validateFirstMaintenanceDate,{vvm:this}) ;
        //销售截止日期
        let lastMaintenanceDate = wrapValidateFn(validateLastMaintenanceDate,{vvm:this}) ;
        //服务套数
        let serviceNumber = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'serviceNumberMinimum',biggerNum:'serviceNumberMaximum'}) ;
        //使用时间限制
        let useDateLimit = wrapValidateFn(validateUseDateLimit,{vvm:this}) ;
        //数字字母校验
        let lettersOrNumber = wrapValidateFn(validateLettersOrNumber,{vvm:null}) ;
        //收费行李件数
        let excessOccurrence = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'firstExcessOccurrence',biggerNum:'lastExcessOccurrence'}) ;
        let freeBaggageAllowanceWeightAndUnit = wrapValidateFn(validateAllEmptyOrNot,{vvm:this,name1:'freeBaggageAllowanceWeight',name2:'freeBaggageAllowanceUnit'}) ;
        //年龄范围//minAndMaxPassengerAge//'minPassengerAge','maxPassengerAge'
        let minAndMaxPassengerAge = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'minPassengerAge',biggerNum:'maxPassengerAge'}) ;
        //服务适用人数范围//allowancePeopleMinAndMaximum//'allowancePeopleMinimum','allowancePeopleMaximum'
        let allowancePeopleMinAndMaximum = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'allowancePeopleMinimum',biggerNum:'allowancePeopleMaximum'}) ;
        //旅客序号范围//firstAndLastPassengerOccurrence//'firstPassengerOccurrence','lastPassengerOccurrence'
        let firstAndLastPassengerOccurrence = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'firstPassengerOccurrence',biggerNum:'lastPassengerOccurrence'}) ;
        //是否收费校验
        let noChargeNotAvailable = wrapValidateFn(validateNoChargeNotAvailable,{vvm:this}) ;
        //适用于校验
        let specifiedServiceFeeApp = wrapValidateFn(validateSpecifiedServiceFeeApp,{vvm:this}) ;
        //里程费//specifiedServiceFeeMileage
        let specifiedServiceFeeMileage = wrapValidateFn(validateSpecifiedServiceFeeMileage,{vvm:this}) ;
        //优先级序号
        let sequenceNumber = wrapValidateFn(validateSequenceNumber,{vvm:null}) ;
        //区域校验
        let geoSpec1 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc1Type',name2:'geoSpecLoc1'}) ;
        let geoSpec2 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc2Type',name2:'geoSpecLoc2'}) ;
        let geoSpec3 = wrapValidateFn(validatGeoSpec,{vvm:this,name1:'geoSpecLoc3Type',name2:'geoSpecLoc3'}) ;
        //客户积分范围//customerIndexScoreMiniAndMaxmum//'customerIndexScoreMinimum','customerIndexScoreMaxmum'
        let customerIndexScoreMiniAndMaxmum = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'customerIndexScoreMinimum',biggerNum:'customerIndexScoreMaxmum'}) ;
        //经停时间//'geoSpecExceptionStopTime','geoSpecExceptionStopUnit'
        let geoSpecExceptionStopTimeAndUnit = wrapValidateFn(validateAllEmptyOrNot,{vvm:this,name1:'geoSpecExceptionStopTime',name2:'geoSpecExceptionStopUnit'}) ;
        //提前购票时间//'advancedPurchasePeriod','advancedPurchaseUnit'
        let advancedPurchasePeriodAndUnit = wrapValidateFn(validateAllEmptyOrNot,{vvm:this,name1:'advancedPurchasePeriod',name2:'advancedPurchaseUnit'}) ;
        //经停类型
        let geoSpecStopConnDes = wrapValidateFn(validateLetter,{vvm:null}) ;
        //里程范围//mileageMinAndMaximum//'mileageMinimum','mileageMaximum'
        let mileageMinAndMaximum = wrapValidateFn(validateBiggerNumber,{vvm:this,smallerNum:'mileageMinimum',biggerNum:'mileageMaximum'}) ;
        //旅行开始日期
        let travelStartDate = wrapValidateFn(validateBiggerCurrentDate,{vvm:null}) ;
        //旅行结束日期
        let travelEndDate = wrapValidateFn(validateTravelEndDate,{vvm:this})
        //区域限制校验//
        let geoSpecFromToWithin = wrapValidateFn(validateGeoSpecFromToWithin,{vvm:this}) ;
        //区域部分全程
        let geoSpecSectPortJourney = wrapValidateFn(validateGeoSpecSectPortJourney,{vvm:this});
        return {
            minDate:new Date(),
            formData:{
                ...formData
            },
            serviceData:{/*选择服务相关的数据**/
                ...serviceData
            },
            optionsData:{
                ...optionsData
            },
            otherData:{
                ...otherData
            },
            showHideState:{
                ...showHideState
            },
            rules:{
                firstMaintenanceDate: [
                    {required: true, message: '必填', trigger: 'change,blur' },
                    {validator:firstMaintenanceDate,trigger:'change,blur'}
                ],
                lastMaintenanceDate:[
                    {validator: lastMaintenanceDate ,trigger: 'change,blur'}
                ],
                serviceNumber:{
                    serviceNumberMaximum:[{ validator: serviceNumber ,trigger: 'change'}]
                },
                useDateLimit:{/**使用时间限制 */
                    firstUseDate:[
                        {validator: useDateLimit ,trigger: 'change'}
                    ]
                },
                minAndMaxPassengerAge:{//年龄范围
                    minPassengerAge:[
                         {validator: minAndMaxPassengerAge ,trigger: 'change'}
                    ]
                },
                allowancePeopleMinAndMaximum:{//服务适用人数范围
                    allowancePeopleMinimum:[
                         {validator: allowancePeopleMinAndMaximum ,trigger: 'change'}
                    ]
                },
                firstAndLastPassengerOccurrence:{//旅客序号范围
                    firstPassengerOccurrence:[
                         {validator: firstAndLastPassengerOccurrence ,trigger: 'change'}
                    ]
                },
                fareBasis:[/**产品代号*/
                    {validator: lettersOrNumber ,trigger: 'change'}
                ],
                discountCode:[/**折扣代码 */
                    {validator: lettersOrNumber ,trigger: 'change'}
                ],
                excessOccurrence:{/**收费行李件数 */
                    firstExcessOccurrence:[
                        {validator: excessOccurrence ,trigger: 'change'}
                    ]
                },
                freeBaggageAllowanceWeightAndUnit:{
                    freeBaggageAllowanceWeight:[
                         {validator: freeBaggageAllowanceWeightAndUnit ,trigger: 'change'}
                    ]
                },/**是否收费 */
                noChargeNotAvailable:[
                    {validator: noChargeNotAvailable ,trigger: 'change'}
                ],
                specifiedServiceFeeApp:[
                    {validator: specifiedServiceFeeApp ,trigger: 'change'}
                ],
                specifiedServiceFeeMileage:[/*里程费*/
                    {validator: specifiedServiceFeeMileage ,trigger: 'change'}
                ],
                sequenceNumber:[//优先级序号
                    {validator:sequenceNumber,trigger:'change'}
                ],
                geoSpec1:{
                    geoSpecLoc1Type:[
                        {validator: geoSpec1 ,trigger: 'change'}
                    ]
                },
                geoSpec2:{
                    geoSpecLoc2Type:[
                        {validator: geoSpec2 ,trigger: 'change'}
                    ]
                },
                geoSpec3:{
                    geoSpecLoc3Type:[
                        {validator: geoSpec3 ,trigger: 'change'}
                    ]
                },
                customerIndexScoreMiniAndMaxmum:{//客户积分范围
                    customerIndexScoreMinimum:[
                         {validator: customerIndexScoreMiniAndMaxmum ,trigger: 'change'}
                    ]
                },
                geoSpecExceptionStopTimeAndUnit:{//经停时间
                    geoSpecExceptionStopTime:[
                        {validator: geoSpecExceptionStopTimeAndUnit ,trigger: 'change'}
                    ]
                },
                geoSpecStopConnDes:[
                    {validator:geoSpecStopConnDes,trigger:'change'}
                ],
                advancedPurchasePeriodAndUnit:{//提前购票时间
                    advancedPurchasePeriod:[
                        {validator: advancedPurchasePeriodAndUnit ,trigger: 'change'}
                    ]
                },
                mileageMinAndMaximum:{ //里程范围//mileageMinAndMaximum//'mileageMinimum','mileageMaximum'
                    mileageMinimum:[
                        {validator:mileageMinAndMaximum,trigger:'change'}
                    ]
                },
                travelStartDate:[//旅行开始日期
                    {validator:travelStartDate,trigger:'change'}
                ],
                travelEndDate:[/**旅行结束日期*/
                    {validator:travelEndDate,trigger:'change'}
                ],
                geoSpecFromToWithin:[/*区域限制*/
                    {validator:geoSpecFromToWithin,trigger:'change'}
                ],
                geoSpecSectPortJourney:[
                    {validator:geoSpecSectPortJourney,trigger:'change'}
                ]
            }
        } ;
    },
    methods:{
        handleSaveForm(type){
           //console.info('-----------------------------------') ;
           handleSaveForm(this) ;
        },
        handleResetForm() {
            this.$refs.editForm.resetFields();
        }
    },
    mounted(){
       initPageData(this) ;
    //    setTimeout(() => {
    //        this.showHideState.list170VOAnd201 = true ;
    //    },1000) ;
    }
}
</script>
<style>
    body{margin-bottom: 50px;min-width: 1200px}
</style>
