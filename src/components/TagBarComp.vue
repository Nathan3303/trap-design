<template>
    <div class="tag-bar">
        <p>{{ title }}</p>
        <icon-link v-for="(item, idx) in data" :key="idx" theme="tag" :href="`/search/${item}`">{{ item }}</icon-link>
    </div>
</template>

<script>
import IconLink from "./IconLinkComp.vue";

export default {
    name: "TagBar",
    components: { IconLink },
    props: {
        data: Array,
        title: String,
        light: Boolean,
    },
};
</script>

<style scoped>
.tag-bar {
    display: flex;
    overflow: hidden;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 36px;
}

.tag-bar p {
    font-size: 18px;
    color: black;
    font-weight: 700;
    flex: 1 1 100%;
    margin: 8px 0;
}
</style>
