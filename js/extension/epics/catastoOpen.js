import * as Rx from 'rxjs';
import {setControlProperty} from '@mapstore/actions/controls';
import {updateMapLayout} from "@mapstore/actions/maplayout";
import {
    CATASTO_OPEN_ACTIVATE_PANEL,
    CATASTO_OPEN_DEACTIVATE_PANEL,
    CATASTO_OPEN_SELECT_SERVICE,
    CATASTO_OPEN_SELECT_CITY,
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
    loadedCityData,
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
    loadedPropertyOwnerData
} from "@js/extension/actions/catastoOpen";
import {services, fixDateOutOfRange} from "@js/extension/utils/catastoOpen";
import {
    getBuildingByCityCodeAndSheetNumber,
    getBuildingDetails,
    getCityData,
    getLandByCityCodeAndSheetNumber,
    getLandDetails,
    getLegalSubjects,
    getNaturalSubjects,
    getPropertyBySubject,
    getPropertyOwners,
    getSectionByCityCode,
    getSheetByCityCode
} from "@js/extension/api/geoserver";
import {addGroup, addLayer, removeNode} from "@mapstore/actions/layers";
import {zoomToExtent} from "@mapstore/actions/map";
import {resultGridLoadRows} from "@js/extension/actions/resultGrid";
import {backendSelector} from "@js/extension/selectors/catastoOpen";
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
                const citySearchTxt = action?.citySearchTxt ||  null;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getCityData(citySearchTxt, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedCityData(response.data)))
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
                var geoserverOwsUrl = backend.url;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
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
                const cityCode = state.catastoOpen.selectedCity.code;
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
                var geoserverOwsUrl = backend.url;
                const section = state.catastoOpen.selectedSection;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getSheetByCityCode(cityCode, section.value, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedSheetData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    selectSheetEpic: (action$, store) =>
        action$.ofType(CATASTO_OPEN_SELECT_SHEET)
            .switchMap(() => {
                const state = store.getState();
                const cityCode = state.catastoOpen?.selectedCity?.code;
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
                var geoserverOwsUrl = backend.url;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
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
                var geoserverOwsUrl = backend.url;
                const section = state.catastoOpen.selectedSheet.feature.properties.section;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
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
                const fiscalCode = naturalSubject?.fiscalCode ? "\'" + naturalSubject.fiscalCode + "\'" : null;
                const firstName = naturalSubject?.firstName ? "\'" + naturalSubject.firstName.trim() + "\'" : null;
                const lastName = naturalSubject?.lastName ?  "\'" + naturalSubject.lastName.replace("'", "`").trim() + "\'" : null;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getNaturalSubjects(firstName, lastName, fiscalCode, geoserverOwsUrl))
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
                const vatNumber = (legalSubject?.vatNumber) ? "\'" + legalSubject.vatNumber + "\'" : null;
                const businessName = (legalSubject?.businessName) ? "\'" + legalSubject.businessName.trim() + "\'" : null;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() => getLegalSubjects(vatNumber, businessName, geoserverOwsUrl))
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
                var geoserverOwsUrl = backend.url;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
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
                const bbox = {
                    crs: "EPSG:4326",
                    bounds: {
                        minx: Math.min(layer.bbox.bbox[0], layer.bbox.bbox[2]),
                        miny: Math.min(layer.bbox.bbox[1], layer.bbox.bbox[3]),
                        maxx: Math.min(layer.bbox.bbox[0], layer.bbox.bbox[2]),
                        maxy: Math.max(layer.bbox.bbox[1], layer.bbox.bbox[3])
                    }
                };
                return Rx.Observable.of(
                    addGroup(layer.group, undefined, {id: layer.group}),
                    addLayer(layer),
                    updateMapLayout(layout),
                    zoomToExtent(bbox.bounds, bbox.crs, undefined, null));
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
                const selectedCityCode = state.catastoOpen?.selectedCity?.code;
                const selectedSheetNumber = state.catastoOpen?.selectedSheet?.number;
                const selectedBuildingNumber = state.catastoOpen?.selectedBuilding?.number;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getBuildingDetails(selectedCityCode, selectedSheetNumber, selectedBuildingNumber, startDate, endDate, geoserverOwsUrl))
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
                const selectedCityCode = state.catastoOpen?.selectedCity?.code;
                const selectedSheetNumber = state.catastoOpen?.selectedSheet?.number;
                const selectedLandNumber = state.catastoOpen?.selectedLand?.number;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getLandDetails(selectedCityCode, selectedSheetNumber, selectedLandNumber, startDate, endDate, geoserverOwsUrl))
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
                const cityCode = state.catastoOpen?.selectedCity?.code;
                const property = action?.property;
                const backend = backendSelector(state);
                var geoserverOwsUrl = backend.url;
                const startDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.startDate ? fixDateOutOfRange(state.catastoOpen.startDate.toISOString().slice(0, 10)) : null;
                const endDate = state?.catastoOpen.isTemporalSearchChecked && state?.catastoOpen.endDate ? state.catastoOpen.endDate.toISOString().slice(0, 10) : null;
                geoserverOwsUrl += geoserverOwsUrl.endsWith("/") ? "ows/" : "/ows/";
                return Rx.Observable.defer(() =>  getPropertyOwners(property, cityCode, startDate, endDate, geoserverOwsUrl))
                    .switchMap((response) => Rx.Observable.of(loadedPropertyOwnerData(response.data)))
                    .catch(e => Rx.Observable.of(loadError(e.message)));
            }),
    loadedPropertyOwnerDataEpic: (action$) =>
        action$.ofType(CATASTO_OPEN_LOADED_PROPERTY_OWNER_DATA)
            .switchMap((action) => {
                return Rx.Observable.of(resultGridLoadRows(action?.propertyOwners));
            })
});
