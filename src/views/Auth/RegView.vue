<template>
    <auth-base>
        <template #previous_page_link><span></span></template>
        <template #default>
            <reg-new></reg-new>
        </template>
    </auth-base>
</template>
<script>
import RegNew from '@/components/Auth/RegNew.vue';
import AuthBase from '@/components/Auth/AuthBase.vue';
export default {
    name: 'RegView',
    components: {
        RegNew,
        AuthBase,
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
    },
};
</script>
