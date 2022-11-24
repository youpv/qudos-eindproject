import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function UserData() {
	const { currentUser } = useContext(AuthContext);
	const [userData, setUserData] = useState();
	useEffect(() => {
		if (currentUser) {
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
	return userData || {"firstName": "", "mood": "🔁"};
}
