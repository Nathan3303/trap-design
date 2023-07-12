<template>
    <div id="author-view-wrap" class="author-view-wrap">
        <!-- 显示加载动画 -->
        <div class="author-view__loading" v-if="loading">正在加载作者信息...</div>
        <!-- 显示作者基本信息 -->
        <template v-else-if="authorInfo">
            <!-- 头部：作者基本信息 -->
            <header class="author-view__header">
                <!-- 作者信息图片展示区 -->
                <div class="author-view__image-wrap">
                    <img class="author-view__image" :src="authorInfo.image" />
                    <div class="author-view__image-color"></div>
                    <i class="author-view__logo iconfont icon-design"></i>
                </div>
                <!-- 作者信息展示区 -->
                <div class="author-view__info">
                    <link-avatar :src="authorInfo.headpic" :name="authorInfo.name" size="big" />
                    <div class="author-view__name">{{ authorInfo.fullname }}</div>
                    <div class="author-view__description">{{ authorInfo.description }}</div>
                    <div class="author-view__operations">
                        <!-- <icon-link name="关注" iconfont="icon-plus" theme="gray" /> -->
                        <follow-button :followed="authorInfo.followed" @follow="followAuthor" @unfollow="unfollowAuthor" />
                        <icon-link
                            name="联系作者"
                            iconfont="icon-email-fill"
                            theme="blue"
                            @clickfn="copyEmailAddress(authorInfo.email)" />
                        <!-- <icon-link name="关于" iconfont="icon-details" theme="blue" /> -->
                    </div>
                </div>
            </header>
            <!-- 主体：作者作品以及其他详细 -->
            <main class="author-view__main">
                <header class="author-view__main__header">
                    <!-- 分类筛选栏 -->
                    <category-bar :options="categoryOptions" matchroute />
                    <!-- 下拉列表按钮 -->
                    <btn-dropdown :options="viewOptions" matchroute />
                </header>
                <!-- 作者作品展示 -->
                <board light :data="authorInfo.shots" route="author/shot-details-popup">
                    <template #loading-text>正在查找作品...</template>
                </board>
            </main>
        </template>
        <!-- 无内容文本 -->
        <board-empty v-else class="mg-t128">无法找到该作者的信息</board-empty>
        <!-- 作品详细路由视图 -->
        <router-view name="ShotDetailsPopupView"></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { appAuthorCategoryOptions, appAuthorViewOptions } from "@/options";

import IconLink from "@/components/IconLinkComp.vue";
import Board from "@/components/BoardComp.vue";
import BoardEmpty from "@/components/BoardEmptyComp.vue";
import LinkAvatar from "@/components/LinkAvatarComp.vue";
import CategoryBar from "@/components/CategoryBarComp.vue";
import BtnDropdown from "@/components/BtnDropdownComp.vue";
import FollowButton from "@/components/FollowButtonComp.vue";

export default {
    name: "AuthorView",
    components: { IconLink, Board, BoardEmpty, LinkAvatar, CategoryBar, BtnDropdown, FollowButton },
    data() {
        return {
            categoryOptions: appAuthorCategoryOptions,
            viewOptions: appAuthorViewOptions,
        };
    },
    methods: {
        // 数据获取函数
        fetchData: function (authorName) {
            if (!authorName || authorName == "") {
                window.alertbox("无效路由", "error", () => (window.location.href = "/"));
                this.$store.commit("author/setLoadingState", false);
                return false;
            }
            this.$store.dispatch("author/fetchAuthorInfo", authorName);
        },
        copyEmailAddress: function (emailAddress) {
            navigator.clipboard
                .writeText(emailAddress)
                .then(() => window.alertbox("作者邮箱 (" + emailAddress + ") 已复制到剪贴板"))
                .catch((error) => console.warn(error));
        },
        followAuthor: function () {
            this.$store.dispatch("author/describe");
        },
        unfollowAuthor: function () {
            this.$store.dispatch("author/undescribe");
        },
    },
    computed: {
        ...mapState("author", { authorInfo: "authorInfo", loading: "loadingState" }),
    },
    watch: {
        // 侦听路由变化，更新导航栏按钮的params
        $route: {
            immediate: true,
            handler({ params }) {
                this.categoryOptions.forEach((item) => {
                    item.to.params.view = params.view;
                    item.to.params.name = params.name;
                });
                this.viewOptions.forEach((item) => {
                    item.to.params.category = params.category;
                    item.to.params.name = params.name;
                });
            },
        },
    },
    created() {
        this.fetchData(this.$route.params.name);
    },
};
</script>

<style scoped>
/* author-view-wrap */
.author-view-wrap {
    padding: 0 8%;
}

/* author-view__loading */
.author-view__loading {
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--primary-bg-clr);
    margin-top: 144px;
}

/* author-view__header */
.author-view__header {
    display: flex;
    flex-flow: row-reverse;
    margin-top: 64px;
    user-select: none;
}

/* author-view__author-information */
.author-view__info {
    display: flex;
    flex-direction: column;
    /* gap: 24px; */
    flex: auto;
}

/* author-view__author-headpic */
.author-view__hp {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    --size: 96px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--primary-bg-clr);
    color: white;
    font-size: 20px;
    font-weight: 700;
}

.author-view__hp img {
    width: 114%;
}

.author-view__name {
    font-size: 36px;
    font-weight: 900;
    color: black;
    margin-top: 32px;
}

.author-view__description {
    max-width: 86%;
    font-size: 48px;
    font-weight: 700;
    color: black;
    margin-top: 16px;
}

.author-view__operations {
    display: flex;
    gap: 16px;
    margin-top: 32px;
}

/* author-view__author-image-wrap */
.author-view__image-wrap {
    width: 42%;
    min-width: 520px;
    max-height: 400px;
    display: flex;
    position: relative;
}

.author-view__image {
    height: 90%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: var(--bd-rds-12);
    z-index: 1;
    transition: all 0.2s ease-in-out;
}

.author-view__image-color {
    display: block;
    width: 55%;
    height: 100%;
    max-height: 80%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
    background: var(--primary-bg-clr);
    border-radius: var(--bd-rds-12);
}

.author-view__logo {
    position: absolute;
    left: -16px;
    top: 8px;
    color: var(--primary-bg-clr);
    font-size: 64px;
    z-index: 3;
}

/* screen max-width handler */
@media screen and (max-width: 1024px) {
    .author-view__name {
        font-size: 24px;
    }
    .author-view__description {
        font-size: 36px;
    }
    .author-view__image-wrap {
        min-width: 400px;
        max-height: 300px;
    }
}

@media screen and (max-width: 850px) {
    .author-view__header {
        flex-direction: column;
    }
    .author-view__name {
        font-size: 32px;
    }
    .author-view__description {
        font-size: 48px;
        max-width: 100%;
    }
    .author-view__image-wrap {
        width: 100%;
        height: calc(100vw * 0.6);
        max-height: 100vw;
        margin-bottom: 36px;
    }
}

/* author-view__main */
.author-view__main {
    margin-top: 96px;
}

.author-view__main__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    user-select: none;
}

/* author-view__board-wrap */
.author-view__board__h1 {
    font-size: 23px;
    font-weight: 700;
    color: black;
    margin: 24px 0;
}

.author-view__board {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
}
</style>
