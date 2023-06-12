import {get} from "lodash";

export const initialRowSelector = (state) => get(state, "resultGrid.initialRows");
export const rowSelector = (state) => get(state, "resultGrid.rows");
