import React, {Component} from 'react';
import { Spin } from 'antd';

export default class Loading extends Component{

    render() {
        return (
            <>
                <div className="center-on-the-page">
                    <Spin
                        tip="Loading..."
                        size="large"/>
                </div>
            </>
        )
    }
}
