<template>
    <div>
        <div
            v-for="post in userPosts"
            :key="post"
            class="mt-4"
        >
            <p-card>
                <template #content>
                    <div>
                        <full-post-vue
                            :post="post"
                            :is-feed="isFeed"
                        ></full-post-vue>
                    </div>
                </template>
            </p-card>
        </div>
    </div>
</template>
<script>
import FullPostVue from './FullPost.vue';
export default {
    name: 'PostList',
    components: {
        FullPostVue,
    },
    props: {
        userPosts: Array,
        isFeed: Boolean,
    },
};
</script>
