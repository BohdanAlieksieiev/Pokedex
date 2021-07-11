import React, {Component} from 'react';

import { getTypes } from "../../services/actions/pokemons";
import { Select, } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;
const connectDecorator = connect(
    null,
    { getTypes }
);

class Types extends Component{
    state = {
        types: null,
        loading: true
    }

    componentDidMount() {
        this.loadingType()
    }

    loadingType = async () => {
        const res = await this.props.getTypes()
        this.setState({ types: res.results })
        this.setState({ loading: false })
    }

    render(){
        const { loading, types } = this.state
        return (
            <>
                {
                    !loading && (
                        <>
                            <Select
                                mode="multiple"
                                placeholder="Please select type"
                                style={{ width: '100%', marginBottom: '20px' }}>
                                {
                                    types && (
                                        types.map((value, index)=> {
                                            return <Option value={value.name} key={index}>{value.name.charAt(0).toUpperCase() + value.name.slice(1)}</Option>
                                        })
                                    )
                                }
                            </Select>
                        </>
                    )
                }
            </>
        )
    }
}

const decoratedComponent = connectDecorator( Types )
export { decoratedComponent as Types };