import React from "react";
import PropTypes from 'prop-types';
import {Panel} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import Message from '@mapstore/components/I18N/Message';
import Select from 'react-select';
import {buildingLayer, geomFeatureToLayer, landLayer, services, sheetLayer} from "@js/extension/utils/catastoOpen";
import SearchFilter from "@js/extension/components/search/SearchFilter";
import {
    loadCityData,
    selectCity,
    selectSection,
    selectService,
    selectSheet,
    selectSubjectFilter,
    updateSubjectFormFirstName,
    updateSubjectFormFiscalCode,
    updateSubjectFormLastName,
    updateSubjectFormVatNumber,
    updateSubjectFormBusinessName,
    selectLand,
    selectBuilding,
    loadSubjectData,
    loadLayer,
    loadLandDetailData,
    loadBuildingDetailData
} from "@js/extension/actions/catastoOpen";
import {
    selectedServiceSelector,
    citySelector,
    selectedCitySelector,
    isLoadingCitySelector,
    sectionSelector,
    selectedSectionSelector,
    selectedSheetSelector,
    sheetSelector,
    selectedSubjectFilterSelector,
    subjectFormButtonActiveSelector,
    subjectFormSelector,
    landSelector,
    selectedLandSelector,
    isLoadingSectionSelector,
    isLoadingSheetSelector,
    isLoadingLandSelector,
    buildingSelector,
    selectedBuildingSelector, isLoadingBuildingSelector
} from "@js/extension/selectors/catastoOpen";
import SearchForm from "@js/extension/components/search/SearchForm";


class SearchContainer extends React.Component {
    static propTypes = {
        onSelectService: PropTypes.func,
        selectedService: PropTypes.object,
        cities: PropTypes.array,
        loadCities: PropTypes.func,
        isLoadingCities: PropTypes.bool,
        onSelectCity: PropTypes.func,
        selectedCity: PropTypes.object,
        sections: PropTypes.array,
        isLoadingSections: PropTypes.bool,
        onSelectSection: PropTypes.func,
        selectedSection: PropTypes.object,
        sheets: PropTypes.array,
        isLoadingSheets: PropTypes.bool,
        onSelectSheet: PropTypes.func,
        selectedSheet: PropTypes.object,
        lands: PropTypes.array,
        isLoadingLands: PropTypes.bool,
        onSelectLand: PropTypes.func,
        selectedLand: PropTypes.object,
        buildings: PropTypes.array,
        isLoadingBuildings: PropTypes.bool,
        onSelectBuilding: PropTypes.func,
        selectedBuilding: PropTypes.object,
        onSelectSubjectFilter: PropTypes.func,
        selectedSubjectFilter: PropTypes.object,
        subjectFormButtonActive: PropTypes.bool,
        subjectForm: PropTypes.object,
        updateSubjectFormFirstName: PropTypes.func,
        updateSubjectFormLastName: PropTypes.func,
        updateSubjectFormFiscalCode: PropTypes.func,
        updateSubjectFormVatNumber: PropTypes.func,
        updateSubjectFormBusinessName: PropTypes.func,
        loadSubjects: PropTypes.func,
        loadLayer: PropTypes.func,
        loadLandDetails: PropTypes.func,
        loadBuildingDetails: PropTypes.func,
        filterServices: PropTypes.array
    };

    static defaultProps = {
        selectedService: null,
        cities: [],
        selectedCity: null,
        sections: [],
        selectedSection: null,
        sheets: [],
        selectedSheet: null,
        lands: [],
        selectedLand: null,
        buildings: [],
        selectedBuilding: null,
        selectedSubjectFilter: null,
        updateSubjectFormFirstName: () => {},
        updateSubjectFormLastName: () => {},
        updateSubjectFormFiscalCode: () => {},
        updateSubjectFormVatNumber: () => {},
        updateSubjectFormBusinessName: () => {},
        subjectFormButtonActive: true,
        subjectForm: null,
        loadSubjects: () => {},
        loadLayer: () => {}
    };

    renderHeader() {
        return (
            <div>
                <div className="pull-left">
                    <Message msgId="extension.catastoOpenPanel.searchContainer.title"/>
                </div>
            </div>);
    }

    renderServiceSelect() {
        return (
            <Select
                style={{marginBottom: 10}}
                clearable={false}
                searchable={false}
                placeholder={<Message msgId="extension.catastoOpenPanel.searchContainer.serviceSelect.placeholder"/>}
                options={this.serviceOptions()}
                onChange={(val) => this.props.onSelectService(val && val.value ? val :  null)}
                value={this.props.selectedService}>
            </Select>);
    }

    renderPropertySearchFilter = () => {
        const style = {marginBottom: 10};
        return (
            <div>
                <SearchFilter
                    active={this.props.selectedService?.value === services[0].id}
                    clearable={!this.props.selectedSection}
                    isLoading={this.props.isLoadingCities}
                    options={this.cityOptions()}
                    onChange={(val) => this.props.onSelectCity(val && val.value ? val : null)}
                    value={this.props.selectedCity}
                    onInputChange={(inputValue)=> this.props.loadCities(inputValue)}
                    title={"extension.catastoOpenPanel.services.parcels.filters.cities.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.cities.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.cities.noResultsText"}
                />
                <SearchFilter
                    active={!!this.props.selectedCity}
                    clearable={!this.props.selectedSheet}
                    isLoading={this.props.isLoadingSections}
                    options={this.sectionOptions()}
                    onChange={(val) => this.props.onSelectSection(val && val.value ? val : null)}
                    value={this.props.selectedSection}
                    title={"extension.catastoOpenPanel.services.parcels.filters.sections.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.sections.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.sections.noResultsText"}
                />
                <SearchFilter
                    buttonStyle={style}
                    selectStyle={style}
                    active={!!this.props.selectedSection}
                    clearable={!this.props.selectedLand && !this.props.selectedBuilding}
                    isLoading={this.props.isLoadingSheets}
                    options={this.geomOptions(this.props.sheets)}
                    onChange={(val) => this.props.onSelectSheet(val && val.value ? val : null)}
                    value={this.props.selectedSheet}
                    title={"extension.catastoOpenPanel.services.parcels.filters.sheets.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.sheets.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.sheets.noResultsText"}
                    zoomActive={!!this.props.selectedSheet}
                    zoomTooltip={"extension.catastoOpenPanel.services.parcels.filters.sheets.zoomTooltip"}
                    onZoom={() => this.props.loadLayer(geomFeatureToLayer(this.props.selectedSheet, sheetLayer))}/>
                <SearchFilter
                    buttonStyle={style}
                    selectStyle={style}
                    active={!!this.props.selectedSheet}
                    clearable
                    isLoading={this.props.isLoadingLands}
                    options={this.geomOptions(this.props.lands)}
                    onChange={(val) => this.props.onSelectLand(val && val.value ? val : null)}
                    value={this.props.selectedLand}
                    title={"extension.catastoOpenPanel.services.parcels.filters.lands.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.lands.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.lands.noResultsText"}
                    zoomActive={!!this.props.selectedLand}
                    zoomTooltip={"extension.catastoOpenPanel.services.parcels.filters.lands.zoomTooltip"}
                    onZoom={() => this.props.loadLayer(geomFeatureToLayer(this.props.selectedLand, landLayer))}
                    detailActive
                    onDetailClick={this.props.loadLandDetails}
                    detailTooltip={"extension.catastoOpenPanel.services.parcels.filters.lands.detailTooltip"}
                />
                <SearchFilter
                    buttonStyle={style}
                    selectStyle={style}
                    active={!!this.props.selectedSheet}
                    clearable
                    isLoading={this.props.isLoadingBuildings}
                    options={this.geomOptions(this.props.buildings)}
                    onChange={(val) => this.props.onSelectBuilding(val && val.value ? val : null)}
                    value={this.props.selectedBuilding}
                    title={"extension.catastoOpenPanel.services.parcels.filters.buildings.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.buildings.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.buildings.noResultsText"}
                    zoomActive={!!this.props.selectedBuilding}
                    zoomTooltip={"extension.catastoOpenPanel.services.parcels.filters.buildings.zoomTooltip"}
                    onZoom={() => this.props.loadLayer(geomFeatureToLayer(this.props.selectedBuilding, buildingLayer))}
                    detailActive
                    onDetailClick={this.props.loadBuildingDetails}
                    detailTooltip={"extension.catastoOpenPanel.services.parcels.filters.buildings.detailTooltip"}
                />
            </div>
        );
    }

    renderSubjectSearchForm = () => {
        const style = {marginBottom: 10};
        const placeholder = <Message msgId="extension.catastoOpenPanel.searchContainer.serviceSelect.placeholder"/>;
        if (this.props.selectedService?.value && this.props.selectedService?.value !== services[0].id) {
            return (
                <div>
                    <Select
                        style={style}
                        placeholder={placeholder}
                        options={this.subjectFormFilters()}
                        onChange={(val) => this.props.onSelectSubjectFilter(val && val.value ? val :  null)}
                        value={this.props.selectedSubjectFilter}/>
                    <SearchForm
                        active={!!this.props.selectedSubjectFilter}
                        buttonTxt={"extension.catastoOpenPanel.searchButton"}
                        controls={this.subjectFormFilterControls()}
                        activeButton={this.props.subjectFormButtonActive}
                        onSubmitForm={() => this.props.loadSubjects(this.props.subjectForm)}
                    />
                </div>);
        }
        return null;
    }

    render() {
        return (
            <div className="query-filter-container">
                <Panel
                    className="mapstore-switch-panel"
                    header={this.renderHeader()}
                    collapsible expanded>
                    {this.renderServiceSelect()}
                    {this.renderPropertySearchFilter()}
                    {this.renderSubjectSearchForm()}
                </Panel>
            </div>);
    }

    serviceOptions() {
        const reducedFilterServices = this.props.filterServices.reduce(
            (finallist, obj)  => {
                var x = finallist.concat([obj.state_identifier]);
                return x;
            }, []
        );
        return services.filter(item => reducedFilterServices.includes(item.state_identifier)).map((s) => (
            {
                ...s,
                value: s.id,
                label: <Message msgId={s.placeholder}/>
            }));
    }

    cityOptions = () => {
        return this.props.cities.map((c) => (
            {
                value: c.code,
                label: c.name,
                code: c.code
            }
        ));
    };

    sectionOptions = () => {
        const sections = this.props.sections;
        sections.find(s => s.value === '_') === undefined && sections.length > 1 ? this.props.sections.push({
            value: "_",
            label: "_",
            name: "_"
        }) : null;
        return sections.map((s) => (
            {
                value: s.name,
                label: s.name,
                code: s.name
            }
        ));
    };

    geomOptions = (geometries) => {
        return geometries.map((g) => (
            {
                value: g.number,
                label: g.number,
                ...g
            }
        ));
    };

    subjectFormFilters = () => {
        return this.props.selectedService?.filters.map((f) => ({
            ...f,
            value: f.id,
            label: <Message msgId={f.placeholder}/>
        }));
    };

    subjectFormFilterControls = () => {
        const subjectFilters = this.subjectFormFilters().filter(f => f.id === this.props.selectedSubjectFilter?.id);
        let controls = subjectFilters[0]?.filters || subjectFilters;
        controls = controls.map(c => {
            switch (c.id) {
            case services[1].filters[0].filters[0].id:
                c.onChange = this.props.updateSubjectFormFirstName;
                return c;
            case services[1].filters[0].filters[1].id:
                c.onChange = this.props.updateSubjectFormLastName;
                return c;
            case services[1].filters[1].id:
                c.onChange = this.props.updateSubjectFormFiscalCode;
                return c;
            case services[2].filters[0].id:
                c.onChange = this.props.updateSubjectFormVatNumber;
                return c;
            case services[2].filters[1].id:
                c.onChange = this.props.updateSubjectFormBusinessName;
                return c;
            default:
                return c;
            }
        });
        return controls;
    };
}

export const searchContainerActions = {
    onSelectService: selectService,
    onSelectCity: selectCity,
    loadCities: loadCityData,
    onSelectSection: selectSection,
    onSelectSheet: selectSheet,
    onSelectLand: selectLand,
    onSelectBuilding: selectBuilding,
    onSelectSubjectFilter: selectSubjectFilter,
    updateSubjectFormFirstName: updateSubjectFormFirstName,
    updateSubjectFormLastName: updateSubjectFormLastName,
    updateSubjectFormFiscalCode: updateSubjectFormFiscalCode,
    updateSubjectFormVatNumber: updateSubjectFormVatNumber,
    updateSubjectFormBusinessName: updateSubjectFormBusinessName,
    loadSubjects: loadSubjectData,
    loadLayer: loadLayer,
    loadLandDetails: loadLandDetailData,
    loadBuildingDetails: loadBuildingDetailData
};

export const searchContainerSelector = createStructuredSelector({
    selectedService: selectedServiceSelector,
    isLoadingCities: isLoadingCitySelector,
    cities: citySelector,
    selectedCity: selectedCitySelector,
    isLoadingSections: isLoadingSectionSelector,
    sections: sectionSelector,
    selectedSection: selectedSectionSelector,
    sheets: sheetSelector,
    selectedSheet: selectedSheetSelector,
    isLoadingSheets: isLoadingSheetSelector,
    lands: landSelector,
    selectedLand: selectedLandSelector,
    isLoadingLands: isLoadingLandSelector,
    buildings: buildingSelector,
    selectedBuilding: selectedBuildingSelector,
    isLoadingBuildings: isLoadingBuildingSelector,
    selectedSubjectFilter: selectedSubjectFilterSelector,
    subjectFormButtonActive: subjectFormButtonActiveSelector,
    subjectForm: subjectFormSelector
});

export default SearchContainer;
