import React from 'react';
import PropTypes from 'prop-types';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import { Glyphicon } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";

const Button = tooltip(ButtonB);

class Toolbar extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        onToggleFilter: PropTypes.func,
        enableFilter: PropTypes.bool,
        numberOfRows: PropTypes.number,
        filterRowsButtonText: PropTypes.string,
        children: PropTypes.any,
        resumeButtonActive: PropTypes.bool,
        onResumeButton: PropTypes.func,
        resumeButtonTooltipId: PropTypes.string,
        showPrintBtn: PropTypes.bool,
        printTipId: PropTypes.string,
        printPath: PropTypes.string
    };

    static defaultProps = {
        title: "",
        enableAddRow: true,
        resumeButtonActive: false,
        showPrintBtn: false
    };

    renderToggleFilterButton = () => {
        if (this.props.enableFilter) {
            return (
                <Button
                    tooltipId={"extension.catastoOpenPanel.toggleSearchFilterTooltip"}
                    tooltipPosition={"top"}
                    onClick={this.props.onToggleFilter}
                >
                    <Glyphicon glyph={"filter"}/>
                </Button>);
        }
        return null;
    };

    renderResumeButton = () => {
        if (this.props.resumeButtonActive) {
            return (
                <Button
                    tooltipId={this.props.resumeButtonTooltipId}
                    tooltipPosition={"top"}
                    onClick={this.props.onResumeButton}
                >
                    <Glyphicon glyph={"arrow-left"}/>
                </Button>);
        }
        return null;
    };

    renderPrintButton = () => {
        if (this.props.showPrintBtn) {
            return (
                <Button
                    href={this.props.printPath}
                    tooltipId={this.props.printTipId}
                    tooltipPosition={"top"}
                    onClick={() => {}}
                    target="_blank"
                >
                    <Glyphicon glyph={"print"}/>
                </Button>
            );
        }
        return null;
    };

    render() {
        return (
            <div className="react-grid-Toolbar">
                <div className="tools" style={{"float": "left"}}>
                    {this.renderResumeButton()}
                    {this.renderToggleFilterButton()}
                    {this.renderPrintButton()}
                    {this.props.children}
                </div>
                <div className={"panel-title text-center"}>
                    <Message msgId={this.props.title}/>
                </div>
            </div>);
    }
}

export default Toolbar;
