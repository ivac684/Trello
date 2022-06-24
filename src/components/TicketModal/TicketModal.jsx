import React from "react";
import "./TicketModal.scss";

// get our fontawesome imports
import {
  faComputer,
  faStream,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TicketModal = (props) => {
  const { ticket, setShown } = props;
  return (
    <>
      <div className="modalOverflow" onClick={() => setShown(false)}></div>
      <div className="ticketBody">
        <div className="closeButton">
          <button onClick={() => setShown(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faComputer} /> <b>{ticket?.title}</b>
        </div>
        <div className="smallText">
          in list <u>{ticket?.state}</u>
        </div>
        <br></br>
        <div className="icon">
          <FontAwesomeIcon icon={faStream} /> <b>Description</b>
          <button type="submit" id="edit-button">
            Edit
          </button>
        </div>
        <div className="smallText">{ticket?.description}</div>
      </div>
    </>
  );
};
export default TicketModal;
