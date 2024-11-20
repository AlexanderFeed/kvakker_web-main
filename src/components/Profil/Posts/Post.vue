<template>
    <div
        class="flex gap-3"
        :class="{ 'mt-2': isRepost }"
    >
        <div
            class="mr-2"
            style="min-width: 3rem; text-align: center"
        >
            <p-avatar
                id="avatar"
                :image="avatarImage"
                class="align-content-center"
                shape="circle"
                size="large"
                style="background-color: #b9b9b9"
                :pt="{
                    root: {
                        style: avatarStyle,
                    },
                    image: {
                        style: avatarStyle,
                    },
                }"
            >
            </p-avatar>
        </div>
        <div class="w-full">
            <div class="flex justify-content-between">
                <div>
                    <p-button
                        link
                        class="font-bold p-0"
                        style="
                            color: rgba(15, 20, 25, 1);
                            font-weight: 700;
                            font-size: 15px;
                            line-height: 18.15px;
                        "
                        @click="clickUserName"
                    >
                        <div class="flex gap-2">
                            <div
                                style="
                                    color: rgba(15, 20, 25, 1);
                                    font-weight: 700;
                                "
                            >
                                {{ data?.authorObj?.displayName }}
                            </div>

                            <div
                                style="
                                    color: rgba(91, 112, 131, 1);
                                    font-weight: 500;
                                "
                            >
                                <span>{{
                                    '@' + data?.authorObj?.userName
                                }}</span>
                                &bull;
                                <span>{{ timeSincePost() }}</span>
                            </div>
                        </div>
                    </p-button>
                </div>
                <div
                    v-if="!isRepost"
                    class="flex-column justify-content-center"
                    style="margin-left: -2rem"
                >
                    <div class="flex justify-content-center">
                        <p-button
                            icon="pi pi-ellipsis-h"
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
                        :model="postAction"
                        :popup="true"
                        :pt="{
                            root: {
                                style: {
                                    'margin-left': '-160px',
                                },
                            },
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
                v-if="data.text"
                class="my-2"
            >
                {{ data.text }}
            </div>
            <div
                v-if="data.imageId"
                class="w-full border-round-3xl my-2"
                style="max-height: 300px; overflow: hidden"
            >
                <p-image
                    :src="getPostImage"
                    alt="Image"
                    preview
                    image-style="width: 100%; height: auto; object-fit: contain; max-height: 300px;"
                    style="
                        width: 100%;
                        height: auto;
                        object-fit: cover;
                        max-height: 300px;
                    "
                ></p-image>
            </div>
            <div class="container"><slot></slot></div>
            <div
                v-if="!isRepost"
                class="flex mt-2 justify-content-between w-3 text-left"
                :class="{ 'w-6 my-2': !isComment }"
            >
                <p-button
                    v-if="!isComment"
                    link
                    class="pl-0"
                    @click="commentsBlockAction"
                >
                    <div class="flex align-items-center gap-2">
                        <img src="@/assets/comment.svg" />
                        {{ data.commentsCount }}
                    </div>
                </p-button>
                <p-button
                    link
                    class="pl-0"
                    @click="like"
                >
                    <div class="flex align-items-center gap-2">
                        <img
                            v-if="data?.areYouLike"
                            src="@/assets/likeGreen.svg"
                        />
                        <img
                            v-else
                            src="@/assets/like.svg"
                        />
                        {{ data.likesCount }}
                    </div>
                </p-button>
                <p-button
                    link
                    class="pl-0"
                    :class="{ disabled: disabledRepost }"
                    @click="doRepost()"
                >
                    <div class="flex align-items-center gap-2">
                        <img src="@/assets/repost.svg" />
                        {{ data.repostsCount }}
                    </div>
                </p-button>
            </div>
        </div>
    </div>
    <p-dialog
        v-model:visible="openedRepostDialog"
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
                {{ clickPostAction ? 'Жалоба' : 'Реквак' }}
            </div>
        </template>
        <new-post-body
            :text-area-placeholder="newPostPlaceholder"
            :hidden-image="isComment || clickPostAction"
            :is-complaint="clickPostAction"
            @close-post-menu-and-post="closePostMenuAndPost"
            @send-complaint="sendPostComplaint"
        >
        </new-post-body>
    </p-dialog>
</template>
<script>
import api from '@/api';
import Post from '@/model/Post.js';
import { useUserStore } from '@/store/User.js';
import { useAuthStore } from '@/store/Auth';
import { mapActions, mapState } from 'pinia';
import NewPostBody from './NewPostBody.vue';
export default {
    name: 'Post',
    emits: [
        'commentsBlockAction',
        'makePost',
        'likePost',
        'likeComment',
        'deleteComment',
    ],
    components: {
        NewPostBody,
    },
    props: {
        data: Post,
        isRepost: Boolean,
        isComment: Boolean,
    },
    data() {
        return {
            openedRepostDialog: false,
            repostedPostId: null,
            showComments: false,
            clickPostAction: false,
        };
    },
    methods: {
        ...mapActions(useUserStore, [
            'setUser',
            'postComplaint',
            'commentComplaint',
            'deletePost',
            'getUserData',
        ]),
        ...mapActions(useAuthStore, ['uploadImage']),
        async clickUserName() {
            if (this.$route.params.userId != this.data?.authorObj?.userId) {
                const dataUser = await this.getUserData(
                    this.data?.authorObj.userId
                );
                await this.setUser(dataUser);
            }
            this.$router.push(
                '/pages/' + this.data?.authorObj?.userId + '/profile/base'
            );
        },
        timeSincePost() {
            const currentDate = new Date();
            let postDatetime = new Date(this.data?.postDatetime);
            const diff = postDatetime.getTimezoneOffset();

            let timeInMilliseconds = postDatetime.getTime() - diff * 60 * 1000;
            postDatetime.setTime(timeInMilliseconds);

            const secondsElapsed = Math.floor(
                (currentDate - postDatetime) / 1000
            );

            if (secondsElapsed < 60) {
                return secondsElapsed + 's';
            } else if (secondsElapsed < 3600) {
                const minutes = Math.floor(secondsElapsed / 60);
                return minutes + 'm';
            } else if (secondsElapsed < 86400) {
                const hours = Math.floor(secondsElapsed / 3600);
                return hours + 'h';
            } else {
                const days = Math.floor(secondsElapsed / 86400);
                return days + 'd';
            }
        },
        async closePostMenuAndPost(textAreaText, postImages) {
            this.openedRepostDialog = false;
            if (postImages) {
                let blob = await fetch(postImages).then((r) => r.blob());
                this.imagesId = await this.uploadImage(blob);
            }

            const payload = {
                text: textAreaText ? textAreaText : null,
                imageId: this.imagesId,
                repPostId: this.data.postId,
                repComId: this.data.commentId,
            };
            await this.$emit('makePost', payload, this.user.userId);
        },
        doRepost() {
            this.openedRepostDialog = true;
        },
        commentsBlockAction() {
            this.$emit('commentsBlockAction');
        },
        async like() {
            this.isComment
                ? this.$emit(
                      'likeComment',
                      this.data?.postId,
                      this.data?.commentId
                  )
                : this.$emit('likePost', this.data?.postId);
        },
        toggle(event) {
            this.$refs.menu.toggle(event);
        },
        startPostAction() {
            this.clickPostAction = true;
            this.openedRepostDialog = true;
        },
        sendPostComplaint(textAreaText) {
            if (this.isComment)
                this.commentComplaint(
                    this.data?.commentId,
                    textAreaText ? textAreaText : null
                );
            else
                this.postComplaint(
                    this.data?.postId,
                    textAreaText ? textAreaText : null
                );
            this.clickPostAction = false;
            this.openedRepostDialog = false;
        },
        deletePostAction() {
            if (this.isComment)
                this.$emit(
                    'deleteComment',
                    this.data?.postId,
                    this.data?.commentId
                );
            else this.deletePost(this.data?.postId);
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
        getPostImage() {
            return api.getImage + this.data?.imageId;
        },
        avatarImage() {
            return this.data.authorObj?.profileImageId
                ? api.getImage + this.data.authorObj.profileImageId
                : 'images/avatar.svg';
        },
        disabledRepost() {
            return this.user.userId == this.data?.authorObj?.userId;
        },
        newPostPlaceholder() {
            if (this.clickPostAction)
                return this.isComment
                    ? 'Что, по вашему мнению, нарушено в данном комментарии?'
                    : 'Что, по вашему мнению, нарушено в данном кваке?';
            else {
                return 'Ваше сообщение';
            }
        },
        avatarStyle() {
            let style = { width: '3rem', height: '3rem' };
            if (this.isComment) {
                (style.width = '2.5rem'), (style.height = '2.5rem');
            }
            return style;
        },
        postAction() {
            let menu = [];
            if (
                this.user.userId == this.data?.authorObj?.userId ||
                this.user.isAdmin
            ) {
                menu.push({
                    label: 'Удалить',
                    icon: 'pi pi-trash',
                    command: () => {
                        this.deletePostAction();
                    },
                });
            }
            if (this.user.userId != this.data?.authorObj?.userId)
                menu.push({
                    label: 'Пожаловаться',
                    icon: 'pi pi-user-minus',
                    command: () => {
                        this.startPostAction();
                    },
                });
            return menu;
        },
    },
};
</script>
<style scoped>
.disabled {
    cursor: default;
    pointer-events: none;
}
</style>
