import React from "react";
import PropTypes from 'prop-types';
import {Panel, Checkbox} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import Message from '@mapstore/components/I18N/Message';
import Select from 'react-select';
import {buildingLayer, geomFeatureToLayer, landLayer, services, sheetLayer, tomorrow} from "@js/extension/utils/catastoOpen";
import SearchFilter from "@js/extension/components/search/SearchFilter";
import FormCol from '@js/extension/components/search/FormCol';
import {
    loadCityData,
    selectCity,
    loadToponym,
    selectToponym,
    loadAddress,
    selectAddress,
    setHouseNumber,
    submitSearch,
    selectImmType,
    setImmCode,
    selectSection,
    selectService,
    selectSearchImmobileType,
    selectSheet,
    selectSubjectFilter,
    updateSubjectFormFirstName,
    updateSubjectFormFiscalCode,
    updateSubjectFormBirthDate,
    updateSubjectFormLastName,
    updateSubjectFormLoadLuogo,
    updateSubjectFormSelectBithPlace,
    updateSubjectFormSubjectCode,
    updateSubjectFormVatNumber,
    updateSubjectFormBusinessName,
    updateSubjectFormIdCode,
    selectLand,
    selectBuilding,
    loadSubjectData,
    loadLayer,
    loadLandDetailData,
    loadBuildingDetailData,
    onChangeTemporalSearchCheckbox,
    onChangeHistoricalSearchCheckbox,
    startDateSelected,
    endDateSelected,
    setMessageForUser
} from "@js/extension/actions/catastoOpen";
import {
    selectedServiceSelector,
    selectedSearchImmTypeSelector,
    citySelector,
    toponymSelector,
    isLoadingToponymSelector,
    selectedToponymSelector,
    addressesSelector,
    isLoadingAddressSelector,
    selectedAddressSelector,
    isValidInputOnImmAddressSelector,
    hasSubmitedSearchSelector,
    selectedImmTypeSelector,
    isValidInputOnImmCodeSelector,
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
    selectedBuildingSelector,
    isLoadingBuildingSelector,
    isTemporalSearchCheckedSelector,
    isHistoricalSearchCheckedSelector,
    startDateSelector,
    endDateSelector,
    isLoadingTownSelector,
    townSelector,
    selectedBirthPlaceSelector,
    fixedComuniSelector,
    doweHaveFixedComuniSelector
} from "@js/extension/selectors/catastoOpen";
import SearchForm from "@js/extension/components/search/SearchForm";
import SearchHistory from '@js/extension/components/search/SearchHistory';


class SearchContainer extends React.Component {
    static propTypes = {
        onSelectService: PropTypes.func,
        selectedService: PropTypes.object,
        onSelectSearchImmType: PropTypes.func,
        selectedSearchImmType: PropTypes.object,
        cities: PropTypes.array,
        loadCities: PropTypes.func,
        isLoadingCities: PropTypes.bool,
        onSelectCity: PropTypes.func,
        selectedCity: PropTypes.object,
        loadToponym: PropTypes.func,
        isLoadingToponym: PropTypes.bool,
        onSelectToponym: PropTypes.func,
        toponyms: PropTypes.array,
        selectedToponym: PropTypes.object,
        loadAddress: PropTypes.func,
        isLoadingAddress: PropTypes.bool,
        onSelectAddress: PropTypes.func,
        addresses: PropTypes.array,
        selectedAddress: PropTypes.object,
        onChangeHouseNumber: PropTypes.func,
        isValidInputOnImmAddress: PropTypes.bool,
        isValidInputOnImmCode: PropTypes.bool,
        onSubmitSearch: PropTypes.func,
        hasSubmitedSearch: PropTypes.bool,
        onSelectImmType: PropTypes.func,
        onChangeImmCode: PropTypes.func,
        selectedImmType: PropTypes.object,
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
        updateSubjectFormBirthDate: PropTypes.func,
        updateSubjectFormLoadLuogo: PropTypes.func,
        updateSubjectFormSelectBithPlace: PropTypes.func,
        updateSubjectFormFiscalCode: PropTypes.func,
        updateSubjectFormSubjectCode: PropTypes.func,
        updateSubjectFormVatNumber: PropTypes.func,
        updateSubjectFormBusinessName: PropTypes.func,
        updateSubjectFormIdCode: PropTypes.func,
        loadSubjects: PropTypes.func,
        loadLayer: PropTypes.func,
        loadLandDetails: PropTypes.func,
        loadBuildingDetails: PropTypes.func,
        filterServices: PropTypes.array,
        isTemporalSearchChecked: PropTypes.bool,
        onChangeTemporalSearchCheckbox: PropTypes.func,
        isHistoricalSearchChecked: PropTypes.bool,
        onChangeHistoricalSearchCheckbox: PropTypes.func,
        startDateValue: PropTypes.any,
        startDateValueOnChange: PropTypes.func,
        endDateValue: PropTypes.any,
        endDateValueOnChange: PropTypes.func,
        setMessageForUser: PropTypes.func,
        isLoadingTown: PropTypes.bool,
        town: PropTypes.array,
        selectedBirthPlace: PropTypes.object,
        fixedComuni: PropTypes.object,
        doweHaveFixedComuni: PropTypes.bool
    };

    static defaultProps = {
        selectedService: null,
        selectedSearchImmType: null,
        cities: [],
        toponyms: [],
        selectedToponym: null,
        isLoadingToponym: false,
        addresses: [],
        selectedAddress: null,
        isLoadingAddress: false,
        isValidInputOnImmAddress: false,
        hasSubmitedSearch: false,
        selectedImmType: null,
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
        updateSubjectFormBirthDate: () => {},
        updateSubjectFormLoadLuogo: () => {},
        updateSubjectFormSelectBithPlace: () => {},
        updateSubjectFormFiscalCode: () => {},
        updateSubjectFormSubjectCode: () => {},
        updateSubjectFormVatNumber: () => {},
        updateSubjectFormBusinessName: () => {},
        updateSubjectFormIdCode: () => {},
        subjectFormButtonActive: true,
        subjectForm: null,
        loadSubjects: () => {},
        loadLayer: () => {},
        isTemporalSearchChecked: false,
        isHistoricalSearchChecked: false,
        onChangeTemporalSearchCheckbox: () => {},
        isLoadingTown: false,
        town: [],
        selectedBirthPlace: {},
        fixedComuni: null,
        doweHaveFixedComuni: false
    };

    componentWillReceiveProps(nextProp) {
        if (nextProp.isTemporalSearchChecked) {
            if (nextProp.startDateValue && nextProp.endDateValue) {
                if (nextProp.startDateValue > nextProp.endDateValue) {
                    this.props.setMessageForUser("extension.catastoOpenPanel.dateInputError");
                } else {
                    if (nextProp.endDateValue > tomorrow() || nextProp.startDateValue < new Date("0000-12-31")) {
                        this.props.setMessageForUser("extension.catastoOpenPanel.dateInputError");
                    } else {
                        this.props.setMessageForUser(null);
                        loadCityData();
                    }
                }
            }
        } else {
            this.props.setMessageForUser(null);
            loadCityData();
        }
        if (nextProp.isHistoricalSearchChecked) {
            loadCityData();
        }
    }

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
            <>
                <Select
                    style={{marginBottom: 10}}
                    clearable={false}
                    searchable={false}
                    placeholder={<Message msgId="extension.catastoOpenPanel.searchContainer.serviceSelect.placeholder"/>}
                    options={this.serviceOptions()}
                    onChange={(val) => this.props.onSelectService(val && val.value ? val :  null)}
                    value={this.props.selectedService}>
                </Select>
                { this.useTemporalSearch() &&
                (<>
                    <Checkbox
                        checked={this.props.isTemporalSearchChecked}
                        onChange={this.handleOnChangeOfCheckBox}
                    >
                        <Message msgId="extension.catastoOpenPanel.temporalSearch.label"/>
                    </Checkbox>
                    <SearchHistory
                        active={this.props.isTemporalSearchChecked}
                        startDateValue={this.props.startDateValue}
                        startDateValueOnChange={this.props.startDateValueOnChange}
                        endDateValue={this.props.endDateValue}
                        endDateValueOnChange={this.props.endDateValueOnChange}
                    />
                </>
                )}
                { this.useHistoricalSearch() &&
                (
                    <Checkbox
                        checked={this.props.isHistoricalSearchChecked}
                        onChange={this.handleHistoricalOnChangeOfCheckBox}>
                        <Message msgId="extension.catastoOpenPanel.historicalSearch.label"/>
                    </Checkbox>
                )}
                {this.props.selectedService?.value === services[0].id ?
                    <Select
                        style={{marginBottom: 10}}
                        clearable={false}
                        searchable={false}
                        placeholder={<Message msgId="extension.catastoOpenPanel.typesOfImmobileSearch.placeholder"/>}
                        options={this.searchImmTypeOptions()}
                        onChange={this.props.onSelectSearchImmType}
                        value={this.props.selectedSearchImmType}>
                    </Select> :
                    null
                }
            </>);
    }

    renderSwitchImmobile = () => {
        const style = {marginBottom: 10};
        switch (this.props.selectedSearchImmType?.value) {
        case services[0].filters[0].id:
            return (
                <>
                    <SearchFilter
                        active={!!this.props.selectedCity || this.props.doweHaveFixedComuni}
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
                        onChange={this.props.onSelectLand}
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
                        onChange={this.props.onSelectBuilding}
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
                </>
            );
        case services[0].filters[1].id:
            return (
                <>
                    <FormCol
                        active={!!this.props.selectedCity || this.props.doweHaveFixedComuni}
                        style={style}
                        title={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.toponym.name"}
                        isSelect
                        isLoading={this.props.isLoadingToponym}
                        placeholder={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.toponym.placeholder"}
                        options={this.toponymOptions(this.props.toponyms)}
                        onInputChange={this.props.loadToponym}
                        onSelect={this.props.onSelectToponym}
                        value={this.props.selectedToponym}
                    />
                    <FormCol
                        active={!!this.props.selectedToponym}
                        style={style}
                        title={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.addressName.name"}
                        isSelect
                        isLoading={this.props.isLoadingAddress}
                        placeholder={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.addressName.placeholder"}
                        options={this.addressOptions(this.props.addresses)}
                        onInputChange={this.props.loadAddress}
                        onSelect={this.props.onSelectAddress}
                        value={this.props.selectedAddress}
                    />
                    <FormCol
                        active={!!this.props.selectedAddress}
                        style={style}
                        title={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.ncivico.name"}
                        placeholder={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebyadd.filters.ncivico.placeholder"}
                        onFormChange={this.props.onChangeHouseNumber}
                        showSearchButton
                        activeButton={this.props.isValidInputOnImmAddress}
                        onSubmitForm={() => this.props.onSubmitSearch(this.props.selectedSearchImmType.value)}
                        buttonTxt={"extension.catastoOpenPanel.searchButton"}
                    />
                    <SearchFilter
                        buttonStyle={style}
                        selectStyle={style}
                        active={this.props.hasSubmitedSearch}
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
                </>
            );
        case services[0].filters[2].id:
            return (
                <>
                    <FormCol
                        active={!!this.props.selectedCity || this.props.doweHaveFixedComuni}
                        style={style}
                        title={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileType.name"}
                        isSelect
                        isLoading={false}
                        placeholder={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileType.placeholder"}
                        options={this.immobileTypeOptions()}
                        onSelect={this.props.onSelectImmType}
                        value={this.props.selectedImmType}
                    />
                    <FormCol
                        active={!!this.props.selectedImmType}
                        style={style}
                        title={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileCode.name"}
                        placeholder={"extension.catastoOpenPanel.services.parcels.filtersTypes.immobilebycode.filters.immobileCode.placeholder"}
                        onFormChange={this.props.onChangeImmCode}
                        showSearchButton
                        activeButton={this.props.isValidInputOnImmCode}
                        onSubmitForm={() => this.props.onSubmitSearch(this.props.selectedSearchImmType.value)}
                        buttonTxt={"extension.catastoOpenPanel.searchButton"}
                        typeInput={"number"}
                    />
                    <SearchFilter
                        buttonStyle={style}
                        selectStyle={style}
                        active={this.props.hasSubmitedSearch && this.props.selectedImmType?.value === services[0].filters[0].filters[0].id}
                        clearable
                        isLoading={this.props.isLoadingLands}
                        options={this.geomOptions(this.props.lands)}
                        onChange={this.props.onSelectLand}
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
                        active={this.props.hasSubmitedSearch && this.props.selectedImmType?.value === services[0].filters[0].filters[1].id}
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
                </>
            );
        default:
            return null;
        }
    }

    renderPropertySearchFilter = () => {
        return (
            <div>
                <SearchFilter
                    active={this.doWeHaveDatesValid() && this.props.selectedService?.value === services[0].id}
                    clearable={!this.props.selectedSection}
                    isLoading={this.props.doweHaveFixedComuni ? false : this.props.isLoadingCities}
                    options={this.cityOptions()}
                    onChange={(val) => this.props.onSelectCity(val && val.value ? val : null)}
                    value={this.props.selectedCity}
                    onInputChange={(inputValue)=> this.props.loadCities(inputValue)}
                    title={"extension.catastoOpenPanel.services.parcels.filters.cities.name"}
                    placeholder={"extension.catastoOpenPanel.services.parcels.filters.cities.placeholder"}
                    noResultsText={"extension.catastoOpenPanel.services.parcels.filters.cities.noResultsText"}
                    showNoResult
                    isDisabled={this.props.doweHaveFixedComuni}
                />
                {this.props.selectedService?.value === services[0].id && this.renderSwitchImmobile()}
            </div>
        );
    }

    renderSubjectSearchForm = () => {
        const style = {marginBottom: 10};
        const placeholder = <Message msgId="extension.catastoOpenPanel.searchContainer.serviceSelect.placeholder"/>;
        if (this.props.selectedService?.value && this.props.selectedService?.value !== services[0].id && this.doWeHaveDatesValid()) {
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
                        updateSubjectFormLoadLuogo={this.props.updateSubjectFormLoadLuogo}
                        updateSubjectFormSelectBithPlace={this.props.updateSubjectFormSelectBithPlace}
                        options={this.props.town.map((_) => ({value: _.code, label: _.name}))}
                        isLoadingTown={this.props.isLoadingTown}
                        selectedvalue={this.props.selectedBirthPlace}
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

    searchImmTypeOptions = () => {
        return services[0].filters.map((item) => ({
            value: item.id,
            label: <Message msgId={item.placeholder}/>
        }));
    }

    cityOptions = () => {
        return this.props.doweHaveFixedComuni ?
            [
                {
                    value: this.props.fixedComuni?.codice,
                    label: this.props.fixedComuni?.comuni,
                    code: this.props.fixedComuni?.codice
                }
            ]
            : this.props.cities.map((c) => (
                {
                    value: c.code,
                    label: c.name,
                    code: c.code
                }
            ));
    };

    toponymOptions = (toponyms) => {
        return toponyms ? toponyms.map((t) => ({
            value: t.code,
            label: t.toponym
        })) : {};
    };

    addressOptions = (addresses) => {
        return addresses ? addresses.map((t) => ({
            value: t.indirizzo,
            label: t.indirizzo
        })) : {};
    };

    sectionOptions = () => {
        const sections = this.props.sections;
        sections.find(s => s.value === '_') === undefined && sections.length > 1 ? this.props.sections.push({
            value: "_",
            label: "TUTTE LE SEZIONI",
            name: "_"
        }) : null;
        return sections.map((s) => (
            {
                value: s.name,
                label: s.label ? s.label : s.name,
                code: s.name
            }
        ));
    };

    geomOptions = (geometries) => {
        return geometries.map((g) => (
            {
                value: g.number,
                label: `${g.number}-${g.section}`,
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

    immobileTypeOptions = () => {
        return services[0].filters[0].filters.map((item) => ({
            value: item.id,
            label: <Message msgId={item.name}/>
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
            case services[1].filters[0].filters[2].id:
                c.onChange = this.props.updateSubjectFormBirthDate;
                return c;
            case services[1].filters[1].id:
                c.onChange = this.props.updateSubjectFormFiscalCode;
                return c;
            case services[1].filters[2].id:
                c.onChange = this.props.updateSubjectFormSubjectCode;
                return c;
            case services[2].filters[0].id:
                c.onChange = this.props.updateSubjectFormVatNumber;
                return c;
            case services[2].filters[1].id:
                c.onChange = this.props.updateSubjectFormBusinessName;
                return c;
            case services[2].filters[2].id:
                c.onChange = this.props.updateSubjectFormIdCode;
                return c;
            default:
                return c;
            }
        });
        return controls;
    };

    useTemporalSearch = () => {
        if (this.props.selectedService) {
            const service = services.filter((item) => item.id === this.props.selectedService?.value);
            if (service) {
                const serviceConfig = this.props.filterServices.filter((item) => service[0].state_identifier === item.state_identifier);
                if (serviceConfig?.length === 1) {
                    return serviceConfig[0]?.useHistoricalSearch ? false : serviceConfig[0].useTemporalSearch;
                }
                return false;
            }
            return false;
        }
        return false;
    };

    handleOnChangeOfCheckBox = (event) => {
        return this.props.onChangeTemporalSearchCheckbox(event.target.checked);
    };

    doWeHaveDatesValid = () => {
        if (this.useTemporalSearch()) {
            if (!this.props.isTemporalSearchChecked) {
                return true;
            }
            if (this.props.endDateValue && this.props.startDateValue) {
                return this.props.startDateValue < this.props.endDateValue && !(this.props.endDateValue > tomorrow() || this.props.startDateValue < new Date("0000-12-31"));
            }
            return false;
        }
        return true;
    };

    useHistoricalSearch = () => {
        if (this.props.selectedService) {
            const service = services.filter((item) => item.id === this.props.selectedService?.value);
            if (service) {
                const serviceConfig = this.props.filterServices.filter((item) => service[0].state_identifier === item.state_identifier);
                return serviceConfig?.length === 1 ? serviceConfig[0]?.useHistoricalSearch : false;
            }
            return false;
        }
        return false;
    };

    handleHistoricalOnChangeOfCheckBox = (event) => {
        return this.props.onChangeHistoricalSearchCheckbox(event.target.checked);
    };
}

export const searchContainerActions = {
    onSelectService: selectService,
    onSelectSearchImmType: selectSearchImmobileType,
    onSelectCity: selectCity,
    loadCities: loadCityData,
    loadToponym: loadToponym,
    onSelectToponym: selectToponym,
    loadAddress: loadAddress,
    onSelectAddress: selectAddress,
    onChangeHouseNumber: setHouseNumber,
    onSubmitSearch: submitSearch,
    onSelectImmType: selectImmType,
    onChangeImmCode: setImmCode,
    onSelectSection: selectSection,
    onSelectSheet: selectSheet,
    onSelectLand: selectLand,
    onSelectBuilding: selectBuilding,
    onSelectSubjectFilter: selectSubjectFilter,
    updateSubjectFormFirstName: updateSubjectFormFirstName,
    updateSubjectFormLastName: updateSubjectFormLastName,
    updateSubjectFormBirthDate: updateSubjectFormBirthDate,
    updateSubjectFormLoadLuogo: updateSubjectFormLoadLuogo,
    updateSubjectFormSelectBithPlace: updateSubjectFormSelectBithPlace,
    updateSubjectFormFiscalCode: updateSubjectFormFiscalCode,
    updateSubjectFormSubjectCode: updateSubjectFormSubjectCode,
    updateSubjectFormVatNumber: updateSubjectFormVatNumber,
    updateSubjectFormBusinessName: updateSubjectFormBusinessName,
    updateSubjectFormIdCode: updateSubjectFormIdCode,
    loadSubjects: loadSubjectData,
    loadLayer: loadLayer,
    loadLandDetails: loadLandDetailData,
    loadBuildingDetails: loadBuildingDetailData,
    onChangeTemporalSearchCheckbox: onChangeTemporalSearchCheckbox,
    onChangeHistoricalSearchCheckbox: onChangeHistoricalSearchCheckbox,
    startDateValueOnChange: startDateSelected,
    endDateValueOnChange: endDateSelected,
    setMessageForUser: setMessageForUser
};

export const searchContainerSelector = createStructuredSelector({
    selectedService: selectedServiceSelector,
    selectedSearchImmType: selectedSearchImmTypeSelector,
    isLoadingCities: isLoadingCitySelector,
    cities: citySelector,
    toponyms: toponymSelector,
    isLoadingToponym: isLoadingToponymSelector,
    selectedToponym: selectedToponymSelector,
    addresses: addressesSelector,
    isLoadingAddress: isLoadingAddressSelector,
    selectedAddress: selectedAddressSelector,
    isValidInputOnImmAddress: isValidInputOnImmAddressSelector,
    hasSubmitedSearch: hasSubmitedSearchSelector,
    selectedImmType: selectedImmTypeSelector,
    isValidInputOnImmCode: isValidInputOnImmCodeSelector,
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
    subjectForm: subjectFormSelector,
    isTemporalSearchChecked: isTemporalSearchCheckedSelector,
    isHistoricalSearchChecked: isHistoricalSearchCheckedSelector,
    startDateValue: startDateSelector,
    endDateValue: endDateSelector,
    isLoadingTown: isLoadingTownSelector,
    town: townSelector,
    selectedBirthPlace: selectedBirthPlaceSelector,
    fixedComuni: fixedComuniSelector,
    doweHaveFixedComuni: doweHaveFixedComuniSelector
});

export default SearchContainer;
