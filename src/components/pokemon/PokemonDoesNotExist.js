import React, {Component} from 'react';
import { FrownTwoTone } from '@ant-design/icons';

export default class PokemonDoesNotExist extends Component{
    render() {
        return (
            <>
                <h2 className="flex-center">
                    <span>Pokemon does not exist</span>
                    <FrownTwoTone twoToneColor="#eb2f96" className="margin-left-not-exist" />
                </h2>
            </>
        )
    }
}
