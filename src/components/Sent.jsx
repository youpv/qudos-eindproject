import React from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { db } from "../firebase";
import Triangle from '../img/triangle-btn-orange.svg'


const Sent = (props) => {
  // const { currentUser } = useContext(AuthContext);




  // const [qudos, setQudos] = useState([]);


  // useEffect(() => {
  //   try {
  //     const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
  //       // console.log("Current data: ", doc.data());
  //       const qudosDb = doc.data();
  //       const qudosSent = qudosDb.sent;
  //       // for each item in qudosReceived, push to top of array
  //       let qudosArray = [];
  //       for (const value of Object.values(qudosSent)) {
  //         qudosArray.unshift(value);
  //       }
  //       setQudos(qudosArray);
  //     });
  //     return () => unsubscribe();
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }, [currentUser.uid]);


  const qudos = props.data;

  if (props.minified !== "true") {
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
  } else {
    try {
      return (
        <div className="verstuurde-qudo shadow-block">
          <div className="profile-picture-holder">
            <img className="profile-picture" src={qudos[0].receiverInfo.receiverImg} alt="" />
            <p className="profile-current-mood">😊</p>
          </div>
          <div className="profile-info">
            <p className="profile-name">Naar: {qudos[0].receiverInfo.receiverName}</p>
            <p className="qudo-excerpt">{qudos[0].text}</p>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }
};

export default Sent;