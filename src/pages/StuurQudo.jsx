import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();
  const { state } = location.state ? location.state : { state: null };
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [showModal, setShowModal] = useState(false);
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
    let words = e.target.innerText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    words = words.split(/(\s|\.|,)/);
    words.forEach((word, index) => {
      // handleKernwaarden(word);
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

  // const handleKernwaarden = (string) => {
  //   kernwaarden.forEach((kw) => {
  //     for (const [key, value] of Object.entries(kw)) {
  //       if (value.includes(string.toLowerCase())) {
  //         foundKw.push(key);
  //         handleKwPreviews();
  //       }
  //     }
  //   })
  // }

  const handleKwPreviews = (e) => {
    const kwPreviews = document.querySelectorAll(".kernwaarde-text li")
    kwPreviews.forEach((kwPreview) => {
      if (foundKw.includes(kwPreview.innerText)) {
        console.log(foundKw)
        kwPreview.classList.add("input-kernwaarde");
      } else if (!foundKw.includes(kwPreview.innerText)) {
        console.log(foundKw)
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
    setText(text + " " + e.target.innerText);
  }

  const handleSend = async (user) => {
    const inputElement = document.querySelector(".qudo-input");
    // force onblur event to trigger and foundKW to update
    inputElement.blur();
    if (text.length < 1) {
      setError(true);

      setErrorMsg("Je moet een bericht invullen");
      return;
    }

    // if (!foundKw.length > 0) {
    //   setError(true);
    //   setErrorMsg("Je moet minimaal 1 kernwaarde selecteren");
    //   return;
    // }
    // const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const qudoSender = currentUser;
    const qudoReceiver = user;
    const qudoId = uuid();
    if (!error) {
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
            kernwaarden: foundKw ? foundKw : [],
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
            kernwaarden: foundKw ? foundKw : [],
            text,
            date: Timestamp.now(),
          })
        });
        await updateDoc(doc(db, "qudos", qudoId), {
          qudoId: qudoId,
          qudoSender: qudoSender.uid,
          qudoReceiver: qudoReceiver.uid,
          kernwaarden: foundKw ? foundKw : [],
          text,
          date: Timestamp.now(),
        });

        setSent(true);
        // After 3 seconds, redirect to home
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setText("");

      } catch (err) {
        console.log(err);
        setError(err);
        return;
      }
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
      <div className="container errorContainer">
        <div className="row">
          <div className="col-sm-12">
            {error && <div className='alert alert-danger' role="alert">Er is iets fout gegaan. {errorMsg}</div>}
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
      {/* {showModal && (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="popup-modal">
                <h2>Geen kernwaarde!</h2>
                <p>We hebben geen kernwaarde herkend in je Qudo. Wil je deze alsnog toevoegen? Selecteer dan de kernwaarde die het beste past bij je Qudo.</p>
                <div className="form-check">
                  <input type="checkbox" id='checkOpstaan' className="btn-check" autoComplete='off' />
                  <label className="btn btn-primary" htmlFor='checkOpstaan'>Opstaan</label>
                  <input type="checkbox" id='checkGeniet' className="btn-check" autoComplete='off' />
                  <label className="btn btn-primary" htmlFor='checkGeniet'>Geniet</label>
                  <input type="checkbox" id='checkLef' className="btn-check" autoComplete='off' />
                  <label className="btn btn-primary" htmlFor='checkLef'>Lef</label>
                  <input type="checkbox" id='checkGaan' className="btn-check" autoComplete='off' />
                  <label className="btn btn-primary" htmlFor='checkGaan'>Gaan</label>
                  <input type="checkbox" id='checkTrots' className="btn-check" autoComplete='off' />
                  <label className="btn btn-primary" htmlFor='checkTrots'>Trots</label>
                </div>
                <button className="btn btn-primary">Verstuur</button>
              </div>
            </div>
          </div>
        </div >
      )} */}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="qudo-input-holder">
              <div className="qudo-input" data-max-length="300" contentEditable="true" type="text" onFocus={() => { maxlengthContentEditable(); handleSplits(); }} onInput={handleKwPreviews} onBlur={handleSplits}>
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