<template>
    <div
        :id="id"
        class="popup"
    >
        <div class="popup__body">
            <div class="popup__content">
                <div
                    class="container flex justify-content-center mt-7 auth-body"
                    style="
                        display: none;
                        position: fixed;
                        top: 500;
                        left: 0;
                        width: 100%;
                        height: 50%;
                    "
                >
                    <div
                        class="surface-card align-content-center shadow-2 border-round-md"
                        style="width: 40%"
                    >
                        <main style="width: 100%; height: 100%">
                            <div
                                class="mt-6 text-center pb-4 mx-5"
                                style="
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    align-items: center;
                                    height: 60%;
                                "
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style="margin-bottom: 10px;"
                                >
                                    <path
                                        d="M19.2539 23.1585L11.8485 29.6213V48H0V0H11.8485V25.8513L41.9411 0H46.2496L28.2076 15.2819L47.0575 48H33.5259L19.2539 23.1585ZM8.8864 2.82749H2.96213V45.1725H8.8864V2.82749ZM35.2763 45.1725H42.2777L26.2553 17.1669L21.4081 21.2735L35.2763 45.1725Z"
                                        fill="black"
                                    />
                                </svg>
                                <div class="text-center">
                                    <span style="font-size: 24px">
                                        {{ text }}
                                    </span>
                                </div>
                                <p-button
                                    class="border-round-3xl"
                                    style="
                                        background-color: rgba(16, 20, 26, 0.6);
                                        border-color: rgba(16, 20, 26, 0.6);
                                        padding: 0.3rem 1rem;
                                        height: 1.5rem;
                                        font-size: 15px;
                                        width: 50%;
                                    "
                                    label="ОК"
                                    type="button"
                                    @click="closePopup"
                                >
                                </p-button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PopupNotification',
    props: {
        id: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    methods: {
        closePopup() {
            const popup = document.getElementById(this.id);
            popup.style.visibility = 'hidden';
            popup.style.opacity = '0';
        },
    },
};
</script>
<style>
.popup {
    position: fixed;
    width: 30%;
    height: 30%;
    opacity: 0;
    visibility: hidden;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.3s ease 0s;
}
.popup.open {
    opacity: 1;
    visibility: visible;
}
.popup__body {
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
