import React, {useEffect, useMemo, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './theme/theme';
import Home from './components/Home';
import {GlobalStyle} from "./theme/GlobalStyle";
import './App.css';
import './theme/neon.css';
import ImageSlider from "./components/ImageSilder/ImageSlider";
import { useGeolocation,dfs_xy_conv} from './components/Weather'
import {VIDEOS} from "./data/data";
import Calandar from "./components/Calandar/Calandar";
import axios from "axios";
import {useSelector} from "react-redux";
import {Routes,Route,Link} from "react-router-dom";
function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };
    let [turn, setTurn] = useState(-40);

    return (
        <>
            <ThemeProvider theme={isDarkMode ? lightTheme : darkTheme}>
                <GlobalStyle />
                <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
                <div className='main'>
                    <HitSearch isDarkMode={isDarkMode}/>
                    <div className='mainContainer'>
                    <div className='container'>
                        <div>
                            <img src='/images/youtubeText.png'/>
                        </div>
                        <ImageSlider images={VIDEOS} />
                    </div>
                        <div className='effect'>
                            <div className='imgCon'>
                                <img src='/images/news.png'/>
                            </div>
                        <div className="scene">
                            <div className="carousel" style={{transform: `translateZ(-800px) rotateY(${turn}deg)`}}>
                                <div className="carousel__cell">
                                    <img src='https://imgnews.pstatic.net/image/020/2023/11/03/0003529132_001_20231103115201068.jpg?type=w800'/>
                                    <h1 className="newinfo" style={{borderBottom:'1px solid white',paddingTop:'5px'}}>[단독]김포시, ‘서울시 자치구’로 편입되면 지방세수 최소 2587억 원 깎여</h1>
                                    <h3 className="newinfo">동아일보</h3>
                                </div>
                                <div className="carousel__cell">2</div>
                                <div className="carousel__cell">3</div>
                                <div className="carousel__cell">4</div>
                                <div className="carousel__cell">5</div>
                                <div className="carousel__cell">6</div>
                                <div className="carousel__cell">7</div>
                                <div className="carousel__cell">8</div>
                                <div className="carousel__cell">9</div>

                            </div>

                        </div>
                            <div className='btnmove'>
                                <button className='prev-button' onClick={()=>{setTurn(turn+40)}}>Prev</button>
                                <button className='next-button' onClick={()=>{setTurn(turn-40)}}>Next</button>
                            </div>
                        </div>
                        <div className='mainCalendar'>
                            <Calandar/>
                        </div>

                    </div>
                </div>
                <footer>
                    <a href='https://github.com/ygy7265'>
                        <p>🚀 Explore my GitHub</p>
                    </a>
                    <a href='https://www.notion.so/fccf143f067942fc9aaae60ae90c1bdf?v=daf1525a452d42c9ad5d07103fc67bef'>
                        <p>📔 Discover my Notion</p>
                    </a>
                    <address>📞 Contact me at tel. 010-4946-7265</address>
                </footer>

            </ThemeProvider>

        </>
    );
}


function HitSearch(props) {
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
            let ranks = document.querySelectorAll('.rank');

            // 클래스 제거
            if (i > 0) {
                ranks[i-1].classList.remove('neon');

            }
            if (i >= fakeSearchResults.length) {
                i = 0;
            }

            // 클래스 추가
            ranks[i].classList.add('neon');


            i++;
            // setTimeout 함수 내에서 재귀 호출하여 반복
            setTimeout(textBold, 2000);
        }

        textBold();
    }



    return (

        <div className='hotSearch'>
            <Weather/>
            <div className='searchList'>
                <div className='searchContainer'>
                    {
                        props.isDarkMode ? <img src='/images/fire2.png'/> : <img src='/images/fire.png'/>
                    }
                    <h3 id="Searchtitle">Search Rank</h3>
                </div>
                    {fakeSearchResults.map((result, index) => (
                            <a href="#" className='rank'>
                                <h3> {index+1}. {result} </h3>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </a>
                    ))}
            </div>
        </div>
    );
}

function Weather(){
        const { latitude, longitude } = useGeolocation();
        const [itemcopy, setItemCopy] = useState({});
        var xy = dfs_xy_conv("toXY", latitude, longitude);
        const [timer,settimer] = useState("00:00:00");
        const [dateNow,setDateNow] = useState('');
        let date = new Date();
    function dateFormat(){

        let year = date.getFullYear(); // 연도
        let month = date.getMonth() + 1; // 월
        let day = date.getDate(); // 일

        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let formattedDate = `${year}${month}${day}`;
        setDateNow(`${year}/${month}/${day}`)

        return formattedDate;
    }

        useEffect(() => {

            const startTimer = () => {
                const intervalId = setInterval(currentTime, 1000);

                return () => clearInterval(intervalId);
            };

            startTimer();
        }, []);
    console.log("lat : "+latitude+"/lon : "+longitude);
        const currentTime = () => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            settimer(`${hours}:${minutes}:${seconds}`);
        }


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('/weatherapi', {
                    params: {
                        x: xy.x,
                        y: xy.y,
                        date: dateFormat()
                    }
                });

                const data = response.data;
                const body = data.response.body;
                const items = body.items.item;

                for (const item of items) {
                    const fcstValue = item.fcstValue;
                    const category = item.category;

                    setItemCopy((prevItemCopy) => ({
                        ...prevItemCopy,
                        [category]: fcstValue
                    }));
                }
            } catch (error) {
                console.error("Error during axios request:", error);
            }
        };

        fetchData();

    }, [latitude, longitude ]);





    return(
            <div className='weatherComponents'>

                <div style={{display:'inline-block',fontSize:'1rem',width:'100%',position:'relative'}}>
                    <img src='/images/sun.png'/>
                    <span id="timer">{dateNow}{timer}</span>
                </div>
                <ul>
                    <li id="weatheritem">
                        <span>습도: {itemcopy['REH']}%</span>
                        <span>강수확률: {itemcopy['POP']} %</span>
                        <span>풍속: {itemcopy['WSD']}m/s</span>
                    </li>
                </ul>

            </div>
        )
}


export default App;
