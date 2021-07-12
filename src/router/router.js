import React, {Component} from 'react';
import { Layout, Affix } from 'antd';

import { IndexPage }  from '../pages/Index/IndexPage'
import { Pokemon } from "../pages/Pokemon/Pokemon";
import { HeaderApp } from '../components/layout/HeaderApp'
import { History } from "../pages/Pokemon/History";
import NotFound from "../pages/resultPage/NotFound";

import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
const { Content } = Layout;


export default class RouterJS extends Component {
    state = {

    }

    render(){
        return (
            <BrowserRouter>
                <Layout className="layout">
                    <Affix offsetTop={0}>
                        <HeaderApp history={this.props.history}/>
                    </Affix>
                    <Content className="min-height-100vh">
                        <Switch>
                            <Route path="/Pokedex/?page=:page&limit=:limit"  component={IndexPage}/>
                            <Route path="/Pokedex/pokemon/:name"  component={Pokemon}/>
                            <Route path="/Pokedex/history"  component={History}/>
                            <Route path="/Pokedex/page=:page"  component={IndexPage}/>
                            <Route path="/Pokedex/"  component={IndexPage}/>
                            <Route  component={NotFound}/>
                        </Switch>
                    </Content>
                    {/* <Footer></Footer> */}
                </Layout>
            </BrowserRouter>
        )}
    }

