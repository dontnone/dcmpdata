import React , {Component} from 'react';
import "./index.scss";
import { Table,Button , Checkbox , Select , DatePicker , Dropdown , Menu , Icon} from 'antd';
import moment from 'moment';

const {Item,Divider} = Menu;

class XXDHeader extends Component {
    setCookies(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = ";expires=" + date.toGMTString();
        }
        try {
            document.cookie = name + "=" + value + expires + "; path=/";
        } catch (e) {
            //alert("cookie:"+e);
        }

    }
    clearCookie() {
        var me = this;
        me.setCookies("JSESSIONID", "", -1);
        me.setCookies("userName", "", -1);
        window.location.replace('/index.html','_selft');
    }
    constructor (props){
        super(props);
        var me = this;
        me.menu  = me.menu.bind(me);
    }
    menu (){
        var me=this;
        return (
            <Menu className="menu-list">
                <Item key="0">
                    <span>理财市场</span>
                </Item>
                <Item key="1">
                    <span>信贷市场</span>
                </Item>
                <Item key="2">
                    <span>风控</span>
                </Item>
                <Item key="3">
                    <span>财务</span>
                </Item>
                <Divider />
                <Item key="4">
                    <span  onClick={me.clearCookie.bind(this)}>退出登录</span>
                </Item>
            </Menu>
        );
    }

    render (){
        var me = this;
        return (
            <div className="header">
                <div className="header-main">
                    <div className="profile">
                        <Dropdown overlay={me.menu()} placement="bottomRight">
                            <a className="ant-dropdown-link" href="#">
                                {me.props.name||'www'} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

const SubMenu = Menu.SubMenu;

class XXDSide extends Component {
    // render (){
    //     let sideParam = this.props.sideParam||{};
    //     let {tag} = sideParam;
    //     return (
    //         <div id="J_side" className="main-side">
    //             <div className="logo"></div>
    //             <div className="main-side-list">
    //                 <ul>
    //                     <li className="title">隔日报表</li>
    //                     <li className={"effect-tracking " + ((tag=="effect-tracking")?'active':'') }><i></i><a href="#">效果跟踪</a></li>
    //                     <li className={"effect-contrast " + ((tag=="effect-contrast")?'active':'') }><i></i><a href="#">效果对比</a></li>
    //                     <li className={"detail-data " + ((tag=="detail-data")?'active':'') }><i></i><a href="#">分日明细数据</a></li>
    //                 </ul>
    //                 <ul>
    //                     <li className="title">管理</li>
    //                     <li className={"channel-manage " + ((tag=="channel-manage")?'active':'') }><i></i><a href="#">渠道管理</a></li>
    //                     <li className={"appx-manage " + ((tag=="appx-manage")?'active':'') }><i></i><a href="#">应用包管理</a></li>
    //                     <li className={"referral-links-manage " + ((tag=="referral-links-manage")?'active':'') }><i></i><a href="#">推广链接管理</a></li>
    //                 </ul>
    //             </div>
    //         </div>
    //     );
    // }
    constructor() {
        super()
        this.state = {
            mode: 'inline',
            theme: 'light',
            menuIndex: '1'
        }
    }
    menuClick(item, key, selectedKeys) {
        switch (item.key){
            case '1':
                window.location.href = '/marketing/effecttracking.html';
                break;
            case '2':
                window.location.href = '/marketing/effectcomparison.html';
                break;
            case '3':
                window.location.href = '/marketing/breakdown.html';
                break;
            case '4':
                window.location.href = '/marketing/channelManage.html';
                break;
            case '5':
                window.location.href = '/marketing/packageManage.html';
                break;
            case '6':
                window.location.href = '/marketing/linkManage.html';
                break;
            default:

        }
    }
    render() {
        return (
        <div id="J_side" className="main-side">
            <h2>新新贷</h2>
            <div className="main-side-list">
                <Menu
                style={{ width: 240 }}
                defaultSelectedKeys={[this.props.sideParam]}
                defaultOpenKeys={['sub1','sub2']}
                mode={this.state.mode}
                theme={this.state.theme}
                onSelect={this.menuClick}
                >
                <SubMenu key="sub1" title={<span><Icon type="bar-chart" /><span>隔日报表</span></span>}>
                    <Menu.Item key="1">效果跟踪</Menu.Item>
                    <Menu.Item key="2">效果对比</Menu.Item>
                    <Menu.Item key="3">分日明细数据</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="setting" /><span>管理</span></span>}>
                    <Menu.Item key="4">渠道管理</Menu.Item>
                    <Menu.Item key="5">应用包管理</Menu.Item>
                    <Menu.Item key="6">推广链接管理</Menu.Item>
                </SubMenu>
                </Menu>
            </div>
        </div>
        );
    }
}

export class XXDFw extends Component {
    render (){
        var headerParam = {
            name:getCookie("userName")
        };
        return (
            <div >
                <XXDHeader {...headerParam} />
                <div className="main">
                    <XXDSide sideParam={this.props.sideParam} />
                    <div className="main-content">
                        <div className="content-wrap">
                            {
                                React.Children.map(this.props.children, function (child) {
                                    return child;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



const Option = Select.Option;
export class XXDSelect extends Component {
    constructor(props) {
        super(props);
        var me = this;
        this.handleChange = this.handleChange.bind(me);
    }

    handleChange (value){
        var me = this;
        var callback = me.props.callback;
        if (callback) callback( value );
    }

    render (){
        var me = this;
        var selectData = this.props.selectData;
        var defaultValue = this.props.defaultValue;
        var className = this.props.className||"";
        var optionArray = [];
        for (var i=0,j=selectData.length;i < j;i++) {
            var obj = selectData[i];
            console.log (obj.disabled)
            optionArray.push(<Option disabled={obj.disabled?true:false}  key={i} value={obj.value} >{obj.value}</Option>);
        }
        return (
            <Select defaultValue={defaultValue} style={{ width: 120 }} onChange={me.handleChange} className={className}>
                {optionArray}
            </Select>
        );
    }
}


const RangePicker = DatePicker.RangePicker;

const ONEYEAR = 1000*60*60*24*365;

export class XXDRangePicker extends Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            beginTime:new Date().getTime() - ONEYEAR,
            endTime:new Date().getTime() + ONEYEAR ,
        };
        me.disabledDate = me.disabledDate.bind(me);
        me.onChange = me.onChange.bind(me);
    }
    disabledDate(current) {
        let me = this;
        let {beginTime , endTime} = me.state;
        let val ;
        return current && (val = current.valueOf()) && (val < beginTime || val > endTime);
    }
    onChange (dates, dateStrings){
        var d1 = dates[0] , d2 = dates[1];
        var me = this;
        if ( d1 ) {
            var second = moment(d1).valueOf();
            var beginDate = second - ONEYEAR;
            var endDate = second + ONEYEAR;
            me.setState(
                {
                    beginTime:beginDate,
                    endDate:endDate
                }
            );
            if (dateStrings.length==2) {
                var callback = me.props.callback;
                if (callback) callback( dateStrings );
            }
        }
        console.log ( dateStrings );
    }


    render () {
        var me = this;
        return (
            <RangePicker
                disabledDate={me.disabledDate}
                format="YYYY-MM-DD"
                onChange={me.onChange}
            />
        );
    }
}


export class XXDLoadingButton extends Component {
    constructor (props) {
        super(props);
        var me = this;
        me.state = {
            loading:false
        };
        me.enterLoading = me.enterLoading.bind(this);
    }

    enterLoading(){
        var me = this;
        me.setState( {
            loading:true
        });
        var callback = me.props.callback;
        if (callback) callback(me);
    }

    render (){
        var me = this;
        return (
            <Button type="primary" loading={me.state.loading} onClick={me.enterLoading}>
                {me.props.text||'确定'}
            </Button>
        );
    }
}


export class XXDTable extends Component {
    constructor (props){
        super(props);
    }
    render (){
        var me = this;
        let { columns , data, loading, scroll } = me.props;

        return (
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id || record.date}
                pagination={false}
                loading={loading}
                scroll={scroll}>

            </Table>
        );
    }
}



const CheckboxGroup = Checkbox.Group;


export class XXDGroupCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedList: this.props.defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
    }

    onChange  (checkedList) {
        let plainOptions = this.props.plainOptions;
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });

        console.log (checkedList);
    }
    onCheckAllChange (e)  {
        let plainOptions = this.props.plainOptions;
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });

        if(e.target.checked) {
            //全选
        } else {
            //全部不选
        }
    }
    render() {
        let plainOptions = this.props.plainOptions;
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
            </div>
        );
    }
}

export class XXDFetch extends Component {
    constructor (props){
        super(props);
    }
    render (){
        var me = this;
        let { columns , data, loading } = me.props;

        return (
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                pagination={false}
                loading={loading}>

            </Table>
        );
    }
}
export const getCookie = function(cookiename){
    if (process.browser){
        let cookiestring = document.cookie;
        let start = cookiestring.indexOf(cookiename + '=');
        if(start == -1){
            return null;
        }   //   找不到
        start += cookiename.length + 1;
        let end = cookiestring.indexOf("; ",start);
        if(end == -1){
            return unescape(cookiestring.substring(start));
        }
        return unescape(cookiestring.substring(start, end));
    }

}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function clearCookie(name) {
    this.setCookie(name, "", -1);
}



