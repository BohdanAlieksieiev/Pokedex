import React, {Component} from 'react';
import loading from '../../common/images/loading.gif'

export default class LoadingPokemon extends Component{

    render() {
        return (
            <>
                <div className="flex-center">
                    <img className="LoadingPokemonImg" src={loading} alt=""/>
                    <p>Loading ...</p>
                </div>
            </>
        )
    }
}
