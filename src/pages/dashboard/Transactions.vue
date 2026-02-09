<template>
  <div class="transactions-tab">
    <h2>Transactions</h2>
    <RecentTransactions :transactions="[]" />
  </div>
</template>

<script setup>
import RecentTransactions from '@/components/User/Dashboard/RecentTransactions.vue';
</script>

<style scoped>
.transactions-tab { padding: 16px }
</style>
