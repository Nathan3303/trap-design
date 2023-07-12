<template>
    <div class="board-wrap">
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
            <main class="board">
                <board-node
                    v-for="(item, index) in data"
                    :key="item.id"
                    :data="item"
                    :light="light"
                    :replace="replace"
                    :index="index"
                    :route="route" />
            </main>
            <!-- 显示面板到底文字 -->
            <div class="board__end">
                <slot name="end-text">已经到底啦</slot>
            </div>
        </template>
        <!-- 显示无内容文字 -->
        <board-empty class="mg-t144" v-else>
            <slot name="empty-text"></slot>
        </board-empty>
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

.board {
    width: 100%;
    display: grid;
    grid-gap: 36px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    background: white;
    margin: 32px 0;
}

.board__end {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    border-radius: var(--bd-rds-6);
    background: #f9f9f9;
    padding: 8px 0;
    color: #afafaf;
    margin-bottom: 16px;
}
</style>
