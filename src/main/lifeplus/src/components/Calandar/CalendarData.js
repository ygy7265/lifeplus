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
            setData(aix);
        };

        fetchData();

    }, []);

    function handleDateClick(info) {
        alert(`클릭한 날짜: ${info.dateStr}`);
    }
    function handleEventClick(info) {
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
                height={"50vh"}
                events={data}
            />
        </div>
    );
}

export default Calendar;
