import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


const Received = () => {
  const { currentUser } = useContext(AuthContext);


  // const { data } = useContext(ChatContext);


  const [qudos, setQudos] = useState([]);



  // Werkende Code:

  // const loadQudos = async () => {

  //   //getDoc from collection userQudos > currentUser.uid > received > index
  //   const qudosDb = await getDoc(doc(db, "userQudos", currentUser.uid));
  //   const qudosData = qudosDb.data();
  //   const qudosReceived = qudosData.received;
  //   let qudosArray = Object.values(qudosReceived);
  //   qudosArray = qudosArray.reverse();
  //   setQudos(qudosArray);
  //   // setQudos(qudos);
  // };


  // useEffect(() => { loadQudos()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Eind werkende code ^^^

  // Test code:
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
        // console.log("Current data: ", doc.data());
        const qudosDb = doc.data();
        const qudosReceived = qudosDb.received;
        // for each item in qudosReceived, push to top of array
        let qudosArray = [];
        for (const value of Object.values(qudosReceived)) {
          qudosArray.unshift(value);
        }
        setQudos(qudosArray);
      });
      return () => unsubscribe();
    } catch (error) {
      console.log(error);
    }

  }, [currentUser.uid]);

  // Eind test code ^^^





  return (
    <div className="qudoContainer">
      <h1>Received</h1>
      {/* <FontAwesomeIcon icon={faEnvelope} /> */}
      {qudos.map((qudo) => (
        <div key={qudo.qudoId}>
          <p>{qudo.senderInfo.senderName}</p>
          <img src={qudo.senderInfo.senderImg} alt="" />
          <p>{qudo.text}</p>
          <hr /><br />
        </div>
      )
      )}

  </div>
  );
};

export default Received;