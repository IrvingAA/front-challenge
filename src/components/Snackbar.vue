<script lang="ts" setup>
defineOptions({ name: 'SnackbarComponent' });
import { onMounted } from 'vue';
import { Notify } from 'quasar';

const props = defineProps({
  message: { type: String, required: true },
  type: {
    type: String as unknown as () => 'info' | 'success' | 'error' | 'warning',
    default: 'info',
  },
  timeout: { type: Number, default: 4000 },
  actionLabel: { type: String, default: '' },
});

const emit = defineEmits<{ (e: 'action'): void }>();

onMounted(() => {
  const color =
    props.type === 'error' ? 'negative' : props.type === 'success' ? 'positive' : 'info';
  const options: Record<string, unknown> = {
    message: props.message,
    color,
    timeout: props.timeout,
  };
  if (props.actionLabel) {
    options.actions = [
      {
        label: props.actionLabel,
        color: 'white',
        handler: () => emit('action'),
      },
    ];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Notify.create(options as any);
});
</script>

<template>
  <div aria-hidden="true" />
</template>
