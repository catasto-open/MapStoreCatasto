import React from "react";
import PropTypes from 'prop-types';
import Message from '@mapstore/components/I18N/Message';
import { Form, FormControl, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import Button from "@mapstore/components/misc/Button";
import DateTimePicker from '@mapstore/components/misc/datetimepicker/index';

class SearchForm extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        value: PropTypes.object,
        control: PropTypes.func,
        controls: PropTypes.array,
        buttonTxt: PropTypes.string,
        activeButton: PropTypes.bool,
        onSubmitForm: PropTypes.func,
        loadTown: PropTypes.func,
        towns: PropTypes.array,
        isLoadingTown: PropTypes.bool
    };

    static defaultProps = {
        active: false,
        activeButton: false,
        isLoadingTown: false,
        value: null
    };

    renderSwitch = (c) => {
        switch (c.id) {
        case "FIRST-NAME":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("firstName", e.target.value)}
                value={this.props.value?.firstName}
            />);
        case "LAST-NAME":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("lastName", e.target.value)}
                value={this.props.value?.lastName}
            />);
        case "BIRTH-DATE":
            return (<DateTimePicker
                format="DD/MM/YYYY"
                time={false}
                placeholder="DD/MM/YYYY"
                onChange={(value) => this.props.control("birthDate", value)}
                value={this.props.value?.birthDate}
            />);
        case "BIRTH-PLACE":
            return (<Select
                clearable
                searchable
                options={this.props.towns}
                onInputChange={this.props.loadTown}
                onChange={(value) => this.props.control("birthPlace", value)}
                isLoading={this.props.isLoadingTown}
                value={this.props.value?.birthPlace}
            >
            </Select>);
        case "FISCAL-CODE":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("fiscalCode", e.target.value)}
                value={this.props.value?.fiscalCode}
            />);
        case "SUBJECT-CODE":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("subjectCode", e.target.value)}
                value={this.props.value?.subjectCode}
            />);
        case "VAT-NUMBER":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("vatNumber", e.target.value)}
                value={this.props.value?.vatNumber}
            />);
        case "BUSINESS-NAME":
            return (<FormControl
                type="text"
                onChange={e => this.props.control("businessName", e.target.value)}
                value={this.props.value?.businessName}
            />);
        case "IDENTIFICATION-CODE":
            return (<FormControl
                type="number"
                onChange={e => this.props.control("identificationCode",e.target.value)}
                value={this.props.value?.identificationCode}
            />);
        default:
            return null;
        }
    };

    renderSearchFormControls = () => {
        return this.props.controls.map((c) =>
            <div key={c.name}>
                <Row className="inline-form filter-field-fixed-row">
                    <Col xs={6}>
                        <Message msgId={c.name}/>
                    </Col>
                    <Col xs={6}>
                        <Form
                            onSubmit={(e)=>{
                                e.preventDefault();
                                return this.props.activeButton ? this.props.onSubmitForm() : null;
                            }}>
                            {this.renderSwitch(c)}
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        if (this.props.active) {
            return (
                <div>
                    {this.renderSearchFormControls()}
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
                    </Row>
                </div>
            );
        }
        return null;
    }
}

export default SearchForm;
