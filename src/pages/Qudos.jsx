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
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="send-to-holder">
                                <h2>{state}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="qudoContainer">
                                {state === "received" && qudos.map((qudo) => (
                                    <div className='ontvangen-qudo shadow-block' key={qudo.qudoId}>
                                        <div className="profile-picture-holder">
                                            <img className="profile-picture" src={qudo.senderInfo.senderImg} alt="" />
                                            <p className="profile-current-mood">{qudo.senderInfo.senderMood}</p>
                                        </div>
                                        <div className="profile-info">
                                            <p className="profile-name">{qudo.senderInfo.senderName}</p>
                                            <p className='qudo-excerpt'>{qudo.text}</p>
                                        </div>
                                    </div>
                                )
                                )}
                                {state === "sent" && qudos.map((qudo) => (
                                    <div className='ontvangen-qudo shadow-block' key={qudo.qudoId}>
                                    <div className="profile-picture-holder">
                                        <img className="profile-picture" src={qudo.receiverInfo.receiverImg} alt="" />
                                        <p className="profile-current-mood">{qudo.receiverInfo.receiverMood}</p>
                                    </div>
                                    <div className="profile-info">
                                        <p className="profile-name">{qudo.receiverInfo.receiverName}</p>
                                        <p className='qudo-excerpt'>{qudo.text}</p>
                                    </div>
                                </div>
                                )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <MaakQudo />
            </>
        )
    }
}
export default Qudos