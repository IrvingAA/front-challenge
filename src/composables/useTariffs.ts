import { ref } from 'vue';
import { fetchTariff } from '../services/tariffsService';
import { useTariffsStore } from '../stores/tariffsStore';
import type { Tariff } from '../types/tariff';

export function useTariffs() {
  const store = useTariffsStore();
  const searching = ref(false);

  async function searchTariff(idTarifa: string | number): Promise<Tariff[]> {
    store.loading = true;
    store.error = null;
    searching.value = true;
    try {
      const results = await fetchTariff(idTarifa);
      store.setApiTariffs(results);
      return results;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      store.error = message;
      throw err;
    } finally {
      store.loading = false;
      searching.value = false;
    }
  }

  function addLocalTariff(item: Tariff) {
    store.addLocalTariff(item);
  }

  function mergedResults(): Tariff[] {
    const api = store.apiTariffs || [];
    const local = store.localTariffs || [];
    const apiIds = new Set(api.map((t) => t.idTarifa));
    const locals = local.filter((t) => !apiIds.has(t.idTarifa));
    return [...api, ...locals];
  }

  return { searching, searchTariff, addLocalTariff, mergedResults };
}
