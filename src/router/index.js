import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/store/Auth.js';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/:catchAll(.*)',
            redirect: '/login',
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Auth/AuthView.vue'),
        },
        {
            path: '/registration',
            name: 'reg',
            component: () => import('@/views/Auth/RegView.vue'),
        },
        {
            path: '/reset',
            name: 'reset',
            component: () => import('@/views/Auth/ResetPassword.vue'),
        },
        {
            path: '/reset/change',
            name: 'reset-pass',
            component: () => import('@/views/Auth/ResetPasswordWindow.vue'),
        },
        {
            path: '/reset_pass:catchAll(.*)',
            name: 'to-reset',
            redirect: '/reset/change',
        },
        {
            path: '/pages/:userId/:pageName',
            name: 'profile',
            component: () => import('@/views/Pages/PageMain.vue'),
        },
        {
            path: '/pages/:userId/profile/:blockProfile',
            name: 'profile-blocks',
            component: () => import('@/views/Pages/PageMain.vue'),
        },
    ],
});
router.beforeEach(async (to) => {
    const loggedIn = localStorage.getItem('accesstoken');
    const authStore = useAuthStore();

    //if (!authStore.user) await authStore.getCredent();
    if (loggedIn && loggedIn !== 'null' && !authStore.user) {
        await authStore.getCredent();
    }
    // if (loggedIn && loggedIn!=='null' && to.name !== 'profile' && to.name !== 'profile-blocks') {
    //     await authStore.getCredent();
    //     return { path: '/pages/' + authStore.user?.userId + '/feed' };
    // }
    if (loggedIn && loggedIn !== 'null') {
        if (!['profile', 'profile-blocks'].includes(to.name)) {
            return { path: `/pages/${authStore.user?.userId}/feed` };
        }
    } else if (!loggedIn || loggedIn === 'null') {
        const allowedRoutes = ['login', 'reg', 'reset', 'reset-pass'];
        if (!allowedRoutes.includes(to.name) || to.fullPath === '/') {
            return { name: 'login' };
        }
    }
});
export default router;
