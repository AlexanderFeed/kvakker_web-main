export default class UserFromNotif {
    userId;
    userName;
    displayName;
    isBanned;
    profileImageId;
    subscriptionsCount;
    subscribersCount;
    postsCount;
    commentsCount;
    constructor(data) {
        this.userId = data?.user_id ?? null;
        this.userName = data?.user_name ?? null;
        this.displayName = data?.display_name ?? null;
        this.isBanned = data?.is_banned ?? null;
        this.profileImageId = data?.profile_image_id ?? null;
        this.subscriptionsCount = data?.subscriptions_count ?? null;
        this.subscribersCount = data?.subscribers_count ?? null;
        this.postsCount = data?.posts_count ?? null;
        this.commentsCount = data?.comments_count ?? null;
    }
}
