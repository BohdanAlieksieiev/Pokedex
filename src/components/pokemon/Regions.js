import React, {Component} from 'react';

import { getRegions } from "../../services/actions/pokemons";
import { Select, } from 'antd';
import { connect } from 'react-redux';

const { Option } = Select;
const connectDecorator = connect(
    null,
    { getRegions }
);

class Regions extends Component{
    state = {
        regions: null,
        loading: true
    }

    componentDidMount() {
        this.loadingRegion()
    }

    loadingRegion = async () => {
        const res = await this.props.getRegions()
        this.setState({ regions: res.results })
        this.setState({ loading: false })
        this.props.loadingFinished()
    }

    render(){
        const { loading, regions } = this.state
        return (
            <>
                {
                    !loading && (
                        <>
                            <Select
                                mode="multiple"
                                placeholder="Please select region"
                                style={{ width: '100%', marginBottom: '20px' }}>
                                {
                                    regions && (
                                        regions.map((value, index)=> {
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

const decoratedComponent = connectDecorator( Regions )
export { decoratedComponent as Regions };