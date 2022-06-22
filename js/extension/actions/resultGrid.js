export const RESULT_GRID_LOAD_ROWS = 'RESULT_GRID:LOAD_ROWS';
export const RESULT_GRID_SORT_ROWS = 'RESULT_GRID:SORT_ROWS';
export const RESULT_GRID_ADD_FILTER = 'RESULT_GRID:ADD_FILTER';
export const RESULT_GRID_FILTER_ROWS = 'RESULT_GRID:FILTER_ROWS';
export const RESULT_GRID_CLEAR_FILTER_ROWS = 'RESULT_GRID_CLEAR:FILTER_ROWS';

export function resultGridLoadRows(rows) {
    return {
        type: RESULT_GRID_LOAD_ROWS,
        rows
    };
}

export function resultGridSortRows(sortColumn, sortDirection) {
    return {
        type: RESULT_GRID_SORT_ROWS,
        sortColumn,
        sortDirection
    };
}

export function resultGridFilterRows() {
    return {
        type: RESULT_GRID_FILTER_ROWS
    };
}

export function resultGridClearFilter() {
    return {
        type: RESULT_GRID_CLEAR_FILTER_ROWS
    };
}

export function resultGridAddFilter(filter) {
    return {
        type: RESULT_GRID_ADD_FILTER,
        filter
    };
}
