<template>
    <div
        id="profile"
        style="overflow: scroll; scrollbar-width: none"
    >
        <div
            v-if="this.user"
            class="flex flex-column"
        >
            <profil-name
                :user-info="profilUser"
                :show-complaint="true"
            ></profil-name>
            <div class="flex gap-4 mt-4">
                <p-button
                    link
                    style="color: rgba(15, 20, 25, 1)"
                    :class="{ disabled: !subscribersCountUser }"
                    @click="showSubscribers"
                >
                    <span class="font-bold">{{ subscribersCountUser }} </span>
                    &nbsp;
                    <span style="color: rgba(91, 112, 131, 1)">
                        подписчиков
                    </span>
                </p-button>
                <p-button
                    link
                    style="color: rgba(15, 20, 25, 1)"
                    :class="{ disabled: !subscriptionsCountUser }"
                    @click="showSubscriptions"
                >
                    <span class="font-bold">{{ subscriptionsCountUser }}</span>
                    &nbsp;
                    <span style="color: rgba(91, 112, 131, 1) !important">
                        подписки
                    </span>
                </p-button>
            </div>
            <div
                v-if="currentBlock !== 'base'"
                style="margin-top: -10px"
            >
                <p-divider></p-divider>
            </div>
            <div class="mx-3 mt-2">
                <subscribe-user
                    v-if="currentBlock === 'subscribers'"
                    title="Подписчики"
                    :users="subscribers"
                ></subscribe-user>
                <subscribe-user
                    v-if="currentBlock === 'subscriptions'"
                    title="Подписки"
                    :users="subscriptions"
                ></subscribe-user>
                <div v-if="currentBlock === 'base'">
                    <p-tab-view
                        :pt="{
                            inkbar: {
                                style: {
                                    'background-color': 'rgba(45, 101, 87, 1)',
                                },
                            },
                        }"
                    >
                        <p-tab-panel header="Кваки">
                            <post-list :user-posts="userPosts"></post-list>
                        </p-tab-panel>
                        <p-tab-panel
                            header="Комментарии"
                            :disabled="true"
                        >
                            Тута комментарии
                        </p-tab-panel>
                    </p-tab-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '../store/Auth';
import ProfilName from './Profil/ProfilName.vue';
import SubscribeUser from './Profil/SubscribeUser.vue';
import { useUserStore } from '@/store/User.js';
import { mapState, mapActions } from 'pinia';
import PostList from './Profil/Posts/PostList.vue';
export default {
    name: 'ProfileUser',
    components: { ProfilName, SubscribeUser, PostList },

    data() {
        return {};
    },
    methods: {
        ...mapActions(useUserStore, [
            'getSubscriptionsUser',
            'getSubscribersUser',
            'getUserData',
            'getPostsUser',
            'setUser',
        ]),
        async showSubscribers() {
            if (!this.subscribers.length) {
                await this.getSubscribersUser(this.$route.params.userId);
            }
            this.$router.push(
                '/pages/' + this.user?.userId + '/profile/subscribers'
            );
        },
        async showSubscriptions() {
            if (!this.subscriptions.length) {
                await this.getSubscriptionsUser(this.$route.params.userId);
            }
            this.$router.push(
                '/pages/' + this.user?.userId + '/profile/subscriptions'
            );
        },
        async handleScroll() {
            const element = document.getElementById('profile');
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
                const profileBlock = this.$route.params.blockProfile;
                if (profileBlock == 'base')
                    await this.getPostsUser(this.authUser.userId);
                if (profileBlock == 'subscriptions')
                    await this.getSubscriptionsUser(this.$route.params.userId);
                if (profileBlock == 'subscribers')
                    await this.getSubscribersUser(this.$route.params.userId);
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
    },
    watch: {
        user() {
            this.getPostsUser(this.authUser?.userId);
        },
    },
    computed: {
        ...mapState(useUserStore, [
            'subscriptions',
            'subscribers',
            'user',
            'userPosts',
        ]),
        ...mapState(useAuthStore, { authUser: 'user' }),
        isMyProfil() {
            return this.$route.params.userId == this.authUser?.userId;
        },
        subscribersCountUser() {
            return this.user?.subscribersCount;
        },
        subscriptionsCountUser() {
            return this.user?.subscriptionsCount;
        },
        profilUser() {
            return this.user;
        },
        currentBlock() {
            return this.$route.params.blockProfile;
        },
    },
    async mounted() {
        if (this.$route.params.blockProfile !== 'base') {
            this.$router.push(
                '/pages/' + this.$route.params.userId + '/profile/base'
            );
        }
        //подгружаем юзера если это не наш акк
        if (
            !this.isMyProfil &&
            this.user?.userId !== Number(this.$route.params.userId)
        ) {
            await this.setUser(this.user);
            await this.getUserData(this.$route.params.userId);
        }

        if (!this.userPosts.length && this.user?.userId) {
            await this.getPostsUser(this.authUser.userId);
        }

        const element = document.getElementById('profile');
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
        const element = document.getElementById('profile');

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
.disabled {
    cursor: default;
    pointer-events: none;
}
</style>
<style>
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
    color: rgba(45, 101, 87, 1);
}
</style>
