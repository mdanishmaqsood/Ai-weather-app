import type { AppState } from '../../rootReducer';

export const getAuthDataSelector = (state: AppState) => state.auth;
