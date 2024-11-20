<template>
    <div class="container ml-3 mt-3 mr-8">
        <div class="title">Популярные люди</div>
        <div
            v-for="(user, index) in topUsers.slice(0, 2)"
            :key="index"
            class="user_container flex m-2"
            @click="goToUserPage(user.user_id)"
        >
            <p-avatar
                id="avatar"
                :image="getUserImage(user.profile_image_id)"
                class="align-content-center user_avatar"
                size="large"
                shape="circle"
                style="background-color: #b9b9b9"
            >
            </p-avatar>
            <div class="flex flex-column ml-3 justify-content-around">
                <span
                    v-if="user.display_name.length < 19"
                    class="display_name"
                    >{{ user.display_name }}
                </span>
                <span
                    v-else
                    class="display_name"
                    >{{ user.display_name.slice(0, 16) }}...
                </span>
                <span
                    v-if="user.user_name.length < 19"
                    class="username"
                >
                    @{{ user.user_name }}
                </span>
                <span
                    v-else
                    class="username"
                >
                    @{{ user.user_name.slice(0, 16) }}...
                </span>
            </div>
        </div>
        <button
            class="m-2 show_more_button"
            @click="showMore"
        >
            Показать больше
        </button>
    </div>
    <p-dialog
        v-model:visible="showTopUsers"
        :draggable="false"
        modal
        style="width: 50rem; height: 50rem"
        :pt="{
            header: { class: 'p-2' },
            content: { style: { padding: '0 1.5rem 0 1.5rem' } },
        }"
    >
        <template #header>
            <div
                class="text-center w-full my-2"
                style="font-size: 20px; font-weight: 700; color: #000000"
            >
                Популярные люди
            </div>
        </template>
        <div
            v-for="(user, index) in topUsers"
            :key="index"
            class="user_container flex m-2 justify-content-around"
        >
            <div
                class="flex"
                @click="goToUserPage(user.user_id)"
            >
                <p-avatar
                    id="avatar"
                    :image="getUserImage(user.profile_image_id)"
                    class="align-content-center user_avatar"
                    size="large"
                    shape="circle"
                    style="background-color: #b9b9b9"
                >
                </p-avatar>
                <div
                    class="flex flex-column ml-3 justify-content-around"
                    style="width: 150px"
                >
                    <span
                        v-if="user.display_name.length < 19"
                        class="display_name mr-3"
                        >{{ user.display_name }}
                    </span>
                    <span
                        v-else
                        class="display_name"
                        >{{ user.display_name.slice(0, 16) }}...
                    </span>
                    <span
                        v-if="user.user_name.length < 19"
                        class="username"
                    >
                        @{{ user.user_name }}
                    </span>
                    <span
                        v-else
                        class="username"
                    >
                        @{{ user.user_name.slice(0, 16) }}...
                    </span>
                </div>
            </div>
            <span style="width: 150px">
                <span class="username">Подписчики: </span>
                <span
                    :id="'counter_' + user.user_id"
                    class="display_name"
                    >{{ user.subscribers_count }}
                </span>
            </span>
            <p-button
                v-if="!user.isBanned || this.localUser.areYouSubscribeToUser"
                :id="'button_' + user.user_id"
                class="border-round-3xl"
                text
                style="
                    border-color: rgba(45, 101, 87, 1);
                    color: rgba(45, 101, 87, 1);
                "
                :style="btnActionStyle"
                :label="profilBtnText(user)"
                @click="userAction(user)"
            ></p-button>
        </div>
    </p-dialog>
</template>
<script>
import api from '@/api';
import { useUserStore } from '@/store/User.js';
import { useAuthStore } from '@/store/Auth.js';
import { mapActions } from 'pinia';
export default {
    name: 'TopPosts',
    data() {
        return {
            showTopUsers: false,
            topUsers: [],
        };
    },
    methods: {
        ...mapActions(useUserStore, [
            'getTopUsers',
            'setUser',
            'getUserData',
            'subscribeUser',
        ]),
        ...mapActions(useAuthStore, [
            'addNewSubscription',
            'deleteSubscription',
        ]),
        async uploadTopUsers() {
            this.topUsers = await this.getTopUsers('10');
        },
        getUserImage(userImageId = null) {
            return userImageId
                ? api.getImage + userImageId
                : 'images/avatar.svg';
        },
        async showMore() {
            this.showTopUsers = true;
        },
        goToUserPage(userId) {
            const user = this.getUserData(userId);
            this.setUser(user);
            this.$router.push('/pages/' + userId + '/profile/base');
        },
        profilBtnText(user) {
            return user?.are_you_subscribed_to_user
                ? 'Отписаться'
                : 'Подписаться';
        },
        async userAction(user) {
            const data = await this.subscribeUser(user?.user_id);
            if (data.result) {
                const counter = document.getElementById(
                    'counter_' + user.user_id
                );
                const button = document.getElementById(
                    'button_' + user.user_id
                );
                user.areYouSubscribeToUser = data.isSubscribed;
                if (data.isSubscribed) {
                    user.subscribersCount += 1;
                    counter.textContent = parseInt(counter.textContent) + 1;
                    this.addNewSubscription();
                    button.textContent = 'Отписаться';
                } else {
                    user.subscribersCount -= 1;
                    counter.textContent = parseInt(counter.textContent) - 1;
                    this.deleteSubscription();
                    button.textContent = 'Подписаться';
                }
            }
        },
        btnActionStyle() {
            const width = this.isSubscription ? 'width: 155px; ' : '';
            const padding = this.isSubscription
                ? 'padding: 0.3rem 1rem;'
                : 'padding: 0.55rem 1rem;';
            return width + padding;
        },
    },
    mounted() {
        this.uploadTopUsers();
    },
};
</script>
<style scoped>
.container {
    background: rgba(247, 249, 250, 1);
}
.display_name {
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: rgba(15, 20, 25, 1);
}
.username {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.36px;
    letter-spacing: -0.017em;
    text-align: left;
    color: rgba(91, 112, 131, 1);
}
.show_more_button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font: inherit;
    font-family: Inter;
    font-size: 15px;
    font-weight: 500;
    line-height: 18.15px;
    text-align: left;
    color: rgba(45, 101, 87, 1);
}
.user_container {
    /* cursor: pointer; */
    margin-bottom: 15px;
}
.user_avatar {
    min-width: 3rem;
    min-height: 3rem;
}
.title {
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    line-height: 24.2px;
    text-align: left;
    color: rgba(15, 20, 25, 1);
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>
