import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ContainerDimensions from 'react-container-dimensions';
import Message from '@mapstore/components/I18N/Message';
import DockPanel from '@js/extension/components/misc/panels/DockPanel';
import { createStructuredSelector } from 'reselect';
import { Alert, Glyphicon, Tooltip} from 'react-bootstrap';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import '@js/extension/assets/style.css';
import {
    catastoOpenActiveSelector,
    catastoOpenisReducedSelector,
    errorSelector,
    loadedResultSelector,
    loadingResultSelector,
    searchResultSelector,
    searchResultTypeSelector,
    messageForUserSelector,
    isTemporalSearchCheckedSelector,
    selectedImmobileSelector,
    doweHavePrintSelector,
    printObjSelector,
    isStartedDownloadVisuraPdfSelector,
    isStartedDownloadVisuraCsvSelector,
    errorDownloadMsgSelector,
    isStartedDownloadVisuraImSingolaSelector
} from "@js/extension/selectors/catastoOpen";
import {
    deactivateCatastoOpenPanel,
    reduceCatastoOpenPanel,
    loadLayer,
    loadPropertyOwnerData,
    loadSubjectPropertyData,
    resumePreviousSearchResults,
    setBackend,
    setPrintEndPoint,
    setFixedComuni,
    startDownloadVisura,
    startDownloadVisuraImSingola,
    loadSingleVisuraJson
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
    geomFeatureToLayer,
    landDetailLayer,
    legalSubjectType,
    naturalSubjectType,
    propertyOwnerLayer,
    subjectBuildingPropertyType,
    subjectLandPropertyType,
    subjectPropertyLayer
} from "@js/extension/utils/catastoOpen";
import OverlayTrigger from "@mapstore/components/misc/OverlayTrigger";
import Toolbar from "./search/SearchResultGridToolbar";
import DetailImmobile from "@js/extension/components/search/DetailImmobile";
import {rowSelector} from "@js/extension/selectors/resultGrid";

const Button = tooltip(ButtonB);

const SmartSearchContainer = connect(searchContainerSelector, searchContainerActions)(SearchContainer);
const SmartSearchResultGrid = connect(searchResultGridSelector, searchResultGridActions)(SearchResultGrid);

const naturalSubjectColumns = [
    {key: "selectButton", name: "", frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.subjectProperties.detailTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" /></OverlayTrigger>},
    { key: "subjects", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.subjectCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "lastName", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.lastName"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "firstName", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.firstName"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "fiscalCode", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.fiscalCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "dateOfBirth", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.dateOfBirth"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "cityOfBirth", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.cityOfBirth"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "province", name: <Message msgId={"extension.catastoOpenPanel.services.naturalSubjects.columns.province"} />,
        resizable: true, sortable: true, filterable: true}
];

const legalSubjectColumns = [
    {key: "selectButton", name: "", frozen: true, width: 35,
        formatter:
            <OverlayTrigger placement="bottom"
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.subjectProperties.detailTooltip"/></Tooltip>}>
                <Glyphicon glyph="eye-open" />
            </OverlayTrigger>},
    { key: "subjects", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.subjectCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "businessName",
        name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.businessName"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "vatNumber", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.vatNumber"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "branch", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.branch"} />,
        resizable: true, sortable: true, filterable: true},
    { key: "province", name: <Message msgId={"extension.catastoOpenPanel.services.legalSubjects.columns.province"} />,
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
                        msgId="extension.catastoOpenPanel.services.parcels.filters.lands.name"/></Tooltip>}>
                    <Glyphicon glyph="1-layer"/>
                </OverlayTrigger> : value === subjectBuildingPropertyType ?
                    <OverlayTrigger placement="bottom"
                        overlay={<Tooltip><Message
                            msgId="extension.catastoOpenPanel.services.parcels.filters.buildings.name"/></Tooltip>}>
                        <Glyphicon glyph="home"/>
                    </OverlayTrigger> : null;
        }
    },
    { key: 'immobile',
        name: <Message msgId={"extension.catastoOpenPanel.subjectProperties.columns.immobileCode"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'city',
        name: <Message msgId={"extension.catastoOpenPanel.services.parcels.filters.cities.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'section', name: <Message msgId={"extension.catastoOpenPanel.services.parcels.filters.sections.name"} />,
        resizable: true, sortable: true, filterable: true},
    { key: 'sheet', name: <Message msgId={"extension.catastoOpenPanel.services.parcels.filters.sheets.name"} />,
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
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.landDetails.columns.viewerTooltipDetail"/></Tooltip>}>
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
                overlay={<Tooltip><Message msgId="extension.catastoOpenPanel.buildingDetails.columns.viewerTooltipDetail"/></Tooltip>}>
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
    { key: 'city', name: <Message msgId={"extension.catastoOpenPanel.services.parcels.filters.cities.name"} />,
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
        reduced: PropTypes.bool,
        onReduce: PropTypes.func,
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
        loadPropertyOwners: PropTypes.func,
        extraColumns: PropTypes.array,
        filterServices: PropTypes.array,
        ownerDetails: PropTypes.object,
        backend: PropTypes.object,
        setBackend: PropTypes.func,
        messageForUser: PropTypes.string,
        isTemporalSearchChecked: PropTypes.bool,
        selectedImmobile: PropTypes.object,
        printEndPointURL: PropTypes.string,
        setPrintEndPoint: PropTypes.func,
        doweHavePrint: PropTypes.bool,
        printObj: PropTypes.object,
        fixedComuni: PropTypes.object,
        setFixedComuni: PropTypes.func,
        rowResult: PropTypes.array,
        onClickDownloadVisura: PropTypes.func,
        isStartedDownloadVisuraPdf: PropTypes.bool,
        isStartedDownloadVisuraCsv: PropTypes.bool,
        errorDownloadMsg: PropTypes.object,
        onClickDownloadVisuraImSingola: PropTypes.func,
        isStartedDownloadVisuraImSingola: PropTypes.bool,
        onLoadSingleVisuraJson: PropTypes.func
    };

    static defaultProps = {
        id: "mapstore-cadastral-search",
        active: false,
        reduced: false,
        onReduce: () => {},
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
        },
        extraColumns: [
            { key: 'startDate', name: <Message msgId={"extension.catastoOpenPanel.extraColumns.startDate"} />,
                resizable: true, sortable: true, filterable: true},
            { key: 'endDate', name: <Message msgId={"extension.catastoOpenPanel.extraColumns.endDate"} />,
                resizable: true, sortable: true, filterable: true}
        ],
        messageForUser: null,
        filterServices: [
            {
                "state_identifier": "parcels",
                "landDetailColumnsKeys": ["subordinate", "quality", "_class", "hectares", "are", "centiare", "lot", "cadastralRent", "agriculturalRent"],
                "buildingDetailColumns": ["subordinate", "censusZone", "category", "_class", "consistency", "rent", "lot"],
                "useTemporalSearch": true,
                "useHistoricalSearch": true
            },
            {
                "state_identifier": "naturalSubjects",
                "naturalSubjectColumnsKeys": ["subjects", "lastName", "firstName", "fiscalCode", "dateOfBirth", "cityOfBirth", "province"],
                "useTemporalSearch": true,
                "useHistoricalSearch": true
            },
            {
                "state_identifier": "legalSubjects",
                "legalSubjectColumnsKeys": ["subjects", "businessName", "vatNumber", "branch", "province"],
                "useTemporalSearch": true,
                "useHistoricalSearch": true
            }
        ],
        ownerDetails: {
            subjectPropertyColumnsKeys: ["immobile", "city", "section", "sheet", "number", "subordinate", "right", "part", "classification", "_class", "consistency", "income", "lot"],
            propertyOwnerColumnsKeys: ["nominative", "fiscalCode", "city", "right", "part"],
            showDate: true
        },
        backend: {
            name: "Geoserver",
            url: "http://geoserver:8080/geoserver/"
        },
        setBackend: () => {},
        selectedImmobile: null,
        printEndPointURL: "",
        setPrintEndPoint: () => {},
        printPath: "",
        fixedComuni: null,
        setFixedComuni: () => {},
        onClickDownloadVisura: () => {},
        onClickDownloadVisuraImSingola: () => {},
        onLoadSingleVisuraJson: () => {}
    };

    componentWillReceiveProps(nextProp) {
        if (nextProp.active !== this.props.active) {
            this.props.setBackend(
                this.props.backend
            );
            this.props.setPrintEndPoint(
                this.props.printEndPointURL
            );
            this.props.setFixedComuni(
                this.props.fixedComuni
            );
        }
    }

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
        const parcelsDef = this.props.filterServices.filter(item => item.state_identifier === "parcels");
        const naturalSubjectsDef = this.props.filterServices.filter(item => item.state_identifier === "naturalSubjects");
        const legalSubjectsDef = this.props.filterServices.filter(item => item.state_identifier === "legalSubjects");
        const isTemporalSearchOnParcel = (parcelsDef[0]?.useTemporalSearch === null || parcelsDef[0]?.useHistoricalSearch === true) ? false : parcelsDef[0]?.useTemporalSearch;
        let printPdf = false;
        let printCsv = false;
        let printTipId = "extension.catastoOpenPanel.printBtn.label";
        let vusuraTipId = "extension.catastoOpenPanel.showBtn.label";
        let extending = false;
        switch (this.props.searchResultType) {
        case naturalSubjectType:
            columns = naturalSubjectsDef.length === 1 ? naturalSubjectColumns.filter(
                item => (item.key === "selectButton" || naturalSubjectsDef[0].naturalSubjectColumnsKeys.includes(item.key))
            ) : naturalSubjectColumns;
            loadSubjectOnSelect = true;
            title = "extension.catastoOpenPanel.services.naturalSubjects.name";
            printPdf = this.props.doweHavePrint;
            printCsv = this.props.doweHavePrint;
            extending = true;
            break;
        case legalSubjectType:
            columns = legalSubjectsDef.length === 1 ? legalSubjectColumns.filter(
                item => (item.key === "selectButton" || legalSubjectsDef[0].legalSubjectColumnsKeys.includes(item.key))
            ) : legalSubjectColumns;
            loadSubjectOnSelect = true;
            title = "extension.catastoOpenPanel.services.legalSubjects.name";
            printPdf = this.props.doweHavePrint;
            printCsv = this.props.doweHavePrint;
            extending = true;
            break;
        case subjectPropertyLayer:
            columns = this.props.ownerDetails.subjectPropertyColumnsKeys?.length !== 0 ? subjectPropertyColumns.filter(
                item => (this.props.ownerDetails.subjectPropertyColumnsKeys.includes(item.key))
            ) : subjectPropertyColumns;
            if (this.props.isTemporalSearchChecked === true && this.props.ownerDetails.showDate === true) {
                columns = [...columns, ...this.props.extraColumns];
            }
            columns = this.props.doweHavePrint ? [
                {key: 'selectButton', name: '', frozen: true, width: 50,
                    formatter: ({row} = {}) => {
                        const coordinates = row?.feature?.geometry?.coordinates;
                        return coordinates ? (<Button
                            tooltipId={"extension.catastoOpenPanel.subjectProperties.zoomTooltip"}
                            tooltipPosition={"bottom"}
                            onClick={() => this.zoomToProperty(row)}
                        >
                            <Glyphicon glyph={"zoom-to"} style={{color: "#333333"}}/>
                        </Button>) : null;
                    }
                },
                {key: 'propertyType', name: '', frozen: true, width: 35,
                    formatter: ({value} = {}) => {
                        return value === subjectLandPropertyType ?
                            <OverlayTrigger placement="bottom"
                                overlay={<Tooltip><Message
                                    msgId="extension.catastoOpenPanel.services.parcels.filters.lands.name"/></Tooltip>}>
                                <Glyphicon glyph="1-layer"/>
                            </OverlayTrigger> : value === subjectBuildingPropertyType ?
                                <OverlayTrigger placement="bottom"
                                    overlay={<Tooltip><Message
                                        msgId="extension.catastoOpenPanel.services.parcels.filters.buildings.name"/></Tooltip>}>
                                    <Glyphicon glyph="home"/>
                                </OverlayTrigger> : null;
                    }
                },
                {key: 'printButton', name: '', frozen: true, width: 50,
                    formatter: ({row} = {}) => {
                        const immobile = row?.immobile;
                        const propertyType = row?.propertyType;
                        return immobile ?
                            (<Button
                                tooltipId={printTipId}
                                tooltipPosition={"bottom"}
                                onClick={() => this.props.onClickDownloadVisuraImSingola(immobile, propertyType)}
                            >
                                {this.props.isStartedDownloadVisuraImSingola ? <Glyphicon glyph={"ban-circle"} style={{color: "#333333"}}/> : <Glyphicon glyph={"print"} style={{color: "#333333"}}/>}
                            </Button>) :
                            null;
                    }
                },
                {key: 'visuraButton', name: '', frozen: true, width: 50,
                    formatter: ({row} = {}) => {
                        const immobile = row?.immobile;
                        const propertyType = row?.propertyType;
                        return immobile ?
                            (<Button
                                tooltipId={vusuraTipId}
                                tooltipPosition={"bottom"}
                                onClick={() => this.props.onLoadSingleVisuraJson(immobile, propertyType)}
                            >
                                <Glyphicon glyph={"eye-open"} style={{color: "#333333"}}/>
                            </Button>) :
                            null;
                    }
                },
                ...columns]
                : [
                    {key: 'selectButton', name: '', frozen: true, width: 50,
                        formatter: ({row} = {}) => {
                            const coordinates = row?.feature?.geometry?.coordinates;
                            return coordinates ? (<Button
                                tooltipId={"extension.catastoOpenPanel.subjectProperties.zoomTooltip"}
                                tooltipPosition={"bottom"}
                                onClick={() => this.zoomToProperty(row)}
                            >
                                <Glyphicon glyph={"zoom-to"} style={{color: "#333333"}}/>
                            </Button>) : null;
                        }
                    },
                    {key: 'propertyType', name: '', frozen: true, width: 35,
                        formatter: ({value} = {}) => {
                            return value === subjectLandPropertyType ?
                                <OverlayTrigger placement="bottom"
                                    overlay={<Tooltip><Message
                                        msgId="extension.catastoOpenPanel.services.parcels.filters.lands.name"/></Tooltip>}>
                                    <Glyphicon glyph="1-layer"/>
                                </OverlayTrigger> : value === subjectBuildingPropertyType ?
                                    <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip><Message
                                            msgId="extension.catastoOpenPanel.services.parcels.filters.buildings.name"/></Tooltip>}>
                                        <Glyphicon glyph="home"/>
                                    </OverlayTrigger> : null;
                        }
                    },
                    ...columns];
            addLayerOnSelect = false;
            resume = true;
            title = "extension.catastoOpenPanel.subjectProperties.name";
            printPdf = this.props.doweHavePrint;
            printCsv = this.props.doweHavePrint;
            extending = true;
            break;
        case buildingDetailLayer:
            columns = parcelsDef.length === 1 ? buildingDetailColumns.filter(
                item => (item.key === "selectButton" || parcelsDef[0].buildingDetailColumns.includes(item.key))
            ) : buildingDetailColumns;
            if (this.props.isTemporalSearchChecked === true && isTemporalSearchOnParcel === true) {
                columns = [...columns, ...this.props.extraColumns];
            }
            title = "extension.catastoOpenPanel.buildingDetails.name";
            loadPropertyOwnerOnSelect = true;
            extending = true;
            break;
        case landDetailLayer:
            columns = parcelsDef.length === 1 ? landDetailColumns.filter(
                item => (item.key === "selectButton" || parcelsDef[0].landDetailColumnsKeys.includes(item.key))
            ) : landDetailColumns;
            if (this.props.isTemporalSearchChecked === true && isTemporalSearchOnParcel === true) {
                columns = [...columns, ...this.props.extraColumns];
            }
            title = "extension.catastoOpenPanel.landDetails.name";
            loadPropertyOwnerOnSelect = true;
            extending = true;
            break;
        case propertyOwnerLayer:
            columns = this.props.ownerDetails.propertyOwnerColumnsKeys?.length !== 0 ? propertyOwnerColumns.filter(
                item => (item.key === "selectButton" || this.props.ownerDetails.propertyOwnerColumnsKeys.includes(item.key))
            ) : propertyOwnerColumns;
            if (this.props.isTemporalSearchChecked === true && this.props.ownerDetails.showDate === true) {
                columns = [...columns, ...this.props.extraColumns];
            }
            title = "extension.catastoOpenPanel.owners";
            resume = true;
            printPdf = this.props.doweHavePrint;
            break;
        default:
            break;
        }
        return this.props.loadingResults ? <div className="search-result-grid-loader"><Loader size={176}/></div> :
            (
                <div>
                    { noResults ?
                        <SmartSearchResultGrid
                            active
                            minHeight={minHeight}
                            columns={columns}
                            toolbar={
                                <Toolbar
                                    enableFilter
                                    title={"extension.catastoOpenPanel.noOwner"}
                                    resumeButtonActive={resume}
                                    resumeButtonTooltipId={"extension.catastoOpenPanel.resumePreviousResults"}
                                    onResumeButton={resume ? this.props.resumePreviousResults : null}
                                    showPrintBtnPdf={printPdf}
                                    showPrintBtnCsv={printCsv}
                                    printTipId={printTipId}
                                    showExtendBtn={extending}
                                    columns={columns}
                                    rows={this.props.rowResult}
                                    onClickDownloadVisura={this.props.onClickDownloadVisura}
                                    isStartedDownloadVisuraPdf={this.props.isStartedDownloadVisuraPdf}
                                    isStartedDownloadVisuraCsv={this.props.isStartedDownloadVisuraCsv}
                                    errorDownloadMsg={this.props.errorDownloadMsg}
                                />}
                        /> :
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
                                    showPrintBtnPdf={printPdf}
                                    showPrintBtnCsv={printCsv}
                                    printTipId={printTipId}
                                    showExtendBtn={extending}
                                    columns={columns}
                                    rows={this.props.rowResult}
                                    onClickDownloadVisura={this.props.onClickDownloadVisura}
                                    isStartedDownloadVisuraPdf={this.props.isStartedDownloadVisuraPdf}
                                    isStartedDownloadVisuraCsv={this.props.isStartedDownloadVisuraCsv}
                                    errorDownloadMsg={this.props.errorDownloadMsg}
                                />}
                        />}
                    {this.props.searchResultType === propertyOwnerLayer ? <DetailImmobile selectedImmobile={this.props.selectedImmobile}/> : null}
                </div>);
    };

    render() {
        return (
            <div id="cadastral-search-root" className={this.props.active ? 'mapstore-query-builder' : ''}
                style={this.props.style}>
                <ContainerDimensions>
                    {({ width }) => (<DockPanel
                        open={this.props.active && !this.props.reduced}
                        size={this.props.width / width > 1 ? width : this.props.width}
                        position="right"
                        bsStyle="primary"
                        title={<Message msgId="extension.catastoOpenPanel.title"/>}
                        onClose={() => this.props.deactivate(this.props)}
                        zIndex={1031}
                        onReduce={this.props.onReduce}>
                        <SmartSearchContainer filterServices={this.props.filterServices} />
                        {this.props.loadError ?
                            <Alert bsStyle="danger" style={{borderRadius: 5}}>
                                <Message msgId={"extension.catastoOpenPanel.error"} />
                            </Alert> : null}
                        {this.props.messageForUser ?
                            <Alert bsStyle="warning" style={{borderRadius: 5}}>
                                <Message msgId={this.props.messageForUser} />
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
    reduced: catastoOpenisReducedSelector,
    loadError: errorSelector,
    messageForUser: messageForUserSelector,
    loadingResults: loadingResultSelector,
    loadedResults: loadedResultSelector,
    searchResults: searchResultSelector,
    searchResultType: searchResultTypeSelector,
    isTemporalSearchChecked: isTemporalSearchCheckedSelector,
    selectedImmobile: selectedImmobileSelector,
    doweHavePrint: doweHavePrintSelector,
    printObj: printObjSelector,
    rowResult: rowSelector,
    isStartedDownloadVisuraPdf: isStartedDownloadVisuraPdfSelector,
    isStartedDownloadVisuraCsv: isStartedDownloadVisuraCsvSelector,
    errorDownloadMsg: errorDownloadMsgSelector,
    isStartedDownloadVisuraImSingola: isStartedDownloadVisuraImSingolaSelector
});

const SmartCatastoOpenPanel = connect(catastoOpenSelector,
    {
        deactivate: deactivateCatastoOpenPanel,
        onReduce: reduceCatastoOpenPanel,
        loadSubjectPropertyData: loadSubjectPropertyData,
        resumePreviousResults: resumePreviousSearchResults,
        loadLayer: loadLayer,
        loadPropertyOwners: loadPropertyOwnerData,
        setBackend: setBackend,
        setPrintEndPoint: setPrintEndPoint,
        setFixedComuni: setFixedComuni,
        onClickDownloadVisura: startDownloadVisura,
        onClickDownloadVisuraImSingola: startDownloadVisuraImSingola,
        onLoadSingleVisuraJson: loadSingleVisuraJson
    })(CatastoOpenPanel);

export default SmartCatastoOpenPanel;
