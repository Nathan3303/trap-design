<template>
    <div id="app">
        <app-header></app-header>
        <router-view></router-view>
        <back-to-top el="#app"></back-to-top>
        <alert-box></alert-box>
    </div>
</template>

<script>
import appHeader from "@/components/AppHeaderComp.vue";
import backToTop from "@/components/BackToTopComp.vue";
import AlertBox from "@/components/AlertBoxComp.vue";
export default {
    components: { appHeader, backToTop, AlertBox },
};
</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
}
</style>
