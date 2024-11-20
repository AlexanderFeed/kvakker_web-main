import { defineStore } from 'pinia';
//import UserData from '@/model/Auth/UserData.js';
import api from '@/api';
import UserData from '@/model/Auth/UserData.js';
import { fetchWithInterceptors } from '@/utils/Interceptor.js';

export const useAuthStore = defineStore('Auth', {
    state: () => ({
        /**Данные пользователя
         * @type {UserData}
         */
        user: null,
    }),
    getters: {
        getUserImage() {
            return api.getImage + this.user?.profileImageId;
        },
    },
    actions: {
        /**Получение пользователя по логину и паролю
         * @param {string} login
         * @param {string} password
         */
        async userLogin(login, password) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            };

            const response = await fetch(api.authLogin, options);

            if (response.ok) {
                const data = await response.json();
                this.user = new UserData(data);
                if (!this.user.isBanned) {
                    this.setToken();
                }
            }
        },

        /**Загрузка нового изображения для аватара
         * @param {string} imageBlob
         * @returns {string}
         */
        async uploadImage(imageBlob) {
            const formData = new FormData();
            formData.append('file', imageBlob);

            const options = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(api.uploadImage, options);
            if (response.ok) {
                const data = await response.json();
                return data.image_id;
            }
            return null;
        },

        /**Регистрация нового пользователя
         * @param {Object} userData
         * @param {string} userData.userName
         * @param {string} userData.displayName
         * @param {string} userData.password
         * @param {string} userData.email
         * @param {string} userData.image
         * @returns {boolean}
         */
        async registration(userData) {
            const payload = {
                user_name: userData.userName,
                display_name: userData.displayName,
                password: userData.password,
                email: userData.email,
                profile_image_id: userData.image,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };

            const response = await fetch(api.registration, options);

            if (response.ok) {
                const data = await response.json();
                this.user = new UserData(data);
                this.setToken();
            }
            return response;
        },
        /**Установить токены */
        setToken() {
            localStorage.clear();
            localStorage.setItem('accesstoken', this.user.accessToken);
            localStorage.setItem('refreshtoken', this.user.refreshToken);
        },

        /**Get запрос по пользователю
         * @returns {boolean}
         */
        async getCredent() {
            const options = {
                method: 'GET',
            };
            const response = await fetchWithInterceptors(
                api.credentByToken,
                options
            );
            if (response.ok) {
                const data = await response.json();
                if (data.isBanned) {
                    localStorage.removeItem('accesstoken');
                    localStorage.removeItem('refreshtoken');
                } else {
                    this.user = new UserData(data);
                }
            }
        },
        /**Увеличить количество подписок у юзера */
        addNewSubscription() {
            this.user.subscriptionsCount += 1;
        },
        /**Уменьшить количество подписок у юзера на 1 */
        deleteSubscription() {
            this.user.subscriptionsCount -= 1;
        },
        /**Изменение профиля пользователя
         * @param {string} email
         * @param {string} password
         * @param {string} displayName
         * @param {string} profileImageId
         */
        async putSelfInfo(email, password, displayName, profileImageId) {
            let payload = {
                email: email,
                display_name: displayName,
                profile_image_id: profileImageId,
            };
            if (password) {
                payload.password = password;
            }
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };
            let response = await fetchWithInterceptors(
                api.credentByToken,
                options
            );
            return response;
        },

        async clearUser() {
            this.user = null;
        },
        sendEmailMsg(mail) {
            const payload = {
                email: mail,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };

            const response = fetch(api.sendMsgRes, options);
            if (response.ok) {
                return response;
            }
        },
        async setResetedPassword(userId, newPass, userToken) {
            const payload = {
                user_id: userId,
                new_password: newPass,
                token: userToken,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };
            const response = await fetch(api.doReset, options);
            return response.ok ? true : false;
        },
    },
});
