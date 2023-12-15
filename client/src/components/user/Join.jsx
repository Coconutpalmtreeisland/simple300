import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase.js';

const Join = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");

    const navigate = useNavigate();

    // 회원가입 클릭 한번만 되도록
    const [flag, setFlag] = useState("");

    // const navigate = useNavigate();

    const JoinFunc = async (e) => {
        // 클릭할 수 있음
        setFlag(true);

        e.preventDefault();

        // 유효성 검사 아직 안 함
        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호를 다르게 입력했습니다.");
        }

        // firebase 회원가입 (개인정보 --> firebase (auth = 권한설정 - 이메일, 비밀번호 전달))
        let createUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        // createUserWithEmailAndPassword메서드는 이메일, 비밀번호만 전달하기때문에 따로 이름도 전달
        await createUser.user.updateProfile({
            displayName: youName,
        });

        console.log(createUser.user);

        //mongoDB 회원가입 (개인정보 --> mongoDB)
        let body = {
            email: createUser.user.multiFactor.user.email,
            displayName: createUser.user.multiFactor.user.displayName,
            uid: createUser.user.multiFactor.user.uid,
        }

        axios.post("/api/user/join", body)
            .then((response) => {
                if (response.data.success) {
                    alert("회원가입을 축하드립니다.");
                    navigate("/login");
                } else {
                    alert("회원가입에 실패했습니다.");
                }
            })

    }
    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Join</h3>
                <p>cllo 회원가입 해주세요</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">회원가입 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            name="youName"
                            placeholder="이름"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youName}
                            onChange={(e) => setYouName(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            className="input__style"
                            autoComplete='off'
                            required
                            value={youEmail}
                            onChange={(e) => setYouEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="text"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            minLength={8}
                            value={youPass}
                            onChange={(e) => setYouPass(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">비밀번호 확인</label>
                        <input
                            type="text"
                            id="youPassC"
                            name="youPassC"
                            placeholder="다시 한번 비밀번호를 적어주세요!"
                            className="input__style"
                            required
                            minLength={8}
                            value={youPassC}
                            onChange={(e) => setYouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <button disabled={flag} type="submit" className="btn__style2 mt30" onClick={(e) => JoinFunc(e)}>회원가입</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Join