const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 5050;
const config = require("./config/key.js"); // 환경변수 설정

// build 파일 참조
app.use(express.static(path.join(__dirname, "../client/build")));

// 클라이언트가 서버에게 보내는 데이터 받기
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 이미지 파일 참조
app.use("/image", express.static("./image"));

// express.router 사용 post.js, user.js 연동
app.use("/api/post", require("./router/post.js"));
app.use("/api/user", require("./router/user.js"));

app.listen(port, () => {
    mongoose
        .connect(config.mongoURI)
        .then(() => {
            console.log("listening -->" + port);
            console.log("mongoose --> connecting");
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});