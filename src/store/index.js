import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    departments: {},
    employees: [],
  },
  mutations: {
    setDepartments(state, payload) {
      state.departments = payload;
    },
    setAllEmployees(state, payload) {
      state.employees = payload;
    },
  },
  actions: {
    getAllEmployees({ commit }) {
      axios.get('http://localhost:3000/employees?_expand=department')
        .then(response => {
          commit('setAllEmployees', response.data);
        });
    },
    getAllDepartments({ commit }) {
      axios.get('http://localhost:3000/departments')
        .then(response => {
          commit('setDepartments', response.data);
        });
    },
  },
  getters: {
    employees(state) {
      return state.employees;
    },
    departments(state) {
      return state.departments;
    },
  },
  modules: {},
});
