import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import DateTimePicker from '@mapstore/components/misc/datetimepicker/index';
import Message from '@mapstore/components/I18N/Message';

class SearchHistory extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        endDateValue: PropTypes.any,
        startDateValue: PropTypes.any,
        startDateValueOnChange: PropTypes.func,
        endDateValueOnChange: PropTypes.func
    };

    static defaultProps = {
        active: false
    };

    render() {
        return this.props.active && (
            <div style={{
                marginBottom: 10
            }}>
                <Row>
                    <Col xs={1}>
                        <Message msgId="extension.catastoOpenPanel.temporalSearch.startDateLabel"/>
                    </Col>
                    <Col xs={5}>
                        <DateTimePicker
                            format="DD/MM/YYYY"
                            time={false}
                            value={this.props.startDateValue}
                            placeholder="01/01/0001"
                            onChange={this.props.startDateValueOnChange}
                        />
                    </Col>
                    <Col xs={1}>
                        <Message msgId="extension.catastoOpenPanel.temporalSearch.endDateLabel"/>
                    </Col>
                    <Col xs={5}>
                        <DateTimePicker
                            format="DD/MM/YYYY"
                            time={false}
                            value={this.props.endDateValue}
                            placeholder={new Date().toLocaleDateString("en-GB")}
                            onChange={this.props.endDateValueOnChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchHistory;
