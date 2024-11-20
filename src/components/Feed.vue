<template>
    <div
        id="feed"
        style="overflow: scroll; scrollbar-width: none"
    >
        <post-list
            :user-posts="posts"
            :is-feed="true"
        ></post-list>
        <p-divider
            v-if="lastFeedPost"
            align="center"
            type="solid"
        >
            Рекомендованные посты
        </p-divider>
        <post-list
            :user-posts="postsRecommendation"
            :is-feed="true"
        ></post-list>
    </div>
</template>
<script>
import { useFeedStore } from '@/store/Feed.js';
import { useAuthStore } from '@/store/Auth.js';
import { mapActions, mapState } from 'pinia';
import PostList from './Profil/Posts/PostList.vue';
export default {
    name: 'Feed',
    components: {
        PostList,
    },
    methods: {
        ...mapActions(useFeedStore, [
            'getFeedUser',
            'updateFeedData',
            'getFeedRecommendation',
        ]),
        async handleScroll() {
            const element = document.getElementById('feed');
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
                if (!this.lastFeedPost)
                    await this.getFeedUser(this.user?.userId);
                else await this.getFeedRecommendation(this.user?.userId);
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
    computed: {
        ...mapState(useFeedStore, [
            'posts',
            'postsRecommendation',
            'lastFeedPost',
        ]),
        ...mapState(useAuthStore, ['user']),
    },
    async mounted() {
        await this.updateFeedData();
        await this.getFeedUser(this.user?.userId);
        //если нет постов то сразу рекомендации
        if (!this.posts.length) {
            await this.getFeedRecommendation(this.user?.userId, 20);
        }
        const element = document.getElementById('feed');
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
        const element = document.getElementById('feed');

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
