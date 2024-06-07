import { defineStore } from 'pinia'

import type { } from '~/utils/types'

export const useApplicationsStore = defineStore('applications', () => {
  const applications = ref<Applications[]>([])
  onMounted(async () => {
    await refrash()
  })

  function addApplication(item: Applications) {
    applications.value.push(
      item
    )
  }
  function clearApplication() {
    applications.value = []
  }
  async function refrash() {
    clearApplication()
    const all = await $fetch('/api/applications/all')
    if(all.status) {
      applications.value = all.data
    
    }
  }
  return { applications , addApplication , clearApplication , refrash }
})