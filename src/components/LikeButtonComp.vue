<template>
    <div @mouseover="isHover = true" @mouseleave="isHover = false">
        <!-- 取消喜爱按钮 -->
        <icon-link
            v-if="isLiked"
            :iconfont="isHover ? 'icon-wrong' : 'icon-like'"
            theme="light-pink"
            :loading="isLoading"
            @clickfn="clickHandler(0)">
            <span v-show="isHover">取消喜爱</span>
        </icon-link>
        <!-- 喜爱按钮 -->
        <icon-link v-else iconfont="icon-like" theme="pink" :loading="isLoading" @clickfn="clickHandler(1)">设为喜爱</icon-link>
    </div>
</template>

<script>
import IconLink from "./IconLinkComp.vue";
export default {
    name: "LikeButton",
    components: { IconLink },
    props: {
        liked: Boolean,
    },
    data() {
        return {
            isLiked: this.liked,
            isHover: false,
            isLoading: false,
            debounceTimer: null,
        };
    },
    methods: {
        clickHandler(flag) {
            this.isLoading = true;
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            const _this = this;
            this.debounceTimer = setTimeout(function () {
                this.debounceTimer = null;
                flag ? _this.$emit("like") : _this.$emit("unlike");
            }, 200);
        },
    },
    watch: {
        liked: function (newValue) {
            const _this = this;
            setTimeout(function () {
                _this.isLiked = newValue;
                _this.isLoading = false;
            }, 300);
        },
    },
};
</script>
