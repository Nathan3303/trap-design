import { parseQueryObject, warner } from "@/utils";

const appMainStoreModule = {
    namespaced: true,
    state: () => ({
        shots: [],
        shotsTemp: [],
        filterInfo: {
            text: { value: "", keyword: "q" },
            view: "",
            category: { value: "", ignore: "discovery" },
            title: { value: "", rule: "like" },
            author: { value: "", rule: "like" },
            tags: { value: "", rule: "like" },
            color: "",
            _expand: "author",
            _embed: "likes",
        },
        loadingState: true,
        page: 1,
        isNoMore: false,
    }),
    mutations: {
        resetNomore: (state) => (state.isNoMore = false),
        increasePage: (state) => state.page++,
        resetPage: (state) => (state.page = 1),
        setIsDirty: (state, value) => (state.isDirty = value),
        setShots: (state, value) => (state.shots = value),
        setLoadingState: (state, value) => (state.loadingState = value),
        setFilterInfo: function (state, info) {
            for (let k in info) {
                let value = info[k];
                if (state.filterInfo[k] == "undefined") continue;
                if (state.filterInfo[k] instanceof Object)
                    state.filterInfo[k].value = value;
                else state.filterInfo[k] = value;
            }
            state.isDirty = true;
        },
        filterShots: function (state) {
            if (!state.shots) return;
            state.shotsTemp = state.shots;
            switch (state.filterInfo.view) {
                case "popular":
                    state.shots = state.shotsTemp.filter((n) => n.id % 2);
                    break;
                case "latest":
                    state.shots = state.shotsTemp.filter((n) => !(n.id % 2));
                    break;
                case "following":
                    state.shots = state.shotsTemp.filter((n) => n.id >= 20);
                    break;
                case "random":
                    state.shots = state.shotsTemp.filter(
                        (n) => n.id / (Math.random() * 5 + 10) > 1
                    );
                    break;
            }
        },
        clearFilterInfo: (state) => {
            const newFilterInfo = {
                text: { value: "", keyword: "q" },
                view: "",
                category: { value: "", ignore: "discovery" },
                title: { value: "", rule: "like" },
                author: { value: "", rule: "like" },
                tags: { value: "", rule: "like" },
                color: "",
                _expand: "author",
            };
            state.filterInfo = newFilterInfo;
        },
        addPagedShotsToShots: (state, value) => {
            if (!Array.isArray(value)) return;
            if (value.length) {
                state.isNoMore = value.length < 10;
                const { shots } = state;
                const newShots = [...shots, ...value];
                state.shots = newShots;
                state.page++;
                return;
            }
            state.isNoMore = true;
        },
    },
    actions: {
        fetchShots: async function ({ state, commit }, filterInfo) {
            const queryString = parseQueryObject(
                filterInfo || state.filterInfo
            );
            commit("setLoadingState", true);
            await this._vm
                .axios("shots" + queryString)
                .then((response) => {
                    commit("setShots", response.data);
                    commit("filterShots");
                    commit("setLoadingState", false);
                })
                .catch((error) => warner("fetchShots", error));
        },
        fetchPagedShots: async function ({ state, commit }, payload) {
            if (payload.reload) {
                commit("setShots", []);
                commit("resetPage");
                commit("resetNomore");
                commit("setLoadingState", true);
            }
            let queryString = parseQueryObject(state.filterInfo);
            const limit = state.page > 1 ? 10 : 10;
            queryString += `&_page=${state.page}&_limit=${limit}&_sort=id&_order=desc`;
            // console.log(queryString);
            try {
                const response = await this._vm.axios("shots" + queryString);
                if (response.status === 200 && response.data) {
                    commit("addPagedShotsToShots", response.data);
                    if (payload.reload) {
                        commit("setLoadingState", false);
                    }
                    return;
                }
            } catch (error) {
                warner("fetchPagedShots", error);
            }
        },
    },
};

export default appMainStoreModule;
