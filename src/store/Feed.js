import { defineStore } from 'pinia';
import api from '@/api';
import Post from '@/model/Post.js';
import { fetchWithInterceptors } from '@/utils/Interceptor.js';

export const useFeedStore = defineStore('Feed', {
    state: () => ({
        /**Посты ленты
         * @type {Map<Number,Post>}
         */
        feedPosts: new Map(),
        lastFeedPost: false,
        /**Посты ленты
         * @type {Map<Number,Post>}
         */
        feedRecommendation: new Map(),
        lastRecommendPost: false,
    }),
    getters: {
        posts() {
            let userPostsArray = Array.from(this.feedPosts.values()).filter(
                (item) => !item.isPostRecomendation
            );

            userPostsArray.sort((a, b) => {
                return new Date(b.postDatetime) - new Date(a.postDatetime);
            });
            return userPostsArray;
        },
        postsRecommendation() {
            let userPostsArray = Array.from(this.feedPosts.values()).filter(
                (item) => item.isPostRecomendation
            );
            return userPostsArray;
        },
    },
    actions: {
        /**Получение ленты пользователя
         * @param {number} count
         */
        async getFeedUser(userId, count = 10) {
            if (!this.lastFeedPost) {
                const options = {
                    method: 'GET',
                };
                const offset = this.feedPosts.size;
                let url = api.feed + 'my?offset=' + offset + '&count=' + count;
                const response = await fetchWithInterceptors(url, options);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length < count) this.lastFeedPost = true;
                    if (!this.feedPosts.size) {
                        this.feedPosts = new Map(
                            data.map((item) => [
                                item.post_id,
                                new Post(item, userId),
                            ])
                        );
                    } else {
                        data.forEach((item) => {
                            this.feedPosts.set(
                                item.post_id,
                                new Post(item, userId)
                            );
                        });
                    }
                }
            }
        },
        /**Получение рекомендованных из ленты пользователе1
         * @param {number} count
         */
        async getFeedRecommendation(userId, count = 10) {
            if (!this.lastRecommendPost) {
                const options = {
                    method: 'GET',
                };
                const offset = this.postsRecommendation.length;
                let url =
                    api.feed +
                    'recommended?offset=' +
                    offset +
                    '&count=' +
                    count;
                const response = await fetchWithInterceptors(url, options);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length < count) this.lastRecommendPost = true;

                    data.forEach((item) => {
                        if (!this.feedPosts.has(item.post_id))
                            this.feedPosts.set(
                                item.post_id,
                                new Post(item, userId, false, true)
                            );
                    });
                }
            }
        },
        /**пОст постА
         * @param {Object} data
         * @param {String} text
         * @param {string} imageId
         * @param {number} repPostId
         * @param {number} repComId
         * @param {number} authUserId --является ли этот юзер мной
         */
        async makePost(data, authUserId) {
            const payload = {
                text: data.text,
                image_id: data.imageId,
                reposted_post_id: data.repComId ? null : data.repPostId,
                reposted_comment_id: data.repComId,
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            };
            let response = await fetchWithInterceptors(api.makePost, options);
            if ((data.repPostId || data.repComId) && response.ok) {
                let postData = this.feedPosts.get(data.repPostId);
                if (!data.repComId) {
                    postData.repostsCount += 1;
                } else {
                    let comment = postData.comments.get(data.repComId);
                    comment.repostsCount += 1;
                }
                this.feedPosts.set(data.repPostId, postData);
            }
            if (
                !data.repPostId &&
                !data.repComId &&
                authUserId == this.user.userId &&
                response.ok
            ) {
                const data = await response.json();
                this.feedPosts.set(data.user_id, new Post(data));
            }
            return response;
        },
        /**Создание комментария
         * @param {number} postId
         * @param {string} commentText
         */
        async makeCommentPost(postId, commentText, userId) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment_text: commentText }),
            };
            const url = api.makePost + '/' + postId + '/comments';
            let response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                let post = this.feedPosts.get(postId);
                post.setComments([data], userId);
                post.commentsCount += 1;
            }
        },
        /**Получения списка комментариев под постом
         * @param {number} authUserId
         * @param {number} userId
         * @param {number} count - количество получаемыз постов
         */
        async getCommentsPost(postId, authUserId, count = 5) {
            let post = await this.feedPosts.get(postId);
            if (!post.endComments) {
                //если данные не закончились
                const options = {
                    method: 'GET',
                };
                const commentArray = post.getComments();
                const lastCommentId = post.comments.size
                    ? commentArray[commentArray.length - 1]?.commentId
                    : null;
                let url =
                    api.makePost + '/' + postId + '/comments?count=' + count;
                if (lastCommentId) url += '&from_comment_id=' + lastCommentId;
                const response = await fetchWithInterceptors(url, options);
                if (response.ok) {
                    const data = await response.json();
                    post.setComments(data, authUserId, data.length < count);
                }
            }
        },
        /**Поставить лайк на пост
         * @param {number} postId
         */
        async likePost(postId) {
            const options = {
                method: 'POST',
            };
            const url = api.makePost + '/' + postId + '/like';
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                let post = await this.feedPosts.get(postId);
                post.areYouLike = !post.areYouLike;
                post.likesCount = data.new_likes_count;
            }
        },

        /**Поставить лайк на комментарий
         * @param {number} postId
         * @param {number} commentId
         */
        async likeComment(postId, commentId) {
            const options = {
                method: 'POST',
            };
            const url = api.comments + commentId + '/like';
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                let post = await this.feedPosts.get(postId);
                let comment = post.comments.get(commentId);
                comment.areYouLike = !comment.areYouLike;
                comment.likesCount = data.new_likes_count;
            }
        },
        /**Удаление комментария
         * @param {number} postId,
         * @param {number} commentId,
         */
        async deleteComment(postId, commentId) {
            const options = {
                method: 'DELETE',
            };
            const url = api.comments + commentId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                let post = this.feedPosts.get(postId);
                post.commentsCount -= 1;
                post.comments.delete(commentId);
            }
        },
        updateFeedData() {
            this.feedPosts = new Map();
            this.lastFeedPost = false;
            this.feedRecommendation = new Map();
            this.lastRecommendPost = false;
        },
    },
});
