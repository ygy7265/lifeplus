/* eslint-disable*/

import React, {useEffect, useMemo, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './theme/theme';
import Home from './components/Home';
import {GlobalStyle} from "./theme/GlobalStyle";
import './App.css';
import './theme/neon.css';
import ImageSlider from "./components/ImageSilder/ImageSlider";
import {useGeolocation, dfs_xy_conv} from './data/ChangeWeatherXY'
import {VIDEOS} from "./data/data";
import HitSearch from "./components/HitSearch";
import Calandar from "./components/Calandar/Calandar";
import News from "./components/News";
import axios from "axios";
import {useSelector} from "react-redux";
import {Routes, Route, Link} from "react-router-dom";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };


    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <GlobalStyle/>
                <Home isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
                <div className='main'>
                    <HitSearch isDarkMode={isDarkMode}/>
                    <div className='mainContainer'>
                        <div className='container'>
                            <div>
                                <img src='/images/youtubeText.png'/>
                            </div>
                            <ImageSlider images={VIDEOS}/>
                        </div>
                        <News/>
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


export default App;
