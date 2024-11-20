<template>
    <router-link
        :to="link"
        class="main__link"
    >
        &lt;назад
    </router-link>
</template>
<script>
export default {
    name: 'PreviousPageLink',
    props: {
        link: {
            type: String,
            required: false,
            default: '/login',
        },
    },
};
</script>
