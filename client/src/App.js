import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
// useSelector로 userSlice에서 가져오고 dispatch로 보내기 테스트용
// import { useSelector, useDispatch } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js'

import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Home from './pages/Home'
import Footer from './components/layout/Footer'

import PostWrite from './components/post/PostWrite'
import PostList from './components/post/PostList'
import PostDetail from './components/post/PostDetail'
import PostModify from './components/post/PostModify'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {
  const dispath = useDispatch();
  // const user = useSelector((state) => state.user); 테스트 용

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      // displayName, email 가지고 옴
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispath(loginUser(userInfo.multiFactor.user));
      } else {
        // 로그아웃
        dispath(clearUser())
      }
    })
  }, [dispath]);

  // 로그인 테스트
  // useEffect(() => {
  //   // php 세션과 같음 userSlice accessToken, displayName, uid 가지고 옴
  //   console.log("user : ", user);
  // }, [user])

  // 로그아웃 테스트 null 이 나옴
  // useEffect(() => {
  //   // firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/write' element={<PostWrite />}></Route>
          <Route path='/list' element={<PostList />}></Route>
          <Route path='/detail/:postNum' element={<PostDetail />}></Route>
          <Route path='/modify/:postNum' element={<PostModify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App