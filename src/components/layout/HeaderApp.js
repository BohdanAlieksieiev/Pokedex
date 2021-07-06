import React, {Component} from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default class HeaderApp extends Component{
    render(){
        return (
            <>
                <Header>
                    <div className="logo" >
                        <img src="../../common/images/logo.png" alt="Logo"/>
                    </div>
                </Header>
            </>
        )
    }
}