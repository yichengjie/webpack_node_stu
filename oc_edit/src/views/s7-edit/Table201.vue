<template>
    <table>
        <thead>
            <tr> 
                <th width="250">服务描述</th> 
                <th width="130">类型</th>
                <th width="70">金额</th>
                <th width="50">单位</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for ="(item,index) in list">
            <td>{{item.commercialName + '['+item.subCode+']'}}</td>
            <td>
                <div class="radio-inline"> 
                    <label><input type="radio" :name="'name001'+index"  v-model ="item.discountType" value="1" >一口价</label>
                </div>
                <div class="radio-inline"> 
                    <label><input type="radio" :name="'name001'+index" v-model ="item.discountType" value="0" >折扣</label>
                </div>
            </td>
            <td>
                <input type="text" v-model ="item.priceNum" class="common_input" style="width: 96%"> 
            </td>
            <td>
                {{item.discountType === '1' ? 'CNY' : '&nbsp;&nbsp;&nbsp;&nbsp;%' }}
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        props:{
            list:Array
        }
    }
</script>