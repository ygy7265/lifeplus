/* eslint-disable */
import {dfs_xy_conv, useGeolocation} from "../data/ChangeWeatherXY";
import React, {useEffect, useState} from "react";
import axios from "axios";

function Weather() {
    const {latitude, longitude} = useGeolocation();
    const [itemcopy, setItemCopy] = useState({});
    var xy = dfs_xy_conv("toXY", latitude, longitude);
    const [timer, settimer] = useState("00:00:00");
    const [dateNow, setDateNow] = useState('');
    let date = new Date();

    function dateFormat() {

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
    const currentTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        settimer(`[${hours}:${minutes}:${seconds}]`);
    }


    useEffect(() => {
        let time = String(date.getHours()).padStart(2, '0');

        const fetchData = async () => {
            try {
                const response = await axios.get('/weatherAPI', {
                    params: {
                        x   : xy.x,
                        y   : xy.y,
                        date: dateFormat(),
                        time: time-1
                    }
                });
                const data = response.data;
                const body = data.response.body;

                if (body != null) {
                    const items = body.items.item;
                    setItemCopy((prevItemCopy) => {
                        let newState = {...prevItemCopy};

                        for (const item of items) {
                            const fcstValue = item.fcstValue;
                            const category = item.category;

                            newState = {
                                ...newState,
                                [category]: fcstValue
                            };
                        }

                        return newState;
                    });
                }


            } catch (error) {
                console.error("Error during axios request:", error);
            }
        };

        fetchData();
    }, [latitude, longitude]);


    return (
        <div className='weatherComponents'>

            <div style={{display: 'inline-block', fontSize: '1rem', width: '100%', position: 'relative'}}>
                <img src='/images/sun.png'/>
                <span id="timer">{dateNow}{timer}</span>
            </div>
            <ul>
                <li id="weatheritem">
                    <span>습도: {itemcopy['REH']}%</span>
                    <span>강수확률: {itemcopy['POP']} %</span>
                    <span>기온: {itemcopy['TMP']}C</span>
                </li>
            </ul>

        </div>
    )
}

export default Weather