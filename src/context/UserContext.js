import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
	const [userData, setUserData] = useState();
	useEffect(() => {
		if (!currentUser) {
			// We don't want to render anything if there is no user
			return;
		} else {
			try {
				const unsubscribe = onSnapshot(
					doc(db, "users", currentUser.uid),
					(doc) => {
						setUserData(doc.data());
					}
				);
				return unsubscribe;
			} catch (error) {
				console.log(error);
			}
            
		} 
	}, [currentUser]);

	return (
		<UserContext.Provider value={{ userData }}>
			{children}
		</UserContext.Provider>
	);
};
