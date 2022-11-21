import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Received = () => {
  const { currentUser } = useContext(AuthContext);


  // const { data } = useContext(ChatContext);


  const [qudos, setQudos] = useState([]);




    const loadQudos = async () => {
      
      //getDoc from collection userQudos > currentUser.uid > received > index
      const qudosDb = await getDoc(doc(db, "userQudos", currentUser.uid));
      const qudosData = qudosDb.data();
      const qudosReceived = qudosData.received;
      let qudosArray = Object.values(qudosReceived);
      qudosArray = qudosArray.reverse();
      setQudos(qudosArray);
      // setQudos(qudos);
    };
    

    useEffect(() => { loadQudos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    
  return (
    <div>
      <h1>Received</h1>
      {qudos.map((qudo) => (
        <div key={qudo.qudoId}>
          <p>{qudo.senderInfo.senderName}</p>
          <img src={qudo.senderInfo.senderImg} alt="" />
          <p>{qudo.text}</p>
          <hr /><br />
          </div>
      ))}

    </div>
  );
};

export default Received;