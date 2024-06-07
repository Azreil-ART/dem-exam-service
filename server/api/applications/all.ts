export default defineEventHandler(async (event) => {
  const result = await $fetch(process.env.NUXT_BACKEND_URL + '/zayavka/client/findall')
  return result;
})
