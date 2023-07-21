<template>
    <div class="category-bar-wrap" :class="`category-bar-theme--${theme}`" ref="categoryBarWrap">
        <span class="operator left" v-show="isOverflow && valueOfLeft" @click="scroll('left', valueOffset)"> &lt; </span>
        <span class="operator right" v-show="isOverflow && !isEnd" @click="scroll('right', valueOffset)"> &gt; </span>
        <main ref="categoryBar" :data-is-overflow="isOverflow">
            <a
                v-for="(item, idx) in options"
                ref="categoryBarLinks"
                :key="item.value"
                :class="{ active: idx == pointer }"
                @click.prevent="clickHandler($event, idx)">
                {{ item.name }}
            </a>
        </main>
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
        scroll(direction, offset) {
            const targetElement = this.$refs.categoryBar;
            let isOvered, isClose;
            switch (direction) {
                case "left":
                    this.valueOfLeft += offset;
                    isOvered = this.valueOfLeft > 0;
                    isClose = Math.abs(this.valueOfLeft) < offset;
                    if (isOvered || isClose) this.valueOfLeft = 0;
                    this.isEnd = false;
                    break;
                case "right":
                    this.valueOfLeft -= offset;
                    isOvered = Math.abs(this.valueOfLeft) + targetElement.clientWidth > this.maxWidth;
                    isClose = this.maxWidth - (Math.abs(this.valueOfLeft) + targetElement.clientWidth) < offset;
                    if (isOvered || isClose) {
                        this.valueOfLeft = 0 - (this.maxWidth - targetElement.clientWidth);
                        this.isEnd = true;
                    }
            }
            targetElement.style.left = this.valueOfLeft + "px";
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
        for (let link of this.$refs.categoryBarLinks) this.maxWidth += link.clientWidth;
        this.resizeObs = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            this.isOverflow = width < this.maxWidth;
            const difference = Math.abs(this.valueOfLeft) + width - this.maxWidth;
            if (difference > 0) this.scroll("left", difference);
        }).observe(this.$refs.categoryBarWrap);
    },
    beforeDestroy() {
        this.resizeObs.disconnect();
    },
};
</script>

<style scoped>
/* category-bar-wrap (basic style settings) */
.category-bar-wrap {
    width: 100%;
    position: relative;
    transition: all 2s ease-out;
    min-width: 128px;
    overflow: hidden;

    & .operator {
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

        &.left {
            left: 0;
            padding: 0 16px 0 8px;
            background: linear-gradient(to right, #ffffffff, #ffffffff, #ffffffee, #ffffffaa, #ffffff00);
        }

        &.right {
            right: 0;
            padding: 0 8px 0 16px;
            background: linear-gradient(to left, #ffffffff, #ffffffff, #ffffffee, #ffffffaa, #ffffff00);
        }
    }

    & main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: left 0.1s ease-out;

        &[data-is-overflow="true"] {
            justify-content: left !important;
        }
    }
}

/* category-bar-theme--gray */
.category-bar-theme--gray main {
    & a {
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

        &:hover {
            color: black;
        }
    }

    .active {
        background: rgb(243, 243, 244) !important;
        color: black !important;
    }
}
</style>
