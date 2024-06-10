<template>
  <div class="card">
      <DataTable :value="users" tableStyle="min-width: 50rem">
          <Column field="id" header="ID"></Column>
          <Column field="fullName" header="ФИО"></Column>
          <Column field="organization" header="Организация"></Column>
          <Column field="login" header="Логин"></Column>
      </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

onMounted(async () => {
  const result = await $fetch('/api/database/user/findAll');
  const { data } = result;
  users.value = data.filter(user => user.role === "Сотрудник");
});

const users = ref([]);

</script>
