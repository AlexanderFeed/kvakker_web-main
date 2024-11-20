<template>
    <div
        class="flex justify-content-center"
        style="width: 100%; background-color: #ffffff"
    >
        <div
            class="flex flex-column gap-3 mx-3 w-2"
            style="height: 100vh; min-width: 250px"
        >
            <div>
                <p-button
                    style="background-color: inherit; border: none"
                    @click="navigation('/feed')"
                >
                    <svg
                        width="27"
                        height="28"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M19.2539 23.1585L11.8485 29.6213V48H0V0H11.8485V25.8513L41.9411 0H46.2496L28.2076 15.2819L47.0575 48H33.5259L19.2539 23.1585ZM8.8864 2.82749H2.96213V45.1725H8.8864V2.82749ZM35.2763 45.1725H42.2777L26.2553 17.1669L21.4081 21.2735L35.2763 45.1725Z"
                            fill="black"
                        />
                    </svg>
                </p-button>
            </div>
            <div
                class="flex flex-column justify-content-between"
                style="height: 100%"
            >
                <div class="w-full">
                    <p-button
                        :class="
                            this.$route.params.pageName === 'feed'
                                ? 'green'
                                : 'black'
                        "
                        @click="
                            {
                                navigation('/feed');
                            }
                        "
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.6875 25.5H3.3125C1.7625 25.5 0.5 24.2375 0.5 22.6875V3.3125C0.5 1.7625 1.7625 0.5 3.3125 0.5H22.6875C24.2375 0.5 25.5 1.7625 25.5 3.3125V22.6875C25.5 24.2375 24.2375 25.5 22.6875 25.5ZM3.3125 2.375C2.795 2.375 2.375 2.79625 2.375 3.3125V22.6875C2.375 23.2038 2.795 23.625 3.3125 23.625H22.6875C23.205 23.625 23.625 23.2038 23.625 22.6875V3.3125C23.625 2.79625 23.205 2.375 22.6875 2.375H3.3125Z"
                                fill="#0F1419"
                            />
                            <path
                                d="M19.25 8.80005H6.75C6.2325 8.80005 5.8125 8.3788 5.8125 7.86255C5.8125 7.3463 6.2325 6.92505 6.75 6.92505H19.25C19.7675 6.92505 20.1875 7.3438 20.1875 7.86255C20.1875 8.3813 19.7675 8.80005 19.25 8.80005ZM19.25 13.9375H6.75C6.2325 13.9375 5.8125 13.5175 5.8125 13C5.8125 12.4825 6.2325 12.0625 6.75 12.0625H19.25C19.7675 12.0625 20.1875 12.4825 20.1875 13C20.1875 13.5175 19.7675 13.9375 19.25 13.9375ZM13 19.075H6.75C6.2325 19.075 5.8125 18.6563 5.8125 18.1375C5.8125 17.6188 6.2325 17.2 6.75 17.2H13C13.5175 17.2 13.9375 17.6213 13.9375 18.1375C13.9375 18.6538 13.5175 19.075 13 19.075Z"
                                fill="#0F1419"
                            />
                        </svg>

                        <span
                            style="
                                font-weight: 700;
                                font-size: 19px;
                                margin-left: 1.5rem;
                                overflow: hidden;
                            "
                        >
                            Стена
                        </span>
                    </p-button>
                    <p-button
                        :class="
                            this.$route.params.pageName === 'notifications'
                                ? 'green'
                                : 'black'
                        "
                        @click="navigation('/notifications')"
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M25.1212 18.585C25.0962 18.565 22.4462 16.535 22.4925 11.0475C22.5175 7.88247 21.4775 5.06998 19.5587 3.12873C17.84 1.38748 15.5125 0.424976 13.0062 0.412476H12.99C10.485 0.424976 8.15748 1.38748 6.43748 3.12998C4.51998 5.07123 3.47748 7.88247 3.50498 11.0475C3.55123 16.46 0.979984 18.5062 0.877484 18.585C0.552484 18.8262 0.419984 19.2475 0.546234 19.6325C0.673734 20.0175 1.03373 20.2762 1.43623 20.2762H7.58623C7.71373 23.1637 10.0825 25.4762 12.9987 25.4762C15.915 25.4762 18.2812 23.1637 18.4075 20.2762H24.56C24.9625 20.2762 25.3225 20.0187 25.4475 19.6337C25.5762 19.25 25.4437 18.8275 25.1187 18.5862L25.1212 18.585ZM13 23.5975C11.1187 23.5975 9.58748 22.1262 9.46498 20.275H16.535C16.41 22.125 14.8812 23.6 13 23.6V23.5975ZM3.47498 18.4C4.39998 16.985 5.40998 14.615 5.37998 11.03C5.35748 8.32997 6.18498 6.05248 7.77123 4.44623C9.13748 3.06248 10.9962 2.29623 13 2.28748C15.0037 2.29748 16.8587 3.06248 18.225 4.44748C19.8125 6.05373 20.6412 8.32998 20.6187 11.0312C20.5887 14.6162 21.6 16.9875 22.525 18.4012H3.47498V18.4Z"
                                fill="#0F1419"
                            />
                        </svg>

                        <span
                            style="
                                font-weight: 700;
                                font-size: 19px;
                                margin-left: 1.5rem;
                            "
                        >
                            Уведомления
                        </span>
                    </p-button>
                    <p-button
                        :class="isMyProfile ? 'green' : 'black'"
                        @click="navigation('/myprofile')"
                    >
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 22 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.9998 12.7699C12.6935 12.7699 14.5898 12.5824 15.7998 11.1999C16.8173 10.0374 17.1473 8.23995 16.8073 5.70995C16.3323 2.1787 14.161 0.0699463 10.9998 0.0699463C7.83851 0.0699463 5.66726 2.1787 5.19226 5.71245C4.85226 8.23995 5.18226 10.0374 6.19976 11.1999C7.40976 12.5837 9.30601 12.7699 10.9998 12.7699ZM7.04976 5.95995C7.25226 4.45995 8.03351 1.94495 10.9998 1.94495C13.966 1.94495 14.7473 4.4612 14.9498 5.95995C15.2085 7.89745 15.021 9.2437 14.3873 9.9662C13.8185 10.6162 12.8048 10.8949 10.9998 10.8949C9.19476 10.8949 8.18101 10.6162 7.61226 9.9662C6.97851 9.2437 6.79101 7.8962 7.04976 5.95995ZM21.3498 22.0449C20.2535 17.6374 15.9973 14.5574 10.9998 14.5574C6.00226 14.5574 1.74601 17.6374 0.64976 22.0449C0.434759 22.9099 0.614759 23.7949 1.14351 24.4699C1.65351 25.1199 2.44351 25.4949 3.30976 25.4949H18.6898C19.556 25.4949 20.346 25.1199 20.856 24.4699C21.386 23.7949 21.5648 22.9112 21.3485 22.0449H21.3498ZM19.3798 23.3149C19.2223 23.5149 18.9848 23.6224 18.6898 23.6224H3.30976C3.01601 23.6224 2.77726 23.5162 2.61976 23.3149C2.44851 23.0974 2.39476 22.7999 2.46976 22.4974C3.35726 18.9287 6.86601 16.4349 10.9998 16.4349C15.1335 16.4349 18.6423 18.9274 19.5298 22.4974C19.6048 22.7999 19.551 23.0974 19.3798 23.3149Z"
                                fill="#0F1419"
                            />
                        </svg>

                        <span
                            style="
                                font-weight: 700;
                                font-size: 19px;
                                margin-left: 1.5rem;
                            "
                        >
                            Мой профиль
                        </span>
                    </p-button>
                    <p-button
                        :class="
                            this.$route.params.pageName === 'settings'
                                ? 'green'
                                : 'black'
                        "
                        @click="navigation('/settings')"
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.625 11.8125C18.4187 11.8125 17.4375 12.7962 17.4375 14C17.4375 15.2037 18.4175 16.1875 19.625 16.1875C20.83 16.1875 21.8125 15.205 21.8125 14C21.8125 12.795 20.83 11.8125 19.625 11.8125ZM19.625 14.9375C19.1075 14.9375 18.6875 14.5175 18.6875 14C18.6875 13.4837 19.1088 13.0625 19.625 13.0625C20.1412 13.0625 20.5625 13.4825 20.5625 14C20.5625 14.5162 20.1425 14.9375 19.625 14.9375ZM14 11.8125C12.7925 11.8125 11.8125 12.7962 11.8125 14C11.8125 15.2037 12.7937 16.1875 14 16.1875C15.2063 16.1875 16.1875 15.205 16.1875 14C16.1875 12.795 15.2075 11.8125 14 11.8125ZM14 14.9375C13.4825 14.9375 13.0625 14.5175 13.0625 14C13.0625 13.4837 13.4837 13.0625 14 13.0625C14.5162 13.0625 14.9375 13.4825 14.9375 14C14.9375 14.5162 14.5175 14.9375 14 14.9375ZM8.375 11.8125C7.16875 11.8125 6.1875 12.7962 6.1875 14C6.1875 15.2037 7.16875 16.1875 8.375 16.1875C9.58 16.1875 10.5625 15.205 10.5625 14C10.5625 12.795 9.57875 11.8125 8.375 11.8125ZM8.375 14.9375C7.8575 14.9375 7.4375 14.5175 7.4375 14C7.4375 13.4837 7.85875 13.0625 8.375 13.0625C8.89125 13.0625 9.3125 13.4825 9.3125 14C9.3125 14.5162 8.8925 14.9375 8.375 14.9375Z"
                                fill="#0F1419"
                            />
                            <path
                                d="M14 27.4375C6.59 27.4375 0.5625 21.41 0.5625 14C0.5625 6.59 6.59 0.5625 14 0.5625C21.41 0.5625 27.4375 6.59 27.4375 14C27.4375 21.41 21.41 27.4375 14 27.4375ZM14 2.4375C7.625 2.4375 2.4375 7.625 2.4375 14C2.4375 20.375 7.625 25.5625 14 25.5625C20.375 25.5625 25.5625 20.375 25.5625 14C25.5625 7.625 20.375 2.4375 14 2.4375Z"
                                fill="#0F1419"
                            />
                        </svg>

                        <span
                            style="
                                font-weight: 700;
                                font-size: 19px;
                                margin-left: 1.5rem;
                            "
                        >
                            Настройки
                        </span>
                    </p-button>
                    <p-button
                        class="border-round-3xl w-full mt-3"
                        style="
                            background-color: #2d6557;
                            border-color: #2d6557;
                            padding: 0.3rem 1rem;
                            height: 3rem;
                            font-size: 15px;
                        "
                        label="Квакнуть"
                        @click="visiblePostMenu = true"
                    >
                    </p-button>
                </div>
                <div class="flex m-1">
                    <div class="flex align-self-end">
                        <div>
                            <p-avatar
                                id="avatar"
                                :image="avatarImage"
                                class="align-content-center"
                                shape="circle"
                                size="large"
                                style="
                                    background-color: #e2e8f0;
                                    min-width: 3rem;
                                "
                            ></p-avatar>
                        </div>
                        <div
                            class="flex flex-column mx-3 m-1"
                            style="align-items: start"
                        >
                            <span style="font-weight: 700">
                                {{ getDisplayName() }}
                            </span>
                            <span style="color: #5b7083; font-weight: 500">
                                @{{ getUserName() }}
                            </span>
                        </div>
                    </div>
                    <div
                        class="flex-column justify-content-center"
                        style="margin-left: -2rem"
                    >
                        <div class="mb-1">
                            <p-button
                                class="border-round-3xl"
                                :class="{ 'error-hidden': !dotsClick }"
                                style="
                                    background-color: #ced2d4;
                                    border-color: #ced2d4;
                                    padding: 1rem 3rem;
                                    height: 2.3rem;
                                    font-size: 15px;
                                    justify-content: left;
                                    font-weight: 700;
                                "
                                label="Выйти"
                                @click="click"
                            ></p-button>
                        </div>
                        <div class="flex justify-content-center">
                            <p-button
                                class="border-round-3xl mb-3"
                                style="
                                    background-color: inherit;
                                    color: #000000;
                                    border: none;
                                    height: 3rem;
                                "
                                @click="dotsClick = !dotsClick"
                            >
                                <svg
                                    width="19"
                                    height="5"
                                    viewBox="0 0 19 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.6875 0.09375C14.3606 0.09375 13.2812 1.17587 13.2812 2.5C13.2812 3.82413 14.3593 4.90625 15.6875 4.90625C17.013 4.90625 18.0938 3.8255 18.0938 2.5C18.0938 1.1745 17.013 0.09375 15.6875 0.09375ZM15.6875 3.53125C15.1182 3.53125 14.6562 3.06925 14.6562 2.5C14.6562 1.93212 15.1196 1.46875 15.6875 1.46875C16.2554 1.46875 16.7188 1.93075 16.7188 2.5C16.7188 3.06787 16.2568 3.53125 15.6875 3.53125ZM9.5 0.09375C8.17175 0.09375 7.09375 1.17587 7.09375 2.5C7.09375 3.82413 8.17313 4.90625 9.5 4.90625C10.8269 4.90625 11.9062 3.8255 11.9062 2.5C11.9062 1.1745 10.8282 0.09375 9.5 0.09375ZM9.5 3.53125C8.93075 3.53125 8.46875 3.06925 8.46875 2.5C8.46875 1.93212 8.93213 1.46875 9.5 1.46875C10.0679 1.46875 10.5312 1.93075 10.5312 2.5C10.5312 3.06787 10.0693 3.53125 9.5 3.53125ZM3.3125 0.09375C1.98563 0.09375 0.90625 1.17587 0.90625 2.5C0.90625 3.82413 1.98563 4.90625 3.3125 4.90625C4.638 4.90625 5.71875 3.8255 5.71875 2.5C5.71875 1.1745 4.63663 0.09375 3.3125 0.09375ZM3.3125 3.53125C2.74325 3.53125 2.28125 3.06925 2.28125 2.5C2.28125 1.93212 2.74462 1.46875 3.3125 1.46875C3.88037 1.46875 4.34375 1.93075 4.34375 2.5C4.34375 3.06787 3.88175 3.53125 3.3125 3.53125Z"
                                        fill="#0F1419"
                                    />
                                </svg>
                            </p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="flex mt-1 flex-column gap-4 w-8 mx-3 mt-3"
            style="max-width: 800px; max-height: 95vh"
        >
            <div
                class="text-center"
                style="font-weight: 700"
            >
                kvakker
            </div>
            <feed v-if="currentPathPage === 'feed'"></feed>
            <profile-user v-if="currentPathPage === 'profile'"></profile-user>
            <notifications
                v-if="currentPathPage === 'notifications'"
            ></notifications>
            <settings v-if="currentPathPage === 'settings'"> </settings>
        </div>
        <div
            class="w-3"
            style="min-width: 250px"
        >
            <recomendations-main></recomendations-main>
        </div>
    </div>
    <p-dialog
        v-model:visible="visiblePostMenu"
        :draggable="false"
        modal
        style="width: 30rem; height: 21.5rem"
        :pt="{
            title: {
                class: '',
                style: {},
            },
            header: { class: 'p-2' },
            content: { style: { padding: '0 1.5rem 0 1.5rem' } },
        }"
    >
        <template #header>
            <div
                class="text-center w-full my-2"
                style="font-size: 20px; font-weight: 700; color: #000000"
            >
                Новый квак
            </div>
        </template>
        <new-post-body @close-post-menu-and-post="closePostMenuAndPost">
        </new-post-body>
    </p-dialog>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import { useAuthStore } from '@/store/Auth.js';
import Feed from '@/components/Feed.vue';
import Notifications from '@/components/Notifications.vue';
import ProfileUser from '@/components/ProfileUser.vue';
import Settings from '@/components/Settings.vue';
import { useUserStore } from '@/store/User.js';
import NewPostBody from '@/components/Profil/Posts/NewPostBody.vue';
import RecomendationsMain from '@/components/Recomendations/RecomendationsMain.vue';
export default {
    name: 'PageMain',
    components: {
        Feed,
        Notifications,
        ProfileUser,
        Settings,
        NewPostBody,
        RecomendationsMain,
    },
    data() {
        return {
            dotsClick: false,
            imageAvatar: '',
            visiblePostMenu: false,
            pathUplaodIcon: '',
            clicked: false,
            textAreaText: null,
            postImages: null,
            imagesId: null,
        };
    },

    methods: {
        ...mapActions(useAuthStore, ['clearUser', 'getCredent']),
        ...mapActions(useUserStore, ['setUser', 'makePost']),
        ...mapActions(useAuthStore, ['uploadImage']),
        click() {
            localStorage.clear();
            // this.clearUser();
            this.$router.push('/login');
        },
        getUserName() {
            return this.user?.userName;
        },
        getDisplayName() {
            return this.user?.displayName;
        },

        async navigation(route) {
            if (route == '/myprofile'){
                if (!this.isMyProfile) {
                    await this.setUser(this.user);}
                    this.$router.push(
                        '/pages/' + this.user?.userId + '/profile/base'
                    );
                }else this.$router.push('/pages/' + this.user?.userId + route);
        },
        async closePostMenuAndPost(textAreaText, postImages) {
            this.visiblePostMenu = false;
            if (postImages) {
                let blob = await fetch(postImages).then((r) => r.blob());
                this.imagesId = await this.uploadImage(blob);
            }
            const payload = {
                text: textAreaText ? textAreaText : null,
                imageId: this.imagesId,
            };
            await this.makePost(payload, this.user.userId);
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user', 'getUserImage']),
        ...mapState(useUserStore, { notMe: 'user' }),
        currentPathPage() {
            if (this.$route.params.blockProfile) return 'profile';
            return this.$route.params.pageName;
        },
        avatarImage() {
            return this.user?.profileImageId
                ? this.getUserImage
                : 'images/avatar.svg';
        },
        isMyProfile() {
            return (
                this.$route.name == 'profile-blocks' &&
                this.user?.userId == this.$route.params.userId
            );
        },
    },
    async mounted() {
        if (!this.user) {
            await this.getCredent();
        }
        if (this.user?.userId == this.$route.params.userId)
            await this.setUser(this.user);
    },
};
</script>
<style scoped>
.error-hidden {
    visibility: hidden;
}
.black {
    color: #000000;
    background-color: inherit;
    border: none;
    height: 3rem;
    justify-content: left;
}
.green {
    color: #2d6557;
    background-color: inherit;
    border: none;
    height: 3rem;
    justify-content: left;
}
</style>
