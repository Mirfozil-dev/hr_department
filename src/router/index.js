import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import AllEmployees from '../views/AllEmployees.vue';
import Employee from '../views/Employee';
import AddEmployee from '../views/AddEmployee';
import UpdateEmployee from '../views/UpdateEmployee';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/all_employees',
    name: 'AllEmployees',
    component: AllEmployees,
  },
  {
    path: '/employee/:employeeId',
    name: 'Employee',
    component: Employee,
  },
  {
    path: '/add_employee',
    name: 'AddEmployee',
    component: AddEmployee,
  },
  {
    path: '/update_employee/:employeeId',
    name: 'UpdateEmployee',
    component: UpdateEmployee,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
