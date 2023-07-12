<template>
    <a
        class="link-avatar"
        :href="uselink ? `/authors/${name}` : false"
        :class="`link-avatar-size--${size}`"
        :style="{ cursor: uselink ? 'pointer' : 'default' }">
        <img class="link-avatar__image" v-if="src" :src="src" />
        <span v-else>{{ name.slice(0, 1) }}</span>
    </a>
</template>

<script>
export default {
    name: "LinkAvatarComp",
    props: {
        src: String,
        name: String,
        uselink: Boolean,
        size: {
            type: String,
            default: "medium",
        },
    },
};
</script>

<style scoped>
.link-avatar-size--medium {
    --size: 46px;
}

.link-avatar-size--big {
    --size: 96px;
}

.link-avatar-size--small {
    --size: 30px;
}

.link-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex: none;
    width: var(--size);
    height: var(--size);
    background: var(--primary-bg-clr);
    border-radius: 50%;
    font-size: 14px;
    user-select: none;
}

.link-avatar img {
    transition: all 0.16s ease;
    width: 120%;
}

.link-avatar img:hover {
    filter: brightness(1.2);
}
</style>
