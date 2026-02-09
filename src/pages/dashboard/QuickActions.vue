<template>
    <div class="quick-actions dark-card">
        <!-- Header -->
        <div class="actions-header">
            <h3 class="actions-title">
                <i class="fa-solid fa-bolt"></i>
                Actions rapides
            </h3>
            <button class="edit-btn" @click="toggleEditMode" v-if="!editMode">
                <i class="fa-solid fa-pen"></i>
            </button>
            <div class="edit-actions" v-else>
                <button class="save-btn" @click="saveCustomization">
                    <i class="fa-solid fa-check"></i>
                </button>
                <button class="cancel-btn" @click="cancelCustomization">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        </div>

        <!-- Actions Grid -->
        <div class="actions-grid">
            <!-- Action principale - Recharger -->
            <div class="action-item main-action" @click="handleAction('recharge')">
                <div class="action-icon">
                    <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="action-content">
                    <h4>Recharger</h4>
                    <p>Ajouter des fonds au portefeuille</p>
                </div>
                <div class="action-badge hot">
                    <i class="fa-solid fa-fire"></i>
                </div>
            </div>

            <!-- Actions personnalisables -->
            <draggable
                v-model="customActions"
                :disabled="!editMode"
                item-key="id"
                class="draggable-container"
                ghost-class="ghost"
                drag-class="dragging"
                @start="drag = true"
                @end="drag = false"
            >
                <template #item="{ element: action }">
                    <div
                        :class="['action-item', { 'editable': editMode }]"
                        @click="!editMode && handleAction(action.id)"
                    >
                        <div class="action-icon" :style="{ background: action.color }">
                            <i :class="action.icon"></i>
                        </div>
                        <div class="action-content">
                            <h4>{{ action.title }}</h4>
                            <p>{{ action.description }}</p>
                        </div>
                        <div class="action-badge" :class="action.badgeType" v-if="action.badge">
                            <i :class="action.badgeIcon"></i>
                        </div>
                        <button
                            class="remove-btn"
                            v-if="editMode"
                            @click.stop="removeAction(action.id)"
                        >
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                </template>
            </draggable>

            <!-- Bouton d'ajout en mode édition -->
            <div class="action-item add-action" v-if="editMode" @click="showAddActionModal">
                <div class="action-icon add">
                    <i class="fa-solid fa-plus"></i>
                </div>
                <div class="action-content">
                    <h4>Ajouter une action</h4>
                    <p>Personnalisez votre tableau de bord</p>
                </div>
            </div>
        </div>

        <!-- Suggestions en mode édition -->
        <div class="action-suggestions" v-if="editMode">
            <h4>Suggestions</h4>
            <div class="suggestions-grid">
                <div
                    v-for="suggestion in availableSuggestions"
                    :key="suggestion.id"
                    class="suggestion-item"
                    @click="addSuggestedAction(suggestion)"
                >
                    <div class="suggestion-icon">
                        <i :class="suggestion.icon"></i>
                    </div>
                    <div class="suggestion-content">
                        <h5>{{ suggestion.title }}</h5>
                        <span>{{ suggestion.description }}</span>
                    </div>
                    <button class="add-suggestion-btn">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Modal d'ajout d'action -->
        <div v-if="showAddModal" class="modal-overlay" @click.self="closeAddModal">
            <div class="add-action-modal dark-modal">
                <div class="modal-header">
                    <h3>Ajouter une action</h3>
                    <button class="close-btn" @click="closeAddModal">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>

                <div class="modal-content">
                    <div class="form-group">
                        <label>Titre de l'action</label>
                        <input
                            type="text"
                            v-model="newAction.title"
                            placeholder="Ex: Acheter eSIM"
                            class="dark-input"
                        />
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            v-model="newAction.description"
                            placeholder="Description courte"
                            class="dark-input"
                        />
                    </div>

                    <div class="form-group">
                        <label>Icône</label>
                        <div class="icon-selector">
                            <div
                                v-for="icon in availableIcons"
                                :key="icon"
                                :class="['icon-option', { selected: newAction.icon === icon }]"
                                @click="newAction.icon = icon"
                            >
                                <i :class="icon"></i>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Couleur</label>
                        <div class="color-selector">
                            <div
                                v-for="color in availableColors"
                                :key="color"
                                :class="['color-option', { selected: newAction.color === color }]"
                                :style="{ background: color }"
                                @click="newAction.color = color"
                            ></div>
                        </div>
                    </div>
                </div>

                <div class="modal-actions">
                    <button class="action-btn secondary" @click="closeAddModal">
                        Annuler
                    </button>
                    <button class="action-btn primary" @click="addCustomAction">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import draggable from 'vuedraggable';

const emit = defineEmits(['action-click']);

// État
const editMode = ref(false);
const showAddModal = ref(false);
const drag = ref(false);

// Actions par défaut
const defaultActions = [
    {
        id: 'send-money',
        title: 'Envoyer de l\'argent',
        description: 'Transfert rapide',
        icon: 'fa-solid fa-paper-plane',
        color: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
        badge: true,
        badgeType: 'new',
        badgeIcon: 'fa-solid fa-star'
    },
    {
        id: 'buy-card',
        title: 'Acheter une carte',
        description: 'Nouvelle carte',
        icon: 'fa-solid fa-credit-card',
        color: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
        badge: false
    },
    {
        id: 'esim-purchase',
        title: 'Acheter eSIM',
        description: 'Forfaits données',
        icon: 'fa-solid fa-sim-card',
        color: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
        badge: true,
        badgeType: 'hot',
        badgeIcon: 'fa-solid fa-fire'
    },
    {
        id: 'bill-payment',
        title: 'Payer une facture',
        description: 'Services',
        icon: 'fa-solid fa-file-invoice-dollar',
        color: 'linear-gradient(135deg, #FF9800 0%, #FF5722 100%)',
        badge: false
    },
    {
        id: 'transaction-history',
        title: 'Historique',
        description: 'Voir transactions',
        icon: 'fa-solid fa-history',
        color: 'linear-gradient(135deg, #607D8B 0%, #78909C 100%)',
        badge: false
    },
    {
        id: 'support',
        title: 'Support',
        description: 'Aide & assistance',
        icon: 'fa-solid fa-headset',
        color: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
        badge: false
    }
];

// Actions personnalisées (chargées depuis localStorage)
const customActions = ref([]);

// Nouvelle action
const newAction = ref({
    title: '',
    description: '',
    icon: 'fa-solid fa-plus',
    color: 'linear-gradient(135deg, #2A8C82 0%, #4CAF93 100%)'
});

// Suggestions disponibles
const availableSuggestions = [
    {
        id: 'currency-exchange',
        title: 'Change devise',
        description: 'Convertir monnaies',
        icon: 'fa-solid fa-exchange-alt',
        color: 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)'
    },
    {
        id: 'investment',
        title: 'Investir',
        description: 'Placements',
        icon: 'fa-solid fa-chart-line',
        color: 'linear-gradient(135deg, #795548 0%, #5D4037 100%)'
    },
    {
        id: 'savings',
        title: 'Épargne',
        description: 'Objectifs',
        icon: 'fa-solid fa-piggy-bank',
        color: 'linear-gradient(135deg, #3F51B5 0%, #283593 100%)'
    },
    {
        id: 'loan',
        title: 'Prêt',
        description: 'Demander',
        icon: 'fa-solid fa-hand-holding-usd',
        color: 'linear-gradient(135deg, #009688 0%, #004D40 100%)'
    }
];

// Icônes disponibles
const availableIcons = [
    'fa-solid fa-wallet',
    'fa-solid fa-credit-card',
    'fa-solid fa-money-bill-wave',
    'fa-solid fa-chart-bar',
    'fa-solid fa-shopping-cart',
    'fa-solid fa-gift',
    'fa-solid fa-qrcode',
    'fa-solid fa-mobile-screen',
    'fa-solid fa-globe',
    'fa-solid fa-shield-alt',
    'fa-solid fa-bell',
    'fa-solid fa-cog'
];

// Couleurs disponibles
const availableColors = [
    'linear-gradient(135deg, #2A8C82 0%, #4CAF93 100%)',
    'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
    'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
    'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)',
    'linear-gradient(135deg, #FF9800 0%, #FF5722 100%)',
    'linear-gradient(135deg, #607D8B 0%, #78909C 100%)'
];

// Computed
const allActions = computed(() => {
    const mainAction = {
        id: 'recharge',
        title: 'Recharger',
        description: 'Ajouter des fonds',
        icon: 'fa-solid fa-bolt',
        color: 'linear-gradient(135deg, #2A8C82 0%, #4CAF93 100%)'
    };
    return [mainAction, ...customActions.value];
});

// Méthodes
const loadCustomActions = () => {
    const saved = localStorage.getItem('user_quick_actions');
    if (saved) {
        customActions.value = JSON.parse(saved);
    } else {
        customActions.value = [...defaultActions];
    }
};

const saveCustomActions = () => {
    localStorage.setItem('user_quick_actions', JSON.stringify(customActions.value));
};

const handleAction = (actionId) => {
    emit('action-click', actionId);

    // Logique spécifique pour chaque action
    switch (actionId) {
        case 'recharge':
            console.log('Ouverture modal recharge');
            break;
        case 'send-money':
            console.log('Ouverture modal transfert');
            break;
        case 'buy-card':
            console.log('Ouverture modal carte');
            break;
        // ... autres actions
    }
};

const toggleEditMode = () => {
    editMode.value = !editMode.value;
    if (editMode.value) {
        loadCustomActions();
    }
};

const saveCustomization = () => {
    saveCustomActions();
    editMode.value = false;
};

const cancelCustomization = () => {
    loadCustomActions(); // Recharger les actions sauvegardées
    editMode.value = false;
};

const removeAction = (actionId) => {
    customActions.value = customActions.value.filter(action => action.id !== actionId);
};

const showAddActionModal = () => {
    newAction.value = {
        title: '',
        description: '',
        icon: 'fa-solid fa-plus',
        color: 'linear-gradient(135deg, #2A8C82 0%, #4CAF93 100%)'
    };
    showAddModal.value = true;
};

const closeAddModal = () => {
    showAddModal.value = false;
};

const addCustomAction = () => {
    if (!newAction.value.title.trim()) return;

    const newActionObj = {
        id: `custom-${Date.now()}`,
        title: newAction.value.title,
        description: newAction.value.description || newAction.value.title,
        icon: newAction.value.icon,
        color: newAction.value.color,
        badge: false
    };

    customActions.value.push(newActionObj);
    saveCustomActions();
    closeAddModal();
};

const addSuggestedAction = (suggestion) => {
    const newActionObj = {
        ...suggestion,
        id: `suggestion-${Date.now()}`
    };

    customActions.value.push(newActionObj);
    saveCustomActions();
};

// Cycle de vie
onMounted(() => {
    loadCustomActions();
});
</script>

<style scoped>
.quick-actions {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.8) 0%, rgba(6, 50, 50, 0.8) 100%);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 24px;
    padding: 25px;
    position: relative;
    overflow: hidden;
}

.quick-actions::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(42, 140, 130, 0.1) 0%, transparent 50%);
    pointer-events: none;
}

.actions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.actions-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--light-color1);
    display: flex;
    align-items: center;
    gap: 12px;
}

.actions-title i {
    color: var(--accent-color3);
    font-size: 1.2rem;
}

.edit-btn {
    width: 35px;
    height: 35px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--accent-color3);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    transform: rotate(15deg);
}

.edit-actions {
    display: flex;
    gap: 10px;
}

.save-btn, .cancel-btn {
    width: 35px;
    height: 35px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.save-btn {
    background: rgba(76, 175, 80, 0.2);
    border: 1px solid rgba(76, 175, 80, 0.3);
    color: #4CAF50;
}

.save-btn:hover {
    background: rgba(76, 175, 80, 0.3);
    border-color: #4CAF50;
}

.cancel-btn {
    background: rgba(244, 67, 54, 0.2);
    border: 1px solid rgba(244, 67, 54, 0.3);
    color: #F44336;
}

.cancel-btn:hover {
    background: rgba(244, 67, 54, 0.3);
    border-color: #F44336;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
}

.action-item {
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 18px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.action-item:hover:not(.add-action) {
    border-color: var(--accent-color2);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(42, 140, 130, 0.2);
}

.action-item.editable {
    cursor: move;
}

.action-item.main-action {
    border-color: var(--accent-color2);
    background: rgba(42, 140, 130, 0.1);
}

.action-item.main-action:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(42, 140, 130, 0.3);
}

.action-item.add-action {
    border: 2px dashed rgba(106, 196, 166, 0.3);
    background: rgba(15, 39, 39, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 150px;
}

.action-item.add-action:hover {
    border-color: var(--accent-color2);
    background: rgba(26, 65, 55, 0.4);
}

.action-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    color: white;
    font-size: 1.3rem;
}

.action-icon.add {
    background: rgba(106, 196, 166, 0.2);
    color: var(--accent-color3);
    border: 2px dashed rgba(106, 196, 166, 0.3);
}

.action-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.action-content p {
    font-size: 0.85rem;
    color: var(--light-color2);
    opacity: 0.8;
    line-height: 1.3;
}

.action-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
}

.action-badge.hot {
    background: linear-gradient(135deg, #FF5722 0%, #FF9800 100%);
    color: white;
}

.action-badge.new {
    background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
    color: white;
}

.remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    background: rgba(244, 67, 54, 0.2);
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 50%;
    color: #F44336;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
    font-size: 0.8rem;
}

.action-item:hover .remove-btn {
    opacity: 1;
}

.remove-btn:hover {
    background: rgba(244, 67, 54, 0.3);
    border-color: #F44336;
    transform: scale(1.1);
}

.draggable-container {
    display: contents;
}

.ghost {
    opacity: 0.5;
    background: rgba(42, 140, 130, 0.1);
    border: 2px dashed var(--accent-color2);
}

.dragging {
    cursor: grabbing !important;
    transform: rotate(3deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.action-suggestions {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

.action-suggestions h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 15px;
}

.suggestions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
}

.suggestion-item {
    background: rgba(15, 39, 39, 0.4);
    border: 1px solid rgba(106, 196, 166, 0.1);
    border-radius: 14px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.suggestion-item:hover {
    background: rgba(26, 65, 55, 0.6);
    border-color: rgba(106, 196, 166, 0.3);
    transform: translateX(5px);
}

.suggestion-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-color3);
    font-size: 1.1rem;
    flex-shrink: 0;
}

.suggestion-content {
    flex: 1;
}

.suggestion-content h5 {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 3px;
}

.suggestion-content span {
    font-size: 0.8rem;
    color: var(--light-color2);
    opacity: 0.8;
}

.add-suggestion-btn {
    width: 30px;
    height: 30px;
    background: rgba(26, 65, 55, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 8px;
    color: var(--accent-color3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.add-suggestion-btn:hover {
    background: rgba(42, 140, 130, 0.3);
    border-color: var(--accent-color2);
    transform: rotate(90deg);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(6, 20, 25, 0.8);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.dark-modal {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.95) 0%, rgba(15, 39, 39, 0.95) 100%);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    width: 500px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
}

.modal-header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.modal-header h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--light-color1);
}

.close-btn {
    width: 35px;
    height: 35px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 10px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.modal-content {
    padding: 25px;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 10px;
}

.dark-input {
    width: 100%;
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 14px;
    padding: 14px 18px;
    color: var(--light-color1);
    font-size: 1rem;
    transition: all 0.3s ease;
}

.dark-input:focus {
    border-color: var(--accent-color2);
    outline: none;
}

.icon-selector, .color-selector {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.icon-option {
    width: 45px;
    height: 45px;
    background: rgba(15, 39, 39, 0.6);
    border: 2px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem;
}

.icon-option:hover {
    border-color: rgba(106, 196, 166, 0.4);
    color: var(--light-color1);
}

.icon-option.selected {
    border-color: var(--accent-color2);
    background: rgba(42, 140, 130, 0.2);
    color: var(--accent-color3);
}

.color-option {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.selected {
    border-color: white;
    box-shadow: 0 0 0 3px var(--accent-color2);
}

.modal-actions {
    padding: 20px 25px 25px;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
}

.action-btn {
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
}

.action-btn.secondary {
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    color: var(--light-color2);
}

.action-btn.secondary:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.action-btn.primary {
    background: var(--gradient-green);
    border: none;
    color: white;
}

.action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(42, 140, 130, 0.4);
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsive */
@media (max-width: 1200px) {
    .actions-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }
}

@media (max-width: 768px) {
    .actions-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .suggestions-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .actions-grid {
        grid-template-columns: 1fr;
    }

    .action-item {
        min-height: 120px;
    }

    .modal-content {
        padding: 20px;
    }

    .icon-selector, .color-selector {
        justify-content: center;
    }
}
</style>
