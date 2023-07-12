<template>
    <div class="flex-none" @mouseover="hover = true" @mouseleave="hover = false">
        <!-- 取消喜爱按钮 -->
        <icon-link
            v-if="isLiked"
            :iconfont="hover ? 'icon-wrong' : 'icon-like'"
            theme="light-pink"
            :loading="loading"
            @clickfn="unlikeHandler()">
            <span v-show="hover">取消喜爱</span>
        </icon-link>
        <!-- 喜爱按钮 -->
        <icon-link v-else iconfont="icon-like" theme="pink" :loading="loading" @clickfn="likeHandler()">设为喜爱</icon-link>
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
            loading: false,
            hover: false,
        };
    },
    methods: {
        likeHandler() {
            this.loading = true;
            this.$emit("like");
        },
        unlikeHandler() {
            this.loading = true;
            this.$emit("unlike");
        },
    },
    watch: {
        liked: function (newValue) {
            const _this = this;
            setTimeout(function () {
                _this.isLiked = newValue;
                _this.loading = false;
            }, 300);
        },
    },
};
</script>
