import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

const instance = axios.create({
    baseURL: "http://localhost:8081",
    timeout: 5000,
});

Vue.use(VueAxios, instance);
