<template>
    <a
        :class="`link-avatar link-avatar-size--${size}`"
        :href="uselink ? `/authors/${name}` : false"
        :style="{ cursor: uselink ? 'pointer' : 'default' }">
        <img v-if="src" :src="src" />
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
        size: { type: String, default: "medium" },
    },
};
</script>

<style scoped>
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

    & img {
        width: 64px;
        transition: all 0.16s ease;
        width: 120%;

        &:hover {
            filter: brightness(1.2);
        }
    }

    &.link-avatar-size--medium {
        --size: 46px;
    }

    &.link-avatar-size--big {
        --size: 96px;
    }

    &.link-avatar-size--small {
        --size: 30px;
    }
}
</style>
