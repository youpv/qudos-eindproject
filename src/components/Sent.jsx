import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";


const Sent = () => {
  const { currentUser } = useContext(AuthContext);


  // const { data } = useContext(ChatContext);


  const [qudos, setQudos] = useState([]);

  const loadQudos = async () => {
    //getDoc from collection userQudos > currentUser.uid > received > index
    const qudosDb = await getDoc(doc(db, "userQudos", currentUser.uid));
    const qudosData = qudosDb.data();
    const qudosSent = qudosData.sent;
    let qudosArray = Object.values(qudosSent);
    qudosArray = qudosArray.reverse();
    setQudos(qudosArray);
    // setQudos(qudos);
  };

  useEffect(() => {
    loadQudos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div>
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