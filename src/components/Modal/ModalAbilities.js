import React, {Component} from 'react';
import { getAbilitie } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import { Modal, Input, Tag } from 'antd';
import Loading from "../UI/Loading";


const connectDecorator = connect(
    null,
    { getAbilitie }
);

class ModalAbilities extends Component{
    state = {
        loading: true,
        isModalVisible: false,
        info: null
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo = async () => {
        const { abilityModal } = this.props
        this.setState({ isModalVisible: true })
        this.setState({ loading: true })
        ///
        const res = await this.props.getAbilitie(abilityModal)
        this.setState({ info: res })
        ///
        this.setState({ loading: false })
    }

    handleOk = () => {
        this.setState({ isModalVisible: false })
        this.props.showAbilityModal(null)
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false })
        this.props.showAbilityModal(null)
    };

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    openPokemon = (name) => {
        window.location.href = "/pokemon/" + name
    }

    render() {
        const { loading, isModalVisible, info } = this.state
        const { abilityModal } = this.props
        return (
            <>
                <Modal
                    title={"Abilitie: " + abilityModal}
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
                                <Input.TextArea
                                    defaultValue={info.effect_entries[1].effect}
                                    disabled={true}
                                    autoSize={{
                                        minRows: 3, maxRows: 20
                                    }}
                                />
                                <div>Pokemons</div>
                                {
                                    info.pokemon.map(( item ) => {
                                        return <>
                                            <Tag
                                                className="margin-around-tag cursor-pointer"
                                                onClick={() => this.openPokemon(item.pokemon.name) }
                                            >
                                                {this.normalizeText(item.pokemon.name)}
                                            </Tag>
                                        </>
                                    })
                                }
                            </>
                        )
                    }
                </Modal>
            </>
        )
    }
}

const decoratedComponent = connectDecorator(ModalAbilities)
export {decoratedComponent as ModalAbilities};