import { Pagination, Row, Col } from 'antd';
import React, {Component} from "react";


export default class PaginationComponent extends Component {

    state = {
        changeSize: false
    }

    onChangePaginationSize = async (current, limit, event) => {
        await this.setState({ changeSize: true })
        this.props.setPaginationLimit(limit)
    }

    onChangePagination = (current) => {
        if(!this.state.changeSize){
            this.props.setPaginationCurrent(current)
        }else{
            this.setState({ changeSize: false })
        }
    }


    render() {
        const { page, limit } = this.props.pagination
        const { itemsCount } = this.props
        return (
            <>
                <Row justify="center" className="pagination-margin">
                    <Col>
                        <Pagination
                        defaultCurrent={page}
                        total={itemsCount}
                        onChange={this.onChangePagination}
                        defaultPageSize={limit}
                        onShowSizeChange={this.onChangePaginationSize}
                        />
                    </Col>
                </Row>
            </>
        )
    }
}