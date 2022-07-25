
/** Get customer login status froms state */
export const getSessionHasExpired = (state => state.sessionHasExpired);

/** Get auth user details. Eg; name, contact, email and so on */
export const getAuthUser = (state => state.auth_user);