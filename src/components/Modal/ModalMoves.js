import React, {Component} from 'react';
import { getMove } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import { Modal, Form } from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getMove }
);

class ModalMoves extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { movesModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })

        const res = await this.props.getMove(movesModal)
        await this.setState({ info: res })

        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showMovesModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showMovesModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { movesModal } = this.props
        return (
            <>
                <Modal
                    title={"Form " + movesModal}
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
                                    <Form.Item label={this.normalizeText('name') + ":"} name="name">
                                        {this.normalizeText(info.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('contest_type') + ":"} name="contest_type">
                                        {this.normalizeText(info.contest_type.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('damage_class') + ":"} name="damage_class">
                                        {this.normalizeText(info.damage_class.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('generation') + ":"} name="generation">
                                        {this.normalizeText(info.generation.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('target') + ":"} name="target">
                                        {this.normalizeText(info.target.name)}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('priority') + ":"} name="priority">
                                        {info.priority}
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

const decoratedComponent = connectDecorator(ModalMoves)
export {decoratedComponent as ModalMoves};