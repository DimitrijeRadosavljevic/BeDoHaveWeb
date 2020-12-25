import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isCheckingAuthUser = createSelector(
  selectAuthState,
  state => state.userAuthCheck
);

export const isLoggedIn = createSelector(
  selectAuthState,
  (state) => state.loggedIn
);

export const authUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const isAuthLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

export const authError = createSelector(
  selectAuthState,
  (state) => state.error
);

