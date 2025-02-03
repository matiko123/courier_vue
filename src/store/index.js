// import { createStore } from 'vuex';
// import axios from 'axios'; // Make sure axios is installed

// const store = createStore({
//   state: {
//     isAuthenticated: false,
//     lastActionTime: null,
//     scopeToken: null,
//     token: localStorage.getItem('token') || null,
//     layout: 'app',
//     is_show_menu: true,
//     is_show_sidebar: true,
//     is_show_breadcrumb: true,
//     is_show_search: false,
//     is_dark_mode: false,
//     dark_mode: 'light',
//     locale: null,
//     menu_style: 'horizontal',
//     layout_style: 'full',
//     countryList: [{ code: 'en', name: 'English' }],
//   },
//   mutations: {
//     setLayout(state, layout) {
//       state.layout = layout;  
//     },
//     authenticate(state) {
//       state.isAuthenticated = true;
//       state.lastActionTime = new Date().getTime();
//     },
//     setToken(state, token) {
//       state.token = token;
//       state.isAuthenticated = !!token;
//       sessionStorage.setItem('token', token); 
//     },
//     logout(state) {
//       state.token = null;
//       state.isAuthenticated = false;
//       state.userPermissions = [];
//       sessionStorage.removeItem('token');
//       sessionStorage.removeItem('tokenExpiry');
//     },
//     updateLastActionTime(state) {
//       state.lastActionTime = new Date().getTime();
//     },
//   },
  
//   getters: {
//     layout(state) {
//       return state.layout;
//     },
//     isAuthenticated(state) {
//       return !!state.token;
//     },
//   },
//   actions: {
//     updateLastActionTime({ commit }) {
//       const tokenExpiry = new Date().getTime() + 300000;
//       sessionStorage.setItem('tokenExpiry', tokenExpiry);  
//       commit('updateLastActionTime');
//     },
//     authenticate({ commit }, token) {
//       commit('authenticate');
//       commit('setToken', token);
//       this.dispatch('updateLastActionTime'); 
//     },
//     login({ commit }, loginData) {
//       const permissions = loginData.scopes[0].permissions;
//       commit('setUserPermissions', permissions);
//     },
//     logout({ commit }) {
//       commit('logout');
//     },
//   },
  
// });

// export default store;

import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isAuthenticated: false,
    lastActionTime: null,
    token: sessionStorage.getItem('token') || null,
    tokenExpiry: sessionStorage.getItem('tokenExpiry') || null,
    layout: 'app',
    is_show_menu: true,
    is_show_sidebar: true,
    is_show_breadcrumb: true,
    is_show_search: false,
    is_dark_mode: false,
    dark_mode: 'light',
    locale: null,
    menu_style: 'horizontal',
    layout_style: 'full',
    countryList: [{ code: 'en', name: 'English' }],
    userPermissions: [],
  },
  mutations: {
    setLayout(state, layout) {
      state.layout = layout;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = !!token;
      sessionStorage.setItem('token', token);
    },
    setTokenExpiry(state, expiry) {
      state.tokenExpiry = expiry;
      sessionStorage.setItem('tokenExpiry', expiry);
    },
    setUserPermissions(state, permissions) {
      state.userPermissions = permissions;
    },
    logout(state) {
      state.token = null;
      state.tokenExpiry = null;
      state.isAuthenticated = false;
      state.userPermissions = [];
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiry');
      sessionStorage.removeItem('user-permission');
    },
    updateLastActionTime(state) {
      state.lastActionTime = new Date().getTime();
    },
  },
  getters: {
    layout: (state) => state.layout,
    isAuthenticated: (state) => !!state.token,
    isTokenExpired: (state) => {
      if (!state.tokenExpiry) return true;
      return new Date().getTime() > parseInt(state.tokenExpiry);
    },
  },
  actions: {
    updateLastActionTime({ commit, dispatch }) {
      const tokenExpiry = new Date().getTime() + 300000; 
      commit('setTokenExpiry', tokenExpiry);
      commit('updateLastActionTime');
      dispatch('scheduleTokenCheck');
    },
    authenticate({ commit, dispatch }, token) {
      commit('setToken', token);
      dispatch('updateLastActionTime');
    },
    login({ commit, dispatch }, loginData) {
      const permissions = loginData.scopes[0].permissions;
      commit('setUserPermissions', permissions);
      dispatch('authenticate', loginData.token);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    },
    scheduleTokenCheck({ dispatch, getters }) {
      setTimeout(() => {
        if (getters.isTokenExpired) {
          dispatch('logout');
        } else {
          dispatch('scheduleTokenCheck');
        }
      }, 60000); 
    },
    checkAuthentication({ getters, dispatch }) {
      if (getters.isAuthenticated && getters.isTokenExpired) {
        dispatch('logout');
      }
    },
  },
});

export default store;
