<template>
    <div :class="`icon-link-wrap icon-link-theme--${theme}`">
        <!-- 链接 -->
        <a :href="href" @click="$emit('clickfn')">
            <!-- 加载图标 -->
            <i
                v-if="loading"
                class="link-icon loading-icon iconfont icon-loading"></i>
            <!-- 链接图标 -->
            <i
                v-else-if="iconfont"
                :class="`link-icon iconfont ${iconfont}`"></i>
            <!-- 链接文字 -->
            <slot>
                <!-- span标签用于页面响应式隐藏 -->
                <span class="link-name">{{ name }}</span>
            </slot>
        </a>
        <!-- 按钮右上角数字标记 -->
        <span v-if="count" class="link-counter">{{ count }}</span>
    </div>
</template>

<script>
export default {
    name: "IconLink",
    props: {
        iconfont: String,
        href: String,
        count: Number,
        name: String,
        loading: Boolean,
        theme: { type: String, default: "white" },
    },
};
</script>

<style scoped>
/* icon-link-wrap (basic style settings) */
.icon-link-wrap {
    --link-counter-size: 21px;

    height: 40px;
    position: relative;
    user-select: none;
    flex: none;

    & a {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 100%;
        padding: 0 16px;
        flex: none;
        font-size: 14px;
        cursor: pointer;
        gap: 8px;
    }

    & .link-counter {
        width: var(--link-counter-size);
        height: var(--link-counter-size);
        line-height: calc(var(--link-counter-size) - 2px);
        box-sizing: border-box;
        position: absolute;
        right: -8px;
        top: -8px;
        background-color: white;
        border-radius: 50%;
        font-size: 12px;
        text-align: center;
        box-shadow: 0 0 5px 2px #eee;
        border: 1px solid #4f4f4f;
    }
}

/* 记载图标动画 */
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.link-icon.loading-icon {
    -webkit-animation: rotation 1s ease-in-out infinite;
    animation: rotation 1s ease-in-out infinite;
}

/* 响应式 */
@media screen and (max-width: 912px) {
    .link-name {
        display: none;
    }
}

/* icon-link-theme--white */
.icon-link-theme--white {
    & a {
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 6px;
        color: #4f4f4f;
        transition: all 0.16s ease-out;

        &:active {
            background-color: #f0f0f0;
            border: 1px solid #f0f0f0;
        }
    }
}

/* icon-link-theme--blue */
.icon-link-theme--blue {
    & a {
        background-color: rgb(20, 153, 236);
        border-radius: 6px;
        color: white;
        font-weight: 700;

        &:hover {
            background-color: rgba(20, 153, 236, 0.8);
        }
    }
}

/* icon-link-theme--pink */
.icon-link-theme--pink {
    & a {
        background: rgb(237, 89, 113);
        border-radius: var(--bd-rds-6);
        color: white;
        transition: all 0.16s ease-out;
    }
}

/* icon-link-theme--light-pink */
.icon-link-theme--light-pink {
    & a {
        background: white;
        border: 1px solid rgb(237, 89, 113);
        border-radius: var(--bd-rds-6);
        color: rgb(237, 89, 113);
        transition: all 0.16s ease-out;
    }
}

/* icon-link-theme--gray */
.icon-link-theme--gray {
    & a {
        background: rgb(241, 240, 240);
        border-radius: var(--bd-rds-6);
        color: black;
        font-weight: 700;
        transition: all 0.16s ease-out;
    }
}

/* icon-link-theme--tag */
.icon-link-theme--tag {
    height: auto !important;

    & a {
        padding: 6px 10px !important;
        background: white;
        border: 1px solid #ccc;
        border-radius: var(--bd-rds-6);
        color: #4f4f4f;
        font-size: inherit !important;
    }
}

/* icon-link-theme--small */
.icon-link-theme--small {
    height: 30px !important;

    & a {
        height: 30px !important;
        font-size: 16px !important;
        background-color: white;
        border-radius: var(--bd-rds-6);
        color: #999;
        transition: all 0.3s linear;
        flex: none;
        padding: 3px 9px !important;

        &:hover {
            background-color: #eee;
        }
    }
}

/* icon-link-theme--transparent */
.icon-link-theme--transparent {
    & a {
        background: transparent;
        border-radius: var(--bd-rds-6);
        color: black;
        font-weight: 700;
        transition: all 0.16s ease-out;
    }
}
</style>
