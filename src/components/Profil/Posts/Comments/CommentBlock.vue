<template>
    <p-divider
        align="center"
        type="solid"
    >
        Комментарии
    </p-divider>
    <div
        id="comments"
        style="overflow: scroll; scrollbar-width: none; max-height: 400px"
    >
        <div
            v-for="comment in comments"
            :key="comment"
        >
            <post
                :data="comment"
                :is-comment="true"
                @like-comment="likeComment"
                @make-post="makePost"
                @delete-comment="deleteComment"
            ></post>
            <p-divider></p-divider>
        </div>
    </div>
    <new-post-body-vue
        :text-area-placeholder="'Ваш комментарий'"
        :hidden-image="true"
        :short-text-field="true"
        @close-post-menu-and-post="createComment"
    ></new-post-body-vue>
</template>
<script>
import { mapActions } from 'pinia';
import NewPostBodyVue from '../NewPostBody.vue';

import Post from '../Post.vue';
import { useUserStore } from '@/store/User';
import { useFeedStore } from '@/store/Feed';
export default {
    name: 'CommentBlock',
    emits: ['getComments', 'makeCommentPost', 'makePost'],
    components: {
        NewPostBodyVue,
        Post,
    },
    props: {
        authUserId: Number,
        postId: Number,
        comments: Array,
        isFeed: Boolean,
    },
    data() {
        return {
            showComments: false,
        };
    },
    methods: {
        ...mapActions(useUserStore, {
            userLikeComment: 'likeComment',
            userDeleteComment: 'deleteComment',
        }),
        ...mapActions(useFeedStore, {
            feedLikeComment: 'likeComment',
            feedDeleteComment: 'deleteComment',
        }),
        createComment(commentText) {
            this.$emit(
                'makeCommentPost',
                this.postId,
                commentText,
                this.authUserId
            );
        },
        async handleScroll() {
            const element = document.getElementById('comments');
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
                await this.$emit('getComments');
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
        async likeComment(postId, commentId) {
            if (this.isFeed) await this.feedLikeComment(postId, commentId);
            else await this.userLikeComment(postId, commentId);
        },
        makePost(payload, userId) {
            this.$emit('makePost', payload, userId);
        },
        async deleteComment(postId, commentId) {
            if (this.isFeed) await this.feedDeleteComment(postId, commentId);
            else await this.userDeleteComment(postId, commentId);
        },
    },
    mounted() {
        const element = document.getElementById('comments');
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
        const element = document.getElementById('comments');

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
