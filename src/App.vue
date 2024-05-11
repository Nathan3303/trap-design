<template>
    <div id="app">
        <router-view></router-view>
        <alert-box></alert-box>
    </div>
</template>

<script>
import AlertBox from "@/components/AlertBoxComp.vue";

export default {
    name: "App",
    components: { AlertBox },
};
</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
}
</style>
