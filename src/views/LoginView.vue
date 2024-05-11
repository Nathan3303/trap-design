<template>
    <div class="session-sub-view">
        <form @submit.prevent="handleSubmit">
            <h1>登录到 TrapDesign</h1>
            <p class="form-input-bar">
                <label for="username">用户名 / 邮箱</label>
                <form-input id="username" placeholder="user" />
            </p>
            <p class="form-input-bar">
                <label for="password">密码</label>
                <form-input type="password" id="password" placeholder="pass" />
            </p>
            <button class="wide-button">登录</button>
            <p class="bottom-text">
                还没有账号？<router-link to="register">注册</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import FormInput from "@/components/FormInputComp.vue";
import { generateRandomString } from "@/utils";

export default {
    name: "LoginView",
    components: {
        FormInput,
    },
    methods: {
        saveToken(username) {
            const now = new Date().getTime();
            localStorage.setItem(
                "token",
                JSON.stringify({
                    username,
                    token: generateRandomString(32),
                    loginTime: now,
                    expireTime: now + 1000 * 60,
                    // * 60 * 24,
                })
            );
        },
        handleSubmit(e) {
            const username = e.target[0].value;
            const password = e.target[1].value;
            if (username === "" && password === "") {
                window.alertbox("请输入用户名和密码");
            } else if (username === "user" && password === "pass") {
                window.alertbox("登录成功", "success");
                this.saveToken(username);
                this.$router.push("/shots");
            } else {
                window.alertbox("用户名或密码错误", "error");
            }
        },
    },
};
</script>
