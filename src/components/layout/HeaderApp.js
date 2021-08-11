import React, {Component} from 'react';
import { Layout, Tooltip } from 'antd';
import randomPokemon from "../../common/images/randomPokemon.png"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { withRouter } from "react-router";
import { removeFavoritePokemon, getPokemonById } from "../../services/actions/pokemons";
import {
    DeleteTwoTone,
    HistoryOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const connectDecorator = connect(
    (state) => ({
        favorite: state.favorite,
        count: state.count
    }),
    { removeFavoritePokemon, getPokemonById }
);


class HeaderApp extends Component{

    removeFavorite = () => {
        const { removeFavoritePokemon } = this.props
        removeFavoritePokemon()
    }

    redirectOnFavorite = () => {
        const { favorite, history } = this.props
        history.push("/pokemon/" + favorite)
        //window.location.href = "/pokemon/" + favorite
    }

    randomPokemon = async () => {
        const { count, history } = this.props
        const randomId = Math.floor( Math.random() * count)
        const randomPokemon = await this.props.getPokemonById(randomId)
        history.push("/pokemon/" + randomPokemon.name)
        //window.location.href = "/pokemon/" + randomPokemon.name
    }

    render(){
        const { favorite } = this.props

        return (
            <>
                <Header>
                    <div className="logo">
                        <Link
                            to="/"
                        >
                            <img
                                className="logo-img"
                                src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                                alt="Logo"
                                onClick={this.redirectOnMain}
                            />
                        </Link>
                        {
                            favorite && (
                                <>
                                    <div className="container-favorite-header">
                                        <Tooltip placement="bottom" title="Go to favorite pokemon">
                                            <Link to={"/pokemon/" + favorite}>{favorite}</Link>
                                        </Tooltip>
                                        <Tooltip placement="bottom" title="Delete favorite pokemon">
                                            <p className="margin-left-delete" onClick={this.removeFavorite}><DeleteTwoTone twoToneColor="red" /></p>    
                                        </Tooltip>            
                                    </div>
                                </>
                            )
                        }

                        <div >
                            <Link to="/history">
                                History
                                <HistoryOutlined
                                    className="history-image"
                                />
                            </Link>

                            <Tooltip placement="bottom" title="Random pokemon">
                                <img
                                    onClick={this.randomPokemon}
                                    className="logo-img-random"
                                    src={randomPokemon}
                                    alt="random pokemon"/>
                            </Tooltip>
                        </div>

                    </div>
                </Header>
            </>
        )
    }
}

// const decoratedComponent = connectDecorator(HeaderApp)
const decoratedComponent = withRouter(connectDecorator(HeaderApp))
export {decoratedComponent as HeaderApp};