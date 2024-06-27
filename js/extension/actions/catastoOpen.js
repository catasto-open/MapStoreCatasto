import {
    buildingDetailParser,
    cityParser,
    geomFeatureParser, landDetailParser, propertyOwnerParser,
    sectionParser,
    services,
    subjectParser, subjectPropertyParser
} from "@js/extension/utils/catastoOpen";

export const CATASTO_OPEN_ACTIVATE_PANEL = 'CATASTO_OPEN:ACTIVATE_PANEL';
export const CATASTO_OPEN_DEACTIVATE_PANEL = 'CATASTO_OPEN:DEACTIVATE_PANEL';
export const CATASTO_OPEN_REDUCED_PANEL = 'CATASTO_OPEN:REDUCED_PANEL';
export const CATASTO_OPEN_LOAD_ERROR = 'CATASTO_OPEN:LOAD_ERROR';
export const CATASTO_OPEN_SET_MESSAGE_FOR_USER = 'CATASTO_OPEN:SET_MESSAGE_FOR_USER';
export const CATASTO_OPEN_SELECT_SERVICE = 'CATASTO_OPEN:SELECT_SERVICE';
export const CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE = 'CATASTO_OPEN:SELECT_SEARCH_IMM_TYPE';
export const CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS = 'CATASTO_OPEN:RESUME_PREVIOUS_SEARCH_RESULTS';
export const CATASTO_OPEN_RELOAD_SEARCH_RESULTS = 'CATASTO_OPEN:UPDATE_RELOAD_RESULTS';
export const CATASTO_OPEN_RELOADED_SEARCH_RESULTS = 'CATASTO_OPEN:UPDATE_RELOADED_RESULTS';
export const CATASTO_OPEN_SELECT_CITY = 'CATASTO_OPEN:SELECT_CITY';
export const CATASTO_OPEN_LOAD_CITY_DATA = 'CATASTO_OPEN:LOAD_CITY_DATA';
export const CATASTO_OPEN_LOADED_CITY_DATA = 'CATASTO_OPEN:LOADED_CITY_DATA';
export const CATASTO_OPEN_SELECT_SECTION = 'CATASTO_OPEN:SELECT_SECTION';
export const CATASTO_OPEN_LOAD_SECTION_DATA = 'CATASTO_OPEN:LOAD_SECTION_DATA';
export const CATASTO_OPEN_LOADED_SECTION_DATA = 'CATASTO_OPEN:LOADED_SECTION_DATA';
export const CATASTO_OPEN_SELECT_SHEET = 'CATASTO_OPEN:SELECT_SHEET';
export const CATASTO_OPEN_LOAD_SHEET_DATA = 'CATASTO_OPEN:LOAD_SHEET_DATA';
export const CATASTO_OPEN_LOADED_SHEET_DATA = 'CATASTO_OPEN:LOADED_SHEET_DATA';
export const CATASTO_OPEN_SELECT_LAND = 'CATASTO_OPEN:SELECT_LAND';
export const CATASTO_OPEN_LOAD_LAND_DATA = 'CATASTO_OPEN:LOAD_LAND_DATA';
export const CATASTO_OPEN_LOADED_LAND_DATA = 'CATASTO_OPEN:LOADED_LAND_DATA';
export const CATASTO_OPEN_SELECT_BUILDING = 'CATASTO_OPEN:SELECT_BUILDING';
export const CATASTO_OPEN_LOAD_BUILDING_DATA = 'CATASTO_OPEN:LOAD_BUILDING_DATA';
export const CATASTO_OPEN_LOADED_BUILDING_DATA = 'CATASTO_OPEN:LOADED_BUILDING_DATA';
export const CATASTO_OPEN_SELECT_SUBJECT_FILTER = 'CATASTO_OPEN:SELECT_SUBJECT_FILTER';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_TYPE = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_TYPE';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_LOAD_TOWN';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_TOWN = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_LOADED_TOWN';
export const CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA = 'CATASTO_OPEN:LOAD_NATURAL_SUBJECT_DATA';
export const CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA = 'CATASTO_OPEN:LOAD_LEGAL_SUBJECT_DATA';
export const CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA = 'CATASTO_OPEN:LOAD_SUBJECT_PROPERTY_DATA';
export const CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA = 'CATASTO_OPEN:LOADED_SUBJECT_PROPERTY_DATA';
export const CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA = 'CATASTO_OPEN:LOADED_NATURAL_SUBJECT_DATA';
export const CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA = 'CATASTO_OPEN:LOADED_LEGAL_SUBJECT_DATA';
export const CATASTO_OPEN_ADD_LAYER = 'CATASTO_OPEN:ADD_LAYER';
export const CATASTO_OPEN_LOAD_LAYER = 'CATASTO_OPEN:LOAD_LAYER';
export const CATASTO_OPEN_REMOVE_LAYER = 'CATASTO_OPEN:REMOVE_LAYER';
export const CATASTO_OPEN_LOAD_LAND_DETAIL_DATA = 'CATASTO_OPEN:LOAD_LAND_DETAIL_DATA';
export const CATASTO_OPEN_LOADED_LAND_DETAIL_DATA = 'CATASTO_OPEN:LOADED_LAND_DETAIL_DATA';
export const CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA = 'CATASTO_OPEN:LOAD_BUILDING_DETAIL_DATA';
export const CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA = 'CATASTO_OPEN:LOADED_BUILDING_DETAIL_DATA';
export const CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA = 'CATASTO_OPEN:LOAD_PROPERTY_OWNER_DATA';
export const CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA = 'CATASTO_OPEN:LOADED_PROPERTY_OWNER_DATA';
export const CATASTO_OPEN_SET_BACKEND = 'CATASTO_OPEN:SET_BACKEND';
export const CATASTO_OPEN_TEMPORAL_SEARCH_CHECKED = 'CATASTO_OPEN:TEMPORAL_SEARCH_CHECKED';
export const CATASTO_OPEN_HISTORICAL_SEARCH_CHECKED = 'CATASTO_OPEN:HISTORICAL_SEARCH_CHECKED';
export const CATASTO_OPEN_START_DATE_SELECTED = 'CATASTO_OPEN:START_DATE_SELECTED';
export const CATASTO_OPEN_END_DATE_SELECTED = 'CATASTO_OPEN:END_DATE_SELECTED';
export const CATASTO_OPEN_IMMOBILE_SELECT_TOPONIMO = 'CATASTO_OPEN:IMMOBILE_SELECT_TOPONIMO';
export const CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO = 'CATASTO_OPEN:IMMOBILE_LOAD_TOPONIMO';
export const CATASTO_OPEN_IMMOBILE_LOADED_TOPONIMO = 'CATASTO_OPEN:IMMOBILE_LOADED_TOPONIMO';
export const CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS = 'CATASTO_OPEN:IMMOBILE_LOAD_ADDRESS';
export const CATASTO_OPEN_IMMOBILE_LOADED_ADDRESS = 'CATASTO_OPEN:IMMOBILE_LOADED_ADDRESS';
export const CATASTO_OPEN_IMMOBILE_SELECT_ADDRESS = 'CATASTO_OPEN:IMMOBILE_SELECT_ADDRESS';
export const CATASTO_OPEN_IMMOBILE_SET_NCIVICO = 'CATASTO_OPEN:IMMOBILE_SET_NCIVICO';
export const CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH = 'CATASTO_OPEN:IMMOBILE_SUBMIT_SEARCH';
export const CATASTO_OPEN_IMMOBILE_SELECT_TYPE = 'CATASTO_OPEN:IMMOBILE_SELECT_TYPE';
export const CATASTO_OPEN_IMMOBILE_SET_CODICE = 'CATASTO_OPEN:IMMOBILE_SET_CODICE';
export const CATASTO_OPEN_SET_PRINT_ENDPOINT = 'CATASTO_OPEN:SET_PRINT_ENDPOINT';
export const CATASTO_OPEN_SET_PRINT_PATH_W_PARAMS = 'CATASTO_OPEN:SET_PRINT_PATH_W_PARAMS';
export const CATASTO_OPEN_SET_FIXED_COMUNI = 'CATASTO_OPEN:SET_FIXED_COMUNI';
export const CATASTO_OPEN_START_DOWNLOAD_VISURA = 'CATASTO_OPEN:START_DOWNLOAD_VISURA';
export const CATASTO_OPEN_END_DOWNLOAD_VISURA = 'CATASTO_OPEN:END_DOWNLOAD_VISURA';
export const CATASTO_OPEN_ERROR_DOWNLOAD_VISURA = 'CATASTO_OPEN:ERROR_DOWNLOAD_VISURA';
export const CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA = 'CATASTO_OPEN:START_DOWNLOAD_VISURA_IM_SINGOLA';
export const CATASTO_OPEN_END_DOWNLOAD_VISURA_IM_SINGOLA = 'CATASTO_OPEN:END_DOWNLOAD_VISURA_IM_SINGOLA';
export const CATASTO_OPEN_ERROR_DOWNLOAD_VISURA_IM_SINGOLA = 'CATASTO_OPEN:ERROR_DOWNLOAD_VISURA_IM_SINGOLA';
export const CATASTO_OPEN_WE_ARE_DONE_DOWNLOADING_VISURA_IM_SINGOLA = 'CATASTO_OPEN:WE_ARE_DONE_DOWNLOADING_VISURA_IM_SINGOLA';

export const CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE = 'CATASTO_OPEN:START_DOWNLOAD_LISTA_IMMOBILE';
export const CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE = 'CATASTO_OPEN:END_DOWNLOAD_LISTA_IMMOBILE';
export const CATASTO_OPEN_ERROR_DOWNLOAD_LISTA_IMMOBILE = 'CATASTO_OPEN:ERROR_DOWNLOAD_LISTA_IMMOBILE';

export const CATASTO_OPEN_INIT_BASE_LAYERS = 'CATASTO_OPEN:INIT_BASE_LAYERS';
export const CATASTO_OPEN_TAB_SELECT = 'CATASTO_OPEN:TAB_SELECT';
export const CATASTO_OPEN_EXPLORE_ENABLE = 'CATASTO_OPEN:EXPLORE_ENABLE';
export const CATASTO_OPEN_CHECK_BASE_LAYERS = 'CATASTO_OPEN:CHECK_BASE_LAYERS';
export const CATASTO_OPEN_SHOW_BASE_LAYERS = 'CATASTO_OPEN:SHOW_BASE_LAYERS';
export const CATASTO_OPEN_SET_BASE_LAYERS = 'CATASTO_OPEN:SET_BASE_LAYERS';
export const CATASTO_OPEN_BASE_LAYERS_ERROR = 'CATASTO_OPEN:BASE_LAYERS_ERROR';
export const CATASTO_OPEN_TRACK_BASE_LAYERS = 'CATASTO_OPEN:TRACK_BASE_LAYERS';
export const CATASTO_OPEN_REMOVE_BASE_LAYERS = 'CATASTO_OPEN:REMOVE_BASE_LAYERS';
export const CATASTO_OPEN_BTN_FAB_CLICKED = 'CATASTO_OPEN:BTN_FAB_CLICKED';
export const CATASTO_OPEN_BTN_TER_CLICKED = 'CATASTO_OPEN:BTN_TER_CLICKED';
export const CATASTO_OPEN_LOAD_FAB_FEAT = 'CATASTO_OPEN:LOAD_FAB_FEAT';
export const CATASTO_OPEN_FAB_FEAT_LOADED = 'CATASTO_OPEN:FAB_FEAT_LOADED';
export const CATASTO_OPEN_FAB_FEAT_POST_PROCESS = 'CATASTO_OPEN:FAB_FEAT_POST_PROCESS';
export const CATASTO_OPEN_SELECTION_FAB_DETAIL_LOAD = 'CATASTO_OPEN:SELECTION_FAB_DETAIL_LOAD';
export const CATASTO_OPEN_FAB_DETAIL_LOAD_START = 'CATASTO_OPEN:FAB_DETAIL_LOAD_START';
export const CATASTO_OPEN_LOAD_TER_FEAT = 'CATASTO_OPEN:LOAD_TER_FEAT';
export const CATASTO_OPEN_TER_FEAT_LOADED = 'CATASTO_OPEN:TER_FEAT_LOADED';
export const CATASTO_OPEN_SELECTION_TER_DETAIL_LOAD = 'CATASTO_OPEN:SELECTION_TER_DETAIL_LOAD';
export const CATASTO_OPEN_TER_DETAIL_LOAD_START = 'CATASTO_OPEN:TER_DETAIL_LOAD_START';
export const CATASTO_OPEN_SELECTION_CREATE_GROUP = 'CATASTO_OPEN:SELECTION_CREATE_GROUP';
export const CATASTO_OPEN_SELECTION_CLEAN_GROUP = 'CATASTO_OPEN:SELECTION_CLEAN_GROUP';
export const CATASTO_OPEN_SELECTION_APPEND_LAYER = 'CATASTO_OPEN:SELECTION_APPEND_LAYER';
export const CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER = 'CATASTO_OPEN:SELECTION_REMOVE_FAB_LAYER';
export const CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER = 'CATASTO_OPEN:SELECTION_REMOVE_TER_LAYER';
export const CATASTO_OPEN_FAB_DETAIL_RESULTS_APPEND = 'CATASTO_OPEN:FAB_DETAIL_RESULTS_APPEND';
export const CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED = 'CATASTO_OPEN:FAB_DETAIL_RESULTS_APPENDED';
export const CATASTO_OPEN_TER_DETAIL_RESULTS_APPEND = 'CATASTO_OPEN:TER_DETAIL_RESULTS_APPEND';
export const CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED = 'CATASTO_OPEN:TER_DETAIL_RESULTS_APPENDED';
export const CATASTO_OPEN_SELECTION_ON_LOAD_DETAILS = 'CATASTO_OPEN:SELECTION_ON_LOAD_DETAILS';
export const CATASTO_OPEN_SELECTION_EXPLORE_CANCEL = 'CATASTO_OPEN:SELECTION_EXPLORE_CANCEL';

export function activateCatastoOpenPanel() {
    return {
        type: CATASTO_OPEN_ACTIVATE_PANEL
    };
}

export function deactivateCatastoOpenPanel() {
    return {
        type: CATASTO_OPEN_DEACTIVATE_PANEL
    };
}

export function reduceCatastoOpenPanel() {
    return {
        type: CATASTO_OPEN_REDUCED_PANEL
    };
}

export function loadError(error) {
    return {
        type: CATASTO_OPEN_LOAD_ERROR,
        error
    };
}

export function setMessageForUser(messageForUser) {
    return {
        type: CATASTO_OPEN_SET_MESSAGE_FOR_USER,
        messageForUser
    };
}

export function loadLayer(layer) {
    return {
        type: CATASTO_OPEN_LOAD_LAYER,
        layer
    };
}

export function addLayerToMap(layer) {
    return {
        type: CATASTO_OPEN_ADD_LAYER,
        layer
    };
}

export function removeLayerFromMap() {
    return {
        type: CATASTO_OPEN_REMOVE_LAYER
    };
}

export function resumePreviousSearchResults() {
    return {
        type: CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS
    };
}

export function reloadSearchResults() {
    return {
        type: CATASTO_OPEN_RELOAD_SEARCH_RESULTS
    };
}


export function reloadedSearchResults() {
    return {
        type: CATASTO_OPEN_RELOADED_SEARCH_RESULTS
    };
}

export function selectService(service) {
    return {
        type: CATASTO_OPEN_SELECT_SERVICE,
        service
    };
}

export function selectSearchImmobileType(serviceImmType) {
    return {
        type: CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE,
        serviceImmType
    };
}

export function selectCity(city) {
    return {
        type: CATASTO_OPEN_SELECT_CITY,
        city
    };
}

export function loadCityData(citySearchTxt) {
    return {
        type: CATASTO_OPEN_LOAD_CITY_DATA,
        citySearchTxt
    };
}

export function loadedCityData(payload) {
    const cities = payload.features.map((feature) => (cityParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_CITY_DATA,
        cities
    };
}

export function selectSection(section) {
    return {
        type: CATASTO_OPEN_SELECT_SECTION,
        section
    };
}

export function loadSectionData(cityCode) {
    return {
        type: CATASTO_OPEN_LOAD_SECTION_DATA,
        cityCode
    };
}

export function loadedSectionData(payload) {
    const sections = payload.features.map((feature) => (sectionParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_SECTION_DATA,
        sections
    };
}

export function selectSheet(sheet) {
    return {
        type: CATASTO_OPEN_SELECT_SHEET,
        sheet
    };
}

export function loadSheetData(cityCode) {
    return {
        type: CATASTO_OPEN_LOAD_SHEET_DATA,
        cityCode
    };
}

export function loadedSheetData(payload) {
    const sheets = payload.features.map((feature) => (geomFeatureParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_SHEET_DATA,
        sheets
    };
}

export function selectLand(land) {
    return {
        type: CATASTO_OPEN_SELECT_LAND,
        land
    };
}

export function loadLandData(cityCode, sheetNumber) {
    return {
        type: CATASTO_OPEN_LOAD_LAND_DATA,
        cityCode,
        sheetNumber
    };
}

export function loadedLandData(payload) {
    const lands = payload.features.map((feature) => (geomFeatureParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_LAND_DATA,
        lands
    };
}

export function selectBuilding(building) {
    return {
        type: CATASTO_OPEN_SELECT_BUILDING,
        building
    };
}

export function loadBuildingData(cityCode, sheetNumber) {
    return {
        type: CATASTO_OPEN_LOAD_BUILDING_DATA,
        cityCode,
        sheetNumber
    };
}

export function loadedBuildingData(payload) {
    const buildings = payload.features.map((feature) => (geomFeatureParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_BUILDING_DATA,
        buildings
    };
}

export function selectSubjectFilter(filter) {
    return {
        type: CATASTO_OPEN_SELECT_SUBJECT_FILTER,
        filter
    };
}

export function updateSubjectFormType(subjectType) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_TYPE,
        subjectType
    };
}

export function updateSubjectForm(field, value) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM,
        payload: {field, value}
    };
}

export function updateSubjectFormLoadTown(birthPlaceTxt) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN,
        birthPlaceTxt
    };
}

export function updateSubjectFormLoadedTown(payload) {
    const towns = payload.features.map((feature) => (cityParser(feature)));
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_TOWN,
        towns
    };
}

export function loadSubjectData(subjectForm) {
    const subjectType = subjectForm?.type;
    switch (subjectType) {
    case services[1].id:
        return {
            type: CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA,
            subjectForm
        };
    case services[2].id:
        return {
            type: CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA,
            subjectForm
        };
    default:
        return {};
    }
}

export function loadedNaturalSubjectData(payload) {
    const features = payload?.features || [];
    const naturalSubjects = features.map((feature) => (subjectParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA,
        naturalSubjects
    };
}

export function loadedLegalSubjectData(payload) {
    const features = payload?.features || [];
    const legalSubjects = features.map((feature) => (subjectParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA,
        legalSubjects
    };
}

export function loadSubjectPropertyData(subject) {
    return {
        type: CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA,
        subject
    };
}

export function loadedSubjectPropertyData(payload) {
    const subjectProperties = payload.features.map((feature) => (subjectPropertyParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA,
        subjectProperties
    };
}

export function loadLandDetailData() {
    return {
        type: CATASTO_OPEN_LOAD_LAND_DETAIL_DATA
    };
}

export function loadedLandDetailData(payload) {
    const landDetails = payload.features.map((feature) => (landDetailParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_LAND_DETAIL_DATA,
        landDetails
    };
}

export function loadBuildingDetailData() {
    return {
        type: CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA
    };
}

export function loadedBuildingDetailData(payload) {
    const buildingDetails = payload.features.map((feature) => (buildingDetailParser(feature)));
    return {
        type: CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA,
        buildingDetails
    };
}

export function loadPropertyOwnerData(property) {
    return {
        type: CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA,
        property
    };
}

export function loadedPropertyOwnerData(payload, propertyType) {
    const propertyOwners = payload.features.map((feature) => (propertyOwnerParser(feature)));
    propertyOwners.propertyType = propertyType;
    return {
        type: CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA,
        propertyOwners
    };
}

export function setBackend(backend) {
    return {
        type: CATASTO_OPEN_SET_BACKEND,
        backend
    };
}

export function onChangeTemporalSearchCheckbox(isTemporalSearchChecked) {
    return {
        type: CATASTO_OPEN_TEMPORAL_SEARCH_CHECKED,
        isTemporalSearchChecked
    };
}

export function onChangeHistoricalSearchCheckbox(isHistoricalSearchChecked) {
    return {
        type: CATASTO_OPEN_HISTORICAL_SEARCH_CHECKED,
        isHistoricalSearchChecked
    };
}

export function startDateSelected(startDate) {
    return {
        type: CATASTO_OPEN_START_DATE_SELECTED,
        startDate
    };
}

export function endDateSelected(endDate) {
    return {
        type: CATASTO_OPEN_END_DATE_SELECTED,
        endDate
    };
}

export function selectToponym(toponym) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SELECT_TOPONIMO,
        toponym
    };
}

export function loadToponym(toponymTxt) {
    return {
        type: CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO,
        toponymTxt
    };
}

export function loadedToponym(payload) {
    const toponyms = payload.features.map((item) => (item.properties));
    return {
        type: CATASTO_OPEN_IMMOBILE_LOADED_TOPONIMO,
        toponyms
    };
}

export function loadAddress(addressTxt) {
    return {
        type: CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS,
        addressTxt
    };
}

export function loadedAddress(payload) {
    const addresses = payload.features.map((item) => (item.properties));
    return {
        type: CATASTO_OPEN_IMMOBILE_LOADED_ADDRESS,
        addresses
    };
}

export function selectAddress(address) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SELECT_ADDRESS,
        address
    };
}

export function setHouseNumber(houseNumber) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SET_NCIVICO,
        houseNumber
    };
}

export function submitSearch(filterType) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH,
        filterType
    };
}

export function selectImmType(immobileType) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SELECT_TYPE,
        immobileType
    };
}

export function setImmCode(immobileCode) {
    return {
        type: CATASTO_OPEN_IMMOBILE_SET_CODICE,
        immobileCode
    };
}

export function setPrintEndPoint(printEndPoint) {
    return {
        type: CATASTO_OPEN_SET_PRINT_ENDPOINT,
        printEndPoint
    };
}

export function setPrintPathWParams(printObj) {
    return {
        type: CATASTO_OPEN_SET_PRINT_PATH_W_PARAMS,
        printObj
    };
}

export function setFixedComuni(fixedComuni) {
    return {
        type: CATASTO_OPEN_SET_FIXED_COMUNI,
        fixedComuni
    };
}

export function startDownloadVisura(fileType) {
    return {
        type: CATASTO_OPEN_START_DOWNLOAD_VISURA,
        fileType
    };
}

export function endDownloadVisura(fileType, blob, printObj) {
    return {
        type: CATASTO_OPEN_END_DOWNLOAD_VISURA,
        fileType,
        blob,
        printObj
    };
}

export function errorDownloadVisura(fileType, errorMsg) {
    return {
        type: CATASTO_OPEN_ERROR_DOWNLOAD_VISURA,
        fileType,
        errorMsg
    };
}

export function startDownloadListaImmobile(fileType) {
    return {
        type: CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE,
        fileType
    };
}

export function endDownloadListaImmobile(printObj, blob) {
    return {
        type: CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE,
        printObj,
        blob
    };
}

export function errorDownloadListaImmobile(fileType, errorMsg) {
    return {
        type: CATASTO_OPEN_ERROR_DOWNLOAD_LISTA_IMMOBILE,
        fileType,
        errorMsg
    };
}

export function startDownloadVisuraImSingola(immobile, propertyType) {
    return {
        type: CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA,
        immobile,
        propertyType
    };
}

export function endDownloadVisuraImSingole(blob) {
    return {
        type: CATASTO_OPEN_END_DOWNLOAD_VISURA_IM_SINGOLA,
        blob
    };
}

export function errorDownloadVisuraImSingole(errorMsg) {
    return {
        type: CATASTO_OPEN_ERROR_DOWNLOAD_VISURA_IM_SINGOLA,
        errorMsg
    };
}

export function weAreDoneDownloadingVisuraImSingola() {
    return {
        type: CATASTO_OPEN_WE_ARE_DONE_DOWNLOADING_VISURA_IM_SINGOLA
    };
}

export function onInitBaseLayers(baseLayers) {
    return {
        type: CATASTO_OPEN_INIT_BASE_LAYERS,
        baseLayers
    };
}

export function onTabSelect(key) {
    return {
        type: CATASTO_OPEN_TAB_SELECT,
        key
    };
}

export function onEnableExplore(enabled) {
    return {
        type: CATASTO_OPEN_EXPLORE_ENABLE,
        enabled
    };
}

export function checkBaseLayers() {
    return {
        type: CATASTO_OPEN_CHECK_BASE_LAYERS
    };
}

export function showBaseLayers(layerName, geoserverUrl, isFab = false) {
    return {
        type: CATASTO_OPEN_SHOW_BASE_LAYERS,
        layerName,
        geoserverUrl,
        isFab
    };
}

export function setBaseLayers(baseLayers) {
    return {
        type: CATASTO_OPEN_SET_BASE_LAYERS,
        baseLayers
    };
}

export function gotErrorBaseLayers(errorMsg) {
    return {
        type: CATASTO_OPEN_BASE_LAYERS_ERROR,
        errorMsg
    };
}

export function onRemoveBaseLayers() {
    return {
        type: CATASTO_OPEN_REMOVE_BASE_LAYERS
    };
}

export function onTrackBaseLayers(layerID) {
    return {
        type: CATASTO_OPEN_TRACK_BASE_LAYERS,
        layerID
    };
}

export function onFabBtnClicked() {
    return {
        type: CATASTO_OPEN_BTN_FAB_CLICKED
    };
}

export function onTerBtnClicked() {
    return {
        type: CATASTO_OPEN_BTN_TER_CLICKED
    };
}

export function onLoadFabFeat(lat, lng) {
    return {
        type: CATASTO_OPEN_LOAD_FAB_FEAT,
        lat,
        lng
    };
}

export function onFabFeatLoaded(payload) {
    return {
        type: CATASTO_OPEN_FAB_FEAT_LOADED,
        payload
    };
}

export function onFabFeatPostProcess(payload) {
    return {
        type: CATASTO_OPEN_FAB_FEAT_POST_PROCESS,
        payload
    };
}

export function onFabSelectionLoadDetail() {
    return {
        type: CATASTO_OPEN_SELECTION_FAB_DETAIL_LOAD
    };
}

export function onStartLoadFabDetail(extras) {
    return {
        type: CATASTO_OPEN_FAB_DETAIL_LOAD_START,
        extras
    };
}

export function onLoadTerFeat(lat, lng) {
    return {
        type: CATASTO_OPEN_LOAD_TER_FEAT,
        lat,
        lng
    };
}

export function onTerFeatLoaded(payload) {
    return {
        type: CATASTO_OPEN_TER_FEAT_LOADED,
        payload
    };
}

export function onTerSelectionLoadDetail() {
    return {
        type: CATASTO_OPEN_SELECTION_TER_DETAIL_LOAD
    };
}

export function onStartLoadTerDetail(extras) {
    return {
        type: CATASTO_OPEN_TER_DETAIL_LOAD_START,
        extras
    };
}

export function selectionCreateGroup() {
    return {
        type: CATASTO_OPEN_SELECTION_CREATE_GROUP
    };
}

export function selectionCleanGroup() {
    return {
        type: CATASTO_OPEN_SELECTION_CLEAN_GROUP
    };
}

export function selectionAppendLayer(layer, layerType) {
    return {
        type: CATASTO_OPEN_SELECTION_APPEND_LAYER,
        layer,
        layerType
    };
}

export function onRemoveFabLayer(layerID) {
    return {
        type: CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER,
        layerID
    };
}

export function onRemoveTerLayer(layerID) {
    return {
        type: CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER,
        layerID
    };
}

export function onFabDetailsAppend(payload) {
    return {
        type: CATASTO_OPEN_FAB_DETAIL_RESULTS_APPEND,
        payload
    };
}

export function onFabDetailsAppended(detailsAppended) {
    return {
        type: CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED,
        detailsAppended
    };
}

export function onTerDetailsAppend(payload) {
    return {
        type: CATASTO_OPEN_TER_DETAIL_RESULTS_APPEND,
        payload
    };
}

export function onTerDetailsAppended(detailsAppended) {
    return {
        type: CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED,
        detailsAppended
    };
}

export function onLoadDetails(status) {
    return {
        type: CATASTO_OPEN_SELECTION_ON_LOAD_DETAILS,
        status
    };
}

export function onSelectionExploreCancel() {
    return {
        type: CATASTO_OPEN_SELECTION_EXPLORE_CANCEL
    };
}
