<template>
    <div class="mx-6 flex flex-column justify-content-center">
        <div class="text-center mt-2 text-lg font-semibold text-primary">
            Введите вашу почту
        </div>
        <p-input-text
            v-model="email"
            class="border-round-md text-700 hover:text-900 mt-4 mb-2"
            placeholder="почта"
            maxlength="128"
        ></p-input-text>
        <div class="w-full text-center my-5">
            <p-button
                class="border-round-3xl w-6"
                style="
                    background-color: rgba(16, 20, 26, 0.6);
                    border-color: #707276;
                    padding: 0.3rem 1rem;
                "
                label="продолжить"
                @click="sendMsg"
            ></p-button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '@/store/Auth.js';
export default {
    name: 'EmailSendingInput',
    emits: ['send'],
    methods: {
        ...mapActions(useAuthStore, ['sendEmailMsg']),
        sendMsg() {
            this.$emit('send');
            this.sendEmailMsg(this.email);
        },
    },
};
</script>

<style scoped>
.error-hidden {
    visibility: hidden;
}
</style>
