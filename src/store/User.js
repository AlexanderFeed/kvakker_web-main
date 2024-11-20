import { defineStore } from 'pinia';
//import UserData from '@/model/Auth/UserData.js';
import api from '@/api';
import OtherUserData from '@/model/Auth/OtherUserData.js';
import { fetchWithInterceptors } from '@/utils/Interceptor.js';
import UserNotification from '@/model/Auth/UserNotification.js';
import Post from '@/model/Post.js';

export const useUserStore = defineStore('User', {
    state: () => ({
        /**Данные пользователя
         * @type {UserData}
         */
        user: null,
        /**Подпысчики
         * @type {Map<number, OtherUserData>}
         */
        subscriptionsMap: new Map(),
        /**Подписки
         *  @type {Map<number, OtherUserData>}
         */
        subscribersMap: new Map(),
        /**Уведомления
         *@type {Array<UserNotification>}
         */
        notificationsNow: new Map(),
        /**Посты
         * @type {Map<Number, Post>}
         */
        userPostsMap: new Map(),
        /**@type {boolean} */
        isLastPostPage: false,
        /**@type {boolean} */
        isLastSubscriptions: false,
        /**@type {boolean} */
        isLastSubscribers: false,
        lastNotif: false,
    }),
    getters: {
        userPosts() {
            let userPostsArray = Array.from(this.userPostsMap.values());

            userPostsArray.sort((a, b) => {
                return new Date(b.postDatetime) - new Date(a.postDatetime);
            });

            // Возвращаем отсортированный массив
            return userPostsArray;
        },
        subscriptions() {
            return Array.from(this.subscriptionsMap.values());
        },
        subscribers() {
            return Array.from(this.subscribersMap.values());
        },
        notifs() {
            let userNotifs = Array.from(this.notificationsNow.values());
            return userNotifs;
        },
    },
    actions: {
        /**Получение подписок пользователя
         * @param {number} userId
         * @param {number} countRows
         */
        async getSubscriptionsUser(userId, countRows = 30) {
            const options = {
                method: 'GET',
            };
            const lastSubscriptionId = this.subscriptionsMap.size
                ? this.subscriptions[this.subscriptions.length - 1]?.userId
                : '';
            let url = api.user + userId + '/subscriptions?count=' + countRows;

            if (lastSubscriptionId)
                url += '&from_user_id=' + lastSubscriptionId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                if (data.length < countRows) this.isLastSubscriptions = true;
                if (!this.subscriptionsMap.size) {
                    this.subscriptionsMap = new Map(
                        data.map((item) => [
                            item?.user_id,
                            new OtherUserData(item),
                        ])
                    );
                } else {
                    data.forEach((item) => {
                        this.subscriptionsMap.set(
                            item?.user_id,
                            new OtherUserData(item)
                        );
                    });
                }
            }
        },

        /**Получение подписчиков пользователя
         * @param {number} userId
         * @param {number} countRows
         */
        async getSubscribersUser(userId, countRows = 30) {
            const options = {
                method: 'GET',
            };
            const lastSubscriberId = this.subscribersMap.size
                ? this.subscribers[this.subscribers.length - 1]?.userId
                : '';
            this.subscribers[this.subscribers.length - 1]?.userId ?? null;
            let url = api.user + userId + '/subscribers?count=' + countRows;
            if (lastSubscriberId) url += '&from_user_id=' + lastSubscriberId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                // const jsonString =
                //     '[{"user_id":16,"user_name":"ralph123","display_name":"Ralph","is_banned":false,"profile_image_id":null,"subscriptions_count":0,"subscribers_count":1,"are_you_subscribed_to_user":true,"is_user_subscribed_to_you":false},{"user_id":17,"user_name":"alice456","display_name":"Alice","is_banned":false,"profile_image_id":null,"subscriptions_count":2,"subscribers_count":3,"are_you_subscribed_to_user":false,"is_user_subscribed_to_you":true},{"user_id":18,"user_name":"john789","display_name":"John","is_banned":true,"profile_image_id":null,"subscriptions_count":5,"subscribers_count":2,"are_you_subscribed_to_user":true,"is_user_subscribed_to_you":false},{"user_id":19,"user_name":"emma101","display_name":"Emma","is_banned":false,"profile_image_id":null,"subscriptions_count":1,"subscribers_count":4,"are_you_subscribed_to_user":false,"is_user_subscribed_to_you":true},{"user_id":20,"user_name":"bob555","display_name":"Bob","is_banned":true,"profile_image_id":null,"subscriptions_count":3,"subscribers_count":2,"are_you_subscribed_to_user":true,"is_user_subscribed_to_you":false},{"user_id":21,"user_name":"lisa777","display_name":"Lisa","is_banned":false,"profile_image_id":null,"subscriptions_count":2,"subscribers_count":3,"are_you_subscribed_to_user":false,"is_user_subscribed_to_you":true},{"user_id":16,"user_name":"ralph123","display_name":"Ralph","is_banned":false,"profile_image_id":null,"subscriptions_count":0,"subscribers_count":1,"are_you_subscribed_to_user":true,"is_user_subscribed_to_you":false}]';

                // const data = JSON.parse(jsonString);

                if (!this.subscribersMap.size) {
                    this.subscribersMap = new Map(
                        data.map((item) => [
                            item.user_id,
                            new OtherUserData(item),
                        ])
                    );
                } else {
                    data.forEach((item) => {
                        this.subscribersMap.set(
                            item.user_id,
                            new OtherUserData(item)
                        );
                    });
                }
            }
            this.oldUserId = userId;
        },
        /**Подписаться на пользователя
         * @param {number} userId
         * @returns {{result: boolean, isSubscribed: boolean}}
         */
        async subscribeUser(userId) {
            const options = {
                method: 'POST',
            };
            const url = api.user + userId + '/subscribe';
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();

                return { result: true, isSubscribed: data.is_subscribed };
            }
            return { result: false, isSubscribed: null };
        },
        /**Загрузить данные для юзера
         * @param {number} userId
         */
        async getUserData(userId) {
            const options = {
                method: 'GET',
            };
            const url = api.user + userId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                this.user = await new OtherUserData(data);
            }
            return this.user;
        },
        async getPostById(postId) {
            const options = {
                method: 'GET',
            };
            const url = api.posts + postId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        },
        async getCommById(commId) {
            const options = {
                method: 'GET',
            };
            const url = api.comments + commId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        },
        /**пОст постА
         */
        async getNotif(count = 11) {
            if (!this.lastNotif) {
                const options = {
                    method: 'GET',
                };
                const offset = this.notificationsNow.size;
                const url =
                    api.notifications + 'count=' + count + '&offset=' + offset;
                const response = await fetchWithInterceptors(url, options);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length < count) this.lastNotif = true;
                    if (!this.notificationsNow.size) {
                        this.notificationsNow = new Map(
                            data.map((item) => [
                                item.notification_id,
                                new UserNotification(item),
                            ])
                        );
                    } else {
                        data.forEach((item) => {
                            this.notificationsNow.set(
                                item.notification_id,
                                new UserNotification(item)
                            );
                        });
                    }

                    //this.usersFromN.push(this.notificationsNow.linkedUserObj);
                    //console.log(this.usersFromN);
                    //this.notificationsNow.push(notifi);
                    // this.usersFromN = data.linked_user_obj.map(
                    //     (item) => new UserFromNotif(item)
                    // );
                }
            }
        },
        updateNotif() {
            this.notificationsNow = new Map();
            this.lastNotif = false;
        },
        /**Установить юзера из уже известных
         * @param {OtherUserData} user
         */
        setUser(user) {
            this.user = user;
            this.subscribersMap = new Map();
            this.subscriptionsMap = new Map();
            this.userPostsMap = new Map();
            this.isLastPostPage = false;
        },

        /**Получение постов пользователя
         * @param {number} authUserId
         * @param {number} userId
         * @param {number} count - количество получаемыз постов
         */
        async getPostsUser(authUserId, userId = null, count = 10) {
            if (!this.isLastPostPage) {
                //если данные не закончились
                const options = {
                    method: 'GET',
                };
                const lastPostId = this.userPostsMap.size
                    ? this.userPosts[this.userPosts.length - 1]?.postId
                    : null;
                const user = userId ? userId : this.user?.userId;
                let url = api.user + user + '/posts?count=' + count;
                if (lastPostId) url += '&from_post_id=' + lastPostId;
                const response = await fetchWithInterceptors(url, options);
                if (response.ok) {
                    const data = await response.json();
                    if (data.length < count) this.isLastPostPage = true;
                    if (!this.userPostsMap.size) {
                        this.userPostsMap = new Map(
                            data.map((item) => [
                                item.post_id,
                                new Post(item, authUserId),
                            ])
                        );
                    } else {
                        data.forEach((item) => {
                            this.userPostsMap.set(
                                item.post_id,
                                new Post(item, authUserId)
                            );
                        });
                    }
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
                let postData = this.userPostsMap.get(data.repPostId);
                if (!data.repComId) {
                    postData.repostsCount += 1;
                } else {
                    let comment = postData.comments.get(data.repComId);
                    comment.repostsCount += 1;
                }
                this.userPostsMap.set(data.repPostId, postData);
            }
            if (
                !data.repPostId &&
                !data.repComId &&
                authUserId == this.user.userId &&
                response.ok
            ) {
                const data = await response.json();
                const post = new Post(data, authUserId);
                this.userPostsMap.set(data.post_id, post);
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
                let post = this.userPostsMap.get(postId);
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
            let post = await this.userPostsMap.get(postId);
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
                let post = await this.userPostsMap.get(postId);
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
                let post = await this.userPostsMap.get(postId);
                let comment = post.comments.get(commentId);
                comment.areYouLike = !comment.areYouLike;
                comment.likesCount = data.new_likes_count;
            }
        },

        /**Жалоба на пост
         * @param {number} postId
         * @param {string} text
         */
        async postComplaint(postId, text = null) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            };
            const url = api.makePost + '/' + postId + '/complaint';
            await fetchWithInterceptors(url, options);
        },

        /**Жалоба на комментарий
         * @param {number} commentId
         * @param {string} text
         */
        async commentComplaint(commentId, text = null) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            };
            const url = api.comments + commentId + '/complaint';
            await fetchWithInterceptors(url, options);
        },

        /**Удаление поста
         * @param {number} postId,
         */
        async deletePost(postId) {
            const options = {
                method: 'DELETE',
            };
            const url = api.makePost + '/' + postId;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) this.userPostsMap.delete(postId);
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
                let post = this.userPostsMap.get(postId);
                post.commentsCount -= 1;
                post.comments.delete(commentId);
            }
        },
        /**Поиск пользователя по username или dispayName
         * @param {string} searchString
         */
        async getUsersByName(searchString) {
            const options = {
                method: 'GET',
            };
            let url = api.searchUser + '?name_part=' + searchString;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        },
        /**Жалоба на пользователя
         * @param {number} userId
         * @param {string} text
         */
        async userComplaint(userId, text = null) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            };
            const url = api.user + userId + '/complaint';
            await fetchWithInterceptors(url, options);
        },
        /**Получить популярных пользователей
         * @param {string} usersCount
         */
        async getTopUsers(usersCount) {
            const options = {
                method: 'GET',
            };
            let url = api.topUsers + '?count=' + usersCount;
            const response = await fetchWithInterceptors(url, options);
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        },
    },
});
