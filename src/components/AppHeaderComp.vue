<template>
    <div class="app-header flex flex-center">
        <!-- logo -->
        <app-logo />
        <!-- 填充 -->
        <div class="blank"></div>
        <!-- 搜索框 -->
        <form-input
            class="app-header__search-input"
            iconfont="icon-search"
            placeholder="搜索(apple)"
            @put="(value) => (searchText = value)"
            rmfo />
        <template v-if="hasLogin">
            <!-- 上传作品按钮 -->
            <router-link :to="{ name: 'upload' }">
                <icon-link theme="gray" class="mg-l16">上传作品</icon-link>
            </router-link>
            <!-- 用户头像 -->
            <link-avatar
                class="app-header__user"
                src="/images/users/user.png"
                name="Jsda" />
        </template>
        <template v-else>
            <!-- 登录按钮 -->
            <router-link :to="{ name: 'login' }">
                <icon-link theme="transparent" class="mg-l16"> 登录 </icon-link>
            </router-link>
            <!-- 注册按钮 -->
            <router-link :to="{ name: 'register' }">
                <icon-link theme="blue" class="mg-l16"> 注册 </icon-link>
            </router-link>
        </template>
    </div>
</template>

<script>
import AppLogo from "./AppLogoComp.vue";
import FormInput from "./FormInputComp.vue";
import IconLink from "./IconLinkComp.vue";
import LinkAvatar from "./LinkAvatarComp.vue";
import { isTokenExpired } from "@/utils";

export default {
    name: "AppHeaderComp",
    components: { AppLogo, FormInput, IconLink, LinkAvatar },
    props: {
        backgroundColor: String,
    },
    data() {
        return {
            searchText: null,
            hasLogin: false,
        };
    },
    watch: {
        searchText: function (newValue) {
            if (newValue === this.$route.params.text || newValue == "") return;
            this.$router.push({ name: "search", params: { text: newValue } });
        },
    },
    created() {
        this.hasLogin = !isTokenExpired();
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
