<template>
    <div class="flex justify-content-between align-items-center">
        <div class="flex align-items-center gap-2">
            <p-avatar
                id="avatar"
                :image="avatarImage"
                class="align-content-center"
                :size="getSizeAvatar"
                shape="circle"
                style="background-color: #b9b9b9"
            >
            </p-avatar>
            <div class="flex flex-column gap-1">
                <div class="flex align-items-center">
                    <p-button
                        link
                        class="font-bold p-0"
                        style="color: rgba(15, 20, 25, 1)"
                        :style="fontName"
                        @click="clickUserName"
                    >
                        {{ localUser?.displayName }}
                    </p-button>
                    <div
                        v-if="!isMyProfil && showComplaint"
                        class="flex-column justify-content-center"
                    >
                        <div class="flex justify-content-center">
                            <p-button
                                icon="pi pi-ellipsis-v"
                                class="border-round-3xl p-0"
                                text
                                aria-haspopup="true"
                                aria-controls="overlay_menu"
                                @click="toggle"
                            >
                            </p-button>
                        </div>
                        <p-menu
                            id="overlay_menu"
                            ref="menu"
                            :model="menu"
                            :popup="true"
                            :pt="{
                                content: {
                                    style: {
                                        'font-size': '15px',
                                    },
                                },
                            }"
                        ></p-menu>
                    </div>
                </div>

                <div
                    class="font-light"
                    style="color: rgba(91, 112, 131, 1); font-size: 16px"
                >
                    {{ '@' + localUser?.userName }}
                </div>
            </div>
        </div>
        <div
            v-if="isBanned"
            class="blocked_user_alert"
        >
            Пользователь забанен из-за<br />
            нарушений правил платформы
        </div>
        <p-button
            v-if="
                (!isMyProfil || !isSubscription) &&
                (!isBanned || this.localUser.areYouSubscribeToUser)
            "
            class="border-round-3xl"
            text
            style="
                border-color: rgba(45, 101, 87, 1);
                color: rgba(45, 101, 87, 1);
            "
            :style="btnActionStyle"
            :label="profilBtnText"
            @click="userAction"
        ></p-button>
    </div>
    <p-dialog
        v-model:visible="openDialog"
        :draggable="false"
        modal
        style="width: 30rem; height: 21.5rem"
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
                Жалоба
            </div>
        </template>
        <new-post-body
            :text-area-placeholder="'Что, по вашему мнению, нарушил пользователь?'"
            :hidden-image="true"
            :is-complaint="true"
            @send-complaint="sendUserComplaint"
        >
        </new-post-body>
    </p-dialog>
</template>
<script>
//import UserData from '@/model/Auth/UserData.js';
import OtherUserData from '@/model/Auth/OtherUserData.js';
import NewPostBody from './Posts/NewPostBody.vue';
import { useAuthStore } from '@/store/Auth.js';
import { mapState, mapActions } from 'pinia';
import api from '@/api';
import { useUserStore } from '@/store/User';
import UserData from '@/model/Auth/UserData';
export default {
    name: 'ProfilName',
    emits: ['goUserProfil'],
    components: {
        NewPostBody,
    },
    props: {
        userInfo: { OtherUserData, UserData },
        isSubscription: Boolean,
        showComplaint: Boolean,
    },
    data() {
        return {
            localUser: this.userInfo,
            openDialog: false,
            menu: [
                {
                    label: 'Пожаловаться',
                    icon: 'pi pi-user-minus',
                    command: () => {
                        this.openDialogComplaint();
                    },
                },
            ],
        };
    },
    methods: {
        ...mapActions(useUserStore, [
            'subscribeUser',
            'setUser',
            'userComplaint',
        ]),
        ...mapActions(useAuthStore, [
            'addNewSubscription',
            'deleteSubscription',
        ]),
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        async userAction() {
            //переходим на настройки пользователя
            if (this.isMyProfil) {
                this.$router.push(
                    '/pages/' + this.$route.params.userId + '/settings'
                );
            }
            //подписаться для пользователя
            else {
                const data = await this.subscribeUser(this.localUser?.userId);
                if (data.result) {
                    this.localUser.areYouSubscribeToUser = data.isSubscribed;
                    if (data.isSubscribed) {
                        this.localUser.subscribersCount += 1;
                        this.addNewSubscription();
                    } else {
                        this.localUser.subscribersCount -= 1;
                        this.deleteSubscription();
                    }
                }
            }
        },
        async clickUserName() {
            if (this.localUser?.userId !== Number(this.$route.params.userId))
                await this.setUser(this.localUser);
            this.$router.push(
                '/pages/' + this.localUser?.userId + '/profile/base'
            );
        },
        openDialogComplaint() {
            this.openDialog = true;
        },
        async sendUserComplaint(text) {
            await this.userComplaint(this.localUser?.userId, text);
            this.openDialog = false;
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        profilBtnText() {
            if (this.isMyProfil) return 'Изменить профиль';
            return this.localUser?.areYouSubscribeToUser
                ? 'Отписаться'
                : 'Подписаться';
        },
        isMyProfil() {
            return this.user?.userName === this.localUser?.userName;
        },
        isBanned() {
            return this.localUser?.isBanned;
        },
        avatarImage() {
            return this.localUser?.profileImageId
                ? api.getImage + this.localUser.profileImageId
                : 'images/avatar.svg';
        },
        getSizeAvatar() {
            return this.isSubscription ? 'large' : 'xlarge';
        },
        fontName() {
            return !this.isSubscription ? 'font-size: 21px' : 'font-size: 16px';
        },
        btnActionStyle() {
            const width = this.isSubscription ? 'width: 155px; ' : '';
            const padding = this.isSubscription
                ? 'padding: 0.3rem 1rem;'
                : 'padding: 0.55rem 1rem;';
            return width + padding;
        },
    },
    beforeUpdate() {
        this.localUser = this.userInfo;
    },
};
</script>
<style scoped>
.blocked_user_alert {
    border: 1px solid rgb(255, 164, 255);
    padding: 8px;
    border-radius: 8px;
    color: rgb(91, 112, 131);
    margin-left: 5px;
}
</style>
