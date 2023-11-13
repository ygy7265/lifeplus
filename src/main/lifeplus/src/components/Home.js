
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes,faLeaf } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import Modal from './CloseModal';
import axios from "axios";
import AuthComponent from "./AuthComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeEmail} from "../store";

function Home({ isDarkMode, toggleDarkMode}) {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [signup, setSignup] = useState(false);
  const [signType, setsignType] = useState('');
  let tokenEmail = useSelector(state => {return state.userEmail.userEmail});
  const Header = styled.div`
  width: 100%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
    
  .logo {
    margin: 0 1rem;
    font-size: 3rem;
    
  }

  .header__menulist {
    list-style: none;
    display: flex;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
      z-index: 99;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }     
`;
  function logOut(){
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      window.location.reload();
  }
    return (

        <>
            <Header isToggled={isToggled} userToggled={userToggled} className='headerNav'>

                {/* 햄버거 버튼(bar) */}
                <div
                    className="toggle"
                    onClick={() => {
                        setIsToggled(!isToggled);
                    }}
                ><FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
                </div>

                {/* Apple 로고 */}
                <div className="logo">
                    <FontAwesomeIcon icon={faLeaf}/>
                    <span className="logoText">Life+</span>
                </div>

                {/* User 버튼 */}
                <div
                    className="user"
                    onClick={() => {
                        setUserToggled(!userToggled);
                    }}
                >
                    <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
                </div>

                {/* 메뉴 리스트 */}
                <ul className="header__menulist">
                    <li>Mac</li>
                    <li>iPad</li>
                    <li>iPhone</li>
                    <li>Watch</li>
                    <li>Music</li>
                    <li>고객지원</li>
                </ul>

                {/* User 메뉴 리스트 */}
                <ul className="header__right">
                    <li
                        onClick={toggleDarkMode}
                        isDarkMode={isDarkMode}
                    >
                        {isDarkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
                    </li>
                    {
                        tokenEmail == null ?
                            <>
                            <li onClick={() => {setSignup(!signup);setsignType('Sign Up')}}>Sign Up</li>
                            <li onClick={() => {setSignup(!signup);setsignType('Sign In')}}>Sign In</li>
                            </>
                            :
                            <>
                            <li onClick={logOut}>Logout</li>
                            <li>MyPage</li>

                            </>
                    }
                </ul>
            </Header>

            {signup && (
                <Modal closeModal={() => setSignup(!signup)}>
                    <div>
                        <SignUp type={signType}/>
                    </div>
                </Modal>
            )}

        </>
    );

}


function SignUp(props) {

    const handleClick = (e) => {
        e.preventDefault();
        var signupForm = document.getElementById('signForm');
        var inputFields = document.querySelectorAll('.signupinput');
        var allInputsFilled = Array.from(inputFields).every(function (input) {
            return input.value.trim() !== '';
        });

        if (allInputsFilled) {
            if (props.type === 'Sign Up') {
                axios.post("/signup", signupForm, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
                    .then((res) => {
                        // 성공 시 처리
                        alert('회원가입이 완료되었습니다.');
                        return window.location.replace("/");
                    })
                    .catch((error) => {
                        // 실패 시 처리
                        console.log(error);
                        alert("회원가입을 실패했습니다. 다시 한번 확인해 주세요.");
                    });
            } else {
                axios.post("/login", signupForm, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                })
                    .then((res) => {
                        const newAccessToken = res.data.accessToken;
                        const useremail = res.data.email;
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;

                        localStorage.setItem('accessToken', newAccessToken);
                        localStorage.setItem('email', res.data.email);
                        localStorage.setItem('tokenExpiresIn', String(Date.now() + 3600000));
                        // 성공 시 처리
                        alert(`${useremail}님 환영합니다.`);
                        return window.location.replace("/");
                    })
                    .catch((error) => {
                        // 실패 시 처리
                        console.log(error);
                        alert("로그인 실패했습니다. 다시 한번 확인해 주세요.");
                    });
            }
        } else {
            alert('모든 입력 필드에 값을 입력하세요.');
        }
    };
        useEffect(() => {
            var btnSignUp = document.querySelector('.signUp');
            btnSignUp.addEventListener('click', handleClick);

            return () => {
                btnSignUp.removeEventListener('click', handleClick);
            };
        }, [handleClick]);

        let tokenEmail = useSelector(state => {return state.userEmail.userEmail});

        let dispatch = useDispatch();




    return (
        <div className="signup-container">
            <h3 style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>{props.type}</h3>
            <form id='signForm'>
                <div className="form-group">
                    <label htmlFor="id">Email</label>
                    <input type="text"  className='signupinput' name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"  className='signupinput' name="password" />
                </div>
                { props.type === 'Sign Up' ? (
                    <div className="form-group">
                        <label htmlFor="text">Name</label>
                        <input type="text" className='signupinput' id="name" name="name" />
                    </div>
                ) : null}
                <button type="submit" className='signup-button signUp' >
                    {props.type}
                </button>
            </form>
        </div>
    );
}
export default Home;