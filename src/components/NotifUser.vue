<template>
    <div class="flex flex-column gap-3 w-3">
        <div
            v-for="user in getUsers"
            :key="user"
        ></div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/store/Auth.js';
import { useUserStore } from '@/store/User.js';

export default {
    name: 'NotifUser',
    data() {
        return {
            localUsers: null,
            path: 'https://kvakker-dev-back.k-lab.su/api/v1/images/',
            localUser: null,
        };
    },
    methods: {
        ...mapActions(useUserStore, ['setUser']),
        async clickUserName(userId) {
            this.$router.push('/pages/' + userId + '/profile/base');
        },
    },
    computed: {
        ...mapState(useUserStore, ['usersFromN', 'getNotif']),
        ...mapState(useAuthStore, ['user', 'getUserImage']),
        getUsers() {
            this.getNotif();
            return this.usersFromN;
        },
        postText() {
            return this.post?.text;
        },
        userName() {
            return this.user?.userName;
        },
        displayName() {
            return this.user?.displayName;
        },
    },
};
</script>

<style scoped>
.error-hidden {
    visibility: hidden;
}
</style>
