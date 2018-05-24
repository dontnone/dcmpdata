import React , {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {arrayOption} from './model';

export class XXDFundViewBar extends Component {
    constructor (props){
        super(props);
        var me = this;
        me.getOption  = me.getOption.bind(me);
        me.onChartReadyCallback  = me.onChartReadyCallback.bind(me);
        me.EventsDict  = me.EventsDict.bind(me);
    }

    getOption () {
        return arrayOption.fundOption(this.props.params);
    }

    onChartReadyCallback () {

    }

    EventsDict (){
        const me = this
        return {
            'click':function ( e ) {
                me.props.onTable(e)
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