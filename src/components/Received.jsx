import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Received = () => {
  const [qudos, setQudos] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { data } = useContext(ChatContext);


  // Dit stuk code moet herschreven worden. Op dit moment wordt er dubbel gekeken naar de database.
  // Daarbij wil ik bij Received alleen gekregen qudos zien, ongeacht wie ze heeft verstuurd.


  useEffect(() => {
    const getQudoSenders = () => {
      const unsub = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
        setQudos(doc.data());
      });
      return () => {
        unsub();
      }
    };
    currentUser.uid && getQudoSenders()
    const getQudos = () => {
      const unsub = onSnapshot(doc(db, "qudos", data.qudoId), (doc) => {
        doc.exists() && setQudos(doc.data().messages);
      });
      return () => {
        unsub();
      }
    };
    data.qudoId && getQudos()
  }, [currentUser.uid, data.qudoId]);


  return (
    <div>
      {Object.entries(qudos)?.sort((a, b) => b[1].date - a[1].date).map((qudo) => (
        <div
          key={qudo[0]}
        >
          <span>{qudo[1].userInfo.displayName}</span>
          <p>{qudo[1].lastMessage?.text}</p>
          <br></br>
        </div>

      ))}

    </div>

  )
}

export default Received