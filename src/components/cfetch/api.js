var devHttp = 'http://localhost:8080/dmp/'
if(process.env.NODE_ENV != 'development'){
    devHttp = '/'
}
const urlParams = {
    login           : 'j_spring_security_check',                  //..登陆接口

    getType         : 'getType',                                 //..获取类型数据
    getChannel      : 'getChannel',                           //..获取渠道数据
    getSource       : 'getSource',                             //..获取来源数据
    managerChannel  : 'managerChannel',                   //..获取所有类型（不关联渠道）

    stackedGraph    : 'financial/market/effectTrack/stackedGraph',    //..获取堆叠图数据
    chart           : 'financial/market/effectTrack/chart',                  //..获取饼图数据
    effectTrack     : 'financial/market/effectTrack',                  //..获取人员列表数据

    getRecachOrInvest: 'financial/market/getRecachOrInvest',      //..获取抵达/激活&&投资人数数据

    effectComparison: 'financial/market/effectComparison',        //..效果对比用户列表数据
    scatter         : 'financial/market/scatter',                          //..效果对比散点图数据

    dailydetail     : 'financial/market/dailydetail',                  //..分日明细获取数据

    addchannel      : 'financial/market/addchannel',                    //..添加渠道
    updatechannel   : 'financial/market/updatechannel',              //..修改渠道
    channel         : 'financial/market/channel',                          //..获取渠道数据
    getChannelName  : 'financial/market/getChannelName',            //..获取渠道数据

    package         : 'financial/market/package',                           //...应用包查询
    addpackage      : 'financial/market/addpackage',                     //...应用包新增
    updatepackage   : 'financial/market/updatepackage',                //...应用包修改

    links           : 'financial/market/links',                               //...推广链接查询
    addlinks        : 'financial/market/addlinks',                         //...推广链接新增
    updatelinks     : 'financial/market/updatelinks',                    //...推广链接修改

    batchActiveNum  : 'financial/market/batchActiveNum'              //表单激活或投资人数一次性刷新接口
}
const repeatUrl = {}
for(let i in urlParams){
    urlParams[i] = devHttp + urlParams[i]
}
export default urlParams