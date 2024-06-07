export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await $fetch(process.env.NUXT_BACKEND_URL + '/zayavka/client/create', {
    method: 'POST',
    body: body
  })
  return result;
})
