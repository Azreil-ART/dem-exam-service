<template>
  <div class="card" v-if="userStore.user">
    <div style="display: flex; justify-content: space-between;">
      <TabMenu :model=" userStore.user.id === 1 ? itemsAdmin : items" v-model:activeIndex="active" />

      <div style="position: absolute; right: 1vh; opacity: 0.3; bottom: 1vh;">{{ userStore.user.fullName }}:
        {{userStore.user.id === 1 ? 'Админ' : userStore.user.role  }} </div>
      <CreateZayavkaModal v-if="userStore.user.role === 'Клиент' && userStore.user.id !== 1" />
      <CreateWorker   v-if="active === 2 && userStore.user.id === 1"></CreateWorker>
    </div>
    <zayavkiAdmin v-if="active === 0 && userStore.user.id === 1"></zayavkiAdmin>
    <ZayavkiClient v-if="active === 0 && userStore.user.role === 'Клиент' && userStore.user.id !== 1"></ZayavkiClient>
    <zayavkiWorker v-if="active === 0 && userStore.user.role === 'Сотрудник'"></zayavkiWorker>
    <Worker v-if="active === 2 && userStore.user.id === 1"></Worker>
    <Statistic  v-if="active === 1 && userStore.user.id === 1"></Statistic>
  </div>
</template>

<script setup>
import Statistic from './pages/Statistic.vue';
import CreateWorker from '~/components/createWorker.vue';
import zayavkiAdmin from './pages/zayavkiAdmin.vue';
import ZayavkiClient from './pages/zayavkiClient.vue';
import zayavkiWorker  from './pages/zayavkiWorker.vue';
import { useLocalStorage } from '@vueuse/core';
import Worker from  './pages/worker.vue';
const userStore = useUserStore()

const active = useLocalStorage('active' , 0);
const items = ref([
  { label: 'Заявки', icon: 'pi pi-home' },{
    label: 'Выход', icon: 'pi pi-list', command: () => {
      userStore.logout()
      navigateTo('/auth')
    }
  }
]);
const itemsAdmin = ref([
  { label: 'Заявки', icon: 'pi pi-home' },{ label: 'Статистика', icon: 'pi pi-chart-line' },
  { label: 'Сотрудники', icon: 'pi pi-list' },{
    label: 'Выход', icon: 'pi pi-sign-out', command: () => {
      userStore.logout()
      active.value  =  0;
      navigateTo('/auth')
    }
  }
]);
</script>