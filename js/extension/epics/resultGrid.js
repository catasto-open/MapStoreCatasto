import * as Rx from 'rxjs';
import {RESULT_GRID_ADD_FILTER, resultGridFilterRows} from "@js/extension/actions/resultGrid";

/**
 * Epics for RESULT GRID
 * @name epics.catastoOpen
 * @type {Object}
 */
export default () => ({
    resultGridFilterRowsEpic: (action$) =>
        action$.ofType(RESULT_GRID_ADD_FILTER)
            .switchMap(() => {
                return Rx.Observable.of(...([resultGridFilterRows()]));
            })
});
