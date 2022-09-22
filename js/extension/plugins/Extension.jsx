import { name } from '../../../config';
import '../assets/style.css';
import burgerMenuContainer from "@js/extension/containers/BurgerMenu";
import SmartCatastoOpenPanel from "@js/extension/components/CatastoOpenPanel";

/**
 * CatastoOpen Plugin.
 * @static
 * @memberof plugins
 * @name CatastoOpen
 * @class CatastoOpen
 * @prop {array} cfg.filterServices, if given, defines list of services and corresponding columns
 * @prop {object} cfg.ownerDetails, if given, defines list of columns for the two type of owners
 * @prop {object} cgf.backend, if given, defines the endpoint of geoserver
 * @example the following is the default config
 * {
 *   "name" : "CatastoOpen",
 *   "cfg" : {
 *       "filterServices": [
 *           {
 *             "descriptions" : {
 *                 "en" : "Search by properties",
 *                 "it" : "Ricerca per immobili"
 *              },
 *             "state_identifier" : "parcels",
 *             "landDetailColumnsKeys": ["subordinate", "quality", "_class", "hectares", "are", "centiare", "lot", "cadastralRent", "agriculturalRent"],
 *              "buildingDetailColumns": ["subordinate", "censusZone", "category", "_class", "consistency", "rent", "lot"],
 *              "useTemporalSearch": true,
 *              "useHistoricalSearch": true
 *          },
 *          {
 *             "descriptions" : {
 *                 "en" : "Search by natural persons",
 *                 "it" : "Ricerca per persone fisiche"
 *             },
 *             "state_identifier" : "naturalSubjects",
 *             "naturalSubjectColumnsKeys": ["lastName", "firstName", "fiscalCode", "dateOfBirth", "cityOfBirth"],
 *             "useTemporalSearch": true,
 *             "useHistoricalSearch": true
 *          },
 *          {
 *             "descriptions" : {
 *                 "en" : "Search by legal persons",
 *                 "it" : "Ricerca per persone giuridiche"
 *             },
 *             "state_identifier" : "legalSubjects",
 *             "legalSubjectColumnsKeys": ["businessName", "vatNumber", "branch"],
 *             "useTemporalSearch": true,
 *             "useHistoricalSearch": true
 *          }
 *     ],
 *      "ownerDetails": {
 *      "subjectPropertyColumnsKeys": ["city", "section", "sheet", "number", "subordinate", "right", "part", "classification", "_class", "consistency", "income", "lot"],
 *          "propertyOwnerColumnsKeys": ["nominative", "fiscalCode", "city", "right", "part"],
 *          "showDate": true
 *          },
 *      "backend": {
 *          "name": "Geoserver",
 *          "url": "http://172.21.0.1:8600/geoserver/"
 *      }
 *    }
 * }
 */

export default {
    name,
    component: SmartCatastoOpenPanel,
    epics: {
        ...require("@js/extension/epics/catastoOpen").default(),
        ...require("@js/extension/epics/resultGrid").default()
    },
    reducers: {
        catastoOpen: require('@js/extension/reducers/catastoOpen').default,
        resultGrid: require('@js/extension/reducers/resultGrid').default
    },
    containers: burgerMenuContainer
};
