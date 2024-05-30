<template>
    <div class="upload-view">
        <div class="upload-view__header">
            <router-link
                :to="{ name: 'shots' }"
                :style="{ marginRight: 'auto' }">
                <icon-link>取消</icon-link>
            </router-link>
            <icon-link theme="gray">保存为草稿</icon-link>
            <icon-link theme="blue">发布</icon-link>
        </div>
        <div class="upload-view__title">最近在致力于做些什么作品？</div>
        <div class="upload-view__body">
            <input class="upload-view__input" type="file" name="" id="" />
            <div class="upload-view__box">
                <p>点击选择，或拖动上传你的作品。</p>
                <p>大小说明：图片大小不超过 10MB，视频大小不超过 100MB。</p>
            </div>
        </div>
    </div>
</template>

<script>
import IconLink from "@/components/IconLinkComp.vue";

export default {
    name: "UploadView",
    components: {
        IconLink,
    },
};
</script>

<style scoped>
.upload-view {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.upload-view__header {
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0px 20px;
    gap: 24px;
    box-sizing: border-box;
}

.upload-view__title {
    font-size: 28px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    color: #333;
}

.upload-view__body {
    display: flex;
    justify-content: center;
    flex: 1;

    .upload-view__input {
        display: none;
    }

    .upload-view__box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 72%;
        min-width: 360px;
        height: 72%;
        border: 2px dashed #e2e2e2;
        border-radius: 8px;
        text-align: center;
        color: #999;
        font-size: 16px;
        line-height: 24px;
        box-sizing: border-box;
        opacity: 0.8;
        transition: all 0.24s;
        margin-top: 32px;

        &:hover {
            background-color: #f9f9f9;
            border-color: #d9d9d9;
            cursor: pointer;
        }

        p {
            margin-top: 16px;
            color: #363636;
        }
    }
}
</style>
