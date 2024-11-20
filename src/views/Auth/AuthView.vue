<template>
    <auth-base>
        <template #previous_page_link><span></span></template>
        <template #default>
            <auth-login></auth-login>
        </template>
    </auth-base>
</template>
<script>
import AuthLogin from '@/components/Auth/AuthLogin.vue';
import AuthBase from '@/components/Auth/AuthBase.vue';
export default {
    name: 'AuthView',
    components: {
        AuthLogin,
        AuthBase,
    },
};
</script>
