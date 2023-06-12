## Plugin configuration

**CatastoOpen** configuration can be done by editing the *localConfig.json*, the usual way in development mode. It also can be done in the context plugin interface.

### Default configuration

```js
...
{
  "name" : "CatastoOpen",
  "cfg" : {
      "filterServices": [
          {
              "descriptions" : {
                  "en" : "Search by properties",
                  "it" : "Ricerca per immobili"
              },
              "state_identifier" : "parcels",
              "landDetailColumnsKeys": ["subordinate", "quality", "_class", "hectares", "are", "centiare", "lot", "cadastralRent", "agriculturalRent"],
              "buildingDetailColumns": ["subordinate", "censusZone", "category", "_class", "consistency", "rent", "lot"]
          },
          {
              "descriptions" : {
                  "en" : "Search by natural persons",
                  "it" : "Ricerca per persone fisiche"
              },
              "state_identifier" : "naturalSubjects",
              "naturalSubjectColumnsKeys": ["fiscalCode", "dateOfBirth", "cityOfBirth"]
          },
          {
              "descriptions" : {
                  "en" : "Search by legal persons",
                  "it" : "Ricerca per persone giuridiche"
              },
              "state_identifier" : "legalSubjects",
              "legalSubjectColumnsKeys": ["businessName", "vatNumber", "branch"]
          }
      ],
       "ownerDetails": {
           "subjectPropertyColumnsKeys": ["city", "section", "sheet", "number", "subordinate", "right", "part", "classification", "_class", "consistency", "income", "lot"],
           "propertyOwnerColumnsKeys": ["nominative", "fiscalCode", "city", "right", "part"]
           },
       "backend": {
           "name": "Geoserver",
           "url": "http://geoserver:8080/geoserver/"
       }
        }
    }
...
```

- `filterServices`

A list of object that declares the available service for the extension, there are three types of service:

>   - `parcels` (search based on a parcel reference)
>   - `naturalSubjects` (search based on a natural(person) reference)
>   - `legalSubjects` (search based on a legal(organization) reference)

each of the service has a configurable columns, i.e one can controls the information detail presented on the UI. The default values are defined in the above configuration.

ex: the extension provides only the *parcel search* services, and only shows the information about *rent* and *lot* both for land ("terreni") and building ("fabbricati")
```
filterServices": [
          {
              "descriptions" : {
                  "en" : "Search by properties",
                  "it" : "Ricerca per immobili"
              },
              "state_identifier" : "parcels",
              "landDetailColumnsKeys": ["cadastralRent", "lot"],
              "buildingDetailColumns": ["rent", "lot"]
          }]
```

- `ownerDetails`

This parameter only applied for `naturalSubjects` and `legalSubjects`, this provides a detail information of the properties own by the subject.

- `backend`

Defines the endpoint url of the `geoserver` instance.
