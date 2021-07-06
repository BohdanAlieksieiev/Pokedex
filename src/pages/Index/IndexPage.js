import React, {Component} from 'react';
import { Row, Col  } from 'antd';

import PaginationComponent from "../../components/UI/PaginationComponent";
import { PokemonCard } from "../../components/pokemon/PokemonCard";
import Loading from "../../components/UI/Loading";
import { getPokemons } from "../../services/actions/pokemons";
import { connect } from 'react-redux';
import FilterPokemon from "../../components/pokemon/Filter";
const connectDecorator = connect(
    null,
    { getPokemons }
);

class IndexPage extends Component{
    state = {
        loading: true,
        pokemons: null,
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

        await this.getPokemonsInPage()


        //console.log(this.props.location.query);
        // this.props.history.push({
        //     pathname: '/',
        //     state: {
        //         page:  '1',
        //         limit: '10'
        //     }
        // })
        // console.log(this.props.history.location.state);

    }

    getPokemonsInPage = async () => {
        this.setState({ loading: true })
        const res = await this.props.getPokemons(this.state.pagination)
        this.setState({
            itemsCount: res.count
        })
        console.log(this.state.pagination)
        this.setState({ pokemons: res.results })
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
        // console.log(this.state.pagination)
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

        // this.props.history.push({
        //     pathname: '/',
        //     search: '?color=blue'
        // })


        this.getPokemonsInPage()
    }

    getQuery = (nameQuery) => {
        const search = this.props.location.search;
        const name = new URLSearchParams(search).get(nameQuery);
        return name
    }

    setPokemonFilter = (dataFilter) => {

    }

    render() {
        const { loading, pagination, pokemons, itemsCount } = this.state
        return (
            <>
                <FilterPokemon
                    setPokemonFilter={this.setPokemonFilter}
                />

                {
                    loading && ( <Loading/> )
                }

                {
                    !loading && (
                        <>
                            <Row justify="space-around"  gutter={[8, 40]}>
                                {
                                    pokemons.map(( pokemon, index ) => {
                                        return (
                                            <Col key={index}>
                                                <PokemonCard pokemon={pokemon} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>

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
}

const decoratedComponent = connectDecorator(IndexPage)
export {decoratedComponent as IndexPage};