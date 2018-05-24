import React , {Component} from 'react';
import "./index.scss";
import { Icon } from 'antd';
import _ from "lodash";
export default class App extends Component {

    constructor(props){
        super(props);
        var me = this;
        me.onOver = me.onOver.bind(this);
        me.onOut = me.onOut.bind(this);
        me.state = {
            checkedList: this.props.defaultCheckedList,
            isOpen:true,
            arrow:'right',
        };

        me.onChange = me.onChange.bind(me);
    }

    onOver (e){
        var me = this;
        var param = me.state;
        param["isOpen"] = false;
        param["arrow"] = "up";
        me.setState(param);

        e && e.preventDefault() && e.stopPropagation();
    }

    onOut (){
        var me = this;
        var param = me.state;
        param["isOpen"] = true;
        param["arrow"] = "right";
        me.setState(param);
    }

    onChange (e) {
        var val = e.target.value;
        var me = this;
        var callback = me.props.callback;
        var checkedList = this.state.checkedList;

        if (e.target.checked) {
            checkedList.push(val);
        } else {
            _.remove(checkedList , function (v) {return v==val;});
        }
        if (callback) callback( checkedList );

        //if (false)
        //e.preventDefault();
    }



    render (){
        var me = this;
        var plainOptions = me.props.plainOptions;
        var defaultCheckedList = me.props.defaultCheckedList;
        var baseClassName = me.props.className||"";
        var selectArray = [];
        let {isOpen , arrow} = me.state;
        for (var i  = 0, j  = plainOptions.length;i < j;i++) {
            var child = plainOptions[i];
            var flag = "";
            var _index = _.findIndex(defaultCheckedList , function ( v ){
                return  (v  == child );
            });
            if (_index >= 0) flag = "checked";
            selectArray.push(<li key={i}><label><input type="checkbox" defaultChecked={flag} value={child}  onChange={me.onChange} />{child}</label></li>);
        }
        return (
            <div className={"mui-multiple-select "+baseClassName} onMouseEnter={me.onOver} onMouseLeave={me.onOut} >
                <span className="mui-multiple-tag" >{this.props.title}<Icon type={arrow} className="icon"  /></span>
                <ul className={ isOpen?'hide':''}>
                    {selectArray}
                </ul>
            </div>
        )
    }
}
