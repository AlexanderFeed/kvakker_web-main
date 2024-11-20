<template>
    <div class="flex flex-column justify-content-center">
        <div
            class="flex flex-column justify-content-center align-items-center mt-4"
        >
            <div class="flex justify-content-center">
                <p-avatar
                    id="avatar"
                    :image="avatarImage"
                    class="align-content-center form__input"
                    size="xlarge"
                    shape="circle"
                    style="background-color: #b9b9b9; width: 6rem; height: 6rem"
                >
                </p-avatar>
            </div>
            <div class="w-full my-2 flex justify-content-center">
                <p-file-upload
                    id="avatar"
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
                    choose-label="сменить фото"
                    custom-upload
                    invalid-file-size-message="Размер файла превышает 4Мб"
                    invalid-file-type-message="Недопустимый формат"
                    @uploader="setImage"
                >
                </p-file-upload>
                <p-button
                    v-if="this.user.profileImageId"
                    style="color: #707276; font-size: 12px"
                    icon="pi pi-times"
                    text
                    @click="clearImage"
                ></p-button>
            </div>
        </div>
        <form
            id="form"
            action="#"
            method="put"
            class="ml-7"
        >
            <small
                class="p-error text-center font-semibold text-xs"
                :class="{
                    'error-hidden': this.emailIsValid,
                }"
            >
                Некорректный email
            </small>
            <input-with-icon
                id="email"
                class="form__input"
                label="Почта"
                :value="this.user.email"
            ></input-with-icon>
            <small
                class="p-error text-center font-semibold"
                :class="{
                    'error-hidden': this.displayNameIsValid,
                }"
            >
                Слишком короткое имя
            </small>
            <input-with-icon
                id="display_name"
                class="form__input"
                label="Имя пользователя"
                :value="this.user.displayName"
            ></input-with-icon>
            <small
                class="p-error text-center font-semibold text-xs"
                :class="{
                    'error-hidden': this.passwordIsValid,
                }"
            >
                Пароль не меньше 6 символов, должны быть цифры, также строчные и
                заглавные буквы
            </small>
            <div class="input_with_icon">
                <label
                    :for="id"
                    class="block mb-3"
                    style="color: #10141a99"
                >
                    Пароль
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Новый пароль"
                    value=""
                    class="mb-2"
                >
            </div>
            <small
                class="p-error text-center font-semibold"
                :class="{ 'error-hidden': this.confirmPasswordIsValid }"
            >
                Пароли не совпадают
            </small>
            <div class="input_with_icon">
                <input
                    id="confirm_password"
                    type="password"
                    placeholder="Подтвердите пароль"
                    value=""
                    class="mt-2 form__input"
                    style="display: none"
                >
            </div>
            <div class="flex align-items-center justify-content-end mt-7">
                <p-button
                    id="submit_button"
                    class="border-round-3xl p-disabled"
                    style="
                        background-color: #2d6557;
                        border-color: #2d6557;
                        padding: 0.3rem 1rem;
                        height: 3rem;
                        font-size: 15px;
                        width: 50%;
                    "
                    label="Сохранить изменения"
                    type="button"
                    @click="submit"
                >
                </p-button>
            </div>
        </form>
    </div>
    <PopupNotification
        id="valid_email_popup"
        text=" На вашу почту было отправлено письмо с подтверждением."
    ></PopupNotification>
    <PopupNotification
        id="not_valid_email_popup"
        text="Данная почта уже зарегистрирована. Проверьте введённые данные."
    ></PopupNotification>
</template>
<script>
import InputWithIcon from '@/components/InputWithIcon';
import PopupNotification from '@/components/PopupNotification';
import api from '@/api';
import { useAuthStore } from '@/store/Auth.js';
import { mapState, mapActions } from 'pinia';
export default {
    name: 'Settings',
    components: {
        InputWithIcon,
        PopupNotification,
    },
    data() {
        return {
            newUserData: {},
            imageAvatar: '',
            newAvatarId: '',
            emailIsValid: true,
            displayNameIsValid: true,
            passwordIsValid: true,
            confirmPasswordIsValid: true,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['uploadImage']),
        ...mapActions(useAuthStore, ['putSelfInfo']),
        async uploadImageAvatar() {
            let blob = await fetch(this.imageAvatar).then((r) => r.blob());
            this.newUserData.profileImageId = await this.uploadImage(blob);
        },
        async setImage(event) {
            const file = event.files[0];
            this.imageAvatar = file.objectURL;
            this.newAvatarId = this.imageAvatar;
            await this.uploadImageAvatar();
        },
        clearImage() {
            this.newUserData.profileImageId = '';
            this.newAvatarId = '';
        },
        async fetchUserData() {
            try {
                this.newUserData = Object.assign({}, this.user);
                this.newAvatarId = this.newUserData.profileImageId;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        submit() {
            const email = document.getElementById('email').value;
            const displayName = document.getElementById('display_name').value;
            const password = document.getElementById('password').value;
            const confirmPassword =
                document.getElementById('confirm_password').value;
            if (
                this.isValidData(email, password, displayName, confirmPassword)
            ) {
                this.sendNewUserData(email, password, displayName);
            }
        },
        isValidData(email, password, displayName, confirmPassword) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const displayNameRegex = /^.{3,}$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;

            this.emailIsValid = emailRegex.test(email);
            this.displayNameIsValid = displayNameRegex.test(displayName);
            if (password) {
                this.passwordIsValid = passwordRegex.test(password);
                this.confirmPasswordIsValid = password === confirmPassword;
            }
            return (
                this.emailIsValid &&
                this.displayNameIsValid &&
                this.passwordIsValid &&
                this.confirmPasswordIsValid
            );
        },
        async sendNewUserData(email, password, displayName) {
            try {
                let response = await this.putSelfInfo(
                    email,
                    password,
                    displayName,
                    this.newUserData.profileImageId
                );
                if (response.ok) {
                    if (email != this.user.email) {
                        this.showPopupNotification('valid_email_popup');
                    }
                    this.user.email = email;
                    this.user.displayName = displayName;
                    this.user.profileImageId = this.newUserData.profileImageId;
                    this.disableSubmitButton();
                } else {
                    this.showPopupNotification('not_valid_email_popup');
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }
        },
        addEvents() {
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput =
                document.getElementById('confirm_password');
            passwordInput.addEventListener('click', () => {
                if (
                    document.activeElement === passwordInput ||
                    passwordInput.value !== null
                ) {
                    confirmPasswordInput.style.display = 'inline';
                }
            });
            [passwordInput, confirmPasswordInput].forEach((input) => {
                input.addEventListener('click', () => {
                    input.classList.add('active_input');
                });
            });
            [passwordInput, confirmPasswordInput].forEach((input) => {
                input.addEventListener('blur', () => {
                    input.classList.remove('active_input');
                });
            });
        },
        disableSubmitButton() {
            document
                .getElementById('submit_button')
                .classList.add('p-disabled');
        },
        formHasChanges() {
            const inputs = document.querySelectorAll('.form__input');
            const submitButton = document.getElementById('submit_button');
            const email = document.getElementById('email').value;
            const displayName = document.getElementById('display_name').value;
            const password = document.getElementById('password').value;

            inputs.forEach((input) => {
                input.addEventListener('input', () => {
                    if (
                        this.user.email !== email ||
                        this.user.password !== password ||
                        this.user.displayName !== displayName ||
                        this.newUserData.profileImageId !==
                            this.user.profileImageId
                    ) {
                        submitButton.disabled = false;
                        submitButton.classList.remove('p-disabled');
                    } else {
                        this.disableSubmitButton();
                    }
                });
            });
        },
        showPopupNotification(popup_id) {
            const popup = document.getElementById(popup_id);
            popup.classList.add('open');
        },
    },
    watch: {
        newAvatarId(value) {
            let submitButton = document.getElementById('submit_button');
            if (value !== this.user.profileImageId) {
                submitButton.disabled = false;
                submitButton.classList.remove('p-disabled');
            }
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user', 'getUserImage']),
        avatarImage() {
            return this.newUserData?.profileImageId
                ? api.getImage + this.newUserData.profileImageId
                : 'images/avatar.svg';
        },
    },
    beforeMount() {
        this.fetchUserData();
    },
    mounted() {
        this.addEvents();
        this.formHasChanges();
    },
};
</script>

<style scoped>
.error-hidden {
    visibility: hidden;
}
</style>
