import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getDoc, setDoc, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import Triangle from '../img/triangle-btn-blue.svg'
import Triangle2 from '../img/triangle-btn-up-white.svg'
import { maxlengthContentEditable } from 'maxlength-contenteditable';
import { UserContext } from '../context/UserContext'


const StuurQudo = () => {
  const location = useLocation();
  const { state } = location.state ? location.state : { state: null };
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  // const kernwaarden = ["opstaan", "geniet", "lef", "gaan", "trots", "ging,", "opgestaan", "genoten", "genoot", "opstond"]
  let foundKw = [];
  // make an array or object for the 5 kernwaarde, but some kernwaarde have multiple words, so make an array of arrays or objects
  const kernwaarden = [{
    "Opstaan": ["opstaan", "opgestaan", "opstond"],
    "Geniet": ["geniet", "genoten", "genoot"],
    "Lef": ["lef"],
    "Gaan": ["gaan", "ging"],
    "Trots": ["trots"]
  }]




  // Redirect to home if no user is selected.

  if (!state) {
    console.log("no user selected");
    return <Navigate to='/' />
  }

  const handleSplits = (e) => {
    foundKw = [];
    console.log(text);
    let words = e.target.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    words = words.split(/(\s|\.|,)/);
    words.forEach((word, index) => {
      kernwaarden.forEach((kw) => {
        for (const [key, value] of Object.entries(kw)) {
          if (value.includes(word.toLowerCase())) {
            foundKw.push(key);
            handleKwPreviews();
            // words[index] = `<span class="input-kernwaarde">${word}</span>`
          }
        }
      })
    });
    setText(words.join(""));
    // e.target.innerHTML = words.join("");
  }


  const handleKwPreviews = (e) => {
    const kwPreviews = document.querySelectorAll(".kernwaarde-text li")
    kwPreviews.forEach((kwPreview) => {
      if (foundKw.includes(kwPreview.innerText)) {
        kwPreview.classList.add("input-kernwaarde");
      } else if (!foundKw.includes(kwPreview.innerText)) {
        kwPreview.classList.remove("input-kernwaarde");
      }
    })
  }

  const textOptions = () => {
    const voorbeelden = ["Ik vind dat je...", "Deze sprint heb je...", "Ik wil je bedanken voor...", "Wij hebben samen...", "Een voorbeeld daarvan is..."];
    return (
      <>
        {voorbeelden.map((voorbeeld) => {
          return (
            <button className="btn" onClick={insertVoorbeeld}>{voorbeeld}</button>
          )
        }
        )}
      </>
    )
  }

  const insertVoorbeeld = (e) => {
    // add voorbeeld to existing text
    // setSendText(sendText + " " + e.target.innerText);
    setText(text + " " + e.target.innerText);
  }

  const handleSend = async (user) => {
    // Check if text is empty
    if (text === "") {
      setError(true);
      return;
    }

    // const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const qudoSender = currentUser;
    const qudoReceiver = user;
    const qudoId = uuid();


    try {
      const qudosDb = await getDoc(doc(db, "qudos", qudoId));

      if (!qudosDb.exists()) {
        await setDoc(doc(db, "qudos", qudoId), {
          qudoId: qudoId,
          qudoSender: qudoSender.uid,
          qudoReceiver: qudoReceiver.uid,
          date: Timestamp.now(),

        });
      }
      await updateDoc(doc(db, "userQudos", qudoSender.uid), {
        sent: arrayUnion({
          qudoId,
          receiverInfo: {
            receiverId: qudoReceiver.uid,
            receiverName: qudoReceiver.displayName,
            receiverImg: qudoReceiver.photoURL,
            receiverMood: state.mood,
          },
          text,
          date: Timestamp.now(),
        })
      });
      await updateDoc(doc(db, "userQudos", qudoReceiver.uid), {
        received: arrayUnion({
          qudoId,
          senderInfo: {
            senderId: qudoSender.uid,
            senderName: qudoSender.displayName,
            senderImg: qudoSender.photoURL,
            senderMood: userData.mood,
          },
          text,
          date: Timestamp.now(),
        })
      });
      await updateDoc(doc(db, "qudos", qudoId), {
        qudoId: qudoId,
        qudoSender: qudoSender.uid,
        qudoReceiver: qudoReceiver.uid,
        text,
        date: Timestamp.now(),
      });

      setSent(true);
      // After 3 seconds, redirect to home
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      setText("");

    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="back-btn-holder">
          <div className="row">
            <div className="col-sm-12">
              <Link to="/selecteerontvanger" className="back-btn triangle-btn triangle-btn-blue"><img src={Triangle} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            {error && <span>Er is iets foutgegaan, probeer het opnieuw.</span>}
            {sent && <span>Qudo verstuurd!</span>}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="send-to-holder">
              <p className='send-to-text'>Ik stuur een Qudo naar {state.displayName}</p>
              <div className="profile-picture-holder send-to-profile-picture-holder">
                <img src={state.photoURL} alt="" className='profile-picture send-to-profile-picture' />
                <p className="profile-current-mood send-to-profile-current-mood">{state.mood}</p>
              </div>
              <h2>Omdat...</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="qudo-input-holder">
              <div className="qudo-input" data-max-length="300" contentEditable="true" type="text" onFocus={() => maxlengthContentEditable() & handleSplits()} onInput={handleKwPreviews} onBlur={handleSplits}>
                {text}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="kernwaarde-text-holder">
              <ul className="kernwaarde-text">
                <li>Opstaan</li>
                <li>Geniet</li>
                <li>Lef</li>
                <li>Gaan</li>
                <li>Trots</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="qudo-hulp-btn-holder">
              {textOptions()}
            </div>
          </div>
        </div>
      </div>
      <div className="container send-qudo-btn-block">
        <div className="row">
          <div className="col-sm-12 send-qudo-btn-holder">
            <span className='send-qudo-btn' onClick={() => handleSend(state)} >Verstuur Qudo <img src={Triangle2} alt="" /></span>
          </div>
        </div>
      </div>
    </>
  )
}


export default StuurQudo