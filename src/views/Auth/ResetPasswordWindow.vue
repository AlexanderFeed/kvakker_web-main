<template>
    <auth-base>
        <template #previous_page_link>
            <previous-page-link
                v-if="sentEmail"
                link="/reset"
            >
            </previous-page-link>
        </template>
        <template #default>
            <change-password></change-password>
        </template>
    </auth-base>
</template>
<script>
import ChangePassword from '@/components/Auth/PasswordReset/ChangePassword.vue';
import AuthBase from '@/components/Auth/AuthBase.vue';
export default {
    name: 'ResetPasswordWindow',
    components: { ChangePassword, AuthBase },
};
</script>
