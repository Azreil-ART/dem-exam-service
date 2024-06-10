<template>
  <div class="wrapper">
    <Toast />
    <h1>{{ mode }}</h1>
    <div class="wrapper-form" v-if="mode == 'Регистрация'">
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
    </div>
    <div v-if="mode == 'Вход'">
      <div class="form">
        <FloatLabel>
          <InputText v-model="loginData.login" />
          <label>Логин</label>
        </FloatLabel>
        <FloatLabel>
          <InputText v-model="loginData.password" />
          <label>Пароль</label>
        </FloatLabel>

      </div>
    </div>
    <Button label="Вход" v-if="mode == 'Вход'" @click="loginUser" />
    <Button label="Регистрация" v-if="mode == 'Регистрация'" @click="registerUser" />
    <a href="#" v-if="mode == 'Регистрация'" @click="mode = 'Вход'">Вход</a>
    <a href="#" v-if="mode == 'Вход'" @click="mode = 'Регистрация'"> Регистрация</a>
  </div>
</template>

<script setup lang="ts">
const mode = ref("Вход");
const userStore = useUserStore()
const confirmPassword = ref('')
const toast = useToast()
const verifyPassword = computed(() => confirmPassword.value === registerData.value.password)
const isEnglish = (text) => /^[A-Za-z1-9]+$/.test(text);
const registerData = ref({
  login: '',
  password: '',
  organization: '',
  fullName: ''
})

const loginData = ref({
  login: '',
  password: ''
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
      const response = await userStore.register(registerData.value)
      if (response.status === 'success') {
        toast.add({
          summary: 'Успешно',
          detail: 'Регистрация прошла успешно',
          severity: 'success'
        })
        navigateTo('/')
      } else {
        toast.add({
          summary: 'Ошибка',
          detail: "Пользователь с таким логином уже зарегестрирован",
          severity: 'error'
        })
      }
    } else {
      toast.add({
        summary: 'Ошибка',
        detail: 'Логин и пароль должны быть на английском',
        severity: 'error'
      });
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

const loginUser = async () => {
  const response = await userStore.login(loginData.value.login, loginData.value.password)
  if (response.status === 'success') {
    toast.add({
      summary: 'Успешно',
      detail: 'Вход прошел успешно',
      severity: 'success'
    })
    navigateTo('/')
  } else {
    toast.add({
      summary: 'Ошибка',
      detail: response.message,
      severity: 'error'
    })
  }
}


</script>


<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
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