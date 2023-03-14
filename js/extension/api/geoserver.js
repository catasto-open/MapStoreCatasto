import axios from '@mapstore/libs/ajax';

import {
    cityLayer,
    toponymLayer,
    addressLayer,
    indirizzoImmLayer,
    townLayer,
    sectionLayer,
    sheetLayer,
    srsName,
    srs,
    landLayer,
    landByCodeLayer,
    buildingLayer,
    buildingByCodeLayer,
    naturalSubjectLayer,
    naturalSubjectLayerWBDay,
    naturalSubjectLayerWBPlace,
    naturalSubjectLayerWBoth,
    legalSubjectLayer,
    subjectPropertyLayer,
    landDetailLayer,
    buildingDetailLayer,
    propertyOwnerLayer,
    cityLayerTemp,
    sectionLayerTemp,
    landLayerTemp,
    landByCodeLayerTemp,
    buildingLayerTemp,
    buildingByCodeLayerTemp,
    subjectPropertyLayerTemp,
    landDetailLayerTemp,
    buildingDetailLayerTemp,
    propertyOwnerLayerTemp,
    indirizzoImmLayerTemp,
    buildingDetailByImmLayer,
    buildingDetailByImmLayerTemp
} from "@js/extension/utils/catastoOpen";

const service = 'WFS';
const version = '1.0.0';
const request = 'GetFeature';
const outputFormat = 'application/json';

export const getCityData = (city, endDate, geoserverOwsUrl, headers) => {
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
    } else {
        if (endDate !== null) {
            requestParams.viewparams = 'endDate:' + endDate;
            requestParams.typename = cityLayerTemp;
        } else {
            requestParams.typename = cityLayer;
        }
    }
    return headers === null ? axios.get(geoserverOwsUrl,  { params: requestParams})
        : axios.get(geoserverOwsUrl,  { params: requestParams, headers: headers});
};

export const getTwonData = (city, geoserverOwsUrl, headers) => {
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
    return headers === null ? axios.get(geoserverOwsUrl, {params: requestParams})
        : axios.get(geoserverOwsUrl, {params: requestParams, headers: headers});
};

export const getSectionByCityCode = (cityCode, endDate, geoserverOwsUrl, headers)  => {
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
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getSheetByCityCode = (cityCode, section, geoserverOwsUrl, headers)  => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    requestParams.viewparams = 'sectionCode:' + section + ';' + 'cityCode:' + cityCode;
    requestParams.typename = sheetLayer;
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getLandByCityCodeAndSheetNumber = (cityCode, sheetNumber, sectionCode, startDate, endDate, geoserverOwsUrl, headers) => {
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
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getBuildingByCityCodeAndSheetNumber = (cityCode, sheetNumber, sectionCode, startDate, endDate, geoserverOwsUrl, headers) => {
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
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getNaturalSubjects = (firstName, lastName, birthDate, birthPlace, fiscalCode, subjectCode, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (subjectCode !== null) {
        requestParams.typename = naturalSubjectLayer;
        requestParams.viewparams = 'subjectCode:' + subjectCode;
        return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
            : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
    }
    if (birthDate !== null && birthPlace !== null) {
        requestParams.typename = naturalSubjectLayerWBoth;
        requestParams.viewparams = 'firstName:' + firstName + ';'
            + 'lastName:' + lastName + ';'
            + 'birthDate:' + birthDate + ';'
            + 'birthPlace:' + birthPlace;
    } else if (birthDate !== null) {
        requestParams.typename = naturalSubjectLayerWBDay;
        requestParams.viewparams = 'firstName:' + firstName + ';'
                + 'lastName:' + lastName + ';'
                + 'birthDate:' + birthDate;
    } else if (birthPlace !== null) {
        requestParams.typename = naturalSubjectLayerWBPlace;
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
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getLegalSubjects = (vatNumber, businessName, identificationCode, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: legalSubjectLayer
    };
    if (identificationCode !== null) {
        requestParams.viewparams = 'subjectCode:' + identificationCode;
        return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
            : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
    }
    requestParams.viewparams = 'vatNumber:' + vatNumber + ';'
        + 'businessName:' + businessName + ';';
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getPropertyBySubject = (subjects, subjectType, startDate, endDate, geoserverOwsUrl, headers) => {
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
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getLandDetails = (cityCode, citySheet, landNumber, sectionCode, startDate, endDate, geoserverOwsUrl, headers) => {
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
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'landNumber:' + landNumber + ';' + 'sectionCode:' + sectionCode;
        requestParams.typename = landDetailLayer;
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getBuildingDetails = (cityCode, citySheet, buildingNumber, immobileCode, startDate, endDate, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (immobileCode === null) {
        if (startDate !== null && endDate !== null) {
            requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
            requestParams.typename = buildingDetailLayerTemp;
        } else {
            requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber;
            requestParams.typename = buildingDetailLayer;
        }
    } else {
        if (startDate !== null && endDate !== null) {
            requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber + ';' + 'immobileCode:' + immobileCode  + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
            requestParams.typename = buildingDetailByImmLayerTemp;
        } else {
            requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'citySheet:' + citySheet + ';' + 'buildingNumber:' + buildingNumber + ';' + 'immobileCode:' + immobileCode;
            requestParams.typename = buildingDetailByImmLayer;
        }
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getPropertyOwners = (property, cityCode, startDate, endDate, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: propertyOwnerLayer
    };
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'property:' + property.property + ';' + 'propertyType:' + property.propertyType + ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = propertyOwnerLayerTemp;
    } else {
        requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'property:' + property.property + ';' + 'propertyType:' + property.propertyType;
        requestParams.typename = propertyOwnerLayer;
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams})
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers});
};

export const getToponym = (toponymTxt, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat
    };
    if (toponymTxt !== null) {
        requestParams.viewparams = 'toponym:' + toponymTxt;
    }
    requestParams.typename = toponymLayer;
    return headers === null ? axios.get(geoserverOwsUrl,  { params: requestParams})
        : axios.get(geoserverOwsUrl,  { params: requestParams, headers: headers});
};

export const getAddress = (addressTxt, toponymNumber, cityCode, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        typename: addressLayer
    };
    if (addressTxt !== null || addressTxt !== '') {
        requestParams.viewparams = 'address:' + addressTxt + ';' + 'toponimo:' + toponymNumber + ';' + 'cityCode:' + cityCode;
    } else {
        requestParams.viewparams = 'toponimo:' + toponymNumber + ';' + 'cityCode:' + cityCode;
    }
    return headers === null ? axios.get(geoserverOwsUrl, {params: requestParams})
        : axios.get(geoserverOwsUrl, {params: requestParams, headers: headers});
};

export const getBuildingByAddress = (cityCode, toponym, addressName, houseNumber, startDate, endDate, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'toponymCode:' + toponym + ';' + 'addressName:' + addressName + ';' + 'houseNumber:' + houseNumber;
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams += ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = indirizzoImmLayerTemp;
    } else {
        requestParams.typename = indirizzoImmLayer;
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams, timeout: 500000 })
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers, timeout: 500000 });
};

export const getLandByCodiceImm = (cityCode, immobileCode, endDate, startDate, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'immobileCode:' + immobileCode;
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams += ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = landByCodeLayerTemp;
    } else {
        requestParams.typename = landByCodeLayer;
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams })
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers });
};

export const getBuildingByCodiceImm = (cityCode, immobileCode, endDate, startDate, geoserverOwsUrl, headers) => {
    const requestParams = {
        service: service,
        version: version,
        request: request,
        outputFormat: outputFormat,
        srsName: srsName,
        srs: srs
    };
    requestParams.viewparams = 'cityCode:' + cityCode + ';' + 'immobileCode:' + immobileCode;
    if (startDate !== null && endDate !== null) {
        requestParams.viewparams += ';' + 'startDate:' + startDate + ';' + 'endDate:' + endDate;
        requestParams.typename = buildingByCodeLayerTemp;
    } else {
        requestParams.typename = buildingByCodeLayer;
    }
    return headers === null ? axios.get(geoserverOwsUrl, { params: requestParams })
        : axios.get(geoserverOwsUrl, { params: requestParams, headers: headers });
};
