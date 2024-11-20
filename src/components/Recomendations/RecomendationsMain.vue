<template>
    <user-search class="ml-3 mt-3 mr-8"></user-search>
    <top-users class="ml-3 mt-3 mr-8"></top-users>
</template>
<script>
import UserSearch from '@/components/Recomendations/UserSearch.vue';
import TopUsers from '@/components/Recomendations/TopUsers.vue';
export default {
    name: 'RecomendationMain',
    components: {
        UserSearch,
        TopUsers,
    },
};
</script>
