// 散点图
import echarts from 'echarts/dist/echarts.common';

var data = [
    [['28604','77','200000000'],['31163','77.4','100000000']],
    [[44056,81.8,20],[43294,81.7,25]]
];
let arrayOption = {
    fundOption : (obj)=> {
        // console.log(obj)
        var symbo = 0, maxArr=[], ratio = 1
        for(let i=0; i <obj[0].length; i++){
            maxArr.push(obj[0][i][2])
        }
        symbo = Math.max.apply(Math, maxArr)

        // console.log(symbo)
        
        if(symbo > 1000 && symbo <= 10000){
            ratio = 1.5
        }else if(symbo > 10000 && symbo <= 100000){
            ratio =  5
        }else if(symbo > 100000 && symbo <= 1000000){
            ratio = 15
        }else if(symbo > 1000000 && symbo <= 10000000){
            ratio = 45
        }else if(symbo > 10000000 && symbo <= 100000000){
            ratio = 80
        }else if(symbo >= 100000000){
            ratio = 300
        }else{
            ratio = 1
        }
        
        return {
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true
            },
            series: [{
                name: '',
                data: obj[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / ratio
                },
                label: {
                    normal: {
                        show: false,
                        formatter: function (param) {
                            var str = '注册人数：' + param.data[0] + '\n首投人数：' + param.data[1] + '\n首投金额：' + param.data[2]
                            return str;
                        },
                    },
                    emphasis: {
                        show: true,
                        position: 'center'
                    }
                },
                itemStyle: {
                    normal: {
                        color:'#fb816d'
                    }
                }
            },{
                name: '',
                data: obj[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / ratio
                },
                label: {
                    normal: {
                        show: false,
                        formatter: function (param) {
                            var str = '注册人数：' + param.data[0] + '\n首投人数：' + param.data[1] + '\n首投金额：' + param.data[2]
                            return str;
                        },
                    },
                    emphasis: {
                        show: true,
                        position: 'center'
                    }
                },
                itemStyle: {
                    normal: {
                        color:'#88d9f9'
                    }
                }
            }]
        }
    } 
};
module.exports = {
    arrayOption:arrayOption
};