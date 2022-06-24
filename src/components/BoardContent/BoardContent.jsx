import "./BoardContent.scss";
import { useState, useEffect } from "react";
import TicketModal from "../TicketModal/TicketModal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardContent = (props) => {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [ticketForModal, setTicketForModal] = useState({});
  const [newTask1, setNewTask1] = useState("");
  const [newTask2, setNewTask2] = useState("");
  const [newTask3, setNewTask3] = useState("");
  const [addNewCard1, setAddNewCard1] = useState(false);
  const [addNewCard2, setAddNewCard2] = useState(false);
  const [addNewCard3, setAddNewCard3] = useState(false);
  const apiUrl = "http://localhost:3001/tasks";

  function pullJson() {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((responseData) => {
        let doit = responseData.filter((x) => x.state === "todo");
        let progressit = responseData.filter((x) => x.state === "inprogress");
        let doneit = responseData.filter((x) => x.state === "done");
        setTodos(doit);
        setProgress(progressit);
        setDone(doneit);
      });
  }

  useEffect(() => {
    pullJson();
  }, []);

  const handleSubmit = async (e, state) => {
    e.preventDefault();
    try {
      let res = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          title: newTask1 || newTask2 || newTask3,
          description: "",
          state: state,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.status === 201) {
        setNewTask1("");
        setNewTask2("");
        setNewTask3("");
        pullJson();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="board-columns">
        <div className="column">
          {modalShown && (
            <TicketModal ticket={ticketForModal} setShown={setModalShown} /> //ako je true pokazi komponentu
          )}
          <header>To do</header>
          <ul>
            {todos.map((ticket) => (
              <li
                key={ticket.id}
                onClick={() => {
                  setTicketForModal(ticket);
                  setModalShown(true);
                }}
              >
                {ticket.title}
              </li>
            ))}
            <li>
              {addNewCard1 === true && (
                <form onSubmit={(e) => handleSubmit(e, "todo")}>
                  <input
                    placeholder="Enter a title for this card..."
                    type="text"
                    value={newTask1}
                    onChange={(e) => setNewTask1(e.target.value)}
                  />
                  <br></br>
                  <button type="submit" id="button">
                    Add card
                  </button>
                  <button id="xMark" onClick={() => setAddNewCard1(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </form>
              )}
            </li>
          </ul>
          {addNewCard1 === false && (
            <footer>
              <div className="footer-action">
                <i
                  className="fa fa-plus icon"
                  onClick={() => setAddNewCard1(true)}
                ></i>
                Add another card
              </div>
            </footer>
          )}
        </div>
        <div className="column">
          <header>In progress</header>
          <ul>
            {progress.map((ticket) => (
              <li
                key={ticket.id}
                onClick={() => {
                  setTicketForModal(ticket);
                  setModalShown(true);
                }}
              >
                {ticket.title}
              </li>
            ))}
            <li>
              {addNewCard2 === true && (
                <form onSubmit={(e) => handleSubmit(e, "inprogress")}>
                  <input
                    placeholder="Enter a title for this card..."
                    type="text"
                    value={newTask2}
                    onChange={(e) => setNewTask2(e.target.value)}
                  />
                  <button type="submit" id="button">
                    Add card
                  </button>
                  <button id="xMark" onClick={() => setAddNewCard2(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </form>
              )}
            </li>
          </ul>
          {addNewCard2 === false && (
            <footer>
              <div className="footer-action">
                <i
                  className="fa fa-plus icon"
                  onClick={() => setAddNewCard2(true)}
                ></i>
                Add another card
              </div>
            </footer>
          )}
        </div>
        <div className="column">
          <header>Done</header>
          <ul>
            {done.map((ticket) => (
              <li
                key={ticket.id}
                onClick={() => {
                  setTicketForModal(ticket);
                  setModalShown(true);
                }}
              >
                {ticket.title}
              </li>
            ))}
            <li>
              {addNewCard3 === true && (
                <form onSubmit={(e) => handleSubmit(e, "done")}>
                  <input
                    type="text"
                    placeholder="Enter a title for this card..."
                    value={newTask3}
                    onChange={(e) => setNewTask3(e.target.value)}
                  />
                  <button type="submit" id="button">
                    Add card
                  </button>
                  <button id="xMark" onClick={() => setAddNewCard3(false)}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </form>
              )}
            </li>
          </ul>
          {addNewCard3 === false && (
            <footer>
              <div className="footer-action">
                <i
                  className="fa fa-plus icon"
                  onClick={() => setAddNewCard3(true)}
                ></i>
                Add another card
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
};
export default BoardContent;
