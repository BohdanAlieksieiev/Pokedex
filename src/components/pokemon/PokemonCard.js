import React, {Component} from 'react';

import { Card, Image } from 'antd';
import { CheckOutlined, StarOutlined, StarTwoTone } from '@ant-design/icons';
import {getPokemon, removeFavoritePokemon, setFavoritePokemon} from "../../services/actions/pokemons";
import PokemonCardLoading from "./PokemonCardLoading";

import { connect } from 'react-redux';
import Loading from "../UI/Loading";

const { Meta } = Card;
const connectDecorator = connect(
    (state) => ({
        favorite: state.favorite,
    }),
    { getPokemon, setFavoritePokemon, removeFavoritePokemon }
);

class PokemonCard extends Component{
    state = {
        pokemon: null,
        styleWidth: 300,
        imageWidth: 300,
        loading: true,
        sprites: null,

        timeOut: 1000,
    }

    componentDidMount() {
        this.getPokemon()
    }

    getPokemon = async () => {
        const { timeOut } = this.state
        const { pokemon: {name} } = this.props

        const res = await this.props.getPokemon(name)
        if(res){
            await this.setState({ pokemon: res })
            await this.setImage()
            this.setState({ loading: false })
        }else{
            setTimeout(() => {
                this.getPokemon()
            }, timeOut)
        }
    }

    setImage = () => {
        const { pokemon } = this.state
        if(pokemon) {
            const { sprites } = pokemon
            let existImage = null
            if(sprites.other.dream_world.front_default) existImage = sprites.other.dream_world.front_default
            else if(sprites.front_default) existImage = sprites.front_default
            else if(sprites.front_shiny) existImage = sprites.front_shiny
            else existImage = "https://memegenerator.net/img/instances/11208557.jpg"

            this.setState({ sprites: existImage })
        }
    }

    goToPageInPokemon = () => {
        const { pokemon, history } = this.props
        history.push('/Pokedex/pokemon/' + pokemon.name)
    }

    addToFavorite = () => {
        const { pokemon: {name}, setFavoritePokemon, removeFavoritePokemon } = this.props
        if(localStorage.getItem('favorite') === name) {
            removeFavoritePokemon(name)
        }else{
            //console.log({"setFavoritePokemon": name});
            setFavoritePokemon(name)
        }
    }

    render(){
        const { loading, pokemon, styleWidth, imageWidth, sprites } = this.state
        const { pokemon: {name} } = this.props
        const favorite = this.props.favorite
        let pokemonAction = []
        if(favorite === name) {
            pokemonAction.push(<StarTwoTone twoToneColor="#52c41a" key="favorite" onClick={this.addToFavorite}/>)
        }else{
            pokemonAction.push(<StarOutlined key="favorite" onClick={this.addToFavorite}/>)
        }
        pokemonAction.push(<CheckOutlined key="accept" onClick={this.goToPageInPokemon}/>)

        return (

            <>
                {
                    loading && (
                        <PokemonCardLoading/>
                    )
                }
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
                                                src={sprites}
                                            />
                                        )
                                    }
                                </>
                            }
                            actions={pokemonAction}
                        >
                            {
                                !loading && (
                                    <Meta
                                        title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                        // description={'Base experience: ' + pokemon.base_experience}
                                    />
                                )
                            }

                        </Card>
                    )
                }
            </>
        )
    }
}

const decoratedComponent = connectDecorator(PokemonCard)
export {decoratedComponent as PokemonCard};