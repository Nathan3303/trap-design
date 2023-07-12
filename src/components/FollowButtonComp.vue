<template>
    <div class="flex-none" @mouseover="hover = true" @mouseleave="hover = false">
        <!-- 取消关注按钮 -->
        <icon-link
            v-if="followed"
            :iconfont="hover ? 'icon-wrong' : ''"
            theme="white"
            :loading="loading"
            @clickfn="unfollowHandler()">
            <span v-if="hover || loading">取消关注</span>
            <span v-else>已关注</span>
        </icon-link>
        <!-- 关注按钮 -->
        <icon-link v-else iconfont="icon-plus" theme="gray" :loading="loading" @clickfn="followHandler()">关注</icon-link>
    </div>
</template>

<script>
import IconLink from "./IconLinkComp.vue";
export default {
    name: "FollowButton",
    components: { IconLink },
    props: {
        followed: Boolean,
    },
    data() {
        return {
            loading: false,
            hover: false,
        };
    },
    methods: {
        followHandler() {
            this.loading = true;
            this.$emit("follow");
        },
        unfollowHandler() {
            this.loading = true;
            this.$emit("unfollow");
        },
    },
    watch: {
        followed: function () {
            const _this = this;
            setTimeout(function () {
                _this.loading = false;
            }, 300);
        },
    },
};
</script>
