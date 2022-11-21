import React, { useState } from 'react'
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const img = e.target.files[0]
        const imageHolder = document.getElementById('imageHolder')
        imageHolder.src = URL.createObjectURL(img)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const { firstName, lastName, email, password } = e.target.elements
        const file = e.target.elements.file.files[0]

        try {
            // Create user
            const res = await createUserWithEmailAndPassword(auth, email.value, password.value)

            const date = new Date().getTime();
            const storageRef = ref(storage, `${firstName.value + lastName.value + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        // Update user profile
                        await updateProfile(res.user, {
                            displayName: firstName.value + " " + lastName.value,
                            photoURL: downloadURL,
                        });
                        // Add user to firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: firstName.value + " " + lastName.value,
                            email: email.value,
                            photoURL: downloadURL,
                        });

                        // Create empty user Qudo's on firestore
                        await setDoc(doc(db, "userQudos", res.user.uid), { sent: [], received: [] });
                        navigate("/");



                    } catch (err) {
                        console.log(err);
                        setErr(true)
                        setLoading(false)
                    }
                })
            })
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="logo">Qudo's</h1>
                <h2 className="title">Registreren</h2>
                <form onSubmit={handleSubmit}>
                    <input required type="text" name="firstName" placeholder="Voornaam" />
                    <input required type="text" name="lastName" placeholder="Achternaam" />
                    <input required type="email" name="email" placeholder="Email" autoComplete='email' />
                    <input required type="password" name="password" placeholder="Wachtwoord" autoComplete='new-password' />
                    <input required style={{ display: "none" }} type="file" id="file" onChange={handleChange} />
                    <label htmlFor="file">
                        <img src={Add} id="imageHolder" alt="" />
                        <span>Upload een profielfoto</span>
                    </label>
                    <br></br>
                    <button disabled={loading}>Registreer</button>
                    {loading && <span>Profielfoto aan het uploaden...</span>}
                    {err && <span>Er is iets misgegaan</span>}
                </form>
                <p>
                    Heb je al een account? <Link to="/login">Log in</Link>
                </p>

            </div>
        </div>
    )
}

export default Register