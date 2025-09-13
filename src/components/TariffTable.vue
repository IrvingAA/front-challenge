<template>
  <div class="p-4 rounded shadow-sm text-gold">
    <q-table :rows="rows" :columns="columns" row-key="idTarifa" class="min-w-full tariff-table" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { Notify } from 'quasar';
import { useTariffs } from '../composables/useTariffs';
import type { Tariff } from '../types/tariff';

const props = defineProps<{ items: Tariff[]; autoFetchId?: number }>();

const columns = computed(() => [
  { name: 'idTarifa', label: 'ID', field: 'idTarifa', align: 'left' as const },
  { name: 'tarifa', label: 'Tarifa', field: 'tarifa' },
  {
    name: 'amount',
    label: 'Amount',
    field: (row: Tariff) =>
      row.amount !== undefined && row.amount !== null ? String(row.amount) : '-',
  },
  {
    name: 'status',
    label: 'Status',
    field: (row: Tariff) => row.status?.label ?? row.status?.code ?? '-',
  },
  { name: 'startDay', label: 'Start', field: 'startDay' },
  { name: 'endDay', label: 'End', field: 'endDay' },
]);

const rows = computed(() => props.items || []);

const { searchTariff } = useTariffs();
onMounted(async () => {
  if (props.autoFetchId !== undefined && props.autoFetchId !== null) {
    try {
      await searchTariff(props.autoFetchId);
      Notify.create({ message: `Loaded tariffs for ${props.autoFetchId}`, color: 'positive' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      Notify.create({ message: `Failed to load tariffs: ${msg}`, color: 'negative' });
    }
  }
});
</script>

<style scoped>
.q-table__grid {
  font-size: 0.95rem;
}
.text-gold {
  color: #d4af37;
}
.tariff-table .q-table__top,
.tariff-table thead {
  background: #000;
  color: #d4af37;
}
.tariff-table .q-td,
.tariff-table .q-th {
  border-bottom: 1px solid rgba(212, 175, 55, 0.08);
}
</style>
