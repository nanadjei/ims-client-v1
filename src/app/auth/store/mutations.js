/**
 * Show info if session has expired.
 * @param {*} state 
 * @param { object } payload - True/False
 */
export const SET_SESSION_HAS_EXPIRED = (state, payload) => state.sessionHasExpired = payload;

/** Set auth user to  */
export const SET_AUTH_USER = (state, payload ) => state.auth_user = payload;