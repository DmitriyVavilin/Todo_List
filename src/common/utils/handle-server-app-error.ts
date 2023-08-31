import {Dispatch} from "redux";
import {appActions} from "app/app.reducer";
import {BaseResponseType} from "common/types/common.types";

/**
 * Обрабатывает ошибку приложения, полученную от сервера.
 *
 * @template D - Тип данных в ответе от сервера.
 * @param {BaseResponseType<D>} data - Данные ответа от сервера.
 * @param {Dispatch} dispatch - Функция для отправки действий Redux.
 * @param {boolean} [showError=true] - Флаг, определяющий, нужно ли показывать ошибку.
 * @returns {void} ничего не возвращается
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    // dispatch(appActions.setAppStatus({status: "failed"}));
};
