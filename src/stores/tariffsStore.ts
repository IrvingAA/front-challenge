import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Tariff } from '../types/tariff';

export const useTariffsStore = defineStore('tariffs', () => {
  const apiTariffs = ref<Tariff[]>([]);
  const localTariffs = ref<Tariff[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function setApiTariffs(items: Tariff[]) {
    apiTariffs.value = items;
  }

  function addLocalTariff(item: Tariff) {
    // Ensure unique idTarifa for local items if needed
    localTariffs.value = [item, ...localTariffs.value];
  }

  function clear() {
    apiTariffs.value = [];
    localTariffs.value = [];
    loading.value = false;
    error.value = null;
  }

  return { apiTariffs, localTariffs, loading, error, setApiTariffs, addLocalTariff, clear };
});
