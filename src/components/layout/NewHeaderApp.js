import React, {Component} from 'react';
import { Layout, Menu } from 'antd';
import randomPokemon from "../../common/images/randomPokemon.png"
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import { removeFavoritePokemon, getPokemonById } from "../../services/actions/pokemons";
import { DeleteTwoTone } from '@ant-design/icons';

const { Header } = Layout;
const connectDecorator = connect(
    (state) => ({
        favorite: state.favorite,
        count: state.count
    }),
    { removeFavoritePokemon, getPokemonById }
);


class NewHeaderApp extends Component{

    removeFavorite = () => {
        const { removeFavoritePokemon } = this.props
        removeFavoritePokemon()
    }

    redirectOnFavorite = () => {
        const { favorite } = this.props
        window.location.href = "/pokemon/" + favorite
    }

    randomPokemon = async () => {
        const { count } = this.props
        const randomId = Math.floor( Math.random() * count)
        const randomPokemon = await this.props.getPokemonById(randomId)
        window.location.href = "/pokemon/" + randomPokemon.name
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
                    </div>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="favorite">
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
                        </Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>


                    <div onClick={this.randomPokemon}>
                        <img
                            className="logo-img-random"
                            src={randomPokemon}
                            alt="random pokemon"/>
                    </div>
                </Header>
            </>
        )
    }
}

const decoratedComponent = connectDecorator(NewHeaderApp)
export {decoratedComponent as NewHeaderApp};