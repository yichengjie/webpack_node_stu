<template>
   <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-9" aria-expanded="false">
                        <span class="sr-only">导航菜单</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#" v-on:click ="toIndexUI">OCGUI</a>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
                    <ul class="nav navbar-nav">
                        <li v-bind:class="{active: activeName==='附加服务' }"><a href="javascript:void(0)" v-on:click ="toIndexUI">附加服务</a></li>
                        <li v-bind:class="{active: activeName==='基础数据' }" role="presentation" class="dropdown">
                            <a id="drop4" href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                基础数据<span class="caret"></span>
                            </a>
                            <ul id="menu1" class="dropdown-menu" aria-labelledby="drop4">
                                <li><a v-on:click ="toDatasourceUI" href="javascript:void(0)">数据源</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a v-on:click ="toMileageExchangeUI" href="javascript:void(0)">里程积分兑换</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="javascript:void(0)" v-on:click ="toConfigUI">附加服务配置</a></li>
                            </ul>
                        </li>
                        <li v-bind:class="{active: activeName==='运价校验' }">
                            <a v-on:click ="toValidateUI" href="javascript:void(0)">运价校验</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
</template>

<script>
    import util from 'common/util.js' ;
    export default {
        name: 'navbar',
        props:{
            activeName:{
                type:String,
                default:'附加服务'
            }
        },
        methods:{
            toIndexUI(){//首页
                let url = "/oc/toQueryS7UI.action" ;
                this.toUIWithContextPath(url) ;
            },
            toDatasourceUI(){
                let url = "/abr/toCfgAbrDatasource.action"  ;
                this.toUIWithContextPath(url) ;
            },
            toMileageExchangeUI(){
                let url = "/mileage/toMileageExchangeUI.action"  ;
                this.toUIWithContextPath(url) ;
            },
            toConfigUI(){
                let url = "/occonfig/toConfigUI.action" ;
                this.toUIWithContextPath(url) ;
            },
            toValidateUI(){
                let url = "/validate/toValidateRecords7.action"  ;
                this.toUIWithContextPath(url) ;
            },
            toUIWithContextPath(url){
                let {contextPath} = util.getJspPageParam() ;
                //window.location.href = contextPath + url ;
            }
        }
    }
</script>
<style>
  #app .navbar{
    border-radius: 0px;
    margin-bottom: 0px ;
  }
</style>
