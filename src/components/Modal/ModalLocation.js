import React, {Component} from 'react';
import { getLocation } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import {Modal, Form, Tag } from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getLocation }
);

class ModalLocation extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { locationModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })
        ///
        const res = await this.props.getLocation(locationModal)
        await this.setState({ info: res })
        console.log(res);
        ///
        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showLocationModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showLocationModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { locationModal } = this.props
        return (
            <>
                <Modal
                    title={"Location: " + this.normalizeText(locationModal)}
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
                                    labelCol={{ span: 8, offset: 2 }}
                                    layout="horizontal"
                                >

                                    <Form.Item label={this.normalizeText('game_index') + ":"} name="game_index">
                                        {info.game_index}
                                    </Form.Item>

                                    <Form.Item label={this.normalizeText('pokemon_encounters') + ":"} name="pokemon_encounters">
                                        {
                                            info.pokemon_encounters.map(( item ) => {
                                                return <Tag
                                                    key={item.id}
                                                    className="margin-around-tag"
                                                >
                                                    {item.pokemon.name}
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

const decoratedComponent = connectDecorator(ModalLocation)
export {decoratedComponent as ModalLocation};