<template>
    <div class="session-sub-view">
        <form @submit.prevent="handleSubmit">
            <h1>注册 TrapDesign 账号</h1>
            <div class="top-form-input-bar">
                <p class="form-input-bar">
                    <label for="name">名称</label>
                    <form-input id="name" />
                </p>
                <p class="form-input-bar">
                    <label for="username">用户名</label>
                    <form-input id="username" />
                </p>
            </div>
            <p class="form-input-bar">
                <label for="email">邮箱</label>
                <form-input type="email" id="email" />
            </p>
            <p class="form-input-bar">
                <label for="password">密码</label>
                <form-input type="password" id="password" />
            </p>
            <button class="wide-button">注册</button>
            <p class="bottom-text">
                已有账号？<router-link to="login">登录</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import FormInput from "@/components/FormInputComp.vue";

export default {
    name: "LoginView",
    components: {
        FormInput,
    },
    methods: {
        handleSubmit(e) {
            const loginData = {
                username: e.target[0].value,
                password: e.target[1].value,
            };
            console.log("handleSubmit", e);
            console.log(loginData);
            if (
                loginData.username === "admin" &&
                loginData.password === "password"
            ) {
                this.$router.push("/shots");
            } else {
                console.log("Invalid username or password");
            }
        },
    },
};
</script>

<style scoped>
.session-sub-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;

    & form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 50%;

        & h1 {
            font-weight: 26px;
            font-weight: 400;
        }

        .top-form-input-bar {
            display: flex;
            gap: 2rem;
            width: 100%;

            .form-input-bar {
                width: 50%;
            }
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

    .wide-button {
        height: 48px;
        border-radius: 48px;
        outline: none;
        border: none;
        background-color: #666;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        margin-top: 16px;

        &:hover {
            background-color: darkslategray;
        }
    }
}
</style>
