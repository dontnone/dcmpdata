import React , {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {arrayOption} from './model';


// 堆叠图
export class PublicLine extends Component {
    constructor (props){
        super(props);
        var me = this;
        me.getOption  = me.getOption.bind(me);
        me.onChartReadyCallback  = me.onChartReadyCallback.bind(me);
        me.EventsDict  = me.EventsDict.bind(me);
    }

    getOption () {
        return arrayOption.publicLineOption(this.props.params);
    }

    onChartReadyCallback () {

    }

    EventsDict (){
        var me = this
        return {
            'click':function ( e ) {
                me.props.onDate(e.name, me.props.type)
            }
        };
    }

    render(){
        var me = this;
        return (
            <ReactEcharts option={me.getOption()}
                          notMerge={true}
                          lazyUpdate={true}
                          theme={"theme_name"}
                          onChartReady={me.onChartReadyCallback}
                          onEvents={me.EventsDict()}  />
        );
    }
}


// 饼图
export class PublicCicleInit extends Component {
    constructor (props){
        super(props);
        var me = this;
        me.getOption  = me.getOption.bind(me);
        me.onChartReadyCallback  = me.onChartReadyCallback.bind(me);
        me.EventsDict  = me.EventsDict.bind(me);
    }

    getOption () {
        return arrayOption.publicCicleOption(this.props.params, this.props.date);
    }

    onChartReadyCallback () {

    }

    EventsDict (){
        return {
            'click':function ( e ) {
                console.log (e)
            }
        };
    }

    render(){
        var me = this;
        return (
            <ReactEcharts option={me.getOption()}
                          notMerge={true}
                          lazyUpdate={true}
                          style={{height: 300}}
                          onChartReady={me.onChartReadyCallback}
                          onEvents={me.EventsDict()}  />
        );
    }
}