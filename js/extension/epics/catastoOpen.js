import * as Rx from 'rxjs';
import {setControlProperty} from '@mapstore/actions/controls';
import {updateMapLayout} from "@mapstore/actions/maplayout";
import {
    CATASTO_OPEN_ACTIVATE_PANEL,
    CATASTO_OPEN_DEACTIVATE_PANEL,
    CATASTO_OPEN_REDUCED_PANEL,
    CATASTO_OPEN_SELECT_SERVICE,
    CATASTO_OPEN_SELECT_SEARCH_IMM_TYPE,
    CATASTO_OPEN_SELECT_CITY,
    CATASTO_OPEN_IMMOBILE_LOAD_TOPONIMO,
    CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS,
    CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH,
    CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN,
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
    CATASTO_OPEN_START_DOWNLOAD_VISURA,
    CATASTO_OPEN_END_DOWNLOAD_VISURA,
    CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA,
    CATASTO_OPEN_END_DOWNLOAD_VISURA_IM_SINGOLA,
    loadError,
    loadCityData,
    loadedToponym,
    loadedAddress,
    updateSubjectFormLoadedTown,
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
    setPrintPathWParams,
    endDownloadVisura,
    errorDownloadVisura,
    endDownloadVisuraImSingole,
    errorDownloadVisuraImSingole,
    weAreDoneDownloadingVisuraImSingola
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
import {removeLayer, addLayer} from "@mapstore/actions/layers";
import {zoomToExtent} from "@mapstore/actions/map";
import {resultGridLoadRows} from "@js/extension/actions/resultGrid";
import {
    backendSelector,
    printEndPointSelector,
    doweHavePrintSelector,
    doweHaveFixedComuniSelector,
    fixedComuniSelector,
    printObjSelector,
    selectedAddressSelector
} from "@js/extension/selectors/catastoOpen";
import {
    getVisuraBlob
} from "@js/extension/api/visura";
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
    reducedCatastoOpenPanelEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_REDUCED_PANEL)
            .switchMap(() => {
                return Rx.Observable.of(...([
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getCityData(citySearchTxt, endDate, geoserverOwsUrl, headers))
                    .switchMap((response) => Rx.Observable.of(loadedCityData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    updateSubjectFormLoadedTownEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_UPDATE_SUBJECT_FORM_LOAD_TOWN)
            .switchMap((action) => {
                const state = store.getState();
                const birthPlaceTxt = action?.birthPlaceTxt || null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getTwonData(birthPlaceTxt, geoserverOwsUrl, headers))
                    .switchMap((response) => Rx.Observable.of(updateSubjectFormLoadedTown(response.data)))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSectionByCityCode(cityCode, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const section = state.catastoOpen?.selectedSection || null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSheetByCityCode(cityCode, section?.value, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getLandByCityCodeAndSheetNumber(cityCode, sheetNumber, section, startDate, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getBuildingByCityCodeAndSheetNumber(cityCode, sheetNumber, section, startDate, endDate, geoserverOwsUrl, headers))
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
                const birthPlace = naturalSubject?.birthPlace ? naturalSubject.birthPlace.value : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    let printObj = {
                        headers: headers,
                        pathName: printPathNaturalSubject,
                        url: endPoint.endsWith('/') ? `${endPoint}${printPathNaturalSubject}` : `${endPoint}/${printPathNaturalSubject}`,
                        filename: "listapersonefisiche"
                    };
                    let query = {};
                    if (subjectCode !== null) {
                        query.codicesoggetto = subjectCode;
                    }
                    if (fiscalCode !== null) {
                        query.codicefiscale = naturalSubject.fiscalCode;
                    }
                    if (firstName !== null) {
                        query.nome = naturalSubject.firstName.trim();
                    }
                    if (lastName !== null) {
                        query.cognome = naturalSubject.lastName.trim();
                    }
                    if (birthDate !== null) {
                        query.datadinascita = fixDateTimeZone(naturalSubject.birthDate).toISOString().slice(0, 10);
                    }
                    if (birthPlace !== null) {
                        query.comunenascita = birthPlace;
                    }
                    printObj.query = query;
                    return Rx.Observable.defer(() => getNaturalSubjects(firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl, headers))
                        .switchMap((response) => Rx.Observable.of(loadedNaturalSubjectData(response.data), setPrintPathWParams(printObj)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getNaturalSubjects(firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    let printObj = {
                        headers: headers,
                        pathName: printPathLegalSubject,
                        url: endPoint.endsWith('/') ? `${endPoint}${printPathLegalSubject}` : `${endPoint}/${printPathLegalSubject}`,
                        filename: "listapersonegiuridiche"
                    };
                    let query = {};
                    if (identificationCode !== null) {
                        query.codicesoggetto = identificationCode;
                    }
                    if (vatNumber !== null) {
                        query.partitaiva = legalSubject.vatNumber;
                    }
                    if (businessName !== null) {
                        query.denominazione = legalSubject.businessName.trim();
                    }
                    printObj.query = query;
                    return Rx.Observable.defer(() => getLegalSubjects(vatNumber, businessName, identificationCode, geoserverOwsUrl, headers))
                        .switchMap((response) => Rx.Observable.of(loadedLegalSubjectData(response.data), setPrintPathWParams(printObj)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getLegalSubjects(vatNumber, businessName, identificationCode, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    let printObj = {
                        headers: headers,
                        pathName: printPathImmobile,
                        url: endPoint.endsWith('/') ? `${endPoint}${printPathImmobile}` : `${endPoint}/${printPathImmobile}`,
                        filename: "listaimmobili"
                    };
                    let query = {};
                    query.codicesoggetto = action?.subject?.subjects;
                    query.flagricercastorica = state?.catastoOpen.isHistoricalSearchChecked ? true : false;
                    printObj.query = query;
                    return Rx.Observable.defer(() => getPropertyBySubject(
                        action?.subject?.subjects, action?.subject?.subjectType,
                        startDate,
                        endDate,
                        geoserverOwsUrl,
                        headers))
                        .switchMap((response) => Rx.Observable.of(loadedSubjectPropertyData(response.data), setPrintPathWParams(printObj)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() => getPropertyBySubject(action?.subject?.subjects, action?.subject?.subjectType, startDate, endDate, geoserverOwsUrl, headers))
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
                    removeLayer(layer?.id)]));
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getBuildingDetails(selectedCityCode, selectedSheetNumber, selectedBuildingNumber, immobileCode, startDate, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getLandDetails(selectedCityCode, selectedSheetNumber, selectedLandNumber, selectedLandSectionCode, startDate, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateTimeZone(state.catastoOpen.startDate).toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? "0001-01-01" : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const dowe = doweHavePrintSelector(state);
                if (dowe) {
                    const endPoint = printEndPointSelector(state);
                    let printObj = {
                        headers: headers,
                        pathName: printPathVisura,
                        url: endPoint.endsWith('/') ? `${endPoint}${printPathVisura}` : `${endPoint}/${printPathVisura}`,
                        filename: "listaimmobili"
                    };
                    let query = {};
                    query.codiceimmobile = action?.property.property;
                    query.tipoimmobile = action?.property.propertyType;
                    query.flagricercastorica = state?.catastoOpen.isHistoricalSearchChecked ? true : false;
                    printObj.query = query;
                    return Rx.Observable.defer(() =>  getPropertyOwners(property, cityCode, startDate, endDate, geoserverOwsUrl, headers))
                        .switchMap((response) => Rx.Observable.of(loadedPropertyOwnerData(response.data), setPrintPathWParams(printObj)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                }
                return Rx.Observable.defer(() =>  getPropertyOwners(property, cityCode, startDate, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getToponym(toponymTxt, geoserverOwsUrl, headers))
                    .switchMap((response) => Rx.Observable.of(loadedToponym(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadAddressEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_IMMOBILE_LOAD_ADDRESS)
            .debounceTime(3000)
            .switchMap((action) => {
                const state = store.getState();
                const backend = backendSelector(state);
                const doweHaveFixedComuni = doweHaveFixedComuniSelector(state);
                const fixedComuni = fixedComuniSelector(state);
                const selectedAddress = selectedAddressSelector(state);
                if (selectedAddress) {
                    return Rx.Observable.empty();
                }
                const cityCode = doweHaveFixedComuni ? fixedComuni.codice : state.catastoOpen?.selectedCity?.code;
                let addressTxt = action?.addressTxt || null;
                if (addressTxt !== null) {
                    addressTxt =  addressTxt.replace(/[^a-zA-Z0-9]/g, "");
                } else {
                    return Rx.Observable.empty();
                }
                const toponymNumber = state?.catastoOpen?.selectedToponym ? state.catastoOpen.selectedToponym.value : 0;
                let geoserverOwsUrl = backend.url;
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getAddress(addressTxt, toponymNumber, cityCode, geoserverOwsUrl, headers))
                    .switchMap((response) => Rx.Observable.of(loadedAddress(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadImmobileEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_IMMOBILE_SUBMIT_SEARCH)
            .switchMap((action) => {
                const state = store.getState();
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
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
                    return Rx.Observable.defer(() => getBuildingByAddress(cityCode, toponym, addressName, houseNumber, startDate, endDate, geoserverOwsUrl, headers))
                        .switchMap((response) => Rx.Observable.of(loadedBuildingData(response.data)))
                        .catch(e => Rx.Observable.of(loadError(e.message)));
                case services[0].filters[2].id:
                    const immobileCode = state?.catastoOpen?.immobileCode;
                    const selectedImmType = state?.catastoOpen?.selectedImmType?.value;
                    switch (selectedImmType) {
                    case services[0].filters[0].filters[0].id:
                        return Rx.Observable.defer(() => getLandByCodiceImm(cityCode, immobileCode, startDate, endDate, geoserverOwsUrl, headers))
                            .switchMap((response) => Rx.Observable.of(loadedLandData(response.data)))
                            .catch(e => Rx.Observable.of(loadError(e.message)));
                    case services[0].filters[0].filters[1].id:
                        return Rx.Observable.defer(() => getBuildingByCodiceImm(cityCode, immobileCode, startDate, endDate, geoserverOwsUrl, headers))
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
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) :
                    state?.catastoOpen.isHistoricalSearchChecked ? new Date().toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSectionByCityCode(fixedComuni.codice, endDate, geoserverOwsUrl, headers))
                    .switchMap((response) => Rx.Observable.of(loadedSectionData(response.data), selectSection({value: "_", label: "TUTTE LE SEZIONI", name: "_"})))
                    .catch(e => Rx.Observable.of(loadError(e.message)));

            }),
    startDownloadVisuraEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_START_DOWNLOAD_VISURA)
            .switchMap((action) => {
                const state = store.getState();
                const printObj = printObjSelector(state);
                const fileType = action.fileType;
                return Rx.Observable.defer(() => getVisuraBlob(printObj, fileType))
                    .switchMap((response) => Rx.Observable.of(endDownloadVisura(fileType, response.data)))
                    .catch(e => Rx.Observable.of(errorDownloadVisura(fileType, e)));
            }),
    endDownloadVisuraEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_END_DOWNLOAD_VISURA)
            .switchMap((action) => {
                const state = store.getState();
                const printObj = printObjSelector(state);
                const blob = action.blob;
                const filename = `${new Date().toISOString()}_${printObj.filename}.${action.fileType}`;
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = filename;
                alink.click();
                return Rx.Observable.empty();
            }),
    startDownloadVisuraImSingolaEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_START_DOWNLOAD_VISURA_IM_SINGOLA)
            .switchMap((action) => {
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const endPoint = printEndPointSelector(state);
                let printObj = {
                    headers: headers,
                    pathName: printPathVisura,
                    url: endPoint.endsWith('/') ? `${endPoint}${printPathVisura}` : `${endPoint}/${printPathVisura}`,
                    filename: "visura"
                };
                let query = {};
                query.codiceimmobile = action?.immobile;
                query.tipoimmobile = action?.propertyType === "Fabbricati" ? "F" : "T";
                query.flagricercastorica = state?.catastoOpen.isHistoricalSearchChecked ? true : false;
                printObj.query = query;
                return Rx.Observable.defer(() => getVisuraBlob(printObj, "pdf"))
                    .switchMap((response) => Rx.Observable.of(endDownloadVisuraImSingole(response.data)))
                    .catch(e => Rx.Observable.of(errorDownloadVisuraImSingole("pdf", e)));
            }),
    endDownloadVisuraImSingoleEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_END_DOWNLOAD_VISURA_IM_SINGOLA)
            .switchMap((action) => {
                const blob = action.blob;
                const filename = `${new Date().toISOString()}_visura.pdf`;
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = filename;
                alink.click();
                return Rx.Observable.of(weAreDoneDownloadingVisuraImSingola());
            })
});
