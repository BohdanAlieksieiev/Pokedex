import React, {Component} from 'react';

import { Card, Image } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { getPokemon } from "../../services/actions/pokemons";

import { connect } from 'react-redux';
import Loading from "../UI/Loading";

const { Meta } = Card;
const connectDecorator = connect(
    null,
    { getPokemon }
);

class PokemonCard extends Component{
    state = {
        pokemon: null,
        styleWidth: 300,
        imageWidth: 300,
        loading: true
    }

    componentDidMount() {
        this.getPokemon()
    }

    getPokemon = async () => {
        const res = await this.props.getPokemon(this.props.pokemon.name)
        await this.setState({ pokemon: res })
        this.setState({ loading: false })
    }

    render(){
        const { loading, pokemon, styleWidth, imageWidth} = this.state

        return (
            <>
                {
                    !loading && (
                        <Card
                            loading={loading}
                            style={{ width: styleWidth}}
                            cover={
                                <>
                                    {
                                        loading && (
                                            <Loading/>
                                        )
                                    }
                                    {
                                        !loading && (
                                            <Image
                                                height={imageWidth}
                                                alt="example"
                                                src={pokemon.sprites.other.dream_world.front_default}
                                            />
                                        )
                                    }
                                </>
                            }
                            actions={[
                                <CheckOutlined key="accept" />,
                            ]}
                        >
                            <Meta
                                title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                description={'Base experience: ' + pokemon.base_experience}
                            />
                        </Card>
                    )
                }
            </>
        )
    }
}

const decoratedComponent = connectDecorator(PokemonCard)
export {decoratedComponent as PokemonCard};