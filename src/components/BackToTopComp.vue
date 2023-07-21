<template>
    <div class="back-to-the-top">
        <transition name="back-to-the-top">
            <a :href="href" ref="btn" v-show="isShow">
                <i class="iconfont icon-TOP" title="回到顶部"></i>
            </a>
        </transition>
    </div>
</template>

<script>
export default {
    name: "BackToTopComp",
    props: {
        el: String,
        href: String,
    },
    data() {
        return {
            isShow: false,
            element: null,
        };
    },
    methods: {
        checkScrollTop($event) {
            this.isShow = $event.target.scrollTop > 80;
        },
        backToTheTop() {
            this.element.scrollTop = 0;
        },
    },
    mounted() {
        if (this.el) {
            this.element = document.querySelector(this.el);
            this.element && this.element.addEventListener("scroll", this.checkScrollTop);
        }
        if (!this.href) this.$refs.btn.addEventListener("click", this.backToTheTop);
    },
    beforeDestroy() {
        this.element.removeEventListener("scroll", this.checkScrollTop);
    },
};
</script>

<style>
.back-to-the-top {
    --btn-size: 48px;

    position: fixed;
    right: 48px;
    bottom: 96px;
    z-index: 3;
    user-select: none;

    & a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--btn-size);
        height: var(--btn-size);
        background: var(--primary-bg-clr);
        border-radius: 50%;
        color: white;
        text-decoration: none;
        opacity: 0.5;
        transition: all 0.2s ease-in-out;

        &:hover {
            opacity: 1;
        }

        &:active {
            scale: 0.92;
        }
    }

    & i {
        font-size: 22px;
    }
}

.back-to-the-top-enter,
.back-to-the-top-leave-to {
    opacity: 0;
}

.back-to-the-top-enter-to,
.back-to-the-top-leave {
    opacity: 0.5;
}
</style>
