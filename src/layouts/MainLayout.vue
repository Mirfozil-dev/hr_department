<template>
  <b-navbar class="border mb-5">
    <b-navbar-nav class="container d-flex justify-content-start p-2" id="nav">
      <b-nav-item class="mx-3">
        <router-link class="text-decoration-none" to="/">Главная</router-link>
      </b-nav-item>
      <b-nav-item class="mx-3">
        <router-link class="text-decoration-none" to="/all_employees">Список всех сотрудников</router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  name: 'MainLayout',
};
</script>

<style scoped>

</style>