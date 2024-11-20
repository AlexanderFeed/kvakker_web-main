<template>
    <div class="mx-6 flex flex-column justify-content-center mt-3">
        <div
            class="text-center font-semibold"
            style="color: #707276"
        >
            На указанную почту (если такая имеется) было отправлено письмо с
            дальнейшими указаниями
        </div>
        <div class="w-full text-center my-6">
            <p-button
                class="border-round-3xl w-6"
                style="
                    background-color: rgba(16, 20, 26, 0.6);
                    border-color: #707276;
                    padding: 0.3rem 1rem;
                "
                label="OK"
                @click="goLogin"
            ></p-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EmailMsg',
    methods: {
        goLogin() {
            this.$router.push('/login');
        },
    },
};
</script>
