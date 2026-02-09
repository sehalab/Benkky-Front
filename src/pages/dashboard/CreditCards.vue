<template>
  <div>
    <!-- Reuse the CreditCard tab component and forward props/events -->
    <CreditCardTab
      :user="user"
      :cards="user?.cards ?? []"
      @show-pin-modal="$emit('show-pin-modal', $event)"
      @show-buy-credit="$emit('show-buy-credit', $event)"
      @show-recharge-modal="$emit('show-recharge-modal', $event)"
      @show-block-modal="$emit('show-block-modal', $event)"
    />
  </div>
</template>

<script setup>
import CreditCardTab from '@/components/User/Dashboard/CreditCard.vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['show-pin-modal', 'show-buy-credit', 'show-recharge-modal', 'show-block-modal']);
</script>

<style scoped>
</style>
