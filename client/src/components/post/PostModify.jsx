import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const PostModify = () => {
    let params = useParams();
    let navigate = useNavigate();

    // 하나의 정보이기 때문에 객체로
    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 글 정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum,
        }

        axios.post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.post)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum]);

    // postinfo 가져온 거 넣기
    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert(" 모든 항목을 채워주세요!")
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios
            .post("/api/post/modify", body)
            .then((response) => {
                if (response.data.success) {
                    alert("수정이 완료되었습니다.");
                    navigate(`/list`)
                } else {
                    alert("글 수정이 실패하였습니다.")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Modify</h3>
                <p>글을 수정하세요</p>
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
                            value={title || ""}
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
                            value={content || ""}
                            onChange={(e) => {
                                setContent(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <button
                        type='submit'
                        className="btn__style2"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >취소하기</button>
                    <button
                        type='submit'
                        className="btn__style2"
                        onClick={(e) => { onSubmit(e); }}
                    >수정하기</button>
                </fieldset>
            </form>
        </div>
    )
}

export default PostModify