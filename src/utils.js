function debounce(func, delay = 1000) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, delay);
    };
}

function debounce2(func, { delay = 1000, immediate = false }) {
    let timer = null;
    if (immediate) {
        return function (...args) {
            let res = null;
            if (timer == null) res = func.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
            return res;
        };
    } else return debounce(func, delay);
}

function debounce3(func, delay = 1000, callback = null, immediate = true) {
    let timer = null;
    if (immediate) {
        return function (...args) {
            let res = null;
            if (timer == null) res = func.apply(this, args);
            timer = setTimeout(() => {
                callback instanceof Function && callback.call();
                timer = null;
            }, delay);
            return res;
        };
    } else return debounce(func, delay);
}

function printer(trigger, message, ...args) {
    console.log(`[${trigger}]`, message, ...args);
}

function warner(trigger = null, message, ...args) {
    console.log(`[${trigger}]`, message, ...args);
}

function parseQueryObject(queryObject) {
    let queryString = "?";
    let ruleString = "";
    // 遍历请求对象
    for (let key in queryObject) {
        // 定义value
        const value = queryObject[key];
        // 判断是否为null
        if (!value) continue;
        // 检测当前成员的值类型
        switch (typeof value) {
            // 数字类型
            case "number":
                queryString += `${key}=${value}&`;
                break;
            // 字符串类型
            case "string":
                if (value === "") continue;
                // 写入请求字符串
                else queryString += `${key}=${value}&`;
                break;
            // 对象类型
            case "object":
                // 由于 typeof 一个数组是 object ，我们需要再次判断是否为数组
                if (value instanceof Array) {
                    // 循环检测
                    value.forEach((item) => {
                        if (typeof item == "string") queryString += `${key}=${item}&`;
                    });
                    break;
                } else {
                    // 检测是否为空值或忽略值
                    if (value.ignore === value.value || !value.value) continue;
                    // 匹配规则字符
                    if (value.rule) {
                        switch (value.rule) {
                            case "like":
                                ruleString = "_like";
                                break;
                        }
                    }
                    // 匹配关键字
                    if (value.keyword) key = value.keyword;
                    // 写入请求字符串
                    queryString += `${key}${ruleString}=${value.value}&`;
                }
                break;
        }
        // console.log(queryString);
    }
    queryString = queryString.slice(0, queryString.length - 1);
    // console.log(queryString);
    return queryString;
}

function randomNum(minNum, maxNum) {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

export { parseQueryObject, debounce, debounce2, debounce3, printer, warner, randomNum };
