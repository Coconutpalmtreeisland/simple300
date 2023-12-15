import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

const PostDetail = () => {
    // 하나의 정보이기 때문에 객체로
    const [postInfo, setPostInfo] = useState({});
    // 로딩 (데이터 불러오는 시간 벌기 위해)
    const [flag, setFlag] = useState(false);

    // 주소값 가져오기
    let params = useParams();
    let navigate = useNavigate();
    const user = useSelector(state => state.user);

    // console.log(postInfo.image)
    useEffect(() => {
        let body = {
            postNum: params.postNum,
        }

        axios
            .post('/api/post/detail', body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.post);
                setFlag(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum]);

    const DeleteHandler = () => {
        if (window.confirm("정말로 삭제하겠습니까?")) {
            let body = {
                postNum: params.postNum,
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/list");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패했습니다.")
                })
        }
    }

    return (
        <div className='detail__wrap'>
            {flag ? (
                <>
                    <div className='detail__title'>
                        <h3>{postInfo.title}</h3>
                        <span className='auth'>{postInfo.author.displayName}</span>
                    </div>
                    <div className="detail__content">
                        {/* 이미지가 있을 시 보여주기 */}
                        {postInfo.image ? <img src={postInfo.image} alt={postInfo.title} /> : null}
                        {/* DB로컬용 */}
                        {/* {postInfo.image ? <img src={`http://localhost:5050/${postInfo.image}`} alt={postInfo.title} /> : null} */}
                        {postInfo.content}
                    </div>
                    {user.uid === postInfo.author.uid && (
                        <div className="detail__btn">
                            <Link to={`/modify/${postInfo.postNum}`}>
                                수정하기
                            </Link>
                            <button onClick={() => DeleteHandler()}>삭제하기</button>
                            <Link to='/list'>목록보기</Link>
                        </div>
                    )}
                </>

            ) : (
                <div>로딩중</div>
            )}
        </div>
    )
}

export default PostDetail