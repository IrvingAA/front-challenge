<template>
  <div class="flex items-center space-x-2 mb-4" role="tablist" aria-label="Main tabs">
    <q-button
      :class="['q-btn q-btn--flat', tab === 'search' ? 'active-tab' : '']"
      role="tab"
      :aria-selected="tab === 'search'"
      @click="select('search')"
      @keydown.enter.prevent="select('search')"
      @keydown.space.prevent="select('search')"
    >
      <span class="px-3 py-2">Search</span>
      <q-spinner-dots v-if="busy && busyTab === 'search'" size="16" class="ml-2" />
    </q-button>

    <q-button
      :class="['q-btn q-btn--flat', tab === 'create' ? 'active-tab' : '']"
      role="tab"
      :aria-selected="tab === 'create'"
      @click="select('create')"
      @keydown.enter.prevent="select('create')"
      @keydown.space.prevent="select('create')"
    >
      <span class="px-3 py-2">Create</span>
      <q-spinner-dots v-if="busy && busyTab === 'create'" size="16" class="ml-2" />
    </q-button>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore defineOptions exists at compile time
defineOptions({ name: 'TabsSwitcher' });

import { ref } from 'vue';
import { QSpinnerDots } from 'quasar';
const emit = defineEmits<{ (e: 'change', tab: 'search' | 'create'): void }>();

defineProps({
  busy: { type: Boolean, default: false },
  busyTab: { type: String as () => 'search' | 'create' | null, default: null },
});

const tab = ref<'search' | 'create'>('search');
function select(t: 'search' | 'create') {
  tab.value = t;
  emit('change', t);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Spinner = QSpinnerDots;
</script>

<style scoped>
.active-tab {
  background: #000;
  color: #d4af37;
  border-radius: 6px;
}
</style>
