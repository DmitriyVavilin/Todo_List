import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import { appActions } from "app/model/app.reducer";

/**
 * Handles network errors from the server.
 *
 * @param {unknown} e - The error object.
 * @param {Dispatch} dispatch - A function for dispatching Redux actions.
 * @returns {void} Nothing is returned.
 */

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError<{ error: string }>;
  if (axios.isAxiosError(err)) {
    const error = err.message ? err.message : "Some error occurred";
    dispatch(appActions.setAppError({ error }));
  } else {
    dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
  }
};
