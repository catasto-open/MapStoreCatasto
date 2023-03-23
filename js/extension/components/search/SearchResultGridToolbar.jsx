import React from 'react';
import PropTypes from 'prop-types';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import { Glyphicon } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";
import ModalSearchResultGrid from '@js/extension/components/search/ModalSearchResultGrid';
import InlineSpinner from '@mapstore/components/misc/spinners/InlineSpinner/InlineSpinner';
import { compareItems } from '@js/extension/utils/catastoOpen';

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
        showPrintBtnPdf: PropTypes.bool,
        showPrintBtnCsv: PropTypes.bool,
        printTipId: PropTypes.string,
        showExtendBtn: PropTypes.bool,
        columns: PropTypes.array,
        rows: PropTypes.array,
        onClickDownloadVisura: PropTypes.func,
        isStartedDownloadVisuraCsv: PropTypes.bool,
        isStartedDownloadVisuraPdf: PropTypes.bool,
        errorDownloadMsg: PropTypes.object
    };

    static defaultProps = {
        title: "",
        enableAddRow: true,
        resumeButtonActive: false,
        showPrintBtnPdf: false,
        showPrintBtnCsv: false,
        showExtendBtn: false,
        columns: [],
        rows: [],
        isStartedDownloadVisuraCsv: false,
        isStartedDownloadVisuraPdf: false,
        errorDownloadMsg: null
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

    renderPrintButtonPDF = () => {
        if (this.props.showPrintBtnPdf) {
            return (
                <Button
                    tooltipId={this.props.printTipId}
                    tooltipPosition={"top"}
                    onClick={() => this.props.onClickDownloadVisura("pdf")}
                >
                    {this.props.isStartedDownloadVisuraPdf ? <InlineSpinner loading/> : <><Glyphicon glyph={"print"}/> pdf</>}
                </Button>
            );
        }
        return null;
    };

    renderPrintButtonCSV = () => {
        if (this.props.showPrintBtnCsv) {
            return (
                <Button
                    tooltipId={this.props.printTipId}
                    tooltipPosition={"top"}
                    onClick={() => this.props.onClickDownloadVisura("csv")}
                >
                    <Glyphicon glyph={"print"}/> csv
                </Button>
            );
        }
        return null;
    };

    renderExtendButton = () => {
        if (this.props.showExtendBtn) {
            return (
                <ModalSearchResultGrid
                    id={this.props.title}
                    columns={this.props.columns}
                    rows={this.props.rows && this.props.rows.sort(compareItems)}
                />);
        }
        return null;
    };

    render() {
        return (
            <div className="react-grid-Toolbar">
                <div className="tools" style={{"float": "left"}}>
                    {this.renderResumeButton()}
                    {this.renderToggleFilterButton()}
                    {this.renderExtendButton()}
                    {this.renderPrintButtonPDF()}
                    {this.renderPrintButtonCSV()}
                    {this.props.children}
                </div>
                <div className={"panel-title text-center"}>
                    <Message msgId={this.props.title}/>
                </div>
            </div>);
    }
}

export default Toolbar;
