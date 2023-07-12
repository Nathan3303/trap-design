const mutations = {
    // Pure functions
    setShot: (state, value) => (state.shot = value),
    setShots: (state, value) => (state.shots = value),
    setShotsTemp: (state, value) => (state.shotsTemp = value),
    setShots2: (state, value) => (state.shots2 = value),
    setAuthor: (state, value) => (state.author = value),
    setBoardViewLoading: (state, value) => (state.boardViewLoading = value),
    setShotDetailsViewLoading: (state, value) => (state.shotDetailsViewLoading = value),
    setAuthorViewLoading: (state, value) => (state.authorViewLoading = value),
    setLikeButtonLoading: (state, value) => (state.likeButtonLoading = value),


    // Un-pure mutations
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
        // printer("mutation:filterShots", state.shots);
    },
    clearShot: (state) => {
        state.shot = null;
        state.maylike = null;
    },
    setShotLiked: function (state, value) {
        state.shot.likedByCurrentUser = value;
    },
};

export default mutations;
