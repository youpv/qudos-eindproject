import React, { useState, useContext } from 'react'
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from "../context/AuthContext";
// import UserData from '../context/UserData'
import { UserContext } from '../context/UserContext'



const MoodMeter = () => {
  const { currentUser } = useContext(AuthContext);
  // get userdata from context, but await for it to be loaded
  const { userData } = useContext(UserContext);
  const [mood, setMood] = useState(userData.mood);

  // when user clicks on the mood input, use setMood to set it to the value of the mood
  const handleMood = (e) => {
    if (!e.target.classList.contains("active")) {
      setMood(e.target.value);
      updateDoc(doc(db, "users", currentUser.uid), {
        mood: e.target.innerText
      })
    } else {
      console.log("already active");
    }
  }

  const listMoods = () => {
    const moodList = ["😄", "😡", "😢", "😵", "😴"];
    // return each mood as a div with the mood as text and the handleMood function as an onClick. Give the active class to the mood that is currently set in the setMood state.
    return moodList.map((moodI, index) => {
      return <div key={index} className={`moodBtn ${mood === moodI ? "active" : ""}`} onClick={handleMood}>{moodI}</div>
    })
  }

  return (
    <div className="container mood-meter-block">
      <div className="row">
        <div className="col-sm-12 mood-meter-holder">
          <div className="mood-meter shadow-block blue-shadow">

            <p>Hoe voel je je vandaag?</p>

            <div className="mood-meter-btns">
              {listMoods()}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MoodMeter