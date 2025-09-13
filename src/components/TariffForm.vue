<template>
  <q-form @submit.prevent="onSubmit" class="q-pa-lg rounded-borders shadow-2">
    <div class="text-h6 text-primary q-mb-md">Create New Tariff</div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-input
          v-model.number="local.idTarifa"
          type="number"
          label="ID Tariff *"
          outlined
          dense
          clearable
          :error="!!errors.idTarifa"
          :error-message="errors.idTarifa || ''"
          hint="Unique tariff identifier"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="local.tarifa"
          type="text"
          label="Tariff *"
          outlined
          dense
          clearable
          :error="!!errors.tarifa"
          :error-message="errors.tarifa || ''"
          hint="Enter tariff description"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model.number="local.amount"
          type="number"
          step="0.01"
          label="Amount *"
          outlined
          dense
          clearable
          prefix="$"
          :error="!!errors.amount"
          :error-message="errors.amount || ''"
          hint="Tariff cost in USD"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="local.startDay"
          type="date"
          label="Start Day"
          outlined
          dense
          stack-label
          hint="Select start date"
        />
      </div>

      <div class="col-12 col-md-6">
        <q-input
          v-model="local.endDay"
          type="date"
          label="End Day"
          outlined
          dense
          stack-label
          hint="Select end date"
          :error="!!errors._startEnd"
          :error-message="errors._startEnd || ''"
        />
      </div>
    </div>

    <div class="row justify-end q-gutter-sm q-mt-md">
      <q-btn flat color="negative" label="Back" icon="arrow_back" @click="goBack" />
      <q-btn flat color="secondary" label="Reset" icon="refresh" @click="reset" />
      <q-btn type="submit" color="primary" label="Create" icon="add" unelevated />
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { Tariff } from 'src/types/tariff';
import { useFormValidation } from 'src/composables/useFormValidation';

type LocalTariff = {
  idTarifa?: number | null;
  tarifa?: string;
  amount?: number | null;
  startDay?: string | null;
  endDay?: string | null;
};

const router = useRouter();

const emit = defineEmits<{
  (e: 'created', payload: Tariff): void;
}>();

const local = reactive<LocalTariff>({
  idTarifa: null,
  tarifa: '',
  amount: null,
  startDay: null,
  endDay: null,
});

const errors = reactive<Record<string, string | null>>({});

const { required, isNumber, startBeforeEnd } = useFormValidation();

function validate() {
  errors.idTarifa = required(local.idTarifa) === true ? null : String(required(local.idTarifa));
  errors.tarifa = required(local.tarifa) === true ? null : String(required(local.tarifa));
  errors.amount = isNumber(local.amount) === true ? null : String(isNumber(local.amount));
  const sbe = startBeforeEnd(local.startDay || undefined, local.endDay || undefined);
  errors._startEnd = sbe === true ? null : String(sbe);
  return !Object.values(errors).some((v) => v);
}

function onSubmit() {
  if (!validate()) return;
  const payload = {
    idTarifa: Number(local.idTarifa),
    tarifa: String(local.tarifa),
    amount: local.amount ? Number(local.amount) : undefined,
    startDay: local.startDay,
    endDay: local.endDay,
    status: { code: 'LOCAL', label: 'Local' },
  } as Tariff;
  emit('created', payload);
  reset();
}

function reset() {
  local.idTarifa = null;
  local.tarifa = '';
  local.amount = null;
  local.startDay = null;
  local.endDay = null;
  Object.keys(errors).forEach((k) => (errors[k] = null));
}

function goBack() {
  router.back();
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 0.75rem;
}
</style>
