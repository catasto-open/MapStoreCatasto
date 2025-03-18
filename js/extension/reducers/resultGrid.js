import {
    RESULT_GRID_LOAD_ROWS,
    RESULT_GRID_SORT_ROWS,
    RESULT_GRID_ADD_FILTER,
    RESULT_GRID_FILTER_ROWS,
    RESULT_GRID_CLEAR_FILTER_ROWS} from "@js/extension/actions/resultGrid";

export default function(state = {}, action) {
    switch (action.type) {
    case RESULT_GRID_LOAD_ROWS:
        return {
            rows: action.rows,
            initialRows: action.rows
        };
    case RESULT_GRID_ADD_FILTER:
        const stateFilters = state?.filters || [];
        stateFilters.splice(stateFilters.indexOf(stateFilters.find(filter => (filter.column.key === action.filter.column.key))));
        stateFilters.push(action.filter);
        return {
            ...state,
            filters: stateFilters
        };
    case RESULT_GRID_CLEAR_FILTER_ROWS:
        return {
            ...state,
            rows: state.initialRows
        };
    case RESULT_GRID_FILTER_ROWS:
        let filteredRows = state.initialRows;
        state?.filters.forEach(
            filter => {
                const filterTerm = filter.filterTerm.toUpperCase();
                if (filterTerm === "") {
                    return;
                }
                const columnKey = filter.column.key;
                filteredRows = filteredRows.filter(
                    (row) => {
                        const columnValue = row[columnKey];
                        if (columnValue === null) {
                            return false;
                        }
                        if (typeof columnValue !== "string") {
                            return columnValue.toString().toUpperCase().match(filterTerm);
                        }
                        return columnValue.toUpperCase().match(filterTerm);
                    }
                );
            }
        );
        return {
            ...state,
            rows: filteredRows
        };

    case RESULT_GRID_SORT_ROWS:
        const sortColumn = action.sortColumn;
        const sortDirection = action.sortDirection;
        const comparer = (a, b) => {
            if (a[sortColumn] === b[sortColumn]) {
                return 0;
            }
            if (a[sortColumn] === null) {
                return 1;
            }
            if (b[sortColumn] === null) {
                return -1;
            }

            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            }
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        };
        const auxRows = state.rows.slice(0);
        const sortedRows = (sortDirection === 'NONE' && !state?.filters?.length > 0) ? state.initialRows : auxRows.sort(comparer);
        return {
            ...state,
            rows: sortedRows
        };
    default:
        return state;
    }
}
