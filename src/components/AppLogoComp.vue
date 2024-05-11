<template>
    <a class="app-header__logo" :href="disabled ? '#' : '/'">
        <i class="app-header__logo__icon iconfont icon-design"></i>
        <span class="app-header__logo__text">TrapDesign</span>
    </a>
</template>

<script>
export default {
    name: "AppLogo",
    props: {
        color: String,
        disabled: Boolean,
    },
};
</script>

<style scoped>
/* app-header__logo */
.app-header__logo {
    height: 24px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    color: v-bind("color");
    text-decoration: none;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
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
</style>
