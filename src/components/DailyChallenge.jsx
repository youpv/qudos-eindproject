import React, { useState, useEffect } from 'react'
import Triangle from '../img/triangle-btn-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import tasks from '../data/NameTasks.json'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


const DailyChallenge = () => {
  const [show, toggleShow] = useState(false);
  const [task, setTask] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUserNames() {
      // fetch all displayNames from every user in users
      await getDocs(collection(db, "users"))
        .then((querySnapshot) => {
          const list = querySnapshot.docs.map((doc) => doc.data().displayName);
          setUsers(list);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        })
    }
    getUserNames();
  }, []);



  const onCompleted = (state) => {
    toggleShow(!show);
  }

  const handleClick = () => {
    toggleShow(true);
    let randomUser = users[Math.floor(Math.random() * users.length)];
    let randomTaskNamed = tasks[1].NameNeeded[Math.floor(Math.random() * tasks[1].NameNeeded.length)];
    let randomTaskUnnamed = tasks[0].noNameNeeded[Math.floor(Math.random() * tasks[0].noNameNeeded.length)];
    let randomTask = Math.random() < 0.5 ? randomTaskNamed + " " + randomUser : randomTaskUnnamed;
    setTask(randomTask);
  }


  return (
    <>
      <div className="container daily-challenge" onClick={handleClick}>
        <div className="row">
          <div className="col-sm-12 daily-challenge-holder">
            <div className="daily-challenge shadow-block blue-shadow">
              <h3 className="block-title"><span className="small-title">Daily</span> Challenge</h3>
              <span className="triangle-btn triangle-btn-blue"><img src={Triangle} alt='triangle' /></span>
            </div>
          </div>
        </div>
      </div>

      {show && (

        <div className="col-sm-12 dc-popup-holder">
          <div className="dc-popup col-sm-8 shadow-block blue-shadow">
            <h3>Daily challenge</h3>

            <div id="challengeText">{task}</div>
            <div className="dc-btns">
              <button className="btn btn-afgerond" onClick={() => onCompleted(true)}>Afgerond</button>
              <button className="btn sec-btn" onClick={() => onCompleted(false)}>Annuleren</button>
            </div>

            <FontAwesomeIcon icon={faXmark} className="close-btn-dc-popup" onClick={() => toggleShow(false)} />

          </div>
        </div>

      )}
    </>
  )
}

export default DailyChallenge