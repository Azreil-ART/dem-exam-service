<template>
  <div class="wrapper">
    <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    Загрузка данных!
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/stores/useUserStore'
const userStore = useUserStore()
onMounted(async () => {
  const token = localStorage.getItem('userToken')
  if(token) navigateTo('/dashboard')
  else navigateTo('/auth')
})
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  flex-direction: column;
  gap: 20px;
}
</style>