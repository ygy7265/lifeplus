import React, {Component} from "react";
import Calendar from "./CalendarData"; // Calendar 컴포넌트를 가져옵니다.

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    dateClick = (info) => {
        alert(`클릭한 날짜: ${info.dateStr}`);
        // 여기에서 이벤트 정보를 처리하는 로직을 추가하세요
    }

    render() {
        return (
            <>
                <div style={{margin: 15, display: 'grid', gridTemplateColumns: "2fr 1fr"}}>
                    <Calendar/> {/* Calendar 컴포넌트를 렌더링합니다. */}
                </div>

            </>
        );
    }
}
