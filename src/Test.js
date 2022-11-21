import React, { useState, useEffect } from "react";
import Share from "../components/Share";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Home = () => {
	const [fotos, setFotos] = useState([]);
	useEffect(() => {
		const q = query(collection(db, "fotoShares"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			setFotos("");
			const results = [];
			querySnapshot.forEach((doc) => {
				results.push(doc.data());
				setFotos(results);
			});
			return unsubscribe;
		});
	}, []);
	return (
		<div>
			<Share />
			<hr />
			<br />
			<div>
				{fotos.map((foto) => (
					<div className="fotoShare" key={foto}>
						<h1>{foto.titel}</h1>
						<p>{foto.inhoud}</p>
						<img className="fotoShare" src={foto.photoURL} alt="" />
					</div>
				))}
			</div>
		</div>
	);
};
export default Home;
