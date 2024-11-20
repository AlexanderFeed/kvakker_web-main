<template>
    <div class="container flex justify-content-center mt-7 auth-body">
        <div
            class="surface-card w-30rem align-content-center shadow-2 border-round-md"
        >
            <main>
                <div
                    class="mt-6 text-center pb-4 grid mx-5"
                    style="display: grid"
                >
                    <slot name="previous_page_link">
                        <previous-page-link link="/login"></previous-page-link>
                    </slot>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style="
                            grid-column: 1/2;
                            grid-row: 1/2;
                            justify-self: center;
                        "
                    >
                        <path
                            d="M19.2539 23.1585L11.8485 29.6213V48H0V0H11.8485V25.8513L41.9411 0H46.2496L28.2076 15.2819L47.0575 48H33.5259L19.2539 23.1585ZM8.8864 2.82749H2.96213V45.1725H8.8864V2.82749ZM35.2763 45.1725H42.2777L26.2553 17.1669L21.4081 21.2735L35.2763 45.1725Z"
                            fill="black"
                        />
                    </svg>
                </div>

                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
import PreviousPageLink from '@/components/Auth/PreviousPageLink.vue';
export default {
    name: 'AuthView',
    components: {
        PreviousPageLink,
    },
    data() {
        return {};
    },
    methods: {
        getPreviousPagePath() {
            return this.$router.options.history.state.back;
        },
        isLoginForm() {
            return window.location.href.endsWith('login');
        },
    },
};
</script>

<style>
body {
    background-color: #2d6557;
    align-content: center;
}
.main__link {
    grid-column: 1/2;
    grid-row: 1/2;
    justify-self: left;
    text-decoration: none;
}

.main__link:link {
    color: #44474b99;
}

.main__link:visited {
    color: #44474b99;
}
</style>
