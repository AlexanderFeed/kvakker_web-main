const baseUrl = process.env.VUE_APP_API;
//const baseUrl = 'http://192.168.0.14:80/api/v1/';

export default Object.freeze({
    authLogin: baseUrl + 'auth/login',
    uploadImage: baseUrl + 'images/upload',
    registration: baseUrl + 'auth/register',
    credentByToken: baseUrl + 'users/me',
    getImage: baseUrl + 'images/',
    user: baseUrl + 'users/',
    refreshAuth: baseUrl + 'auth/refresh',
    makePost: baseUrl + 'posts',
    posts: baseUrl + 'posts/',
    notifications: baseUrl + 'notifications/my?',
    feed: baseUrl + 'feed/',
    comments: baseUrl + 'comments/',
    searchUser: baseUrl + 'users/search',
    sendMsgRes: baseUrl + 'auth/send_password_reset',
    doReset: baseUrl + 'auth/do_password_reset',
    topUsers: baseUrl + 'users/top',
});
