// 首次投资 , 复投资金

import echarts from 'echarts/dist/echarts.common';

let arrayOption = {
    publicLineOption : (obj)=> {
        return {
            legend: {
                data:[obj.allNameParams.firstName, obj.allNameParams.nextName]
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                left: '3%',
                right: '6%',
                bottom: '25%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : obj.allDate
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                    minValueSpan: 1
                },
                {
                    show: true,
                    type: 'slider',
                    bottom: 30,
                    start: 0,
                    end: 100,
                    minValueSpan: 0
                }
            ],
            series : [
                {
                    name:obj.allNameParams.firstName,
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:obj.allInitData,
                    itemStyle:{
                        normal:{color:'#f97d6b'}
                    }
                },
                {
                    name:obj.allNameParams.nextName,
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:obj.allSecData,
                    itemStyle:{
                        normal:{color:'#88d7fb'}
                    }
                }
            ]
        }
    },
    publicCicleOption: (obj,date)=>{
         let proArr=[];
         for (let i = 0;i <obj.length; i++){
             proArr.push(obj[i].name);
         }
        return{
            legend: {
                icon:'circle',
                selectedMode:'false',
                orient: 'vertical',
                x: 'left',
                data: proArr
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'日期' + date,
                    type:'pie',
                    center: ['50%', '40%'],
                    radius: ['30%', '60%'],
                    avoidLabelOverlap: false,
                    grid:{
                        bottom:20,
                    },
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:obj,
                    color:['#e54bb0', '#fea088','#86ffd0','#ffc587','#da9bff','yellow','#7af047','ee3939']
                }
            ]
        }
    },
};
module.exports = {
    arrayOption:arrayOption
};