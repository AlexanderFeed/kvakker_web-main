import UserData from './Auth/UserData.js';

export default class Post {
    postId;
    commentId;
    /**Текст поста */
    text;
    author;
    imageId;
    postDatetime;
    repostedPostId;
    repostedCommentId;
    postType;
    isRemoved;
    /**
     * @type {UserData}
     */
    authorObj;
    repostedPostObj;
    repostedCommentObj;
    likesCount;
    repostsCount;
    commentsCount;
    comments;
    likedBy;
    areYouLike;
    endComments;
    isPostRecomendation;

    constructor(data, userId, isComment = false, isPostRecomendation = false) {
        this.postId = data?.post_id ?? null;
        this.commentId = data?.comment_id ?? null;
        this.text = isComment ? data?.comment_text : data?.text ?? null;
        this.author = isComment
            ? data?.comment_author_id
            : data?.author ?? null;
        this.imageId = data?.image_id ?? null;
        this.postDatetime = isComment
            ? data.comment_datetime
            : data.post_datetime ?? null;
        this.repostedPostId = data.reposted_post_id ?? null;
        this.repostedCommentId = data.reposted_comment_id ?? null;
        this.postType = data.post_type ?? null;
        this.isRemoved = data.is_removed ?? null;
        this.authorObj = data.author_obj ? new UserData(data.author_obj) : null;
        this.repostedPostObj = data.reposted_post_obj
            ? new Post(data.reposted_post_obj, userId)
            : null;
        this.repostedCommentObj = data.reposted_comment_obj
            ? new Post(data.reposted_comment_obj, userId, true)
            : null;
        this.likesCount = data.likes_count ?? null;
        this.repostsCount = data.reposts_count ?? null;
        this.commentsCount = data.comments_count ?? null;
        this.likedBy = data?.liked_by ?? null;
        this.areYouLike = data?.liked_by.includes(userId);
        this.comments = new Map();
        this.endComments = false;
        this.isPostRecomendation = isPostRecomendation;
    }

    setComments(commentList, userId, endComments = false) {
        if (!this.comments.size) {
            this.comments = new Map(
                commentList.map((item) => [
                    item.comment_id,
                    new Post(item, userId, true),
                ])
            );
        } else {
            commentList.forEach((item) => {
                this.comments.set(
                    item.comment_id,
                    new Post(item, userId, true)
                );
            });
        }
        if (endComments) this.endComments = endComments;
    }
    getComments() {
        let array = Array.from(this.comments.values());

        array.sort((a, b) => {
            return new Date(b.postDatetime) - new Date(a.postDatetime);
        });

        // Возвращаем отсортированный массив
        return array;
    }
}
