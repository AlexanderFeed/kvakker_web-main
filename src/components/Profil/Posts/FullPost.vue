<template>
    <post-vue
        :data="post"
        @comments-block-action="commentsBlockAction"
        @make-post="makePost"
        @like-post="likePost"
    >
        <template #default>
            <div v-if="post.repostedPostId">
                <post-vue
                    :data="post.repostedPostObj"
                    :is-repost="true"
                ></post-vue>
            </div>
            <div v-if="post.repostedCommentObj">
                <post-vue
                    :data="post.repostedCommentObj"
                    :is-repost="true"
                ></post-vue>
            </div>
        </template>
    </post-vue>

    <div v-if="showComments">
        <comment-block-vue
            :auth-user-id="this.user.userId"
            :post-id="post.postId"
            :comments="getCommentsArr"
            :is-feed="isFeed"
            @get-comments="getComments"
            @make-comment-post="makeCommentPost"
            @make-post="makePost"
        ></comment-block-vue>
    </div>
</template>
<script>
import CommentBlockVue from './Comments/CommentBlock.vue';
import PostVue from './Post.vue';
import Post from '@/model/Post';
import { useAuthStore } from '@/store/Auth';
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/store/User';
import { useFeedStore } from '@/store/Feed';
export default {
    name: 'FullPost',
    components: {
        PostVue,
        CommentBlockVue,
    },
    props: {
        post: Post,
        isFeed: Boolean,
    },
    data() {
        return {
            showComments: false,
        };
    },
    methods: {
        ...mapActions(useFeedStore, {
            feedGetCommentPost: 'getCommentsPost',
            feedMakeCommentPost: 'makeCommentPost',
            feedMakePost: 'makePost',
            feedLikePost: 'likePost',
        }),
        ...mapActions(useUserStore, {
            userGetCommentPost: 'getCommentsPost',
            userMakeCommentPost: 'makeCommentPost',
            userMakePost: 'makePost',
            userLikePost: 'likePost',
        }),
        async getComments() {
            if (this.isFeed)
                await this.feedGetCommentPost(
                    this.post.postId,
                    this.user.userId
                );
            else
                await this.userGetCommentPost(
                    this.post.postId,
                    this.user.userId
                );
        },
        async commentsBlockAction() {
            //если комментарии показываются
            if (!this.showComments) {
                await this.getComments(this.post.postId);
            }
            this.showComments = !this.showComments;
        },
        async makeCommentPost(postId, commentText, authUserId) {
            if (this.isFeed)
                await this.feedMakeCommentPost(postId, commentText, authUserId);
            else
                await this.userMakeCommentPost(postId, commentText, authUserId);
        },
        async makePost(payload, userId) {
            if (this.isFeed) await this.feedMakePost(payload, userId);
            else await this.userMakePost(payload, userId);
        },
        async likePost(postId) {
            if (this.isFeed) await this.feedLikePost(postId);
            else await this.userLikePost(postId);
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        getCommentsArr() {
            let array = Array.from(this.post.comments.values());

            array.sort((a, b) => {
                return new Date(b.postDatetime) - new Date(a.postDatetime);
            });

            // Возвращаем отсортированный массив
            return array;
        },
    },
};
</script>
