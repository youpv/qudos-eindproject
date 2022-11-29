import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom'
import Sent from './Sent'
import Received from './Received'
import Triangle from '../img/triangle-btn-orange.svg'
// import ColoredLogo from '../img/logo_colored.png'

const QudoDB = () => {
  const [showSent, toggleShowSent] = useState(false);
  const [showReceived, toggleShowReceived] = useState(false);
  const navigate = useNavigate();


  // Test of ik de data hier al kan ophalen ipv in de componenten zelf
  const { currentUser } = useContext(AuthContext);
  const [qudosSent, setQudosSent] = useState([]);
  const [qudosReceived, setQudosReceived] = useState([]);
  let qudosSentTotal = qudosSent.length;
  let qudosReceivedTotal = qudosReceived.length;



  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
        // console.log("Current data: ", doc.data());
        const qudosDb = doc.data();
        const qudosSentData = qudosDb.sent;
        const qudosReceivedData = qudosDb.received;
        // for each item in qudosReceived, push to top of array
        let qudosSentArray = [];
        for (const value of Object.values(qudosSentData)) {
          qudosSentArray.unshift(value);
        }
        let qudosReceivedArray = [];
        for (const value of Object.values(qudosReceivedData)) {
          qudosReceivedArray.unshift(value);
        }
        setQudosSent(qudosSentArray);
        setQudosReceived(qudosReceivedArray);

        // when a new qudo is received, send out a push notification, but don't trigger it when the suer loads the page.

          if (qudosReceivedArray.length > qudosReceivedTotal && qudosReceivedTotal !== 0 && qudosReceivedTotal !== undefined) {
            console.log("qra" + qudosReceivedArray.length);
            console.log("qrt" + qudosReceivedTotal);
            console.log('new qudo received');
            navigator.serviceWorker.ready.then(function (registration) {
              // call the registration's push event
              registration.showNotification('Nieuwe Qudo ontvangen!', {
                body: 'Je hebt een nieuwe Qudo ontvangen!',
                icon: 'https://fhict-qudos.web.app/static/media/logo_colored.f4a96ebc208eb2d760ec.png',
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: 'vibration-sample',
                actions: [
                  {
                    action: 'explore',
                    title: 'Ga naar Qudo',
                  },
                  {
                    action: 'close',
                    title: 'Sluit',
                  },
                ]
              });
            });
          }
      });
      return () => unsubscribe();
    } catch (error) {
      // console.log(error);
    }

  }, [currentUser.uid, qudosReceivedTotal]);

  const viewMoreQudos = (state) => {
    navigate('/qudos', { state: { state: state } });
  }


  const toggle = (state) => {
    if (state === 'sent') {
      toggleShowSent(!showSent);
      toggleShowReceived(false);
    } else {
      toggleShowReceived(!showReceived);
      toggleShowSent(false);
    }
  }

  return (
    <div className='container qudos-block'>
      <div className="row">
        <div className={`col-sm-6 verstuurde-qudos-holder ${showSent ? "active" : ""}${showReceived ? "darken" : ""}`} onClick={() => toggle('sent')}>
          <div className="verstuurde-qudos shadow-block orange-shadow">
            <p className="qudo-number-text">{qudosSentTotal}</p>
            <h3 className="block-title"><span className="small-title">Qudo's</span> Verstuurd</h3>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
        <div className={`col-sm-6 ontvangen-qudos-holder ${showReceived ? "active" : ""}${showSent ? "darken" : ""}`} onClick={() => toggle('received')}>
          <div className="ontvangen-qudos shadow-block orange-shadow">
            <p className="qudo-number-text">{qudosReceivedTotal}</p>
            <h3 className="block-title"><span className="small-title">Qudo's</span> Ontvangen</h3>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
        {showSent && <div className='overview-verstuurde-qudos'><Sent data={qudosSent} /><button onClick={() => viewMoreQudos("sent")} className="btn view-more">Bekijk alle verstuurde Qudo's</button></div>}
        {showReceived && <div className='overview-ontvangen-qudos'><Received data={qudosReceived} /><button onClick={() => viewMoreQudos("received")} className="btn view-more">Bekijk alle ontvangen Qudo's</button></div>}
      </div>
    </div>
  )
}

export default QudoDB