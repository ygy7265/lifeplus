import React, {useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme/theme';
import Home from './theme/Home';
import {GlobalStyle} from "./theme/GlobalStyle";
import './App.css';
import ImageSlider from "./components/ImageSlider";
import { IMAGES, VIDEOS, LARGE_IMAGES } from "./data/data";


function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <>
            <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
                <GlobalStyle />

                <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <HitSearch/>
                <div className='mainContainer'>

                <div className='container'>
                    <ImageSlider images={VIDEOS} />
                </div>
                {/*<div className='container'>*/}
                {/*    <ImageSlider images={IMAGES} slidesToShow={5} />*/}
                {/*</div>*/}
                    <div className='effect'>
                    <div className="scene">
                        <div className="carousel" style={{transform: 'translateZ(-489px) rotateY(-20deg)'}}>
                            <div className="carousel__cell">
                                <img src='https://imgnews.pstatic.net/image/020/2023/11/03/0003529132_001_20231103115201068.jpg?type=w800'/>
                                <h1 style={{borderBottom:'1px solid white',paddingTop:'20px'}}>[단독]김포시, ‘서울시 자치구’로 편입되면 지방세수 최소 2587억 원 깎여</h1>
                            </div>
                            <div className="carousel__cell">2</div>
                            <div className="carousel__cell">3</div>
                            <div className="carousel__cell">4</div>
                            <div className="carousel__cell">5</div>
                            <div className="carousel__cell">6</div>
                            <div class="carousel__cell">7</div>
                            <div class="carousel__cell">8</div>
                            <div class="carousel__cell">9</div>
                        </div>
                    </div>
                    </div>
                </div>
            </ThemeProvider>

        </>
    );
}


function HitSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // 가상의 검색 결과
    const fakeSearchResults = [
        'React 실시간 검색어 1',
        'React 실시간 검색어 2',
        'React 컴포넌트',
        'React 상태 관리',
        '리액트 실습',
        'React 실시간 검색어 1',
        'React 실시간 검색어 2',
        'React 컴포넌트',
        'React 상태 관리',
        '리액트 실습',
    ];
    window.onload = function () {
        let i = 0;

        function textBold() {
            console.log("i++" + i);

            let ranks = document.querySelectorAll('.rank');

            // 클래스 제거
            if (i > 0) {
                ranks[i-1].classList.remove('on');
            }
            if (i >= fakeSearchResults.length) {
                i = 0;
            }

            // 클래스 추가
            ranks[i].classList.add('on');

            i++;



            // setTimeout 함수 내에서 재귀 호출하여 반복
            setTimeout(textBold, 500);
        }

        textBold();
    }



    return (

        <div className='hotSearch'>
            <Weather/>
            <div className='searchList'>
            <h3>실시간 검색어</h3>
            <ul className="search-results">
                {fakeSearchResults.map((result, index) => (
                    <li className='rank' text="test">{index+1}.  {result}</li>
                ))}
            </ul>
            </div>
        </div>
    );
}

function Weather(){
    return(
        <div className='weatherComponents'>

            <div style={{display:'inline-block',fontSize:'1rem',width:'100%',position:'relative'}}>
                <img src='/images/sun.png'/>
                <span style={{fontSize:'1.5rem',marginBottom:'20px',position:'absolute',top:'30%',right:'5%'}}>2023/11/02 20:30:23</span>
            </div>
            <ul>
                <li>
                    <span>습도: 30%</span>
                    <span>강수량: -</span>
                    <span>풍속: 3m/s</span>
                </li>
            </ul>

        </div>
    )
}
export default App;
