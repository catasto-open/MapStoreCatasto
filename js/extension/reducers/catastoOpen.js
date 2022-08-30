import {
    CATASTO_OPEN_SELECT_SERVICE,
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
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_FIRST_NAME,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LAST_NAME,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_BIRTH_DATE,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_LUOGO,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_LUOGO,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_SELECT_BIRTH_PLACE,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_FISCAL_CODE,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_SUBJECT_CODE,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_VAT_NUMBER,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_BUSINESS_NAME,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_ID_CODE,
    CATASTO_OPEN_DEACTIVATE_PANEL,
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
    CATASTO_OPEN_START_DATE_SELECTED,
    CATASTO_OPEN_END_DATE_SELECTED,
    CATASTO_OPEN_SET_MESSAGE_FOR_USER
} from "@js/extension/actions/catastoOpen";
import {
    buildingDetailLayer,
    landDetailLayer,
    legalSubjectType,
    naturalSubjectType,
    propertyOwnerLayer,
    subjectPropertyLayer
} from "@js/extension/utils/catastoOpen";

export default function(state = {}, action) {
    switch (action?.type) {

    case CATASTO_OPEN_DEACTIVATE_PANEL:
        return {
            layer: state?.layer
        };
    case CATASTO_OPEN_SELECT_SERVICE:
        const serviceChanged = state?.selectedService && state.selectedService?.id !== action?.service?.id;
        return serviceChanged ?
            {
                backend: state?.backend,
                selectedService: action?.service,
                layer: state?.layer
            } : {
                ...state,
                selectedService: action?.service,
                error: false
            };
    case CATASTO_OPEN_LOAD_ERROR:
        return {
            backend: state?.backend,
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
            subjectForm: null,
            searchResults: subjectFilterChanged ? [] : state.searchResults,
            loadedResults: subjectFilterChanged ? false : state.loadedResults
        } : {...state,
            selectedSubjectFilter: action?.filter
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_TYPE:
        return {
            ...state,
            subjectForm: {
                type: action?.subjectType,
                ...state.subjectForm
            }
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_FIRST_NAME:
        state.subjectForm.firstName = action?.firstName;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_LAST_NAME:
        state.subjectForm.lastName = action?.lastName;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_BIRTH_DATE:
        state.subjectForm.birthDate = action?.birthDate;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_LUOGO:
        return {
            ...state,
            isLoadingTown: true
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOADED_LUOGO:
        return {
            ...state,
            town: action.town,
            isLoadingTown: false
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_SELECT_BIRTH_PLACE:
        return {
            ...state,
            selectedBirthPlace: action.selectedBirthPlace
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_FISCAL_CODE:
        state.subjectForm.fiscalCode = action?.fiscalCode;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_SUBJECT_CODE:
        state.subjectForm.subjectCode = action?.subjectCode;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_VAT_NUMBER:
        state.subjectForm.vatNumber = action?.vatNumber;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_BUSINESS_NAME:
        state.subjectForm.businessName = action?.businessName;
        return {
            ...state
        };
    case CATASTO_OPEN_UPDATE_SUBJECT_FORM_ID_CODE:
        state.subjectForm.identificationCode = action?.identificationCode;
        return {
            ...state
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
            previousSearchResultType: null
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
            loadedResults: false
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
            subjectForm: null,
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        };
    case CATASTO_OPEN_START_DATE_SELECTED:
        return {
            ...state,
            startDate: action.startDate,
            subjectForm: null,
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        };
    case CATASTO_OPEN_END_DATE_SELECTED:
        return {
            ...state,
            endDate: action.endDate,
            subjectForm: null,
            selectedSubjectFilter: null,
            selectedCity: null,
            selectedSection: null,
            selectedSheet: null,
            selectedLand: null,
            selectedBuilding: null,
            searchResults: null,
            searchResultType: null,
            loadedResults: false
        };
    default:
        return state;
    }
}
