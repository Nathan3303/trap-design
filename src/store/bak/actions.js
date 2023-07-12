import axios from "axios";
import { randomNum, printer, warner } from "@/utils";

const actions = {
    fetchShots: async function ({ commit }, queryString) {
        printer("queryString", queryString);
        // commit("setFetchShotsLoading", true);
        await axios
            .get("http://localhost:8081/shots" + queryString)
            .then((response) => {
                commit("setShots", response.data);
                commit("filterShots");
                // commit("setFetchShotsLoading", false);
            })
            .catch((error) => warner("fetchShots", error));
    },
    fetchShotById: async function ({ state, commit }, id) {
        let shot = null;
        commit("setShotDetailsViewLoading", true);
        await axios
            .get("http://localhost:8081/shots/" + id + "?_expand=author&_embed=likes")
            .then((response) => (shot = response.data))
            .catch((error) => warner("fetchShotById", error));
        if (!shot) return;
        shot.likes.forEach((item) => (shot.likedByCurrentUser = state.loginUser.userId === item.userId));
        commit("setShot", shot);
        commit("setShotDetailsViewLoading", false);
    },
    fetchShotsRandomly: async function ({ commit }) {
        const rn = randomNum(0, 20);
        // commit("setFetchShotsLoading", true);
        await axios
            .get("http://localhost:8081/shots?_start=" + rn + "&_limit=6")
            .then((response) => {
                commit("setShots2", response.data);
                // commit("setFetchShotsLoading", false);
            })
            .catch((error) => warner("fetchShotsRandomly", error));
    },
    fetchAuthorInfo: async function ({ commit }, author) {
        commit("setAuthorViewLoading", true);
        await axios
            .get("http://localhost:8081/authors?name=" + author + "&_embed=shots")
            .then((response) => {
                commit("setAuthorViewLoading", false);
                if (response.data && response.data.length == 0) return;
                commit("setAuthor", response.data[0]);
                commit("setShots", response.data[0].shots);
            })
            .catch((error) => warner("fetchAuthorInfo", error));
    },
    likeShot: async function ({ state, commit }, shotId) {
        let isLiked = false;
        await axios
            .get("http://localhost:8081/likes?shotId=" + shotId + "&userId=" + state.loginUser.userId)
            .then(({ data }) => (isLiked = data && data.length > 0))
            .catch((error) => warner("likeShot", "check like failed", error));
        if (isLiked) {
            await axios
                .delete("http://localhost:8081/likes?shotId=" + shotId + "&userId=" + state.loginUser.userId)
                .then(() => commit("setShotLiked", false))
                .catch((error) => warner("likeShot", error));
        } else {
            await axios
                .post("http://localhost:8081/likes", { userId: state.loginUser.userId, shotId })
                .then(() => commit("setShotLiked", true))
                .catch((error) => warner("likeShot", error));
        }
    },
};

export default actions;
