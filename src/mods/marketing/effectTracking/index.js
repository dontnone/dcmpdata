import React from 'react';
import ReactDOM from 'react-dom';
import framework, {XXDFw  ,XXDLoadingButton ,XXDGroupCheck , XXDSelect , XXDRangePicker , XXDTable} from '../../../components/framework'
import { Pagination, Select, Icon, DatePicker, Modal, Spin,Button,notification } from 'antd';
import moment from 'moment';
import {PublicLine, PublicCicleInit} from './view';
import { getFetch, postFetch } from '../../../components/cfetch'
import urlFile from '../../../components/cfetch/api'
import "./index.scss";
const RangePicker = DatePicker.RangePicker;

class App extends React.Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            getType: [],        //  获取类型数据
            getChannel: [],     //  获取渠道数据
            getSource: [],      //  获取来源数据
            typeId: '',         //  类型id
            channelId:'',       //  渠道id
            source: '',         //..来源id
            flag: '1',          //..分组间隔
            startDate: moment(new Date()).format("YYYY-MM-DD"),         //..默认开始时间（当前日期一周前）
            endDate: moment(new Date()).format("YYYY-MM-DD"),           //..默认结束时间（当前日期）
            pageSize: 30,       //  分页数据
            pageIndex: 1,       //  当前页数

            oTypeId: '',
            oChannelId: '',
            oSource: '',
            oFlag: '1',
            oStartDate: moment(new Date()).format("YYYY-MM-DD"),
            oEndDate: moment(new Date()).format("YYYY-MM-DD"), 



            goldDate: [],       //  入金日期数据
            goldInitData: [],   //  入金首投
            goldSecData: [],    //  入金复投

            annuaDate: [],
            annuaInitData: [],
            annuaSecData: [],

            outnumberDate: [],
            outnumberInitData: [],
            outnumberSecData: [],

            goldCicleDate: '',      //..入金环形日期
            goldCicleInitTotle: '', //..入金首投总额
            goldCicleSecTotle: '',  //..入金复投总额
            goldCicleInitData: [],  //  入金首投环形数据
            goldCicleSecData: [],   //  入金复投环形数据

            annuaCicleDate: '',      //
            annuaCicleInitTotle: '', //
            annuaCicleSecTotle: '',  //
            annuaCicleInitData: [],  // 
            annuaCicleSecData: [],   // 

            outnumberCicleDate: '',      //
            outnumberCicleInitTotle: '', //
            outnumberCicleSecTotle: '',  //
            outnumberCicleInitData: [],  // 
            outnumberCicleSecData: [],   // 

            userListArr: [],
            arriveListArr: [],
            investListArr: [],

            loading: false,
            totalCount: 0,

            typeFlag: false,
            channelFlag: false,
            stackedFlag: false,
            userFlag: false,
            cicleFlag: false,

            isClick: true,
            isClickDownload: true,

            dateArr: "",
        };
        me.onPaginationChange = this.onPaginationChange.bind(me)
        me.getType = me.getType.bind(me)
        me.getChannels = me.getChannels.bind(me)
        me.getSource = me.getSource.bind(me)
        me.onChangeDate = me.onChangeDate.bind(me)
        me.handleTypeChange = me.handleTypeChange.bind(me)
        me.handleChannelChange = me.handleChannelChange.bind(me)
        me.handleSourceChange = me.handleSourceChange.bind(me)
        me.handleDateChange = me.handleDateChange.bind(me)
        me.disabledDate = me.disabledDate.bind(me)

        me.stackedGraph = me.stackedGraph.bind(me)
        me.onDate = me.onDate.bind(me)
        me.activeFetch = me.activeFetch.bind(me)

        me.downLoad= this.downLoad.bind(me)
    }
    async onPaginationChange ( pageNumber ){
        await this.userList(pageNumber)
        await this.setState({
            pageIndex: pageNumber,
            arriveListArr: [],
            investListArr: []
        })
    }
    // 类型
    async handleTypeChange(value) {
        await this.setState({
            typeId: value,
            channelId:'',
            source:""
        })
        await this.getChannels(value)
        await this.getSource()
    }
    // 渠道
    async handleChannelChange(value) {
        await this.setState({
            channelId: value,
            source:""
        })
        await this.getSource()
    }
    // 来源
    handleSourceChange(value) {
        this.setState({
            source: value
        })
    }
    // 分组间隔
    handleDateChange(value) {
        this.setState({
            flag: value
        })
    }
    //  获取类型数据
    async getType() {
        const me = this
        const res = await getFetch(urlFile.getType, {})
        if(res.success){
            me.setState({
                typeFlag: true,
                getType: res.data
            })
        }
    }
    //  获取渠道数据
    async getChannels(typeId) {
        const me = this
        typeId = typeId ? typeId : ''
        const res = await getFetch(urlFile.getChannel, {
            typeId: typeId
        })
        if(res.success){
            me.setState({
                channelFlag: true,
                getChannel: res.data
            })
        }
    }
    //  获取source数据
    async getSource() {
        const me = this
        const res = await getFetch(urlFile.getSource, {
            typeId: this.state.typeId,
            channelId: this.state.channelId
        })
        if(res.success){
            me.setState({
                getSource: res.data
            })
        }
    }

    async onChangeDate(field, value) {
        this.setState({
            startDate: value[0],
            endDate: value[1]
        })
    }
    //下载
     downLoad(e) {
         const me = this;
         if(me.state.isClickDownload) {
             me.setState({
                 isClickDownload: false
             });
             notification.open({
                 message: '消息提示',
                 description: '下载任务已生成，请耐心等待～',
                 icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                 duration:3
             });
              window.location = '/financial/market/effectTrack/download?typeId=' + this.state.typeId + '&channelId=' + this.state.channelId + '&source=' + this.state.source + '&flag=' + this.state.flag + '&startDate=' + this.state.startDate + '&endDate=' + this.state.endDate;
             me.setState({
                 isClickDownload: true
             })
         }
    }
    // 堆积图
    async stackedGraph(typenum) {
        const me = this
        const stories = await postFetch(urlFile.stackedGraph, {
            typeId: this.state.typeId,
            channelId: this.state.channelId,
            source: this.state.source,
            flag: this.state.flag,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            type: typenum
        })
        if(stories.success){
            const res = stories.data
            const initAll = res.InitInvestment
            const secAll = res.repeatInvestment
            const dateArray = []
            const initArray = []
            const secArray = []
            await me.setState({
                stackedFlag: true
            })
            if(typenum == "1"){
                if(this.state.flag == 2){
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push((initAll[i].date).substr(0, 4) + "年第" + (initAll[i].date).slice(4) + "周");
                        initArray.push(initAll[i].initInvestAmount)
                    }
                    me.cicleEachart(initAll[initAll.length - 1].date, '1')
                }else {
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push(initAll[i].date);
                        initArray.push(initAll[i].initInvestAmount)
                    }
                    me.cicleEachart(dateArray[dateArray.length - 1], '1')
                }
                for(let i=0; i< secAll.length; i++){
                    secArray.push(secAll[i].repeatInvestAmount)
                }

                me.setState({
                    goldDate: dateArray,
                    goldInitData: initArray,
                    goldSecData: secArray
                })
                

            }else if(typenum == "2"){
                if(this.state.flag == 2){
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push((initAll[i].date).substr(0, 4) + "年第" + (initAll[i].date).slice(4) + "周");
                        initArray.push(initAll[i].initInvestAnnualized)
                    }
                    me.cicleEachart(initAll[initAll.length - 1].date, '2')
                }else {
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push(initAll[i].date);
                        initArray.push(initAll[i].initInvestAnnualized)
                    }
                    me.cicleEachart(dateArray[dateArray.length - 1], '2')
                }
                for(let i=0; i< secAll.length; i++){
                    secArray.push(secAll[i].reInvestAnnualized)
                }
                me.setState({
                    annuaDate: dateArray,
                    annuaInitData: initArray,
                    annuaSecData: secArray
                })
            }else if(typenum == "3"){
                if(this.state.flag == 2){
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push((initAll[i].date).substr(0, 4) + "年第" + (initAll[i].date).slice(4) + "周");
                        initArray.push(initAll[i].initInvestNumber)
                    }
                    me.cicleEachart(initAll[initAll.length - 1].date, '3')
                }else {
                    for(let i=0; i< initAll.length; i++){
                        dateArray.push(initAll[i].date);
                        initArray.push(initAll[i].initInvestNumber)
                    }
                    me.cicleEachart(dateArray[dateArray.length - 1], '3')
                    
                }
                for(let i=0; i< secAll.length; i++){
                    secArray.push(secAll[i].reInvestNumber)
                }
                me.setState({
                    outnumberDate: dateArray,
                    outnumberInitData: initArray,
                    outnumberSecData: secArray
                })
            }
        }
    }
    // 饼图
    async cicleEachart(date, type) {
        const me = this
        const stories = await postFetch(urlFile.chart, {
            typeId: this.state.oTypeId,
            channelId: this.state.oChannelId,
            source: this.state.oSource,
            flag: this.state.oFlag,
            date: date,
            type: type
        })
        if(stories.success){
            await me.setState({
                cicleFlag: true
            })
            const res = stories.data

            let circleDate = (res.date).substr(0, 4) + "年第" + (res.date).slice(4) + "周"
            if(this.state.flag != 2){
                circleDate = res.date
            }
            if(type == "1"){
                me.setState({
                    goldCicleDate: circleDate,
                    goldCicleInitTotle: res.firstTou.totleMoney,
                    goldCicleSecTotle: res.repeatTou.totleMoney,
                    goldCicleInitData: res.firstTou.data,
                    goldCicleSecData: res.repeatTou.data
                })
            }else if(type == "2"){
                me.setState({
                    annuaCicleDate: circleDate,
                    annuaCicleInitTotle: res.firstTou.totleMoney,
                    annuaCicleSecTotle: res.repeatTou.totleMoney,
                    annuaCicleInitData: res.firstTou.data,
                    annuaCicleSecData: res.repeatTou.data
                })
            }else if(type == "3"){
                me.setState({
                    outnumberCicleDate: circleDate,
                    outnumberCicleInitTotle: res.firstTou.totleMoney,
                    outnumberCicleSecTotle: res.repeatTou.totleMoney,
                    outnumberCicleInitData: res.firstTou.data,
                    outnumberCicleSecData: res.repeatTou.data
                })
            }
        }
    }
    onDate(date, type) {
        if(date.indexOf('年第') != -1){
            // 2017年第35周
            const changeData = date.substr(0, 4) + date.substring(6,8)
            this.cicleEachart(changeData, type)
        }else{
            this.cicleEachart(date, type)
        }
    }
    async userList(index) {
        const me = this
        me.setState({
            loading: true
        })
        const res = await postFetch(urlFile.effectTrack, {
            typeId: this.state.oTypeId,
            channelId: this.state.oChannelId,
            source: this.state.oSource,
            flag: this.state.oFlag,
            startDate: this.state.oStartDate,
            endDate: this.state.oEndDate,
            pageSize: this.state.pageSize,
            pageIndex: index
        })
        if(res.success){
            let dateArry = ""
            for(let i=0; i< res.data.length; i++){
                res.data[i].firstInvestmentAddAccount = '¥' + this.changeMoney(res.data[i].firstInvestmentAddAccount)
                res.data[i].firstInvestmentNh = '¥' + this.changeMoney(res.data[i].firstInvestmentNh)
                res.data[i].investmentAddAccount = '¥' + this.changeMoney(res.data[i].investmentAddAccount)
                res.data[i].ztzNh = '¥' + this.changeMoney(res.data[i].ztzNh)

                dateArry += res.data[i].date + "," + (me.state.oTypeId || "全部") + "," + (me.state.oChannelId || "全部") + "," + (me.state.oSource || "全部") + ";"
            }
            me.setState({
                userFlag: true,
                loading: false,
                totalCount: res.totalCount,
                userListArr: res.data,
                dateArr: dateArry
            })
            // console.log(me.state.dateArr);
        }else {
            await Modal.info({
                title: '提示',
                content: (
                    <div>
                        <p>类型和渠道不匹配，该推广方式下无此渠道，请核对！</p>
                    </div>
                ),
                onOk() {},
            });
        }
    }
    async activeFetch(index, button) {
        var me = this;
        if(me.state.isClick){
            me.setState({
                isClick: false
            })
            me.setState({
                loading: true
            })
            const stories = await postFetch(urlFile.batchActiveNum, {
                datas: this.state.dateArr,
                type: this.state.oFlag,
                flag: index
            })
            if(stories.success){
                me.setState({
                    isClick: true
                })
                if(index == "1"){
                    me.setState({ arriveListArr:stories.data})
                }else if(index == "2"){
                    me.setState({ investListArr:stories.data})
                }
            }else{
                me.setState({
                    loading: false
                })
            }
            me.setState({
                loading: false
            })
        }else {
            me.setState({
                loading: false
            })
        }

    }
    componentWillMount() {
        const SERVEN = 1000*60*60*24*6;
        const REFIX = new Date((new Date()).getTime() - SERVEN)
        this.setState({
            startDate: moment(REFIX).format("YYYY-MM-DD")
        })
    }
    async componentDidMount() {
        const me = this
        await me.setState({
            oTypeId: me.state.typeId,
            oChannelId: me.state.channelId,
            oSource: me.state.source,
            oFlag: me.state.flag,
            oStartDate: me.state.startDate,
            oEndDate: me.state.endDate
        })
        await me.getType()
        await me.getChannels()
        await me.stackedGraph('1')
        await me.stackedGraph('2')
        await me.stackedGraph('3')
        await me.userList('1')
    }
    disabledDate(current) {
        const ONEYEAR = 1000*60*60*24*365;
        let me = this;
        // let beginTime = (new Date()).getTime() - ONEYEAR
        let endTime = (new Date()).getTime() + ONEYEAR
        let val ;
        return current && (val = current.valueOf()) && (val > endTime || val > Date.now());
    }
    changeMoney(val) {
        var changeMoney = 0
        const ractMoney = Number(val).toFixed(2)
        changeMoney = ractMoney.split('.');
        changeMoney[0] = changeMoney[0].replace(/(\d)(?=(\d{3})+$)/g,'$1,');
        changeMoney = changeMoney.join('.');
        return changeMoney
    }

    render() {
        var me = this;
        var sideParam ='1';
        var searchButton = {
            callback:async function (button) {
                const ONEYEAR = 1000*60*60*24*365;
                const firstDate = (new Date(me.state.startDate)).getTime()
                const lastDate = (new Date(me.state.endDate)).getTime()
                const totleDate = lastDate - firstDate

                if(me.state.startDate == '' || me.state.endDate == ''){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>请填写时间！</p>
                            </div>
                        ),
                        onOk() {
                            button.setState({
                                loading: false
                            })
                            return
                        },
                    });
                    return
                }else if(totleDate > ONEYEAR){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>时间跨度不可超过一年，请重新选择</p>
                            </div>
                        ),
                        onOk() {
                            button.setState({
                                loading: false
                            })
                            return
                        },
                    });
                    return
                }
                await me.setState({
                    oTypeId: me.state.typeId,
                    oChannelId: me.state.channelId,
                    oSource: me.state.source,
                    oFlag: me.state.flag,
                    oStartDate: me.state.startDate,
                    oEndDate: me.state.endDate,
                    pageIndex: 1,
                    arriveListArr: [],
                    investListArr: []
                })
                await me.stackedGraph('1')
                await me.stackedGraph('2')
                await me.stackedGraph('3')
                await me.userList('1')
                button.setState({
                    loading: false
                })
            },
            text:"查询"
        };
        var tableParam = {
            columns:[
                {
                    title: '时间段',
                    dataIndex: 'date',
                }, {
                    title: <div><Button type="primary" onClick={()=> this.activeFetch(1)}>抵达/激活</Button></div>,
                    dataIndex: 'active-num',
                    render: (text, record, index) => {
                        const activation = me.state.arriveListArr[index]
                        return (
                            <div>
                                {
                                    activation == 'false' ? <span></span>:
                                    <span>{activation}</span>
                                }
                            </div>
                        )
                    } ,
                }, {
                    title: '注册人数',
                    dataIndex: 'register',
                }, {
                    title: '首投人数',
                    dataIndex: 'firstInvestmentUserNum',
                },{
                    title: '首投金额',
                    dataIndex: 'firstInvestmentAddAccount',
                },{
                    title: '首投年化',
                    dataIndex: 'firstInvestmentNh',
                },{
                    title: <div><Button type="primary" onClick={()=> this.activeFetch(2)}>投资人数</Button></div>,
                    dataIndex: 'investment-num',
                    render: (text, record, index) => {
                        const investNum = me.state.investListArr[index]
                        return (
                            <div>
                                {
                                    investNum == 'false' ? <span></span>:
                                    <span>{investNum}</span>
                                }
                            </div>
                        )
                    }
                },{
                    title: '投资金额',
                    dataIndex: 'investmentAddAccount',
                },{
                    title: '投资年化',
                    dataIndex: 'ztzNh',
                },{
                    title: '实名人数',
                    dataIndex: 'smNum',
                },{
                    title: '绑卡人数',
                    dataIndex: 'bkNum',
                }
            ],
            loading: me.state.loading,
            data: me.state.userListArr
        };
        const goldProps = {
            allDate: this.state.goldDate,
            allInitData: this.state.goldInitData,
            allSecData: this.state.goldSecData,
            allNameParams: {
                firstName: '首投入金',
                nextName: '复投入金'
            }
        }
        const annuaProps = {
            allDate: this.state.annuaDate,
            allInitData: this.state.annuaInitData,
            allSecData: this.state.annuaSecData,
            allNameParams: {
                firstName: '首投年化',
                nextName: '复投年化'
            }
        }
        const outnumberProps = {
            allDate: this.state.outnumberDate,
            allInitData: this.state.outnumberInitData,
            allSecData: this.state.outnumberSecData,
            allNameParams: {
                firstName: '首投人次',
                nextName: '复投人次'
            }
        }
        const Option = Select.Option;
        const dateFormat = 'YYYY-MM-DD';
        const statusLoading = this.state.typeFlag && this.state.channelFlag && this.state.stackedFlag && this.state.cicleFlag && this.state.userFlag 
        if(!statusLoading){
            return (
                <XXDFw sideParam={sideParam}>
                    <div className="search-group clearfix">
                        <div className="cell">
                            <label>类型：</label>
                            <Select
                                showSearch
                                value={me.state.typeId}
                                style={{ width: 180 }}
                                placeholder="选择类型"
                                searchPlaceholder="made"
                                optionFilterProp="children"
                                onChange={(value)=> this.handleTypeChange(value)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value=''>全部</Option>
                            {
                                this.state.getType.map((item)=> {
                                    return <Option value={(item.typeId).toString()} key={item.typeId}>{item.typeName}</Option>
                                })
                            }
                            </Select>
                        </div>
                        <div className="cell">
                            <label>渠道：</label>
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                value={me.state.channelId}
                                placeholder="选择渠道"
                                searchPlaceholder="made"
                                optionFilterProp="children"
                                onChange={(value)=> this.handleChannelChange(value)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value=''>全部</Option>
                            {
                                this.state.getChannel.map((item)=> <Option value={(item.channelId).toString()} key={item.channelId}>{item.channelName}</Option>)
                            }
                            </Select>
                        </div>
                        <div className="cell">
                            <label>source：</label>
                            <Select
                                showSearch
                                style={{ width: 180 }}
                                placeholder="全部"
                                value={me.state.source}
                                optionFilterProp="children"
                                onChange={(value)=> this.handleSourceChange(value)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value=''>全部</Option>
                            {
                                this.state.getSource.map((item)=> <Option value={item} key={item}>{item}</Option>)
                            }
                            </Select>
                        </div>
                        <div className="cell">
                            <label>分组间隔：</label>
                            <Select defaultValue="1" style={{ width: 120 }} onChange={(value)=> this.handleDateChange(value)}>
                                <Option value="1">日</Option>
                                <Option value="2">周</Option>
                                <Option value="3">月</Option>
                            </Select>
                        </div>
                        <div className="cell long-cell">
                            <label>日期：</label>
                            <RangePicker
                            disabledDate={me.disabledDate}
                            format={dateFormat}
                            defaultValue={[moment(me.state.startDate, dateFormat), moment(me.state.endDate, dateFormat)]}
                            onChange={(field, value)=>this.onChangeDate(field, value)} />
                        </div>
                        <div className="cell">
                            <XXDLoadingButton  {...searchButton} />
                        </div>
                    </div>
                    <div className="loading-center">
                        <Spin />
                    </div>
                </XXDFw>
            )
        }
        return (
            <XXDFw sideParam={sideParam}>
                <div className="search-group clearfix">
                    <div className="cell">
                        <label>类型：</label>
                        <Select
                            showSearch
                            value={me.state.typeId}
                            style={{ width: 180 }}
                            placeholder="选择类型"
                            searchPlaceholder="made"
                            optionFilterProp="children"
                            onChange={(value)=> this.handleTypeChange(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        <Option value=''>全部</Option>
                        {
                            this.state.getType.map((item)=> {
                                return <Option value={(item.typeId).toString()} key={item.typeId}>{item.typeName}</Option>
                            })
                        }
                        </Select>
                    </div>
                    <div className="cell">
                        <label>渠道：</label>
                        <Select
                            showSearch
                            style={{ width: 180 }}
                            value={me.state.channelId}
                            placeholder="选择渠道"
                            searchPlaceholder="made"
                            optionFilterProp="children"
                            onChange={(value)=> this.handleChannelChange(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        <Option value=''>全部</Option>
                        {
                            this.state.getChannel.map((item)=> <Option value={(item.channelId).toString()} key={item.channelId}>{item.channelName}</Option>)
                        }
                        </Select>
                    </div>
                    <div className="cell">
                        <label>source：</label>
                        <Select
                            showSearch
                            style={{ width: 180 }}
                            placeholder="全部"
                            value={me.state.source}
                            optionFilterProp="children"
                            onChange={(value)=> this.handleSourceChange(value)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                        <Option value=''>全部</Option>
                        {
                            this.state.getSource.map((item)=> <Option value={item} key={item}>{item}</Option>)
                        }
                        </Select>
                    </div>
                    <div className="cell">
                        <label>分组间隔：</label>
                        <Select defaultValue="1" style={{ width: 120 }} onChange={(value)=> this.handleDateChange(value)}>
                            <Option value="1">日</Option>
                            <Option value="2">周</Option>
                            <Option value="3">月</Option>
                        </Select>
                    </div>
                    <div className="cell long-cell">
                        <label>日期：</label>
                        <RangePicker
                         disabledDate={me.disabledDate}
                         format={dateFormat}
                         defaultValue={[moment(me.state.startDate, dateFormat), moment(me.state.endDate, dateFormat)]}
                         onChange={(field, value)=>this.onChangeDate(field, value)} />
                    </div>
                    <div className="cell">
                        <XXDLoadingButton  {...searchButton} />
                    </div>
                </div>
                <div className="echarts-main">
                    <div className="echart-row clearfix">
                        <h2 className="title">入金</h2>
                        <div className="echart-fund">
                            <PublicLine params={goldProps} onDate={ this.onDate } type='1'/>
                        </div>
                        <div className="echart-roundgroup">
                            <h3>{this.state.goldCicleDate}</h3>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.goldCicleInitData} date={this.state.goldCicleDate}/>
                                <p>首投入金{ '¥' + this.changeMoney(this.state.goldCicleInitTotle)}</p>
                            </div>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.goldCicleSecData}  date={this.state.goldCicleDate}/>
                                <p>复投入金{ '¥' + this.changeMoney(this.state.goldCicleSecTotle)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="echart-row clearfix">
                        <h2 className="title">年化</h2>
                        <div className="echart-fund">
                            <PublicLine params={annuaProps}  onDate={ this.onDate } type='2'/>
                        </div>
                        <div className="echart-roundgroup">
                            <h3>{this.state.annuaCicleDate}</h3>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.annuaCicleInitData} date={this.state.annuaCicleDate}/>
                                <p>首投年化{ '¥' + this.changeMoney(this.state.annuaCicleInitTotle)}</p>
                            </div>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.annuaCicleSecData} date={this.state.annuaCicleDate} />
                                <p>复投年化{ '¥' + this.changeMoney(this.state.annuaCicleSecTotle)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="echart-row clearfix">
                        <h2 className="title">投资人次</h2>
                        <div className="echart-fund">
                            <PublicLine params={outnumberProps}  onDate={ this.onDate } type='3'/>
                        </div>
                        <div className="echart-roundgroup">
                            <h3>{this.state.outnumberCicleDate}</h3>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.outnumberCicleInitData} date={this.state.outnumberCicleDate} />
                                <p>首投人次{this.state.outnumberCicleInitTotle}</p>
                            </div>
                            <div className="echart-category">
                                <PublicCicleInit params={this.state.outnumberCicleSecData} date={this.state.outnumberCicleDate} />
                                <p>复投人次{this.state.outnumberCicleSecTotle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="table-wrap">
                        <h2 className="title"><span>用户列表</span><Icon type="download" onClick={me.downLoad} style={{ fontSize: 16 }} /></h2>
                        <XXDTable  {...tableParam} />
                        <div className="pagination">
                            <Pagination showQuickJumper defaultCurrent={1} current={this.state.pageIndex} defaultPageSize={this.state.pageSize} total={this.state.totalCount} onChange={me.onPaginationChange} />
                        </div>
                    </div>
                </div>
            </XXDFw>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));