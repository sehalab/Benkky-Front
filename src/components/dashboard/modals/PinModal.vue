<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="pin-modal dark-modal">
            <!-- Modal Header -->
            <div class="modal-header">
                <div class="header-icon">
                    <i class="fa-solid fa-lock"></i>
                </div>
                <div class="header-content">
                    <h3>Vérification du PIN</h3>
                    <p>Entrez votre code PIN à 4 chiffres</p>
                </div>
                <button class="close-btn" @click="$emit('close')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>

            <!-- PIN Display -->
            <div class="pin-display">
                <div v-for="(digit, index) in 4" :key="index" class="pin-digit">
                    <span v-if="pinInput.length > index">•</span>
                    <span v-else class="digit-placeholder"></span>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-message">
                <i class="fa-solid fa-circle-exclamation"></i>
                {{ error }}
            </div>

            <!-- Keypad -->
            <div class="keypad">
                <div class="keypad-row">
                    <button v-for="n in 3" :key="n" class="keypad-btn" @click="addDigit(n)">
                        {{ n }}
                    </button>
                </div>
                <div class="keypad-row">
                    <button v-for="n in 3" :key="n+3" class="keypad-btn" @click="addDigit(n+3)">
                        {{ n+3 }}
                    </button>
                </div>
                <div class="keypad-row">
                    <button v-for="n in 3" :key="n+6" class="keypad-btn" @click="addDigit(n+6)">
                        {{ n+6 }}
                    </button>
                </div>
                <div class="keypad-row">
                    <button class="keypad-btn clear-btn" @click="clearDigit">
                        <i class="fa-solid fa-delete-left"></i>
                    </button>
                    <button class="keypad-btn" @click="addDigit(0)">0</button>
                    <button class="keypad-btn submit-btn" @click="submitPin" :disabled="pinInput.length !== 4">
                        <i class="fa-solid fa-check"></i>
                    </button>
                </div>
            </div>

            <!-- Footer -->
            <div class="modal-footer">
                <button class="footer-link" @click="forgotPin">
                    <i class="fa-solid fa-key"></i>
                    Code PIN oublié ?
                </button>
            </div>

            <!-- Security Badge -->
            <div class="security-badge">
                <i class="fa-solid fa-shield-check"></i>
                <span>Transaction sécurisée</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'pin-verified']);

const pinInput = ref('');
const error = ref('');

const addDigit = (digit) => {
    if (pinInput.value.length < 4) {
        pinInput.value += digit.toString();
        error.value = '';
    }
};

const clearDigit = () => {
    if (pinInput.value.length > 0) {
        pinInput.value = pinInput.value.slice(0, -1);
    }
};

const submitPin = async () => {
    if (pinInput.value.length !== 4) {
        error.value = 'Veuillez entrer 4 chiffres';
        return;
    }

    try {
        // In real app, validate with backend
        const isValid = await validatePin(pinInput.value);

        if (isValid) {
            emit('pin-verified', { pin: pinInput.value });
            emit('close');
        } else {
            error.value = 'Code PIN incorrect';
            pinInput.value = '';
            // Optional: Add attempt counter and lockout
        }
    } catch (err) {
        error.value = 'Erreur de vérification';
    }
};

const validatePin = async (pin) => {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            // In real app, this would be an API call
            resolve(pin === '1234'); // Demo PIN
        }, 500);
    });
};

const forgotPin = () => {
    // Handle forgot PIN logic
    alert('Veuillez contacter le support pour réinitialiser votre PIN');
};
</script>

<style scoped>
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

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.dark-modal {
    background: linear-gradient(135deg, rgba(6, 20, 25, 0.95) 0%, rgba(15, 39, 39, 0.95) 100%);
    border: 1px solid rgba(106, 196, 166, 0.3);
    border-radius: 24px;
    width: 400px;
    max-width: 90%;
    overflow: hidden;
    animation: slideUp 0.3s ease;
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

.modal-header {
    padding: 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid rgba(106, 196, 166, 0.1);
}

.header-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-green);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.8rem;
}

.header-content {
    flex: 1;
}

.header-content h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--light-color1);
    margin-bottom: 5px;
}

.header-content p {
    font-size: 0.95rem;
    color: var(--light-color2);
}

.close-btn {
    width: 40px;
    height: 40px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 12px;
    color: var(--light-color2);
    cursor: pointer;
    transition: all 0.3s ease;
}

.close-btn:hover {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    color: var(--light-color1);
}

.pin-display {
    padding: 40px 30px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.pin-digit {
    width: 70px;
    height: 70px;
    border: 2px solid rgba(106, 196, 166, 0.3);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--accent-color3);
    transition: all 0.3s ease;
}

.pin-digit span {
    animation: fadeInDigit 0.2s ease;
}

@keyframes fadeInDigit {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.digit-placeholder {
    width: 20px;
    height: 20px;
    background: rgba(106, 196, 166, 0.2);
    border-radius: 50%;
}

.error-message {
    text-align: center;
    color: #F44336;
    font-size: 0.9rem;
    padding: 0 30px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    animation: shake 0.5s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.keypad {
    padding: 0 30px 30px;
}

.keypad-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
}

.keypad-btn {
    flex: 1;
    max-width: 80px;
    height: 80px;
    background: rgba(15, 39, 39, 0.6);
    border: 1px solid rgba(106, 196, 166, 0.2);
    border-radius: 20px;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--light-color1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.keypad-btn:hover:not(:disabled) {
    background: rgba(26, 65, 55, 0.8);
    border-color: var(--accent-color2);
    transform: translateY(-3px);
}

.keypad-btn:active:not(:disabled) {
    transform: translateY(-1px);
}

.keypad-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.clear-btn {
    font-size: 1.5rem;
    color: #F44336;
}

.submit-btn {
    background: var(--gradient-green);
    color: white;
    border: none;
    font-size: 1.5rem;
}

.submit-btn:not(:disabled):hover {
    box-shadow: 0 5px 20px rgba(42, 140, 130, 0.4);
}

.modal-footer {
    padding: 20px 30px;
    border-top: 1px solid rgba(106, 196, 166, 0.1);
    text-align: center;
}

.footer-link {
    background: none;
    border: none;
    color: var(--accent-color3);
    font-size: 0.9rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.footer-link:hover {
    color: var(--accent-color1);
    gap: 12px;
}

.security-badge {
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: var(--light-color2);
    opacity: 0.7;
}
</style>
