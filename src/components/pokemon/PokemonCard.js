import React, {Component} from 'react';

import { Card, Image, Tooltip } from 'antd';
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
        styleWidth: 320,
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
        history.push('/pokemon/' + pokemon.name)
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
            pokemonAction.push(
                <>
                    <Tooltip onClick={this.addToFavorite} placement="bottom" title="This Pokemon is already found in the favorites, when pressed, the Pokemon is removed from the favorites">
                        <span className="span-margin">Remove from favorite</span>
                        <StarTwoTone twoToneColor="#52c41a" key="favorite" />
                    </Tooltip>
                </>
            )
        }else{
            pokemonAction.push(
                <>
                    <Tooltip onClick={this.addToFavorite} placement="bottom" title="Add this Pokemon to your favorites. Favorite Pokemon will be displayed at the top of the navigation bar, and your favorite Pokemon will be compared on the chart with other Pokemon">
                        <span className="span-margin">Add to favorite</span>
                        <StarOutlined key="favorite" />
                    </Tooltip>
                </>
            )
        }
        pokemonAction.push(
            <>
                <Tooltip placement="bottom" title="Go to the Pokemon page for more details" onClick={this.goToPageInPokemon}>
                    <span className="span-margin">Show pokemon</span>
                    <CheckOutlined key="accept" />
                </Tooltip>
            </>
        )

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