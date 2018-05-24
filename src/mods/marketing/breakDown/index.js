import React from 'react';
import ReactDOM from 'react-dom';
import framework, {XXDFw  ,XXDLoadingButton ,XXDGroupCheck , XXDSelect , XXDRangePicker , XXDTable} from '../../../components/framework'
import { Pagination, Select ,Modal,Button,Icon,Input, DatePicker,notification} from 'antd';
import moment from 'moment';
import { getFetch, postFetch } from '../../../components/cfetch'
import urlFile from '../../../components/cfetch/api'
import "./index.scss";
const RangePicker = DatePicker.RangePicker;
class App extends React.Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            typeId: '',
            channelId: '',
            source: '',
            getType: [],
            getChannel: [],
            getSource: [],

            utmSource: '',
            utmMedium: '',
            utmTerm: '',
            utmContent: '',
            utmCampaign: '',
            startDate: moment(new Date()).format("YYYY-MM-DD"),
            endDate: moment(new Date()).format("YYYY-MM-DD"),  
            pageSize: 10,       //  分页数据
            pageIndex: 1,       //  当前页数

            totalCount: 0,
            loading: false,
            isClickDownload: true,

            putData: []

        };
        me.onPaginationChange = this.onPaginationChange.bind(me);

        me.getType = me.getType.bind(me)
        me.handleTypeChange = me.handleTypeChange.bind(me)
        me.getChannels = me.getChannels.bind(me)
        me.handleChannelChange = me.handleChannelChange.bind(me)
        me.getSource = me.getSource.bind(me)
        me.handleSourceChange = me.handleSourceChange.bind(me)
        
        me.utmMedia = me.utmMedia.bind(me)
        me.disabledDate = me.disabledDate.bind(me)
        me.onChangeDate = me.onChangeDate.bind(me)
        me.getDetailList = me.getDetailList.bind(me)
        me.downLoad= this.downLoad.bind(me)
    }
    //  获取类型数据
    async getType() {
        const me = this
        const res = await getFetch(urlFile.getType, {})
        if(res.success){
            me.setState({
                getType: res.data
            })
        }
    }
    // 类型
    async handleTypeChange(value) {
        await this.setState({
            typeId: value,
            channelId:'',
            source: ''
        })
        await this.getChannels(value)
        await this.getSource()
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
                getChannel: res.data
            })
        }
    }
    // 渠道
    async handleChannelChange(value) {
        await this.setState({
            channelId: value,
            source:""
        })
        await this.getSource()
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
    // 来源
    handleSourceChange(value) {
        this.setState({
            source: value
        })
    }

    utmMedia(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }

    async onChangeDate(field, value) {
        await this.setState({
            startDate: value[0],
            endDate: value[1]
        })
    }

    disabledDate(current) {
        const ONEYEAR = 1000*60*60*24*365;
        let me = this;
        // let beginTime = (new Date()).getTime() - ONEYEAR
        let endTime = (new Date()).getTime() + ONEYEAR
        let val ;
        return current && (val = current.valueOf()) && ( val > endTime || val > Date.now());
    }

    async getDetailList(num) {
        const me = this
        me.setState({
            loading: true
        })
        const res = await postFetch(urlFile.dailydetail, {
            typeId: this.state.typeId,
            channelId: this.state.channelId,
            source: this.state.source,
            utmSource: this.state.utmSource,
            utmMedium: this.state.utmMedium,
            utmTerm: this.state.utmTerm,
            utmContent: this.state.utmContent,
            utmCampaign: this.state.utmCampaign,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            pageSize: this.state.pageSize,
            pageIndex: num
        })
        if(res.success){
            for(let i=0; i< res.data.length; i++){
                res.data[i].id = i
                res.data[i].firstInvestmentAddAccount = '¥' + this.changeMoney(res.data[i].firstInvestmentAddAccount)
                res.data[i].firstInvestmentNh = '¥' + this.changeMoney(res.data[i].firstInvestmentNh)
                res.data[i].ztzNh = '¥' + this.changeMoney(res.data[i].ztzNh)
                res.data[i].investmentAddAccount = '¥' + this.changeMoney(res.data[i].investmentAddAccount)
            }
            me.setState({
                loading: false,
                totalCount: res.totalCount,
                putData: res.data
            })
        }
    }

    async onPaginationChange ( pageNumber ){
        await this.getDetailList(pageNumber)
        await this.setState({
            pageIndex: pageNumber
        })
    }

    changeMoney(val) {
        var changeMoney = 0
        const ractMoney = val.toFixed(2)
        changeMoney = ractMoney.split('.');
        changeMoney[0] = changeMoney[0].replace(/(\d)(?=(\d{3})+$)/g,'$1,');
        changeMoney = changeMoney.join('.');
        return changeMoney
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
            window.location='/financial/market/dailydetail/download?typeId='+ this.state.typeId + '&channelId=' + this.state.channelId + '&source=' + this.state.source + '&utmSource=' + this.state.utmSource + '&utmMedium=' + this.state.utmMedium + '&utmTerm=' + this.state.utmTerm + '&utmContent=' + this.state.utmContent + '&utmCampaign=' + this.state.utmCampaign + '&startDate=' + this.state.startDate + '&endDate=' + this.state.endDate;
            me.setState({
                isClickDownload: true
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
        await me.getType()
        await me.getChannels()
        await me.getDetailList(1)
    }

    render() {
        var me = this;
        var sideParam = '3';
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
                if((new Date(me.state.endDate)).getTime() - (new Date(me.state.startDate)).getTime() > 1000*60*60*24*30){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>查询数据量较大，请耐心等待！</p>
                            </div>
                        ),
                        onOk() {
                            button.setState({
                                loading: false
                            })
                        },
                    });
                }
                await me.getDetailList(1);
                await me.setState({
                    pageIndex: 1
                });
                await button.setState({
                    loading: false
                })
            },
            text:"查询"
        };

        var tableParam = {
            columns:[
                {
                    title: '日期',
                    dataIndex: 'date',
                    width: 100,
                    fixed: 'left'
                },{
                    title: '类型',
                    width: 100,
                    dataIndex: 'typeName',
                    fixed: 'left'
                }, {
                    title: '渠道',
                    width: 100,
                    dataIndex: 'channelName',
                    fixed: 'left'
                }, {
                    title: 'source',
                    width: 100,
                    dataIndex: 'source',
                    fixed: 'left'
                },{
                    title: 'utm_media',
                    dataIndex: 'utmMedium',
                },{
                    title: 'utm_term',
                    dataIndex: 'utmTerm',
                },{
                    title: 'utm_content',
                    dataIndex: 'utmContent',
                },{
                    title: 'utm_campaingn',
                    dataIndex: 'utmCampaign',
                },{
                    title: '抵达／激活',
                    dataIndex: 'reach'
                },{
                    title: '激活人数',
                    dataIndex: 'activate',
                },{
                    title: '首投人数',
                    dataIndex: 'firstInvestmentUserNum',
                },{
                    title: '实名人数',
                    dataIndex: 'smNum',
                },{
                    title: '绑卡人数',
                    dataIndex: 'bkNum',
                },{
                    title: '首投金额',
                    dataIndex: 'firstInvestmentAddAccount',
                },{
                    title: '首投年化',
                    dataIndex: 'firstInvestmentNh',
                },{
                    title: '投资年化',
                    dataIndex: 'ztzNh',
                },{
                    title: '投资金额',
                    dataIndex: 'investmentAddAccount',
                }
            ],
            data: me.state.putData,
            loading: me.state.loading,
            scroll: {x:1300}
        };

        const Option = Select.Option;
        const dateFormat = 'YYYY-MM-DD';
        return (
            <XXDFw sideParam={sideParam}>
                <div className="search-group clearfix">
                    <div className="cell">
                        <label>类型：</label>
                        <Select
                            showSearch
                            value={me.state.typeId}
                            style={{ width: 160 }}
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
                            style={{ width: 160 }}
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
                            style={{ width: 160 }}
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
                        <label>utm_source：</label>
                        <Input type="text" value={ me.state.utmSource } onChange={ (e)=>  me.utmMedia(e, 'utmSource') }/>
                    </div>

                    <div className="cell">
                        <label>utm_media：</label>
                        <Input type="text" value={ me.state.utmMedium } onChange={ (e)=>  me.utmMedia(e, 'utmMedium') }/>
                    </div>


                    <div className="cell">
                        <label>utm_term：</label>
                        <Input type="text" value={ me.state.utmTerm } onChange={ (e)=> me.utmMedia(e, 'utmTerm')}/>
                    </div>

                    <div className="cell">
                        <label>utm_content：</label>
                        <Input type="text" value={ me.state.utmContent } onChange={ (e)=> me.utmMedia(e, 'utmContent')} />
                    </div>

                    <div className="cell">
                        <label>utm_campaign：</label>
                        <Input type="text" value={ me.state.utmCampaign } onChange={ (e)=> me.utmMedia(e, 'utmCampaign') } />
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
                <div className="search-group clearfix" style={{ background: "#fafafa" }}>
                    <div className="table-wrap">
                        <h2 className="title">
                            <span><Icon type="download" onClick={me.downLoad} style={{ fontSize: 20 }} /></span>
                        </h2>
                        <XXDTable  {...tableParam} />
                        <div className="pagination">
                            <Pagination showQuickJumper defaultCurrent={1} current={this.state.pageIndex}  defaultPageSize={this.state.pageSize} total={this.state.totalCount} onChange={me.onPaginationChange} />
                        </div>
                    </div>
                </div>
            </XXDFw>

        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));