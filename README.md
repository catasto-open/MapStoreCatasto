# MapStoreCatasto
MapStoreCatasto is an application designed to provide a user-friendly interface for accessing and visualizing cadastral data on an interactive map. It aims to simplify the process of exploring and querying property boundaries, ownership information, and other relevant cadastral details.

Features
- Interactive Map: MapStoreCatasto utilizes an interactive map interface to display cadastral data. Users can navigate and zoom in/out on the map to explore specific areas of interest.
- Cadastral Data Visualization: The application allows users to overlay cadastral data on the map, providing a visual representation of property boundaries, land divisions, and other relevant cadastral information.
- Search and Query: Users can search for specific addresses, property IDs, or owners to quickly locate and access the corresponding cadastral data. The application also supports querying and filtering options to refine search results based on specific criteria.
- Information Display: MapStoreCatasto presents detailed information about cadastral features, such as property ownership, area measurements, zoning regulations, and any associated legal or administrative records.
- Layer Management: Users have control over the visibility and order of cadastral layers displayed on the map. They can toggle layers on/off, change their transparency, and rearrange their stacking order to facilitate better visualization.

MapStoreCatasto is based on [MapStore](https://github.com/geosolutions-it/MapStore2) and it's distributed as [extension](https://docs.mapstore.geosolutionsgroup.com/en/latest/developer-guide/extensions/).

## Getting Started
To use MapStoreCatasto, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/MapStoreCatasto.git
```

2. Install the necessary dependencies:

```bash
cd MapStoreCatasto
npm install
```

*just* in case of errors, try these

```bash
npm install --force
npm audit fix --force
```

3. Configure the application:

Open the `/config/localconfig.json` file and update the geoserver endpoint with the one of [catasto-db](https://github.com/catasto-open/catasto-db). Add the same endpoint to `useCORS` property.

4. Build and run the application:

```bash
npm start
```

5. Access the application:
Open your web browser and navigate to [http://localhost:3000](http://localhost:8081) to access MapStore. MapstoreCatasto will be available in the application menu.


## Contributing

Contributions to MapStoreCatasto are welcome! If you find any bugs, have feature suggestions, or would like to contribute enhancements, please open an issue or submit a pull request to the project repository.

When contributing, please ensure you follow the existing code style, write clear commit messages, and provide appropriate documentation for any changes or additions.
