<template>
    <img ref="imageRef" :src="src" :alt="alt" />
</template>

<script>
export default {
    name: "SyncImage",
    props: {
        src: String,
        alt: String,
    },
    emits: ["loaded", "error"],
    data() {
        return {
            error: false,
        };
    },
    methods: {
        onLoad() {
            requestAnimationFrame(() => {
                requestIdleCallback(() => {
                    if (!this.$refs.imageRef) return;
                    this.$emit("loaded");
                    this.$refs.imageRef.style.opacity = 1;
                });
            });
        },
        onError() {
            if (!this.$refs.imageRef) return;
            this.error = true;
            this.$emit("error");
            this.$refs.imageRef.style.opacity = 1;
        },
    },
    mounted() {
        this.$refs.imageRef.addEventListener("load", this.onLoad);
        this.$refs.imageRef.addEventListener("error", this.onError);
    },
    beforeDestroy() {
        this.$refs.imageRef.removeEventListener("load", this.onLoad);
        this.$refs.imageRef.removeEventListener("error", this.onError);
    },
};
</script>

<style scoped>
img {
    /* width: 100%; */
    /* aspect-ratio: 4 / 3; */
    /* height: max-content; */
    transition: all 0.16s ease-in;
    opacity: 0;
    /* object-fit: cover; */
}
</style>
