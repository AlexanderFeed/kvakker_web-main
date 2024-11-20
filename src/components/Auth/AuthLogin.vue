<template>
    <div class="flex flex-column gap-4 justify-content-center mx-5">
        <small
            class="p-error text-center font-semibold"
            :class="{ 'error-hidden': !isError }"
            style="margin-bottom: -10px"
        >
            {{ this.errorText }}
        </small>
        <p-input-text
            id="username"
            v-model="login"
            class="border-round-md text-700 hover:text-900"
            placeholder="логин/почта"
            maxlength="128"
            :invalid="!login && tryLogin"
        ></p-input-text>

        <p-input-text
            id="password"
            v-model="password"
            type="password"
            placeholder="пароль"
            class="border-round-md text-700 hover:text-900"
            maxlength="128"
            :invalid="!password && tryLogin"
        ></p-input-text>

        <div class="w-full text-center">
            <p-button
                class="border-round-3xl w-6"
                style="
                    background-color: rgba(16, 20, 26, 0.6);
                    border-color: #707276;
                    padding: 0.3rem 1rem;
                "
                label="войти"
                @click="loginUser"
            ></p-button>
            <div class="mt-2 flex flex-column mb-3">
                <p-button
                    link
                    label="зарегистрироваться"
                    class="text-sm"
                    style="padding: 0.3rem 1rem; color: #2d6557"
                    @click="goToReg"
                ></p-button>
                <p-button
                    link
                    label="забыли пароль?"
                    class="text-sm"
                    style="padding: 0.3rem 1rem; color: #2d6557"
                    @click="changePassword"
                ></p-button>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/Auth';
import { mapState, mapActions } from 'pinia';
export default {
    name: 'AuthLogin',
    data() {
        return {
            isError: false,
            errorText: '',
            login: null,
            password: null,
            tryLogin: false,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['userLogin']),
        goToReg() {
            this.$router.push('/registration');
        },
        changePassword() {
            this.$router.push('/reset');
        },
        async loginUser() {
            this.tryLogin = true;
            if (this.login && this.password) {
                await this.userLogin(this.login, this.password);
                if (!this.user) {
                    this.isError = true;
                    this.errorText = 'Неверный логин и/или пароль';
                } else if (this.user.isBanned) {
                    this.isError = true;
                    this.errorText =
                        'Ваш аккаунт был заблокирован из-за нарушений правил сообщества';
                } else {
                    this.$router.push('/pages/' + this.user.userId + '/feed');
                }
            }
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
    },
};
</script>

<style scoped>
.error-hidden {
    visibility: hidden;
}
</style>
