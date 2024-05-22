<template>
    <div ref="boardRef" class="board-wrap">
        <!-- 显示标题 -->
        <h2 v-if="title">
            <span>{{ title }}</span>
            <span v-if="data" class="board__counter">{{ data.length }}</span>
        </h2>
        <!-- 显示加载文字 -->
        <div v-if="loading" class="board__loading">
            <slot name="loading-text">正在加载...</slot>
        </div>
        <!-- 显示面板内容 -->
        <template v-else-if="data && data.length != 0">
            <!-- 显示面板 -->
            <main>
                <board-node
                    v-for="(item, index) in data"
                    :key="`item.id_${index}`"
                    :data="item"
                    :light="light"
                    :replace="replace"
                    :index="index"
                    :route="route" />
            </main>
        </template>
        <!-- 显示无内容文字 -->
        <board-empty class="board__empty" v-else />
    </div>
</template>

<script>
import BoardNode from "./BoardNodeComp.vue";
import BoardEmpty from "./BoardEmptyComp.vue";
export default {
    name: "BoardView",
    components: { BoardNode, BoardEmpty },
    props: {
        title: String,
        count: Boolean,
        loading: Boolean,
        data: Array,
        light: Boolean,
        replace: Boolean,
        route: String,
    },
};
</script>

<style scoped>
.board__counter {
    font-family: "Consolas";
    font-size: 16px;
    font-weight: 700;
    color: gray;
    margin-left: 8px;
}

.board__loading {
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--primary-bg-clr);
    margin-top: 144px;
}

main {
    width: 100%;
    display: grid;
    grid-gap: 36px;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    background: white;
    margin: 32px 0;
}



.board__empty {
    margin-top: 144px;
}
</style>
