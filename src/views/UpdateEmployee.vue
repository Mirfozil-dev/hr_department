<template>
  <div class="container pl-5">
    <b-alert :show="status === 200">Информация о сотруднике изменена!</b-alert>
    <div class="row col-12 pl-4">
      <h3>Изменить информацию о сотруднике</h3>
    </div>
    <b-form @reset="resetForm" @submit="submitForm" class="col-12 row">
      <b-form-group class="col-12 text-left mt-2" label="Имя" label-for="name">
        <b-form-input v-model="employee.name" required id="name"></b-form-input>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Отдел" label-for="department">
        <b-form-select
            :options="departmentFilters"
            v-model="employee.departmentId"
            required
            id="department"></b-form-select>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Пост" label-for="post">
        <b-form-input required v-model="employee.post" id="post"></b-form-input>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Пол" label-for="gender">
        <b-form-radio-group
            required
            v-model="employee.gender"
            id="gender"
            :options="genderOptions">
        </b-form-radio-group>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Дата рождения" label-for="date">
        <b-form-datepicker
            required
            id="date"
            v-model="employee.birth_date"
            class="mb-2"
            size="sm"
        >
        </b-form-datepicker>
      </b-form-group>
      <div class="col-12 d-flex justify-content-end">
        <b-button class="mr-2" type="reset" variant="danger">Очистить</b-button>
        <b-button class="float-right" type="submit" variant="primary">Подтвердить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'UpdateEmployee',
  data() {
    return {
      isLoading: true,
      name: '',
      department: '',
      departmentFilters: [],
      post: '',
      gender: '',
      date: '',
      employee: {},
      status: 0,
      genderOptions: [
        { text: 'Мужчина', value: 'male' },
        { text: 'Женщина', value: 'female' },
      ],
    };
  },
  watch: {
    departments: {
      handler(val) {
        let result = [];
        result.push({
          text: 'Выберите отдел',
          value: null,
        });
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
  async mounted() {
    this.getAllDepartments();
    await axios.get(`http://localhost:3000/employees/${this.$route.params.employeeId}`)
        .then((response) => this.employee = response.data)
        .catch((error) => console.log(error));
    this.isLoading = false;
  },
  computed: {
    ...mapGetters(['departments']),
  },
  methods: {
    ...mapActions(['getAllDepartments']),
    resetForm() {
      this.employee.name = '';
      this.employee.departmentId = null;
      this.employee.post = '';
      this.employee.gender = '';
      this.employee.birth_date = '';
    },
    submitForm() {
      if (this.employee.name !== '' && this.employee.departmentId !== null && this.employee.post !== '' && this.employee.gender !== '' && this.employee.date !== '') {
        axios.patch(`http://localhost:3000/employees/${this.$route.params.employeeId}`, {
          name: this.employee.name,
          departmentId: this.employee.departmentId,
          post: this.employee.post,
          gender: this.employee.gender,
          birth_date: this.employee.birth_date,
        }).then(response => {
          this.status = response.status;
          console.log(response.status);
        }).catch(error => {
          console.log(error);
        });
      }
    },
  },
};
</script>

<style scoped>

</style>