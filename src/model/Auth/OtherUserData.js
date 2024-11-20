import UserData from './UserData.js';
export default class OtherUserData extends UserData {
    areYouSubscribeToUser;
    isUserSubscribedToYou;
    constructor(data) {
        super(data);
        this.areYouSubscribeToUser = data?.are_you_subscribed_to_user ?? false;
        this.isUserSubscribedToYou = data?.is_user_subscribed_to_you ?? false;
    }
}
