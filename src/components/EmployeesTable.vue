<template>
  <div>
    <table class="table table-hover">
      <thead class="font-weight-bold">
      <tr>
        <td v-for="field in fields" :key="field.key">
          {{ field.label }}
        </td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in paginatedEmployees" :key="item.id">
        <td>
          <router-link :to="`/employee/${item.id}`">
            {{ item.name }}
          </router-link>
        </td>
        <td>{{ item.department.title }}</td>
        <td>{{ item.post }}</td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <button @click="decrement" class="btn">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button @click="changePage(page)" :class="{ 'active': page === currentPage }" v-for="page in pages" :key="page"
              class="btn">{{ page }}
      </button>
      <button @click="increment" class="btn">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EmployeesTable',
  data() {
    return {
      currentPage: 1,
    };
  },
  watch: {
    employees(val) {
      if (val.length < this.limit) {
        this.currentPage = 1;
      }
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.employees.length / this.limit);
    },
    paginatedEmployees() {
      let from = (this.currentPage - 1) * this.limit;
      let to = from + this.limit;

      return this.employees.slice(from, to);

    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    increment() {
      if (this.currentPage < this.pages) {
        this.currentPage++;
      }
    },
    decrement() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  props: {
    fields: {
      type: Array,
      isRequired: true,
    },
    limit: {
      type: Number,
      isRequired: true,
    },
    employees: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped>
td {
  width: 33%;
}

thead {
  background: #dcdcdc;
}

.active {
  background: #dcdcdc;
}
</style>