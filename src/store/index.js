import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import appMainStoreModule from "./appMain.subStore";
import shotDetailsStoreModule from "./shotDetails.subStore";
import authorStoreModule from "./author.subStore";

const store = new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters: {},

    modules: {
        appMain: appMainStoreModule,
        shotDetails: shotDetailsStoreModule,
        author: authorStoreModule,
    },
});

export default store;
