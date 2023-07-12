<template>
    <div class="btn-dropdown-wrap" :class="`btn-dropdown-style--${theme}`">
        <!-- 按钮 -->
        <a class="btn-dropdown-cont" :data-dropdown-status="dropdown ? 'open' : 'closed'" @click.stop="dropdown = !dropdown">
            <!-- 按钮文字 -->
            <span v-if="pointer != null" class="btn-dropdown-cont-value">{{ name }}</span>
            <!-- 按钮初始文字 -->
            <span v-else class="btn-dropdown-cont-value--unselect">点击选择</span>
            <!-- 按钮状态图标 -->
            <i class="iconfont icon-arrow-down btn-dropdown-status-icon"></i>
        </a>
        <transition name="btn-dropdown-options">
            <!-- 选项列表 -->
            <div class="btn-dropdown-options" v-show="dropdown">
                <a
                    v-for="(item, idx) in options"
                    :key="item.value"
                    class="btn-dropdown-link"
                    :class="{ 'btn-dropdown-link--active': idx == pointer }"
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
        theme: {
            type: String,
            default: "blue",
        },
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
            else this.$emit("clickfn");
        },
    },
    computed: {
        name: function () {
            return this.pointer != null ? this.options[this.pointer].name : "";
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
/* basic style settings */
.btn-dropdown-wrap {
    min-width: 128px;
    height: 40px;
    position: relative;
    flex: none;
}

.btn-dropdown-cont {
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
}

.btn-dropdown-cont-value,
.btn-dropdown-cont-value--unselect {
    margin-right: 16px;
    flex: 1 1 auto;
    /* overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; */
}

.btn-dropdown-status-icon {
    scale: 0.8;
    color: #666;
    font-size: 12px;
    font-weight: 700;
    transition: all 0.15s ease;
}

.btn-dropdown-cont[data-dropdown-status="open"] .btn-dropdown-status-icon {
    transform: rotate(180deg);
    top: -1px;
}

.btn-dropdown-options {
    display: flex;
    flex-direction: column;
    min-width: 128px;
    background: white;
    border: 1px solid #ccc;
    position: absolute;
    top: 50px;
    z-index: 1;
    transition: all 0.1s ease;
}

.btn-dropdown-link {
    height: 36px;
    line-height: 36px;
    color: #666;
    padding: 0 16px;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
}

.btn-dropdown-link:hover {
    background: #efefef;
}

.btn-dropdown-options-enter,
.btn-dropdown-options-leave-to {
    opacity: 0;
}

.btn-dropdown-options-enter-to,
.btn-dropdown-options-leave {
    opacity: 1;
}

/* btn-dropdown-style--blue */
.btn-dropdown-style--blue .btn-dropdown-cont {
    background: white;
    border-radius: var(--bd-rds-6);
    color: #4f4f4f;
    font-size: 14px;
}

.btn-dropdown-style--blue .btn-dropdown-cont[data-dropdown-status="open"] {
    border: 1px solid rgb(20, 153, 236);
    box-shadow: 0 0 5px 2px rgb(20, 153, 236);
}

.btn-dropdown-style--blue .btn-dropdown-cont-value {
    font-weight: 700;
}

.btn-dropdown-style--blue .btn-dropdown-cont-value--unselect {
    color: #a1a1a1;
}

.btn-dropdown-style--blue .btn-dropdown-cont:hover {
    box-shadow: 0 0 5px 2px rgb(20, 153, 236);
}

.btn-dropdown-style--blue .btn-dropdown-cont:active {
    scale: 0.96;
}

.btn-dropdown-style--blue .btn-dropdown-options {
    border-radius: var(--bd-rds-6) !important;
    padding: var(--bd-rds-6) 0 !important;
}

.btn-dropdown-style--blue .btn-dropdown-link--active {
    color: rgb(20, 153, 236);
    cursor: default;
}

/* btn-dropdown-style--crystal */

.btn-dropdown-style--crystal .btn-dropdown-cont {
    background: none;
    border: none;
    color: #4f4f4f;
    font-size: 14px;
    width: 128px;
}

.btn-dropdown-style--crystal .btn-dropdown-cont-value--unselect {
    color: #a1a1a1;
}

.btn-dropdown-style--crystal .btn-dropdown-status-icon {
    /* font-size: 16px; */
    font-weight: 700;
    color: black;
}

.btn-dropdown-style--crystal .btn-dropdown-options {
    top: 64px !important;
    border-radius: var(--bd-rds-6) !important;
    padding: var(--bd-rds-6) 0 !important;
    border: 1px solid #eee !important;
    box-shadow: 0 0 5px 2px #f4f4f4;
}

.btn-dropdown-style--crystal .btn-dropdown-link--active {
    color: var(--primary-bg-clr);
    cursor: default;
}
</style>
