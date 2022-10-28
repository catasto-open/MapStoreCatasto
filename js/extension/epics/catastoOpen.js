import * as Rx from 'rxjs';
import {setControlProperty} from '@mapstore/actions/controls';
import {updateMapLayout} from "@mapstore/actions/maplayout";
import {
    CATASTO_OPEN_ACTIVATE_PANEL,
    CATASTO_OPEN_DEACTIVATE_PANEL,
    CATASTO_OPEN_SELECT_SERVICE,
    CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE,
    CATASTO_OPEN_SELECT_CITY,
    CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO,
    CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS,
    CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_LUOGO,
    CATASTO_OPEN_LOAD_CITY_DATA,
    CATASTO_OPEN_SELECT_SECTION,
    CATASTO_OPEN_LOAD_SECTION_DATA,
    CATASTO_OPEN_SELECT_SHEET,
    CATASTO_OPEN_LOAD_SHEET_DATA,
    CATASTO_OPEN_SELECT_SUBJECT_FILTER,
    CATASTO_OPEN_LOAD_LAND_DATA,
    CATASTO_OPEN_SELECT_LAND,
    CATASTO_OPEN_LOAD_BUILDING_DATA,
    CATASTO_OPEN_SELECT_BUILDING,
    CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA,
    CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA,
    CATASTO_OPEN_LOAD_LAYER,
    CATASTO_OPEN_REMOVE_LAYER,
    CATASTO_OPEN_ADD_LAYER,
    CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA,
    CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA,
    CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA,
    CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA,
    CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS,
    CATASTO_OPEN_RELOAD_SEARCH_RESULTS,
    CATASTO_OPEN_LOADED_LAND_DETAIL_DATA,
    CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA,
    CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA,
    CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA,
    CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA,
    CATASTO_OPEN_LOAD_LAND_DETAIL_DATA,
    loadError,
    loadCityData,
    loadedToponym,
    loadedAddress,
    updateSubjectFormLoadedLuogo,
    loadedCityData,
    selectSection,
    loadSectionData,
    loadedSectionData,
    loadSheetData,
    loadedSheetData,
    updateSubjectFormType,
    loadedLandData,
    loadLandData,
    loadBuildingData,
    loadedBuildingData,
    loadedNaturalSubjectData,
    loadedLegalSubjectData,
    addLayerToMap,
    removeLayerFromMap,
    loadedSubjectPropertyData,
    reloadSearchResults,
    reloadedSearchResults,
    loadedBuildingDetailData,
    loadedLandDetailData,
    loadedPropertyOwnerData,
    setPrintPathWParams
} from "@js/extension/actions/catastoOpen";
import {
    services,
    fixDateTimeZone,
    printPathImmobile,
    printPathVisura,
    printPathLegalSubject,
    printPathNaturalSubject
} from "@js/extension/utils/catastoOpen";
import {
    getBuildingByCityCodeAndSheetNumber,
    getBuildingDetails,
    getCityData,
    getToponym,
    getAddress,
    getTwonData,
    getLandByCityCodeAndSheetNumber,
    getLandDetails,
    getLegalSubjects,
    getNaturalSubjects,
    getPropertyBySubject,
    getPropertyOwners,
    getSectionByCityCode,
    getSheetByCityCode,
    getBuildingByAddress,
    getLandByCodiceImm,
    getBuildingByCodiceImm
} from "@js/extension/api/geoserver";
import {addGroup, addLayer, removeNode} from "@mapstore/actions/layers";
import {zoomToExtent} from "@mapstore/actions/map";
import {resultGridLoadRows} from "@js/extension/actions/resultGrid";
import {
    backendSelector,
    printEndPointSelector,
    doweHavePrintSelector,
    doweHaveFixedComuniSelector,
    fixedComuniSelector
} from "@js/extension/selectors/catastoOpen";
/**
 * Epics for CATASTO-OPEN PLUGIN
 * @name epics.catastoOpen
 * @type {Object}
 */
export default () => ({
    activateCatastoOpenPanelEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_ACTIVATE_PANEL)
            .switchMap(() => {
                const state = store.getState();
                const layout = state.maplayout.layout;
                layout.right = 658;
                return Rx.Observable.of(...([
                    setControlProperty("catastoOpen", "enabled", true, true),
                    updateMapLayout(layout)
                ]));
            }),
    deactivateCatastoOpenPanelEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_DEACTIVATE_PANEL)
            .switchMap(() => {
                return Rx.Observable.of(...([
                    removeLayerFromMap(),
                    setControlProperty('catastoOpen', "enabled", false, false)
                ]));
            }),
    selectServiceEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SELECT_SERVICE)
            .switchMap((action) => {
                if (action.service.value === services[0].id) {
                    return Rx.Observable.of(...([removeLayerFromMap(), loadCityData()]));
                }
                return Rx.Observable.of(removeLayerFromMap());
            }),
    resumePreviousSearchResultsEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_RESUME_PREVIOUS_SEARCH_RESULTS)
            .switchMap(() => {
                return Rx.Observable.of(reloadSearchResults());
            }),
    reloadSearchResultsEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_RELOAD_SEARCH_RESULTS)
            .switchMap(() => {
                const state = store.getState();
                return Rx.Observable.of(
                    resultGridLoadRows(state.catastoOpen?.searchResults),
                    reloadedSearchResults()).delay(500);
            }),
    loadCityDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_CITY_DATA)
            .switchMap((action) => {
                const state = store.getState();
                let citySearchTxt = action?.citySearchTxt || null;
                if (citySearchTxt !== null) {
                    citySearchTxt = citySearchTxt.replace(/[^\w\s]/gi, '');
                    citySearchTxt = citySearchTxt === '' ? null : citySearchTxt;
                }
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getCityData(citySearchTxt, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedCityData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    updateSubjectFormLoadedLuogoEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_LUOGO)
            .switchMap((action) => {
                const state = store.getState();
                const birthPlaceTxt = action?.birthPlaceTxt || null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getTwonData(birthPlaceTxt, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(updateSubjectFormLoadedLuogo(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectCityEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_CITY)
            .switchMap((action) => {
                const state = store.getState();
                const cityChanged = state.catastoOpen?.cityChanged;
                const cityCode = (action.city) ? action.city.value : null;
                return cityChanged ? Rx.Observable.of(...([
                    removeLayerFromMap(),
                    loadSectionData(cityCode)
                ])) : Rx.Observable.of(...([
                    loadSectionData(cityCode)
                ]));
            }),
    loadSectionDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_SECTION_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const cityCode = (action.cityCode) ? action.cityCode : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSectionByCityCode(cityCode, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedSectionData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectSectionEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_SECTION)
            .switchMap(() => {
                const state = store.getState();
                const sectionChanged = state.catastoOpen?.sectionChanged;
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const cityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen.selectedCity.code;
                return sectionChanged ?
                    Rx.Observable.of(...([removeLayerFromMap(), loadSheetData(cityCode)])) :
                    Rx.Observable.of(...([loadSheetData(cityCode)]));
            }),
    loadSheetDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_SHEET_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const cityCode = action?.cityCode || null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const section = state.catastoOpen?.selectedSection || null;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSheetByCityCode(cityCode, section?.value, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedSheetData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectSheetEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_SHEET)
            .switchMap(() => {
                const state = store.getState();
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const cityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                const sheetNumber = state.catastoOpen?.selectedSheet?.number;
                const sheetChanged = state.catastoOpen?.sheetChanged;
                return sheetChanged ? Rx.Observable.of(
                    removeLayerFromMap(),
                    loadLandData(cityCode, sheetNumber),
                    loadBuildingData(cityCode, sheetNumber)) :
                    Rx.Observable.of(
                        loadLandData(cityCode, sheetNumber),
                        loadBuildingData(cityCode, sheetNumber));
            }),
    loadLandDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_LAND_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const cityCode = action?.cityCode || null;
                const sheetNumber = action?.sheetNumber || null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getLandByCityCodeAndSheetNumber(cityCode, sheetNumber, section, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedLandData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectLandEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_LAND)
            .switchMap(() => {
                const state = store.getState();
                const landChanged = state.catastoOpen?.landChanged;
                return landChanged ? Rx.Observable.of(removeLayerFromMap()) : Rx.Observable.empty();
            }),
    loadBuildingDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_BUILDING_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const cityCode = action?.cityCode || null;
                const sheetNumber = action?.sheetNumber || null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getBuildingByCityCodeAndSheetNumber(cityCode, sheetNumber, section, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedBuildingData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectBuildingEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_BUILDING)
            .switchMap(() => {
                const state = store.getState();
                const buildingChanged = state.catastoOpen?.buildingChanged;
                return buildingChanged ? Rx.Observable.of(removeLayerFromMap()) : Rx.Observable.empty();
            }),
    selectSubjectFilterEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_SUBJECT_FILTER)
            .switchMap(() => {
                const state = store.getState();
                const subjectType = state?.catastoOpen?.selectedService?.id;
                return Rx.Observable.of(updateSubjectFormType(subjectType));
            }),
    loadNaturalSubjectDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_NATURAL_SUBJECT_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const naturalSubject = action.subjectForm;
                const subjectCode = naturalSubject?.subjectCode ? naturalSubject.subjectCode : null;
                const fiscalCode = naturalSubject?.fiscalCode ? "\'" + naturalSubject.fiscalCode + "\'" : null;
                const firstName = naturalSubject?.firstName ? "\'" + naturalSubject.firstName.trim() + "\'" : null;
                const lastName = naturalSubject?.lastName ?  "\'" + naturalSubject.lastName.replace("'", "`").trim() + "\'" : null;
                const birthDate = naturalSubject?.birthDate ? "\'" + fixDateTimeZone(naturalSubject.birthDate).toISOString().slice(0, 10) + "\'" : null;
                const birthPlace = state.catastoOpen?.selectedBirthPlace ? state.catastoOpen.selectedBirthPlace.value : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    const printURL = endPoint.endsWith('/') ? new URL(`${endPoint}${printPathNaturalSubject}`) : new URL(`${endPoint}/${printPathNaturalSubject}`);
                    if (subjectCode !== null) {
                        printURL.searchParams.set("codicesoggetto", subjectCode);
                    }
                    if (fiscalCode !== null) {
                        printURL.searchParams.set("codicefiscale", naturalSubject.fiscalCode);
                    }
                    if (firstName !== null) {
                        printURL.searchParams.set("nome", naturalSubject.firstName.trim());
                    }
                    if (lastName !== null) {
                        printURL.searchParams.set("cognome", naturalSubject.lastName.trim());
                    }
                    if (birthDate !== null) {
                        printURL.searchParams.set("datadinascita", fixDateTimeZone(naturalSubject.birthDate).toISOString().slice(0, 10));
                    }
                    if (birthPlace !== null) {
                        printURL.searchParams.set("comunenascita", birthPlace);
                    }
                    return Rx.Observable.defer(() => getNaturalSubjects(firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl))
                        .switchMap((response) => Rx.Observable.of(loadedNaturalSubjectData(response.data), setPrintPathWParams(printURL.toString())))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getNaturalSubjects(firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedNaturalSubjectData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedNaturalSubjectDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_NATURAL_SUBJECT_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.naturalSubjects));
            }),
    loadLegalSubjectDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_LEGAL_SUBJECT_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const legalSubject = action.subjectForm;
                const identificationCode = legalSubject?.identificationCode ? legalSubject.identificationCode : null;
                const vatNumber = (legalSubject?.vatNumber) ? "\'" + legalSubject.vatNumber + "\'" : null;
                const businessName = (legalSubject?.businessName) ? "\'" + legalSubject.businessName.trim() + "\'" : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    const printURL = endPoint.endsWith('/') ? new URL(`${endPoint}${printPathLegalSubject}`) : new URL(`${endPoint}/${printPathLegalSubject}`);
                    if (identificationCode !== null) {
                        printURL.searchParams.set("codicesoggetto", identificationCode);
                    }
                    if (vatNumber !== null) {
                        printURL.searchParams.set("partitaiva", legalSubject.vatNumber);
                    }
                    if (businessName !== null) {
                        printURL.searchParams.set("denominazione", legalSubject.businessName.trim());
                    }
                    return Rx.Observable.defer(() => getLegalSubjects(vatNumber, businessName, identificationCode, geoserverOwsUrl))
                        .switchMap((response) => Rx.Observable.of(loadedLegalSubjectData(response.data), setPrintPathWParams(printURL.toString())))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getLegalSubjects(vatNumber, businessName, identificationCode, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedLegalSubjectData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedLegalSubjectDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_LEGAL_SUBJECT_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.legalSubjects));
            }),
    loadSubjectPropertyDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_SUBJECT_PROPERTY_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    const printURL = endPoint.endsWith('/') ? new URL(`${endPoint}${printPathImmobile}`) : new URL(`${endPoint}/${printPathImmobile}`);
                    printURL.searchParams.set("codicesoggetto", action?.subject?.subjects);
                    printURL.searchParams.set("flagricercastorica", state?.catastoOpen.isHistoricalSearchChecked ? true : false);
                    return Rx.Observable.defer(() => getPropertyBySubject(action?.subject?.subjects, action?.subject?.subjectType, startDate, endDate, geoserverOwsUrl))
                        .switchMap((response) => Rx.Observable.of(loadedSubjectPropertyData(response.data), setPrintPathWParams(printURL.toString())))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getPropertyBySubject(action?.subject?.subjects, action?.subject?.subjectType, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedSubjectPropertyData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedSubjectPropertyDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_SUBJECT_PROPERTY_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.subjectProperties));
            }),
    loadLayerEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOAD_LAYER)
            .switchMap((action) => {
                return Rx.Observable.of(...([
                    removeLayerFromMap(),
                    addLayerToMap(action?.layer)]));
            }),
    addLayerEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_ADD_LAYER)
            .switchMap((action) => {
                const state = store.getState();
                const layer = action?.layer;
                if (layer === undefined) {
                    return Rx.Observable.empty();
                }
                const layout = state.maplayout.layout;
                layout.right = 658;
                return Rx.Observable.of(
                    addGroup(layer.group, undefined, {id: layer.group}),
                    addLayer(layer),
                    updateMapLayout(layout),
                    zoomToExtent(layer.bbox.bounds, layer.bbox.crs, undefined, null));
            }),
    removeLayerEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_REMOVE_LAYER)
            .switchMap(() => {
                const state = store.getState();
                const layer = state?.catastoOpen?.layer;
                return Rx.Observable.of(...([
                    removeNode(layer?.group, "groups")]));
            }),
    loadBuildingDetailDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_BUILDING_DETAIL_DATA)
            .switchMap(() => {
                const state = store.getState();
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const selectedCityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                const selectedSheetNumber = state.catastoOpen?.selectedBuilding?.sheet;
                const selectedBuildingNumber = state.catastoOpen?.selectedBuilding?.number;
                const immobileCode = state?.catastoOpen?.immobileCode ? state.catastoOpen.immobileCode : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getBuildingDetails(selectedCityCode, selectedSheetNumber, selectedBuildingNumber, immobileCode, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedBuildingDetailData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedBuildingDetailDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_BUILDING_DETAIL_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.buildingDetails));
            }),
    loadLandDetailDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_LAND_DETAIL_DATA)
            .switchMap(() => {
                const state = store.getState();
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const selectedCityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                const selectedSheetNumber = state.catastoOpen?.selectedLand?.sheet;
                const selectedLandNumber = state.catastoOpen?.selectedLand?.number;
                const selectedLandSectionCode = state.catastoOpen?.selectedLand?.section;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getLandDetails(selectedCityCode, selectedSheetNumber, selectedLandNumber, selectedLandSectionCode, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedLandDetailData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedLandDetailDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_LAND_DETAIL_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.landDetails));
            }),
    loadPropertyOwnerDataEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_PROPERTY_OWNER_DATA)
            .switchMap((action) => {
                const state = store.getState();
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const cityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                const property = action?.property;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    const printURL = endPoint.endsWith('/') ? new URL(`${endPoint}${printPathVisura}`) : new URL(`${endPoint}/${printPathVisura}`);
                    printURL.searchParams.set("codiceimmobile", action?.property.property);
                    printURL.searchParams.set("tipoimmobile", action?.property.propertyType);
                    printURL.searchParams.set("flagricercastorica", state?.catastoOpen.isHistoricalSearchChecked ? true : false);
                    return Rx.Observable.defer(() =>  getPropertyOwners(property, cityCode, startDate, endDate, geoserverOwsUrl))
                        .switchMap((response) => Rx.Observable.of(loadedPropertyOwnerData(response.data), setPrintPathWParams(printURL.toString())))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() =>  getPropertyOwners(property, cityCode, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedPropertyOwnerData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedPropertyOwnerDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.propertyOwners));
            }),
    loadToponymEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO)
            .switchMap((action) => {
                const state = store.getState();
                let toponymTxt = action?.toponymTxt ||  null;
                if (toponymTxt !== null) {
                    toponymTxt = toponymTxt.replace(/[^\w\s]/gi, '');
                }
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getToponym(toponymTxt, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedToponym(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadAddressEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS)
            .switchMap((action) => {
                const state = store.getState();
                const backend = backendSelector(state);
                let addressTxt = action?.addressTxt || null;
                if (addressTxt !== null) {
                    addressTxt = addressTxt.replace(/[^\w\s]/gi, '');
                }
                const toponymNumber = state?.catastoOpen?.selectedToponym ? state.catastoOpen.selectedToponym.value : 0;
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getAddress(addressTxt, toponymNumber, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedAddress(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadImmobileEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH)
            .switchMap((action) => {
                const state = store.getState();
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const filterType = action.filterType;
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const cityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                switch (filterType) {
                case services[0].filters[1].id:
                    const toponym = state?.catastoOpen?.selectedToponym?.value;
                    const addressName = state?.catastoOpen?.selectedAddress?.value;
                    const houseNumber = state?.catastoOpen?.houseNumber;
                    return Rx.Observable.defer(() => getBuildingByAddress(cityCode, toponym, addressName, houseNumber, startDate, endDate, geoserverOwsUrl))
                        .switchMap((response) => Rx.Observable.of(loadedBuildingData(response.data)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                case services[0].filters[2].id:
                    const immobileCode = state?.catastoOpen?.immobileCode;
                    const selectedImmType = state?.catastoOpen?.selectedImmType?.value;
                    switch (selectedImmType) {
                    case services[0].filters[0].filters[0].id:
                        return Rx.Observable.defer(() => getLandByCodiceImm(cityCode, immobileCode, startDate, endDate, geoserverOwsUrl))
                            .switchMap((response) => Rx.Observable.of(loadedLandData(response.data)))
                            .catch(e => Rx.Observable.of(loadError(e.message)));
                    case services[0].filters[0].filters[1].id:
                        return Rx.Observable.defer(() => getBuildingByCodiceImm(cityCode, immobileCode, startDate, endDate, geoserverOwsUrl))
                            .switchMap((response) => Rx.Observable.of(loadedBuildingData(response.data)))
                            .catch(e => Rx.Observable.of(loadError(e.message)));
                    default:
                        return Rx.Observable.empty();
                    }
                default:
                    return Rx.Observable.empty();
                }
            }),
    loadSectionDataEpicTwin: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE)
            .switchMap((action) => {
                const state = store.getState();
                const DoWeNeedToLoadSection = action.serviceImmType.value === services[0].filters[0].id;
                if (!DoWeNeedToLoadSection) {
                    return Rx.Observable.empty();
                }
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                if (!doweHaveFixedComuni) {
                    return Rx.Observable.empty();
                }
                const fixedComuni = fixedComuniSelector(state);
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSectionByCityCode(fixedComuni.codice, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedSectionData(response.data), selectSection({value: "_", label: "TUTTE LE SEZIONI", name: "_"})))
                    .catch(e => Rx.Observable.of(loadError(e.message)));

            })
});
