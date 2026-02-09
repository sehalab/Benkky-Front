<template>
    <div class="credit-card-item">
        <div class="card-top">
            <div class="card-number">{{ cardNumber }}</div>
            <div class="card-holder">{{ cardHolder }}</div>
        </div>
        <div class="card-bottom">
            <div class="expiry">{{ expiryDate }}</div>
            <div class="balance">€{{ formatCurrency(balance) }}</div>
        </div>
        <div class="card-actions">
            <button @click="$emit('request-pin')">PIN</button>
            <button @click="$emit('recharge')">Recharge</button>
            <button @click="$emit('block')">Bloquer</button>
            <button @click="$emit('view')">Voir</button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    cardNumber: String,
    cardHolder: String,
    expiryDate: String,
    balance: [Number, String],
    status: String,
    requiresPin: Boolean,
});

const formatCurrency = (amount) => {
    const n = parseFloat(amount) || 0;
    return n.toFixed(2);
};
</script>

<style scoped>
.credit-card-item {
    background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
    border: 1px solid rgba(255,255,255,0.03);
    padding: 18px;
    border-radius: 12px;
    color: var(--light-color1);
}
.card-top { display:flex; justify-content:space-between; margin-bottom:12px }
.card-number { font-weight:700 }
.card-holder { opacity:0.9 }
.card-bottom { display:flex; justify-content:space-between; margin-bottom:8px }
.card-actions { display:flex; gap:8px }
.card-actions button { padding:6px 10px; border-radius:8px; background:transparent; border:1px solid rgba(255,255,255,0.04); color:inherit }
</style>
