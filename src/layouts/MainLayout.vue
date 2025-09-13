<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark text-warning">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="q-mr-sm"
        />

        <q-toolbar-title class="cursor-pointer" @click="goTo('/search')">
          iayala.dev Challenge-front
        </q-toolbar-title>

        <div class="text-caption text-warning q-ml-md gt-sm">v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <div class="q-pa-sm">
      <TabsSwitcher @change="onTabChange" />
    </div>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-dark text-warning">
      <q-list separator padding>
        <q-item-label header class="text-uppercase text-grey-5"> Navigation </q-item-label>

        <q-item clickable v-ripple :active="isActive('/search')" @click="goTo('/search')">
          <q-item-section avatar>
            <q-icon name="search" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Search</q-item-label>
            <q-item-label class="text-white" caption>Find tariffs by ID</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple :active="isActive('/create')" @click="goTo('/create')">
          <q-item-section avatar>
            <q-icon name="add_circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Create</q-item-label>
            <q-item-label class="text-white" caption>Create a local tariff</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item clickable v-ripple @click="openRepo">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Repository</q-item-label>
            <q-item-label class="text-white" caption>Open project repo</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="open_in_new" size="16px" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import TabsSwitcher from 'components/TabsSwitcher.vue';

const leftDrawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

function goTo(path: string) {
  void router.push({ path });
}

function openRepo() {
  window.open('https://github.com/IrvingAA/front-challenge', '_blank');
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function onTabChange(tab: 'search' | 'create') {
  void router.push({ path: `/${tab}` });
}

function isActive(path: string) {
  return route.path === path;
}
</script>

<style scoped>
.bg-dark {
  background-color: #000;
}
.text-warning {
  color: #d4af37;
}
.q-drawer .q-item.q-router-link--active {
  background-color: rgba(212, 175, 55, 0.1);
}
</style>
