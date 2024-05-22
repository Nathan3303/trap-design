<template>
    <div class="index-view">
        <app-header></app-header>
        <router-view></router-view>
        <back-to-top el="#app"></back-to-top>
    </div>
</template>

<script>
import appHeader from "@/components/AppHeaderComp.vue";
import backToTop from "@/components/BackToTopComp.vue";
export default {
    name: "IndexView",
    components: { appHeader, backToTop },
};
</script>
