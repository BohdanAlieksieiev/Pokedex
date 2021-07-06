import React, {Component} from 'react';
import { Layout, Affix } from 'antd';

import { IndexPage }  from '../pages/Index/IndexPage'
import HeaderApp from '../components/layout/HeaderApp'

import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
const { Content } = Layout;


export default class RouterJS extends Component {


    render(){

    return (
            <BrowserRouter>
                <Layout className="layout">
                    <Affix offsetTop={0}>
                        <HeaderApp/>
                    </Affix>
                    <Content className="min-height-100vh">
                        <Switch>
                            <Route path="/?page=:page&limit=:limit"  component={IndexPage}/>
                            <Route path="/page=:page"  component={IndexPage}/>
                            <Route path="/"  component={IndexPage}/>
                        </Switch>
                    </Content>
                    {/* <Footer></Footer> */}
                </Layout>
            </BrowserRouter>
    )}
}

