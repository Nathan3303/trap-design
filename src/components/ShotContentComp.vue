<template>
    <div class="shot-content">
        <!-- 显示标题 -->
        <h2>{{ title }}</h2>
        <!-- 显示段落文本 -->
        <template v-if="content && content.length > 0">
            <p v-for="(p, idx) in content" :key="idx">{{ p }}</p>
            <slot></slot>
        </template>
        <!-- 显示无内容文字 -->
        <board-empty v-else>暂无作品描述</board-empty>
    </div>
</template>

<script>
import BoardEmpty from "./BoardEmptyComp.vue";
export default {
    name: "ShotContentComp",
    components: { BoardEmpty },
    props: {
        title: String,
        content: Array,
    },
};
</script>

<style scoped>
/* shot-detail__content */
.shot-content {
    margin: 24px 0;
    color: black;
}

.shot-content p {
    margin-bottom: 16px;
}
</style>
