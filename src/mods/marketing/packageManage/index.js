import React from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import framework, {XXDFw  ,XXDLoadingButton , XXDTable} from '../../../components/framework'
import { Pagination, Select ,Modal,Button,Icon,Input,DatePicker,Spin,message} from 'antd';
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
            packageName: '',
            // startDate: moment(new Date()).format("YYYY-MM-DD"),
            // endDate: moment(new Date()).format("YYYY-MM-DD"),
            startDate: '',
            endDate: '',
            pageSize: 10,       //  分页数据
            pageIndex: 1,       //  当前页数

            totalCount: 0,
            loading: false,

            putData: [],



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
            packageId:'',
            popSource:'',
            popPackageName:'',
            popSourceEdit:'',
            isUseNum:'',

            copyValue:''
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
        //me.getChannelName = me.getChannelName.bind(me);

        me.getType = me.getType.bind(me);
        me.getChannels = me.getChannels.bind(me);
        me.managerChannel = me.managerChannel.bind(me);
        me.getSource = me.getSource.bind(me);
        me.onChangeDate = me.onChangeDate.bind(me);
        me.handleTypeChange = me.handleTypeChange.bind(me);
        me.handleChannelChange = me.handleChannelChange.bind(me);
        me.handleSourceChange = me.handleSourceChange.bind(me);
        //me.handleDateChange = me.handleDateChange.bind(me);
        // me.disabledDate = me.disabledDate.bind(me);
        me.utmMedia = me.utmMedia.bind(me);
        me.getnowtime = me.getnowtime.bind(me);
        me.padleft0 = me.padleft0.bind(me)
    }
    async onPaginationChange ( pageNumber ){
        await this.pageSend(pageNumber);
        await this.setState({
            pageIndex: pageNumber
        })
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

        await this.getChannels(value)
        await this.managerChannel(value)
        await this.getSource()

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
    // 来源
    handleSourceChange(value) {
        this.setState({
            source: value
        })
    }
    //  获取类型数据
    async getType() {
        const me = this;
        const res = await getFetch(urlFile.getType, {
            flag:2
        });
        if(res.success){
            me.setState({
                getType: res.data
            })
        }
    }
    //  获取渠道数据
    async getChannels(typeId) {
        const me = this;
        typeId = typeId ? typeId : '';
        const res = await getFetch(urlFile.getChannel, {
            typeId: typeId
        });
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
        await this.setState({
            startDate: value[0],
            endDate: value[1]
        })
        //console.log(this.state.startDate + this.state.endDate)
    }
    // componentWillMount() {
    //     const SERVEN = 0;
    //     const REFIX = new Date((new Date()).getTime() - SERVEN);
    //     this.setState({
    //         startDate: moment(REFIX).format("YYYY-MM-DD")
    //     })
    // }
    // disabledDate(current) {
    //     // const ONEYEAR = 1000*60*60*24*365;
    //     // let me = this;
    //     // let beginTime = (new Date()).getTime() - ONEYEAR
    //     // let endTime = (new Date()).getTime() + ONEYEAR
    //     // let val ;
    //     // return current && (val = current.valueOf()) && (val < beginTime || val > endTime || val > Date.now());
    // }
    handleChange (value) {
        //console.log(`select: ${value}`);
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
    utmMedia(e, name) {
        this.setState({
            [name]: e.target.value
        })
    }
    getnowtime() {
        var nowtime = new Date();
        var year = nowtime.getFullYear();
        var month = this.padleft0(nowtime.getMonth() + 1);
        var day = this.padleft0(nowtime.getDate());
        return year  + month +  day ;
    }
    padleft0(obj) {
        return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
    }
    // 弹框
    showModal(text, record, index, key) {
        var me = this;
        var useStr;
        if(record.isUse == "1"){
            useStr = "是";
        }else {
            useStr = "否";
        }
        return function(){
            if(key == "modalNew"){
                var newTime = (new Date().getTime()).toString();
                var timeStr=newTime.substring(newTime.length,newTime.length-3);
                var newName = "xxd_" + me.getnowtime() + timeStr + ".apk";
                me.setState({
                    [key]: true,
                    newKey: new Date().getTime(),
                    editKey: count++,
                    rowIndex: Number(index),
                    popType: record.typeName,
                    popchannelName: record.channelName,
                    popSource:"",
                    popPackageName:newName
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
                    packageId:record.id,
                    popSourceEdit:record.source
                });
            }
        }
    };
    download = (text, record, index) => () =>{
        window.open(record.downloadUrl)
    }
    handleOk (key){
        var me = this;
        return async function(){
            // 新建
            //console.log(me.state.inputValue);

            if(key == "modalNew"){
                var reg =/^[\u4e00-\u9fa5（）()_a-zA-Z0-9]+$/;
                var str = me.state.popPackageName;
                var packageStr = str.substring(str.length,str.length-4);
                if(!reg.test(me.state.popSource)){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>source仅允许中文+26个英文字母+10个数字+下划线+"（）"命名！</p>
                            </div>
                        ),
                        onOk() {},
                    });
                }else if(packageStr != ".apk" && packageStr != ".ipa"){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>应用包名必须以".apk"或".ipa"结尾！</p>
                            </div>
                        ),
                        onOk() {},
                    });
                }else {
                    const res = await postFetch(urlFile.addpackage, {
                        typeId: me.state.typeName,
                        channelId: me.state.channelName,
                        source: me.state.popSource,
                        packageName: me.state.popPackageName
                    })
                    if(res.success){
                        me.getChannels();
                        me.getType();
                        me.getSource();
                        me.pageSend(1);
                        me.setState({
                            [key]: false,
                            inputValue: "",
                            typeId: "",
                            channelId: "",
                            source: "",
                            packageName: "",
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
                var reg =/^[\u4e00-\u9fa5（）_a-zA-Z0-9]+$/;
                if(!reg.test(me.state.popSourceEdit)){
                    await Modal.info({
                        title: '提示',
                        content: (
                            <div>
                                <p>source仅允许中文+26个英文字母+10个数字+下划线+"（）"命名！</p>
                            </div>
                        ),
                        onOk() {},
                    });
                }else {
                    const res = await postFetch(urlFile.updatepackage, {
                        id: me.state.packageId,
                        source: me.state.popSourceEdit,
                        isUse: me.state.isUseNum
                    })
                    if(res.success){
                        me.getChannels();
                        me.pageSend(1);
                        me.setState({
                            [key]: false,
                            inputValue: "",
                            id: "",
                            source: "",
                            isUse: "",
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

    async pageSend(index) {
        var me = this;
        this.setState({
            loading: true
        });
        //分页
        const res = await getFetch(urlFile.package, {
            typeId: this.state.typeId,
            channelId: this.state.channelId,
            packageName: this.state.packageName,
            source: this.state.source,
            utmSource: this.state.utmSource,
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
    async componentDidMount(){
        // this.getChannelName();
        //分页
        // this.getType()
        this.pageSend(1);
        const me = this;
        await me.getType();
        await me.getChannels();
        await me.pageSend(1);

    }
    render() {
        var me = this;
        var sideParam = "5";
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
                        <CopyToClipboard text={me.state.pageData[index].downloadUrl} onCopy={this.onCopy}><Button type="primary">复制</Button></CopyToClipboard>
                },{
                    title: 'utm_source',
                    dataIndex: 'utmSource',
                },{
                    title: 'app包名',
                    dataIndex: 'packageName',
                }
                ,{
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record, index)=>{
                        return (
                            <div>
                                <Icon type="edit" onClick={this.showModal(text, record, index, 'modalEdit')} />
                                <Icon type="download" className='marginleft' onClick={ this.download(text, record, index) }  />
                            </div>
                        )
                    }
                }
            ],
            loading: me.state.loading,
            data: me.state.pageData
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
                        <label>包名：</label>
                        <Input type="text" value={ me.state.packageName } onChange={ (e)=> me.utmMedia(e, 'packageName')}/>
                    </div>
                    <div className="cell">
                        <label>utm_source：</label>
                        <Input type="text" value={ me.state.utmSource } onChange={ (e)=>  me.utmMedia(e, 'utmSource') }/>
                    </div>



                    <div className="cell long-cell">
                        <label>日期：</label>
                        <RangePicker
                            // disabledDate={me.disabledDate}
                            format={dateFormat}
                            // defaultValue={[moment(me.state.startDate, dateFormat), moment(me.state.endDate, dateFormat)]}
                            onChange={(field, value)=>this.onChangeDate(field, value)} />
                    </div>


                    <div className="cell">
                        <Button type="primary" className="mr20" onClick={this.showModal("", "", "",'modalNew')}>新增</Button>
                        <XXDLoadingButton  {...searchButton} />
                    </div>
                </div>
                <div className="table-wrap">
                    <h2 className="title">应用包管理</h2>
                    <XXDTable  {...tableParam} />
                    <div className="pagination">
                        <Pagination showQuickJumper defaultCurrent={1} current={me.state.pageIndex} defaultPageSize={10} total={me.state.pageNum} onChange={me.onPaginationChange} />
                    </div>
                </div>
                <Modal
                    title="应用包新增"
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
                        <li><span className="popTitle starIcon">source</span><Input placeholder="" value={ me.state.popSource } onChange={ (e)=> me.utmMedia(e, 'popSource')} /></li>
                        <li><span className="popTitle starIcon">包名</span><Input placeholder="" value={ me.state.popPackageName } onChange={ (e)=> me.utmMedia(e, 'popPackageName')} /></li>
                    </ul>
                </Modal>
                <Modal
                    title="应用包修改"
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
                        <li><span className="popTitle starIcon">source</span><Input placeholder="" value={ me.state.popSourceEdit } onChange={ (e)=> me.utmMedia(e, 'popSourceEdit')} /></li>
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
                    </ul>
                </Modal>
            </XXDFw>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));