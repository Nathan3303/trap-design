<template>
    <!-- App主体 -->
    <div class="app-main">
        <!-- 未登录展示内容 -->
        <template v-if="!hasLogin">
            <div class="unlogin-container">
                <p class="title">世界上最具创意的地方</p>
                <p class="sub-title">
                    发现全球顶尖设计师和机构的作品，激发你的创作力
                </p>
                <router-link :to="{ name: 'register' }">
                    <icon-link theme="blue">开始使用</icon-link>
                </router-link>
            </div>
            <div class="marquee-wrapper">
                <marquee></marquee>
            </div>
            <p class="app-main__desc">探索鼓舞人心的设计</p>
        </template>
        <!-- App主体头部 -->
        <header v-else class="app-main__header">
            <!-- 下拉列表按钮 -->
            <btn-dropdown
                iconfont="icon-search"
                :options="viewOptions"
                matchroute />
            <!-- 分类筛选栏 -->
            <category-bar
                v-if="categoryOptions"
                class="mg-h32"
                :options="categoryOptions"
                matchroute />
            <!-- 过滤按钮 -->
            <icon-link
                @clickfn="showFilter = !showFilter"
                iconfont="icon-filter"
                name="过滤"
                :count="filterCounter" />
        </header>
        <!-- 过滤选项 -->
        <transition name="filter-options">
            <div class="filter-options" v-show="showFilter">
                <form-input
                    label="标题"
                    name="title"
                    iconfont="icon-title_1"
                    placeholder="输入画作标题"
                    @put="formInputGetter" />
                <form-input
                    label="作者"
                    name="author"
                    iconfont="icon-user"
                    placeholder="输入作者名称"
                    @put="formInputGetter" />
                <form-input
                    label="标签"
                    name="tags"
                    iconfont="icon-tag"
                    placeholder="输入标签名称"
                    pretext="#"
                    @put="formInputGetter" />
            </div>
        </transition>
        <!-- 作品展示路由视图 -->
        <div :style="{ minHeight: hasLogin ? 'auto' : '2900px' }">
            <infinite-scroll
                @loadMore="handleLoadMore"
                :nomore="(isNoMore && !!shots.length) || disableLoadMore">
                <board
                    :data="shots"
                    :loading="loading"
                    route="shot-details-popup"></board>
                <template v-if="!hasLogin" v-slot:nomore>
                    <div
                        style="
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        ">
                        <router-link :to="{ name: 'login' }">
                            <icon-link theme="blue"
                                >登录以查看更多的作品</icon-link
                            >
                        </router-link>
                    </div>
                </template>
            </infinite-scroll>
        </div>
        <!-- 页面底部 -->
        <template v-if="!hasLogin && disableLoadMore">
            <!-- 底部 banner -->
            <div class="app-main__footer-banner">
                <p class="title">立即找到你的下一位设计师</p>
                <p class="sub-title">
                    世界领先的品牌使用 Trap Design
                    来雇佣创意人才。浏览数以百万计的顶级组合，找到你的完美创意搭档。
                </p>
                <div class="buttons">
                    <icon-link theme="blue">立即开始</icon-link>
                    <icon-link theme="gray">了解招聘信息</icon-link>
                </div>
                <p class="end-text">
                    你是在找工作的设计师吗？ <a href="#">加入 Trap Design</a>
                </p>
            </div>
            <marquee class="app-main__marquee"></marquee>
            <div class="app-main__footer">
                <app-logo></app-logo>
                <p>© 2023 Trap Design. Build by Nathan.</p>
            </div>
        </template>
        <!-- 作品详情路由视图 -->
        <router-view name="ShotDetailsPopupView"></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { appMainCategoryOptions, appMainViewOptions } from "@/options";
import { isTokenExpired } from "@/utils";

import btnDropdown from "@/components/BtnDropdownComp.vue";
import formInput from "@/components/FormInputComp.vue";
import categoryBar from "@/components/CategoryBarComp.vue";
import iconLink from "@/components/IconLinkComp.vue";
import Board from "@/components/BoardComp.vue";
import InfiniteScroll from "@/components/InfiniteScrollComp.vue";
import Marquee from "@/components/MarqueeComp.vue";
import AppLogo from "@/components/AppLogoComp.vue";

export default {
    name: "AppMainView",
    components: {
        btnDropdown,
        formInput,
        iconLink,
        categoryBar,
        Board,
        InfiniteScroll,
        Marquee,
        AppLogo,
    },
    data() {
        return {
            categoryOptions: appMainCategoryOptions,
            viewOptions: appMainViewOptions,
            showFilter: false,
            filterInfo: { title: "", author: "", tags: "" },
            hasLogin: false,
            disableLoadMore: false,
        };
    },
    methods: {
        // 接收 fromInput 组件的输入框值
        formInputGetter: function (value, key) {
            this.filterInfo[key] = value;
        },
        fetchData: function (filterInfo, reload = false) {
            // 设置筛选信息
            this.$store.commit("appMain/setFilterInfo", filterInfo);
            // 请求数据
            this.$store.dispatch("appMain/fetchPagedShots", { reload });
        },
        handleLoadMore: function () {
            if (this.shots.length >= 28 && !this.hasLogin) {
                this.disableLoadMore = true;
                return;
            }
            // console.log("load more");
            const params = this.$route.params;
            if (this.shots.length === 0) {
                this.fetchData(params, true);
                return;
            }
            this.fetchData(params);
        },
    },
    computed: {
        // 获取Vuex的States
        ...mapState("appMain", {
            shots: "shots",
            loading: "loadingState",
            isNoMore: "isNoMore",
        }),
        // 计算筛选栏生效数
        filterCounter: function () {
            let count = 0;
            for (let k in this.filterInfo) this.filterInfo[k] && count++;
            return count;
        },
    },
    watch: {
        // 侦听筛选信息变化，刷新数据
        filterInfo: {
            deep: true,
            handler(newValue) {
                this.fetchData(newValue, true);
            },
        },
        // 侦听路由变化，更新导航栏按钮的params
        $route: {
            immediate: true,
            handler({ params }) {
                this.categoryOptions.forEach(
                    (item) => (item.to.params.view = params.view)
                );
                this.viewOptions.forEach(
                    (item) => (item.to.params.category = params.category)
                );
            },
        },
    },
    beforeRouteUpdate(to, from, next) {
        requestAnimationFrame(() => {
            if (from.name == "shots" && to.name == "shots") {
                this.fetchData(to.params, true);
            }
            next();
        });
    },
    created() {
        this.hasLogin = !isTokenExpired();
    },
};
</script>

<style scoped>
/* app-main */
.app-main {
    /* padding: 0 64px; */
    display: flex;
    flex-direction: column;
}

/* unlogin-container */
.unlogin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 430px;
    z-index: 2;
    /* background-image: url("https://picsum.photos/id/1024/1920/1080"); */
}
.unlogin-container .title,
.app-main__footer-banner .title {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #333;
    max-width: 380px;
    text-align: center;
}
.unlogin-container .sub-title,
.app-main__footer-banner .sub-title {
    font-size: 24px;
    margin-bottom: 32px;
    color: #333;
}

/* app-main__marquee */
.marquee-wrapper {
    width: 100%;
    display: flex;
}
.app-main__desc {
    text-align: center;
    font-size: 36px;
    margin-top: 120px;
    color: #333;
}

/* app-main__header */
.app-main__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    margin: 32px 64px 0 64px;
}

/* filter-options */
.filter-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 36px;
    transition: all 0.1s ease;
    margin: 32px 64px 0 64px;
}

.filter-options-enter,
.filter-options-leave-to {
    height: 0px;
    margin-top: 0px;
    opacity: 0;
}

.filter-options-enter-to,
.filter-options-leave {
    height: 70px;
    margin-top: 32px;
    opacity: 1;
}

.infinite-scroll-wrapper {
    margin: 32px 64px 0 64px;
    width: auto;
}

/* .app-main__footer-banner */
.app-main__footer-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffda79;
    margin-top: 64px;
    padding: 64px;
    gap: 16px;
    text-align: center;

    .buttons {
        display: flex;
        gap: 16px;
    }

    .end-text {
        font-size: 16px;
        margin-top: 16px;
        color: #333;

        a {
            text-decoration: underline;
        }
    }
}

/* .app-main__marquee */
.app-main__marquee {
    margin: 64px 0px;
}

/* .app-main__footer */
.app-main__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 64px;
    font-size: 14px;
}
</style>
