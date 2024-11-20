<template>
    <div class="flex">
        <div
            class="mr-2"
            style="min-width: 3rem; text-align: center"
        >
            <p-avatar
                id="avatar"
                :image="avatarImage"
                class="align-content-center"
                shape="circle"
                :size="!shortTextField ? 'large' : 'normal'"
                style="background-color: #e2e8f0"
                :pt="{
                    root: {
                        style: avatarStyle,
                    },
                    image: {
                        style: avatarStyle,
                    },
                }"
            ></p-avatar>
        </div>
        <div class="flex flex-column gap-3 mt-1 w-full">
            <div>
                <p-textarea
                    :placeholder="textAreaPlaceholder"
                    :rows="shortTextField ? 2 : 8"
                    cols="15"
                    maxlength="1024"
                    variant="filled"
                    class="border-round-md w-full h-full"
                    style="resize: none; font-weight: 500"
                    :style="areaStyle"
                    :value="textAreaText"
                    :pt="{
                        root: {
                            style: {
                                '--p-focus-ring-color': '#2d6557',
                            },
                        },
                    }"
                    @input="blockButton($event.target.value)"
                ></p-textarea>
            </div>
            <img
                v-if="postImages"
                :src="postImages"
            />
        </div>
    </div>
    <div
        class="flex justify-content-end align-items-center mr-2 mt-2"
        style="padding: '0 1.5rem 0.1rem 1.5rem'"
    >
        <p-file-upload
            v-if="!hiddenImage"
            class="border-round-3xl"
            mode="basic"
            accept=".jpg"
            :max-file-size="4194304"
            :auto="true"
            custom-upload
            choose-label=" "
            style="
                background-color: inherit;
                color: #000000;
                border: none;
                height: 3rem;
            "
            :pt="{
                root: {
                    class: 'flex justify-content-center flex-column',
                },
                chooseButton: {
                    class: 'flex justify-content-center align-items-center',
                    style: { 'align-self': 'center' },
                },
                chooseIcon: {},
            }"
            @uploader="setImage"
        >
        </p-file-upload>
        <p-button
            v-if="this.postImages"
            style="color: #707276; font-size: 12px"
            icon="pi pi-times"
            text
            @click="clearImage"
        ></p-button>
        <p-button
            class="border-round-3xl"
            style="
                background-color: #2d6557;
                border-color: #2d6557;
                padding: 0.3rem 1rem;
                font-size: 17px;
                height: 2.7rem;
                font-weight: bold;
                align-items: center;
                width: 13rem;
            "
            :style="kvakStyle"
            :disabled="isBlockedPost"
            :label="isComplaint ? 'Наквакать' : 'Квакнуть'"
            @click="closePostMenuAndPost()"
        >
        </p-button>
    </div>
</template>
<script>
import { useAuthStore } from '@/store/Auth';
import { mapState } from 'pinia';
export default {
    name: 'NewPostBody',
    emits: ['closePostMenuAndPost', 'sendComplaint'],
    props: {
        textAreaPlaceholder: { type: String, default: 'Что нового за день?' },
        hiddenImage: Boolean,
        shortTextField: Boolean,
        isComplaint: Boolean,
    },
    data() {
        return {
            textAreaText: null,
            postImages: null,
        };
    },
    methods: {
        closePostMenuAndPost() {
            if (this.isComplaint) {
                this.$emit('sendComplaint', this.textAreaText);
            } else {
                this.$emit(
                    'closePostMenuAndPost',
                    this.textAreaText,
                    this.postImages
                );
            }
            this.textAreaText = null;
        },
        setImage(event) {
            const file = event.files[0];
            this.postImages = file.objectURL;
        },
        clearImage() {
            this.postImages = null;
        },
        blockButton(value) {
            this.textAreaText = value;
        },
    },
    computed: {
        ...mapState(useAuthStore, ['user', 'getUserImage']),
        isBlockedPost() {
            return (
                !this.textAreaText &&
                (!this.postImages || this.hiddenImage) &&
                !this.isComplaint
            );
        },
        avatarImage() {
            return this.user?.profileImageId
                ? this.getUserImage
                : 'images/avatar.svg';
        },
        areaStyle() {
            let style = '';
            style += this.shortTextField
                ? 'font-size: 16px;'
                : 'font-size: 20px;';
            return style;
        },
        avatarStyle() {
            let style = { width: '3rem', height: '3rem' };
            if (this.shortTextField) {
                (style.width = '2.5rem'), (style.height = '2.5rem');
            }
            return style;
        },
        kvakStyle() {
            let style = '';
            if (this.shortTextField) {
                style += 'font-size: 15px; height: 1.8rem; width: 10rem';
            }
            return style;
        },
    },
};
</script>
