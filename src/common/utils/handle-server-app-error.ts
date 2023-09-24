import {Dispatch} from "redux";
import {appActions} from "app/app.reducer";
import {BaseResponseType} from "common/types/common.types";

/**
 * Handles an application error received from the server.
 *
 * @template D - Type of data in the server response.
 * @param {BaseResponseType<D>} data - Data from the server response.
 * @param {Dispatch} dispatch - Function for dispatching Redux actions.
 * @param {boolean} [showError=true] - Flag indicating whether to show the error.
 * @returns {void} Nothing is returned.
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
};
