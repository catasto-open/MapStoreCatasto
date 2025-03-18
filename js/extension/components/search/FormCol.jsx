import React from "react";
import PropTypes from 'prop-types';
import {Form, FormControl, Row, Col, Button} from 'react-bootstrap';
import Select from 'react-select';
import Message from '@mapstore/components/I18N/Message';

class FormCol extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        style: PropTypes.object,
        title: PropTypes.string,
        isSelect: PropTypes.bool,
        isLoading: PropTypes.bool,
        placeholder: PropTypes.string,
        options: PropTypes.array,
        onInputChange: PropTypes.func,
        onSelect: PropTypes.func,
        value: PropTypes.object,
        valueNotObj: PropTypes.string,
        onFormChange: PropTypes.func,
        typeInput: PropTypes.string,
        showSearchButton: PropTypes.bool,
        activeButton: PropTypes.bool,
        onSubmitForm: PropTypes.func,
        buttonTxt: PropTypes.string
    };

    static defaultProps = {
        active: false,
        isSelect: false,
        isLoading: false,
        options: [],
        value: {},
        onInputChange: () => {},
        typeInput: "text",
        showSearchButton: false,
        activeButton: false,
        valueNotObj: ""
    }
    render() {
        return this.props.active && (
            <div>
                <Row className="inline-form filter-field-fixed-row">
                    <Col xs={6}>
                        <Message msgId={this.props.title}/>
                    </Col>
                    <Col xs={6}>
                        {this.props.isSelect ?
                            <Select
                                style={this.props.style}
                                clearable
                                searchable
                                isLoading={this.props.isLoading}
                                placeholder={<Message msgId={this.props.placeholder}/>}
                                options={this.props.options}
                                onInputChange={this.props.onInputChange}
                                onChange={this.props.onSelect}
                                value={this.props.value}>
                            </Select> :
                            <Form>
                                <FormControl
                                    type={this.props.typeInput}
                                    onChange={(e) => this.props.onFormChange(e.target.value)}
                                    value={this.props.valueNotObj}
                                />
                            </Form>
                        }
                    </Col>
                </Row>
                {this.props.showSearchButton &&
                    <Row className="inline-form filter-field-fixed-row">
                        <Col xs={8}/>
                        <Col xs={8}/>
                        <Col md={2}>
                            <Button
                                size={"lg"}
                                className={"search-button btn btn-primary"}
                                bs={"primary"}
                                disabled={!this.props.activeButton}
                                onClick={this.props.onSubmitForm}>
                                <Message msgId={this.props.buttonTxt}/>
                            </Button>
                        </Col>
                    </Row>}
            </div>);
    }
}

export default FormCol;
