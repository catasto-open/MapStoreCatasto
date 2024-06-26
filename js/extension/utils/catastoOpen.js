export const cityLayer = 'CatastoOpen:catasto_comuni';
export const townLayer = 'CatastoOpen:catasto_comuni_anag';
export const sectionLayer = 'CatastoOpen:catasto_sezioni';
export const sheetLayer = 'CatastoOpen:catasto_fogli';
export const landLayer = 'CatastoOpen:catasto_terreni';
export const buildingLayer = 'CatastoOpen:catasto_fabbricati';
export const naturalSubjectLayer = 'CatastoOpen:catasto_persone_fisiche';
export const naturalSubjectLayerWBDay = 'CatastoOpen:catasto_persone_fisiche_with_bday';
export const naturalSubjectLayerWBPlace = 'CatastoOpen:catasto_persone_fisiche_with_bplace';
export const naturalSubjectLayerWBoth = 'CatastoOpen:catasto_persone_fisiche_with_both';
export const legalSubjectLayer = 'CatastoOpen:catasto_persone_giuridiche';
export const subjectPropertyLayer = 'CatastoOpen:catasto_particelle_soggetto';
export const landDetailLayer = 'CatastoOpen:catasto_dettagli_terreno';
export const buildingDetailLayer = 'CatastoOpen:catasto_dettagli_fabbricato';
export const propertyOwnerLayer = 'CatastoOpen:catasto_titolari_immobile';
export const toponymLayer = 'CatastoOpen:catasto_toponimo';
export const addressLayer = 'CatastoOpen:catasto_indirizzo_btop';
export const indirizzoImmLayer = 'CatastoOpen:catasto_indirizzo_immobile';
export const buildingByCodeLayer = 'CatastoOpen:catasto_fabbricati_bcodice';
export const landByCodeLayer = 'CatastoOpen:catasto_terreni_bcodice';
export const buildingDetailByImmLayer = 'CatastoOpen:catasto_dettagli_fabbricato_byimm';

export const cityLayerTemp = 'CatastoOpen:catasto_comuni_temp';
export const sectionLayerTemp = 'CatastoOpen:catasto_sezioni_temp';
// export const sheetLayerTemp = 'CatastoOpen:catasto_fogli_temp';
export const landLayerTemp = 'CatastoOpen:catasto_terreni_temp';
export const buildingLayerTemp = 'CatastoOpen:catasto_fabbricati_temp';
export const subjectPropertyLayerTemp = 'CatastoOpen:catasto_particelle_soggetto_temp';
export const landDetailLayerTemp = 'CatastoOpen:catasto_dettagli_terreno_temp';
export const buildingDetailLayerTemp = 'CatastoOpen:catasto_dettagli_fabbricato_temp';
export const propertyOwnerLayerTemp = 'CatastoOpen:catasto_titolari_immobile_temp';
export const indirizzoImmLayerTemp = 'CatastoOpen:catasto_indrizzo_immobile_temp';
export const buildingByCodeLayerTemp = 'CatastoOpen:catasto_fabbricati_bcodice_temp';
export const landByCodeLayerTemp = 'CatastoOpen:catasto_terreni_bcodice_temp';
export const buildingDetailByImmLayerTemp = 'CatastoOpen:catasto_dettagli_fabbricato_byimm_temp';

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
                id: "IMMOBILE",
                placeholder: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobile.placeholder",
                filters: [
                    {
                        id: "LANDS",
                        name: "extension.catastoOpenPanel.services.parcels.filters.lands.name"
                    },
                    {
                        id: "BUILDINGS",
                        name: "extension.catastoOpenPanel.services.parcels.filters.buildings.name"
                    }
                ]
            },
            {
                id: "IMMOBILEBYADD",
                placeholder: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.placeholder",
                filters: [
                    {
                        id: "TOPONYM",
                        name: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.toponym.name"
                    },
                    {
                        id: "ADDRESS-NAME",
                        name: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.addressName.name"
                    },
                    {
                        id: "NCIVICO",
                        name: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.ncivico.name"
                    }
                ]
            },
            {
                id: "IMMOBILEBYCODE",
                placeholder: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.placeholder",
                filters: [
                    {
                        id: "IMMTYPE",
                        name: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileType.name"
                    },
                    {
                        id: "IMMCODE",
                        name: "extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileCode.name"
                    }
                ]
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
        code: properties?.code,
        name: properties?.name
    };
};

export const sectionParser = (feature) => {
    const properties = feature?.properties;
    return {
        name: properties?.name
    };
};

export const geomFeatureParser = (feature) => {
    return {
        number: feature?.properties?.number,
        section: feature?.properties?.section,
        id: feature?.id,
        sheet: feature?.properties?.sheet,
        feature
    };
};

export const subjectParser = (feature) => {
    const properties = feature?.properties;
    const subjects = properties?.subjects.replaceAll(",", "\\,");
    const subjectType = properties?.subjecttype;
    const province = properties?.province || null;
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
            lastName,
            province
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
            branch,
            province
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
    const hasbbox = geom?.feature?.bbox?.length === 4 ? true : false;
    let layer = {};
    if (hasbbox) {
        layer.layerType = layerType;
        layer.type = "vector";
        layer.visibility = true;
        layer.id = geom.feature.id;
        layer.hideLoading = true;
        layer.bbox = {
            bounds: {
                minx: geom.feature.bbox[0],
                miny: geom.feature.bbox[1],
                maxx: geom.feature.bbox[2],
                maxy: geom.feature.bbox[3]
            },
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
        layer.title = layerTitle(geom, layerType);
    } else {
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
    const immobile = properties?.immobile;
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
        immobile,
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
    const citycode = properties?.citycode;
    const sectioncode = properties?.sectioncode;
    const progressiv = properties?.progressiv;
    const sheetcode = properties?.sheetcode;
    const particella = properties?.particella;
    const province = properties?.province;
    const numerof = properties?.numero_f;
    const superficie = properties?.superficie;
    const rendital = properties?.rendita_l;
    const lotto = properties?.lotto;
    const edificio = properties?.edificio;
    const scala = properties?.scala;
    const interno1 = properties?.interno_1;
    const interno2 = properties?.interno_2;
    const piano1 = properties?.piano_1;
    const piano2 = properties?.piano_2;
    const piano3 = properties?.piano_3;
    const piano4 = properties?.piano_4;
    const genregist = properties?.gen_regist;
    const gentipo = properties?.gen_tipo;
    const gennumero = properties?.gen_numero;
    const genprogre = properties?.gen_progre;
    const genanno = properties?.gen_anno;
    const conregist = properties?.con_regist;
    const contipo = properties?.con_tipo;
    const connumero = properties?.con_numero;
    const conprogre = properties?.con_progre;
    const conanno = properties?.con_anno;
    const annotazion = properties?.annotazion;
    const mutaziniz = properties?.mutaz_iniz;
    const mutazfine = properties?.mutaz_fine;
    const protnotif = properties?.prot_notif;
    const datanotif = properties?.data_notif;
    const gencausa = properties?.gen_causa;
    const gendescr = properties?.gen_descr;
    const concausa = properties?.con_causa;
    const condescr = properties?.con_descr;
    const flagclass = properties?.flag_class;
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
        endDate,
        citycode,
        sectioncode,
        progressiv,
        sheetcode,
        particella,
        province,
        numerof,
        superficie,
        rendital,
        lotto,
        edificio,
        scala,
        interno1,
        interno2,
        piano1,
        piano2,
        piano3,
        piano4,
        genregist,
        gentipo,
        gennumero,
        genprogre,
        genanno,
        conregist,
        contipo,
        connumero,
        conprogre,
        conanno,
        annotazion,
        mutaziniz,
        mutazfine,
        protnotif,
        datanotif,
        gencausa,
        gendescr,
        concausa,
        condescr,
        flagclass
    };
};

export const landDetailParser = (feature) => {
    const properties = feature?.properties;
    const property = properties.property;
    const propertyType = properties.propertytype;
    const subordinate = (properties?.subordinate === null) ? "_" : properties?.subordinate;
    const quality = properties?.quality;
    const _class = properties?.class;
    const hectares = properties?.hectares;
    const are = properties?.are;
    const centiare = properties?.centiare;
    const lot = properties?.lot;
    const cadastralRent = properties?.cadastralRent;
    const agriculturalRent = properties?.agriculturalRent;
    const startDate = properties?.startdate;
    const endDate = properties?.enddate;
    const citycode = properties?.citycode;
    const sectioncode = properties?.sectioncode;
    const progressiv = properties?.progressiv;
    const province = properties?.province;
    const sheetcode = properties?.sheetcode;
    const particella = properties?.particella;
    const numerof = properties?.numero_f;
    const flagredd = properties?.flag_redd;
    const flagporz = properties?.flag_porz;
    const flagdeduz = properties?.flag_deduz;
    const dominicl = properties?.dominic_l;
    const dominice = properties?.dominic_e;
    const agrariol = properties?.agrario_l;
    const agrarioe = properties?.agrario_e;
    const genregist = properties?.gen_regist;
    const gentipo = properties?.gen_tipo;
    const gennumero = properties?.gen_numero;
    const genprogre = properties?.gen_progre;
    const genanno = properties?.gen_anno;
    const conregist = properties?.con_regist;
    const contipo = properties?.con_tipo;
    const connumero = properties?.con_numero;
    const conprogre = properties?.con_progre;
    const conanno = properties?.con_anno;
    const annotazion = properties?.annotazion;
    const mutaziniz = properties?.mutaz_iniz;
    const mutazfine = properties?.mutaz_fine;
    const gencausa = properties?.gen_causa;
    const gendescr = properties?.gen_descr;
    const concausa = properties?.con_causa;
    const condescr = properties?.con_descr;
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
        endDate,
        citycode,
        sectioncode,
        progressiv,
        province,
        sheetcode,
        particella,
        numerof,
        flagredd,
        flagporz,
        flagdeduz,
        dominicl,
        dominice,
        agrariol,
        agrarioe,
        genregist,
        gentipo,
        gennumero,
        genprogre,
        genanno,
        conregist,
        contipo,
        connumero,
        conprogre,
        conanno,
        annotazion,
        mutaziniz,
        mutazfine,
        gencausa,
        gendescr,
        concausa,
        condescr
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

export const printPathNaturalSubject = "catasto/stampa/ricerca/persone_fisiche";
export const printPathLegalSubject = "catasto/stampa/ricerca/persone_giuridiche";
export const printPathImmobile = "catasto/stampa/ricerca/immobili";
export const printPathVisura = "catasto/stampa/visura";
export const printPathListaImm = "catasto/stampa/ricerca/immobili/query";

export const compareItems = (a, b) => {
    const aNumeric = parseInt(a?.subordinate, 10);
    const bNumeric = parseInt(b?.subordinate, 10);
    if (isNaN(aNumeric) && isNaN(bNumeric)) {
        try {
            return a?.subordinate.localeCompare(b?.subordinate);
        } catch (e) {
            return 1;
        }
    } else if (isNaN(aNumeric)) {
        return 1;
    } else if (isNaN(bNumeric)) {
        return -1;
    } else if (aNumeric < bNumeric) {
        return -1;
    } else if (aNumeric > bNumeric) {
        return 1;
    }
    const aNonNumeric = a?.subordinate.replace(aNumeric.toString(), '');
    const bNonNumeric = b?.subordinate.replace(bNumeric.toString(), '');
    return aNonNumeric.localeCompare(bNonNumeric);
};

export const checkLayersInDJson = (jsonData, fabricati, particelle) => {
    const fabparts = fabricati.split(":");
    const fabName = fabparts[fabparts.length - 1];
    const terparts = particelle.split(":");
    const terName = terparts[terparts.length - 1];
    let fabExist = false;
    let terExist = false;

    jsonData?.featureTypes.forEach(type => {
        if (type.typeName === fabName) {
            fabExist = true;
        }
        if (type.typeName === terName) {
            terExist = true;
        }
    });

    return { fabStatus: fabExist, terStatus: terExist };
};


export const fabStyle = () => {
    const baseSymbolizer = {
        size: 20,
        anchor: "center",
        rotate: 0,
        fillOpacity: 0.4,
        kind: "Fill",
        color: "#A4BF01",
        outlineColor: "#000000"
    };
    return {
        format: "geostyler",
        body: {
            name: 'fab-catasto-open',
            rules: [{
                name: 'fab-catasto-open-rule',
                symbolizers: [baseSymbolizer]
            }]
        }
    };
};

export const terStyle = () => {
    const baseSymbolizer = {
        size: 20,
        anchor: "center",
        rotate: 0,
        fillOpacity: 0.4,
        kind: "Fill",
        color: "#EE9F62",
        outlineColor: "#06172A"
    };
    return {
        format: "geostyler",
        body: {
            name: 'ter-catasto-open',
            rules: [{
                name: 'ter-catasto-open-rule',
                symbolizers: [baseSymbolizer]
            }]
        }
    };
};

export const groupOfSelection = {
    id: "Default.catOp-b795a427-15e5-4e20-8cf7-ee9d3d5b297b",
    title: "Catasto-Open-Seleziona"
};

export const getNodesIdsIfIdExists = (data, idToCheck) => {
    const findNodesById = (nodes, id) => {
        for (let node of nodes) {
            if (node.id === id) {
                return node.nodes ? node.nodes.map(child => child.id) : [];
            }
            if (node.nodes) {
                const result = findNodesById(node.nodes, id);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    };
    return findNodesById(data, idToCheck) || [];
};

export const nodeExistsInTree = (nodes, id) => {
    if (!nodes || nodes.length === 0) {
        return false;
    }
    for (let node of nodes) {
        if (node.id === id) return true;
        if (nodeExistsInTree(node.nodes, id)) return true;
    }
    return false;
};

export const fabSelectedStyle = () => {
    const baseSymbolizer = {
        size: 20,
        anchor: "center",
        rotate: 0,
        fillOpacity: 0.4,
        kind: "Fill",
        color: "#85e859",
        outlineColor: "#236705"
    };
    return {
        format: "geostyler",
        body: {
            name: 'fab-catasto-open-selected',
            rules: [{
                name: 'fab-catasto-open-selected-rule',
                symbolizers: [baseSymbolizer]
            }]
        }
    };
};

export const terSelectedStyle = () => {
    const baseSymbolizer = {
        size: 20,
        anchor: "center",
        rotate: 0,
        fillOpacity: 0.4,
        kind: "Fill",
        color: "#e87e2c",
        outlineColor: "#72390e"
    };
    return {
        format: "geostyler",
        body: {
            name: 'ter-catasto-selected-open',
            rules: [{
                name: 'ter-catasto-selected-rule',
                symbolizers: [baseSymbolizer]
            }]
        }
    };
};

export const featToLayer = (feat, style) => {
    const uid = `${feat.properties?.foglio}-${feat.properties?.numero}-${feat.properties?.sezione}`;
    let layer = {};
    layer.type = "vector";
    layer.visibility = true;
    layer.id = uid;
    layer.hideLoading = true;
    layer.extras = {
        foglio: feat.properties?.foglio,
        numero: feat.properties?.numero,
        sezione: feat.properties?.sezione
    };
    layer.features = [feat];
    layer.title = uid;
    layer.style = style;
    return layer;
};

export const fabFeatToLayer = (features, style) => {
    const feat = features[0];
    const uid = `${feat.properties?.foglio}-${feat.properties?.numero}-${feat.properties?.sezione}`;
    let layer = {};
    layer.type = "vector";
    layer.visibility = true;
    layer.id = uid;
    layer.hideLoading = true;
    layer.extras = {
        foglio: feat.properties?.foglio,
        numero: feat.properties?.numero,
        sezione: feat.properties?.sezione
    };
    layer.features = features;
    layer.title = uid;
    layer.style = style;
    return layer;
};

export const createCQLFab = (feat) => {
    return `foglio=${feat.properties?.foglio} AND numero=${feat.properties?.numero} AND sezione='${feat.properties?.sezione}'`;
};

export const doesIDExists = (list, id) => {
    return list && list.some(elem => elem.id === id);
};

