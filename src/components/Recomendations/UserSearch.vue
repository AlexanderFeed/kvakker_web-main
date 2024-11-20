<template>
    <div id="main_container">
        <div class="input_container">
            <input
                id="search"
                type="input"
                class="search_input"
                placeholder="Поиск пользователя"
            >
        </div>
        <div class="users_list">
            <div
                v-for="(user, index) in currentDisplayedUsers"
                :key="index"
                class="user_container flex m-2"
                @click="goToUserPage(user.user_id)"
            >
                <p-avatar
                    id="avatar"
                    :image="getUserImage(user.profile_image_id)"
                    class="align-content-center user_avatar"
                    size="large"
                    shape="circle"
                    style="background-color: #b9b9b9"
                >
                </p-avatar>
                <div class="flex flex-column ml-3 justify-content-around">
                    <span
                        v-if="user.display_name.length < 19"
                        class="display_name"
                        >{{ user.display_name }}
                    </span>
                    <span
                        v-else
                        class="display_name"
                        >{{ user.display_name.slice(0, 16) }}...
                    </span>
                    <span
                        v-if="user.user_name.length < 19"
                        class="username"
                    >
                        @{{ user.user_name }}
                    </span>
                    <span
                        v-else
                        class="username"
                    >
                        @{{ user.user_name.slice(0, 16) }}...
                    </span>
                </div>
            </div>
            <button
                v-if="
                    this.currentFoundUsers.length !==
                        this.currentDisplayedUsers.length &&
                    this.currentFoundUsers.length
                "
                class="m-2 show_more_button"
                @click="showMore"
            >
                Показать больше
            </button>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import { useUserStore } from '@/store/User.js';
import { mapActions } from 'pinia';
export default {
    name: 'UserSearch',
    data() {
        return {
            currentFoundUsers: [],
            currentDisplayedUsers: [],
            displayedUsersMaxCount: 5,
            currentPage: 0,
        };
    },
    methods: {
        ...mapActions(useUserStore, [
            'getUsersByName',
            'getUserData',
            'setUser',
        ]),
        async searchUsers(searchString) {
            if (searchString) {
                this.currentPage = 0;
                this.currentFoundUsers =
                    await this.getUsersByName(searchString);
                this.currentDisplayedUsers = this.currentFoundUsers.slice(
                    this.currentPage * this.displayedUsersMaxCount,
                    this.currentPage * this.displayedUsersMaxCount +
                        this.displayedUsersMaxCount
                );
            } else {
                this.currentPage = 0;
                this.currentFoundUsers = [];
                this.currentDisplayedUsers = [];
            }
        },
        getUserImage(userImageId = null) {
            return userImageId
                ? api.getImage + userImageId
                : 'images/avatar.svg';
        },
        async showMore() {
            this.currentPage += 1;
            this.currentDisplayedUsers = [
                ...this.currentDisplayedUsers,
                ...this.currentFoundUsers.slice(
                    this.currentPage * this.displayedUsersMaxCount,
                    this.currentPage * this.displayedUsersMaxCount +
                        this.displayedUsersMaxCount
                ),
            ];
        },
        goToUserPage(userId) {
            const user = this.getUserData(userId);
            this.setUser(user);
            this.$router.push('/pages/' + userId + '/profile/base');
        },
    },
    watch: {
        currentFoundUsers(usersList) {
            let searchInput = document.getElementById('search');
            let mainContainer = document.getElementById('main_container');
            if (usersList.length) {
                searchInput.classList.add('active');
                mainContainer.classList.add('active_main_container');
            } else {
                searchInput.classList.remove('active');
                mainContainer.classList.remove('active_main_container');
            }
        },
    },
    mounted() {
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            this.searchUsers(searchInput.value);
        });
    },
};
</script>
<style scoped>
input {
    padding: 12px;
    background: rgba(235, 238, 240, 1);
    border-radius: 99px;
    outline: none;
}

.input_container {
    display: flex;
    margin: 0 0 30px;
    background: rgba(235, 238, 240, 1);
    border-radius: 99px;
}

.search_input {
    padding-left: 40px;
    width: 100%;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    background: rgba(235, 238, 240, 1);
    background: transparent url('../../assets/search.svg') no-repeat 13px center;
}

.active {
    border-bottom: 1px solid rgba(45, 101, 87, 1);
    border-top-left-radius: 99px;
    border-top-right-radius: 99px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}
.active_main_container {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: rgba(235, 238, 240, 1);
}
.users_list {
    background: rgba(235, 238, 240, 1);
    overflow: hidden;
}
.display_name {
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
    color: rgba(15, 20, 25, 1);
}
.username {
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.36px;
    letter-spacing: -0.017em;
    text-align: left;
    color: rgba(91, 112, 131, 1);
}
.show_more_button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font: inherit;
    font-family: Inter;
    font-size: 15px;
    font-weight: 500;
    line-height: 18.15px;
    text-align: left;
    color: rgba(45, 101, 87, 1);
}
.user_container {
    cursor: pointer;
}
.user_avatar {
    min-width: 3rem;
    min-height: 3rem;
}
</style>
