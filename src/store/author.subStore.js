import { parseQueryObject, warner } from "@/utils";

const authorStoreModule = {
    namespaced: true,
    state: () => ({
        authorInfo: null,
        loadingState: true,
        filterInfo: {
            name: "",
            _embed: ["shots", "followers"],
        },
    }),
    mutations: {
        setAuthorInfo: (state, value) => (state.authorInfo = value),
        setLoadingState: (state, value) => (state.loadingState = value),
        setNameInFilterInfo: (state, value) => (state.filterInfo.name = value),
        setFollowed: (state, value) => (state.authorInfo.followed = value),
        setFollowerObject: (state, value) => (state.authorInfo.followerObject = value),
        setFollowers: (state, value) => (state.authorInfo.followers += value),
    },
    actions: {
        fetchAuthorInfo: async function ({ state, commit }, authorName) {
            let authorInfo = null;
            // 设置加载状态
            commit("setLoadingState", true);
            // 设置过滤信息
            commit("setNameInFilterInfo", authorName);
            // 生成请求字符串
            const queryString = parseQueryObject(state.filterInfo);
            // 请求作者数据
            await this._vm
                .axios("/authors" + queryString)
                .then((response) => {
                    if (response.data.length) authorInfo = response.data[0];
                })
                .catch((error) => warner("fetchAuthorInfo", error));
            // 判断是否成功获取，若不成功则直接退出
            if (!authorInfo) return;
            // 获取成功则请求当前用户是否关注了该作者
            await this._vm
                .axios("/followers?userId=" + 1 + "&authorId=" + authorInfo.id)
                .then((response) => {
                    authorInfo.followed = !!response.data.length;
                    if (authorInfo.followed) authorInfo.followerObject = response.data[0];
                })
                .catch((error) => warner("fetchAuthorInfo", error));
            // 计算用户的关注数
            authorInfo.followers = authorInfo.followers.length;
            // 设置作者数据
            commit("setAuthorInfo", authorInfo);
            commit("setLoadingState", false);
        },
        describe: async function ({ state, commit }) {
            // 发送请求
            await this._vm.axios
                .post("/followers", {
                    userId: 1,
                    authorId: state.authorInfo.id,
                })
                // 关注成功，设置相关数据
                .then((response) => {
                    commit("setFollowerObject", response.data);
                    commit("setFollowed", true);
                    commit("setFollowers", 1);
                })
                // 关注失败，保持未关注状态
                .catch((error) => {
                    warner("describe", error);
                    commit("setFollowed", 1);
                });
        },
        undescribe: async function ({ state, commit }) {
            await this._vm.axios
                .delete("/followers/" + state.authorInfo.followerObject.id)
                .then(() => {
                    commit("setFollowerObject", null);
                    commit("setFollowed", false);
                    commit("setFollowers", -1);
                })
                .catch((error) => {
                    warner("undescribe", error);
                    commit("setFollowed", 0);
                });
        },
    },
};

export default authorStoreModule;
