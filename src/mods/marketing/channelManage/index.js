import React from 'react';
import ReactDOM from 'react-dom';
import framework, {XXDFw  , XXDTable} from '../../../components/framework'
import { Pagination, Select ,Modal,Button,Icon,Input,message} from 'antd';
import { getFetch, postFetch } from '../../../components/cfetch'
import urlFile from '../../../components/cfetch/api'
import "./index.scss";
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
            pageData: [],
            pageNum: 0,
            channelName:"",
            loading: false,
            inputValue: "",
            rowIndex: 0,
            pageIndex: 1,
            otherPageName: ''
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
        me.getChannelName = me.getChannelName.bind(me);
    }
    async onPaginationChange (pageNumber ){
        await this.setState({
            pageIndex: pageNumber
        });
        this.pageSend(pageNumber)
    }
    handleChange (value) {
        var me = this;
        me.setState({
            channelName: value,
        });
        // console.log(`select: ${value}`)
    }
    // 弹框
    showModal( text, record, index, key) {
        var me = this;
        return function(){
            me.setState({
                [key]: true,
                newKey: new Date().getTime(),
                editKey: count++,
                rowIndex: Number(index)
            });
        }
    };
    handleOk (key){
        var me = this;
        return async function(){
            // 新建
            //console.log(me.state.inputValue);
            var reg =/^[\u4e00-\u9fa5（）()_a-zA-Z0-9]+$/;
            if(!reg.test(me.state.inputValue)){
                await Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>仅允许中文+26个英文字母+10个数字+下划线+"（）"命名！</p>
                        </div>
                    ),
                    onOk() {},
                });
            }else {
                //console.log('输入成功');
                if(key == "modalNew"){
                    const res = await postFetch(urlFile.addchannel, {
                        channelName: me.state.inputValue
                    })
                    if(res.success){
                        me.getChannelName();
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
                }else if(key == "modalEdit"){
                    const res = await postFetch(urlFile.updatechannel, {
                        id: me.state.pageData[me.state.rowIndex].id,
                        newChannelName: me.state.inputValue
                    })
                    if(res.success){
                        me.getChannelName();
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
    async search(){
        var me = this;
        await me.setState({
            pageIndex: 1,
            otherPageName: me.state.channelName
        });
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
        const res = await getFetch(urlFile.channel, {
            channelName: me.state.otherPageName,
            pageSize: 10,
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
    async getChannelName(){
        var me = this;
        //渠道名下拉列表渲染
        const res = await getFetch(urlFile.getChannelName, {})
        if(res.success){
            me.setState({
                selectData: res.data
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

    componentWillMount(){

    }
    async componentDidMount(){
        await this.pageSend(1)
        await this.getChannelName();
        await this.setState({
            otherPageName: this.state.channelName
        })
        //分页
       

    }
    render() {
        var me = this;
        var sideParam = "4";
        var tableParam = {
            columns:[
                {
                    title: '渠道id',
                    dataIndex: 'id',
                }, {
                    title: '渠道名',
                    dataIndex: 'channelName',
                }, {
                    title: '创建时间',
                    dataIndex: 'createTime',
                }, {
                    title: '创建人',
                    dataIndex: 'founder',
                },{
                    title: '修改时间',
                    dataIndex: 'updateTime',
                },{
                    title: '修改人',
                    dataIndex: 'modifier',
                },{
                    title: '操作',
                    dataIndex: 'operate',
                    render: (text, record, index)=><Icon type="edit" onClick={this.showModal( text, record, index,'modalEdit')} />
                }
            ],
            loading: me.state.loading,
            data: me.state.pageData
        };
        const Option = Select.Option;
        // debugger
        if(this.state.selectData.length == 0){
            return (
                <div>
                    <p></p>
                </div>
            )
        }
        return (
            <XXDFw sideParam={sideParam}>
                <div className="cell">
                    <label>渠道：</label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        value= {me.state.channelName}
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        defaultValue=''
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                    <Option value="">全部</Option>
                    {
                        me.state.selectData.map((item)=>{
                            return <Option value={item.channelName} key={item.channelName}>{item.channelName}</Option>
                        })
                    }
                    </Select>
                    <Button type="primary" onClick={this.showModal("", "", "",'modalNew')}>新增</Button>
                    <Button type="primary" onClick={me.search}>查询</Button>
                </div>
                <div className="search-group clearfix">
                    <div className="table-wrap">
                        <h2 className="title">渠道管理</h2>
                        <XXDTable  {...tableParam} />
                        <div className="pagination">
                            <Pagination showQuickJumper defaultCurrent={1} current={me.state.pageIndex} defaultPageSize={10} total={me.state.pageNum} onChange={me.onPaginationChange} />
                        </div>
                    </div>
                </div>
                <Modal
                    title="渠道新增"
                    visible={this.state.modalNew}
                    onOk={this.handleOk('modalNew')}
                    onCancel={this.handleCancel('modalNew')}
                    key={this.state.newKey}
                >
                    <div className="input-wrap">
                        <span className="starIcon">渠道名：</span>
                        <Input placeholder=""  onChange={this.getInput.bind(this)}/>
                    </div>
                </Modal>
                <Modal
                    title="渠道修改"
                    visible={this.state.modalEdit}
                    onOk={this.handleOk('modalEdit')}
                    onCancel={this.handleCancel('modalEdit')}
                    key={this.state.editKey}
                >
                    <ul className="pop-wrap">
                        <li><span>创建人</span><Input placeholder="" value={this.state.pageData[this.state.rowIndex].founder} disabled /></li>
                        <li><span>创建时间</span><Input placeholder="" value={this.state.pageData[this.state.rowIndex].createTime} disabled /></li>
                        <li><span>渠道原名</span><Input placeholder="" value={this.state.pageData[this.state.rowIndex].channelName} disabled /></li>
                        <li><span className="starIcon">渠道新名</span><Input placeholder="" onChange={this.getInput.bind(this)}/></li>
                    </ul>
                </Modal>
            </XXDFw>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('J_wrapBody'));