<template>
  <div class="AllEmployees">
    <div class="container">
      <div class="row justify-content-between px-5">
        <h3 class="">Список всех сотрудников</h3>
        <div class="position-relative">
          <button v-b-toggle.collapse-1 class="btn btn-primary mr-2">Фильтр</button>
          <button class="btn btn-success p-0 h-100">
            <router-link class="text-decoration-none text-white w-100 h-100 p-2" to="/add_employee">
              Добавить сотрудника
            </router-link>
          </button>
          <b-collapse id="collapse-1" class="collapse">
            <b-card>
              <p class="card-text">По полу</p>
              <b-form-group class="d-flex">
                <b-form-radio v-model="selectedGender" name="male" value="male">Мужской
                </b-form-radio>
                <b-form-radio v-model="selectedGender" name="female" value="female">Женский
                </b-form-radio>
              </b-form-group>
              <p class="card-text">По Отделу</p>
              <b-form-select v-model="selectedDepartment" :options="departmentFilters"></b-form-select>
              <div class="mt-3">
                <b-button @click="clearFilter" variant="secondary">Очистить</b-button>
                <b-button @click="filter" v-b-toggle.collapse-1 variant="primary" class="ml-1">Подтвердить</b-button>
              </div>
            </b-card>
          </b-collapse>
        </div>
      </div>
      <employees-table class="mt-5" :limit="5" :employees="filteredEmployees" :fields="fields" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EmployeesTable from '../components/EmployeesTable';

export default {
  name: 'AllEmployees',
  components: {
    EmployeesTable,
  },
  data() {
    return {
      selectedGender: '',
      filterOptions: null,
      selectedDepartment: '',
      departmentFilters: [],
      fields: [
        {
          key: 'name',
          label: 'Полное имя',
        },
        {
          key: 'department',
          label: 'Отдел',

        },
        {
          key: 'post',
          label: 'Должность',

        },
      ],
    };
  },
  watch: {
    departments: {
      handler(val) {
        let result = [];
        val.forEach((department) => {
          result.push({
            text: department.title,
            value: department.id,
          });
        });
        this.departmentFilters = result;
      },
    },
  },
  methods: {
    ...mapActions(['getAllEmployees', 'getAllDepartments']),
    filter() {
      this.filterOptions = {
        gender: this.selectedGender,
        department: this.selectedDepartment,
      };
    },
    clearFilter() {
      this.selectedGender = '';
      this.selectedDepartment = '';
    },
  },
  computed: {
    ...mapGetters(['employees', 'departments']),
    filteredEmployees() {
      let result = [];
      if (this.filterOptions !== null) {
        if (this.filterOptions.gender === '') {
          if (this.filterOptions.department === '') {
            result = this.employees;
          } else {
            result = this.employees.filter((employee) => {
              return employee.department.id === this.filterOptions.department;
            });
          }
        } else if (this.filterOptions.gender !== '') {
          if (this.filterOptions.department === '') {
            result = this.employees.filter((employee) => {
              return employee.gender === this.filterOptions.gender;
            });
          } else {
            result = this.employees.filter((employee) => {
              return employee.department.id === this.filterOptions.department && employee.gender === this.filterOptions.gender;
            });
          }
        }
      } else {
        result = this.employees;
      }
      return result;
    },
  },
  mounted() {
    this.getAllEmployees();
    this.getAllDepartments();
  },
};
</script>

<style>
.collapse {
  width: 100%;
  position: absolute;
  right: 0;
}

</style>
