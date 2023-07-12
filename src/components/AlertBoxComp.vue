<template>
    <div class="alert-box-wrap">
        <transition name="alert-box">
            <div v-show="isShow" class="alert-box" :class="`alert-box-type--${type}`">
                <i class="iconfont icon-details"></i>
                {{ message }}
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "AlertBoxComp",
    data() {
        return {
            isShow: false,
            type: null,
            message: null,
            timer: null,
        };
    },
    methods: {
        alertbox: function (message, type = "info", callback) {
            this.isShow = true;
            this.type = type;
            this.message = message;
            const _this = this;
            if (this.timer != null) this.timer = null;
            this.timer = setTimeout(function () {
                _this.isShow = false;
                _this.timer = null;
                if (callback instanceof Function) callback();
            }, 3000);
        },
    },
    created() {
        window.alertbox = this.alertbox;
    },
};
</script>

<style scoped>
.alert-box-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    background: none;
}

.alert-box {
    padding: 8px 16px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    margin-top: 20px;
    position: absolute;
    z-index: 99;
    background: var(--primary-bg-clr);
    box-shadow: 0 0 5px 2px var(--primary-bg-clr);
    color: white;
    transition: all 0.3s ease-in-out;
}

.alert-box-enter-to,
.alert-box-leave {
    margin-top: 20px;
    opacity: 1;
}

.alert-box-enter,
.alert-box-leave-to {
    margin-top: 12px;
    opacity: 0;
}

/* alert-box-type--error */
.alert-box-type--error {
    background: rgb(255, 74, 74) !important;
    box-shadow: 0 0 5px 2px rgb(255, 74, 74) !important;
}
</style>
