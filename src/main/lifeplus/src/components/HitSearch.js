/* eslint-disable */
import React, {useEffect, useState} from "react";
import axios from "axios";
import Weather from "./Weather";

function HitSearch(props) {
    const [fakeSearchResults, setSearchResult] = useState([]);

    const [rest, Setrest] = useState(props);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/search');
                const data = response.data;
                setSearchResult(data.slice(1, 11));
            } catch (error) {
                console.error("Error during axios request:", error);
            }
        };

        fetchData();

    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    window.onload = function () {
        let i = 0;

        function textBold() {
            let ranks = document.querySelectorAll('.rank');

            // 클래스 제거
            if (i > 0) {
                ranks[i - 1].classList.remove('neon');

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
                        rest.isDarkMode ? <img src='/images/fire2.png'/> : <img src='/images/fire.png'/>
                    }
                    <h3 id="Searchtitle">Search Rank</h3>
                </div>
                {fakeSearchResults.map((result, index) => (
                    <a href={result.url} className='rank' key={index}>
                        <h3> {index + 1}. {result.title} </h3>
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

export default HitSearch;