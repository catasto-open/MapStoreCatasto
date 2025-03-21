import {
    CATASTO_OPEN_ACTIVATE_PANEL,
    CATASTO_OPEN_DEACTIVATE_PANEL,
    CATASTO_OPEN_REDUCED_PANEL,
    CATASTO_OPEN_SELECT_SERVICE,
    CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE,
    CATASTO_OPEN_LOAD_CITY_DATA,
    CATASTO_OPEN_LOADED_CITY_DATA,
    CATASTO_OPEN_SELECT_CITY,
    CATASTO_OPEN_LOAD_SECTION_DATA,
    CATASTO_OPEN_LOADED_SECTION_DATA,
    CATASTO_OPEN_SELECT_SECTION,
    CATASTO_OPEN_LOAD_SHEET_DATA,
    CATASTO_OPEN_LOADED_SHEET_DATA,
    CATASTO_OPEN_SELECT_SHEET,
    CATASTO_OPEN_LOAD_LAND_DATA,
    CATASTO_OPEN_LOADED_LAND_DATA,
    CATASTO_OPEN_SELECT_LAND,
    CATASTO_OPEN_LOAD_BUILDING_DATA,
    CATASTO_OPEN_LOADED_BUILDING_DATA,
    CATASTO_OPEN_SELECT_BUILDING,
    CATASTO_OPEN_SELECT_SUBJECT_FILTER,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_TYPE,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_TOWN,
    CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA,
    CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA,
    CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA,
    CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA,
    CATASTO_OPEN_LOAD_ERROR,
    CATASTO_OPEN_ADD_LAYER,
    CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA,
    CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA,
    CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS,
    CATASTO_OPEN_RELOAD_SEARCH_RESULTS,
    CATASTO_OPEN_RELOADED_SEARCH_RESULTS,
    CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA,
    CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA,
    CATASTO_OPEN_LOAD_LAND_DETAIL_DATA,
    CATASTO_OPEN_LOADED_LAND_DETAIL_DATA,
    CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA,
    CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA,
    CATASTO_OPEN_SET_BACKEND,
    CATASTO_OPEN_TEMPORAL_SEARCH_CHECKED,
    CATASTO_OPEN_HISTORICAL_SEARCH_CHECKED,
    CATASTO_OPEN_START_DATE_SELECTED,
    CATASTO_OPEN_END_DATE_SELECTED,
    CATASTO_OPEN_SET_MESSAGE_FOR_USER,
    CATASTO_OPEN_IMMOBILE_SELECT_TOPONIMO,
    CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO,
    CATASTO_OPEN_IMMOBILE_LOADED_TOPONIMO,
    CATASTO_OPEN_IMMOBILE_SELECT_ADDRESS,
    CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS,
    CATASTO_OPEN_IMMOBILE_LOADED_ADDRESS,
    CATASTO_OPEN_IMMOBILE_SET_NCIVICO,
    CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH,
    CATASTO_OPEN_IMMOBILE_SET_CODICE,
    CATASTO_OPEN_IMMOBILE_SELECT_TYPE,
    CATASTO_OPEN_SET_PRINT_ENDPOINT,
    CATASTO_OPEN_SET_PRINT_PATH_W_PARAMS,
    CATASTO_OPEN_SET_FIXED_COMUNI,
    CATASTO_OPEN_START_DOWNLOAD_VISURA,
    CATASTO_OPEN_END_DOWNLOAD_VISURA,
    CATASTO_OPEN_ERROR_DOWNLOAD_VISURA,
    CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA,
    CATASTO_OPEN_WE_ARE_DONE_DOWNLOADING_VISURA_IM_SINGOLA,
    CATASTO_OPEN_ERROR_DOWNLOAD_VISURA_IM_SINGOLA,
    CATASTO_OPEN_SET_BASE_LAYERS,
    CATASTO_OPEN_BASE_LAYERS_ERROR,
    CATASTO_OPEN_TRACK_BASE_LAYERS,
    CATASTO_OPEN_INIT_BASE_LAYERS,
    CATASTO_OPEN_BTN_FAB_CLICKED,
    CATASTO_OPEN_BTN_TER_CLICKED,
    CATASTO_OPEN_EXPLORE_ENABLE,
    CATASTO_OPEN_SELECTION_APPEND_LAYER,
    CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER,
    CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER,
    CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED,
    CATASTO_OPEN_TAB_SELECT,
    CATASTO_OPEN_SELECTION_ON_LOAD_DETAILS,
    CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED,
    CATASTO_OPEN_SELECTION_EXPLORE_CANCEL,
    CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE,
    CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE,
    CATASTO_OPEN_ERROR_DOWNLOAD_LISTA_IMMOBILE
} from "@js/extension/actions/catastoOpen";
import {
    buildingDetailLayer,
    landDetailLayer,
    legalSubjectType,
    naturalSubjectType,
    propertyOwnerLayer,
    subjectPropertyLayer,
    printPathLegalSubject,
    printPathNaturalSubject,
    doesIDExists
} from "@js/extension/utils/catastoOpen";

export default function(state = {
    subjectForm:
        {
            firstName: '',
            lastName: '',
            birthDate: null,
            birthPlace: null,
            fiscalCode: '',
            subjectCode: '',
            businessName: '',
            vatNumber: '',
            identificationCode: ''
        }
}, action) {
    switch (action?.type) {

    case CATASTO_OPEN_ACTIVATE_PANEL:
        return {
            ...state,
            reduced: false
        };
    case CATASTO_OPEN_DEACTIVATE_PANEL:
        return {
            trackedBaselayers: state?.trackedBaselayers,
            layer: state?.layer,
            reduced: false
        };
    case CATASTO_OPEN_REDUCED_PANEL:
        return {
            ...state,
            reduced: true
        };
    case CATASTO_OPEN_SELECT_SERVICE:
        const serviceChanged = state?.selectedService && state.selectedService?.id !== action?.service?.id;
        return serviceChanged ?
            {
                backend: state?.backend,
                fixedComuni: state?.fixedComuni,
                printEndPoint: state?.printEndPoint,
                doweHavePrint: state?.doweHavePrint,
                selectedService: action?.service,
                layer: state?.layer
            } : {
                ...state,
                selectedService: action?.service,
                error: false
            };
    case CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE:
        const searchImmTypeChanged = state?.selectedSearchImmType && state.selectedSearchImmType?.id !== action?.serviceImmType?.value;
        return searchImmTypeChanged ?
            {
                ...state,
                backend: state?.backend,
                fixedComuni: state?.fixedComuni,
                printEndPoint: state?.printEndPoint,
                doweHavePrint: state?.doweHavePrint,
                selectedSearchImmType: action?.serviceImmType,
                layer: state?.layer,
                selectedCity: null,
                isLoadingCities: true,
                selectedSection: null,
                selectedSheet: null,
                selectedLand: null,
                selectedBuilding: null,
                searchResults: null,
                searchResultType: null,
                loadedResults: false,
                selectedToponym: null,
                selectedImmType: null,
                hasSubmitedSearch: false
            } : {
                ...state,
                selectedSearchImmType: action?.serviceImmType,
                error: false
            };
    case CATASTO_OPEN_LOAD_ERROR:
        return {
            backend: state?.backend,
            fixedComuni: state?.fixedComuni,
            printEndPoint: state?.printEndPoint,
            doweHavePrint: state?.doweHavePrint,
            error: true
        };
    case CATASTO_OPEN_SET_MESSAGE_FOR_USER:
        return {
            ...state,
            messageForUser: action.messageForUser
        };
    case CATASTO_OPEN_ADD_LAYER:
        return {
            ...state,
            layer: action?.layer
        };
    case CATASTO_OPEN_LOAD_CITY_DATA:
        return {
            ...state,
            isLoadingCities: true
        };
    case CATASTO_OPEN_LOADED_CITY_DATA:
        return {
            ...state,
            cities: action?.cities,
            isLoadingCities: false
        };
    case CATASTO_OPEN_SELECT_CITY:
        const cityChanged = state?.selectedCity && state.selectedCity?.code !== action?.city?.code;
        return cityChanged ? {
            ...state,
            selectedCity: action?.city,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedToponym: null,
            selectedImmType: null,
            hasSubmitedSearch: false,
            cityChanged
        } : {
            ...state,
            selectedCity: action?.city,
            cityChanged
        };
    case CATASTO_OPEN_LOAD_SECTION_DATA:
        return {
            ...state,
            isLoadingSections: true
        };
    case CATASTO_OPEN_LOADED_SECTION_DATA:
        return {
            ...state,
            sections: action?.sections,
            isLoadingSections: false
        };
    case CATASTO_OPEN_SELECT_SECTION:
        const sectionChanged = state?.selectedSection && state.selectedSection?.code !== action?.section?.code;
        return sectionChanged ? {
            ...state,
            selectedSection: action?.section,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            sectionChanged,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        } : {
            ...state,
            selectedSection: action?.section,
            sectionChanged
        };
    case CATASTO_OPEN_LOAD_SHEET_DATA:
        return {
            ...state,
            isLoadingSheets: true
        };
    case CATASTO_OPEN_LOADED_SHEET_DATA:
        return {
            ...state,
            sheets: state.selectedSection?.value === '_' ? action?.sheets :
                action?.sheets.filter(s => s.feature.properties?.section === state.selectedSection?.value),
            isLoadingSheets: false
        };
    case CATASTO_OPEN_SELECT_SHEET:
        const sheetChanged = state?.selectedSheet && state.selectedSheet?.number !== action?.sheet?.number;
        return sheetChanged ? {
            ...state,
            selectedSheet: action?.sheet,
            selectedLand: null,
            selectedBuilding: null,
            sheetChanged,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        } : {
            ...state,
            selectedSheet: action?.sheet,
            sheetChanged
        };
    case CATASTO_OPEN_LOAD_LAND_DATA:
        return {
            ...state,
            isLoadingLands: true
        };
    case CATASTO_OPEN_LOADED_LAND_DATA:
        return {
            ...state,
            lands: action?.lands,
            isLoadingLands: false
        };
    case CATASTO_OPEN_SELECT_LAND:
        const landChanged = state?.selectedLand && state.selectedLand?.number !== action?.land?.number;
        return landChanged ? {
            ...state,
            selectedLand: action?.land,
            landChanged,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        } : {
            ...state,
            selectedLand: action?.land,
            landChanged
        };
    case CATASTO_OPEN_LOAD_BUILDING_DATA:
        return {
            ...state,
            isLoadingBuildings: true
        };
    case CATASTO_OPEN_LOADED_BUILDING_DATA:
        return {
            ...state,
            buildings: action?.buildings,
            isLoadingBuildings: false
        };
    case CATASTO_OPEN_SELECT_BUILDING:
        const buildingChanged = state?.selectedBuilding && state.selectedBuilding?.number !== action?.building?.number;
        return buildingChanged ? {
            ...state,
            selectedBuilding: action?.building,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            buildingChanged
        } : {
            ...state,
            selectedBuilding: action?.building,
            buildingChanged
        };
    case CATASTO_OPEN_SELECT_SUBJECT_FILTER:
        const subjectFilterChanged = state?.selectedSubjectFilter && state.selectedSubjectFilter?.id !== action?.filter?.id;
        return subjectFilterChanged ? {
            ...state,
            selectedSubjectFilter: action?.filter,
            subjectForm: {
                firstName: '',
                lastName: '',
                birthDate: null,
                birthPlace: null,
                fiscalCode: '',
                subjectCode: '',
                businessName: '',
                vatNumber: '',
                identificationCode: ''
            },
            selectedBirthPlace: null,
            searchResults: subjectFilterChanged ? [] : state.searchResults,
            loadedResults: subjectFilterChanged ? false : state.loadedResults
        } : {...state,
            selectedSubjectFilter: action?.filter
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_TYPE:
        return {
            ...state,
            subjectForm: {
                ...state.subjectForm,
                type: action?.subjectType
            }
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM:
        return {
            ...state,
            subjectForm: {
                ...state.subjectForm,
                [action.payload.field]: action.payload.value
            }
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN:
        return {
            ...state,
            isLoadingTown: true
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_TOWN:
        return {
            ...state,
            towns: action.towns,
            isLoadingTown: false
        };
    case CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA:
        return {
            ...state,
            searchResults: action?.legalSubjects,
            searchResultType: legalSubjectType,
            loadingResults: false,
            loadedResults: true
        };
    case CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA:
        return {
            ...state,
            searchResults: action?.naturalSubjects,
            searchResultType: naturalSubjectType,
            loadingResults: false,
            loadedResults: true
        };

    case CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA:
        return {
            ...state,
            previousSearchResults: state.searchResults,
            previousSearchResultType: state.searchResultType,
            searchResults: action?.subjectProperties,
            searchResultType: subjectPropertyLayer,
            loadingResults: false,
            loadedResults: true
        };
    case CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS:
        return {
            ...state,
            searchResults: state.previousSearchResults,
            searchResultType: state.previousSearchResultType,
            previousSearchResults: null,
            previousSearchResultType: null,
            printObj: state?.previousPrintObj
        };
    case CATASTO_OPEN_RELOAD_SEARCH_RESULTS:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_RELOADED_SEARCH_RESULTS:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true
        };
    case CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true,
            searchResults: action?.buildingDetails,
            searchResultType: buildingDetailLayer
        };
    case CATASTO_OPEN_LOAD_LAND_DETAIL_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false
        };
    case CATASTO_OPEN_LOADED_LAND_DETAIL_DATA:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true,
            searchResults: action?.landDetails,
            searchResultType: landDetailLayer
        };
    case CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA:
        return {
            ...state,
            loadingResults: true,
            loadedResults: false,
            selectedImmobile: action?.property
        };
    case CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true,
            previousSearchResults: state.searchResults,
            previousSearchResultType: state.searchResultType,
            searchResults: action?.propertyOwners,
            searchResultType: propertyOwnerLayer
        };
    case CATASTO_OPEN_SET_BACKEND:
        return {
            ...state,
            backend: action.backend
        };
    case CATASTO_OPEN_TEMPORAL_SEARCH_CHECKED:
        return {
            ...state,
            isTemporalSearchChecked: action.isTemporalSearchChecked,
            startDate: null,
            endDate: null,
            subjectForm: {
                firstName: '',
                lastName: '',
                birthDate: null,
                birthPlace: null,
                fiscalCode: '',
                subjectCode: '',
                businessName: '',
                vatNumber: '',
                identificationCode: ''
            },
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedToponym: null,
            selectedImmType: null,
            hasSubmitedSearch: false
        };
    case CATASTO_OPEN_HISTORICAL_SEARCH_CHECKED:
        const defaultSection = {value: "_", label: "TUTTE LE SEZIONI"};
        return {
            ...state,
            isHistoricalSearchChecked: action.isHistoricalSearchChecked,
            subjectForm: {
                firstName: '',
                lastName: '',
                birthDate: null,
                birthPlace: null,
                fiscalCode: '',
                subjectCode: '',
                businessName: '',
                vatNumber: '',
                identificationCode: ''
            },
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: defaultSection,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedToponym: null,
            selectedImmType: null,
            hasSubmitedSearch: false,
            selectedAddress: null,
            houseNumber: ''
        };
    case CATASTO_OPEN_START_DATE_SELECTED:
        return {
            ...state,
            startDate: action.startDate,
            subjectForm: {
                firstName: '',
                lastName: '',
                birthDate: null,
                birthPlace: null,
                fiscalCode: '',
                subjectCode: '',
                businessName: '',
                vatNumber: '',
                identificationCode: ''
            },
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedToponym: null,
            selectedImmType: null,
            hasSubmitedSearch: false
        };
    case CATASTO_OPEN_END_DATE_SELECTED:
        return {
            ...state,
            endDate: action.endDate,
            subjectForm: {
                firstName: '',
                lastName: '',
                birthDate: null,
                birthPlace: null,
                fiscalCode: '',
                subjectCode: '',
                businessName: '',
                vatNumber: '',
                identificationCode: ''
            },
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedToponym: null,
            selectedImmType: null,
            hasSubmitedSearch: false
        };
    case CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO:
        return {
            ...state,
            isLoadingToponym: true
        };
    case CATASTO_OPEN_IMMOBILE_LOADED_TOPONIMO:
        return {
            ...state,
            toponyms: action.toponyms,
            isLoadingToponym: false
        };
    case CATASTO_OPEN_IMMOBILE_SELECT_TOPONIMO:
        return {
            ...state,
            selectedToponym: action.toponym
        };
    case CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS:
        return {
            ...state,
            isLoadingAddress: true
        };
    case CATASTO_OPEN_IMMOBILE_LOADED_ADDRESS:
        return {
            ...state,
            addresses: action.addresses,
            isLoadingAddress: false
        };
    case CATASTO_OPEN_IMMOBILE_SELECT_ADDRESS:
        return {
            ...state,
            selectedAddress: action.address,
            isLoadingAddress: false
        };
    case CATASTO_OPEN_IMMOBILE_SET_NCIVICO:
        return {
            ...state,
            houseNumber: action.houseNumber,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            hasSubmitedSearch: false,
            isLoadingAddress: false
        };
    case CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH:
        return {
            ...state,
            hasSubmitedSearch: true,
            isLoadingLands: true,
            isLoadingBuildings: true
        };
    case CATASTO_OPEN_IMMOBILE_SELECT_TYPE:
        return {
            ...state,
            selectedImmType: action.immobileType,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            hasSubmitedSearch: false
        };
    case CATASTO_OPEN_IMMOBILE_SET_CODICE:
        return {
            ...state,
            immobileCode: action.immobileCode,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            hasSubmitedSearch: false
        };
    case CATASTO_OPEN_SET_PRINT_ENDPOINT:
        const doweHavePrint = action.printEndPoint !== "" ? true : false;
        return {
            ...state,
            printEndPoint: action.printEndPoint,
            doweHavePrint
        };
    case CATASTO_OPEN_SET_PRINT_PATH_W_PARAMS:
        if (action?.printObj.pathName === printPathLegalSubject || action?.printObj.pathName === printPathNaturalSubject) {
            return {
                ...state,
                printObj: action.printObj,
                previousPrintObj: action.printObj
            };
        }
        return {
            ...state,
            printObj: action.printObj
        };
    case CATASTO_OPEN_SET_FIXED_COMUNI:
        return {
            ...state,
            fixedComuni: action.fixedComuni
        };
    case CATASTO_OPEN_START_DOWNLOAD_VISURA:
        return action.fileType === "pdf" ?
            {
                ...state,
                isStartedDownloadVisuraPdf: true
            } :
            {
                ...state,
                isStartedDownloadVisuraCsv: true
            };
    case CATASTO_OPEN_END_DOWNLOAD_VISURA:
        return action.fileType === "pdf" ?
            {
                ...state,
                isStartedDownloadVisuraPdf: false
            } :
            {
                ...state,
                isStartedDownloadVisuraCsv: false
            };
    case CATASTO_OPEN_ERROR_DOWNLOAD_VISURA:
        return action.fileType === "pdf" ?
            {
                ...state,
                errorDownloadMsg: action.errorMsg,
                isStartedDownloadVisuraPdf: false
            } :
            {
                ...state,
                errorDownloadMsg: action.errorMsg,
                isStartedDownloadVisuraPdf: false
            };
    case CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE:
        return action.fileType === "pdf" ?
            {
                ...state,
                isStartedDownloadListaImmPdf: true,
                errorDownloadListaMsg: null
            } :
            {
                ...state,
                isStartedDownloadListaImmCsv: true,
                errorDownloadListaMsg: null
            };
    case CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE:
        const fileType = action.printObj?.fileType;
        return fileType === "pdf" ?
            {
                ...state,
                isStartedDownloadListaImmPdf: false
            } :
            {
                ...state,
                isStartedDownloadListaImmCsv: false
            };
    case CATASTO_OPEN_ERROR_DOWNLOAD_LISTA_IMMOBILE:
        return action.fileType === "pdf" ?
            {
                ...state,
                isStartedDownloadListaImmPdf: false,
                errorDownloadListaMsg: action.errorMsg
            } :
            {
                ...state,
                isStartedDownloadListaImmCsv: false,
                errorDownloadListaMsg: action.errorMsg
            };
    case CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA:
        return {
            ...state,
            startDownloadVisuraImSingola: true
        };
    case CATASTO_OPEN_WE_ARE_DONE_DOWNLOADING_VISURA_IM_SINGOLA:
        return {
            ...state,
            startDownloadVisuraImSingola: false
        };
    case CATASTO_OPEN_ERROR_DOWNLOAD_VISURA_IM_SINGOLA:
        return {
            ...state,
            startDownloadVisuraImSingola: false
        };
    case CATASTO_OPEN_TAB_SELECT:
        return {
            ...state,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedTab: action.key
        };
    case CATASTO_OPEN_INIT_BASE_LAYERS:
        return {
            ...state,
            initBaseLayers: action.baseLayers,
            trackedBaselayers: []
        };
    case CATASTO_OPEN_SET_BASE_LAYERS:
        return {
            ...state,
            baseLayers: action.baseLayers
        };
    case CATASTO_OPEN_BASE_LAYERS_ERROR:
        return {
            ...state,
            baseLayersError: action.errorMsg,
            trackedBaselayers: []
        };
    case CATASTO_OPEN_TRACK_BASE_LAYERS:
        const trackedBaselayers = state.trackedBaselayers || [];
        if (!trackedBaselayers.includes(action.layerID)) {
            return {
                ...state,
                trackedBaselayers: [...trackedBaselayers, action.layerID]
            };
        }
        return state;
    case CATASTO_OPEN_BTN_FAB_CLICKED:
        const isFabClicked = state.fabClicked || false;
        return {
            ...state,
            fabClicked: !isFabClicked,
            terClicked: false,
            selectedFabLayers: [],
            selectedTerLayers: [],
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            detailsType: "F"
        };
    case CATASTO_OPEN_BTN_TER_CLICKED:
        const isTerClicked = state.terClicked || false;
        return {
            ...state,
            terClicked: !isTerClicked,
            fabClicked: false,
            selectedFabLayers: [],
            selectedTerLayers: [],
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            detailsType: "T"
        };
    case CATASTO_OPEN_EXPLORE_ENABLE:
        return {
            ...state,
            exploreEnabled: action.enabled
        };
    case CATASTO_OPEN_SELECTION_APPEND_LAYER:
        const newID = action.layer.id;
        const layerType = action.layerType;
        if (layerType === "fab") {
            const actualSelectedFabLayers = state?.selectedFabLayers || [];
            let updatedLayers;
            const doesExist = doesIDExists(actualSelectedFabLayers, newID);
            if (doesExist) {
                updatedLayers = actualSelectedFabLayers.filter(layer => layer.id !== newID);
            } else {
                updatedLayers = [...actualSelectedFabLayers, action.layer];
            }
            return {
                ...state,
                selectedFabLayers: updatedLayers,
                searchResults: null,
                searchResultType: null,
                loadedResults: false
            };
        }
        const _actualSelectedTerLayers = state?.selectedTerLayers || [];
        let updatedLayers;
        const doesExist = doesIDExists(_actualSelectedTerLayers, newID);
        if (doesExist) {
            updatedLayers = _actualSelectedTerLayers.filter(layer => layer.id !== newID);
        } else {
            updatedLayers = [..._actualSelectedTerLayers, action.layer];
        }
        return {
            ...state,
            selectedTerLayers: updatedLayers,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        };
    case CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER:
        let actualSelectedFabLayers = state?.selectedFabLayers || [];
        return {
            ...state,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedFabLayers: actualSelectedFabLayers.filter(layer => layer.id !== action.layerID)
        };
    case CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER:
        let actualSelectedTerLayers = state?.selectedTerLayers || [];
        return {
            ...state,
            searchResults: null,
            searchResultType: null,
            loadedResults: false,
            selectedTerLayers: actualSelectedTerLayers.filter(layer => layer.id !== action.layerID)
        };
    case CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true,
            searchResults: action?.detailsAppended,
            searchResultType: buildingDetailLayer
        };
    case CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED:
        return {
            ...state,
            loadingResults: false,
            loadedResults: true,
            searchResults: action?.detailsAppended,
            searchResultType: landDetailLayer
        };
    case CATASTO_OPEN_SELECTION_ON_LOAD_DETAILS:
        return {
            ...state,
            loadingResults: action.status,
            loadedResults: !action.status,
            searchResults: null,
            searchResultType: null
        };
    case CATASTO_OPEN_SELECTION_EXPLORE_CANCEL:
        return {
            ...state,
            terClicked: false,
            fabClicked: false,
            selectedFabLayers: [],
            selectedTerLayers: [],
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        };
    default:
        return state;
    }
}
