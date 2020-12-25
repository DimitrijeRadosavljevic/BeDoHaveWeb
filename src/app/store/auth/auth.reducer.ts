import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any;
  loggedIn: boolean;
  loginFail: boolean;
  registerFail: boolean;
  isLoading: boolean;
  userAuthCheck: boolean;
  error: any;
}

export const initialState: AuthState = {
  loginFail: false,
  registerFail: false,
  isLoading: false,
  userAuthCheck: false,
  error: undefined,
  user: undefined,
  loggedIn: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.authInit,
    (state) => ({
      ...state,
      userAuthCheck: true
    })
  ),

  on(AuthActions.setUserData,
    (state, { data }) => ({
      ...state,
      user: data
    })
  ),

  on(AuthActions.login,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),

  on(AuthActions.loginSuccess,
    (state, {data}) => ({
      ...state,
      loginFail: false,
      registerFail: false,
      isLoading: false,
      userAuthCheck: false,
      error: undefined,
      user: data,
      loggedIn: true
    })
  ),

  on(AuthActions.loginFailure,
    (state, {error}) => ({
      ...state,
      loginFail    : true,
      registerFail : false,
      isLoading    : false,
      error,
      user         : undefined,
      loggedIn     : false,
      userAuthCheck: false
    })
  ),

  on(AuthActions.register,
    (state) => ({
      ...state, isLoading: true
    })
  ),

  on(AuthActions.registerSuccess,
    (state, {data}) => ({
      ...state,
      loginFail   : false,
      registerFail: false,
      isLoading   : false,
      error       : undefined,
      user        : data,
      loggedIn    : true,
    })
  ),

  on(AuthActions.registerFailure,
    (state, {error}) => ({
      ...state,
      loginFail   : false,
      registerFail: true,
      isLoading   : false,
      error,
      user        : undefined,
      loggedIn    : false,
    })
  ),

  on(AuthActions.logout,
    (state) => ({
      ...state,
      isLoading: true,
      error    : undefined,
      user     : undefined,
      loggedIn : false,
    })
  ),

  on(AuthActions.logoutSuccess,
    (state) => ({
      ...state,
      isLoading: false,
      error    : undefined,
      user     : undefined,
      loggedIn : false,
    })
  )
);
