import React, {Component} from 'react';
import { getLocationsArea } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import { List, Divider, Tag } from 'antd';
import Loading from "../UI/Loading";
import { ModalAbilities } from "../Modal/ModalAbilities";
import { ModalForms } from "../Modal/ModalForms";
import { ModalHeldItems } from "../Modal/ModalHeldItems";
import { ModalType } from "../Modal/ModalType";
import { ModalLocation } from "../Modal/ModalLocation";

import {
    TrophyOutlined,
    TableOutlined,
    ColumnHeightOutlined,
    ColumnWidthOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    ShoppingOutlined,
    ApartmentOutlined,
    FlagOutlined,
    TagsOutlined,
    GitlabOutlined,
} from '@ant-design/icons';
import {ModalMoves} from "../Modal/ModalMoves";

const connectDecorator = connect(
    null,
    { getLocationsArea }
);

class MainInfo extends Component{
    state = {
        loading: true,
        params: ['base_experience', 'height', 'weight', 'order', 'location_area_encounters', 'abilities', 'moves', 'held_items', 'forms', 'types'],
        webSite: 'https://www.pokemon.com/us/pokedex/',
        locations: [],
        abilityModal: null,
        formModal: null,
        movesModal: null,
        heldItemModal: null,
        dataList: []
    }
    componentDidMount() {
        this.getMainInfo()
        this.startGetLocationArea()
        // const word = this.normalizeText('location_area_encounters')
        // console.log(word);
    }


    getMainInfo = () => {
        const { dataList, params } = this.state
        const { pokemon } = this.props
        if( pokemon ) {
            Object.keys(pokemon).forEach(( pokemonInfo ) => {
                if(pokemonInfo) {
                    if( params.includes(pokemonInfo) ){
                        let newDataList = dataList
                        newDataList.push(
                            {
                                key: pokemonInfo,
                                value: pokemon[pokemonInfo]
                            }
                        )
                        this.setState({ dataList: newDataList})
                    }
                }
            })
        }
    }

    startGetLocationArea = async () => {
        const findE = this.state.dataList.find(e => e.key === 'location_area_encounters')
        const res = await this.getLocationArea(findE.value)
        this.setState({ locations: res })
        this.setState({ loading: false })
    }

    getLocationArea = async (urlLocation) => {
        const urlId = urlLocation.split('/')
        return await this.props.getLocationsArea(urlId[urlId.length - 2])
    }

    normalizeText = (text) => {
        return (text.charAt(0).toUpperCase() + text.slice(1)).replaceAll('_', ' ').replaceAll('-', ' ')
    }

    openWiki = (name) => {
        const { webSite } = this.state
        window.open( webSite + name, "_blank")
    }

    showAbilityModal = (name) => {
        this.setState({ abilityModal: name })
    }

    showFormModal = (name) => {
        this.setState({ formModal: name })
    }

    showMovesModal = (name) => {
        this.setState({ movesModal: name })
    }

    showHeldItemsModal = (name) => {
        this.setState({ heldItemModal: name })
    }

    showTypeModal = (name) => {
        this.setState({ typeModal: name })
    }

    showLocationModal = (name) => {
        this.setState({ locationModal: name })
    }

    render() {
        const { dataList, loading, locations, webSite,
            abilityModal, formModal, movesModal, heldItemModal, typeModal, locationModal } = this.state
        const { pokemon: { name } } = this.props
        return (
            <>
                {
                    loading && (
                        <>
                            <Loading/>
                        </>
                    )
                }
                {
                    !loading && (
                        <>
                            <Divider orientation="left">Basic information about Pokemon: {this.normalizeText(name)}</Divider>
                            <List
                                size="large"
                                footer={
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => this.openWiki(name)}
                                    >
                                        {
                                            webSite + name
                                        }
                                        <GitlabOutlined className='list-item-icon-margin-left'/>
                                    </div>
                                }
                                bordered
                                dataSource={dataList}
                                renderItem={ item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<div>{this.normalizeText(item.key)}:</div>}
                                        />
                                        {
                                            item.key === 'base_experience' && (
                                                <>
                                                    <div>
                                                        {item.value}
                                                        <TrophyOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'height' && (
                                                <>
                                                    <div>
                                                        {item.value}
                                                        <ColumnHeightOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'weight' && (
                                                <>
                                                    <div>
                                                        {item.value}
                                                        <ColumnWidthOutlined  className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'order' && (
                                                <>
                                                    <div>
                                                        {item.value}
                                                        <NumberOutlined  className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'moves' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        {item.value.map( (move) => {
                                                            return <Tag
                                                                    className="margin-around-tag cursor-pointer"
                                                                    key={move.move.name}
                                                                    onClick={() => this.showMovesModal(move.move.name)}
                                                                >
                                                                    {this.normalizeText(move.move.name)}
                                                                </Tag>
                                                        })}
                                                        <TableOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'abilities' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        {item.value.map( (abilityItem) => {
                                                            return <Tag
                                                                    className="margin-around-tag cursor-pointer"
                                                                    key={abilityItem.ability.name}
                                                                    onClick={() => this.showAbilityModal(abilityItem.ability.name)}
                                                                >
                                                                    {this.normalizeText(abilityItem.ability.name)}
                                                                </Tag>
                                                        })}
                                                        <ThunderboltOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'held_items' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        {item.value.map( (heldItems, index) => {
                                                            return <Tag
                                                                    className="margin-around-tag cursor-pointer"
                                                                    key={heldItems.item.name}
                                                                    onClick={() => this.showHeldItemsModal(heldItems.item.name)}
                                                                >
                                                                    {this.normalizeText(heldItems.item.name)}
                                                                </Tag>
                                                        })}
                                                        <ShoppingOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'forms' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        {item.value.map( (formItem) => {
                                                            return <Tag
                                                                    className="margin-around-tag cursor-pointer"
                                                                    key={formItem.name}
                                                                    onClick={() => this.showFormModal(formItem.name)}
                                                                >
                                                                    {this.normalizeText(formItem.name)}
                                                                </Tag>
                                                        })}
                                                        <ApartmentOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'types' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        {item.value.map( (typesItem) => {
                                                            return <Tag
                                                                    className="margin-around-tag cursor-pointer"
                                                                    key={typesItem.type.name}
                                                                    onClick={() => this.showTypeModal(typesItem.type.name)}
                                                                >
                                                                    {this.normalizeText(typesItem.type.name)}
                                                                </Tag>
                                                        })}
                                                        <TagsOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            item.key === 'location_area_encounters' && (
                                                <>
                                                    <div className='list-item-icon-margin-left-arr'>
                                                        { locations.map( (locationsItem) => {
                                                            return <Tag
                                                                className="margin-around-tag cursor-pointer"
                                                                key={locationsItem.location_area.name}
                                                                onClick={() => this.showLocationModal(locationsItem.location_area.name)}
                                                            >
                                                                {this.normalizeText(locationsItem.location_area.name)}
                                                            </Tag>

                                                        })
                                                        }
                                                        <FlagOutlined className='list-item-icon-margin-left'/>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </List.Item>
                                )
                                }
                            />

                            {
                                abilityModal && (
                                    <ModalAbilities
                                        abilityModal={abilityModal}
                                        showAbilityModal={this.showAbilityModal}
                                    />
                                )
                            }

                            {
                                formModal && (
                                    <ModalForms
                                        formModal={formModal}
                                        showFormModal={this.showFormModal}
                                    />
                                )
                            }

                            {
                                movesModal && (
                                    <ModalMoves
                                        movesModal={movesModal}
                                        showMovesModal={this.showMovesModal}
                                    />
                                )
                            }

                            {
                                heldItemModal && (
                                    <ModalHeldItems
                                        heldItemModal={heldItemModal}
                                        showHeldItemsModal={this.showHeldItemsModal}
                                    />
                                )
                            }

                            {
                                typeModal && (
                                    <ModalType
                                        typeModal={typeModal}
                                        showTypeModal={this.showTypeModal}
                                    />
                                )
                            }

                            {
                                locationModal && (
                                    <ModalLocation
                                        locationModal={locationModal}
                                        showLocationModal={this.showLocationModal}
                                    />
                                )
                            }
                        </>
                    )
                }
            </>
        )
    }
}

const decoratedComponent = connectDecorator(MainInfo)
export {decoratedComponent as MainInfo};