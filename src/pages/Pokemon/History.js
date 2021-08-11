import React, {Component} from 'react';
import { Row, Col  } from 'antd';

import { PokemonCard } from "../../components/pokemon/PokemonCard";
import Loading from "../../components/UI/Loading";
import { getPokemons } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import PokemonDoesNotExist from "../../components/pokemon/PokemonDoesNotExist";

const connectDecorator = connect(
    (state) => ({
        historyPokemon: state.historyPokemon,
    }),
    { getPokemons}
);

class History extends Component{
    state = {
        loading: true,
        pokemons: [],
    }

    componentDidMount() {
        this.getPokemonFromHistory()
    }

    getPokemonFromHistory = () => {
        const { historyPokemon } = this.props
        if(historyPokemon) {
            historyPokemon.forEach(( item ) => {
                let arrPokemons = this.state.pokemons
                let newObjPokemon = {
                    name: item
                }
                arrPokemons.push(newObjPokemon)
                this.setState({ pokemons: arrPokemons})
            })
        }
        this.setState({ loading: false })
    }


    render() {
        const { loading, pokemons } = this.state
        return (
            <>
                {
                    loading && ( <Loading/> )
                }
                
                {
                    !loading && (
                        <>
                            {
                                pokemons.length <= 0 && (
                                    <>
                                        <PokemonDoesNotExist/>
                                    </>
                                )
                            }

                            <Row
                                justify="space-around"
                                gutter={[8, 40]}
                                style={{ marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 10 }}

                            >
                                {
                                    pokemons.map(( pokemon, index ) => {
                                        return (
                                            <Col key={index}>
                                                <PokemonCard
                                                    pokemon={pokemon}
                                                    history={this.props.history}
                                                />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </>
                    )
                }
            </>
            )
        }
}

const decoratedComponent = connectDecorator(History)
export {decoratedComponent as History};