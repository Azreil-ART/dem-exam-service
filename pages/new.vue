<template>
  <div>
    <h1>Заявки</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else>
      <ul>
        <li v-for="zayavka in zayavki" :key="zayavka.id">
          {{ zayavka.description }}
          <button @click="deleteZayavka(zayavka.id)">Удалить</button>
        </li>
      </ul>
    </div>
    <form @submit.prevent="addZayavka">
      <input v-model="newZayavka.description" placeholder="Описание" required />
      <input v-model="newZayavka.equipment" placeholder="Оборудование" required />
      <input v-model="newZayavka.issueType" placeholder="Тип проблемы" required />
      <input v-model="newZayavka.status" placeholder="Статус" required />
      <button type="submit">Добавить заявку</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useZayavkaStore } from '~/stores/useZayavkaStore'

const { zayavki, getAllZayavki, createZayavka, deleteZayavka } = useZayavkaStore()

const loading = ref(true)
const newZayavka = ref({
  description: '',
  equipment: '',
  issueType: '',
  status: '',
  clientId: 1, // пример, ID клиента
  executorId: 2 // пример, ID работника
})

onMounted(async () => {
  const response = await getAllZayavki()
  if (response.status === 'success') {
    loading.value = false
  } else {
    console.error(response.message)
  }
})

const addZayavka = async () => {
  const response = await createZayavka(newZayavka.value)
  if (response.status === 'success') {
    // Очистка формы после успешного добавления
    newZayavka.value.description = ''
    newZayavka.value.equipment = ''
    newZayavka.value.issueType = ''
    newZayavka.value.status = ''
  } else {
    console.error(response.message)
  }
}
</script>

<style scoped>
/* ваши стили */
</style>
