import React, {Component} from 'react';
import { getHeldItem } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import {Modal, Form, Tag, Input} from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getHeldItem }
);

class ModalHeldItems extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { heldItemModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })
        ///
        const res = await this.props.getHeldItem(heldItemModal)
        await this.setState({ info: res })
        console.log(res);
        ///
        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showHeldItemsModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showHeldItemsModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { heldItemModal } = this.props
        return (
            <>
                <Modal
                    title={"Held item: " + this.normalizeText(heldItemModal)}
                    visible={isModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {
                        loading && (
                            <Loading/>
                        )
                    }
                    {
                        !loading && (
                            <>
                                <Form
                                    labelCol={{ span: 6, offset: 6 }}
                                    layout="horizontal"
                                >
                                    <Form.Item label={this.normalizeText('flavor_text_entries') + ":"} name="flavor_text_entries">
                                        <Input.TextArea
                                            defaultValue={info.flavor_text_entries[0].text}
                                            disabled={true}
                                            autoSize={{
                                                minRows: 3, maxRows: 20
                                            }}
                                        />
                                    </Form.Item>


                                    <Form.Item label={this.normalizeText('attributes') + ":"} name="attributes">
                                        { info.attributes.map(( item ) => {
                                            return <>
                                                <Tag className="margin-around-tag" key={item.id}>
                                                    { item.name }
                                                </Tag>
                                            </>
                                        } )
                                        }
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('category') + ":"} name="category">
                                        {this.normalizeText(info.category.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('cost') + ":"} name="cost">
                                        {info.cost}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('fling_power') + ":"} name="fling_power">
                                        {info.fling_power}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('held_by_pokemon') + ":"} name="held_by_pokemon">
                                        { info.held_by_pokemon.map(( item ) => {
                                            return <Tag className="margin-around-tag" key={item.id}>
                                                    { item.pokemon.name }
                                                </Tag>
                                        } )
                                        }
                                    </Form.Item>
                                </Form>
                            </>
                        )
                    }
                </Modal>
            </>
        )
    }
}

const decoratedComponent = connectDecorator(ModalHeldItems)
export {decoratedComponent as ModalHeldItems};