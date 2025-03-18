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
    CATASTO_OPEN_CHECK_BASE_LAYERS,
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
    weAreDoneDownloadingVisuraImSingola,
    setBaseLayers,
    gotErrorBaseLayers,
    CATASTO_OPEN_SET_BASE_LAYERS,
    showBaseLayers,
    CATASTO_OPEN_SHOW_BASE_LAYERS,
    onTrackBaseLayers,
    CATASTO_OPEN_REMOVE_BASE_LAYERS,
    onRemoveBaseLayers,
    checkBaseLayers,
    CATASTO_OPEN_TAB_SELECT,
    onEnableExplore,
    onLoadFabFeat,
    onLoadTerFeat,
    CATASTO_OPEN_LOAD_FAB_FEAT,
    CATASTO_OPEN_LOAD_TER_FEAT,
    onFabFeatLoaded,
    CATASTO_OPEN_BTN_FAB_CLICKED,
    selectionCleanGroup,
    selectionCreateGroup,
    CATASTO_OPEN_BTN_TER_CLICKED,
    CATASTO_OPEN_SELECTION_CREATE_GROUP,
    CATASTO_OPEN_FAB_FEAT_LOADED,
    selectionAppendLayer,
    CATASTO_OPEN_SELECTION_APPEND_LAYER,
    CATASTO_OPEN_SELECTION_CLEAN_GROUP,
    CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER,
    onTerFeatLoaded,
    CATASTO_OPEN_TER_FEAT_LOADED,
    CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER,
    onFabFeatPostProcess,
    CATASTO_OPEN_FAB_FEAT_POST_PROCESS,
    CATASTO_OPEN_SELECTION_FAB_DETAIL_LOAD,
    onStartLoadFabDetail,
    CATASTO_OPEN_FAB_DETAIL_LOAD_START,
    onFabDetailsAppend,
    CATASTO_OPEN_FAB_DETAIL_RESULTS_APPEND,
    onFabDetailsAppended,
    CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED,
    onLoadDetails,
    CATASTO_OPEN_SELECTION_TER_DETAIL_LOAD,
    onStartLoadTerDetail,
    CATASTO_OPEN_TER_DETAIL_LOAD_START,
    onTerDetailsAppend,
    CATASTO_OPEN_TER_DETAIL_RESULTS_APPEND,
    onTerDetailsAppended,
    CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED,
    CATASTO_OPEN_SELECTION_EXPLORE_CANCEL,
    CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE,
    endDownloadListaImmobile,
    errorDownloadListaImmobile,
    CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE
} from "@js/extension/actions/catastoOpen";
import {
    services,
    fixDateTimeZone,
    printPathImmobile,
    printPathVisura,
    printPathLegalSubject,
    printPathNaturalSubject,
    // checkLayersInDJson,
    fabStyle,
    terStyle,
    groupOfSelection,
    getNodesIdsIfIdExists,
    featToLayer,
    fabSelectedStyle,
    terSelectedStyle,
    nodeExistsInTree,
    createCQLFab,
    fabFeatToLayer,
    buildingDetailParser,
    landDetailParser,
    printPathListaImm
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
    getBuildingByCodiceImm,
    // getCapabilities,
    getFeatureForExplore,
    getFabFeatureForExplore
} from "@js/extension/api/geoserver";
import {removeLayer, addLayer, changeLayerProperties, addGroup, removeNode} from "@mapstore/actions/layers";
import {CLICK_ON_MAP, zoomToExtent} from "@mapstore/actions/map";
import {resultGridLoadRows} from "@js/extension/actions/resultGrid";
import {
    backendSelector,
    printEndPointSelector,
    doweHavePrintSelector,
    doweHaveFixedComuniSelector,
    fixedComuniSelector,
    printObjSelector,
    selectedAddressSelector,
    trackedBaseLayersSelector,
    isExploreEnabledSelector,
    isfabClickedSelector,
    isterClickedSelector,
    baseLayersSelector,
    selectedFabLayersSelector,
    searchResultSelector,
    selectedTerLayersSelector,
    detailsTypeSelector
} from "@js/extension/selectors/catastoOpen";
import {
    getListaImmo,
    getVisuraBlob
} from "@js/extension/api/visura";
import { changeMapInfoState } from '@mapstore/actions/mapInfo';
import { getLayerFromId, groupsSelector } from '@mapstore/selectors/layers';
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
                    onRemoveBaseLayers(),
                    removeLayerFromMap(),
                    setControlProperty('catastoOpen', "enabled", false, false),
                    changeMapInfoState(true)
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
                        filename: "visura"
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
                        filename: "visura"
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
    startDownloadListaImmobileEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_START_DOWNLOAD_LISTA_IMMOBILE)
            .switchMap((action) => {
                const state = store.getState();
                const detailsType = detailsTypeSelector(state);
                const selectedLayers = detailsType === "T" ? selectedTerLayersSelector(state) : selectedFabLayersSelector(state);
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const endPoint = printEndPointSelector(state);
                let printObj = {
                    headers: headers,
                    pathName: printPathListaImm,
                    url: endPoint.endsWith('/') ? `${endPoint}${printPathListaImm}` : `${endPoint}/${printPathListaImm}`,
                    filename: "listaimmobili",
                    fileType: action.fileType,
                    query: {
                        comune: "H501",
                        tipoimmobile: detailsType,
                        format: action.fileType
                    }
                };
                const limmo = selectedLayers.map((item) => ({
                    foglio: item?.extras?.foglio,
                    particella: item?.extras?.numero
                }));
                const data = {
                    immobili: limmo
                };
                return Rx.Observable.defer(() => getListaImmo(printObj, data))
                    .switchMap((response) => Rx.Observable.of(endDownloadListaImmobile(
                        printObj, response.data
                    )))
                    .catch((e) => Rx.Observable.of(errorDownloadListaImmobile(action.fileType, e)));
            }),
    endDownloadListaImmobileEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_END_DOWNLOAD_LISTA_IMMOBILE)
            .switchMap((action) => {
                const printObj = action.printObj;
                const blob = action.blob;
                const filename = `${new Date().toISOString()}_${printObj.filename}.${printObj.fileType}`;
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
            }),
    onTabSelectEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_TAB_SELECT)
            .concatMap((action) => {
                const state = store.getState();
                const trackedBaselayers = trackedBaseLayersSelector(state);
                if (action.key === "search") {
                    let transactions = trackedBaselayers.map(
                        (layerID) => (Rx.Observable.of(changeLayerProperties(layerID, {visibility: false})))
                    );
                    if (trackedBaselayers.length === 0) {
                        return Rx.Observable.of(...[changeMapInfoState(true), onEnableExplore(false)]);
                    }
                    transactions.push(Rx.Observable.of(changeMapInfoState(true)));
                    transactions.push(Rx.Observable.of(onEnableExplore(false)));
                    return Rx.Observable.from(transactions).mergeAll();
                }
                if (trackedBaselayers.length !== 0) {
                    // let transactions = trackedBaselayers.map(
                    //     (layerID) => (Rx.Observable.of(changeLayerProperties(layerID, {visibility: true})))
                    // );
                    // return Rx.Observable.from(transactions).mergeAll();
                    return Rx.Observable.of(...[changeMapInfoState(false), onEnableExplore(true)]);
                }
                return Rx.Observable.of(...[checkBaseLayers(), changeMapInfoState(false), onEnableExplore(true)]);
            }),
    checkBaseLayersEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_CHECK_BASE_LAYERS)
            .switchMap(() => {
                const state = store.getState();
                const initBaseLayers = state?.catastoOpen?.initBaseLayers;
                if (!initBaseLayers || initBaseLayers === undefined) {
                    const errorMsg = "verify localconfig for base layers!";
                    return Rx.Observable.of(gotErrorBaseLayers(errorMsg));
                }
                // const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                // let geoserverOwsUrl = initBaseLayers.geoserverUrl;
                // geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                // return Rx.Observable.defer(() => getCapabilities(geoserverOwsUrl, headers))
                //     .switchMap((response) => {
                //         const check = checkLayersInDJson(
                //             response.data,
                //             initBaseLayers.fabbricati,
                //             initBaseLayers.particelle
                //         );
                //         if (!check.fabStatus && !check.terStatus) {
                //             const errorMsg = `${initBaseLayers.fabbricati} and ${initBaseLayers.particelle} not found.`;
                //             return Rx.Observable.of(gotErrorBaseLayers(errorMsg));
                //         } else {
                //             return Rx.Observable.of(setBaseLayers(
                //                 {
                //                     ...initBaseLayers,
                //                     ...check,
                //                 })
                //             );
                //         }
                //     })
                //     .catch((e) => Rx.Observable.of(gotErrorBaseLayers(e)));
                // MARK -- As requested by Anto we gonna skip get capability
                return Rx.Observable.of(
                    setBaseLayers(
                        {
                            ...initBaseLayers,
                            fabStatus: true,
                            terStatus: true
                        })
                );
            }),
    setBaseLayersEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SET_BASE_LAYERS)
            .concatMap((action) => {
                if (action?.baseLayers?.show) {
                    let transactions = [];
                    if (action.baseLayers.fabStatus) {
                        transactions.push(showBaseLayers(action.baseLayers.fabbricati, action.baseLayers.geoserverUrl, true));
                    }
                    if (action.baseLayers.terStatus) {
                        transactions.push(showBaseLayers(action.baseLayers.particelle, action.baseLayers.geoserverUrl));
                    }
                    return transactions.length === 0 ?
                        Rx.Observable.empty() :
                        Rx.Observable.from(transactions)
                            .concatMap((transaction) => {
                                return Rx.Observable.of(transaction);
                            });
                }
                return Rx.Observable.empty();
            }),
    showBaseLayersEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SHOW_BASE_LAYERS)
            .switchMap((action) => {
                let geoserverWFSUrl = action.geoserverUrl;
                geoserverWFSUrl += geoserverWFSUrl.endsWith("/") ? "wfs/" : "/wfs/";
                const layerID = `${action.layerName}-catastoOpen`;
                let layer = {
                    title: action.isFab ? "Fabbricati" : "Particelle",
                    type: "wfs",
                    name: action.layerName,
                    url: geoserverWFSUrl,
                    style: action.isFab ? fabStyle() : terStyle(),
                    id: layerID,
                    visibility: false
                };
                return Rx.Observable.of(
                    addLayer(layer), onTrackBaseLayers(layerID)
                );
            }),
    removeBaseLayersEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_REMOVE_BASE_LAYERS)
            .concatMap(() => {
                const state = store.getState();
                const trackedBaselayers = trackedBaseLayersSelector(state);
                let transactions = trackedBaselayers.map(
                    (layerID) => (Rx.Observable.of(removeLayer(layerID)))
                );
                transactions.push(
                    Rx.Observable.of(
                        removeNode(
                            groupOfSelection.id, "groups"
                        )
                    )
                );
                // if (trackedBaselayers.length === 0) {
                //     return Rx.Observable.empty();
                // }
                return Rx.Observable.from(transactions).mergeAll();
            }),
    onFabBtnClickedEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_BTN_FAB_CLICKED)
            .switchMap(() => {
                const state = store.getState();
                const groups = groupsSelector(state);
                const existIDS = getNodesIdsIfIdExists(
                    groups, groupOfSelection.id
                );
                if (existIDS.length === 0) {
                    return Rx.Observable.of(selectionCreateGroup());
                }
                return Rx.Observable.of(selectionCleanGroup());
            }),
    onTerBtnClickedEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_BTN_TER_CLICKED)
            .switchMap(() => {
                const state = store.getState();
                const groups = groupsSelector(state);
                const existIDS = getNodesIdsIfIdExists(
                    groups, groupOfSelection.id
                );
                if (existIDS.length === 0) {
                    return Rx.Observable.of(selectionCreateGroup());
                }
                return Rx.Observable.of(selectionCleanGroup());
            }),
    selectionCreateGroupEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECTION_CREATE_GROUP)
            .mergeMap(() => {
                const state = store.getState();
                const groups = groupsSelector(state);
                if (nodeExistsInTree(groups, groupOfSelection.id)) {
                    return Rx.Observable.empty();
                }
                if (nodeExistsInTree(groups, "Default")) {
                    return Rx.Observable.of(
                        addGroup(
                            null,
                            "Default",
                            {
                                title: groupOfSelection.title,
                                name: groupOfSelection.id,
                                id: groupOfSelection.id,
                                expanded: false
                            },
                            true
                        )
                    );
                }
                return Rx.Observable.of(
                    addGroup(
                        "Default",
                        null,
                        {
                            title: "Default",
                            id: "Default",
                            name: "Default"
                        },
                        true
                    )
                ).delay(500).concat(
                    Rx.Observable.of(
                        addGroup(
                            null,
                            "Default",
                            {
                                title: groupOfSelection.title,
                                name: groupOfSelection.id,
                                id: groupOfSelection.id,
                                expanded: false
                            },
                            true
                        )
                    ));
            }),
    selectionCleanGroupEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECTION_CLEAN_GROUP)
            .concatMap(() => {
                const state = store.getState();
                const groups = groupsSelector(state);
                const existIDS = getNodesIdsIfIdExists(
                    groups, groupOfSelection.id
                );
                if (existIDS.length === 0) {
                    return Rx.Observable.empty();
                }
                let transactions = existIDS.map(
                    (layerID) => (Rx.Observable.of(removeLayer(layerID)))
                );
                return Rx.Observable.from(transactions).mergeAll();
            }),
    onMapClickedListnerEpic: (action$, store) =>
        action$.ofType(CLICK_ON_MAP)
            .switchMap((action) => {
                const state = store.getState();
                const isExploreEnabled = isExploreEnabledSelector(state);
                const isFabClicked = isfabClickedSelector(state);
                const isTerClicked = isterClickedSelector(state);
                const coordinate = action?.point?.latlng || null;
                if (!isExploreEnabled) {
                    return Rx.Observable.empty();
                }
                if (isFabClicked) {
                    return coordinate ? Rx.Observable.of(
                        onLoadFabFeat(
                            coordinate.lat,
                            coordinate.lng
                        )
                    ) : Rx.Observable.empty();
                }
                if (isTerClicked) {
                    return coordinate ? Rx.Observable.of(onLoadTerFeat(
                        coordinate.lat, coordinate.lng
                    )) : Rx.Observable.empty();
                }
                return Rx.Observable.empty();
            }),
    onLoadFabFeatEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_FAB_FEAT)
            .switchMap((action) => {
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const baseLayers = baseLayersSelector(state);
                let geoserverOwsUrl = baseLayers.geoserverUrl;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const typename = baseLayers.fabbricati;
                const geometryName = baseLayers.geometryName;
                return Rx.Observable.defer(() => getFeatureForExplore(
                    geoserverOwsUrl,
                    typename,
                    action.lat,
                    action.lng,
                    geometryName,
                    headers
                )).switchMap((response) => {
                    if (response?.data?.features.length !== 0) {
                        return Rx.Observable.of(
                            onFabFeatLoaded(
                                response?.data?.features[0]
                            )
                        );
                    }
                    return Rx.Observable.empty();
                }
                ).catch(() => Rx.Observable.empty());
            }),
    onFabFeatLoadedEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_FAB_FEAT_LOADED)
            .switchMap((action) => {
                const feat = action.payload;
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const baseLayers = baseLayersSelector(state);
                let geoserverOwsUrl = baseLayers.geoserverUrl;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const typename = baseLayers.fabbricati;
                const sqlquery = createCQLFab(feat);
                return Rx.Observable.defer(() => getFabFeatureForExplore(
                    geoserverOwsUrl, typename, sqlquery, headers
                )).switchMap((response) => {
                    if (response?.data?.features.length !== 0) {
                        return Rx.Observable.of(onFabFeatPostProcess(response?.data?.features));
                    }
                    return Rx.Observable.empty();
                }).catch(() => Rx.Observable.empty());
            }),
    onFabFeatPostProcessEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_FAB_FEAT_POST_PROCESS)
            .switchMap((action) =>{
                const layer = fabFeatToLayer(action.payload, fabSelectedStyle());
                return Rx.Observable.of(selectionAppendLayer(layer, "fab"));
            }),
    onRemoveFabLayerEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SELECTION_REMOVE_FAB_LAYER)
            .switchMap((action) => {
                return Rx.Observable.of(removeLayer(action.layerID));
            }),
    onLoadTerFeatEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_LOAD_TER_FEAT)
            .switchMap((action) => {
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const baseLayers = baseLayersSelector(state);
                let geoserverOwsUrl = baseLayers.geoserverUrl;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const typename = baseLayers.particelle;
                const geometryName = baseLayers.geometryName;
                return Rx.Observable.defer(() => getFeatureForExplore(
                    geoserverOwsUrl,
                    typename,
                    action.lat,
                    action.lng,
                    geometryName,
                    headers
                )).switchMap((response) => {
                    if (response?.data?.features.length !== 0) {
                        return Rx.Observable.of(onTerFeatLoaded(response?.data?.features[0]));
                    }
                    return Rx.Observable.empty();
                }).catch(() => Rx.Observable.empty());
            }),
    onTerFeatLoadedEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_TER_FEAT_LOADED)
            .switchMap((action) => {
                const feat = action.payload;
                const layer = featToLayer(feat, terSelectedStyle());
                return Rx.Observable.of(selectionAppendLayer(layer, "ter"));
            }),
    onRemoveTerLayerEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SELECTION_REMOVE_TER_LAYER)
            .switchMap((action) => {
                return Rx.Observable.of(removeLayer(action.layerID));
            }),
    selectionAppendLayerEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECTION_APPEND_LAYER)
            .switchMap((action) => {
                const state = store.getState();
                const pLayer = getLayerFromId(state, action.layer.id);
                if (pLayer) {
                    return Rx.Observable.of(removeLayer(action.layer.id));
                }
                const newLayer = {...action.layer, group: groupOfSelection.id};
                return Rx.Observable.of(addLayer(newLayer));
            }),
    onFabSelectionLoadDetailEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECTION_FAB_DETAIL_LOAD)
            .concatMap(() => {
                const state = store.getState();
                const selectedFabLayers = selectedFabLayersSelector(state);
                let transactions = selectedFabLayers.map(item => onStartLoadFabDetail(item.extras));
                return Rx.Observable.concat(
                    Rx.Observable.of(onLoadDetails(true)),
                    Rx.Observable.from(transactions).concatMap(transaction => Rx.Observable.of(transaction))
                );
            }),
    onStartLoadFabDetailEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_FAB_DETAIL_LOAD_START)
            .mergeMap((action) => {
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(
                    () => getBuildingDetails(
                        'H501',
                        action?.extras?.foglio,
                        action?.extras?.numero,
                        null,
                        null,
                        null,
                        geoserverOwsUrl,
                        headers
                    )
                ).mergeMap((response) => {
                    return Rx.Observable.of(
                        onFabDetailsAppend(response.data)
                    );
                }).catch(() => Rx.Observable.empty());
            }),
    onFabDetailsAppendEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_FAB_DETAIL_RESULTS_APPEND)
            .switchMap((action)  => {
                const state = store.getState();
                const searchResults = searchResultSelector(state) || [];
                const buildingDetails = action.payload?.features?.map((feature) => (buildingDetailParser(feature)));
                const newResults = [...searchResults, ...buildingDetails];
                return Rx.Observable.of(onFabDetailsAppended(newResults));
            }),
    onFabDetailsAppendedEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_FAB_DETAIL_RESULTS_APPENDED)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.detailsAppended));
            }),
    onTerSelectionLoadDetailEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECTION_TER_DETAIL_LOAD)
            .concatMap(() => {
                const state = store.getState();
                const selectedTerLayers = selectedTerLayersSelector(state);
                const transactions = selectedTerLayers.map((item) => onStartLoadTerDetail(item.extras));
                return Rx.Observable.concat(
                    Rx.Observable.of(onLoadDetails(true)),
                    Rx.Observable.from(transactions).concatMap(transaction => Rx.Observable.of(transaction))
                );
            }),
    onStartLoadTerDetailEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_TER_DETAIL_LOAD_START)
            .mergeMap((action) => {
                const state = store.getState();
                const headers = state?.security?.token ? {Authorization: `Bearer ${state.security.token}` } : null;
                const backend = backendSelector(state);
                let geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getLandDetails(
                    'H501',
                    action?.extras?.foglio,
                    action?.extras?.numero,
                    action?.extras?.sezione,
                    null,
                    null,
                    geoserverOwsUrl,
                    headers
                )).mergeMap((response) => {
                    return Rx.Observable.of(onTerDetailsAppend(response.data));
                }).catch(() => Rx.Observable.empty());
            }),
    onTerDetailsAppendEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_TER_DETAIL_RESULTS_APPEND)
            .switchMap((action) => {
                const state = store.getState();
                const searchResults = searchResultSelector(state) || [];
                const landDetails = action.payload?.features?.map((feature) => (landDetailParser(feature)));
                const newResults = [...searchResults, ...landDetails];
                return Rx.Observable.of(onTerDetailsAppended(newResults));
            }),
    onTerDetailsAppendedEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_TER_DETAIL_RESULTS_APPENDED)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.detailsAppended));
            }),
    onSelectionExploreCancelEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_SELECTION_EXPLORE_CANCEL)
            .switchMap(() => {
                return Rx.Observable.of(
                    selectionCleanGroup()
                );
            })
});
