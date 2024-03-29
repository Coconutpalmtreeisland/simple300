const express = require("express");
const router = express.Router();
const multer = require("multer");

// 스키마 만들기
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");

// 이미지 업로드
const setUpload = require("../util/upload.js");


// 글 쓰기
router.post("/write", (req, res) => {
    // 필요한 것만 가져오기 위해 따로 지정해서 작성
    let temp = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    }

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            // 번호 추가 counter.postNum temp.postNum 넣기
            temp.postNum = counter.postNum;

            User.findOne({ uid: req.body.uid })
                .exec()
                .then((userInfo) => {
                    // (_id는 mongoDb, uid는 firebase) 작가 추가
                    temp.author = userInfo._id;
                })

            const BlogWrite = new Post(temp);
            BlogWrite
                .save()
                .then(() => {
                    Counter
                        // 포스트 번호 수 증가
                        .updateOne({ name: "counter" }, { $inc: { postNum: 1 } })
                        .then(() => {
                            res.status(200).json({ success: true })
                        })
                })
        })
        .catch((err) => {
            // console.log(err);
            res.status(400).json({ success: false });
        })

});

// 글 목록
router.post("/list", (req, res) => {
    Post
        .find()
        .populate("author")
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result })
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false })
        })
});

// 글 상세페이지
router.post("/detail", (req, res) => {
    Post
        .findOne({ postNum: req.body.postNum })
        .populate("author")
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, post: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
        })
});

// 글 수정하기
router.post("/modify", (req, res) => {
    let temp = {
        title: req.body.title,
        content: req.body.content
    }
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        })
});

// 글 삭제하기
router.post("/delete", (req, res) => {
    Post
        .deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
});

// 이미지 업로드 로컬용
// 이미지 파일에 저장
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'image/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     }
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({ success: true, filePath: res.req.file.path })
//         }
//     })
// });

router.post("/image/upload", setUpload("react.test.bucket/post"), (req, res, next) => {
    // console.log(res.req);
    res.status(200).json({ success: true, filePath: res.req.file.location })
})

module.exports = router;