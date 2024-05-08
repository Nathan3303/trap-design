<template>
    <div class="app-header flex flex-center">
        <!-- logo -->
        <a class="app-header__logo" href="/">
            <i class="app-header__logo__icon iconfont icon-design"></i>
            <span class="app-header__logo__text">TrapDesign</span>
        </a>
        <!-- 填充 -->
        <div class="blank"></div>
        <!-- 搜索框 -->
        <form-input
            class="app-header__search-input"
            iconfont="icon-search"
            placeholder="搜索"
            @put="(value) => (searchText = value)"
            rmfo />
        <!-- 上传作品按钮 -->
        <icon-link theme="gray" class="mg-l16">上传作品</icon-link>
        <!-- 用户头像 -->
        <link-avatar
            class="app-header__user"
            src="/images/users/user.png"
            name="Jsda" />
    </div>
</template>

<script>
import FormInput from "./FormInputComp.vue";
import IconLink from "./IconLinkComp.vue";
import LinkAvatar from "./LinkAvatarComp.vue";

export default {
    name: "AppHeaderComp",
    components: { FormInput, IconLink, LinkAvatar },
    data() {
        return {
            searchText: null,
        };
    },
    watch: {
        searchText: function (newValue) {
            if (newValue === this.$route.params.text || newValue == "") return;
            this.$router.push({ name: "search", params: { text: newValue } });
        },
    },
};
</script>

<style scoped>
/* app-header */
.app-header {
    height: 80px;
    padding: 0 24px;
    border-bottom: 1px solid #eeeeee;
    position: relative;
}

/* app-header__logo */
.app-header__logo {
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    color: var(--primary-bg-clr);
    text-decoration: none;
}

.app-header__logo:hover {
    color: #868686;
}

.app-header__logo:active {
    scale: 0.96;
}

.app-header__logo__icon {
    font-size: 24px;
    margin-top: -6px;
    margin-right: 4px;
    font-weight: 700;
}

.app-header__logo__text {
    font-family: "Consolas";
    font-size: 20px;
    font-weight: 700;
}

/* app-header__search-input */
.app-header__search-input {
    width: 224px;
}

/* app-header__user */
.app-header__user {
    --size: 40px;
    width: var(--size);
    height: var(--size);
    margin-left: 16px;
}
</style>
