<template>
  <div class="row items-center q-gutter-sm">
    <q-input
      v-model="model"
      type="number"
      dense
      outlined
      clearable
      label="Tariff ID"
      placeholder="Enter idTarifa"
      class="col-grow"
      @keyup.enter="onSearch"
    >
      <template v-slot:append>
        <q-icon name="search" class="cursor-pointer" @click="onSearch" />
      </template>
    </q-input>

    <q-btn color="primary" label="Search" icon="search" unelevated @click="onSearch" />

    <q-btn color="positive" label="Create" icon="add" unelevated @click="goToCreate" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
  modelValue?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'search', value: string): void;
}>();

const model = ref<string | null>(props.modelValue ?? null);

watch(model, (val) => emit('update:modelValue', val));

function onSearch() {
  if (model.value) {
    emit('search', model.value);
  }
}

async function goToCreate() {
  await router.push('/create');
}
</script>
