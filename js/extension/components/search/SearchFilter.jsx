import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Glyphicon} from 'react-bootstrap';
import Message from '@mapstore/components/I18N/Message';
import Select from 'react-select';
import ButtonB from "@mapstore/components/misc/Button";
import tooltip from '@mapstore/components/misc/enhancers/tooltip';

const Button = tooltip(ButtonB);

class SearchFilter extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        title: PropTypes.string,
        clearable: PropTypes.bool,
        searchable: PropTypes.bool,
        isLoading: PropTypes.bool,
        placeholder: PropTypes.string,
        noResultsText: PropTypes.string,
        options: PropTypes.array,
        onChange: PropTypes.func,
        onInputChange: PropTypes.func,
        value: PropTypes.object,
        zoomActive: PropTypes.bool,
        detailActive: PropTypes.bool,
        selectStyle: PropTypes.object,
        buttonStyle: PropTypes.object,
        zoomTooltip: PropTypes.string,
        detailTooltip: PropTypes.string,
        onZoom: PropTypes.func,
        onDetailClick: PropTypes.func,
        showNoResult: PropTypes.bool,
        isDisabled: PropTypes.bool
    };

    static defaultProps = {
        active: false,
        clearable: false,
        searchable: true,
        isLoading: false,
        zoomActive: false,
        detailActive: false,
        onChange: () => {},
        onZoom: () => {},
        showNoResult: false,
        isDisabled: false
    };

    render() {
        if (this.props.active) {
            return (
                <div>
                    <Row className="inline-form filter-field-fixed-row">
                        <Col xs={6}>
                            <Message msgId={this.props.title}/>
                        </Col>
                        <Col xs={this.props.zoomActive ? 3 : 6}>
                            {this.props.isDisabled ?
                                <Select
                                    value={this.props.options[0]}
                                    disabled />
                                :
                                this.props.showNoResult ?
                                    <Select
                                        style={this.props.selectStyle}
                                        clearable={this.props.clearable}
                                        searchable={this.props.searchable}
                                        isLoading={this.props.isLoading}
                                        placeholder={<Message msgId={this.props.placeholder}/>}
                                        noResultsText={<Message msgId={this.props.noResultsText}/>}
                                        options={this.props.options}
                                        onInputChange={this.props.onInputChange}
                                        onChange={this.props.onChange}
                                        value={this.props.value}>
                                    </Select> :
                                    this.props.options?.length > 0 || this.props.isLoading ?
                                        <Select
                                            style={this.props.selectStyle}
                                            clearable={this.props.clearable}
                                            searchable={this.props.searchable}
                                            isLoading={this.props.isLoading}
                                            placeholder={<Message msgId={this.props.placeholder}/>}
                                            noResultsText={<Message msgId={this.props.noResultsText}/>}
                                            options={this.props.options}
                                            onInputChange={this.props.onInputChange}
                                            onChange={this.props.onChange}
                                            value={this.props.value}>
                                        </Select> : <Message msgId={this.props.noResultsText}/>
                            }
                        </Col>
                        {this.props.zoomActive ?
                            <Col xs={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button
                                    style={this.props.buttonStyle}
                                    tooltipPosition={"bottom"}
                                    tooltipId={this.props.zoomTooltip}
                                    onClick={this.props.onZoom}>
                                    <Glyphicon glyph={"zoom-to"}/>
                                </Button>
                                {this.props.detailActive ?
                                    (<Button
                                        style={this.props.buttonStyle}
                                        tooltipPosition={"bottom"}
                                        tooltipId={this.props.detailTooltip}
                                        onClick={this.props.onDetailClick}
                                    >
                                        <Glyphicon glyph={"info-sign"}/>
                                    </Button>) : null}
                            </Col> : null}
                    </Row>
                </div>
            );
        }
        return null;
    }
}


export default SearchFilter;
