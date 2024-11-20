<template>
    <div class="text-center mt-2 text-lg font-semibold text-primary">
        Создайте учетную запись
    </div>
    <div class="flex flex-column justify-content-center mx-5 mt-5">
        <div v-if="step === 1">
            <previous-page-link
                style="position: absolute; top: 110px"
            ></previous-page-link>
            <small
                class="p-error text-center font-semibold text-xs"
                :class="{
                    'error-hidden': !(tryGoNext && !isEmailValid),
                }"
            >
                Некорректный email
            </small>
            <p-input-text
                v-model="userData.email"
                class="border-round-md text-700 hover:text-900 w-full"
                placeholder="почта"
                type="email"
                maxlength="128"
                :invalid="!userData.email && tryGoNext"
            ></p-input-text>
            <div class="mt-1">
                <small
                    class="p-error text-center font-semibold text-xs"
                    :class="{
                        'error-hidden': !(tryGoNext && !passwordCorrect),
                    }"
                >
                    Пароль не меньше 6 символов, должны быть цифры, также
                    строчные и заглавные буквы
                </small>
                <p-input-text
                    id="password"
                    v-model="userData.password"
                    type="password"
                    placeholder="пароль"
                    class="border-round-md text-700 hover:text-900 w-full"
                    :invalid="!passwordCorrect && tryGoNext"
                    maxlength="128"
                ></p-input-text>
            </div>

            <div class="mt-4">
                <div>
                    <small
                        class="p-error text-center font-semibold"
                        :class="{ 'error-hidden': !errorPassword }"
                    >
                        Пароли не совпадают
                    </small>
                </div>
                <p-input-text
                    id="password conf"
                    v-model="userData.passwordRep"
                    :invalid="!userData.passwordRep && tryGoNext"
                    type="password"
                    placeholder="подтвердите пароль"
                    class="border-round-md text-700 hover:text-900 w-full"
                    maxlength="128"
                ></p-input-text>
            </div>

            <div class="w-full text-center mb-4 my-5">
                <p-button
                    class="border-round-3xl"
                    style="
                        background-color: rgba(16, 20, 26, 0.6);
                        border-color: #707276;
                        padding: 0.3rem 2rem;
                    "
                    label="продолжить"
                    @click="goNextStep"
                ></p-button>
            </div>
        </div>

        <div v-if="step === 2">
            <p-button
                style="
                    border: none;
                    background-color: inherit;
                    color: #44474b99;
                    position: absolute;
                    top: 110px;
                "
                label="<назад"
                @click="step--, (tryGoNext = false)"
            ></p-button>
            <div class="flex justify-content-center">
                <p-avatar
                    id="avatar"
                    :image="avatarImage"
                    class="align-content-center"
                    size="xlarge"
                    shape="circle"
                    style="background-color: #b9b9b9"
                >
                </p-avatar>
            </div>
            <div class="w-full my-2 flex justify-content-center">
                <p-file-upload
                    mode="basic"
                    accept=".jpg"
                    :max-file-size="4194304"
                    :auto="true"
                    style="
                        border: none;
                        background-color: inherit;
                        color: #707276;
                        font-size: 12px;
                        padding: 0.5rem 0.2rem;
                    "
                    color="secondary"
                    choose-label="выберите фото"
                    custom-upload
                    invalid-file-size-message="Размер файла превышает 4Мб"
                    invalid-file-type-message="Недопустимый формат"
                    :pt="{
                        root: {
                            class: 'flex justify-content-center flex-column',
                        },
                        chooseButton: {
                            class: 'flex justify-content-center align-items-center',
                            style: { 'align-self': 'center' },
                        },
                    }"
                    @uploader="setImage"
                >
                </p-file-upload>
                <p-button
                    v-if="imageAvatar"
                    style="color: #707276; font-size: 12px"
                    icon="pi pi-times"
                    text
                    @click="clearImage"
                ></p-button>
            </div>
            <div>
                <small
                    class="p-error text-center font-semibold"
                    :class="{
                        'error-hidden': !(
                            tryRegister && userData.displayName.length < 3
                        ),
                    }"
                >
                    Слишком короткое имя
                </small>
                <p-input-text
                    id="name"
                    v-model="userData.displayName"
                    class="border-round-md text-700 hover:text-900 w-full"
                    placeholder="ваше имя"
                    maxlength="64"
                    :invalid="!userData.displayName && tryRegister"
                ></p-input-text>
            </div>

            <div class="mt-3">
                <small
                    class="p-error text-center font-semibold"
                    :class="{
                        'error-hidden': !(
                            tryRegister && userData.userName.length < 3
                        ),
                    }"
                >
                    Слишком короткий никнейм
                </small>
                <p-input-text
                    id="nickname"
                    v-model="userData.userName"
                    placeholder="никнейм"
                    class="border-round-md text-700 hover:text-900 w-full"
                    maxlength="64"
                    :invalid="!userData.userName && tryRegister"
                ></p-input-text>
            </div>

            <div class="w-full text-center mb-5 mt-6">
                <div>
                    <small
                        class="p-error text-center font-semibold"
                        :class="{ 'error-hidden': !dataError }"
                    >
                        {{ dataError }}
                    </small>
                </div>
                <p-button
                    class="border-round-3xl"
                    style="
                        background-color: rgba(16, 20, 26, 0.6);
                        border-color: #707276;
                        padding: 0.3rem 1rem;
                    "
                    label="зарегистрироваться"
                    @click="registerUser"
                ></p-button>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/Auth.js';
import { mapActions, mapState } from 'pinia';
import PreviousPageLink from './PreviousPageLink.vue';
export default {
    name: 'RegNew',
    components: {
        PreviousPageLink,
    },
    data() {
        return {
            step: 1,
            errorPassword: false,
            imageAvatar: '',
            userData: {
                email: '',
                userName: '',
                displayName: '',
                password: '',
                passwordRep: '',
                image: null,
            },
            tryGoNext: false,
            tryRegister: false,
            dataError: '',
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['uploadImage', 'registration']),
        setImage(event) {
            const file = event.files[0];
            this.imageAvatar = file.objectURL;
        },
        async uploadImageAvatar() {
            let blob = await fetch(this.imageAvatar).then((r) => r.blob());
            this.userData.image = await this.uploadImage(blob);
        },
        goNextStep() {
            this.tryGoNext = true;
            if (this.passwordCorrect && this.isEmailValid) {
                if (this.userData.password === this.userData.passwordRep) {
                    this.errorPassword = false;
                    this.step++;
                } else this.errorPassword = true;
            }
        },
        clearImage() {
            this.imageAvatar = '';
        },

        async registerUser() {
            this.tryRegister = true;
            if (
                this.userData.displayName.length > 2 &&
                this.userData.userName.length > 2
            ) {
                if (this.imageAvatar) await this.uploadImageAvatar();
                const result = await this.registration(this.userData);

                //если регистрация прошла успешно то все классно
                if (result.ok) {
                    this.$router.push('/pages/' + this.user.userId + '/feed');
                } else {
                    //а тут ищем причину почему не ок
                    const data = await result.json();

                    const details = data.detail;
                    if (details === 'This username is already taken')
                        this.dataError = 'Такой ник уже занят';
                    else if (details === 'User with this email already exists')
                        this.dataError =
                            'Пользователь с такой почтой уже существует';
                }
            }
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        avatarImage() {
            return this.imageAvatar ? this.imageAvatar : 'images/avatar.svg';
        },
        passwordCorrect() {
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
            return pattern.test(this.userData.password);
        },
        isEmailValid() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(this.userData.email);
        },
    },
};
</script>

<style>
.error-hidden {
    visibility: hidden;
}
.p-message .p-message-wrapper {
    padding: 0 0.5rem;
}
</style>
