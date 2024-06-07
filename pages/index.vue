<template>
  <Toast />
  <div class="tab">
    <TabMenu v-model:activeIndex="active" :model="items" />
    <div class="button-box">
      <Button label="Создать заявку" @click="visible = true" />
      <Button v-if="user.role !== 'client'" label="Добавить работника" />
      <Button @click="() => {
        user = { id: null, role: null }
        navigateTo('/login');
      }" label="Выход" />
    </div>
  </div>
  <Applications v-if="active === 0" />
  <Dialog v-model:visible="visible" modal header="Создание заявки" :style="{ width: '50rem' }">
    <Splitter style="min-height: 400px">
      <SplitterPanel :size="60" :minSize="60">
        <FloatLabel class="p-field">
          <Dropdown class="p-field-item" id="issueType" v-model="selectedEquipment" :options="allEquipment"
            optionLabel="label" optionValue="value" />
          <label for="equipment">Устройство</label>
        </FloatLabel>

        <FloatLabel class="p-field">
          <Dropdown class="p-field-item" id="issueType" v-model="applicationSelect.issueType" :options="equipmentIssue"
            optionLabel="label" optionValue="value" />
          <label for="issueType">Тип поломки</label>
        </FloatLabel>

        <FloatLabel class="p-field">
          <InputText class="p-field-item" disabled id="executorId" v-model="applicationSelect.clientId" />
          <label for="executorId">Клиент</label>
        </FloatLabel>

        <FloatLabel class="p-field">
          <Textarea class="p-field-item" id="description" v-model="applicationSelect.description" rows="4" />
          <label for="description">Description</label>
        </FloatLabel>

        <div class="button-box">
          <Button label="Сохранить" @click="createApplication" type="submit" />
        </div>
      </SplitterPanel>
    </Splitter>
  </Dialog>

</template>

<script lang="ts" setup>
import Applications from './Applications.vue';
const application = useApplicationsStore()
const user = useLocalStorage('user', { id: null, role: null });
const visible = ref(false);
const toast = useToast()
const applicationSelect = ref({
  equipment: '',
  clientId: null,
  description: '',
  issueType: '',
});
const selectedEquipment = ref([{ label: '...' }]);
interface Equipment {
  label: string;
  value: {
    label: string;
    value: string[];
  }[];
}
const allEquipment: Equipment[] = [
  {
    "label": "Компьютер",
    "value": [
      {
        "label": "Компьютер",
        "value": ["Не включается", "Шумит вентилятор", "Перегревается", "Синий экран смерти", "Другое"]
      }
    ]
  },
  {
    "label": "Принтер",
    "value": [
      {
        "label": "Принтер",
        "value": ["Не печатает", "Застревание бумаги", "Плохое качество печати", "Не включается", "Другое"]
      }
    ]
  },
  {
    "label": "Сканер",
    "value": [
      {
        "label": "Сканер",
        "value": ["Не сканирует", "Не распознается компьютером", "Низкое качество сканирования", "Шумит", "Другое"]
      }
    ]
  },
  {
    "label": "Монитор",
    "value": [
      {
        "label": "Монитор",
        "value": ["Не включается", "Мерцает экран", "Изображение искажено", "Проблемы с цветом", "Другое"]
      }
    ]
  },
  {
    "label": "Клавиатура",
    "value": [
      {
        "label": "Клавиатура",
        "value": ["Не работают клавиши", "Залипание клавиш", "Не подключается", "Шумит", "Другое"]
      }
    ]
  },
  {
    "label": "Мышь",
    "value": [
      {
        "label": "Мышь",
        "value": ["Не двигается курсор", "Двойное нажатие", "Не работает колесо прокрутки", "Не подключается", "Другое"]
      }
    ]
  },
  {
    "label": "Модем",
    "value": [
      {
        "label": "Модем",
        "value": ["Нет интернета", "Перепады соединения", "Не включается", "Шумит", "Другое"]
      }
    ]
  },
  {
    "label": "Маршрутизатор",
    "value": [
      {
        "label": "Маршрутизатор",
        "value": ["Нет Wi-Fi сигнала", "Перезагружается", "Низкая скорость интернета", "Не включается", "Другое"]
      }
    ]
  },
  {
    "label": "Проектор",
    "value": [
      {
        "label": "Проектор",
        "value": ["Нет изображения", "Низкая яркость", "Не включается", "Искажение цвета", "Другое"]
      }
    ]
  },
  {
    "label": "ИБП",
    "value": [
      {
        "label": "ИБП",
        "value": ["Не включается", "Не держит заряд", "Перегрев", "Шумит вентилятор", "Другое"]
      }
    ]
  },
  {
    "label": "Жесткий диск",
    "value": [
      {
        "label": "Жесткий диск",
        "value": ["Не определяется", "Шумит", "Повреждены сектора", "Перегревается", "Другое"]
      }
    ]
  },
  {
    "label": "SSD",
    "value": [
      {
        "label": "SSD",
        "value": ["Не определяется", "Низкая скорость чтения/записи", "Перегрев", "Ошибка контроллера", "Другое"]
      }
    ]
  },
  {
    "label": "Память",
    "value": [
      {
        "label": "Память",
        "value": ["Не определяется", "Ошибки чтения/записи", "Перегрев", "Не совместима с материнской платой", "Другое"]
      }
    ]
  },
  {
    "label": "Материнская плата",
    "value": [
      {
        "label": "Материнская плата",
        "value": ["Не включается", "Перегрев", "Не работает USB", "Шумит", "Другое"]
      }
    ]
  },
  {
    "label": "Блок питания",
    "value": [
      {
        "label": "Блок питания",
        "value": ["Не включается", "Перегрев", "Шумит вентилятор", "Нестабильное напряжение", "Другое"]
      }
    ]
  },
  {
    "label": "Видеокарта",
    "value": [
      {
        "label": "Видеокарта",
        "value": ["Нет изображения", "Перегрев", "Артефакты на экране", "Шумит вентилятор", "Другое"]
      }
    ]
  },
  {
    "label": "Звуковая карта",
    "value": [
      {
        "label": "Звуковая карта",
        "value": ["Нет звука", "Шумы и искажения", "Не определяется", "Конфликт драйверов", "Другое"]
      }
    ]
  },
  {
    "label": "CD/DVD привод",
    "value": [
      {
        "label": "CD/DVD привод",
        "value": ["Не читает диски", "Не записывает диски", "Шумит", "Не открывается", "Другое"]
      }
    ]
  },
  {
    "label": "МФУ",
    "value": [
      {
        "label": "МФУ",
        "value": ["Не сканирует", "Не печатает", "Застревание бумаги", "Не включается", "Другое"]
      }
    ]
  },
  {
    "label": "Телефон",
    "value": [
      {
        "label": "Телефон",
        "value": ["Не включается", "Проблемы с микрофоном", "Проблемы с динамиком", "Перегрев", "Другое"]
      }
    ]
  },
  {
    "label": "Смартфон",
    "value": [
      {
        "label": "Смартфон",
        "value": ["Не включается", "Проблемы с сенсором", "Быстро разряжается", "Перегрев", "Другое"]
      }
    ]
  },
  {
    "label": "Планшет",
    "value": [
      {
        "label": "Планшет",
        "value": ["Не включается", "Проблемы с экраном", "Быстро разряжается", "Не подключается к Wi-Fi", "Другое"]
      }
    ]
  },
  {
    "label": "Факс",
    "value": [
      {
        "label": "Факс",
        "value": ["Не отправляет", "Не принимает", "Застревание бумаги", "Проблемы с печатью", "Другое"]
      }
    ]
  },
  {
    "label": "Наушники",
    "value": [
      {
        "label": "Наушники",
        "value": ["Нет звука", "Шумы и искажения", "Проблемы с микрофоном", "Не подключаются", "Другое"]
      }
    ]
  },
  {
    "label": "Колонки",
    "value": [
      {
        "label": "Колонки",
        "value": ["Нет звука", "Шумы и искажения", "Перегрев", "Проблемы с подключением", "Другое"]
      }
    ]
  },
  {
    "label": "Микрофон",
    "value": [
      {
        "label": "Микрофон",
        "value": ["Не работает", "Шумы и искажения", "Низкий уровень сигнала", "Проблемы с подключением", "Другое"]
      }
    ]
  },
  {
    "label": "Веб-камера",
    "value": [
      {
        "label": "Веб-камера",
        "value": ["Не работает", "Плохое качество изображения", "Не определяется", "Проблемы с фокусировкой", "Другое"]
      }
    ]
  },
  {
    "label": "Сетевой кабель",
    "value": [
      {
        "label": "Сетевой кабель",
        "value": ["Нет связи", "Низкая скорость передачи", "Перегибы", "Повреждение разъема", "Другое"]
      }
    ]
  },
  {
    "label": "Картридж",
    "value": [
      {
        "label": "Картридж",
        "value": ["Не печатает", "Полосы на печати", "Низкое качество печати", "Протекает", "Другое"]
      }
    ]
  },
  {
    "label": "Шредер",
    "value": [
      {
        "label": "Шредер",
        "value": ["Не включается", "Застревание бумаги", "Шумит", "Перегрев", "Другое"]
      }
    ]
  }
]
const createApplication = async () => {
  applicationSelect.value.equipment = selectedEquipment.value[0].label
  applicationSelect.value.issueType = applicationSelect.value.issueType.label
  
const data = toRaw(applicationSelect.value)
  const result = await $fetch('/api/applications/create', {
    method: 'POST',
    body: data,
  }, )

  if(result.status) {
    visible.value = false
    applicationSelect.value = {
      equipment: '',
      clientId: null,
      description: '',
      issueType: '',
    }
    selectedEquipment.value = [{label: '...' , value: []}]
    await application.refrash()
  } 


}
const equipmentIssue = ref([])

onMounted(() => {
  if (!user.value.id) {
    navigateTo('/login');
  }
  applicationSelect.value.clientId = user.value.id

  if (user.value.role === 'admin') {
    items.value.push({ label: 'Работники', icon: 'pi pi-user' });
    items.value.push({ label: 'Статистика', icon: 'pi pi-chart-line' });
  }
}

  // await $fetch('/api/user/applications/all')

)
const active = ref(0);
const items = ref([
  { label: 'Заявки', icon: 'pi pi-list' },
]);

watch(selectedEquipment, () => {
  equipmentIssue.value = []
  for (let i = 0; i < selectedEquipment.value[0].value.length; i++) {
    equipmentIssue.value.push({ label: selectedEquipment.value[0].value[i], value: { label: selectedEquipment.value[0].value[i] } })
  }
})
</script>

<style scoped>
.tab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button-box {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.p-field {

  margin: 1vh;
  display: flex;
  align-items: center;
}

.p-field-item {
  width: 100%;
}


.button-box {
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>