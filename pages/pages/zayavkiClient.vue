<template>
    <div class="card p-fluid">
        <DataTable v-model:editingRows="editingRows" :value="zayavki" editMode="row" dataKey="id"
            @row-edit-save="onRowEditSave" :pt="{
                table: { style: 'min-width: 50rem' },
                column: {
                    bodycell: ({ state }) => ({
                        style: state['d_editing'] && 'padding-top: 0.6rem; padding-bottom: 0.6rem'
                    })
                }
            }">
            <Column field="equipment" header="Устройство" style="width: 15%">
                <template #body="slotProps">{{ slotProps.data.equipment }}</template>
            </Column>
            <Column field="clientFullName" header="Клиент" style="width: 20%">
                <template #body="slotProps">{{ getClientFullName(slotProps.data.clientId) }}</template>
            </Column>
            <Column field="description" header="Описание" style="width: 25%">
                <template #body="slotProps">{{ slotProps.data.description }}</template>
            </Column>
            <Column field="issueType" header="Тип поломки" style="width: 15%">
                <template #body="slotProps">{{ slotProps.data.issueType }}</template>
            </Column>
            <Column field="executorFullName" header="Исполнитель" style="width: 15%">
            
                <template #body="slotProps">{{ getExecutorFullName(slotProps.data.executorId) }}</template>
            </Column>
            <Column field="status" header="Статус" style="width: 10%">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                </template>
            </Column>
            <Column field="comments" header="Комментарии" style="width: 10%">
                <template #body="slotProps">
                    <commentClient :id="slotProps.data.id"></commentClient>
                </template>
            </Column>
        </DataTable>
        <div v-if="zayavki.length === 0">
            <h3 style="text-align: center;">Заявок нет</h3>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const editingRows = ref([]);
const statuses = ref([
    { label: 'В обработке', value: 'В обработке' },
    { label: 'В работе', value: 'В работе' },
    { label: 'Завершено', value: 'Завершено' }
]);

const zavkaStore = useZayavkaStore();
const userStore = useUserStore();
const zayavki = ref([]);
const executorList = ref([]);
const clientList = ref([]);

onMounted(async () => {
 
    const result = await $fetch('/api/database/user/findAll')
    const { data } = result;
    clientList.value = data.filter(user => user.role === "Клиент");
    executorList.value = data.filter(user => user.role === "Сотрудник");
    const zayavki_raw = await zavkaStore.getZayavkaByClientId( await userStore.user.id)
    zayavki.value = zayavki_raw.data
});

const onRowEditSave = (event) => {
    let { newData, index } = event;
    console.log(newData, index);
    zavkaStore.updateZayavka(newData.id, newData)
    zayavki.value[index] = newData;
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'В обработке':
            return 'info';
        case 'В работе':
            return 'warning';
        case 'Завершено':
            return 'success';
        default:
            return null;
    }
};

const getClientFullName = (clientId) => {
    const client = clientList.value.find((user) => user.id === clientId);
    return client ? client.fullName : 'Unknown';
};

const getExecutorFullName = (executorId) => {
    const executor = executorList.value.find((user) => user.id === executorId);
    return executor ? executor.fullName : 'Unknown';
};

const executorOptions = ref([]);
onMounted(() => {
    executorOptions.value = executorList.value.map(user => ({ id: user.id, fullName: user.fullName }));
    console.log(executorList.value.map(user => ({ id: user.id, fullName: user.fullName })))

});

</script>
