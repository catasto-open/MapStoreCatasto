import React from "react";
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';
import { createStructuredSelector } from 'reselect';
import {initialRowSelector, rowSelector} from "@js/extension/selectors/resultGrid";
import {resultGridAddFilter, resultGridClearFilter, resultGridSortRows} from "@js/extension/actions/resultGrid";
import {Toolbar} from "react-data-grid-addons";


class SearchResultGrid extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        minHeight: PropTypes.number,
        loadingResults: PropTypes.bool,
        columns: PropTypes.array,
        initialRows: PropTypes.array,
        rows: PropTypes.array,
        onRowSelect: PropTypes.func,
        sortRows: PropTypes.func,
        handleFilterChange: PropTypes.func,
        handleClearFilter: PropTypes.func,
        toolbar: PropTypes.object
    };

    static defaultProps = {
        active: false,
        enableFilter: false,
        enableResumeButton: false,
        loadingResults: false,
        columns: [],
        rows: [],
        toolbar: <Toolbar/>
    };

    onRowClick = (index) => ((index < 0) ?
        null : this.props.onRowSelect(this.getRowFromIndex(index)));

    getRowFromIndex = (index) => {
        return this.props.rows[index];
    }

    getSize = () => this.props.rows.length;

    rowGetter = rowNumber => {
        return this.props.rows[rowNumber];
    };


    render() {
        return this.props.active ? (
            <ReactDataGrid
                onGridSort={this.props.sortRows}
                columns={this.props.columns}
                rowGetter={this.rowGetter}
                rowsCount={this.getSize()}
                onRowClick={(rowIdx) => this.onRowClick(rowIdx)}
                minHeight={this.props.minHeight}
                onAddFilter={(filter) => this.props.handleFilterChange(filter)}
                onClearFilters={this.props.handleClearFilter}
                toolbar={this.props.toolbar}
            />) : null;
    }
}

export const searchResultGridSelector = createStructuredSelector({
    rows: rowSelector,
    initialRows: initialRowSelector
});

export const searchResultGridActions = {
    sortRows: resultGridSortRows,
    handleFilterChange: resultGridAddFilter,
    handleClearFilter: resultGridClearFilter
};

export default SearchResultGrid;
