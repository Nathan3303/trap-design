<template>
    <div :class="`form-input-wrap form-input-theme--${theme}`">
        <!-- 输入框标题栏 -->
        <p v-if="label" class="input-label">
            <!-- 标题文字 -->
            <span class="label-text">{{ label }}</span>
            <!-- 输入框内容清除按钮 -->
            <a v-show="inputValue" class="clear-btn" @click="clear()">清除</a>
        </p>
        <!-- 输入框主体 -->
        <main :data-is-focus="focused">
            <!-- 输入框图标 -->
            <i v-if="iconfont" :class="`input-icon iconfont ${iconfont}`"></i>
            <!-- 输入框前置文字 -->
            <span
                v-if="pretext"
                v-show="focused || inputValue"
                class="input-pretext"
                >{{ pretext }}</span
            >
            <!-- 输入框本体 -->
            <input
                class="form-input"
                :type="type"
                :id="id"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :autocomplete="autocomplete"
                v-model="inputValue"
                ref="formInput"
                @focusin="focused = true"
                @focusout="focusOutEventHandler()"
                @keydown.enter="submit()" />
            <a
                class="clear-btn2"
                v-if="!label && inputValue"
                @click.stop="clear">
                <i class="iconfont icon-wrong"></i>
            </a>
        </main>
    </div>
</template>

<script>
export default {
    name: "FormInputComp",
    props: {
        id: String,
        type: { type: String, default: "text" },
        label: String,
        labelSize: { type: String, default: "16px" },
        iconfont: String,
        placeholder: String,
        pretext: String,
        value: String,
        maxlength: Number,
        name: String,
        rmfo: Boolean,
        theme: { type: String, default: "blue" },
        autocomplete: { type: String, default: "off" },
    },
    data() {
        return {
            inputValue: this.value || "",
            focused: false,
            debounceTimer: null,
        };
    },
    methods: {
        clear: function () {
            this.inputValue = "";
            this.focused = false;
            if (this.label) this.submit();
            else
                this.$nextTick(function () {
                    this.$refs.formInput.focus();
                });
        },
        submit: function () {
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            const _this = this;
            this.debounceTimer = setTimeout(function () {
                _this.debounceTimer = null;
                _this.focused = false;
                _this.$emit("put", _this.inputValue, _this.name);
            }, 100);
        },
        focusOutEventHandler: function () {
            this.focused = false;
            if (!this.rmfo) this.submit();
        },
    },
    watch: {
        value: function (value) {
            this.inputValue = value;
        },
    },
};
</script>

<style scoped>
/* form-input-wrap (basic style settings) */
.form-input-wrap {
    display: flex;
    flex-direction: column;
    background: white;
    position: relative;
    box-sizing: border-box;

    & .input-label {
        margin-bottom: 8px;
        font-size: v-bind(labelSize);
        font-weight: 700;
        user-select: none;
        display: flex;
        align-items: center;

        & .label-text {
            flex: auto;
        }

        & .clear-btn {
            font-size: 12px;
            cursor: pointer;
        }
    }

    & main {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 6px 0 12px;
        border: 1px solid #eee;
        box-sizing: border-box;
        border-radius: 6px;
        background: rgb(243, 243, 244);
        transition: all 0.3s ease;

        & .input-icon {
            font-size: 21px;
            margin-right: 10px;
            margin-top: -1px;
            color: var(--primary-bg-clr);
        }

        & .input-pretext {
            font-size: 14px;
            color: black;
            margin-right: 4px;
        }

        & input {
            flex: auto;
            width: 100%;
            min-width: 48px;
            height: 40px;
            border: none;
            outline: none;
            background: none;
            font-size: 14px;
            box-sizing: border-box;
        }

        & .clear-btn2 {
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            cursor: pointer;
            color: #6f6f6f;
            border-radius: 50%;
            flex: none;
            scale: 0.8;
        }
    }
}

/* form-input-theme--blue */
.form-input-theme--blue {
    & .input-label .clear-btn {
        color: var(--primary-bg-clr);

        &:hover {
            color: rgb(243, 72, 42);
        }
    }

    & main {
        &:hover {
            background-color: white;
            box-shadow: 0 0 5px 2px rgb(20, 153, 236);
            border: 1px solid #eee;
        }

        &[data-is-focus="true"] {
            background: white;
            border: 1px solid rgb(20, 153, 236);
            box-shadow: 0 0 5px 2px rgb(20, 153, 236);
        }
    }
}

/* form-input-theme--crystal */
.form-input-theme--crystal {
    & main {
        background: none;
        border: none;
    }
}
</style>
