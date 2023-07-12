<template>
    <div class="back-to-top-wrap">
        <transition name="btt">
            <a :href="href" ref="btt" class="back-to-top-btn" v-show="isShow">
                <i class="back-to-top-icon iconfont icon-TOP" title="回到顶部"></i>
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
        forwardToTop() {
            this.element.scrollTop = 0;
        },
    },
    mounted() {
        if (this.el) {
            this.element = document.querySelector(this.el);
            this.element && this.element.addEventListener("scroll", this.checkScrollTop);
        }
        if (!this.href) this.$refs.btt.addEventListener("click", this.forwardToTop);
    },
    beforeDestroy() {
        this.element.removeEventListener("scroll", this.checkScrollTop);
    },
};
</script>

<style>
.back-to-top-wrap {
    position: fixed;
    right: 48px;
    bottom: 96px;
    z-index: 3;
    user-select: none;
}

.back-to-top-btn {
    --size: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size);
    height: var(--size);
    background: var(--primary-bg-clr);
    border: 1px solid var(--primary-bg-clr);
    border-radius: 50%;
    color: white;
    text-decoration: none;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
}

.back-to-top-btn:hover {
    opacity: 1;
}

.back-to-top-btn:active {
    scale: 0.92;
}

.back-to-top-icon {
    font-size: 22px;
}

.btt-enter,
.btt-leave-to {
    opacity: 0;
}

.btt-enter-to,
.btt-leave {
    opacity: 0.5;
}
</style>
