import React, { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Triangle from '../img/triangle-btn-blue.svg'

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
        <>
            <Navbar />
            <div className="container">
                <div className="back-button-holder">
                    <div className="row">
                        <div className="col-sm-12">
                            <Link to='/' onClick={() => setSelectedUser(null)} className="back-btn triangle-btn triangle-btn-blue"><img src={Triangle} alt="" /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="send-to-holder">
                            <h2>Wie wil je een Qudo sturen?</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="search">
                            <div className="searchForm">
                                <input
                                    type="text"
                                    placeholder="Vind een collega"
                                    onChange={searchUser}
                                />
                                <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
                            </div>
                            <div className="searchResults">
                                {err && <span>Geen collega gevonden!</span>}
                                {filteredUsers.map((user) => (
                                    <div className="searchResult" key={user.data().uid}>

                                        <div className="profile-picture-holder">
                                            <img src={user.data().photoURL} alt="" />
                                            <p className="profile-current-mood">🥱</p>
                                        </div>
                                        <span>{user.data().displayName} &nbsp;</span>

                                        <button className='btn' onClick={() => handleSelect(user.data())}>Selecteer</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SelecteerOntvanger