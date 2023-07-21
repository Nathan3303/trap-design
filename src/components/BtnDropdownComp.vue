<template>
    <div class="btn-dropdown-wrap" :class="`btn-dropdown-theme--${theme}`">
        <!-- 按钮 -->
        <a class="control-button" :data-is-dropdown="dropdown" @click.stop="dropdown = !dropdown">
            <!-- 按钮文字 -->
            <span :class="{ unselected: !validPointer }">{{ name }}</span>
            <!-- 按钮状态图标 -->
            <i class="iconfont icon-arrow-down"></i>
        </a>
        <transition name="option-list">
            <!-- 选项列表 -->
            <div class="option-list" v-show="dropdown">
                <a
                    v-for="(item, idx) in options"
                    :key="item.value"
                    :class="{ active: idx == pointer }"
                    @click.prevent="clickHandler($event, idx)">
                    {{ item.name }}
                </a>
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BtnDropdownComp",
    props: {
        options: Array,
        iconfont: String,
        value: String,
        matchroute: Boolean,
        theme: { type: String, default: "blue" },
    },
    data() {
        return {
            dropdown: false,
            pointer: null,
        };
    },
    methods: {
        closeList: function () {
            this.dropdown = false;
        },
        parseValue: function (value) {
            if (!value) return;
            this.options.forEach((option, idx) => {
                if (option.value == value) this.pointer = idx;
            });
        },
        clickHandler: function ($event, idx) {
            if (this.pointer === idx) return;
            this.pointer = idx;
            this.closeList();
            if (this.matchroute && this.$router) this.$router.push(this.options[idx].to);
            else this.$emit("clickfn", $event, idx);
        },
    },
    computed: {
        validPointer() {
            return this.pointer != null && this.pointer >= 0 && this.pointer < this.options.length;
        },
        name: function () {
            return this.validPointer ? this.options[this.pointer].name : "点击选择";
        },
    },
    created() {
        if (this.matchroute && this.$route) {
            this.$watch(
                "$route",
                function ({ params }) {
                    this.parseValue(params.view);
                },
                { immediate: true }
            );
        } else {
            this.parseValue(this.value);
        }
    },
    mounted() {
        document.addEventListener("click", this.closeList, false);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.closeList);
    },
};
</script>

<style scoped>
/* btn-dropdown-wrap (basic style of default theme) */
.btn-dropdown-wrap {
    min-width: 128px;
    height: 40px;
    position: relative;
    flex: none;

    & .control-button {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 16px;
        border: 1px solid #ddd;
        cursor: pointer;
        user-select: none;
        transition: all 0.15s;

        & span {
            margin-right: 16px;
            flex: 1 1 auto;
        }

        & .unselected {
            color: #a1a1a1;
        }

        & i {
            scale: 0.8;
            color: #666;
            font-size: 12px;
            font-weight: 700;
            transition: all 0.15s ease;
        }

        &[data-is-dropdown="true"] {
            & i {
                transform: rotate(180deg);
                top: -1px;
            }
        }
    }

    & .option-list {
        display: flex;
        flex-direction: column;
        min-width: 128px;
        background: white;
        border: 1px solid #ccc;
        position: absolute;
        top: 50px;
        z-index: 1;
        transition: all 0.1s ease;

        & a {
            height: 36px;
            line-height: 36px;
            color: #666;
            padding: 0 16px;
            font-size: 14px;
            font-weight: 700;
            text-decoration: none;
            cursor: pointer;

            &:hover {
                background-color: #efefef;
            }
        }
    }
}

/* animation settings of vue */
.option-list-enter,
.option-list-leave-to {
    opacity: 0;
}

.option-list-enter-to,
.option-list-leave {
    opacity: 1;
}

/* btn-dropdown-theme--blue */
.btn-dropdown-theme--blue {
    & .control-button {
        background: white;
        border-radius: 6px;
        color: #4f4f4f;
        font-size: 14px;

        &[data-is-dropdown="true"] {
            border: 1px solid rgb(20, 153, 236);
            box-shadow: 0 0 5px 2px rgb(20, 153, 236);
        }

        &:hover {
            box-shadow: 0 0 5px 2px rgb(20, 153, 236);
        }

        &:active {
            scale: 0.96;
        }
    }

    & .option-list {
        border-radius: 6px;
        padding: 6px 0;

        & .acitve {
            color: rgb(20, 153, 236);
            cursor: default;
        }
    }
}

/* btn-dropdown-theme--crystal */
.btn-dropdown-theme--crystal {
    & .control-button {
        background: none;
        border: none;
        color: #4f4f4f;
        font-size: 14px;
        width: 128px;

        & i {
            font-weight: 700;
            color: black;
        }
    }

    & .option-list {
        top: 64px;
        border-radius: 6px;
        padding: 6px 0;
        border: 1px solid #eee;
        box-shadow: 0 0 5px 2px #f4f4f4;

        &.active {
            color: var(--primary-bg-clr);
            cursor: default;
        }
    }
}
</style>
