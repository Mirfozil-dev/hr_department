<template>
  <div class="container pl-5">
    <b-alert :show="status === 201">Сотрудник добавлен!</b-alert>
    <div class="row col-12 pl-4">
      <h3>Добавить сотрудника</h3>
    </div>
    <b-form @reset="resetForm" @submit="submitForm" class="col-12 row">
      <b-form-group class="col-12 text-left mt-2" label="Имя" label-for="name">
        <b-form-input required v-model="name" id="name"></b-form-input>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Отдел" label-for="department">
        <b-form-select :options="departmentFilters" required v-model="department" id="department"></b-form-select>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Пост" label-for="post">
        <b-form-input required v-model="post" id="post"></b-form-input>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Пол" label-for="gender">
        <b-form-radio-group required v-model="gender" id="gender" :options="genderOptions"></b-form-radio-group>
      </b-form-group>
      <b-form-group class="col-12 text-left mt-2" label="Дата рождения" label-for="date">
        <b-form-datepicker
            required
            id="date"
            v-model="date"
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
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddEmployee',
  data() {
    return {
      name: '',
      department: '',
      departmentFilters: [],
      post: '',
      gender: '',
      date: '',
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
  mounted() {
    this.getAllDepartments();
  },
  computed: {
    ...mapGetters(['departments']),
  },
  methods: {
    ...mapActions(['getAllDepartments']),
    resetForm() {
      this.name = '';
      this.department = '';
      this.post = '';
      this.gender = '';
      this.date = '';
    },
    submitForm() {
      if (this.name !== '' && this.department !== '' && this.post !== '' && this.gender !== '' && this.date !== '') {
        axios.post('http://localhost:3000/employees', {
          name: this.name,
          departmentId: this.department,
          post: this.post,
          gender: this.gender,
          birth_date: this.date,
        }).then((response) => {
          this.status = response.status;
          this.resetForm();
        });
      }
    },
  },
};
</script>

<style scoped>

</style>