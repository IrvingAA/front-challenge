<template>
  <div class="p-6">
    <TariffForm @created="onCreated" />
  </div>
</template>

<script lang="ts" setup>
import TariffForm from '../components/TariffForm.vue';
import { useTariffs } from '../composables/useTariffs';
import { Notify } from 'quasar';
import type { Tariff } from '../types/tariff';

const { addLocalTariff } = useTariffs();

function onCreated(payload: Tariff) {
  addLocalTariff(payload);
  Notify.create({ message: 'Tariff saved locally', color: 'positive' });
}
</script>
