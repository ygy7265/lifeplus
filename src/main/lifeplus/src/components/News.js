/* eslint-disable */
import React, {useEffect, useState} from "react";
import axios from "axios";

function News(){
    let [turn, setTurn] = useState(-40);
    let [newsItem,setNewsItem] = useState([]);
    const carouselStyle = {
        transform: `translateZ(-800px) rotateY(${turn}deg)`,
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('/news');
                const data = response.data;
                setNewsItem(data.slice(1,11));
            } catch (error) {
                console.error("Error during axios request:", error);
            }
        };

        fetchData();

    },[]);
    return(
        <div className='effect'>

            <div className='imgCon'>
                <img src='/images/news.png'/>
            </div>
            <div className="scene">
                <div className="carousel" style={carouselStyle}>
                    {
                        newsItem.map((result,index) => (
                            <div className="carousel__cell" key={index}>
                                <img
                                    src={result.image || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg"}
                                />

                                <a href={result.url}>
                                    <h1 className="newinfo" style={{paddingTop:'5px'}}>{result.title}</h1>
                                </a>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className='btnmove'>
                <button className='prev-button' onClick={()=>{setTurn(turn+40)}}>Prev</button>
                <button className='next-button' onClick={()=>{setTurn(turn-40)}}>Next</button>
            </div>
        </div>
    )
}

export default News
