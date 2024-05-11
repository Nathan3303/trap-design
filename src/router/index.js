import VueRouter from "vue-router";

const SessionView = () => import("@/views/SessionView.vue");
const IndexView = () => import("@/views/IndexView.vue");
const AppMainView = () => import("@/views/AppMainView.vue");
// const BoardView = () => import("@/views/BoardView.vue");
const ShotDetailsPopupView = () => import("@/views/ShotDetailsPopupView.vue");
const ShotDetailsView = () => import("@/views/ShotDetailsView.vue");
const AuthorView = () => import("@/views/AuthorView.vue");
const SearchView = () => import("@/views/SearchView.vue");

const routes = [
    // 会话路由
    {
        path: "/session",
        name: "session",
        component: SessionView,
        children: [
            {
                path: "login",
                name: "login",
                component: () => import("@/views/LoginView.vue"),
            },
            {
                path: "register",
                name: "register",
                component: () => import("@/views/RegisterView.vue"),
            },
        ],
    },
    // 根路由
    {
        path: "/",
        redirect: { name: "shots" },
        component: IndexView,
        children: [
            // 画作详情路由
            {
                name: "shot-details",
                path: "/shot/:id/",
                component: ShotDetailsView,
            },
            // 画作展示路由
            {
                name: "shots",
                path: "/shots/:view?/:category?",
                component: AppMainView,
                beforeEnter: function (to, from, next) {
                    if (!to.params.view)
                        to.params.view = from.params.view || "recommended";
                    if (!to.params.category)
                        to.params.category =
                            from.params.category || "discovery";
                    next();
                },
                children: [
                    {
                        name: "shot-details-popup",
                        path: "/shot/:id/",
                        components: { ShotDetailsPopupView },
                    },
                ],
            },
            // 搜索详细路由
            {
                name: "search",
                path: "/search/:text?/:view?/:category?",
                component: SearchView,
                beforeEnter: function (to, from, next) {
                    if (!to.params.view) to.params.view = "recommended";
                    if (!to.params.category) to.params.category = "discovery";
                    next();
                },
                children: [
                    {
                        name: "search/shot-details-popup",
                        path: "/shot/:id/",
                        components: { ShotDetailsPopupView },
                    },
                ],
            },
            // 作者详细路由
            {
                name: "author",
                path: "/authors/:name?/:category?/:view?",
                component: AuthorView,
                beforeEnter: function (to, from, next) {
                    if (!to.params.view)
                        to.params.view = from.params.view || "popular";
                    if (!to.params.category)
                        to.params.category = from.params.category || "works";
                    next();
                },
                children: [
                    {
                        name: "author/shot-details-popup",
                        path: "/shot/:id/",
                        components: { ShotDetailsPopupView },
                    },
                ],
            },
        ],
    },
];

const router = new VueRouter({ mode: "history", routes });

export default router;
