<template>
    <div
        id="notifications"
        class="flex flex-column gap-3 w-full"
        style="overflow: scroll; scrollbar-width: none"
    >
        <div
            v-for="notification in notifs"
            :key="notification"
        >
            <div class="flex">
                <div class="flex">
                    <p-avatar
                        id="avatar"
                        :image="avatarImage(notification.linkedUserObj)"
                        class="align-content-center"
                        size="large"
                        shape="circle"
                        style="background-color: #b9b9b9"
                    >
                    </p-avatar>
                    <div
                        class="flex align-items-center"
                        style="justify-content: start; max-width: 15rem"
                    >
                        <p-button
                            link
                            style="
                                color: #5b7083;
                                font-weight: 500;
                                padding: 0 0.5em 0 1em;
                            "
                            @click="
                                clickUserName(notification.linkedUserObj.userId)
                            "
                        >
                            @{{ notification.linkedUserObj?.userName }}
                        </p-button>
                    </div>
                </div>
                <div>
                    <div
                        v-if="
                            notification.notificationType === 'new_subscriber'
                        "
                        style="min-height: 3em"
                        class="flex align-items-center"
                    >
                        {{ notification.notificationText }}
                        {{ timeNotif(notification.notificationDatetime) }}
                    </div>
                    <div
                        v-if="
                            notification.notificationType === 'like' &&
                            (notification.linkedPostObj != null ||
                                notification.linkedCommentObj != null)
                        "
                        class="flex align-items-center"
                        style="min-height: 3em"
                    >
                        {{ notification.notificationText }}
                        <div
                            v-if="
                                notification.linkedPostObj != null &&
                                notification.notificationType === 'like'
                            "
                        >
                            <p-button
                                style="
                                    color: #2d6557;
                                    background-color: inherit;
                                    border: none;
                                    font-weight: 500;
                                    text-decoration: underline;
                                    padding: 0 0 0 0.5em;
                                "
                                @click="openPost(notification.linkedPostId)"
                            >
                                ваш квак
                            </p-button>
                        </div>
                        <div
                            v-if="
                                notification.linkedCommentObj != null &&
                                notification.notificationType === 'like'
                            "
                        >
                            <p-button
                                style="
                                    color: #2d6557;
                                    background-color: inherit;
                                    border: none;
                                    font-weight: 500;
                                    text-decoration: underline;
                                    padding: 0 0 0 0.5em;
                                "
                                @click="
                                    openComment(notification.linkedCommentId)
                                "
                            >
                                ваш квак
                            </p-button>
                        </div>
                        <svg
                            width="16"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5375 14.1855H7.527C5.58975 14.1495 0 9.099 0 4.3155C0 2.0175 1.89375 0 4.05225 0C5.76975 0 6.92475 1.185 7.53675 2.0475C8.14725 1.1865 9.30225 0 11.0205 0C13.1805 0 15.0735 2.0175 15.0735 4.31625C15.0735 9.09825 9.483 14.1487 7.54575 14.184H7.5375V14.1855Z"
                                fill="#2D6557"
                            />
                        </svg>

                        {{ timeNotif(notification.notificationDatetime) }}
                    </div>
                    <div
                        v-if="
                            notification.notificationType === 'comment' &&
                            notification.linkedPostObj != null
                        "
                        style="min-height: 3em"
                        class="flex flex-column justify-content-end"
                    >
                        <div class="flex align-items-center">
                            {{ notification.notificationText }}
                            <p-button
                                style="
                                    color: #2d6557;
                                    background-color: inherit;
                                    border: none;
                                    font-weight: 500;
                                    text-decoration: underline;
                                    padding: 0 0 0 0.5em;
                                "
                                @click="openPost(notification.linkedPostId)"
                            >
                                ваш квак
                            </p-button>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.53452 0.681328L6.42352 0.673828H6.42202C3.14152 0.673828 0.572021 3.24408 0.572021 6.52533C0.572021 9.59883 2.96152 11.9298 6.17077 12.0528V14.9238C6.17077 15.0048 6.20377 15.1383 6.26077 15.2261C6.36727 15.3948 6.54877 15.4863 6.73477 15.4863C6.83827 15.4863 6.94252 15.4578 7.03627 15.3978C7.23427 15.2718 11.891 12.2928 13.1023 11.2683C14.5288 10.0608 15.3823 8.29083 15.3845 6.53433V6.52158C15.38 3.24633 12.812 0.681328 9.53452 0.680578V0.681328ZM12.3748 10.4103C11.5243 11.1303 8.72827 12.9641 7.29577 13.8926V11.5023C7.29577 11.1918 7.04452 10.9398 6.73327 10.9398H6.43627C3.69127 10.9398 1.69777 9.08283 1.69777 6.52533C1.69777 3.87483 3.77377 1.79883 6.42277 1.79883L9.53302 1.80633H9.53452C12.1835 1.80633 14.2595 3.88083 14.261 6.52833C14.2588 7.96083 13.5545 9.41133 12.3755 10.4103H12.3748Z"
                                    fill="#5B7083"
                                />
                            </svg>
                            {{ timeNotif(notification.notificationDatetime) }}
                        </div>
                        <div style="font-weight: 700">
                            "{{ notification.linkedCommentObj.comment_text }}"
                        </div>
                    </div>
                    <div
                        v-if="
                            notification.notificationType === 'repost' &&
                            notification.linkedPostObj != null
                        "
                        style="min-height: 3em"
                        class="flex align-items-center"
                    >
                        {{ notification.notificationText }}
                        <p-button
                            style="
                                color: #2d6557;
                                background-color: inherit;
                                border: none;
                                font-weight: 500;
                                text-decoration: underline;
                                padding: 0 0 0 0.5em;
                            "
                            @click="openPost(notification.linkedPostId)"
                        >
                            ваш квак
                        </p-button>
                        {{ timeNotif(notification.notificationDatetime) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p-dialog
        v-model:visible="visiblePostMenu"
        :draggable="false"
        modal
        :style="{
            width: '35rem',
            height: this.post?.image_id == null ? '15rem' : '27rem',
        }"
        :pt="{
            title: {
                class: '',
                style: {},
            },
            header: { class: 'justify-content-center p-2 pb-3' },
            footer: {
                class: 'flex',
                style: { padding: '0 1.5rem 0.1rem 1.5rem' },
            },
            content: { style: { padding: '0 0rem 0 1.5rem' } },
        }"
    >
        <template #header>
            <div
                class="text-center w-full my-2"
                style="font-size: 20px; font-weight: 700; color: #000000"
            >
                Ваш квак
            </div>
        </template>
        <div class="flex">
            <div class="mr-2">
                <p-avatar
                    id="avatar"
                    :image="avatarImage(this.user)"
                    class="align-content-center"
                    shape="circle"
                    size="large"
                    style="background-color: #e2e8f0; min-width: 3rem"
                ></p-avatar>
            </div>

            <div class="flex flex-column">
                <div v-if="this.post != null">
                    <div class="flex justify-space-between gap-2">
                        <span style="font-weight: 700">
                            {{ displayName }}
                        </span>
                        <span style="color: #5b7083; font-weight: 500">
                            @{{ userName }} · {{ timePost }}
                        </span>
                    </div>
                    <span
                        class="p-1"
                        style="font-weight: 500"
                    >
                        {{ postText }}
                    </span>
                    <div class="pt-2">
                        <img
                            v-if="visiblePostIm != null"
                            class="border-round-xl w-11"
                            :src="visiblePostIm"
                        />
                        <div
                            class="flex pt-3 align-items-end"
                            style="gap: 8rem"
                        >
                            <div class="flex align-items-center">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.5345 1.68133L7.42352 1.67383H7.42202C4.14152 1.67383 1.57202 4.24408 1.57202 7.52533C1.57202 10.5988 3.96152 12.9298 7.17077 13.0528V15.9238C7.17077 16.0048 7.20377 16.1383 7.26077 16.2261C7.36727 16.3948 7.54877 16.4863 7.73477 16.4863C7.83827 16.4863 7.94252 16.4578 8.03627 16.3978C8.23427 16.2718 12.891 13.2928 14.1023 12.2683C15.5288 11.0608 16.3823 9.29083 16.3845 7.53433V7.52158C16.38 4.24633 13.812 1.68133 10.5345 1.68058V1.68133ZM13.3748 11.4103C12.5243 12.1303 9.72827 13.9641 8.29577 14.8926V12.5023C8.29577 12.1918 8.04452 11.9398 7.73327 11.9398H7.43627C4.69127 11.9398 2.69777 10.0828 2.69777 7.52533C2.69777 4.87483 4.77377 2.79883 7.42277 2.79883L10.533 2.80633H10.5345C13.1835 2.80633 15.2595 4.88083 15.261 7.52833C15.2588 8.96083 14.5545 10.4113 13.3755 11.4103H13.3748Z"
                                        fill="#5B7083"
                                    />
                                </svg>
                                <span class="p-2">
                                    {{ this.post?.comments_count }}
                                </span>
                            </div>
                            <div class="flex align-items-center">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.8275 11.7527C17.6085 11.5329 17.2523 11.5329 17.0325 11.7527L15.3675 13.4177V5.73768C15.3675 4.18668 14.1053 2.92518 12.555 2.92518H8.16754C7.85704 2.92518 7.60504 3.17718 7.60504 3.48768C7.60504 3.79818 7.85704 4.05018 8.16754 4.05018H12.555C13.485 4.05018 14.2425 4.80768 14.2425 5.73768V13.4177L12.5775 11.7527C12.3578 11.5329 12.0015 11.5329 11.7825 11.7527C11.5635 11.9724 11.562 12.3287 11.7825 12.5477L14.4075 15.1727C14.5163 15.2829 14.6603 15.3377 14.805 15.3377C14.9498 15.3377 15.0923 15.2837 15.2025 15.1727L17.8275 12.5477C18.048 12.3287 18.048 11.9724 17.8275 11.7527ZM9.83254 14.2127H5.44504C4.51504 14.2127 3.75754 13.4552 3.75754 12.5252V4.84518L5.42254 6.51018C5.53354 6.62043 5.67754 6.67518 5.82154 6.67518C5.96554 6.67518 6.10954 6.62043 6.21904 6.51018C6.43879 6.29043 6.43879 5.93418 6.21904 5.71518L3.59404 3.09018C3.37429 2.86968 3.01804 2.86968 2.79904 3.09018L0.174042 5.71518C-0.046458 5.93418 -0.046458 6.29043 0.174042 6.51018C0.394542 6.72993 0.749292 6.72993 0.969042 6.51018L2.63404 4.84518V12.5252C2.63404 14.0762 3.89629 15.3377 5.44654 15.3377H9.83404C10.1445 15.3377 10.3965 15.0857 10.3965 14.7752C10.3965 14.4647 10.1438 14.2127 9.83404 14.2127H9.83254Z"
                                        fill="#5B7083"
                                    />
                                </svg>
                                <span class="p-2">
                                    {{ this.post?.reposts_count }}
                                </span>
                            </div>
                            <div class="flex align-items-center">
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.68433 13.5323C8.37762 13.6691 8.15012 13.7234 8.00309 13.727H8.00002H7.96301C7.81576 13.7169 7.59894 13.6609 7.31359 13.5336C7.01106 13.3986 6.6613 13.197 6.28142 12.9331C5.52186 12.4055 4.67128 11.6494 3.87508 10.7437C2.26856 8.91622 0.962524 6.57248 0.962524 4.35847C0.962524 2.30644 2.66165 0.542969 4.51477 0.542969C5.98429 0.542969 7.00897 1.55884 7.5915 2.37981L7.99942 2.9547L8.40715 2.37967C8.98823 1.56016 10.0129 0.542969 11.483 0.542969C13.3376 0.542969 15.036 2.30639 15.036 4.35922C15.036 6.57243 13.7299 8.91577 12.1231 10.7429C11.3268 11.6485 10.4762 12.4045 9.71656 12.932C9.33665 13.1959 8.98687 13.3974 8.68433 13.5323Z"
                                        fill="white"
                                        stroke="#5B7083"
                                    />
                                </svg>
                                <span class="p-2">
                                    {{ this.post?.likes_count }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="this.comment != null">
                    <div class="flex justify-space-between gap-2">
                        <span style="font-weight: 700">
                            {{ displayName }}
                        </span>
                        <span style="color: #5b7083; font-weight: 500">
                            @{{ userName }} · {{ timeComment }}
                        </span>
                    </div>
                    <span
                        class="p-1"
                        style="font-weight: 500"
                    >
                        {{ commText }}
                    </span>
                    <div class="pt-2">
                        <div
                            class="flex pt-3 align-items-end"
                            style="gap: 8rem"
                        >
                            <div class="flex align-items-center">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17.8275 11.7527C17.6085 11.5329 17.2523 11.5329 17.0325 11.7527L15.3675 13.4177V5.73768C15.3675 4.18668 14.1053 2.92518 12.555 2.92518H8.16754C7.85704 2.92518 7.60504 3.17718 7.60504 3.48768C7.60504 3.79818 7.85704 4.05018 8.16754 4.05018H12.555C13.485 4.05018 14.2425 4.80768 14.2425 5.73768V13.4177L12.5775 11.7527C12.3578 11.5329 12.0015 11.5329 11.7825 11.7527C11.5635 11.9724 11.562 12.3287 11.7825 12.5477L14.4075 15.1727C14.5163 15.2829 14.6603 15.3377 14.805 15.3377C14.9498 15.3377 15.0923 15.2837 15.2025 15.1727L17.8275 12.5477C18.048 12.3287 18.048 11.9724 17.8275 11.7527ZM9.83254 14.2127H5.44504C4.51504 14.2127 3.75754 13.4552 3.75754 12.5252V4.84518L5.42254 6.51018C5.53354 6.62043 5.67754 6.67518 5.82154 6.67518C5.96554 6.67518 6.10954 6.62043 6.21904 6.51018C6.43879 6.29043 6.43879 5.93418 6.21904 5.71518L3.59404 3.09018C3.37429 2.86968 3.01804 2.86968 2.79904 3.09018L0.174042 5.71518C-0.046458 5.93418 -0.046458 6.29043 0.174042 6.51018C0.394542 6.72993 0.749292 6.72993 0.969042 6.51018L2.63404 4.84518V12.5252C2.63404 14.0762 3.89629 15.3377 5.44654 15.3377H9.83404C10.1445 15.3377 10.3965 15.0857 10.3965 14.7752C10.3965 14.4647 10.1438 14.2127 9.83404 14.2127H9.83254Z"
                                        fill="#5B7083"
                                    />
                                </svg>
                                <span class="p-2">
                                    {{ this.comment?.reposts_count }}
                                </span>
                            </div>
                            <div class="flex align-items-center">
                                <svg
                                    width="16"
                                    height="15"
                                    viewBox="0 0 16 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.68433 13.5323C8.37762 13.6691 8.15012 13.7234 8.00309 13.727H8.00002H7.96301C7.81576 13.7169 7.59894 13.6609 7.31359 13.5336C7.01106 13.3986 6.6613 13.197 6.28142 12.9331C5.52186 12.4055 4.67128 11.6494 3.87508 10.7437C2.26856 8.91622 0.962524 6.57248 0.962524 4.35847C0.962524 2.30644 2.66165 0.542969 4.51477 0.542969C5.98429 0.542969 7.00897 1.55884 7.5915 2.37981L7.99942 2.9547L8.40715 2.37967C8.98823 1.56016 10.0129 0.542969 11.483 0.542969C13.3376 0.542969 15.036 2.30639 15.036 4.35922C15.036 6.57243 13.7299 8.91577 12.1231 10.7429C11.3268 11.6485 10.4762 12.4045 9.71656 12.932C9.33665 13.1959 8.98687 13.3974 8.68433 13.5323Z"
                                        fill="white"
                                        stroke="#5B7083"
                                    />
                                </svg>
                                <span class="p-2">
                                    {{ this.comment?.likes_count }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </p-dialog>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useAuthStore } from '@/store/Auth.js';
import { useUserStore } from '@/store/User.js';
import api from '@/api';
export default {
    name: 'Notifications',
    data() {
        return {
            visiblePostMenu: false,
            post: null,
            visiblePostIm: null,
            comment: null,
        };
    },
    methods: {
        ...mapActions(useUserStore, [
            'getPostById',
            'setUser',
            'getCommById',
            'getNotif',
            'getImageById',
            'updateNotif',
        ]),

        avatarImage(user) {
            return user?.profileImageId
                ? api.getImage + user.profileImageId
                : 'images/avatar.svg';
        },
        async openPost(postId) {
            this.visiblePostMenu = true;
            this.comment = null;
            this.post = await this.getPostById(postId);
            this.visiblePostIm = this.post?.image_id
                ? api.getImage + this.post.image_id
                : null;
        },
        async openComment(commId) {
            this.visiblePostMenu = true;
            this.post = null;
            this.comment = await this.getCommById(commId);
        },
        clickUserName(userId) {
            this.$router.push('/pages/' + userId + '/profile/base');
        },
        timeNotif(t) {
            return this.timeAgoPost(new Date() - new Date(t + 'Z'));
        },
        async handleScroll() {
            const element = document.getElementById('notifications');
            const height = element.offsetHeight;
            const scrollHeight = element.scrollHeight;

            // Записываем, сколько пикселей пользователь уже проскроллил:
            const scrolled = element.scrollTop;

            // Обозначим порог, по приближении к которому
            // будем вызывать какое-то действие.
            const threshold = scrollHeight - scrollHeight / 4;

            // Отслеживаем, где находится низ экрана относительно страницы:
            const position = scrolled + height;
            if (position >= threshold) {
                if (!this.lastNotif) await this.getNotif();
            }
        },
        throttle(callee, timeout) {
            let timer = null;

            return function perform(...args) {
                if (timer) return;

                timer = setTimeout(() => {
                    callee(...args);

                    clearTimeout(timer);
                    timer = null;
                }, timeout);
            };
        },
        timeAgoPost(t) {
            let cd = 24 * 60 * 60 * 1000,
                ch = 60 * 60 * 1000,
                cm = 60 * 1000,
                d = Math.floor(t / cd),
                h = Math.floor((t - d * cd) / ch),
                m = Math.floor((t - d * cd - h * ch) / cm),
                s = Math.round((t - d * cd - h * ch - m * cm) / 1000);
            if (s === 60) {
                m++;
                s = 0;
            }
            if (m === 60) {
                h++;
                m = 0;
            }
            if (h === 24) {
                d++;
                h = 0;
            }
            if (d === 0) {
                if (h === 0) {
                    if (m === 0) {
                        return s + 's';
                    } else return m + 'min';
                } else return h + 'h';
            } else return d + 'd';
        },
    },
    computed: {
        ...mapState(useUserStore, [
            'notificationsNow',
            'usersFromN',
            'lastNotif',
            'notifs',
        ]),
        ...mapState(useAuthStore, ['user', 'getUserImage']),
        timePost() {
            return this.timeAgoPost(
                new Date() - new Date(this.post?.post_datetime + 'Z')
            );
        },
        timeComment() {
            return this.timeAgoPost(
                new Date() - new Date(this.comment?.comment_datetime + 'Z')
            );
        },
        postText() {
            return this.post?.text;
        },
        commText() {
            return this.comment?.comment_text;
        },
        userName() {
            return this.user?.userName;
        },
        displayName() {
            return this.user?.displayName;
        },
    },
    async mounted() {
        await this.updateNotif();
        await this.getNotif();
        if (this.visiblePostMenu === false) {
            this.post = null;
            this.comment = null;
        }
        const element = document.getElementById('notifications');
        element.addEventListener(
            'scroll',
            this.throttle(this.handleScroll, 250)
        );
        element.addEventListener(
            'resize',
            this.throttle(this.handleScroll, 250)
        );
    },
    beforeUnmount() {
        const element = document.getElementById('notifications');

        element.removeEventListener(
            'scroll',
            this.throttle(this.handleScroll, 250)
        );
        element.removeEventListener(
            'scroll',
            this.throttle(this.handleScroll, 250)
        );
    },
};
</script>

<style scoped>
.error-hidden {
    visibility: hidden;
}
</style>
