<template>
    <div class="shot-details-wrap">
        <!-- 显示详情页关闭按钮 -->
        <i class="shot-details__clsbtn iconfont icon-wrong" @click="$router.back()"></i>
        <!-- 详情页主体 -->
        <transition name="shot-details" appear>
            <shot-details-view></shot-details-view>
        </transition>
    </div>
</template>

<script>
import ShotDetailsView from "./ShotDetailsView.vue";

export default {
    name: "ShotDetailsPopupView",
    components: { ShotDetailsView },
    created() {
        document.querySelector("body").style.overflow = "hidden";
    },
    destroyed() {
        document.querySelector("body").style.overflow = "auto";
    },
};
</script>

<style>
/* shot-detail-wrap */
.shot-details-wrap {
    width: 100vw;
    min-width: 512px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(22, 22, 22, 0.8);
    --mg-t: 48px;
    z-index: 5;
}

/* shot-detail__close-button */
.shot-details__clsbtn {
    display: block;
    width: var(--mg-t);
    height: var(--mg-t);
    line-height: var(--mg-t);
    text-align: center;
    float: right;
    font-size: 22px;
    color: white;
    cursor: pointer;
}
</style>
