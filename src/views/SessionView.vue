<template>
    <div class="session-view">
        <aside>
            <app-logo color="white" />
            <p>Create by Nathan. @2023.08.22</p>
        </aside>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import AppLogo from "@/components/AppLogoComp.vue";

export default {
    name: "SessionView",
    components: { AppLogo },
    computed: {
        asideImageUrl() {
            const urlSet = [
                "/images/works/d.webp",
                "/images/works/h.webp",
                "/images/works/t.webp",
                "/images/works/a.webp",
                "/images/works/c.webp",
                "/images/works/j.webp",
                "/images/works/f.webp",
                "/images/works/f3.webp",
            ];
            const randomIndex = Math.floor(Math.random() * urlSet.length);
            return `url(${urlSet[randomIndex]})`;
        },
    },
};
</script>

<style>
.session-view {
    width: 100%;
    height: 100%;
    display: flex;

    & aside {
        display: flex;
        width: 24%;
        aspect-ratio: 2/1;
        padding: 32px;
        flex-direction: column;
        justify-content: space-between;
        background-image: v-bind(asideImageUrl);
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
        flex: none;

        & p {
            color: #666;
            font-weight: 500;
        }
    }

    & main {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        padding-left: 128px;

        .session-sub-view {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: left;
            color: black;

            & form {
                flex: auto;
                max-width: 360px;
                display: flex;
                flex-direction: column;
                gap: 2rem;

                & h1 {
                    font-weight: 26px;
                    font-weight: 400;
                }

                .form-input-bar {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    & label {
                        font-weight: 400;
                    }
                }

                .bottom-text {
                    font-size: 13px;

                    & a {
                        color: #666;
                    }
                }
            }
        }

        .wide-button {
            height: 42px;
            border-radius: 6px;
            outline: none;
            border: none;
            background-color: #ccc;
            font-size: 14px;
            font-weight: 500;
            color: #666;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
            margin-top: 16px;

            &:hover {
                background-color: #bbb;
            }
        }
    }

    @media (max-width: 1280px) {
        & main {
            padding: 32px;

            .session-sub-view {
                justify-content: center;
            }
        }
    }

    @media (max-width: 768px) {
        & aside {
            display: none;
        }
        & main {
            padding: 8px;
        }
    }
}
</style>
