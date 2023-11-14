import React, {useState, useEffect, useCallback} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import './Calandar.css';
import Modal from "../CloseModal";
import ListModal from "../ListModal";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {calendarAdd,removeItem,calendarPush} from "../../store";

function Calendar({ onDateClick }) {
    const [data, setData] = useState([]);
    const [signup, setSignup] = useState(false);
    const [listStatus,setListStatus] = useState(false);
    let tokenEmail = useSelector(state => {return state.userEmail.userEmail});
    let calData = useSelector(state => {return state.calendar[0]});
    let dispatch = useDispatch();
    const handleListStatus = () =>  {
        setListStatus(!listStatus);
    }


    useEffect(() => {
        if(tokenEmail != null){
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/selectCalendar/${tokenEmail}`);
                    const data = response.data;
                    dispatch(calendarAdd(data));
                     setData(data);
                    console.log(JSON.stringify(calData));
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
                        start: 'today',
                        center: 'title',
                        end: 'prev,next'
                    }
                }
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={"50vh"}
                events={calData}
            />
            {listStatus && (
                <ListModal closeModal={() => setListStatus(!listStatus)}>
                    <div>
                        <ListData calData = {calData}/>
                    </div>
                </ListModal>
            )}

            <button className="changeCalendar" onClick={handleListStatus}>일정관리</button>
        </div>
    );
}
function AddData({modify,calId,calTitle,calContent,calDateValue,calTime}){
    let calData = useSelector(state => {return state.calendar[0]});
    let dispatch = useDispatch();
    var calendarForm = '';
    console.log("id"+calId);
    console.log("calTitle"+calTitle);
    console.log("calContent"+calContent);
    console.log("calDateValue"+JSON.stringify(calDateValue));
    console.log("calTime"+calId);
    const [calTitleValue, setCalTitle] = useState('');
    const [calContentValue, setCalContent] = useState('');
    const [dateValue, setDateTimeValue] = useState('');
    const [timeValue, setTimeValue] = useState('');


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
                    console.log(res.data);
                    dispatch(calendarPush(res.data));
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
        if(modify){
            setCalTitle(calTitle);
            setCalContent(calContent);
            setDateTimeValue(calDateValue);
            setTimeValue(calTime);
        }
        calendarForm = document.getElementById('calendarForm');
        var btnAddData = document.querySelector('.btnAddData');
        btnAddData.addEventListener('click', handleClick);

        return () => {
            btnAddData.removeEventListener('click', handleClick);
        };
    }, []);

    const hanbleDateTimeChange = (event) =>  {
        const newValue = event.target.value;
        setDateTimeValue(newValue);
    }
    const hanbleTimeChange = (event) =>  {
        const newTimeValue = event.target.value;
        setTimeValue(newTimeValue)
    }
    const hanbleTitleChange = (event) =>  {
        const newTitleValue = event.target.value;
        setCalTitle(newTitleValue);
    }
    const hanbleContentChange = (event) =>  {
        const newContentValue = event.target.value;
        setCalContent(newContentValue);
    }
    return (
        modify ? (
            <div className="signup-container">
                <h3 style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>일정수정</h3>
                <form id='calendarForm'>
                    <input type='hidden' name='id' value={calId}/>
                    <input type='hidden' name='email' value={tokenEmail}/>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"  className='calendarinput' id="calTitle" name="title" value={calTitleValue} onChange={hanbleTitleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Date</label>
                        <input type="date" className='calendarinput' id="calDate" name="date" value={dateValue} onChange={hanbleDateTimeChange}/>
                        <input type="time" className='calendarinput' id="calTime" name="time" value={timeValue} onChange={hanbleTimeChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Content</label>
                        <input type="text" className='calendarinput' id="calContent" name="content" value={calContentValue} onChange={hanbleContentChange}/>
                    </div>
                    <button type="submit" className='signup-button btnAddData'>
                        일정수정
                    </button>
                </form>
            </div>
        ) : (
            <div className="signup-container">
                <h3 style={{ borderBottom: '1px solid black', paddingBottom: '10px' }}>일정등록</h3>
                <form id='calendarForm'>
                    <input type='hidden' name='email'value={tokenEmail}/>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"  className='calendarinput' id="calTitle" name="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Date</label>
                        <input type="date" className='calendarinput' id="calDate" name="date" onChange={hanbleDateTimeChange}/>
                        <input type="time" className='calendarinput' id="calTime" name="time"  onChange={hanbleTimeChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Content</label>
                        <input type="text" className='calendarinput' id="calContent" name="content" />
                    </div>
                    <button type="submit" className='signup-button btnAddData'>
                        일정등록
                    </button>
                </form>
            </div>
        )
    );

}
function ListData({calData}){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalModify, setModalModify] = useState(false);
    const [calId,setCalId] = useState('');
    const [calTitle,setCalTitle] = useState('');
    const [calContent,setCalContent] = useState('');
    const [calDateVal,setCalDateVal] = useState('');
    const [calTime,setCalTime] = useState('');
    let dispatch = useDispatch();
    function handleModal(){
        setModalIsOpen(!modalIsOpen);
    }
    function deleteItem(result){
        let resultId = result;
        axios.delete(`/deleteCalendar/${resultId}`, {
            headers: { "Content-Type": "application/json" }
        })
            .then((res) => {
                // 성공 시 처리
                let a = dispatch(removeItem(resultId));
                alert('일정삭제가 완료되었습니다.');
            })
            .catch((error) => {
                // 실패 시 처리
                console.log(error);
                alert("일정삭제를 실패했습니다. 다시 한번 확인해 주세요.");
            });
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
                    { calData == null ? <tr><td colSpan='3'>일정없음</td></tr>:
                        calData.map((result,index) => (
                    <tr>
                        <td>{result.title}</td>
                        <td>{result.content}</td>
                        <td>{result.date}</td>
                        <td><button className='btnCal' onClick={()=>{
                            setModalIsOpen(prevIsOpen => !prevIsOpen);
                            setModalModify(true);
                            setCalId(result.id)
                            setCalTitle(result.title)
                            setCalContent(result.content)
                            setCalDateVal(result.date)
                            setCalTime(result.time)
                        }}>수정</button></td>
                        <td>
                            <button
                                className='btnCal'
                                onClick={() => {
                                    deleteItem(result.id)
                                }}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                    ))}
                    <button className='changeCalendar' onClick={() => { handleModal(); setModalModify(false); }}>일정등록</button>

                </table>


                {modalIsOpen && (
                    <Modal closeModal={() => {setModalIsOpen(!modalIsOpen);}}>
                        <div>
                            <AddData modify={modalModify} calId={calId} calTitle={calTitle} calContent={calContent} calDateValue={calDateVal} calTime={calTime}/>
                        </div>
                    </Modal>
                )}


        </div>
    );
}
export default Calendar;
