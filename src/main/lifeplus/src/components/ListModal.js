import React from "react";

function ListModal(props) {

    function closeModal() {
        props.closeModal();
    }

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="listModalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}>
                    ✖
                </button>
                {props.children}
            </div>
        </div>
    );
}

export default ListModal;
