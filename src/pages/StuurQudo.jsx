import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Input from '../components/Input';
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getDoc, setDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";


const StuurQudo = () => {

    const { data } = useContext(ChatContext);
    const location = useLocation();
    const { state } = location.state ? location.state : { state: null };
    const { currentUser } = useContext(AuthContext);



    // Redirect to home if no user is selected

    if (!state) {
        return <Navigate to='/' />

    } else {
        const handleSelect = async (user) => {
            // console.log(user.displayName);
            // Check of de gebruiker al eens een Qudo heeft gegeven.
            const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
            
            try {
                const res = await getDoc(doc(db, "qudos", combinedId));

                if (!res.exists()) {
                    //create a chat in chats collection
                    await setDoc(doc(db, "qudos", combinedId), { messages: [] });
            
                    //create user chats
                    await updateDoc(doc(db, "userQudos", currentUser.uid), {
                      [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                      },
                      [combinedId + ".date"]: serverTimestamp(),
                    });
            
                    await updateDoc(doc(db, "userQudos", user.uid), {
                      [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                      },
                      [combinedId + ".date"]: serverTimestamp(),
                    });
                  } 
            } catch (error) {
                console.log(error);
            }
        }
        


        handleSelect(state);

        return (
            <div className="container">
                <Navbar />
                <Link to='/selecteerontvanger'>Terug</Link>
                <h1>Wie wil je een Qudo sturen?</h1>
                <div>
                    <span>Ik stuur een qudo naar {data.user?.displayName}, omdat...</span>
                    <Input />
                </div>
            </div>
        )
    }
}

export default StuurQudo