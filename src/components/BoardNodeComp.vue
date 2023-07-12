<template>
    <div class="board-node">
        <!-- 缩略图链接 -->
        <router-link :to="{ name: route, params: { id: data.id } }" :replace="replace" class="thumbnail-wrap">
            <!-- 缩略图 -->
            <div class="thumbnail" @mouseover.stop="isHover = true" @mouseleave.stop="isHover = false">
                <img :src="data.thumbnail" alt="thumbnail" :data-hover="isHover" />
                <!-- 标题栏 -->
                <transition name="ttb">
                    <div v-show="isHover" class="title-box flex flex-center">
                        <span class="title">{{ data.title }}</span>
                        <!-- <icon-link class="title-box__share-btn" iconfont="icon-share" theme="small" /> -->
                        <!-- <icon-link class="title-box__share-btn" iconfont="icon-like" theme="small" /> -->
                    </div>
                </transition>
            </div>
        </router-link>
        <!-- 底部信息栏 -->
        <div class="information flex flex-center" v-if="!light">
            <!-- 作者头像 -->
            <link-avatar :src="data.author.headpic" :name="data.author.name" uselink size="small" />
            <!-- 作者名称 -->
            <a class="author" :title="data.author.description" :href="`/authors/${data.author.name}`">
                {{ data.author.fullname }}
            </a>
            <!-- 喜爱数 -->
            <span class="likes mg-r4">
                <i class="iconfont icon-like"></i>
                {{ data.likes.length }}
            </span>
            <!-- 观看数 -->
            <span class="views">
                <i class="iconfont icon-view"></i>
                {{ data.views / 1000 + "k" }}
            </span>
        </div>
    </div>
</template>

<script>
import LinkAvatar from "./LinkAvatarComp.vue";

export default {
    name: "BoardNodeComp",
    components: { LinkAvatar },
    props: {
        index: Number,
        data: Object,
        light: Boolean,
        replace: Boolean,
        route: String,
    },
    data() {
        return {
            isHover: false,
        };
    },
};
</script>

<style scoped>
.board-node {
    user-select: none;
}

.thumbnail-wrap {
    position: relative;
}

.thumbnail {
    width: 100%;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    border-radius: 8px;
    background-color: #eee;
}

.thumbnail img {
    width: 138%;
    transition: all 0.16s ease-in;
    /* background: var(--primary-bg-clr); */
}

.thumbnail img:hover,
.thumbnail img[data-hover] {
    width: 120%;
}

.title-box {
    --pd-h: 16px;
    width: calc(100% - 2 * var(--pd-h));
    height: 48px;
    position: absolute;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px var(--pd-h) 8px var(--pd-h);
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8));
    transition: all 0.2s linear;
}

.title {
    color: white;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1 auto;
    transition: all 0.2s ease-out;
}

.ttb-enter,
.ttb-leave-to {
    opacity: 0;
}

.ttb-enter-to,
.ttb-leave {
    opacity: 1;
}

.information {
    height: 40px;
    font-weight: 700;
}

.information i {
    font-weight: normal;
    margin: 0 4px;
    color: #999;
}

.author {
    margin-left: 8px;
    font-size: 15px;
    flex: auto;
}

.likes,
.views {
    font-size: 14px;
    color: #666;
    height: 32px;
    display: flex;
    align-items: center;
    gap: 4px;
    flex: none;
}

.like-btn:hover {
    color: pink;
    cursor: pointer;
}
</style>
