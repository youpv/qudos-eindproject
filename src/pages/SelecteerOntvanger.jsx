import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
// import { ChatContext } from "../context/ChatContext";



const SelecteerOntvanger = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [err, setErr] = useState(false);
    const [, setSelectedUser] = useState(null);
    // const { dispatch, resetChat } = useContext(ChatContext);
    // Vraag de gebruikers op uit de database
    async function getData() {
        const dataFetch = await getDocs(collection(db, "users"));
        const list = dataFetch.docs;
        setUsers(list);
        setFilteredUsers(list);
        setErr(false);
    }

    // Zolang de zoekfunctie wordt gebruikt, is er een sessieconnectie met de database. Dit is helaas niet te veranderen.
    useEffect(() => {
        getData();
    }, []);


    // Filter de gebruikers op naam
    const searchUser = (e) => {
        const username = e.target.value;
        const list = users.filter((user) =>
            user.data().displayName.toLowerCase().includes(username.toLowerCase())
        );
        setErr(list.length < 1 ? true : false);
        setFilteredUsers(list);
    };

    const handleSelect = (user) => {
        // dispatch({
        //     type: "CHANGE_USER",
        //     payload: user,

        // });
        setSelectedUser(user);
        navigate('/stuurqudo', { state: { state: user } });
    };


    return (
        <div className="container">
            <Navbar />
            <Link to='/' onClick={() => setSelectedUser(null)}>Terug</Link>
            <h1>Wie wil je een Qudo sturen?</h1>
            <div className="search">
                <div className="searchForm">
                    <input
                        type="text"
                        placeholder="Find a user"
                        onChange={searchUser}

                    />
                </div>
                {err && <span>User not found!</span>}

                <div className="searchResults">
                    {filteredUsers.map((user) => (
                        <div className="searchResult" key={user.data().uid}>
                            <img src={user.data().photoURL} alt="" />
                            <span>{user.data().displayName} &nbsp;</span>

                            <button onClick={() => handleSelect(user.data())}>Select</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelecteerOntvanger