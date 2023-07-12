<template>
    <!-- App主体 -->
    <div class="app-main">
        <!-- App主体头部 -->
        <header class="app-main__header">
            <!-- 下拉列表按钮 -->
            <btn-dropdown iconfont="icon-search" :options="viewOptions" matchroute />
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
        <board :loading="loading" :data="shots" route="shot-details-popup"></board>
        <!-- 作品详情路由视图 -->
        <router-view name="ShotDetailsPopupView"></router-view>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { appMainCategoryOptions, appMainViewOptions } from "@/options";

import btnDropdown from "@/components/BtnDropdownComp.vue";
import formInput from "@/components/FormInputComp.vue";
import categoryBar from "@/components/CategoryBarComp.vue";
import iconLink from "@/components/IconLinkComp.vue";
import Board from "@/components/BoardComp.vue";

export default {
    name: "AppMainView",
    components: { btnDropdown, formInput, iconLink, categoryBar, Board },
    data() {
        return {
            categoryOptions: appMainCategoryOptions,
            viewOptions: appMainViewOptions,
            showFilter: false,
            filterInfo: { title: "", author: "", tags: "" },
        };
    },
    methods: {
        // 接收 fromInput 组件的输入框值
        formInputGetter: function (value, key) {
            this.filterInfo[key] = value;
        },
        fetchData: function (filterInfo) {
            // 设置筛选信息
            this.$store.commit("appMain/setFilterInfo", filterInfo);
            // 请求数据
            this.$store.dispatch("appMain/fetchShots");
        },
    },
    computed: {
        // 获取Vuex的States
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
        // 侦听路由变化，更新导航栏按钮的params
        $route: {
            immediate: true,
            handler({ params }) {
                this.categoryOptions.forEach((item) => (item.to.params.view = params.view));
                this.viewOptions.forEach((item) => (item.to.params.category = params.category));
            },
        },
    },
    created() {
        this.fetchData(this.$route.params);
    },
    beforeRouteUpdate(to, from, next) {
        if (from.name == "shots" && to.name == "shots") this.fetchData(to.params);
        next();
    },
};
</script>

<style scoped>
/* app-main */
.app-main {
    padding: 0 64px;
    display: flex;
    flex-direction: column;
}

/* app-main__header */
.app-main__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    user-select: none;
}

/* filter-options */
.filter-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
</style>
