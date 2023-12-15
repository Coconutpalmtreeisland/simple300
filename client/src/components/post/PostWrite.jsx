import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import PostImage from './PostImage';

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let navigate = useNavigate();
    // userSlice에서 가져오기
    const user = useSelector((state) => state.user);

    // 세션 체크와 같음
    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인한 회원만 글을 작성할 수 있습니다.");
            navigate("/login");
        }

        // 경고 표시 없애는 용
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("내용을 작성해주세요!");
        }

        // 값이 있으면 router post.js 글쓰기에 보냄
        let body = {
            title: title,
            content: content,
            image: image,
            uid: user.uid,
        }

        axios
            .post("/api/post/write", body)
            .then((response) => {
                if (response.data.success) {
                    // 데이터가 잘 전송됨
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다");
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Write</h3>
                <p>cllo에 글을 작성하세요</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">게시글 작성 영역</legend>
                    <div>
                        <label htmlFor="title" className="required blind">제목</label>
                        <input
                            type="text"
                            id="title"
                            placeholder='제목을 작성하세요'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="required blind">내용</label>
                        <textarea
                            type="text"
                            id="content"
                            placeholder='내용을 작성하세요'
                            value={content}
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        />
                    </div>

                    {/* 컴포넌트화 했기 때문에 props */}
                    <PostImage setImage={setImage} />

                    <button
                        type='submit'
                        className="btn__style2 mt30"
                        onClick={(e) => {
                            onSubmit(e);
                        }}
                    >작성</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PostWrite