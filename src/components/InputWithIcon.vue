<template>
    <div class="input_with_icon">
        <label
            :for="id"
            class="block mb-3"
            style="color: #10141a99"
        >
            {{ label }}
        </label>
        <input
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            class="mb-2"
            readonly
        >
        <button
            type="button"
            style="border: none; background-color: transparent; cursor: pointer"
        >
            <img
                src="../assets/pencil.svg"
                alt="alt"
            >
        </button>
    </div>
</template>
<script>
export default {
    name: 'InputWithIcon',
    props: {
        id: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: 'text',
        },
        placeholder: {
            type: String,
            required: false,
        },
        label: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            required: false,
        },
    },
    methods: {
        addEvents() {
            const input = document.getElementById(this.id);
            const button = input.nextElementSibling;
            button.addEventListener('click', () => {
                input.removeAttribute('readonly');
                input.focus();
                input.classList.add('active_input');
            });
            input.addEventListener('blur', () => {
                input.classList.remove('active_input');
                input.setAttribute('readonly', true);
            });
        },
    },
    mounted() {
        this.addEvents();
    },
};
</script>
<style>
input {
    border: none;
    padding: 8px;
    border-bottom: 1px solid #ebeef0;
    outline: none;
}
.input_with_icon {
    position: relative;
}

.input_with_icon input {
    padding-right: 30px;
    width: 100%;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
}

.input_with_icon button {
    position: absolute;
    top: 70%;
    right: 5px;
    transform: translateY(-50%);
}

.active_input {
    border: 1px solid rgba(45, 101, 87, 1);
    border-radius: 8px;
}
</style>
