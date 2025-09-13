<template>
  <div class="q-pa-lg column q-gutter-lg text-white">
    <q-card flat bordered class="bg-dark text-white">
      <q-card-section>
        <SearchBar @search="onSearch" />
      </q-card-section>
    </q-card>

    <div v-if="store.loading" class="row justify-center items-center q-my-lg">
      <q-spinner color="warning" size="40px" />
      <div class="q-ml-sm text-grey-4">Searching tariffs...</div>
    </div>

    <q-banner v-if="store.error" class="bg-red-10 text-white" inline-actions rounded>
      <template v-slot:avatar>
        <q-icon name="warning" color="white" />
      </template>
      {{ store.error }}
    </q-banner>

    <div class="row q-gutter-md q-my-sm">
      <q-badge color="primary" class="q-pa-sm text-white shadow-2" align="middle">
        API: {{ store.apiTariffs.length }}
      </q-badge>

      <q-badge color="secondary" class="q-pa-sm text-white shadow-2" align="middle">
        Local: {{ store.localTariffs.length }}
      </q-badge>
    </div>

    <q-card flat bordered class="bg-dark text-white">
      <q-card-section>
        <TariffTable :items="results" />
      </q-card-section>
    </q-card>

    <div
      v-if="!store.loading && !store.error && results.length === 0"
      class="row justify-center q-mt-md text-grey-5"
    >
      <q-icon name="search_off" size="md" color="grey-5" class="q-mr-sm" />
      <span>No tariffs found. Try searching another ID.</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import SearchBar from 'src/components/SearchBar.vue';
import TariffTable from 'src/components/TariffTable.vue';
import { useTariffs } from 'src/composables/useTariffs';
import { useTariffsStore } from 'src/stores/tariffsStore';

const { searchTariff, mergedResults } = useTariffs();
const store = useTariffsStore();

async function onSearch(id: number | string) {
  try {
    await searchTariff(id);
  } catch (err) {
    console.error(err);
  }
}

const results = computed(() => mergedResults());

onMounted(async () => {
  try {
    await searchTariff('12');
  } catch (err) {
    console.error(err);
  }
});
</script>
