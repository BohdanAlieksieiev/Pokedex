import React, {Component} from 'react';
import { getType } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import {Modal, Form, Tag } from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getType }
);

class ModalType extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { typeModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })
        ///
        const res = await this.props.getType(typeModal)
        await this.setState({ info: res })
        console.log(res);
        ///
        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showTypeModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showTypeModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { typeModal } = this.props
        return (
            <>
                <Modal
                    title={"Type: " + this.normalizeText(typeModal)}
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
                                    labelCol={{ span: 8, offset: 8 }}
                                    layout="horizontal"
                                >

                                    <Form.Item label={this.normalizeText('move_damage_class') + ":"} name="move_damage_class">
                                        {this.normalizeText(info.move_damage_class.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('moves') + ":"} name="moves">
                                        {
                                            info.moves.map(( item ) => {
                                                return <Tag
                                                    key={item.id}
                                                    className="margin-around-tag"
                                                >
                                                    {item.name}
                                                </Tag>
                                            })
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

const decoratedComponent = connectDecorator(ModalType)
export {decoratedComponent as ModalType};