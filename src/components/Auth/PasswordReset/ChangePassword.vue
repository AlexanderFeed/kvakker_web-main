<template>
    <div class="flex flex-column gap-5 justify-content-center mx-5 mt-4">
        <h2 class="m-auto">Изменение пароля</h2>
        <p-input-text
            v-model="password"
            type="password"
            placeholder="пароль"
            class="border-round-md text-700 hover:text-900 mt-3"
            maxlength="128"
        >
        </p-input-text>
        <div>
            <div
                :style="{
                    visibility: this.isGood ? 'hidden' : 'visible',
                }"
            >
                <small class="p-error text-center font-semibold">
                    Пароли не совпадают. Пароль не меньше 6 символов, должны
                    быть цифры, также строчные и заглавные буквы
                </small>
            </div>
            <p-input-text
                v-model="passwordConf"
                type="password"
                placeholder="подтвердите пароль"
                class="border-round-md text-700 hover:text-900 w-full"
                maxlength="128"
            ></p-input-text>
        </div>

        <div class="w-full text-center my-3 pb-3">
            <p-button
                class="border-round-3xl"
                style="
                    background-color: rgba(16, 20, 26, 0.6);
                    border-color: #707276;
                    padding: 0.3rem 1rem;
                "
                label="подтвердить"
                @click="newPass()"
            ></p-button>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'pinia';
import { useAuthStore } from '@/store/Auth.js';
export default {
    name: 'ChangePassword',
    data() {
        return {
            isGood: true,
            userToken: null,
            userMail: null,
            userId: null,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['setResetedPassword']),
        newPass() {
            let temp = this.setResetedPassword(
                this.userId,
                this.password,
                this.userToken
            );
            if (
                temp &&
                this.password === this.passwordConf &&
                this.isValidData(this.password, this.passwordConf)
            ) {
                this.isGood = true;
                this.$router.push('/login');
            } else {
                this.isGood = false;
            }
        },
        isValidData(password, confirmPassword) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
            if (password) {
                this.passwordIsValid = passwordRegex.test(password);
                this.confirmPasswordIsValid = password === confirmPassword;
            }
            return this.passwordIsValid && this.confirmPasswordIsValid;
        },
    },
    mounted() {
        if (this.$route.fullPath != '/reset/change') {
            let temp = this.$route.fullPath
                .split('/')
                .slice(-1)
                .toString()
                .split('&');
            this.userId = temp[0].split('=')[1];
            this.userToken = temp[1].split('=')[1];
            this.$router.push('/reset/change');
        }
        if (this.userId === null) {
            this.$router.push('/login');
        }
    },
};
</script>
