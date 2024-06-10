
<template>
    <Dialog header="Создать новую заявку" v-model:visible="showModal" :modal="true" :closable="false"
        :style="{ width: '50vw' }">
        <form @submit.prevent="onSubmit">
            <div class="p-fluid">
                <div class="p-field">
                    <label for="equipment">Оборудование</label>
                    <Dropdown id="equipment" v-model="form.equipment" :options="equipmentOptions" optionLabel="name" required />
                </div>
                
                <div class="p-field">
                    <label for="issueType">Тип проблемы</label>
                    <Dropdown id="issueType" v-model="form.issueType" :options="issueTypeOptions" optionLabel="name" required />
                </div>

                <div class="p-field">
                    <label for="description">Описание</label>
                    <Textarea id="description" v-model="form.description" rows="3" required />
                </div>
            </div>
            <div class="p-dialog-footer">
                <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="onCancel" />
                <Button label="Создать" icon="pi pi-check" type="submit" />
            </div>
        </form>
    </Dialog>
    <Button label="Создать заявку" icon="pi pi-plus" @click="showModal = true" />
</template>

<script setup>
import { ref } from 'vue';


const showModal = ref(false);
const userStore = useUserStore();
const zayavkaStore = useZayavkaStore();

const form = ref({
    equipment: '',
    description: '',
    issueType: '',
    status: 'В обработке',
    clientId: 0
});

const equipmentOptions = ref([
    { name: 'Принтер', code: 'printer' },
    { name: 'Сканер', code: 'scanner' },
    { name: 'Компьютер', code: 'computer' },
    { name: 'Ноутбук', code: 'laptop' },
    { name: 'Проектор', code: 'projector' },
    { name: 'Ксерокс', code: 'xerox' },
    { name: 'Маршрутизатор', code: 'router' },
    { name: 'Сервер', code: 'server' },
    { name: 'Монитор', code: 'monitor' },
    { name: 'Клавиатура', code: 'keyboard' }
]);

const issueTypeOptions = ref([
    { name: 'Не включается', code: 'not_turning_on' },
    { name: 'Не печатает', code: 'not_printing' },
    { name: 'Синий экран', code: 'blue_screen' },
    { name: 'Перезагружается', code: 'rebooting' },
    { name: 'Медленная работа', code: 'slow_performance' },
    { name: 'Проблемы с сетью', code: 'network_issues' },
    { name: 'Нет звука', code: 'no_sound' },
    { name: 'Перегревается', code: 'overheating' },
    { name: 'Ошибка программного обеспечения', code: 'software_error' },
    { name: 'Проблемы с дисплеем', code: 'display_issues' }
]);

const onSubmit = async () => {
    form.value.clientId = userStore.user.id;
    form.value.issueType = form.value.issueType.name
    form.value.equipment = form.value.equipment.name
    const response = await zayavkaStore.createZayavka(form.value);
    if (response.status === 'success') {
        showModal.value  = false;
        location.reload();
    } else {
        // Обработка ошибок
    }
};

const onCancel = () => {
    showModal.value = false;
};
</script>
