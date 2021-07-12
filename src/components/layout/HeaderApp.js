import React, {Component} from 'react';
import { Layout } from 'antd';
import randomPokemon from "../../common/images/randomPokemon.png"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
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
        const { favorite } = this.props
        window.location.href = "/Pokedex/pokemon/" + favorite
    }

    randomPokemon = async () => {
        const { count } = this.props
        const randomId = Math.floor( Math.random() * count)
        const randomPokemon = await this.props.getPokemonById(randomId)
        window.location.href = "/Pokedex/pokemon/" + randomPokemon.name
    }

    render(){
        const { favorite } = this.props

        return (
            <>
                <Header>
                    <div className="logo">
                        <Link
                            to="/Pokedex/"
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
                                        <p onClick={this.redirectOnFavorite}>{favorite}</p>
                                        <p className="margin-left-delete" onClick={this.removeFavorite}><DeleteTwoTone twoToneColor="red" /></p>
                                    </div>
                                </>
                            )
                        }

                        <div >
                            <Link to="/Pokedex/history">
                                <HistoryOutlined
                                    className="history-image"
                                />
                            </Link>

                            <img
                                onClick={this.randomPokemon}
                                className="logo-img-random"
                                src={randomPokemon}
                                alt="random pokemon"/>
                        </div>

                    </div>
                </Header>
            </>
        )
    }
}

const decoratedComponent = connectDecorator(HeaderApp)
export {decoratedComponent as HeaderApp};