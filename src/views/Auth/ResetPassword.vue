<template>
    <auth-base>
        <template #previous_page_link>
            <previous-page-link
                v-if="!sentEmail"
                link="/login"
            >
            </previous-page-link>
        </template>
        <template #default>
            <email-sending-input
                v-if="!sentEmail"
                @send="sendEmailMsg"
            ></email-sending-input>
            <email-msg v-if="sentEmail"></email-msg>
        </template>
    </auth-base>
</template>
<script>
import AuthBase from '../../components/Auth/AuthBase.vue';
import EmailMsg from '@/components/Auth/PasswordReset/EmailMsg.vue';
import EmailSendingInput from '@/components/Auth/PasswordReset/EmailSendingInput.vue';
import PreviousPageLink from '@/components/Auth/PreviousPageLink.vue';
export default {
    name: 'ResetPassword',
    components: {
        AuthBase,
        EmailSendingInput,
        EmailMsg,
        PreviousPageLink,
    },
    data() {
        return {
            sentEmail: false,
        };
    },
    methods: {
        sendEmailMsg() {
            this.sentEmail = true;
            //в дальнейшем здесь будет логика отправки письма на почту
        },
    },
};
</script>
