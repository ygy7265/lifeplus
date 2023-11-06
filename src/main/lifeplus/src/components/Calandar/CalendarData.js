import React, { useState, useEffect } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './Calandar.css';

function Calendar({ onDateClick }) {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        // 데이터를 가져와서 상태를 업데이트할 때 사용할 함수
        const fetchData = () => {
            const aix = [
                { title: '판매건수 : 25건', date: '2023-11-03' },
                { title: '판매건수 : 23건', date: '2023-05-13' }
            ];
            setData(aix); // 상태를 업데이트하여 데이터를 설정
        };

        // 데이터 가져오는 비동기 작업을 수행
        fetchData();

    }, []); // 빈 배열을 두 번째 매개변수로 전달하여 이펙트 한 번만 실행
    console.log(data);

    function handleDateClick(info) {
        alert(`클릭한 날짜: ${info.dateStr}`);
    }
    function handleEventClick(info) {
        // 클릭한 이벤트에 대한 팝업 창을 띄우는 로직을 추가
        // info.event 객체를 사용하여 이벤트의 정보에 접근할 수 있습니다
        alert(`클릭한 이벤트: ${info.event.title}`);
    }
    return (
        <div>
            {/* FullCalendar 및 데이터 표시 코드를 추가하세요 */}
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={
                    {
                        start: 'today',
                        center: 'title',
                        end: 'prev,next'
                    }
                }
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={"40vh"}
                events={data}
            />
        </div>
    );
}

export default Calendar;
