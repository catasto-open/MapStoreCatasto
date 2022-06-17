import axios from "axios";
import {geoserverUrl} from "../../../config";
import {
    cityLayer,
    sectionLayer,
    sheetLayer,
    srsName,
    srs,
    landLayer,
    buildingLayer,
    naturalSubjectLayer,
    legalSubjectLayer,
    subjectPropertyLayer,
    landDetailLayer,
    buildingDetailLayer, propertyOwnerLayer
} from "@js/extension/utils/catastoOpen";

export const geoserverOwsUrl = geoserverUrl.concat('', 'ows/');

const service = 'WFS';
const version = '1.0.0';
const request = 'GetFeature';
const outputFormat = 'application/json';

export const getCityData = (city) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: cityLayer
    };
    if (city !== null) {
        requestParams.viewparams = 'city:' + city;
    }
    return axios.get(geoserverOwsUrl,  { params: requestParams});
};

export const getSectionByCityCode = (cityCode)  => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: sectionLayer
    };
    if (cityCode !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getSheetByCityCode = (cityCode)  => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: sheetLayer,
        srsName: srsName,
        srs: srs
    };
    if (cityCode !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode;
    }
    requestParams.viewparams = 'cityCode:' + cityCode + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLandByCityCodeAndSheetNumber = (cityCode, sheetNumber) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: landLayer,
        srsName: srsName,
        srs: srs
    };
    const checkDate = new Date().toISOString().slice(0, 10);
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'checkDate:' + checkDate;
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getBuildingByCityCodeAndSheetNumber = (cityCode, sheetNumber) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: buildingLayer,
        srsName: srsName,
        srs: srs
    };
    const checkDate = new Date().toISOString().slice(0, 10);
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'checkDate:' + checkDate;
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getNaturalSubjects = (firstName, lastName, fiscalCode) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: naturalSubjectLayer
    };
    requestParams.viewparams = 'firstName:' + firstName + ';'
        + 'lastName:' + lastName + ';'
        + 'fiscalCode:' + fiscalCode;
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLegalSubjects = (vatNumber, businessName) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: legalSubjectLayer
    };
    requestParams.viewparams = 'vatNumber:' + vatNumber + ';'
        + 'businessName:' + businessName + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getPropertyBySubject = (subjects, subjectType) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: subjectPropertyLayer,
        srsName: srsName,
        srs: srs
    };
    requestParams.viewparams = 'subjects:' + subjects + ';'
        + 'subjectType:' + subjectType + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLandDetails = (cityCode, citySheet, landNumber) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: landDetailLayer
    };
    const checkDate = new Date().toISOString().slice(0, 10);
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';'
        + 'landNumber:' + landNumber + ';' + 'checkDate:' + checkDate + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getBuildingDetails = (cityCode, citySheet, buildingNumber) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: buildingDetailLayer
    };
    const checkDate = new Date().toISOString().slice(0, 10);
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';'
        + 'buildingNumber:' + buildingNumber + ';' + 'checkDate:' + checkDate + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getPropertyOwners = (property, cityCode) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: propertyOwnerLayer
    };
    const checkDate = new Date().toISOString().slice(0, 10);
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'property:' + property.property + ';'
        + 'propertyType:' + property.propertyType + ';'
        + 'checkDate:' + checkDate + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};
