<template>
    <div
        class="text-center font-bold text-lg"
        style="color: rgba(15, 20, 25, 1)"
    >
        {{ title }}
    </div>
    <div class="mt-5">
        <div
            v-for="user in users"
            :key="user"
            class="mt-4"
        >
            <profil-name
                :user-info="user"
                :is-subscription="true"
                @go-user-profil="goToProfilUser"
            ></profil-name>
        </div>
        <div v-if="!users?.length">
            Нет {{ title === 'Подписчики' ? 'подписчиков' : 'подписок' }}
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import ProfilName from './ProfilName.vue';
import { useUserStore } from '@/store/User.js';
import { useAuthStore } from '@/store/Auth';
export default {
    name: 'SubscribeUser',
    components: { ProfilName },
    emits: ['goToStartProfil'],
    props: {
        title: String,
        users: Array,
    },
    methods: {
        ...mapActions(useUserStore, ['setUser']),
        goToProfilUser(user) {
            this.setUser(user);
            this.$router.push('/pages/' + user.userId + '/profile/base');
        },
    },
    computed: {
        ...mapState(useAuthStore, { authUser: 'user' }),
    },
};
</script>
