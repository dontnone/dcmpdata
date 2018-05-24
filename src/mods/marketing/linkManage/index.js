import React from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import framework, {XXDFw  ,XXDLoadingButton , XXDTable} from '../../../components/framework'
import { Pagination, Select ,Modal,Button,Icon,Input,DatePicker,message} from 'antd';
import moment from 'moment';
import { getFetch, postFetch } from '../../../components/cfetch'
import urlFile from '../../../components/cfetch/api'
import "./index.scss";
const RangePicker = DatePicker.RangePicker;
var count = 0;
class App extends React.Component {
    constructor (props){
        super(props);
        var me = this;
        me.state = {
            modalNew: false,
            modalEdit: false,
            newKey: new Date().getTime(),
            editKey: count,
            selectData: [],
            typeData:[],
            pageData: [],
            pageNum: 0,
            inputValue: "",
            rowIndex: 0,
            otherPageName: '',
            popchannelName: '',
            popType: '',
            isUse: '',
            linkId:'',
            popSource:'',
            popPackageName:'',
            popSourceEdit:'',
            isUseNum:'',
            popUtmMedium:'',
            popUtmTerm:'',
            popUtmContent:'',
            popLink:'',
            popUtmCampaign:'',

            typeId: '',
            channelId: '',
            source: '',
            getType: [],
            getChannel: [],
            managerChannel: [],
            getSource: [],
            channelName:'',
            typeName:'',

            utmSource: '',
            utmMedium: '',
            utmTerm: '',
            utmContent: '',
            utmCampaign: '',
            startDate: '',
            endDate: '',
            pageSize: 10,       //  分页数据
            pageIndex: 1,       //  当前页数

            utmMediumAdd: '',
            utmTermAdd: '',
            utmContentAdd: '',
            utmCampaignAdd: '',

            totalCount: 0,
            loading: false,

            putData: []
        };
        me.onPaginationChange = this.onPaginationChange.bind(me);
        me.handleChange = me.handleChange.bind(me);
        // 弹框
        me.showModal = me.showModal.bind(me);
        // me.onClose = me.onClose.bind(me);
        me.handleOk = me.handleOk.bind(me);
        me.handleCancel = me.handleCancel.bind(me);
        //分页
        me.pageSend = me.pageSend.bind(me);
        me.search = me.search.bind(me);
        //获取输入框值
        me.getInput = me.getInput.bind(me);
        me.getType = me.getType.bind(me);
        me.handleTypeChange = me.handleTypeChange.bind(me);
        me.getChannels = me.getChannels.bind(me);
        me.managerChannel = me.managerChannel.bind(me);
        me.handleChannelChange = me.handleChannelChange.bind(me);
        me.getSource = me.getSource.bind(me);
        me.handleSourceChange = me.handleSourceChange.bind(me);
        me.utmMedia = me.utmMedia.bind(me);
        // me.disabledDate = me.disabledDate.bind(me);
        me.onChangeDate = me.onChangeDate.bind(me);
        me.pageSend = me.pageSend.bind(me)
    }
    async search(){
        var me = this;
        if(me.state.channelName == ""){
            await me.setState({
                channelName: me.state.selectData[0].channelName
            });
        }
        me.pageSend(1);
    }
    async getInput(e){
        let value=e.target.value;
        //console.log(value);
        await this.setState({
            inputValue: value
        });
    }
    handleChange (value) {
        var me = this;
        if(value == "是"){
            value = 1;
        }else if(value == "否"){
            value = 0;
        }
        me.setState({
            isUseNum: value,
        });
    }
    // 弹框
    showModal(text, record, index, key) {
        var me = this;
        var useStr;
        return function(){
            if(record.isUse == "1"){
                useStr = "是";
            }else {
                useStr = "否";
            }
            if(key == "modalNew"){
                me.setState({
                    [key]: true,
                    newKey: new Date().getTime(),
                    editKey: count++,
                    rowIndex: Number(index),
                    popType: record.typeName,
                    popchannelName: record.channelName,
                    linkId:record.id,
                    popSource:"",
                    utmMediumAdd:"",
                    utmTermAdd:"",
                    utmContentAdd:"",
                    popLink:"",
                    utmCampaignAdd:"",
                });
                me.handleTypeChange(1,"");

            }else if(key == "modalEdit"){
                me.setState({
                    [key]: true,
                    newKey: new Date().getTime(),
                    editKey: count++,
                    rowIndex: Number(index),
                    popType: record.typeName,
                    popchannelName: record.channelName,
                    isUse:useStr,
                    linkId:record.id,
                    popSourceEdit:record.source,
                    popUtmMedium:record.utmMedium,
                    popUtmTerm:record.utmTerm,
                    popUtmContent:record.utmContent,
                    popLink:record.source,
                    popUtmCampaign:record.utmCampaign,
                });
            }

        }
    };
    handleOk (key){
        var me = this;
        return async function(){
            // 新建
            //console.log(me.state.inputValue);
            var reg =/^[\u4e00-\u9fa5（）()_a-zA-Z0-9]*$/;
            //console.log(me.state.popSourceEdit);
                if(key == "modalNew"){
                    if(!reg.test(me.state.popSource)||!reg.test(me.state.utmMediumAdd)||!reg.test(me.state.utmTermAdd)||!reg.test(me.state.utmContentAdd)||!reg.test(me.state.utmCampaignAdd)){
                        await Modal.info({
                            title: '提示',
                            content: (
                                <div>
                                    <p>source、utmMedium、utmTerm、utmContent、utmCampaign仅允许中文+26个英文字母+10个数字+下划线+"（）"命名！</p>
                                </div>
                            ),
                            onOk() {},
                        });
                    }else {
                        const res = await postFetch(urlFile.addlinks, {
                            typeId: me.state.typeName,
                            channelId: me.state.channelName,
                            source: me.state.popSource,
                            utmMedium: me.state.utmMediumAdd,
                            utmTerm: me.state.utmTermAdd,
                            utmContent: me.state.utmContentAdd,
                            utmCampaign: me.state.utmCampaignAdd,
                            targetUrl: me.state.popLink
                        })
                        if(res.success){
                            me.getChannels();
                            me.getType();
                            me.getSource();
                            me.pageSend(1);
                            me.setState({
                                [key]: false,
                                inputValue: "",
                                pageIndex:1
                            });
                        }else {
                            await Modal.info({
                                title: '提示',
                                content: (
                                    <div>
                                        {res.message}
                                    </div>
                                ),
                                onOk() {},
                            });
                        }
                    }

                }else if(key == "modalEdit"){
                    if(!reg.test(me.state.popSourceEdit)||!reg.test(me.state.popUtmMedium)||!reg.test(me.state.popUtmTerm)||!reg.test(me.state.popUtmContent)||!reg.test(me.state.popUtmCampaign)){
                        await Modal.info({
                            title: '提示',
                            content: (
                                <div>
                                    <p>source、utmMedium、utmTerm、utmContent、utmCampaign仅允许中文+26个英文字母+10个数字+下划线+"（）"命名！</p>
                                </div>
                            ),
                            onOk() {},
                        });
                    }else {
                        const res = await postFetch(urlFile.updatelinks, {
                            id: me.state.linkId,
                            utmMedium:me.state.popUtmMedium,
                            utmTerm:me.state.popUtmTerm,
                            source: me.state.popSourceEdit,
                            utmContent: me.state.popUtmContent,
                            utmCampaign: me.state.popUtmCampaign,
                            isUse: me.state.isUseNum
                        })
                        if(res.success){
                            me.getChannels();
                            me.pageSend(1);
                            me.setState({
                                [key]: false,
                                inputValue: "",
                                pageIndex:1
                            });
                        }else {
                            await Modal.info({
                                title: '提示',
                                content: (
                                    <div>
                                        {res.message}
                                    </div>
                                ),
                                onOk() {},
                            });
                        }
                    }
                }
        }
    };
    handleCancel (key){
        var me = this;
        return function(){
            me.setState({
                [key]: false
            });
        }
    };
    //  获取类型数据
    async getType() {
        const me = this
        const res = await getFetch(urlFile.getType, {
            flag:1
        })
        if(res.success){
            me.setState({
                getType: res.data
            })
        }
    }
    // 类型
    async handleTypeChange(param,value) {
        if(param == 0){
            await this.setState({
                typeId: value,
                channelId:'',
                source:""
            })
        }else {
            await this.setState({
                typeName: value,
                channelName:'',
                source:""
            })
        }
        await this.getChannels(value);
        await this.managerChannel(value);
        await this.getSource();
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
    //  获取弹框渠道数据
    async managerChannel(typeId) {
        const me = this;
        typeId = typeId ? typeId : '';
        const res = await getFetch(urlFile.managerChannel, {});
        if(res.success){
            me.setState({
                managerChannel: res.data
            })
        }
    }
    // 渠道
    async handleChannelChange(param,value) {
        //console.log(value);
        if(param == 0){
            await this.setState({
                channelId: value,
                source:""
            });
        }else {
            await this.setState({
                channelName: value,
                source:""
            });
        }
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
        //console.log(this.state.startDate + this.state.endDate)
    }

    // disabledDate(current) {
    //     const ONEYEAR = 1000*60*60*24*365;
    //     let me = this;
    //     let beginTime = (new Date()).getTime() - ONEYEAR
    //     let endTime = (new Date()).getTime() + ONEYEAR
    //     let val ;
    //     return current && (val = current.valueOf()) && (val < beginTime || val > endTime || val > Date.now());
    // }

    async pageSend(index) {
        const me = this
        me.setState({
            loading: true
        })
        const res = await postFetch(urlFile.links, {
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
            pageIndex: index
        })
        if(res.success){
            me.setState({
                loading: false,
                pageData: res.data,
                pageNum: Number(res.totalCount)
            })
        }
    }

    async onPaginationChange ( pageNumber ){
        await this.pageSend(pageNumber)
        await this.setState({
            pageIndex: pageNumber
        })
    }
    // componentWillMount() {
    //     const SERVEN = 1000*60*60*24*60;
    //     const REFIX = new Date((new Date()).getTime() - SERVEN)
    //     this.setState({
    //         startDate: moment(REFIX).format("YYYY-MM-DD")
    //     })
    // }
    async componentDidMount() {
        const me = this
        await me.getType()
        await me.getChannels()
        await me.pageSend(1)
    }
    render() {
        var me = this;
        var sideParam = "6";
        var searchButton = {
            callback:async function (button) {
                await me.pageSend(1)
                await me.setState({
                    pageIndex: 1
                })
                await button.setState({
                    loading: false
                })
            },
            text:"查询"
        };

        var activeButton = function (text) {
            return {
                callback:function (button) {
                    setTimeout(function () {
                        button.setState({
                            loading:false
                        });
                    },3000);
                },
                text:text
            }
        }
        var tableParam = {
            columns:[
                {
                    title: '类型',
                    dataIndex: 'typeName',
                }, {
                    title: '渠道',
                    dataIndex: 'channelName',
                }, {
                    title: 'source',
                    dataIndex: 'source',
                }, {
                    title: '是否在用',
                    dataIndex: 'isUse',
                    render:(text, record, index)=>{
                        if(me.state.pageData[index].isUse == "1"){

                            return "是"
                        }else {
                            return "否"
                        }
                    }
                },{
                    title: '创建时间',
                    dataIndex: 'createTime',
                },{
                    title: '推广链接',
                    dataIndex: '',
                    render: (text, record, index)=>
                        <CopyToClipboard text={me.state.pageData[index].advertUrl} onCopy={this.onCopy}><Button type="primary">复制</Button></CopyToClipboard>
                },{
                    title: 'utm_source',
                    dataIndex: 'utmSource',
                },{
                    title: 'utm_medium',
                    dataIndex: 'utmMedium',
                },{
                    title: 'utm_term',
                    dataIndex: 'utmTerm',
                },{
                    title: 'utm_content',
                    dataIndex: 'utmContent',
                },{
                    title: 'utm_campaign',
                    dataIndex: 'utmCampaign',
                },{
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record, index)=><Icon type="edit" onClick={this.showModal(text, record, index, 'modalEdit')} />
                }
            ],
            loading: me.state.loading,
            data:me.state.pageData
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
                            onChange={(value)=> this.handleTypeChange(0,value)}
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
                            onChange={(value)=> this.handleChannelChange(0,value)}
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
                            // disabledDate={me.disabledDate}
                            format={dateFormat}
                            // defaultValue={[moment(me.state.startDate, dateFormat), moment(me.state.endDate, dateFormat)]}
                            onChange={(field, value)=>this.onChangeDate(field, value)} />
                    </div>


                    <div className="cell btnBox">
                        <Button type="primary" onClick={this.showModal("","","",'modalNew')}>新增</Button>
                    </div>
                    <div className="cell btnBox">
                        <XXDLoadingButton  {...searchButton} />
                    </div>
                </div>
                <div className="table-wrap">
                    <h2 className="title">推广链接管理</h2>
                    <XXDTable  {...tableParam} />
                    <div className="pagination">
                        <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={11} total={me.state.pageNum} onChange={me.onPaginationChange} />
                    </div>
                </div>
                <Modal
                    title="推广链接新增"
                    visible={this.state.modalNew}
                    onOk={this.handleOk('modalNew')}
                    onCancel={this.handleCancel('modalNew')}
                    key={this.state.newKey}
                >
                    <ul className="pop-wrap">
                        <li>
                            <span className="popTitle starIcon">类型</span>
                            <Select
                                showSearch
                                value={me.state.typeName}
                                style={{ width: 160 }}
                                placeholder="选择类型"
                                searchPlaceholder="made"
                                optionFilterProp="children"
                                onChange={(value)=> this.handleTypeChange(1,value)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value=''>全部</Option>
                                {
                                    this.state.getType.map((item)=> {
                                        return <Option value={(item.typeId).toString()} key={item.typeId}>{item.typeName}</Option>
                                    })
                                }
                            </Select>
                        </li>
                        <li><span className="popTitle">utm_medium</span><Input placeholder=""  value={ me.state.utmMediumAdd } onChange={ (e)=> me.utmMedia(e, 'utmMediumAdd')} /></li>
                        <li>
                            <span className="popTitle starIcon">渠道</span>
                            <Select
                                showSearch
                                style={{ width: 160 }}
                                value={me.state.channelName}
                                placeholder="选择渠道"
                                searchPlaceholder="made"
                                optionFilterProp="children"
                                onChange={(value)=> this.handleChannelChange(1,value)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value=''>全部</Option>
                                {
                                    this.state.managerChannel.map((item)=> <Option value={(item.id).toString()} key={item.id}>{item.channelName}</Option>)
                                }
                            </Select>
                        </li>
                        <li><span className="popTitle">utm_term</span><Input placeholder="" value={ me.state.utmTermAdd } onChange={ (e)=> me.utmMedia(e, 'utmTermAdd')} /></li>
                        <li><span className="popTitle starIcon">source</span><Input placeholder="" value={ me.state.popSource } onChange={ (e)=> me.utmMedia(e, 'popSource')} /></li>
                        <li><span className="popTitle">utm_content</span><Input placeholder="" value={ me.state.utmContentAdd } onChange={ (e)=> me.utmMedia(e, 'utmContentAdd')} /></li>
                        <li><span className="popTitle starIcon">落地页链接</span><Input placeholder="" value={ me.state.popLink } onChange={ (e)=> me.utmMedia(e, 'popLink')} /></li>
                        <li><span className="popTitle">utm_campaign</span><Input placeholder="" value={ me.state.utmCampaignAdd } onChange={ (e)=> me.utmMedia(e, 'utmCampaignAdd')} /></li>
                    </ul>
                </Modal>
                <Modal
                    title="推广链接修改"
                    visible={this.state.modalEdit}
                    onOk={this.handleOk('modalEdit')}
                    onCancel={this.handleCancel('modalEdit')}
                    key={this.state.editKey}
                >
                    <ul className="pop-wrap">
                        <li>
                            <span className="popTitle starIcon">类型</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder={me.state.popType}
                                disabled
                            >
                            </Select>
                        </li>
                        <li><span className="popTitle">utm_medium</span><Input placeholder="" value={ me.state.popUtmMedium } onChange={ (e)=> me.utmMedia(e, 'popUtmMedium')} /></li>
                        <li>
                            <span className="popTitle starIcon">渠道</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder={me.state.popchannelName}
                                disabled
                            >
                            </Select>
                        </li>
                        <li><span className="popTitle">utm_term</span><Input placeholder="" value={ me.state.popUtmTerm } onChange={ (e)=> me.utmMedia(e, 'popUtmTerm')} /></li>
                        <li><span className="popTitle starIcon">source</span><Input placeholder="" value={ me.state.popSourceEdit } onChange={ (e)=> me.utmMedia(e, 'popSourceEdit')}  /></li>
                        <li><span className="popTitle">utm_content</span><Input placeholder="" value={ me.state.popUtmContent } onChange={ (e)=> me.utmMedia(e, 'popUtmContent')} /></li>
                        <li>
                            <span className="popTitle">是否在用</span>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder={me.state.isUse}
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </li>
                        <li><span className="popTitle">utm_campaign</span><Input placeholder="" value={ me.state.popUtmCampaign } onChange={ (e)=> me.utmMedia(e, 'popUtmCampaign')} /></li>
                    </ul>
                </Modal>
            </XXDFw>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));