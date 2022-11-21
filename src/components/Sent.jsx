import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Sent = () => {
  const { currentUser } = useContext(AuthContext);


  // const { data } = useContext(ChatContext);


  const [qudos, setQudos] = useState([]);
  // Oude Code:
  // const loadQudos = async () => {
  //   //getDoc from collection userQudos > currentUser.uid > received > index
  //   const qudosDb = await getDoc(doc(db, "userQudos", currentUser.uid));
  //   const qudosData = qudosDb.data();
  //   const qudosSent = qudosData.sent;
  //   let qudosArray = Object.values(qudosSent);
  //   qudosArray = qudosArray.reverse();
  //   setQudos(qudosArray);
  //   // setQudos(qudos);
  // };

  // useEffect(() => {
  //   loadQudos();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Nieuwe code:
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
        // console.log("Current data: ", doc.data());
        const qudosDb = doc.data();
        const qudosSent = qudosDb.sent;
        // for each item in qudosReceived, push to top of array
        let qudosArray = [];
        for (const value of Object.values(qudosSent)) {
          qudosArray.unshift(value);
        }
        setQudos(qudosArray);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }

  }, [currentUser.uid]);


  return (
    <div className="qudoContainer">
      <h1>Sent</h1>
      {qudos.map((qudo) => (
        <div key={qudo.qudoId}>
          <p>{qudo.receiverInfo.receiverName}</p>
          <img src={qudo.receiverInfo.receiverImg} alt="" />
          <p>{qudo.text}</p>
          <hr /><br />
        </div>
      ))}
    </div>
  );
};

export default Sent;