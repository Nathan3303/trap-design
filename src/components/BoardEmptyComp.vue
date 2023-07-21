<template>
    <div class="board-empty">
        <img src="@/assets/empty.png" />
        <p><slot>暂无内容</slot></p>
    </div>
</template>

<style scoped>
.board-empty {
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin-bottom: 64px;

    & img {
        width: 200px;
    }

    & p {
        font-weight: 700;
        font-size: 14px;
        color: var(--primary-bg-clr);
    }
}
</style>
