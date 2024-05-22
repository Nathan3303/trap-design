<template>
    <div ref="wrapperRef" class="infinite-scroll-wrapper">
        <div class="infinite-scroll">
            <slot></slot>
            <!-- 底部触发条 -->
            <div ref="triggerBarRef" class="infinite-scroll__trigger-bar"></div>
            <!-- 显示到底文字 -->
            <div v-if="nomore" class="infinite-scroll__nomore">
                已经到底啦 （数据加载完毕）
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InfiniteScroll",
    emits: ["loadMore"],
    props: {
        nomore: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            observer: null,
            disabled: false,
            timer: null,
        };
    },
    methods: {
        disabledOnUpdated() {
            this.disabled = true;
            this.timer = setTimeout(() => {
                this.disabled = false;
            }, 360);
        },
    },
    mounted() {
        const triggerBar = this.$refs.triggerBarRef;
        if (triggerBar) {
            this.observer = new IntersectionObserver((entries) => {
                if (this.disabled || this.nomore) return;
                if (!entries[0].isIntersecting) return;
                requestAnimationFrame(() => {
                    this.$emit("loadMore");
                });
            });
            this.observer.observe(triggerBar);
        }
    },
    updated() {
        // console.log("infinite-scroll updated");
        // console.dir(this.$refs.wrapperRef);
        this.disabledOnUpdated();
    },
};
</script>

<style scoped>
/* Variables */

.infinite-scroll-wrapper {
    --font-color: var(--mainly-color);
    --font-size: var(--mainly-font-size);
    --font-weight: var(--mainly-font-weight);
    --font-family: var(--mainly-font-family);

    --height: 100%;
    --trigger-bar-height: 16px;
}

/* Original Styles */

.infinite-scroll-wrapper {
    width: 100%;
    height: var(--height);
    overflow: auto;

    .infinite-scroll {
        position: relative;
        width: 100%;
        height: 100%;
        padding-bottom: 32px;

        .infinite-scroll__trigger-bar {
            position: absolute;
            width: 100%;
            height: var(--trigger-bar-height);
            bottom: 0;
            left: 0;
            /* opacity: 0; */
            z-index: -1;
        }

        .infinite-scroll__nomore {
            font-size: 14px;
            font-weight: 700;
            text-align: center;
            border-radius: var(--bd-rds-6);
            background: #f3f3f3;
            padding: 12px 0;
            color: #afafaf;
            margin-bottom: 16px;
        }
    }
}
</style>
