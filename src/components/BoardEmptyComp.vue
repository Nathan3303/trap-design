<template>
    <div class="board-empty">
        <img class="board-empty__image" src="@/assets/empty.png" />
        <p class="board-empty__text">
            <slot>暂无内容</slot>
        </p>
    </div>
</template>

<style scoped>
.board-empty {
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin-bottom: 64px;
}

.board-empty__image {
    width: 200px;
}

.board-empty__text {
    font-weight: 700;
    font-size: 14px;
    color: var(--primary-bg-clr);
}
</style>
