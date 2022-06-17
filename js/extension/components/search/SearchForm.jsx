import React from "react";
import PropTypes from 'prop-types';
import Message from '@mapstore/components/I18N/Message';
import { Form, FormControl, Row, Col} from 'react-bootstrap';
import Button from "@mapstore/components/misc/Button";

class SearchForm extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        controls: PropTypes.array,
        buttonTxt: PropTypes.string,
        value: PropTypes.object,
        onChange: PropTypes.func,
        activeButton: PropTypes.bool,
        onSubmitForm: PropTypes.func
    };

    static defaultProps = {
        active: false,
        controls: [],
        activeButton: false,
        onSubmitForm: () => {}
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
                            <FormControl
                                type="text"
                                onChange={e => c.onChange(e.target.value)}
                            />
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
