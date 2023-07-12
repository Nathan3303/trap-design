<template>
    <div class="search-view">
        <!-- 搜索详情页头部 -->
        <header class="search-view__header">
            <!-- 搜索框 -->
            <div class="search-view__search-box-wrap">
                <div class="search-view__search-box">
                    <form-input
                        class="search-view__search-box-input"
                        theme="crystal"
                        placeholder="输入搜索字符"
                        iconfont="icon-search"
                        :value="$route.params.text"
                        @put="(value) => (searchText = value)"
                        rmfo />
                    <div class="search-view__search-box__separator"></div>
                    <btn-dropdown theme="crystal" :options="searchOptions" value="shots" />
                </div>
            </div>
            <!-- 搜索内容展示 -->
            <p class="search-view__title">{{ $route.params.text }}</p>
        </header>
        <!-- 详情页主体 -->
        <main class="search-view__main">
            <!-- 主体头部 -->
            <header class="search-view__main__header">
                <!-- 下拉列表按钮 -->
                <btn-dropdown :options="viewOptions" matchroute />
                <!-- 分类筛选栏 -->
                <category-bar class="mg-h32" :options="categoryOptions" matchroute />
                <!-- 过滤按钮 -->
                <icon-link @clickfn="showFilter = !showFilter" iconfont="icon-filter" name="过滤" :count="filterCounter" />
            </header>
            <!-- 过滤选项 -->
            <transition name="filter-options">
                <div class="filter-options" v-show="showFilter">
                    <form-input
                        label="标题"
                        name="title"
                        iconfont="icon-title_1"
                        placeholder="输入画作标题（支持模糊查询）"
                        @put="formInputGetter" />
                    <form-input
                        label="作者"
                        name="author"
                        iconfont="icon-user"
                        placeholder="输入作者名称（支持模糊查询）"
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
            <board :loading="loading" :data="shots" route="search/shot-details-popup"></board>
            <!-- 作品详情路由视图 -->
            <router-view name="ShotDetailsPopupView"></router-view>
        </main>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { appSearchCategoryOptions, appSearchViewOptions, appSearchInputOptions } from "@/options";

import FormInput from "@/components/FormInputComp.vue";
import BtnDropdown from "@/components/BtnDropdownComp.vue";
import categoryBar from "@/components/CategoryBarComp.vue";
import iconLink from "@/components/IconLinkComp.vue";
import Board from "@/components/BoardComp.vue";

export default {
    name: "SearchView",
    components: { FormInput, BtnDropdown, categoryBar, iconLink, Board },
    data() {
        return {
            categoryOptions: appSearchCategoryOptions,
            viewOptions: appSearchViewOptions,
            searchOptions: appSearchInputOptions,
            showFilter: false,
            searchText: null,
            filterInfo: { title: "", author: "", tags: "" },
        };
    },
    methods: {
        // 接收 fromInput 组件的输入框值
        formInputGetter: function (value, key) {
            this.filterInfo[key] = value;
        },
        // 数据获取函数
        fetchData: function (filterInfo) {
            // 设置筛选信息
            this.$store.commit("appMain/setFilterInfo", filterInfo);
            // 请求数据
            this.$store.dispatch("appMain/fetchShots");
        },
    },
    computed: {
        ...mapState("appMain", { shots: "shots", loading: "loadingState" }),
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
                this.fetchData(newValue);
            },
        },
        // 侦听搜索输入框值变化，刷新数据
        searchText: function (newValue) {
            if (newValue === this.$route.params.text) return;
            this.$router.push({ name: "search", params: { text: newValue } });
        },
        // 侦听路由变化，更新导航栏按钮的params
        $route: {
            immediate: true,
            handler({ params }) {
                this.categoryOptions.forEach((item) => {
                    item.to.params.view = params.view;
                    item.to.params.text = params.text;
                });
                this.viewOptions.forEach((item) => {
                    item.to.params.category = params.category;
                    item.to.params.text = params.text;
                });
            },
        },
    },
    created() {
        this.fetchData(this.$route.params);
    },
    beforeRouteUpdate(to, from, next) {
        if (from.name == "search" && to.name == "search") this.fetchData(to.params);
        next();
    },
};
</script>

<style scoped>
/* search-view__main */
.search-view__main {
    padding: 0 64px;
    display: flex;
    flex-direction: column;
}

/* search-view__main__header */
.search-view__main__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    user-select: none;
}

/* search-view__search-box-wrap */
.search-view__search-box-wrap {
    width: 100%;
    height: 72px;
    background: #f3f3f4;
    position: relative;
    margin-bottom: 48px;
}

.search-view__search-box {
    height: 64px;
    margin: 0 calc(100vw * 0.26);
    border-radius: var(--bd-rds-12);
    position: relative;
    top: 38px;
    background: white;
    box-shadow: 0 0 10px 2px #eee;
    display: flex;
    align-items: center;
    padding: 0 8px 0 16px;
}

.search-view__search-box-input {
    width: 100%;
}

.search-view__search-box__separator {
    width: 2px;
    height: 48%;
    background: #cfcfcf;
    margin: 0 8px;
}

/* search-view__title */
.search-view__title {
    font-size: 32px;
    text-transform: capitalize;
    text-align: center;
    padding: 16px 0;
    color: black;
    margin-bottom: 16px;
    font-weight: bolder;
}

/* filter-options */
.filter-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(128px, 1fr));
    grid-gap: 36px;
    transition: all 0.1s ease;
    margin-top: 32px;
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

/* 处理浏览器宽度（响应式）*/
@media screen and (max-width: 910px) {
    .search-view__search-box {
        margin: 0 64px;
    }
    .filter-options {
        gap: 16px;
        margin-top: 16px;
    }
}

@media screen and (max-width: 635px) {
    .filter-options {
        grid-template-columns: 1fr;
        gap: 16px;
        margin-top: 16px;
    }
}
</style>
