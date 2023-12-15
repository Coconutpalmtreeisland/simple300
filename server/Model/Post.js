const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        postNum: Number,
        image: String,
        // post와 user를 join문처럼 합쳐서 사용해서 여러 데이터 가지고 오기 때문에 uid: Number가 아니라 아래처럼 작성
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    { collection: "write" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };