<template>
    <div class="shot-details" id="shot-details">
        <!-- 加载文字 (loading为真值时优先显示) -->
        <div v-if="loading" class="shot-details__loading">
            正在加载画作详情...
        </div>
        <!-- 画作详细 -->
        <div v-else-if="shot">
            <!-- 画作基本信息（头部信息区） -->
            <header class="shot-details__header">
                <link-avatar
                    :src="shot.author.headpic"
                    :name="shot.author.name"
                    uselink />
                <div class="shot-details__info">
                    <span class="shot-details__title">{{ shot.title }}</span>
                    <span class="shot-details__author">
                        <router-link
                            :to="{
                                name: 'author',
                                params: { name: shot.author.name },
                            }">
                            <a>{{ shot.author.fullname }}</a>
                        </router-link>
                    </span>
                </div>
                <div class="shot-details__header__btns">
                    <icon-link
                        name="分享"
                        iconfont="icon-share"
                        theme="gray"
                        @clickfn="copyShareLink(shot.id)" />
                    <icon-link
                        name="详情"
                        iconfont="icon-details"
                        theme="blue"
                        @clickfn="showDetailsBox = true" />
                    <like-button
                        :liked="shot.liked"
                        @like="likeThis"
                        @unlike="unlikeThis" />
                </div>
            </header>
            <!-- 显示作品图片 -->
            <img
                class="shot-details__image"
                :src="shot.thumbnail"
                :alt="shot.title"
                @click="openImage(shot.thumbnail)" />
            <img
                v-for="(img, idx) in shot.images"
                :key="idx"
                class="shot-details__image"
                :src="img"
                @click="openImage(shot.thumbnail)" />
            <!-- 作品简介 (通过v-for打印简介段落) -->
            <shot-content
                title="作品简介"
                :content="shot.content"></shot-content>
            <!-- 分割线 -->
            <div class="shot-details__seperator"></div>
            <!-- 显示可能喜欢的作品 -->
            <board
                class="mg-v32"
                light
                replace
                :loading="maylikeLoading"
                :data="maylike"
                title="你还可能会喜欢的其他作品"></board>
            <!-- 画作信息弹出层 -->
            <popup-box
                v-show="showDetailsBox"
                :views="200"
                :likes="shot.likes"
                :tags="shot.tags"
                @closefn="showDetailsBox = false"></popup-box>
        </div>
        <!-- 无内容文字 -->
        <board-empty v-else class="mg-t128">无法找到画作详情</board-empty>
        <!-- 返回顶部按钮 -->
        <back-to-top el="#shot-details"></back-to-top>
    </div>
</template>

<script>
import { mapState } from "vuex";

import LinkAvatar from "@/components/LinkAvatarComp.vue";
import IconLink from "@/components/IconLinkComp.vue";
import LikeButton from "@/components/LikeButtonComp.vue";
import ShotContent from "@/components/ShotContentComp.vue";
import Board from "@/components/BoardComp.vue";
import BoardEmpty from "@/components/BoardEmptyComp.vue";
import PopupBox from "@/components/PopupBoxComp.vue";
import BackToTop from "@/components/BackToTopComp.vue";

export default {
    name: "ShotDetailsView",
    components: {
        IconLink,
        Board,
        BoardEmpty,
        BackToTop,
        ShotContent,
        LikeButton,
        PopupBox,
        LinkAvatar,
    },
    data() {
        return {
            showDetailsBox: false,
        };
    },
    computed: {
        ...mapState("shotDetails", {
            shot: "shot",
            maylike: "maylike",
            loading: "detailsLoadingState",
            maylikeLoading: "maylikeLoadingState",
        }),
    },
    methods: {
        openImage: function (href) {
            window.open("http://localhost:8080" + href, "_blank");
        },
        copyShareLink: function (shotId) {
            navigator.clipboard
                .writeText("http://localhost:8080/shot/" + shotId)
                .then(() => window.alertbox("分享连接已复制到剪贴板"))
                .catch((error) => console.warn(error));
        },
        fetchData: function (shotId) {
            if (!shotId || shotId == 0) {
                window.alertbox(
                    "无效路由",
                    "error",
                    () => (window.location.href = "/")
                );
                return false;
            }
            this.$store.dispatch("shotDetails/fetchShotDetails", shotId);
            this.$store.dispatch("shotDetails/fetchMaylike");
        },
        likeThis: function () {
            this.$store.dispatch("shotDetails/likeShot");
        },
        unlikeThis: function () {
            this.$store.dispatch("shotDetails/unlikeShot");
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler: function (newRoute) {
                this.fetchData(newRoute.params.id);
            },
        },
    },
};
</script>

<style scoped>
/* shot-detail */
.shot-details {
    height: calc(100% - var(--mg-t));
    margin-top: var(--mg-t);
    padding: 0 calc(100vw * 0.1);
    position: relative;
    background: white;
    border-top-left-radius: var(--bd-rds-12);
    border-top-right-radius: var(--bd-rds-12);
    transition: all 0.3s ease-out;
    overflow: auto;
    min-width: 512px;
}

/* shot-detail animations */
.shot-details-enter,
.shot-details-leave-to {
    width: 50%;
    margin: 128px auto;
    opacity: 0;
}

.shot-details-enter-to,
.shot-details-leave {
    opacity: 1;
}

/* shot-detail__header */
.shot-details__header {
    padding: 36px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.shot-details__info {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 100px;
    margin-left: 8px;
}

.shot-details__title {
    font-size: 20px;
    font-weight: 700;
    color: black;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.shot-details__author {
    font-size: 14px;
    margin: 4px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.shot-details__author a:hover {
    color: var(--primary-bg-clr) !important;
}

.shot-details__header__btns {
    display: flex;
    flex: none;
    gap: 16px;
}

/* shot-detail__image */
.shot-details__image {
    width: 100%;
    border-radius: var(--bd-rds-12);
    background: #eeeeee;
    box-shadow: 0 0 8px 2px #afafaf;
    margin-bottom: 16px;
}

/* shot-detail__seperator */
.shot-details__seperator {
    height: 1px;
    background: #eee;
    margin: 16px 0;
}

/* shot-detail__loading */
.shot-details__loading {
    width: 100%;
    margin-top: 256px;
    text-align: center;
    color: var(--primary-bg-clr);
    font-size: 16px;
    font-weight: 700;
}

/* Screen width handle */
@media screen and (min-width: 1400px) {
    .shot-details {
        padding: 0 calc(100vw * 0.2);
    }
}

@media screen and (max-width: 1400px) {
    .shot-details {
        padding: 0 calc(100vw * 0.1);
    }
}

@media screen and (max-width: 840px) {
    .shot-details__header {
        flex-direction: column;
        gap: 24px;
    }

    .shot-details__info {
        margin-left: 0;
    }

    .shot-details__title {
        text-align: center;
        margin-top: 0;
    }

    .shot-details__author {
        text-align: center;
    }
}
</style>
