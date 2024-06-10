<template>
  <Dialog v-model:visible="visible" @hide="visible = false">
    <div style="text-align: center;" v-if="items.length === 0" >Комментариев нет</div>

    <VirtualScroller :items="items" :itemSize="50" class="border-1 surface-border border-round"
      style=" height: 300px">
      
      <template v-slot:item="data">
        
        <div style="height: 50px; border: 1px solid gray; border-color: aliceblue; border-radius: 3vh; align-items: center; text-align: center;">{{ data.item.text }}</div>
      </template>
    </VirtualScroller>
    <div style="display: flex; flex-direction: column; gap:3px;">
    <InputText v-model="text" type="text"></InputText>
    <Button  @click="visible = false; create()">Сохранить</Button>
    </div>

  </Dialog>
  <Button @click="visible = true">Открыть</Button>
</template>

<script>
export default {
  name: 'DisplayId',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  setup({ id }) {
    const visible = ref(false)
    const text = ref("")
    const items = ref([])
    const create = async ()  =>  {
      const data = {
        text: text.value,
        zayavkaId: id
      }
      const result = await $fetch('/api/database/comments/create', {
        method: 'POST',
        body: {
          data: data
        }
      })
      console.log(result)
      items.value = result.data
      location.reload()
    }
    onMounted(async () => {
      const result = await $fetch('/api/database/comments/findAll', {
        method: 'POST',
        body: {
          where: {zayavkaId: id }
        }
      })
      console.log(result)
      items.value = result.data
    })

    // expose to template and other options API hooks
    return {
      text,
      visible,
      items,
      create
    }
  },


};
</script>

<style scoped>
p {
  font-size: 1.2em;
  color: #333;
}
</style>
