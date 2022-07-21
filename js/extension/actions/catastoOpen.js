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
export const CATASTO_OPEN_LOAD_ERROR = 'CATASTO_OPEN:LOAD_ERROR';
export const CATASTO_OPEN_SELECT_SERVICE = 'CATASTO_OPEN:SELECT_SERVICE';
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
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_FIRST_NAME = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_FIRST_NAME';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_LAST_NAME = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_LAST_NAME';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_FISCAL_CODE = 'CATASTO_OPEN:UPDATE_SUBJECT_FISCAL_CODE';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_VAT_NUMBER = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_VAT_NUMBER';
export const CATASTO_OPEN_UPDATE_SUBJECT_FORM_BUSINESS_NAME = 'CATASTO_OPEN:UPDATE_SUBJECT_FORM_BUSINESS_NAME';
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

export function loadError(error) {
    return {
        type: CATASTO_OPEN_LOAD_ERROR,
        error
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

export function updateSubjectFormFirstName(firstName) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_FIRST_NAME,
        firstName
    };
}

export function updateSubjectFormLastName(lastName) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_LAST_NAME,
        lastName
    };
}

export function updateSubjectFormFiscalCode(fiscalCode) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_FISCAL_CODE,
        fiscalCode
    };
}

export function updateSubjectFormVatNumber(vatNumber) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_VAT_NUMBER,
        vatNumber
    };
}

export function updateSubjectFormBusinessName(businessName) {
    return {
        type: CATASTO_OPEN_UPDATE_SUBJECT_FORM_BUSINESS_NAME,
        businessName
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
