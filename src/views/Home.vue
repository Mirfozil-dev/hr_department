<template>
  <div class="home container">
    <div class="row justify-content-around px-5">
      <b-card>
        <p>Количество всех сотрудников</p>
        <h1>
          {{ employees.length }}
        </h1>
      </b-card>
      <b-card>
        <p>Количество мужчин</p>
        <h1>
          {{ menCount }}
        </h1>
      </b-card>
      <b-card>
        <p>Количество женщин</p>
        <h1>
          {{ womenCount }}
        </h1>
      </b-card>
      <b-card>
        <p>Средний возраст сотрудника в компании</p>
        <h1>
          {{ averageAge }}
        </h1>
      </b-card>
      <p class="col-12 mt-4">Количество сотрудников в каждом отделе</p>
      <table class="col-10 table table-bordered m-0 p-0">
        <thead class="row col-12 m-0 p-0">
        <tr class="row col-12 m-0 p-0">
          <td class="col-4 m-0 p-2" v-for="field in departments" :key="field.id">
            {{ field.title }}
          </td>
        </tr>
        </thead>
        <tbody class="row col-12 m-0 p-0">
        <tr class="row col-12 m-0 p-0">
          <td v-for="(count, index) in employeesPerDepartment" :key="index" class="font-weight-bold col-4 m-0 p-2">
            {{ count }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      employeesPerDepartment: [],
      items: [
        { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      ],
    };
  },
  watch: {
    departments: {
      handler(val) {
        val.forEach((department) => {
          const employeesCount = this.employees.filter((employee) => {
            return employee.departmentId === department.id;
          }).length;
          this.employeesPerDepartment.push(employeesCount);
        });
      },
    },
  },
  methods: {
    ...mapActions(['getAllEmployees', 'getAllDepartments']),
    getAge(birth_date) {
      const today = new Date();
      const birthDate = new Date(birth_date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  computed: {
    ...mapGetters(['employees', 'departments']),
    menCount() {
      return this.employees.filter((employee) => {
        return employee.gender === 'male';
      }).length;
    },
    womenCount() {
      return this.employees.filter((employee) => {
        return employee.gender === 'female';
      }).length;
    },
    averageAge() {
      let ages = [];
      this.employees.map((employee) => {
        ages.push(this.getAge(employee.birth_date));
      });
      return Math.round(ages.reduce((a, b) => a + b, 0) / this.employees.length);
    },
  },
  mounted() {
    this.getAllEmployees();
    this.getAllDepartments();
  },
};
</script>
