import React from 'react';
import ReactDOM from 'react-dom';
import framework, {XXDFw  ,XXDLoadingButton ,XXDGroupCheck , XXDSelect , XXDRangePicker , XXDTable} from '../../../components/framework'
import { Pagination, Select, Icon, DatePicker, Modal, Spin } from 'antd';
import moment from 'moment';
import {XXDFundViewBar} from './view';
import { getFetch, postFetch } from '../../../components/cfetch'
import urlFile from '../../../components/cfetch/api'
import "./index.scss";
const RangePicker = DatePicker.RangePicker;
const dateFormat = 'YYYY-MM-DD';
class App extends React.Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            typeId: [],
            releayTypeId: [],
            channelId: [],
            releayChannelId: [],
            source: [],
            startDate: '',
            endDate: moment(new Date()).format("YYYY-MM-DD"),

            oTypeId: [],
            oChannelId: [],
            oSource: [],
            oStartDate: '',
            oEndDate: moment(new Date()).format("YYYY-MM-DD"),
            oGetSource: [],

            getType: [],
            getChannel: [],
            getSource: [],
            userList: [],
            totalCount: 0,
            pageSize: 5,
            pageIndex: 1,
            loading: false,
            typeName: '全部',
            channelName: '请选择渠道',
            sourceName: '全部',
            sourceDisabled: true,
            userTime: '',
            scatterList: [],
            rightTable: [],

            typeFlag: false,
            channelFlag: false,
            sourceFlag: false,
            scatterFlag: false,
            effectFlag: false,

            isClick: true

        };
        me.onPaginationChange = this.onPaginationChange.bind(me);
        me.handleTypeChange = me.handleTypeChange.bind(me)
        me.handleChannelChange = me.handleChannelChange.bind(me)
        me.handleSourceChange = me.handleSourceChange.bind(me)
        me.effectComparison = me.effectComparison.bind(me)
        me.onChangeDate = me.onChangeDate.bind(me)
        me.disabledDate = me.disabledDate.bind(me)
        me.clearTypeValue = me.clearTypeValue.bind(me)
        me.clearChannelValue = me.clearChannelValue.bind(me)
        me.clearSourceValue = me.clearSourceValue.bind(me)

        me.getScatter = me.getScatter.bind(me)
        me.getType = me.getType.bind(me)
        me.getChannels = me.getChannels.bind(me)
        me.getSource = me.getSource.bind(me)
        me.activeFetch = me.activeFetch.bind(me)
        me.entryTable = me.entryTable.bind(me)
        me.removeByValue = me.removeByValue.bind(this)
    }
    removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
          if(arr[i] == val) {
            arr.splice(i, 1);
            break;
          }
        }
        return arr
    }
    //  获取类型数据
    async getType() {
        const me = this
        var res = await getFetch(urlFile.getType,{})
        if(res.success){
            res.data.unshift({
                typeId: '0000', 
                typeName: "全部"
            })

            let allTypeId = []

            for(let i =0; i< res.data.length; i++){
                allTypeId.push(res.data[i].typeId)
            }

            await me.setState({
                typeFlag: true,
                getType: res.data,
                typeId: allTypeId,
                oTypeId: allTypeId,
                releayTypeId: allTypeId
            })
        }
    
    }
     //  获取渠道数据
    async getChannels(typeId,flag) {
        const me = this

        let otherType = []
        let allArr = this.state.typeId

        for(let i=0; i< allArr.length; i++){
            otherType.push(allArr[i])
        }

        if(otherType.indexOf('0000') == -1){
            typeId = otherType.join()
        }else{
            this.removeByValue(otherType, '0000')
            typeId = otherType.join()
        }

        // console.log(typeId)

        // typeId = typeId ? typeId : ''

        var res = await getFetch(urlFile.getChannel, {
            typeId: typeId
        })

        if(res.success && res.data.length != 0){
            if(this.state.typeId.length <= 1){
                res.data.unshift({
                    channelId: '0000', 
                    channelName: "全部"
                })
            }
            // debugger
            let allChannelId = []

            for(let i =0; i< res.data.length; i++){
                allChannelId.push(res.data[i].channelId)
            }

            if(flag){
                await me.setState({
                    channelFlag: true,
                    getChannel: res.data,
                    channelId: allChannelId,
                    oChannelId: allChannelId,
                    releayChannelId: allChannelId
                })
            }else{
                await me.setState({
                    channelFlag: true,
                    getChannel: res.data,
                    releayChannelId: allChannelId
                }) 
            }
        }
    }
     //  获取source数据
    async getSource() {
        const me = this
        let otherType = []
        let allArr = this.state.typeId
        let typeId = []
        for(let i=0; i< allArr.length; i++){
            otherType.push(allArr[i])
        }

        if(otherType.indexOf('0000') == -1){
            typeId = otherType
        }else{
            this.removeByValue(otherType, '0000')
            typeId = otherType
        }

        let otherChannel = []
        let allArrs = this.state.channelId
        let channelId = []
        for(let i=0; i< allArrs.length; i++){
            otherChannel.push(allArrs[i])
        }

        if(otherChannel.indexOf('0000') == -1){
            channelId = otherChannel
        }else{
            this.removeByValue(otherChannel, '0000')
            channelId = otherChannel
        }

        const res = await getFetch(urlFile.getSource, {
            typeId: typeId.join(),
            channelId: channelId.join()
        })
        if(res.success){
            me.setState({
                sourceFlag: true,
                getSource: res.data
            })
        }else{
            me.setState({
                getSource: []
            })
        }
    }
    async onChangeDate(field, value) {
        await this.setState({
            startDate: value[0], 
            endDate: value[1]
        })
    }
    clearTypeValue(value) {
        this.setState({
            typeName: '',
        })
    }
    clearChannelValue(value) {
        this.setState({
            channelName: '',
        })
    }
    clearSourceValue(value) {
        this.setState({
            sourceName: '',
        })
    }
    //  分页点击事件a
    async onPaginationChange ( pageNumber ){
        const me = this
        if( me.state.oSource.length == 0 && !me.state.sourceDisabled){
            await me.effectComparison(me.state.oGetSource.join(), pageNumber)
        }else{
            await me.effectComparison(undefined, pageNumber)
        }
        me.setState({
            pageIndex: pageNumber
        })
    }

    async activeFetch(record, index, item, button) {
        var me = this;
        if(me.state.isClick){
            me.setState({
                isClick: false
            })
            const stories = await postFetch(urlFile.getRecachOrInvest, {
                typeId: record.typeId,
                channelId: record.channelId,
                source: record.source,
                // date: record.date,
                startDate:this.state.startDate,
                endDate:this.state.endDate,
                flag: index
            })
            if(stories.success){
                me.setState({
                    isClick: true
                })
                const { userList } = me.state;
                if(index == "1"){
                    Object.keys(userList[item]).forEach((items) => {
                        if (userList[item][items] == 'false' && items == 'activation') {
                            userList[item].activation = stories.data;
                        }
                    });
                }else if(index == "2"){
                    Object.keys(userList[item]).forEach((items) => {
                        if (userList[item][items] == 'false' && items == 'investNum') {
                            userList[item].investNum = stories.data;
                        }
                    });
                }
                me.setState({ userList });
            }else{
                button.setState({
                    loading: false
                })
            }

        }else {
            button.setState({
                loading: false
            })
        }

    }
    // 选择事件
    async handleTypeChange (value, label) {
        console.log(value)

        let otherType = []
        let allArr = value
        let typeId = []
        for(let i=0; i< allArr.length; i++){
            otherType.push(allArr[i])
        }

        if(otherType.indexOf('0000') == -1){
            typeId = otherType
        }else{
            this.removeByValue(otherType, '0000')
            typeId = otherType
        }

        if(value.indexOf('0000') == -1 && this.state.typeId.indexOf('0000') == -1){
            await this.setState({
                typeId: value
            })
            // console.log('两个都没有：' + this.state.typeId)
        }else if(this.state.typeId.indexOf('0000') == -1 && value.indexOf('0000') != -1){
            await this.setState({
                typeId: this.state.releayTypeId
            })
        }else if(this.state.typeId.indexOf('0000') != -1 && value.indexOf('0000') == -1){
            await this.setState({
                typeId: []
            })
        }else{
            await this.setState({
                typeId: typeId
            })
            // console.log('两个都有：' + this.state.typeId)
        }
        // debugger
        // console.log('长度：' + this.state.typeId)
            // this.removeByValue(this.state.typeId, '0000')
            
        if(this.state.typeId.length != 0){

            let lengthName = ''

            if(this.state.typeId.indexOf('0000') == -1){
                lengthName = this.state.typeId.length
            }else{
                lengthName = this.state.typeId.length - 1
            }

            await this.setState({
                typeName: `已选择${lengthName}条`,
                channelName: '请选择渠道',
                sourceName: '全部',
                // typeId: value,
                channelId: [],
                getChannel: [],
                source: []
            })

            if(this.state.typeId.length > 1){
                this.setState({
                    sourceDisabled: true
                })
                await this.getChannels(this.state.typeId.join(), false)
            }else{
                this.setState({
                    sourceDisabled: false
                })
                await this.getChannels(this.state.typeId.join(), false)
                await this.getSource()
            }
        }else{
            await this.setState({
                typeName: '请选择类型',
                channelName: '请选择渠道',
                sourceName: '全部',
                channelId: [],
                getChannel: [],
                source: [],
                sourceDisabled: false
            })
            await this.getChannels(this.state.typeId.join(), false)
            await this.getSource()
        }
        
    }
    async handleChannelChange(value) {

        let otherChannel = []
        let allArr = value
        let typeId = []
        for(let i=0; i< allArr.length; i++){
            otherChannel.push(allArr[i])
        }

        if(otherChannel.indexOf('0000') == -1){
            typeId = otherChannel
        }else{
            this.removeByValue(otherChannel, '0000')
            typeId = otherChannel
        }

        if(value.indexOf('0000') == -1 && this.state.channelId.indexOf('0000') == -1){
            await this.setState({
                channelId: value
            })
            // console.log('两个都没有：' + this.state.typeId)
        }else if(this.state.channelId.indexOf('0000') == -1 && value.indexOf('0000') != -1){
            await this.setState({
                channelId: this.state.releayChannelId
            })
        }else if(this.state.channelId.indexOf('0000') != -1 && value.indexOf('0000') == -1){
            await this.setState({
                channelId: []
            })
        }else{
            await this.setState({
                channelId: typeId
            })
            // console.log('两个都有：' + this.state.typeId)
        }


        if(this.state.channelId.length != 0){
            if(this.state.channelId.length > 1 && this.state.typeId.length <= 1 ){
                this.setState({
                    sourceDisabled: true
                })
            }else if(this.state.channelId.length > 1 && this.state.typeId.length > 1 ){
                value.pop()
                // console.log(value)
            }else if(this.state.channelId.length <= 1 && this.state.typeId.length > 1 ){
                this.setState({
                    sourceDisabled: true
                })
            }else if(this.state.channelId.length <= 1 && this.state.typeId.length <= 1 ){
               this.setState({
                    sourceDisabled: false
                }) 
            }

            let channelName = ''

            if(this.state.channelId.indexOf('0000') == -1){
                channelName = this.state.channelId.length
            }else{
                channelName = this.state.channelId.length - 1
            }

            await this.setState({
                channelName: `已选择${channelName}条`,
                sourceName: '全部',
                // channelId: value,
                source: []
            })
        }else{
            await this.setState({
                channelName: '请选择渠道',
                sourceName: '全部',
                // channelId: value,
                source: []
            })
        }
        this.getSource()
    }
    handleSourceChange(value) {
        if(value.length != 0){
            this.setState({
                sourceName: `已选择${value.length}条`,
                source: value
            })
        }else{
            this.setState({
                sourceName: '全部',
                source: value
            })
        }
    }
    //  散点图获取数据  
    async getScatter(all) {
        const res = await postFetch(urlFile.scatter, {
            typeId: this.state.typeId.join(),
            channelId: this.state.channelId.join(),
            source: all || this.state.source.join(),
            startDate: this.state.startDate,
            endDate: this.state.endDate
        })
        if(res.success){
            // let firstData = res.data
            // for(let i=0; i < res.data.length; i++){
            //     for(let j=0; j < res.data[i].length; j++){
            //         res.data[i][j][2] = '¥' + this.changeMoney(Number(res.data[i][j][2]))
            //         // for(let k=0; k < res.data[i][j].length; k++){

            //             // res.data[i][j][2] = this.changeMoney(res.data[i][j][2])
            //         // }
            //     }
            // }
            this.setState({
                scatterFlag: true,
                rightTable: [],
                scatterList: res.data
            })
        }
    }

    isFlag(arr, oth) {
        for(let i=0; i< arr.length; i++){
            if(oth.id == arr[i].id){
                arr.splice(i, 1)
                return arr
            }
        }
        arr.push(oth)
        return arr
    }

    entryTable(e) {
        const me = this
        const data = e.data
        const targetObj = {
            id: data[3],
            type: data[7],
            channel: data[8],
            source: data[6],
            registerNum: data[0],
            firstInvestmentUserNum: data[1],
            firstInvestmentAddAccount: '¥' + this.changeMoney(Number(data[2]))
        }
        const otherArr = this.state.rightTable
        const resultArr = this.isFlag(otherArr, targetObj)
        me.setState({
            rightTable: resultArr
        })
    }
    //  获取用户列表信息
    async effectComparison(all, index) {

        const me = this
        me.setState({
            loading: true
        })
        const res = await postFetch(urlFile.effectComparison, {
            typeId: this.state.oTypeId.join(),
            channelId: this.state.oChannelId.join(),
            source: all || this.state.oSource.join(),
            startDate: this.state.oStartDate,
            endDate: this.state.oEndDate,
            pageSize: this.state.pageSize,
            pageIndex: index
        })
        if(res.success){
            const resRepeat = res.data
            for(let i=0; i<resRepeat.length; i++){
                resRepeat[i].id = i
                resRepeat[i].firstInvestmentAddAccount = '¥' + this.changeMoney(resRepeat[i].firstInvestmentAddAccount)
                resRepeat[i].firstInvestmentNh = '¥' + this.changeMoney(resRepeat[i].firstInvestmentNh)
                resRepeat[i].investmentAddAccount = '¥' + this.changeMoney(resRepeat[i].investmentAddAccount)
                resRepeat[i].ztzNh = '¥' + this.changeMoney(resRepeat[i].ztzNh)
            }
            await me.setState({
                effectFlag: true,
                loading: false,
                totalCount: res.totalCount,
                userList: resRepeat
            })
            
        }else{
            await me.setState({
                loading: false,
                totalCount: 0,
                userList: []
            })
        }
    }
    async componentWillMount() {
        const startTime = new Date("2017-01-01").getTime();
        const endTimeFix = 1000*60*60*24*1;
        const endTime = new Date((new Date()).getTime() - endTimeFix);
        await this.setState({ startDate: moment(startTime).format("YYYY-MM-DD") });
        await this.setState({ endDate: moment(endTime).format("YYYY-MM-DD") })
    }
    async componentDidMount() {
        await this.setState({
            userTime: this.state.startDate + '至' + this.state.endDate + '渠道效果对比'
        })
        await this.getType()
        await this.getChannels(this.state.typeId, true)
        await this.getSource()
        await this.getScatter(this.state.getSource.join())
        await this.effectComparison(this.state.getSource.join(), '1')
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
        const ractMoney = val.toFixed(2)
        changeMoney = ractMoney.split('.');
        changeMoney[0] = changeMoney[0].replace(/(\d)(?=(\d{3})+$)/g,'$1,');
        changeMoney = changeMoney.join('.');
        return changeMoney
    }
    render() {
        var me = this;
        var sideParam = '2';
        var rangePickerParam = {
            callback:function ( dateStrings ){
                // console.log ( dateStrings )
            }
        };

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
                    oStartDate: me.state.startDate,
                    oEndDate: me.state.endDate,
                    oGetSource: me.state.getSource
                })
                if(me.state.typeId.length == 0 && me.state.channelId.length == 0){
                    await Modal.info({
                        title: '提示',
                        content: (
                        <div>
                            <p>类型和渠道必须选择一个</p>
                        </div>
                        ),
                        onOk() {},
                    });
                    await button.setState({
                        loading: false
                    })
                    return
                }else if(!me.state.sourceDisabled && me.state.oSource.length == 0){
                    await me.effectComparison(me.state.oGetSource.join(), '1')
                    await me.getScatter(me.state.oGetSource.join())
                }else if(me.state.sourceDisabled){
                    await me.setState({
                        source: []
                    })
                    await me.effectComparison(undefined, '1')
                    await me.getScatter()
                }else if(!me.state.sourceDisabled && me.state.oGetSource.length > 0){
                    await me.effectComparison(undefined, '1')
                    await me.getScatter()
                }
                await me.setState({
                    userTime: me.state.startDate + '至' + me.state.endDate + '渠道效果对比'
                })

                

                me.setState({
                    pageIndex: 1
                })

                button.setState({
                    loading: false
                })
            },
            text:"查询"
        };

        var activeButton = function (text, record, index) {
            return {
                callback:function (button) {
                    me.activeFetch(record, '1', index, button)
                },
                text:text
            }
        }
        var outNumberButton = function(text, record, index){
            return {
                callback:function (button) {
                    me.activeFetch(record, '2', index, button)
                },
                text:text
            }
        }
        var tableParam = {
            columns:[{
                    title: '类型',
                    dataIndex: 'typeName',
                }, {
                    title: '渠道',
                    dataIndex: 'channelName',
                }, {
                    title: 'source',
                    dataIndex: 'source',
                },{
                    title: '抵达/激活',
                    dataIndex: 'active-num',
                    render: (text, record, index) => {
                        const {activation} = me.state.userList[index]
                        return (
                            <div>
                                {
                                    activation == 'false' ? <XXDLoadingButton  {...activeButton('刷新', record, index)}  /> :
                                    <span>{activation}</span>
                                }
                            </div>
                        )
                    } ,
                }, {
                    title: '注册人数',
                    dataIndex: 'registerNum',
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
                    title: '投资人数',
                    dataIndex: 'investment-num',
                    render: (text, record, index) => {
                        const {investNum} = me.state.userList[index]
                        return (
                            <div>
                                {
                                    investNum == 'false' ? <XXDLoadingButton  {...outNumberButton('刷新', record, index)}  /> :
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
            data: me.state.userList
        };


        //  处理多选事件

        const Option = Select.Option;
        // && this.state.channelFlag && this.state.sourceFlag
        const statusLoading = this.state.typeFlag   && this.state.scatterFlag && this.state.effectFlag 
        if(!statusLoading){
            return (
                <XXDFw sideParam={sideParam}>
                    <div className="search-group clearfix">
                        <div className="cell">
                            <label>类型：</label>
                            <Select
                                mode="multiple"
                                style={{ width: '120px' }}
                                placeholder={this.state.typeName}
                                defaultValue={[]}
                                value={this.state.typeId}
                                onSearch={this.clearTypeValue}
                                onChange={me.handleTypeChange}
                            >
                                {
                                    this.state.getType.map((item)=> <Option value={(item.typeId).toString(36)} key={(item.typeId).toString(36)}>{item.typeName}</Option>)
                                }
                            </Select>
                        </div>

                        <div className="cell">
                            <label>渠道：</label>
                            <Select
                                mode="multiple"
                                style={{ width: '120px' }}
                                placeholder={this.state.channelName}
                                defaultValue={[]}
                                value={this.state.channelId}
                                onSearch={this.clearChannelValue}
                                onChange={me.handleChannelChange}
                            >
                                {
                                    this.state.getChannel.map((item)=> <Option value={(item.channelId).toString(36)} key={(item.channelId).toString(36)}>{item.channelName}</Option>)
                                }
                            </Select>
                        </div>


                        <div className="cell">
                            <label>source：</label>
                            <Select
                                mode="multiple"
                                style={{ width: '120px' }}
                                placeholder={this.state.sourceName}
                                defaultValue={[]}
                                value={this.state.source}
                                disabled={this.state.sourceDisabled}
                                onSearch={this.clearSourceValue}
                                onChange={me.handleSourceChange}
                            >
                                {
                                    this.state.getSource.map((item)=> <Option value={item} key={item}>{item}</Option>)
                                }
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
                            mode="multiple"
                            style={{ width: '120px' }}
                            placeholder={this.state.typeName}
                            defaultValue={[]}
                            value={this.state.typeId}
                            onSearch={this.clearTypeValue}
                            onChange={me.handleTypeChange}
                        >
                            {
                                this.state.getType.map((item)=> <Option value={(item.typeId).toString(36)} key={(item.typeId).toString(36)}>{item.typeName}</Option>)
                            }
                        </Select>
                    </div>

                    <div className="cell">
                        <label>渠道：</label>
                        <Select
                            mode="multiple"
                            style={{ width: '120px' }}
                            placeholder={this.state.channelName}
                            defaultValue={[]}
                            value={this.state.channelId}
                            onSearch={this.clearChannelValue}
                            onChange={me.handleChannelChange}
                        >
                            {
                                this.state.getChannel.map((item)=> <Option value={(item.channelId).toString(36)} key={(item.channelId).toString(36)}>{item.channelName}</Option>)
                            }
                        </Select>
                    </div>


                    <div className="cell">
                        <label>source：</label>
                        <Select
                            mode="multiple"
                            style={{ width: '120px' }}
                            placeholder={this.state.sourceName}
                            defaultValue={[]}
                            value={this.state.source}
                            disabled={this.state.sourceDisabled}
                            onSearch={this.clearSourceValue}
                            onChange={me.handleSourceChange}
                        >
                            {
                                this.state.getSource.map((item)=> <Option value={item} key={item}>{item}</Option>)
                            }
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
                    <div className="comparison">
                        <div className="comparison-chart">
                            <h2>渠道对比</h2>
                            <div className="echart-fund" style={{marginTop:'25px'}}>
                                <XXDFundViewBar params={this.state.scatterList} onTable={this.entryTable} />
                            </div>
                        </div>
                        <div className="comparison-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>类型</th>
                                        <th>渠道</th>
                                        <th>source</th>
                                        <th className="blue">注册人数</th>
                                        <th className="blue">首投人数</th>
                                        <th className="blue">首投金额</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.rightTable.map((item)=> {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.type}</td>
                                                <td>{item.channel}</td>
                                                <td>{item.source}</td>
                                                <td>{item.registerNum}</td>
                                                <td>{item.firstInvestmentUserNum}</td>
                                                <td>{item.firstInvestmentAddAccount}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="table-wrap">
                        <h2 className="title">{this.state.userTime}</h2>
                        <XXDTable  {...tableParam} />
                        <div className="pagination">
                            <Pagination showQuickJumper defaultCurrent={1} current={this.state.pageIndex} defaultPageSize={me.state.pageSize} total={me.state.totalCount} onChange={me.onPaginationChange} />
                        </div>
                    </div>
                </div>
            </XXDFw>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));