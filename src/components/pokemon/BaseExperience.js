import React, {Component} from 'react';

import { Slider , } from 'antd';

export default class BaseExperience extends Component{
    state = {
        baseExperience: [0, 500],
    }

    componentDidMount() {
    }


    render(){
        const { baseExperience } = this.state
        return (
            <>
                <h4>Base experience</h4>
                <Slider
                    range={{ draggableTrack: true }}
                    defaultValue={baseExperience}
                    max={baseExperience[1]}
                />
            </>
        )
    }
}
