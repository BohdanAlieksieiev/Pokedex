import React, {Component} from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

export default class PokemonCardLoading extends Component {
    state = {
        loading: true,
    };

    onChange = checked => {
        this.setState({ loading: !checked });
    };

    render() {
        const { loading } = this.state;

        return (
            <>
                {/*<Switch checked={!loading} onChange={this.onChange} />*/}

                <Card style={{ width: 300, marginTop: 16 }} loading={loading}>
                    <Meta
                        avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </>
        );
    }
}