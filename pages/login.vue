<template>
  <div class="wrapper">
    <Toast />
    <h1>{{ mode }}</h1>
    <FloatLabel v-if="mode == 'Регистрация'">
      <InputText style="width: 44vh;" v-model="fullName" />
      <label>ФИО</label>
    </FloatLabel>
    <div class="form">
      <FloatLabel>
        <InputText v-model="login" />
        <label>Логин</label>
      </FloatLabel>
      <FloatLabel v-if="mode == 'Регистрация'">
        <InputText v-model="organization" />
        <label>Организация</label>
      </FloatLabel>
      <FloatLabel>
        <InputText v-model="password" />
        <label>Пароль</label>
      </FloatLabel>
      <FloatLabel v-if="mode == 'Регистрация'">
        <InputText v-model="confirmPassword" />
        <label>Повторите пароль</label>
      </FloatLabel>
    </div>
    <Button label="Вход" v-if="mode == 'Вход'" @click="loginHandler" />
    <Button label="Регистрация" v-if="mode == 'Регистрация'" @click="registrationHandler" />
    <a href="#login" v-if="mode == 'Регистрация'" @click="mode = 'Вход'">Вход</a>
    <a href="#registration" v-if="mode == 'Вход'" @click="mode = 'Регистрация'"> Регистрация</a>
  </div>
</template>

<script lang="ts" setup>
const mode = ref("Вход");
const fullName = ref("");
const login = ref("");
const organization = ref("");
const password = ref("");
const confirmPassword = ref("");
const toast = useToast()
const user = useLocalStorage('user' , {id: null});

const loginHandler = async () => { 
 const all = await $fetch('/api/user/all')
  if(all.status) {
    all.data.forEach(element => {
      if(element.login  === login.value)  {
        if(element.password === password.value)  {
          user.value = element
          success()
        }
      }
    });
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Неверный логин или пароль",
      life: 3000,
    });
  } else  {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Неверный логин или пароль",
      life: 3000,
    });
  }


 }

const registrationHandler = async () => {
  if (password.value === confirmPassword.value) {
    const result = await $fetch('/api/user/create', {
      method: 'POST',
      body: {
        fullName: fullName.value,
        role: 'client',
        organization: organization.value,
        login: login.value,
        password: password.value,
      }
    })
    if (result.status) {
      user.value = result.data
      toast.add({
        severity: "success",
        summary: "Успех",
        detail: "Вы успешно зарегистрировались",
        life: 3000,
      });
      success()
    } else  {
      toast.add({
        severity: "error",
        summary: "Ошибка",
        detail: "Имя пользователя занято",
        life: 3000,
      });
    }

  } else {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Пароли не совпадают",
      life: 3000,
    });
  
  }
}

const success = () => {
  navigateTo("/");
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

.form {
  display: grid;
  grid: auto / auto auto;
  gap: 20px 5px;

}
</style>