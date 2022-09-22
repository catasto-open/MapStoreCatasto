import {get} from "lodash";

export const catastoOpenActiveSelector = (state) => get(state,
    "controls.catastoOpen.active") === "catastoOpen"
    || get(state, "controls.catastoOpen.enabled");
export const selectedServiceSelector = (state) => get(state, "catastoOpen.selectedService");
export const selectedSearchImmTypeSelector = (state) => get(state, "catastoOpen.selectedSearchImmType");

export const errorSelector = (state) => get(state, "catastoOpen.error");
export const messageForUserSelector = (state) => get(state, "catastoOpen.messageForUser");

export const citySelector = (state) => get(state, "catastoOpen.cities");
export const selectedCitySelector = (state) => get(state, "catastoOpen.selectedCity");
export const isLoadingCitySelector = (state) => get(state, "catastoOpen.isLoadingCities");

export const sectionSelector = (state) => get(state, "catastoOpen.sections");
export const selectedSectionSelector = (state) => get(state, "catastoOpen.selectedSection");
export const isLoadingSectionSelector = (state) => get(state, "catastoOpen.isLoadingSections");

export const sheetSelector = (state) => get(state, "catastoOpen.sheets");
export const selectedSheetSelector = (state) => get(state, "catastoOpen.selectedSheet");
export const isLoadingSheetSelector = (state) => get(state, "catastoOpen.isLoadingSheets");

export const landSelector = (state) => get(state, "catastoOpen.lands");
export const selectedLandSelector = (state) => get(state, "catastoOpen.selectedLand");
export const isLoadingLandSelector = (state) => get(state, "catastoOpen.isLoadingLands");

export const buildingSelector = (state) => get(state, "catastoOpen.buildings");
export const selectedBuildingSelector = (state) => get(state, "catastoOpen.selectedBuilding");
export const isLoadingBuildingSelector = (state) => get(state, "catastoOpen.isLoadingBuildings");

export const searchResultSelector = (state) => get(state, "catastoOpen.searchResults");
export const searchResultTypeSelector = (state) => get(state, "catastoOpen.searchResultType");
export const loadingResultSelector = (state) => get(state, "catastoOpen.loadingResults");
export const loadedResultSelector = (state) => get(state, "catastoOpen.loadedResults");

export const selectedSubjectFilterSelector = (state) => get(state, "catastoOpen.selectedSubjectFilter");
export const subjectFormSelector = (state) => get(state, "catastoOpen.subjectForm");
export const subjectFormButtonActiveSelector = (state) => {
    return (state.catastoOpen?.subjectForm?.firstName?.length > 0 &&  state.catastoOpen?.subjectForm?.lastName?.length > 0)
        ||  state.catastoOpen?.subjectForm?.fiscalCode?.length === 16
        ||  state.catastoOpen?.subjectForm?.vatNumber?.length > 10
        ||  state.catastoOpen?.subjectForm?.businessName?.length > 0
        ||  state.catastoOpen?.subjectForm?.subjectCode?.length > 0
        ||  state.catastoOpen?.subjectForm?.identificationCode?.length > 0;
};

export const loadingSubjectPropertySelector = (state) => get(state, "catastoOpen.loadingSubjectProperties");
export const loadedSubjectPropertySelector = (state) => get(state, "catastoOpen.loadedSubjectProperties");
export const subjectPropertySelector = (state) => get(state, "catastoOpen.subjectProperties");
export const isLoadingTownSelector = (state) => get(state, "catastoOpen.isLoadingTown");
export const townSelector = (state) => get(state, "catastoOpen.town");
export const selectedBirthPlaceSelector = (state) =>  get(state, "catastoOpen.selectedBirthPlace");

export const backendSelector = (state) => get(state, "catastoOpen.backend");
export const isTemporalSearchCheckedSelector = (state) => get(state, "catastoOpen.isTemporalSearchChecked");
export const isHistoricalSearchCheckedSelector = (state) => get(state, "catastoOpen.isHistoricalSearchChecked");
export const startDateSelector = (state) => get(state, "catastoOpen.startDate");
export const endDateSelector = (state) => get(state, "catastoOpen.endDate");

export const toponymSelector = (state) => get(state, "catastoOpen.toponyms");
export const selectedToponymSelector = (state) => get(state, "catastoOpen.selectedToponym");
export const isLoadingToponymSelector = (state) => get(state, "catastoOpen.isLoadingToponym");
export const isValidInputOnImmAddressSelector = (state) => {
    return (state.catastoOpen?.addressNameRawTxt?.length > 0 && state.catastoOpen?.houseNumber?.length > 0);
};
export const hasSubmitedSearchSelector = (state) => get(state, "catastoOpen.hasSubmitedSearch");
export const selectedImmTypeSelector = (state) => get(state, "catastoOpen.selectedImmType");
export const immobileCodeSelector = (state) => get(state, "catastoOpen.immobileCode");
export const isValidInputOnImmCodeSelector = (state) => {
    return state.catastoOpen?.immobileCode?.length > 0;
};
export const selectedImmobileSelector = (state) => get(state, "catastoOpen.selectedImmobile");
