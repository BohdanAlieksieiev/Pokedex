import React, {Component} from 'react';
import { Row, Col  } from 'antd';

import PaginationComponent from "../../components/UI/PaginationComponent";
import { PokemonCard } from "../../components/pokemon/PokemonCard";
import Loading from "../../components/UI/Loading";
import { getPokemons, getAllPokemons, setCountPokemonInStore } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import { FilterPokemon } from "../../components/pokemon/Filter";
import PokemonDoesNotExist from "../../components/pokemon/PokemonDoesNotExist";
import * as PageHelper from "../../common/helpers/PageHelper"


const connectDecorator = connect(
    null,
    { getPokemons, getAllPokemons, setCountPokemonInStore }
);

class IndexPage extends Component{
    state = {
        loading: true,
        pokemons: null,
        allPokemons: null,
        staticAllPokemons: null,
        itemsCount: 0,

        pagination: {
            page: 0,
            limit: 20,
        }
    }

    async componentDidMount() {
        this.setState({
            pagination: {
                page: await this.getQuery('page') ? await this.getQuery('page') : 0,
                limit: await this.getQuery('limit') ? await this.getQuery('limit') : 20
            }
        })
        await this.getAllPokemons()
        await this.getPokemonsInPage()
    }


    getAllPokemons = async () => {
        if(!this.state.allPokemons){
            const res = await this.props.getAllPokemons()
            this.setState({ allPokemons: res.results })
            this.setState({ staticAllPokemons: res.results })
            this.setState({ itemsCount: this.state.allPokemons.length })
        }
        await this.props.setCountPokemonInStore(this.state.staticAllPokemons.length)
    }

    getPokemonsInPage = async () => {
        this.setState({ loading: true })
        await this.setState({
            pokemons: PageHelper.getItemInPage(this.state.allPokemons, this.state.pagination.limit, this.state.pagination.page)
        })

        this.setState({ loading: false })
    }

    setPaginationLimit = (newLimit) => {
        const { page } = this.state.pagination
        let newPath = '/?page=' + page + '&limit=' + newLimit
        this.setState({ pagination: {
                ...this.state.pagination,
                limit: newLimit
        }})
        this.props.history.push(newPath)
        this.getPokemonsInPage()
    }

    setPaginationCurrent = (newCurrent) => {
        const { limit } = this.state.pagination
        let newPath = '/?page=' + newCurrent
        newPath += (limit) ? ('&limit=' + limit) : ''
        this.setState({ pagination: {
                ...this.state.pagination,
                page: newCurrent,
        }})
        this.props.history.push(newPath)

        this.getPokemonsInPage()
    }

    getQuery = (nameQuery) => {
        const search = this.props.location.search;
        return new URLSearchParams(search).get(nameQuery);
    }

    resetFilter = () => {
        const { staticAllPokemons } = this.state
        this.setState({ allPokemons: staticAllPokemons })
        this.setPaginationCurrent(1)
    }

    setAllPokemons = ( pokemons ) => {
        this.setState({ allPokemons: pokemons })
        this.setState({ itemsCount: pokemons.length })
        this.getPokemonsInPage()
    }

    setPokemonFilter = async (dataFilter) => {
        const { staticAllPokemons } = this.state
        this.setPaginationCurrent(1)
        if(dataFilter.tags) { /// Спочатку по тегах
            if(dataFilter.tags.length > 0) {
                const filterByFewTags = await PageHelper.filterByFewTags(staticAllPokemons, dataFilter.tags)
                this.setAllPokemons(filterByFewTags)
            }else{
                await this.setAllPokemons(this.state.staticAllPokemons)
            }
        }else{
            await this.setAllPokemons(this.state.staticAllPokemons)
        }

        if(dataFilter.name){
            const filterByName = await PageHelper.filterByName(this.state.allPokemons, dataFilter.name)
            this.setAllPokemons(filterByName)
        }
    }

    render() {
        const { loading, pagination, pokemons, itemsCount } = this.state
        return (
            <>
                <FilterPokemon
                    setPokemonFilter={this.setPokemonFilter}
                    resetFilter={this.resetFilter}
                />

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
                                style={{ marginLeft: 0, marginRight: 0 }}

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

                            {
                                pokemons.length > 0 && (
                                    <>
                                        <PaginationComponent
                                            pagination={pagination}
                                            itemsCount={itemsCount}
                                            setPaginationLimit={this.setPaginationLimit}
                                            setPaginationCurrent={this.setPaginationCurrent}
                                        />
                                    </>
                                )
                            }

                        </>
                    )
                }
            </>
            )
        }
}

const decoratedComponent = connectDecorator(IndexPage)
export {decoratedComponent as IndexPage};