import axios from "axios";

import {
    cityLayer,
    townLayer,
    sectionLayer,
    sheetLayer,
    srsName,
    srs,
    landLayer,
    buildingLayer,
    naturalSubjectLayer,
    naturalSubjectLayerWBday,
    legalSubjectLayer,
    subjectPropertyLayer,
    landDetailLayer,
    buildingDetailLayer,
    propertyOwnerLayer,
    cityLayerTemp,
    sectionLayerTemp,
    sheetLayerTemp,
    landLayerTemp,
    buildingLayerTemp,
    subjectPropertyLayerTemp,
    landDetailLayerTemp,
    buildingDetailLayerTemp,
    propertyOwnerLayerTemp
} from "@js/extension/utils/catastoOpen";

const service = 'WFS';
const version = '1.0.0';
const request = 'GetFeature';
const outputFormat = 'application/json';

export const getCityData = (city, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (city !== null) {
        if (endDate !== null) {
            requestParams.viewparams = 'endDate:' + endDate + ';' + 'city:' + city;
            requestParams.typename = cityLayerTemp;
        } else {
            requestParams.viewparams = 'city:' + city;
            requestParams.typename = cityLayer;
        }
    }
    if (endDate !== null) {
        requestParams.viewparams = 'endDate:' + endDate;
        requestParams.typename = cityLayerTemp;
    } else {
        requestParams.typename = cityLayer;
    }
    return axios.get(geoserverOwsUrl,  { params: requestParams});
};

export const getTwonData = (city, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: townLayer
    };
    if (city !== null) {
        requestParams.viewparams = 'city:' + city;
    }
    return axios.get(geoserverOwsUrl, {params: requestParams});
};

export const getSectionByCityCode = (cityCode, endDate, geoserverOwsUrl)  => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (cityCode !== null) {
        if (endDate !== null) {
            requestParams.viewparams = 'endDate: ' + endDate + ';' + 'cityCode:' + cityCode;
            requestParams.typename = sectionLayerTemp;
        } else {
            requestParams.viewparams = 'cityCode:' + cityCode;
            requestParams.typename = sectionLayer;
        }
    } else {
        if (endDate !== null) {
            requestParams.viewparams = 'endDate: ' + endDate;
            requestParams.typename = sectionLayerTemp;
        } else {
            requestParams.typename = sectionLayer;
        }
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getSheetByCityCode = (cityCode, section, startDate, endDate, geoserverOwsUrl)  => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'sectionCode:' + section + ';' + 'cityCode:' + cityCode + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = sheetLayerTemp;
    } else {
        requestParams.viewparams = 'sectionCode:' + section + ';' + 'cityCode:' + cityCode;
        requestParams.typename = sheetLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLandByCityCodeAndSheetNumber = (cityCode, sheetNumber, sectionCode, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'sectionCode:' + sectionCode + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = landLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'sectionCode:' + sectionCode;
        requestParams.typename = landLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getBuildingByCityCodeAndSheetNumber = (cityCode, sheetNumber, sectionCode, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: buildingLayer,
        srsName: srsName,
        srs: srs
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'sectionCode:' + sectionCode + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = buildingLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + sheetNumber + ';' + 'sectionCode:' + sectionCode;
        requestParams.typename = buildingLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getNaturalSubjects = (firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (subjectCode !== null) {
        requestParams.typename = naturalSubjectLayer;
        requestParams.viewparams = 'subjectCode:' + subjectCode;
        return axios.get(geoserverOwsUrl, { params: requestParams});
    }
    if (birthDate !== null && birthPlace !== null) {
        requestParams.typename = naturalSubjectLayerWBday;
        requestParams.viewparams = 'firstName:' + firstName + ';'
            + 'lastName:' + lastName + ';'
            + 'birthDate:' + birthDate + ';'
            + 'birthPlace:' + birthPlace;
    } else {
        requestParams.typename = naturalSubjectLayer;
        requestParams.viewparams = 'firstName:' + firstName + ';'
            + 'lastName:' + lastName + ';'
            + 'fiscalCode:' + fiscalCode;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLegalSubjects = (vatNumber, businessName, identificationCode, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: legalSubjectLayer
    };
    if (identificationCode !== null) {
        requestParams.viewparams = 'subjectCode:' + identificationCode;
        return axios.get(geoserverOwsUrl, { params: requestParams});
    }
    requestParams.viewparams = 'vatNumber:' + vatNumber + ';'
        + 'businessName:' + businessName + ';';
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getPropertyBySubject = (subjects, subjectType, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'subjects:' + subjects + ';' + 'subjectType:' + subjectType + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = subjectPropertyLayerTemp;
    } else {
        requestParams.viewparams = 'subjects:' + subjects + ';' + 'subjectType:' + subjectType;
        requestParams.typename = subjectPropertyLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getLandDetails = (cityCode, citySheet, landNumber, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'landNumber:' + landNumber + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = landDetailLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'landNumber:' + landNumber;
        requestParams.typename = landDetailLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getBuildingDetails = (cityCode, citySheet, buildingNumber, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = buildingDetailLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber;
        requestParams.typename = buildingDetailLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};

export const getPropertyOwners = (property, cityCode, startDate, endDate, geoserverOwsUrl) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: propertyOwnerLayer
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'property:' + property.property + ';' + 'propertyType:' + property.propertyType + ';' + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = propertyOwnerLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'property:' + property.property + ';' + 'propertyType:' + property.propertyType;
        requestParams.typename = propertyOwnerLayer;
    }
    return axios.get(geoserverOwsUrl, { params: requestParams});
};
