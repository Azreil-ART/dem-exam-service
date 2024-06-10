import { defineStore } from 'pinia'
import { PrismaClient } from '@prisma/client'
import type { Zayavka } from '@prisma/client'
import type { ZayavkaCreateInput, Response } from '~/utils/types'
import createResponse from '~/utils/createResponse'

const prisma = new PrismaClient()



export const useZayavkaStore = defineStore('useZayavkaStore', () => {
  const zayavki = ref<Zayavka[]>([])


  // Метод для создания заявки
  const createZayavka = async (newZayavka: ZayavkaCreateInput): Promise<Response<Zayavka>> => {



    try {

      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/create', {
        method: 'POST',
        body: {
          data: {
            ...newZayavka,
            createdAt: new Date()
          }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при создании заявки')
      }
      const createdZayavka = result.data
      
      zayavki.value.push(createdZayavka)
      return createResponse('success', createdZayavka, 'Заявка успешно создана')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при создании заявки')
    }
  }

  // Метод для получения заявки по ID клиента
  const getZayavkaByClientId = async (clientId: number): Promise<Response<Zayavka[]>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/findMany', {
        method: 'POST',
        body: {
          where: { clientId }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при получении заявок клиента')
      }
      const clientZayavki = result.data
      return createResponse('success', clientZayavki, 'Заявки клиента успешно получены')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при получении заявок клиента')
    }
  }

  // Метод для получения заявки по ID работника
  const getZayavkaByExecutorId = async (executorId: number): Promise<Response<Zayavka[]>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/findMany', {
        method: 'POST',
        body: {
          where: { executorId }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при получении заявок работника')
      }
      const executorZayavki = result.data
      return createResponse('success', executorZayavki, 'Заявки работника успешно получены')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при получении заявок работника')
    }
  }

  // Метод для получения всех заявок
  const getAllZayavki = async (): Promise<Response<Zayavka[]>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/findMany' , {method: 'POST'});


      if (result.error) {
        return createResponse('error', null, 'Ошибка при создании заявки')
      }
      const allZayavki = result.data
      zayavki.value = allZayavki
      return createResponse('success', allZayavki, 'Все заявки успешно получены')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при получении всех заявок')
    }
  }

  // Метод для поиска заявки
  const searchZayavka = async (query: string): Promise<Response<Zayavka[]>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/findMany', {
        method: 'POST',
        body: {
          where: {
            OR: [
              { equipment: { contains: query } },
              { description: { contains: query } },
              { issueType: { contains: query } },
              { status: { contains: query } }
            ]
          }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при получении заявок работника')
      }
      const searchedZayavki = result.data

      return createResponse('success', searchedZayavki, 'Результаты поиска успешно получены')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при поиске заявок')
    }
  }

  // Метод для удаления заявки
  const deleteZayavka = async (id: number): Promise<Response<null>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/delete', {
        method: 'POST',
        body: {
          where: { id }
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при получении заявок работника')
      }

      zayavki.value = zayavki.value.filter(z => z.id !== id)
      return createResponse('success', null, 'Заявка успешно удалена')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при удалении заявки')
    }
  }

  // Метод для изменения заявки
  const updateZayavka = async (id: number, updatedData: Partial<Zayavka>): Promise<Response<Zayavka>> => {
    try {
      const result: {
        data: any;
        error: any;
      } = await $fetch('/api/database/zayavki/update', {
        method: 'POST',
        body: {
          where: { id },
          data: updatedData
        }
      });

      if (result.error) {
        return createResponse('error', null, 'Ошибка при получении заявок работника')
      }

      const updatedZayavka = result.data;
      const index = zayavki.value.findIndex(z => z.id === id)
      if (index !== -1) {
        zayavki.value[index] = updatedZayavka
      }
      return createResponse('success', updatedZayavka, 'Заявка успешно обновлена')
    } catch (error) {
      return createResponse('error', null, 'Ошибка при обновлении заявки')
    }
  }

  return {
    zayavki,
    createZayavka,
    getZayavkaByClientId,
    getZayavkaByExecutorId,
    getAllZayavki,
    searchZayavka,
    deleteZayavka,
    updateZayavka
  }
})
