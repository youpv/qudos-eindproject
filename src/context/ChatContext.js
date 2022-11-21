// import {
//     createContext,
//     useContext,
//     useReducer,
// } from "react";
// import { AuthContext } from "./AuthContext";

// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }) => {
//     const { currentUser } = useContext(AuthContext);
//     const INITIAL_STATE = {
//         qudoId: "null",
//         user: {},
//     };

//     const chatReducer = (state, action) => {
//         switch (action.type) {
//             case "CHANGE_USER":
//                 // console.log("ChatContext " + currentUser.uid);
//                 return {
//                     user: action.payload,
//                     qudoId:
//                         currentUser.uid > action.payload.uid
//                             ? currentUser.uid + action.payload.uid
//                             : action.payload.uid + currentUser.uid,
//                 };

//             default:
//                 return state;
//         }
//     };

//     const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//     // Go back to original state when on the home page but keep the currentUser in the state
//     const resetChat = () => {
//         dispatch({
//             type: "CHANGE_USER",
//             payload: {},
//         });
//     };
    

//     return (
//         <ChatContext.Provider value={{ data: state, dispatch, resetChat }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };