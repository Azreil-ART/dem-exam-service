<template>
  <div>
    <h1>Статистика заявок</h1>
    <div>
      <p>Всего заявок: {{ totalRequests }}</p>
      <p>В обработке: {{ inProcessing }}</p>
      <p>В работе: {{ inProgress }}</p>
      <p>Завершено: {{ completed }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api';
import { useFetch } from '@vueuse/core';

export default {
  setup() {
    const totalRequests = ref(0);
    const inProcessing = ref(0);
    const inProgress = ref(0);
    const completed = ref(0);

    const fetchData = async () => {
      try {
        const response = await $fetch('/api/database/zayavki/findMany', {
          method: 'POST',
          body: {}
        });
        if (response.data) {
          const data = response.data;

          totalRequests.value = data.length;
          inProcessing.value = data.filter(item => item.status === 'В обработке').length;
          inProgress.value = data.filter(item => item.status === 'В работе').length;
          completed.value = data.filter(item => item.status === 'Завершено').length;
        }
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    onMounted(fetchData);

    return {
      totalRequests,
      inProcessing,
      inProgress,
      completed
    };
  }
};
</script>
