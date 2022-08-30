export const cityLayer = 'CatastoOpenDev:catasto_comuni';
export const townLayer = 'CatastoOpenDev:catasto_comuni_anag';
export const sectionLayer = 'CatastoOpenDev:catasto_sezioni';
export const sheetLayer = 'CatastoOpenDev:catasto_fogli';
export const landLayer = 'CatastoOpenDev:catasto_terreni';
export const buildingLayer = 'CatastoOpenDev:catasto_fabbricati';
export const naturalSubjectLayer = 'CatastoOpenDev:catasto_persone_fisiche';
export const naturalSubjectLayerWBday = 'catasto_persone_fisiche_with_bday';
export const legalSubjectLayer = 'CatastoOpenDev:catasto_persone_giuridiche';
export const subjectPropertyLayer = 'CatastoOpenDev:catasto_particelle_soggetto';
export const landDetailLayer = 'CatastoOpenDev:catasto_dettagli_terreno';
export const buildingDetailLayer = 'CatastoOpenDev:catasto_dettagli_fabbricato';
export const propertyOwnerLayer = 'CatastoOpenDev:catasto_titolari_immobile';

export const cityLayerTemp = 'CatastoOpenDev:catasto_comuni_temp';
export const sectionLayerTemp = 'CatastoOpenDev:catasto_sezioni_temp';
export const sheetLayerTemp = 'CatastoOpenDev:catasto_fogli_temp';
export const landLayerTemp = 'CatastoOpenDev:catasto_terreni_temp';
export const buildingLayerTemp = 'CatastoOpenDev:catasto_fabbricati_temp';
export const subjectPropertyLayerTemp = 'CatastoOpenDev:catasto_particelle_soggetto_temp';
export const landDetailLayerTemp = 'CatastoOpenDev:catasto_dettagli_terreno_temp';
export const buildingDetailLayerTemp = 'CatastoOpenDev:catasto_dettagli_fabbricato_temp';
export const propertyOwnerLayerTemp = 'CatastoOpenDev:catasto_titolari_immobile_temp';

export const naturalSubjectType = 'P';
export const legalSubjectType = 'G';
export const subjectLandPropertyType = 'Terreni';
export const subjectBuildingPropertyType = 'Fabbricati';
export const srs = "EPSG:4326";
export const srsName = "EPSG:4326";

export const services = [
    {
        id: "PARCEL",
        placeholder: "extension.catastoOpenPanel.services.parcels.placeholder",
        filters: [
            {
                id: "LANDS",
                name: "extension.catastoOpenPanel.services.parcels.filters.lands.name"
            },
            {
                id: "BUILDINGS",
                name: "extension.catastoOpenPanel.services.parcels.filters.buildings.name"
            }
        ],
        state_identifier: "parcels"
    },
    {
        id: "NATURAL-SUBJECT",
        placeholder: "extension.catastoOpenPanel.services.naturalSubjects.placeholder",
        filters: [
            {
                id: "FIRST-AND-LAST-NAME",
                name: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.name",
                placeholder: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.placeholder",
                filters: [
                    {
                        id: "FIRST-NAME",
                        name: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.filters.firstName.name"
                    },
                    {
                        id: "LAST-NAME",
                        name: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.filters.lastName.name"
                    },
                    {
                        id: "BIRTH-DATE",
                        name: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.filters.birthDate.name"
                    },
                    {
                        id: "BIRTH-PLACE",
                        name: "extension.catastoOpenPanel.services.naturalSubjects.filters.firstAndLastName.filters.birthPlace.name"
                    }
                ]
            },
            {
                id: "FISCAL-CODE",
                name: "extension.catastoOpenPanel.services.naturalSubjects.filters.fiscalCode.name",
                placeholder: "extension.catastoOpenPanel.services.naturalSubjects.filters.fiscalCode.placeholder"
            },
            {
                id: "SUBJECT-CODE",
                name: "extension.catastoOpenPanel.services.naturalSubjects.filters.subjectCode.name",
                placeholder: "extension.catastoOpenPanel.services.naturalSubjects.filters.subjectCode.placeholder"
            }
        ],
        state_identifier: "naturalSubjects"
    },
    {
        id: "LEGAL-SUBJECT",
        placeholder: "extension.catastoOpenPanel.services.legalSubjects.placeholder",
        filters: [
            {
                id: "VAT-NUMBER",
                name: "extension.catastoOpenPanel.services.legalSubjects.filters.vatNumber.name",
                placeholder: "extension.catastoOpenPanel.services.legalSubjects.filters.vatNumber.placeholder"
            },
            {
                id: "BUSINESS-NAME",
                name: "extension.catastoOpenPanel.services.legalSubjects.filters.businessName.name",
                placeholder: "extension.catastoOpenPanel.services.legalSubjects.filters.businessName.placeholder"
            },
            {
                id: "IDENTIFICATION-CODE",
                name: "extension.catastoOpenPanel.services.legalSubjects.filters.identificationCode.name",
                placeholder: "extension.catastoOpenPanel.services.legalSubjects.filters.identificationCode.placeholder"
            }
        ],
        state_identifier: "legalSubjects"
    }
];

export const cityParser = (feature) => {
    const properties = feature.properties;
    return {
        code: properties.code,
        name: properties.name
    };
};

export const sectionParser = (feature) => {
    const properties = feature.properties;
    return {
        name: properties.name
    };
};

export const geomFeatureParser = (feature) => {
    return {
        number: feature?.properties?.number,
        section: feature?.properties?.section,
        id: feature?.id,
        feature
    };
};

export const subjectParser = (feature) => {
    const properties = feature?.properties;
    const subjects = properties?.subjects.replaceAll(",", "\\,");
    const subjectType = properties?.subjecttype;
    switch (subjectType) {
    case naturalSubjectType:
        const dateOfBirth = properties?.dateofbirth?.replace("Z", "") || '_';
        const cityOfBirth = properties?.cityofbirth || '_';
        const fiscalCode = properties?.fiscalcode || '_';
        const firstName = properties?.firstname || null;
        const lastName = properties?.lastname || null;
        return {
            subjects,
            subjectType,
            dateOfBirth,
            cityOfBirth,
            fiscalCode,
            firstName,
            lastName
        };
    case legalSubjectType:
        const businessName = properties?.businessname || null;
        const vatNumber = properties?.vatnumber || null;
        const branch = properties?.branch || null;
        return {
            subjects,
            subjectType,
            businessName,
            vatNumber,
            branch
        };
    default:
        return properties;
    }
};

const layerStyle = (layerType) => {
    switch (layerType) {
    case sheetLayer:
        return  {
            "weight": 2,
            "radius": 10,
            "opacity": 1,
            "fillOpacity": 0.1,
            "color": "rgba(0, 0, 0, 0.4)",
            "fillColor": "rgba(0, 0, 0, 0.7)"
        };
    case landLayer:
        return {
            "weight": 2,
            "radius": 10,
            "opacity": 1,
            "fillOpacity": 0.1,
            "color": "rgba(0, 255, 0, 0.4)",
            "fillColor": "rgba(0, 255, 0, 0.7)"
        };
    case buildingLayer:
        return   {
            "weight": 2,
            "radius": 10,
            "opacity": 1,
            "fillOpacity": 0.1,
            "color": "rgba(255, 0, 0, 0.4)",
            "fillColor": "rgba(255, 0, 0, 0.7)"
        };
    default:
        return {};
    }
};

const layerTitle = (layer, layerType) => {
    const properties = layer?.feature?.properties;
    const city = properties?.citycode;
    const section = "-".concat(properties?.section);
    const sheet = "-".concat(properties?.sheet);
    const number = layerType === sheetLayer ? false : "-".concat(properties?.number);
    return city.concat(section).concat(sheet).concat(number ? number : "");
};

export const geomFeatureToLayer = (geom, layerType) => {
    let coordinates = geom?.feature?.properties?.extent?.coordinates;
    coordinates = coordinates && coordinates?.length > 0 ? coordinates[0] : false;
    let extent = null;
    if (coordinates) {
        extent = [
            coordinates[0][0],
            coordinates[0][1],
            coordinates[2][0],
            coordinates[2][1]
        ];
    }
    let layer = {};
    layer.layerType = layerType;
    layer.type = "vector";
    layer.visibility = true;
    layer.id = geom.feature.id;
    layer.hideLoading = true;
    layer.bbox = {
        bbox: extent,
        crs: srs
    };
    layer.features = [geom.feature];
    if (layerType === subjectPropertyLayer) {
        if (geom?.propertyType === subjectLandPropertyType) {
            layer.style = layerStyle(landLayer);
        } else {
            if (geom?.propertyType === subjectBuildingPropertyType) {
                layer.style = layerStyle(buildingLayer);
            }
        }
    } else {
        layer.style = layerStyle(layerType);
    }
    layer.group = "CatastoOpen";
    layer.title = layerTitle(geom, layerType);
    if (!coordinates) {
        layer = undefined;
    }
    return layer;
};

export const subjectPropertyParser = (feature) => {
    const properties = feature?.properties;
    const city = properties?.city;
    const cityCode = properties?.citycode;
    const section = properties?.section;
    const sheet = properties?.sheet;
    const number = properties?.number;
    const subordinate = properties?.subordinate;
    const right = properties?.right;
    const part = properties?.part;
    const classification = properties?.classification;
    const _class = properties?.class;
    const consistency = properties?.consistency;
    const income = properties?.income;
    const lot = properties?.lot;
    const propertyType = properties?.propertytype;
    const extent = properties?.extent;
    const startDate = properties?.startdate;
    const endDate = properties?.enddate;

    return {
        city,
        cityCode,
        section,
        sheet,
        number,
        subordinate,
        right,
        part,
        classification,
        _class,
        consistency,
        income,
        lot,
        propertyType,
        feature,
        extent,
        startDate,
        endDate
    };
};

export const buildingDetailParser = (feature) => {
    const properties = feature?.properties;
    const property = properties.property;
    const propertyType = properties.propertytype;
    const subordinate = (properties?.subordinate === null) ? "_" : properties?.subordinate;
    const censusZone = properties?.censuszone;
    const category = properties?.category;
    const _class = properties?._class;
    const consistency = properties?.consistency;
    const rent = properties?.rent;
    const lot = properties?.lot;
    const startDate = properties?.startdate;
    const endDate = properties?.enddate;

    return {
        property,
        propertyType,
        subordinate,
        censusZone,
        category,
        _class,
        consistency,
        rent,
        lot,
        startDate,
        endDate
    };
};

export const landDetailParser = (feature) => {
    const properties = feature?.properties;
    const property = properties.property;
    const propertyType = properties.propertytype;
    const subordinate = (properties?.subordinate === null) ? "_" : properties?.subordinate;
    const quality = properties?.quality;
    const _class = properties?._class;
    const hectares = properties?.hectares;
    const are = properties?.are;
    const centiare = properties?.centiare;
    const lot = properties?.lot;
    const cadastralRent = properties?.cadastralRent;
    const agriculturalRent = properties?.agriculturalRent;
    const startDate = properties?.startdate;
    const endDate = properties?.enddate;

    return {
        property,
        propertyType,
        subordinate,
        quality,
        _class,
        hectares,
        are,
        centiare,
        lot,
        cadastralRent,
        agriculturalRent,
        startDate,
        endDate
    };
};

export const propertyOwnerParser = (feature) => {
    const properties = feature?.properties;
    const nominative = properties?.nominative;
    const fiscalCode = properties?.fiscalcode;
    const city = properties?.city;
    const right = properties?.right;
    const part = properties?.part;
    const startDate = properties?.startdate;
    const endDate = properties?.enddate;

    return {
        nominative,
        fiscalCode,
        city,
        right,
        part,
        startDate,
        endDate
    };
};

export const fixDateTimeZone = (date) => {
    date.setMinutes(date.getMinutes() + 480);
    return date;
};

export const tomorrow = () => {
    let currentDate = new Date();
    return new Date(currentDate.setDate(currentDate.getDate() + 1));
};
