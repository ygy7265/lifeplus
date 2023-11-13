import React, {useState, useEffect, useCallback} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './Calandar.css';
import Modal from "../CloseModal";
import ListModal from "../ListModal";
import axios from "axios";
import {useSelector} from "react-redux";

function Calendar({ onDateClick }) {
    const [data, setData] = useState([]);
    const [signup, setSignup] = useState(false);
    const [listStatus,setListStatus] = useState(false);
    let tokenEmail = useSelector(state => {return state.userEmail.userEmail});
    const handleListStatus = () =>  {
        setListStatus(!listStatus);
    }


    useEffect(() => {
        if(tokenEmail != null){
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/selectCalendar/${tokenEmail}`);
                    const data = response.data;
                    setData(data);
                    console.log(JSON.stringify(data));
                } catch (error) {
                    console.error("Error during axios request:", error);
                }
            };

            fetchData();
        }


    }, []);
    function handleDateClick(info) {
        alert(`클릭한 날짜: ${info.dateStr}`);
        setSignup(!signup);
    }
    function handleEventClick(info) {
        // alert(`클릭한 이벤트: ${info.event.title}`);
        // alert(`클릭한 이벤트: ${info.event.extendedProps.content}`);
        // alert(`클릭한 이벤트: ${JSON.stringify(info.event)}`);

    }

    return (
        <div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={'dayGridMonth'}
                headerToolbar={
                    {
                        start: 'content',
                        center: 'title',
                        end: 'prev,next'
                    }
                }
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={"50vh"}
                events={data}
            />
            {listStatus && (
                <ListModal closeModal={() => setListStatus(!listStatus)}>
                    <div>
                        <ListData data = {data}/>
                    </div>
                </ListModal>
            )}

            <button className="changeCalendar" onClick={handleListStatus}>일정관리</button>
        </div>
    );
}
function AddData(){
    const [dateValue, setDateTimeValue] = useState('');
    const [timeValue, setTimeValue] = useState('');
    var calendarForm = document.getElementById('calendarForm');
    let tokenEmail = useSelector(state => {return state.userEmail.userEmail});
    const handleClick = (e) =>{
            e.preventDefault();
            var inputFields = document.querySelectorAll('.calendarinput');
            var allInputsFilled = Array.from(inputFields).every(function (input) {
                return input.value.trim() !== '';
            });
            if(allInputsFilled){
                axios.post("/addCalendar", calendarForm, {
                    headers: { "Content-Type": "application/json" }
                })
                    .then((res) => {
                        // 성공 시 처리
                        alert('일정등록이 완료되었습니다.');
                        return window.location.replace("/");
                    })
                    .catch((error) => {
                        // 실패 시 처리
                        console.log(error);
                        alert("일정등록을 실패했습니다. 다시 한번 확인해 주세요.");
                    });
            }else{
                alert('모든 입력 필드에 값을 입력하세요.');
            }
    }
    useEffect(() => {
        var btnAddData = document.querySelector('.btnAddData');
        btnAddData.addEventListener('click', handleClick);

        return () => {
            btnAddData.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    const hanbleDateTimeChange = (event) =>  {
        const newValue = event.target.value;
        setDateTimeValue(newValue);
    }
    const hanbleTimeChange = (event) =>  {
        const newTimeValue = event.target.value;
        setTimeValue(newTimeValue)
    }
    return (
        <div className="signup-container">
            <h3 style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>일정등록</h3>
            <form id='calendarForm'>
                <input type='hidden' name='email' value={tokenEmail}/>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text"  className='calendarinput' name="title" />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Date</label>
                    <input type="date" className='calendarinput' name="date" value={dateValue} onChange={hanbleDateTimeChange}/>
                    <input type="time" className='calendarinput' name="time" value={timeValue} onChange={hanbleTimeChange}/>
                </div>
                    <div className="form-group">
                        <label htmlFor="text">Content</label>
                        <input type="text" className='calendarinput' id="name" name="content" />
                    </div>
                <button type="submit" className='signup-button btnAddData' >
                    일정등록
                </button>
            </form>
        </div>
    );
}
function ListData({data}){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [calId,setCalId] = useState('');
    const deletehahdle = useCallback((e) => {

        e.preventDefault();
        alert(calId);
        axios.delete(`/deleteCalendar/${calId}`, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                // 성공 시 처리
                alert('일정삭제가 완료되었습니다.');
                return window.location.replace("/");
            })
            .catch((error) => {
                // 실패 시 처리
                console.log(error);
                alert("일정삭제를 실패했습니다. 다시 한번 확인해 주세요.");
            });
    }, [calId]);
    useEffect(() => {
        // 선택된 모든 수정 버튼에 대해 이벤트 처리기 추가
        const editButtons = document.querySelectorAll('.btnCal');
        editButtons.forEach(button => {
            button.addEventListener('click', deletehahdle);
        });

        return () => {
            const deleteButtons = document.querySelectorAll('.btnCal');
            deleteButtons.forEach(button => {
                button.addEventListener('click', deletehahdle);
            });
        };
    }, [deletehahdle]);
    function handleModal(){
        setModalIsOpen(!modalIsOpen);
    }
    return (
        <div className="listData-container">
            <h3 style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>일정관리</h3>

                <table className='list-table'>
                    <tr>
                        <th>제목</th>
                        <th>내용</th>
                        <th colSpan='3'>시간</th>
                    </tr>
                    { data.map((result,index) => (
                    <tr>
                        <td>{result.title}</td>
                        <td>{result.content}</td>
                        <td>{result.date}</td>
                        <td><button className='btnCal' onClick={() => setCalId(result.id)}>수정</button></td>
                        <td><button className='btnCal' onClick={() => setCalId(result.id)}>삭제</button></td>


                    </tr>
                    ))}
                    <button className='changeCalendar' onClick={handleModal}>일정등록</button>
                </table>


                {modalIsOpen && (
                    <Modal closeModal={() => setModalIsOpen(!modalIsOpen)}>
                        <div>
                            <AddData data = {data}/>
                        </div>
                    </Modal>
                )}


        </div>
    );
}
export default Calendar;
