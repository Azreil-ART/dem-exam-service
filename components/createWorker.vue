<template>
  <Dialog v-model:visible="visible" modal header="Добавить сотрудника" :style="{ width: '50vw' }">
    <div class="wrapper">
      <Toast />

      <FloatLabel>
        <InputText style="width: 44vh;" v-model="registerData.fullName" />
        <label>ФИО</label>
      </FloatLabel>
      <div class="form">
        <FloatLabel>
          <InputText v-model="registerData.login" />
          <label>Логин</label>
        </FloatLabel>
        <FloatLabel>
          <InputText v-model="registerData.organization" />
          <label>Организация</label>
        </FloatLabel>
        <FloatLabel>
          <InputText v-model="registerData.password" />
          <label>Пароль</label>
        </FloatLabel>
        <FloatLabel>
          <InputText v-model="confirmPassword" />
          <label>Повторите пароль</label>
        </FloatLabel>
      </div>
      <Button label="Добавить" v-if="mode == 'Регистрация'" @click="registerUser" />

    </div>
  </Dialog>
  <Button label="Добавить сотрудника" icon="pi pi-plus" @click="visible = true" />

</template>

<script setup lang="ts">
const visible = ref(false)
const mode = ref("Регистрация");
const userStore = useUserStore()
const confirmPassword = ref('')
const toast = useToast()
const verifyPassword = computed(() => confirmPassword.value === registerData.value.password)
const isEnglish = (text) => /^[A-Za-z1-9]+$/.test(text);
const registerData = ref({
  login: '',
  password: '',
  organization: '',
  fullName: '',
  role: 'Сотрудник'
})

const registerUser = async () => {
  if (registerData.value.login &&
    registerData.value.password &&
    registerData.value.organization &&
    registerData.value.fullName) {
    if (!verifyPassword.value) {
      toast.add({
        summary: 'Ошибка',
        detail: 'Пароли не совпадают',
        severity: 'error'
      })
      return
    }

    if (isEnglish(registerData.value.login) && isEnglish(registerData.value.password)) {
      const response = await userStore.registerWorker(registerData.value)
      location.reload()
    }
  } else {
    toast.add({
      summary: 'Ошибка',
      detail: 'Заполните все поля',
      severity: 'error'
    })
    return
  }
}


</script>


<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  flex-direction: column;
  gap: 20px;
}

.wrapper-form {
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  gap: 20px;
}

.form {
  display: grid;
  grid: auto / auto auto;
  gap: 20px 5px;

}
</style>