import type { User } from '@prisma/client'
import { defineStore } from 'pinia'

import createResponse from '~/utils/createResponse'

import type { Response } from '~/utils/types'



export const useUserStore = defineStore('useUserStore', () => {
  const user = ref<User | null>(null)

  watch(user, (newUser) => {
    if (newUser && newUser.password) {
      if (user.value !== null && user.value.password !== '') {
        user.value.password = ""
      }
    }
  });



  const loadUserFromLocalStorage = async () => {
    const token = localStorage.getItem('userToken')
    if (token) {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/user/findUnique', {
        method: 'POST',
        body: {
          where: { token }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при поиске пользователя')
      }
      const foundUser = result.data
      user.value = foundUser
    }
  }

  const login = async (login: string, password: string): Promise<Response<User | null>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/user/findUnique', {
        method: 'POST',
        body: {
          where: { login }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при поиске пользователя')
      }
      const foundUser = result.data
      if (foundUser && foundUser.password === password) {
        localStorage.setItem('userToken', foundUser.token)
        user.value = foundUser
        return createResponse('success', foundUser, 'Успешный вход')
      } else {
        return createResponse('error', null, 'Неверный логин или пароль')
      }
    } catch (error) {
      return createResponse('error', null, 'Ошибка при входе')
    }
  }

  const isUserRegistered = async (login: string): Promise<Response<boolean>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/user/findUnique', {
        method: 'POST',
        body: {
          where: { login }
        }
      });
      
      if (result.error) {
        return createResponse('error', null, 'Ошибка при поиске пользователя')
      }
      const foundUser = result.data
      return createResponse('success', foundUser !== null, 'Проверка регистрации успешно выполнена')
    } catch (error) {
      return createResponse('error', false, 'Ошибка при проверке регистрации пользователя')
    }
  }

  const register = async (newUser: Omit<User, 'id' | 'token'>): Promise<Response<User>> => {
    try {
      const token = btoa(`${newUser.login}:${newUser.password}`)
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/user/create', {
        method: 'POST',
        body: {
          data: {
            ...newUser,
            token
          }
        }
      });
      if (result.error) {
        return createResponse('error', null, 'Ошибка при регистрации' + result.error)
      }
      const createdUser = result.data
      localStorage.setItem('userToken', createdUser.token)
      user.value = createdUser
      return createResponse('success', createdUser, 'Регистрация успешна')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при регистрации')
    }
  }
  const registerWorker = async (newUser: Omit<User, 'id' | 'token'>): Promise<Response<User>> => {
    try {
      newUser.role = 'Сотрудник'
      const token = btoa(`${newUser.login}:${newUser.password}`)
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/user/create', {
        method: 'POST',
        body: {
          data: {
            ...newUser,
            token
          }
        }
      });
      if (result.error) {
        return createResponse('error', null, 'Ошибка при регистрации' + result.error)
      }

    } catch (error) {
      return createResponse('error', null, 'Ошибка при регистрации')
    }
  }
  const logout = (): Response<null> => {
    localStorage.removeItem('userToken')
    user.value = null
    return createResponse('success', null, 'Выход успешен')
  }

  onMounted(loadUserFromLocalStorage)

  return { user, login, register, logout, isUserRegistered, registerWorker }
})
