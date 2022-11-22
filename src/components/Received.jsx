import React from "react";
// import { doc, onSnapshot } from "firebase/firestore";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { db } from "../firebase";
import Triangle from '../img/triangle-btn-orange.svg'


const Received = (props) => {
  // const { currentUser } = useContext(AuthContext);

  // const [qudos, setQudos] = useState([]);

  // useEffect(() => {
  //   try {
  //     const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
  //       // console.log("Current data: ", doc.data());
  //       const qudosDb = doc.data();
  //       const qudosReceived = qudosDb.received;
  //       // for each item in qudosReceived, push to top of array
  //       let qudosArray = [];
  //       for (const value of Object.values(qudosReceived)) {
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
  } else {
    try {
      return (
        <div className="ontvangen-qudo shadow-block">
          <div className="profile-picture-holder">
            <img className="profile-picture" src={qudos[0].senderInfo.senderImg} alt="" />
            <p className="profile-current-mood">😊</p>
          </div>
          <div className="profile-info">
            <p className="profile-name">Van: {qudos[0].senderInfo.senderName}</p>
            <p className="qudo-excerpt">{qudos[0].text}</p>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
  }
}


export default Received;