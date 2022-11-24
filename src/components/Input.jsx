// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import {
//     arrayUnion,
//     doc,
//     serverTimestamp,
//     Timestamp,
//     updateDoc,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { v4 as uuid } from "uuid";

// const Input = () => {
//     const [text, setText] = useState("");

//     const { currentUser } = useContext(AuthContext);
//     const { data } = useContext(ChatContext);
//     const test = false;

//     const handleSend = async () => {
//         if (!test) {
//             await updateDoc(doc(db, "qudos", data.qudoId), {
//                 messages: arrayUnion({
//                     id: uuid(),
//                     text,
//                     senderId: currentUser.uid,
//                     date: Timestamp.now(),
//                 }),
//             });
//         };

//         await updateDoc(doc(db, "userQudos", currentUser.uid), {
//             [data.qudoId + ".lastMessage"]: {
//                 text,
//             },
//             [data.qudoId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userQudos", data.user.uid), {
//             [data.qudoId + ".lastMessage"]: {
//                 text,
//             },
//             [data.qudoId + ".date"]: serverTimestamp(),
//         });

//         setText("");
//     };
//     return ( 
//         <div className="input">
//             <input
//                 type="text"
//                 placeholder="Type een je compliment..."
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//             />
//             <button onClick={handleSend}>Verstuur</button>
//         </div>
//     );

// }

// export default Input
