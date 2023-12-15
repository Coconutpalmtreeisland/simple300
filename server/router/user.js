const express = require("express");
const router = express.Router();

// 스키마 만들기
const { User } = require("../Model/User.js");
const { Counter } = require("../Model/Counter.js");

router.post("/join", (req, res) => {
    // join.jsx의 body 받기
    let temp = req.body;

    Counter.findOne({ name: "counter" })
        .then((result) => {
            // 번호 추가 result.userNum을 temp.userNum에 넣기
            temp.userNum = result.userNum;

            const userData = new User(temp);
            userData.save().then(() => {
                // 회원 번호수 증가
                Counter
                    .updateOne({ name: "counter" }, { $inc: { userNum: 1 } })
                    .then(() => {
                        res.status(200).json({ success: true })
                    })
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
})

module.exports = router;