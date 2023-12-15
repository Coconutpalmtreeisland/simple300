if (process.env.NODE_ENV === "production") {
    // 배포 상태일 때
    module.exports = require("./production.js");
} else {
    // 개발 상태일 때
    module.exports = require("./div.js");
}