<template>
    <div class="category-bar-wrap" :class="`category-bar-style--${theme}`" ref="categoryBarWrap">
        <span class="category-bar__operator left" v-show="isOverflow && valueOfLeft" @click="toLeft()">&lt;</span>
        <span class="category-bar__operator right" v-show="isOverflow && !isEnd" @click="toRight()">&gt;</span>
        <div class="category-bar" ref="categoryBar">
            <a
                v-for="(item, idx) in options"
                ref="links"
                :key="item.value"
                :class="{ active: idx == pointer }"
                @click.prevent="clickHandler($event, idx)">
                {{ item.name }}
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "CategoryBarComp",
    props: {
        options: Array,
        value: String,
        matchroute: Boolean,
        theme: {
            type: String,
            default: "gray",
        },
    },
    data() {
        return {
            pointer: null,
            resizeObs: null,
            maxWidth: 0,
            isOverflow: false,
            isEnd: false,
            valueOfLeft: 0,
            valueOffset: 86,
        };
    },
    methods: {
        clickHandler($event, linkIndex) {
            if (this.pointer === linkIndex) return;
            this.pointer = linkIndex;
            if (this.matchroute) this.$router.push(this.options[linkIndex].to);
            else this.$emit("clickfn", $event, linkIndex);
        },
        toRight() {
            const e = this.$refs.categoryBar;
            this.valueOfLeft -= this.valueOffset;
            const isOvered = Math.abs(this.valueOfLeft) + e.clientWidth > this.maxWidth;
            const isClose = this.maxWidth - (Math.abs(this.valueOfLeft) + e.clientWidth) < this.valueOffset;
            if (isOvered || isClose) {
                this.valueOfLeft = 0 - (this.maxWidth - e.clientWidth);
                this.isEnd = true;
            }
            this.$refs.categoryBar.style.left = this.valueOfLeft + "px";
        },
        toLeft() {
            this.isEnd = false;
            this.valueOfLeft += this.valueOffset;
            const isOvered = this.valueOfLeft > 0;
            const isClose = Math.abs(this.valueOfLeft) < this.valueOffset;
            if (isOvered || isClose) this.valueOfLeft = 0;
            this.$refs.categoryBar.style.left = this.valueOfLeft + "px";
        },
    },
    created() {
        let value = this.value;
        if (!this.options && !value) return;
        if (this.matchroute) value = this.$route.params.category;
        this.options.forEach((option, idx) => {
            if (option.value == value) this.pointer = idx;
        });
    },
    mounted() {
        for (let link of this.$refs.links) this.maxWidth += link.clientWidth;
        this.resizeObs = new ResizeObserver((entries) => {
            console.log(entries[0].contentRect.width, this.isOverflow);
            this.isOverflow = entries[0].contentRect.width < this.maxWidth;
        }).observe(this.$refs.categoryBarWrap);
    },
    beforeDestroy() {
        this.resizeObs.disconnect();
    },
};
</script>

<style scoped>
/* basic style settings */
.category-bar-wrap {
    width: 100%;
    position: relative;
    transition: all 2s ease-out;
    min-width: 128px;
    overflow: hidden;
}

.category-bar {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    left: 0;
    top: 0;
    transition: all 0.1s ease-out;
}

/* category-bar__operator */
.category-bar__operator {
    position: absolute;
    font-family: "Consolas";
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: block;
    cursor: pointer;
    color: black;
    z-index: 2;
}

.left {
    left: 0;
    padding: 0 40px 0 8px;
    background: linear-gradient(to right, #ffffffff, #ffffffff, #ffffffee, #ffffffaa, #ffffff00);
}

.right {
    right: 0;
    padding: 0 8px 0 40px;
    background: linear-gradient(to left, #ffffffff, #ffffffff, #ffffffee, #ffffffaa, #ffffff00);
}

/* category-bar-style--gray */
.category-bar-style--gray a {
    --h: 40px;
    height: var(--h);
    line-height: var(--h);
    padding: 0 16px;
    flex: none;
    background: white;
    border-radius: var(--bd-rds-6);
    color: #aaa;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
}

.category-bar-style--gray a:hover {
    color: black;
}

.category-bar-style--gray .active {
    background: rgb(243, 243, 244) !important;
    color: black !important;
}
</style>
