import React, { useContext, useState, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import Navbar from '../components/Navbar'
import { useLocation, Link, Navigate } from "react-router-dom";
import Triangle from '../img/triangle-btn-blue.svg'
import MaakQudo from '../components/MaakQudo'

const Qudos = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext)
    const [qudos, setQudos] = useState([]);
    const { state } = location.state ? location.state : { state: null };

    useEffect(() => {
        try {
            const unsubscribe = onSnapshot(doc(db, "userQudos", currentUser.uid), (doc) => {
                // console.log("Current data: ", doc.data());
                const qudosDb = doc.data();
                let qudosType;
                if (state === "received") {
                    qudosType = qudosDb.received;
                } else if (state === "sent") {
                    qudosType = qudosDb.sent;
                }
                // for each item in qudosReceived, push to top of array
                let qudosArray = [];
                for (const value of Object.values(qudosType)) {
                    qudosArray.unshift(value);
                }
                setQudos(qudosArray);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
        }
    }, [currentUser.uid, state]);


    // Redirect to home if state is null
    if (!state) {
        return <Navigate to='/' />
    } else {

        return (
            <>
                <Navbar />
                <div className="container">
                    <div className="back-btn-holder">
                        <Link to="/" className="back-btn triangle-btn triangle-btn-blue"><img src={Triangle} alt="" /></Link>
                    </div>
                    <div className="qudoContainer">
                        <h1>{state}</h1>
                        {state === "received" && qudos.map((qudo) => (
                            <div key={qudo.qudoId}>
                                <p>{qudo.senderInfo.senderName}</p>
                                <img src={qudo.senderInfo.senderImg} alt="" />
                                <p>{qudo.text}</p>
                                <hr /><br />
                            </div>
                        )
                        )}
                        {state === "sent" && qudos.map((qudo) => (
                            <div key={qudo.qudoId}>
                                <p>{qudo.receiverInfo.receiverName}</p>
                                <img src={qudo.receiverInfo.receiverImg} alt="" />
                                <p>{qudo.text}</p>
                                <hr /><br />
                            </div>
                        )
                        )}
                    </div>
                </div>
                <MaakQudo />
            </>
        )
    }
}
export default Qudos