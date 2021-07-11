import React, {Component} from 'react';
import { Drawer, Button, Affix, Form, Input, Select } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import Loading from "../UI/Loading";
import {connect} from "react-redux";
import {getTypes} from "../../services/actions/pokemons";
const { Option } = Select;

// import { Types } from "./Types";
// import {Regions} from "./Regions";
// import BaseExperience from "./BaseExperience";

const connectDecorator = connect(
    null,
    { getTypes }
);

class FilterPokemon extends Component{
    formRef = React.createRef();
    state = {
        visible: false,
        placement: 'left',
        affixOffsetTop: 80,

        loadingTags: true,
        tags: null
    }

    componentDidMount() {
        this.loadingTags()
    }

    loadingTags = async () => {
        const res = await this.props.getTypes()
        this.setState({ tags: res.results })
        this.setState({ loadingTags: false })
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    loadingFinished = () => {
        this.setState({ loadingTags: false })
    }

    onReset = () => {
        this.formRef.current.resetFields();
        this.onChangeForm()
        this.props.resetFilter()
    };

    onChangeForm = () => {
        this.props.setPokemonFilter(this.formRef.current.getFieldValue())
    }

    render(){
        const { placement, visible, affixOffsetTop, loadingTags, tags } = this.state;
        return (
            <>
                <Affix offsetTop={affixOffsetTop}>
                    <Button type="primary" onClick={this.showDrawer}>
                        <FilterOutlined />
                    </Button>
                </Affix>


                <Drawer
                    title="Filter pokemons"
                    placement={placement}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                    key={placement}
                >
                    <Form
                        ref={this.formRef}
                        layout="vertical"
                        name="userForm"
                        onChange={this.onChangeForm}
                    >
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        {
                            loadingTags && (
                                <Loading />
                            )
                        }
                        {
                            !loadingTags && (
                                <Form.Item name="tags" label="Tags">
                                    <Select placeholder="select tag" mode="multiple" onChange={this.onChangeForm}>
                                        {
                                            tags.map((value, index)=> {
                                                return <Option value={value.url} key={index}>{value.name.charAt(0).toUpperCase() + value.name.slice(1)}</Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            )
                        }

                        <Button htmlType="button" onClick={this.onReset}>
                            Reset
                        </Button>
                    </Form>


                    {/*Function is not implemented*/}
                    {/*<Types/>*/}
                    {/*<Regions*/}
                    {/*    loadingFinished={this.loadingFinished}/>*/}
                    {/*<BaseExperience/>*/}
                    {
                        loadingTags && (
                            <Loading />
                        )
                    }
                </Drawer>
            </>
        )
    }
}

const decoratedComponent = connectDecorator( FilterPokemon )
export { decoratedComponent as FilterPokemon };