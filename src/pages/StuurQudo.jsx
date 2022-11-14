import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
// import Input from '../components/Input';
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getDoc, setDoc, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
// import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";

const StuurQudo = () => {

  // const { data } = useContext(ChatContext);
  const location = useLocation();
  const { state } = location.state ? location.state : { state: null };
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState("");



  // Redirect to home if no user is selected

  if (!state) {
    console.log("no user selected");
    return <Navigate to='/' />

  } else {
    const handleSend = async (user) => {

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


        setText("");

        //WERKENDE CODE, OUD

        // Check of de gebruiker al eens een Qudo heeft gegeven.
        // const res = await getDoc(doc(db, "qudos", combinedId));

        // if (!res.exists()) {
        //   //create a chat in chats collection
        //   await setDoc(doc(db, "qudos", combinedId), { messages: [] });

        //   //create user chats
        //   await updateDoc(doc(db, "userQudos", currentUser.uid), {
        //     [combinedId + ".userInfo"]: {
        //       uid: user.uid,
        //       displayName: user.displayName,
        //       photoURL: user.photoURL,
        //     },
        //     [combinedId + ".date"]: serverTimestamp(),
        //   });

        //   await updateDoc(doc(db, "userQudos", user.uid), {
        //     [combinedId + ".userInfo"]: {
        //       uid: currentUser.uid,
        //       displayName: currentUser.displayName,
        //       photoURL: currentUser.photoURL,
        //     },
        //     [combinedId + ".date"]: serverTimestamp(),
        //   });
        // }

        // EIND WERKENDE CODE, OUD





      } catch (error) {
        console.log(error);
      }
    }


    // handleSelect(state);

    return (
      <div className="container">
        <Navbar />
        <Link to='/selecteerontvanger'>Terug</Link>
        <h1>Wie wil je een Qudo sturen?</h1>
        <div>
          <span>Ik stuur een qudo naar {state.displayName}, omdat...</span>
          <div className="input">
            <input
              type="text"
              placeholder="Type een je compliment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={() => handleSend(state)}>Stuur</button>
          </div>
        </div>
      </div>
    )
  }
}

export default StuurQudo