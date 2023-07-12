import { parseQueryObject, warner, randomNum } from "@/utils";

const shotDetailsStoreModule = {
    namespaced: true,
    state: () => ({
        shot: null,
        maylike: null,
        detailsLoadingState: false,
        maylikeLoadingState: false,
        filterInfo: {
            shot: {
                _expand: "author",
                _embed: "likes",
            },
            maylike: {
                _start: "",
                _limit: 6,
            },
        },
    }),
    mutations: {
        setShot: (state, value) => (state.shot = value),
        setMaylike: (state, value) => (state.maylike = value),
        setDetailsLoadingState: (state, value) => (state.detailsLoadingState = value),
        setMaylikeLoadingState: (state, value) => (state.maylikeLoadingState = value),
        setMaylikeRandomNumber: (state, value) => (state.filterInfo.maylike._start = value),
        setLiked: (state, value) => (state.shot.liked = value),
        setLikedObject: (state, value) => (state.shot.likedObject = value),
        setLikes: (state, value) => (state.shot.likes += value),
    },
    actions: {
        fetchShotDetails: async function ({ state, commit }, shotId) {
            let shot = null;
            // 设置加载状态
            commit("setDetailsLoadingState", true);
            // 生成请求字符串
            const queryString = parseQueryObject(state.filterInfo.shot);
            // 获取画作详情
            await this._vm
                .axios("/shots/" + shotId + queryString)
                .then((response) => (shot = response.data))
                .catch((error) => warner("fetchShotDetails", error));
            // 获取是否喜欢
            await this._vm
                .axios("/likes?userId=1&shotId=" + shotId)
                .then((response) => {
                    shot.liked = !!response.data.length;
                    if (shot.liked) shot.likedObject = response.data[0];
                })
                .catch((error) => warner("fetchShotDetails", error));
            // 统计喜爱数量
            shot.likes = shot.likes.length;
            // 设置数据
            commit("setShot", shot);
            commit("setDetailsLoadingState", false);
        },
        fetchMaylike: async function ({ state, commit }) {
            // 设置加载状态
            commit("setMaylikeLoadingState", true);
            // 获取随机数
            const rn = randomNum(0, 20);
            // 设置随机数
            commit("setMaylikeRandomNumber", rn);
            // 生成请求字符串
            const queryString = parseQueryObject(state.filterInfo.maylike);
            // 请求数据
            await this._vm
                .axios("/shots" + queryString)
                .then((response) => {
                    commit("setMaylike", response.data);
                    commit("setMaylikeLoadingState", false);
                })
                .catch((error) => warner("fetchMaylike", error));
        },
        likeShot: async function ({ state, commit }) {
            await this._vm.axios
                .post("/likes", {
                    userId: 1,
                    shotId: state.shot.id,
                })
                .then((response) => {
                    commit("setLikedObject", response.data);
                    commit("setLiked", true);
                    commit("setLikes", 1);
                })
                .catch((error) => warner("likeShot", error));
        },
        unlikeShot: async function ({ state, commit }) {
            await this._vm.axios
                .delete("/likes/" + state.shot.likedObject.id)
                .then(() => {
                    commit("setLikedObject", null);
                    commit("setLiked", false);
                    commit("setLikes", -1);
                })
                .catch((error) => warner("unlikeShot", error));
        },
    },
};

export default shotDetailsStoreModule;
