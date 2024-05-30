<template>
    <div ref="marqueeRef" class="marquee">
        <div ref="marqueeTrackRef" class="marquee__track">
            <div
                class="marquee-item"
                v-for="(item, idx) in 12"
                :key="`a${idx}`">
                <sync-image
                    :src="`https://picsum.photos/600/800?${idx}`"></sync-image>
            </div>
            <div
                class="marquee-item"
                v-for="(item, idx) in 12"
                :key="`b${idx}`">
                <sync-image
                    :src="`https://picsum.photos/600/800?${idx}`"></sync-image>
            </div>
        </div>
    </div>
</template>

<script>
import SyncImage from "./SyncImageComp.vue";

export default {
    name: "MarqueeComp",
    components: {
        SyncImage,
    },
    data() {
        return {
            observer: null,
        };
    },
    methods: {
        observeMarquee() {
            if (this.$refs.marqueeRef);
            this.observer = new IntersectionObserver((entries) => {
                const playState = entries[0].isIntersecting
                    ? "running"
                    : "paused";
                this.$refs.marqueeTrackRef.style.animationPlayState = playState;
            });
            this.observer.observe(this.$refs.marqueeRef);
        },
    },
    mounted() {
        // console.log(this.$refs.marqueeRef);
        const { marqueeTrackRef } = this.$refs;
        const marqueeTrackWidth = marqueeTrackRef.offsetWidth;
        const animationTime = marqueeTrackRef.children.length * 2.5;
        this.$refs.marqueeRef.style.setProperty(
            "--marquee-transform-offset",
            `-${(marqueeTrackWidth + 36) / 2}px`
        );
        this.$refs.marqueeTrackRef.style.animationDuration = `${animationTime}s`;
        this.observeMarquee();
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
};
</script>

<style scoped>
/* Animation */

@keyframes marquee-slide {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(var(--marquee-transform-offset)));
    }
}

/* Variables */

.marquee {
    --marquee-transform-offset: 0;
}

/* Original styles */

.marquee {
    display: flex;
    width: 100%;
    overflow: hidden;

    .marquee__track {
        display: flex;
        align-items: center;
        gap: 36px;
        animation: marquee-slide linear infinite;

        .marquee-item {
            width: 256px;
            aspect-ratio: 3 / 4;
            background-color: #efefef;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 24px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
