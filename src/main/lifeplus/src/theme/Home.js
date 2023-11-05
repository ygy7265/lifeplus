
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faTimes,faLeaf } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import Modal from '../components/CloseModal';

function Home({ isDarkMode, toggleDarkMode }) {
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [signup, setSignup] = useState(false);
  const [signType, setsignType] = useState('');
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
                    <li onClick={() => {setSignup(!signup);setsignType('Sign Up')}}>Sign Up</li>
                    <li onClick={() => {setSignup(!signup);setsignType('Sign In')}}>Sign In</li>
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

    return (
        <div className="signup-container">
            <h3 style={{borderBottom: '1px solid black',paddingBottom: '10px'}}>{props.type}</h3>
            <form>
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input type="text" id="id" name="id" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button type="submit" className="signup-button">{props.type}</button>
            </form>
        </div>
    );
}


export default Home;