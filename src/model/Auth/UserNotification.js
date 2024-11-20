import UserFromNotif from './UserFromNotif.js';
export default class UserNotification {
    notificationId;
    notificationDatetime;
    notificationType;
    notificationText;
    linkedUserId;
    linkedPostId;
    linkedCommentId;
    linkedUserObj;
    linkedPostObj;
    linkedCommentObj;
    isSeen;
    constructor(data) {
        this.notificationId = data?.notification_id ?? null;
        this.notificationDatetime = data?.notification_datetime ?? null;
        this.notificationType = data?.notification_type ?? null;
        this.notificationText = data?.notification_text ?? null;
        this.linkedUserId = data?.linked_user_id ?? null;
        this.linkedPostId = data?.linked_post_id ?? null;
        this.linkedCommentId = data?.linked_comment_id ?? null;
        this.linkedUserObj = new UserFromNotif(data?.linked_user_obj ?? null);
        this.linkedPostObj = data?.linked_post_obj ?? null;
        this.linkedCommentObj = data?.linked_comment_obj ?? null;
        this.isSeen = data?.is_seen ?? null;
    }
}
