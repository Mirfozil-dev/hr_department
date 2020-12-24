<template>
  <div>
    <div v-if="!isLoading" class="container">
      <template v-if="employee !== {}">
        <div class="row m-0 w-100 justify-content-end">
          <b-button variant="primary p-0" class="mr-1">
            <router-link
                class="text-white text-decoration-none p-3 w-100 h-100"
                :to="`/update_employee/${this.$route.params.employeeId}`">
              Изменить
            </router-link>
          </b-button>
          <b-button v-b-modal.delete variant="danger">Удалить</b-button>
          <b-modal @ok="deleteEmployee" id="delete" title="Удалить">
            <p>Вы действительно хотите удалить сотрудника?</p>
            <template #modal-ok>
              <p class="m-0">Удалить</p>
            </template>
            <template #modal-cancel>
              <p class="m-0">
                Назад
              </p>
            </template>
          </b-modal>
        </div>
        <div class="row mt-3 justify-content-between">
          <div class="border p-5 ml-5 col-2">
            <i class="fas fa-user fa-5x"></i>
          </div>
          <div class="col-9 row">
            <div class="w-100 border-bottom align-items-center row">
              <h5 class="col-3 text-left mb-0">Полное имя: </h5><h5 class="mb-0">{{ employee.name }}</h5>
            </div>
            <div class="w-100 border-bottom align-items-center row">
              <h5 class="col-3 text-left mb-0">Отдел: </h5><h5 class="mb-0">{{ employee.department.title }}</h5>
            </div>
            <div class="w-100 border-bottom align-items-center row">
              <h5 class="col-3 text-left mb-0">Должность: </h5><h5 class="mb-0">{{ employee.post }}</h5>
            </div>
            <div class="w-100 border-bottom align-items-center row">
              <h5 class="col-3 text-left mb-0">Пол: </h5><h5 class="mb-0">{{ employee.gender }}</h5>
            </div>
            <div class="w-100 border-bottom align-items-center row">
              <h5 class="col-3 text-left mb-0">Дата рождения: </h5><h5 class="mb-0">{{ employee.birth_date }} </h5>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p>Такого сотрудника нет в базе</p>
      </template>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Employee',
  data() {
    return {
      employee: {},
      isLoading: true,
    };
  },
  methods: {
    deleteEmployee() {
      axios.delete(`http://localhost:3000/employees/${this.$route.params.employeeId}`).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
      this.$router.push('/all_employees');
    },
  },
  async mounted() {
    await axios.get(`http://localhost:3000/employees/${this.$route.params.employeeId}?_expand=department`)
        .then((response) => this.employee = response.data)
        .catch((error) => console.log(error));
    this.isLoading = false;
  },
};
</script>

<style scoped>

</style>