import React, { useState, useRef, useEffect } from 'react'
import { Route, BrowserRouter,Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main.js'
import Login from './pages/Login.js'
import SearchFriend from './pages/SearchFriend'
import SearchGroup from './pages/SearchGroup'
import SignUp from './pages/SignUp'
import Record from './pages/Record'
import Friends from './pages/Friends'
import app from './firebase.js'
import db from './firestore.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import Groups from './pages/Groups'
import Navigation from './components/Navigation'
import FriendsProfile from './components/FriendsProfile'
import EditProfile from './components/EditProfile'


function App () {
  const auth = getAuth(app);
  /* const dummyInfo = [
    { studyId: [0, 2], name: '이혜미', email: 'gkj8963@khu.ac.kr' },
    { studyid: [1], name: '정혜인', email: 'hyemi@khu.ac.kr' }
  ] */

  //그룹 dummylist
  const dummyList = [
    {
      studyId: 0,
      name: '영어스터디',
      leader: 'gkj8963@khu.ac.kr',
      member: ['a8963@khu.ac.kr', 'kkk@naver.com']
    },
    {
      studyId: 1,
      name: '수학스터디',
      leader: 'nav@naver.com',
      member: ['gkj8963@khu.ac.kr']
    },
    {
      studyId: 2,
      name: '파이썬스터디',
      leader: 'sssd@khu.ac.kr',
      member: ['gkj8963@naver.com']
    },
    { studyId: 3, name: '스피킹스터디', leader: 'a', member: [''] }
  ]
  const [data, setData] = useState([])
 // const [info, setInfo] = useState(dummyInfo) // 전체 개인 data
  const [studyList, setStudyList] = useState(dummyList) // 전체 스터디 리스트
  const [activeMenu, setActiveMenu] = useState('home')

  //전체 유저 dummylist
  const users = [
    {
      image: '프로필 이미지',
      name: '이혜미',
      nickname: '미미',
      email: 'hyemi7375@gmail.com'
    },
    {
      image: '프로필 이미지',
      name: '정혜인',
      nickname: '혠',
      email: 'jhi2359@naver.com'
    },
    {
      image: '프로필 이미지',
      name: '정혜인',
      nickname: '혠',
      email: 'jhi2359@khu.ac.kr'
    },
    {
      image: '프로필 이미지',
      name: '이혜미',
      nickname: '혬',
      email: 'gkj8963@khu.ac.kr'
    },
    {
      image: '프로필 이미지',
      name: '혜인',
      nickname: '원',
      email: 'jhi2359@khu.ac.kr'

    },
  ];
  const [searchResult, setSearchResult] = useState(users)
  
  //Friends
  const my_friend = [
    {
      image: '프로필 이미지',
      name: '정혜인',
      nickname: '혠',
      email: 'jhi2359@khu.ac.kr'
    },
    {
      image: '프로필 이미지',
      name: '이혜미',
      nickname: '혬',
      email: 'gkj8963@khu.ac.kr'
    },
    {
      image: '프로필 이미지',
      name: '혜인',
      nickname: '원',
      email: 'jhi2359@khu.ac.kr'

    },
  ];

  //FriendsProfile
  // <div>
  //   <FriendsProfile name="정혜인" nickname="혠" email="jhi2359@khu.ac.kr" />
  //   <FriendsProfile name="이혜미" nickname="혬" email="hyemi@khu.ac.kr"/>
  //   <FriendsProfile name="정지원" nickname="원" email="hyemi@khu.ac.kr"/>
  // </div>


  // firebase
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj,setUserObj] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                  activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className={isLoggedIn?'content':''}>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Main
                  isLoggedIn={isLoggedIn} setIsLoggedIn = {setIsLoggedIn} userObj={userObj}/>
              </>
            )}
          />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <SignUp />} />
          <Route
            exact
            path="/searchFriend"
            render={() => (
              <>
                <SearchFriend
                  postList={data}
                />
              </>
            )}
          />
          <Route
            exact
            path="/searchGroup"
            render={() => (
              <>
                <SearchGroup
                  postList={data}
                />
              </>
            )}
          />
          <Route
            exact
            path="/record"
            render={() => (
              <>
                <Record />
              </>
            )}
          />
          {/* <Route
            exact
            path="/groups"
            render={() => (
              <>
                <Groups

              <FriendSearch
                postList={data}
              />
            </>
          )}
        /> */}
        <Route
          exact
          path="/groupsearch"
          render={() => (
            <>
              <GroupSearch
                postList={data}
              />
            </>
          )}
        />
        <Route
          exact
          path="/record"
          render={() => (
            <>
              <Record />
            </>
          )}
        />
        <Route
          exact
          path="/groups"
          render={() => (
            <>
              <Groups
                studyList={studyList}
                setStudyList={setStudyList}
              />
            </>
          )}
        />
        <Route
          exact
          path="/edit"
          render={() => (
              <EditProfile />
          )}
        />
        <Route
          exact
          path="/friends"
          render={() => (
              <Friends my_friend={my_friend} />
            )}
          />
        </div>
      </BrowserRouter>
    </div>
  )
}


export default App
