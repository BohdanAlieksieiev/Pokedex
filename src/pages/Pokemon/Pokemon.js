import React, {Component} from 'react';
import { getPokemonByName, addPokemonToHistory } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import Loading from "../../components/UI/Loading";
import PokemonImageCarousel from "../../components/pokemon/PokemonImageCarousel";
import { PokemonStats } from "../../components/pokemon/PokemonStats";
import { MainInfo } from "../../components/pokemon/MainInfo";

const connectDecorator = connect(
    null,
    { getPokemonByName, addPokemonToHistory }
);

class Pokemon extends Component{
    state = {
        loading: true,
        pokemon: null,
        spritesArr: [],
    }

    componentDidMount() {
        this.getPokemon()
    }

    getPokemon = async () => {
        const res = await this.props.getPokemonByName(this.props.match.params.name)
        if(res.name === "Error") {
            this.props.history.push('/')
        }else{
            await this.setState({ pokemon: res })
            await this.getAllImage()
            this.props.addPokemonToHistory(this.props.match.params.name)
            this.setState({ loading: false })
        }
    }

    getAllImage = () => {
        const { pokemon: { sprites }, spritesArr } = this.state

        Object.keys(sprites).forEach(( spriteUrl ) => {
            if(spriteUrl) {
                if( spriteUrl !== "versions" && spriteUrl !== 'other' && sprites[spriteUrl] ){
                    let newPokemon = spritesArr
                    newPokemon.push(sprites[spriteUrl])
                    this.setState({ spritesArr: newPokemon})
                }
            }
        })
    }


    render() {
        const { loading, spritesArr, pokemon } = this.state
        const { history } = this.props
        return (
            <>
                <div className="site-layout-content">
                    {
                        loading && (
                            <Loading/>
                        )
                    }
                    {
                        !loading && (
                            <>
                                <div className='pokemon-container-carousel-stats'>
                                    <PokemonImageCarousel
                                        spritesArr={spritesArr}
                                    />

                                    <PokemonStats
                                        pokemon={pokemon}
                                    />
                                </div>

                                <MainInfo
                                    history={history}
                                    pokemon={pokemon}
                                />
                            </>
                        )
                    }

                </div>
            </>
        )
    }
}

const decoratedComponent = connectDecorator(Pokemon)
export {decoratedComponent as Pokemon};