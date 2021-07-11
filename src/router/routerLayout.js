import React, {Component} from 'react';
import { Layout, Affix } from 'antd';

import { IndexPage }  from '../pages/Index/IndexPage'
import {Pokemon} from "../pages/Pokemon/Pokemon";
import {HeaderApp} from "../components/layout/HeaderApp";
import NotFound from "../pages/resultPage/NotFound";

import {
    Switch,
    Route,
} from "react-router-dom";
const { Content } = Layout;


export default class RouterLayout extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render(){
        return (
            <Layout className="layout">
                <Affix offsetTop={0}>
                    {/*<NewHeaderApp/>*/}
                    <HeaderApp history={this.props.history}/>
                </Affix>
                <Content className="min-height-100vh">
                    <Switch>
                        {/*<Route path="/?page=:page&limit=:limit"  component={IndexPage}/>*/}
                        <Route path="/pokemon/:name"  component={Pokemon}/>
                        <Route path="/page=:page"  component={IndexPage}/>
                        <Route path="/"  component={IndexPage}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Content>
                {/* <Footer></Footer> */}
            </Layout>
        )}
}

