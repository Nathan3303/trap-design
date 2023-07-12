import { parseQueryObject, warner } from "@/utils";

const appMainStoreModule = {
    namespaced: true,
    state: () => ({
        shots: null,
        shotsTemp: null,
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
    }),
    mutations: {
        setShots: (state, value) => (state.shots = value),
        setLoadingState: (state, value) => (state.loadingState = value),
        setFilterInfo: function (state, info) {
            for (let k in info) {
                let value = info[k];
                if (state.filterInfo[k] == "undefined") continue;
                if (state.filterInfo[k] instanceof Object) state.filterInfo[k].value = value;
                else state.filterInfo[k] = value;
            }
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
                    state.shots = state.shotsTemp.filter((n) => n.id / (Math.random() * 5 + 10) > 1);
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
    },
    actions: {
        fetchShots: async function ({ state, commit }, filterInfo) {
            const queryString = parseQueryObject(filterInfo || state.filterInfo);
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
    },
};

export default appMainStoreModule;
