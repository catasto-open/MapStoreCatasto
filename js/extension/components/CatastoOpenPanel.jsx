import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ContainerDimensions from 'react-container-dimensions';
import Message from '@mapstore/components/I18N/Message';
import DockPanel from '@mapstore/components/misc/panels/DockPanel';
import { createStructuredSelector } from 'reselect';
import { Alert, Glyphicon, Tooltip} from 'react-bootstrap';
import {
    catastoOpenActiveSelector,
    errorSelector, loadedResultSelector,
    loadingResultSelector, searchResultSelector, searchResultTypeSelector
} from "@js/extension/selectors/catastoOpen";
import {
    deactivateCatastoOpenPanel, loadLayer, loadPropertyOwnerData,
    loadSubjectPropertyData,
    resumePreviousSearchResults
} from "@js/extension/actions/catastoOpen";
import SearchContainer, {
    searchContainerActions,
    searchContainerSelector
} from "@js/extension/components/search/SearchContainer";
import SearchResultGrid, {
    searchResultGridActions,
    searchResultGridSelector
} from "@js/extension/components/search/SearchResultGrid";
import Loader from "@mapstore/components/misc/Loader";
import {
    buildingDetailLayer,
    geomFeatureToLayer, landDetailLayer,
    legalSubjectType,
    naturalSubjectType, propertyOwnerLayer,
    subjectBuildingPropertyType,
    subjectLandPropertyType, subjectPropertyLayer
} from "@js/extension/utils/catastoOpen";
import OverlayTrigger from "@mapstore/components/misc/OverlayTrigger";
import Toolbar from "./search/SearchResultGridToolbar";


const SmartSearchContainer = connect(searchContainerSelector, searchContainerActions)(SearchContainer);
const SmartSearchResultGrid = connect(searchResultGridSelector, searchResultGridActions)(SearchResultGrid);

const naturalSubjectColumns = [
    {key: "selectButton", name: "", frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.subjectProperties.detailTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" /></OverlayTrigger>},
    { key: "fiscalCode", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.fiscalCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "dateOfBirth", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.dateOfBirth"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "cityOfBirth", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.cityOfBirth"} />,
        resizable: true, sortable: true, filterable: true}
];

const legalSubjectColumns = [
    {key: "selectButton", name: "", frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.subjectProperties.detailTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" />
            </OverlayTrigger>},
    { key: "businessName",
        name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.businessName"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "vatNumber", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.vatNumber"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "branch", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.branch"} />,
        resizable: true, sortable: true, filterable: true}
];

const subjectPropertyColumns = [
    {key: 'selectButton', name: '', frozen: true, width: 35,
        formatter: ({row} = {}) => {
            const coordinates = row?.feature?.geometry?.coordinates;
            return coordinates ? (<OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.subjectProperties.zoomTooltip"/></Tooltip>}>
                <Glyphicon glyph="zoom-to" />
            </OverlayTrigger>) : null;
        }
    },
    {key: 'propertyType', name: '', frozen: true, width: 35,
        formatter: ({value} = {}) => {
            return value === subjectLandPropertyType ?
                <OverlayTrigger placement="bottom"
                    overlay={<Tooltip><Message
                        msgId="extension.catastoOpenPanel.services.particles.filters.lands.name"/></Tooltip>}>
                    <Glyphicon glyph="1-layer"/>
                </OverlayTrigger> : value === subjectBuildingPropertyType ?
                    <OverlayTrigger placement="bottom"
                        overlay={<Tooltip><Message
                            msgId="extension.catastoOpenPanel.services.particles.filters.buildings.name"/></Tooltip>}>
                        <Glyphicon glyph="home"/>
                    </OverlayTrigger> : null;
        }
    },
    { key: 'city',
        name: <Message msgId={"extension.catastoOpenPanel.services.particles.filters.cities.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'section', name: <Message msgId={"extension.catastoOpenPanel.services.particles.filters.sections.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'sheet', name: <Message msgId={"extension.catastoOpenPanel.services.particles.filters.sheets.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'number', name: <Message msgId={"extension.number"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'subordinate', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.subordinate"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'right', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.right"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'part', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.part"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'classification', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.classification"} />,
        resizable: true, sortable: true, filterable: true},
    { key: '_class', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.class"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'consistency', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.consistency"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'income', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.income"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'lot', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.lot"} />,
        resizable: true, sortable: true, filterable: true}
];

const landDetailColumns =  [
    {key: 'selectButton', name: '', frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.landDetails.columns.viewerTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" /></OverlayTrigger>},
    { key: 'subordinate', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.subordinate"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'quality', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.quality"} />,
        resizable: true, sortable: true, filterable: true},
    { key: '_class', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.class"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'hectares', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.hectares"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'are', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.are"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'centiare', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.centiare"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'lot', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.lot"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'cadastralRent', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.cadastralRent"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'agriculturalRent', name: <Message msgId={"extension.catastoOpenPanel.landDetails.columns.agriculturalRent"} />,
        resizable: true, sortable: true, filterable: true}
];

const buildingDetailColumns = [
    {key: 'selectButton', name: '', frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.buildingDetails.columns.viewerTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" /></OverlayTrigger>},
    { key: 'subordinate', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.subordinate"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'censusZone', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.censusZone"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'category', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.category"} />,
        resizable: true, sortable: true, filterable: true},
    { key: '_class', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.class"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'consistency', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.consistency"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'rent', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.rent"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'lot', name: <Message msgId={"extension.catastoOpenPanel.buildingDetails.columns.lot"} />,
        resizable: true, sortable: true, filterable: true}
];

const propertyOwnerColumns = [
    { key: 'nominative', name: <Message msgId={"extension.catastoOpenPanel.nominative"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'fiscalCode', name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.fiscalCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'city', name: <Message msgId={"extension.catastoOpenPanel.services.particles.filters.cities.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'right', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.right"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'part', name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.part"} />,
        resizable: true, sortable: true, filterable: true}
];

class CatastoOpenPanel extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        active: PropTypes.bool,
        closeGlyph: PropTypes.string,
        style: PropTypes.object,
        width: PropTypes.number,
        deactivate: PropTypes.func,
        loadError: PropTypes.bool,
        loadingResults: PropTypes.bool,
        loadedResults: PropTypes.bool,
        searchResults: PropTypes.array,
        searchResultType: PropTypes.string,
        loadSubjectPropertyData: PropTypes.func,
        resumePreviousResults: PropTypes.func,
        loadLayer: PropTypes.func,
        loadPropertyOwners: PropTypes.func
    };

    static defaultProps = {
        id: "mapstore-cadastral-search",
        active: false,
        closeGlyph: "1-close",
        width: 660,
        loadError: false,
        loadingResults: false,
        loadedResults: false,
        style: {
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            backgroundColor: 'transparent'
        }
    };

    renderSearchResults = () => {
        const results = this.props.searchResults;
        let noResults = this.props.loadedResults && !results?.length > 0;
        const minHeight = results?.length > 10 ? 350 : 50 + (results?.length + 1) * 35;
        let columns = [];
        let title = "";
        let loadSubjectOnSelect = false;
        let addLayerOnSelect = false;
        let loadPropertyOwnerOnSelect = false;
        let resume = false;
        switch (this.props.searchResultType) {
        case naturalSubjectType:
            columns = naturalSubjectColumns;
            loadSubjectOnSelect = true;
            title = "extension.catastoOpenPanel.services.naturalSubjects.name";
            break;
        case legalSubjectType:
            columns = legalSubjectColumns;
            loadSubjectOnSelect = true;
            title = "extension.catastoOpenPanel.services.legalSubjects.name";
            break;
        case subjectPropertyLayer:
            columns = subjectPropertyColumns;
            addLayerOnSelect = true;
            resume = true;
            title = "extension.catastoOpenPanel.subjectProperties.name";
            break;
        case buildingDetailLayer:
            columns = buildingDetailColumns;
            title = "extension.catastoOpenPanel.buildingDetails.name";
            loadPropertyOwnerOnSelect = true;
            break;
        case landDetailLayer:
            columns = landDetailColumns;
            title = "extension.catastoOpenPanel.landDetails.name";
            loadPropertyOwnerOnSelect = true;
            break;
        case propertyOwnerLayer:
            columns = propertyOwnerColumns;
            title = "extension.catastoOpenPanel.owners";
            resume = true;
            break;
        default:
            break;
        }
        return this.props.loadingResults ? <div className="search-result-grid-loader"><Loader size={176}/></div> :
            noResults ?
                <Alert bsStyle="danger" style={{borderRadius: 5}}>
                    <Message msgId={"extension.catastoOpenPanel.noResults"} />
                </Alert> :
                <div>
                    <SmartSearchResultGrid
                        active={this.props.searchResults?.length > 0}
                        enableFilter
                        minHeight={minHeight}
                        columns={columns}
                        onRowSelect={loadSubjectOnSelect ? this.props.loadSubjectPropertyData :
                            (addLayerOnSelect ? this.zoomToProperty : (
                                loadPropertyOwnerOnSelect ? this.props.loadPropertyOwners : () => null))}
                        toolbar={
                            <Toolbar
                                enableFilter
                                title={title}
                                resumeButtonActive={resume}
                                resumeButtonTooltipId={"extension.catastoOpenPanel.resumePreviousResults"}
                                onResumeButton={resume ? this.props.resumePreviousResults : null}
                            />}
                    />
                </div>;
    };

    render() {
        return (
            <div id="cadastral-search-root" className={this.props.active ? 'mapstore-query-builder' : ''}
                style={this.props.style}>
                <ContainerDimensions>
                    {({ width }) => (<DockPanel
                        open={this.props.active}
                        size={this.props.width / width > 1 ? width : this.props.width}
                        position="right"
                        bsStyle="primary"
                        title={<Message msgId="extension.catastoOpenPanel.title"/>}
                        onClose={() => this.props.deactivate(this.props)}
                        glyph="book"
                        zIndex={1031}>
                        <SmartSearchContainer/>
                        {this.props.loadError ?
                            <Alert bsStyle="danger" style={{borderRadius: 5}}>
                                <Message msgId={"extension.catastoOpenPanel.error"} />
                            </Alert> : null}
                        {this.renderSearchResults()}
                    </DockPanel>)}
                </ContainerDimensions>
            </div>
        );
    }

    zoomToProperty = (property) => {
        return this.props.loadLayer(geomFeatureToLayer(property, subjectPropertyLayer));
    };
}

const catastoOpenSelector = createStructuredSelector({
    active: catastoOpenActiveSelector,
    loadError: errorSelector,
    loadingResults: loadingResultSelector,
    loadedResults: loadedResultSelector,
    searchResults: searchResultSelector,
    searchResultType: searchResultTypeSelector
});

const SmartCatastoOpenPanel = connect(catastoOpenSelector,
    {
        deactivate: deactivateCatastoOpenPanel,
        loadSubjectPropertyData: loadSubjectPropertyData,
        resumePreviousResults: resumePreviousSearchResults,
        loadLayer: loadLayer,
        loadPropertyOwners: loadPropertyOwnerData
    })(CatastoOpenPanel);

export default SmartCatastoOpenPanel;