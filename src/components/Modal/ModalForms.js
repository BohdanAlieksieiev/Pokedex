import React, {Component} from 'react';
import { getForm } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getForm }
);

class ModalForms extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { formModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })
        ///
        const res = await this.props.getForm(formModal)
        await this.setState({ info: res })
        console.log(res);
        ///
        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showFormModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showFormModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { formModal } = this.props
        return (
            <>
                <Modal
                    title={"Form: " + this.normalizeText(formModal)}
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
                                    <Form.Item label={this.normalizeText('form_name') + ":"} name="form_name">
                                        {this.normalizeText(info.form_name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('is_battle_only') + ":"} name="is_battle_only">
                                        {info.is_battle_only && (
                                            <>Yes</>
                                        )}
                                        {!info.is_battle_only && (
                                            <>No</>
                                        )}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('is_default') + ":"} name="is_battle_only">
                                        {info.is_default && (
                                            <>Yes</>
                                        )}
                                        {!info.is_default && (
                                            <>No</>
                                        )}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('order') + ":"} name="order">
                                        {info.is_default && (
                                            <>Yes</>
                                        )}
                                        {!info.is_default && (
                                            <>No</>
                                        )}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('order') + ":"} name="order">
                                        {info.order}
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

const decoratedComponent = connectDecorator(ModalForms)
export {decoratedComponent as ModalForms};