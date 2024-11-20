export default class UserData {
    userId;
    userName;
    displayName;
    isBanned;
    profileImageId;
    email;
    isEmailConfirmed;
    isAdmin;
    accessToken;
    refreshToken;
    subscriptionsCount;
    subscribersCount;
    constructor(data) {
        this.userId = data?.user_id ?? null;
        this.userName = data?.user_name ?? null;
        this.email = data?.email ?? null;
        this.displayName = data?.display_name ?? null;
        this.isEmailConfirmed = data?.is_email_confirmed ?? null;
        this.isAdmin = data?.is_admin ?? null;
        this.isBanned = data?.is_banned ?? null;
        this.profileImageId = data?.profile_image_id ?? null;
        this.accessToken = data?.access_token ?? null;
        this.refreshToken = data?.refresh_token ?? null;
        this.subscriptionsCount = data?.subscriptions_count ?? null;
        this.subscribersCount = data?.subscribers_count ?? null;
    }
}
