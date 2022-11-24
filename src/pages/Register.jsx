import React, { useState } from 'react'
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../img/QudosLogo.png'

const Register = () => {
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    /* Function Docs
        1. This function takes the value of the input element and creates a new image element in the DOM with the value of the input as the src
        2. It then attaches the new image element to the DOM */

    const handleChange = (e) => {
        const img = e.target.files[0]
        const imageHolder = document.getElementById('imageHolder')
        imageHolder.src = URL.createObjectURL(img)
    }


    /* Function Docs:
        1. When the user submits the form, we take the values of the input fields and store them in variables
        2. We then create a user with the createUserWithEmailAndPassword function from the Firebase SDK
        3. We then create a date variable and a storageRef variable that will be used to store the files in Firebase Storage
        4. We then upload the file to Firebase Storage
        5. Once the upload is complete, we take the downloadURL of the file and store it in a variable
        6. We then update the user profile with the user's first name, last name and profile picture
        7. We then add the user to the Firestore database
        8. We then create an empty user Qudos collection in the Firestore database
        9. We then navigate the user to the home page */

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
                            firstName: firstName.value,
                            lastName: lastName.value,
                            email: email.value,
                            photoURL: downloadURL,
                            moodLog: [],
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
        <div className="container login-page">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="logo">
                        <img src={Logo} alt="Qudos Logo" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="login-form">
                        <h1 className="login-title">Registreren</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><input className='form-control' required type="text" name="firstName" placeholder="Voornaam" /></div>
                            <div className="form-group"><input className='form-control' required type="text" name="lastName" placeholder="Achternaam" /></div>
                            <div className="form-group"><input className='form-control' required type="email" name="email" placeholder="Email" autoComplete='email' /></div>
                            <div className="form-group"><input className='form-control' required type="password" name="password" placeholder="Wachtwoord" autoComplete='new-password' /></div>
                            <div className="form-group">
                                <input className='form-control' required style={{ display: "none" }} type="file" id="file" onChange={handleChange} />
                                <label className='form-control' htmlFor="file">
                                    <img className='preview-img' src={Add} id="imageHolder" alt="" />
                                    <span>Upload een profielfoto</span>
                                </label>
                            </div>
                            <button type='submit' className='btn btn-primary' disabled={loading}>Registreer</button>
                            {loading && <span>Profielfoto aan het uploaden...</span>}
                            {err && <span>Er is iets misgegaan</span>}
                        </form>
                        <p className='text-center'>
                            Heb je al een account? <Link to="/login">Log in</Link>
                        </p>

                    </div>
                </div >
            </div >
        </div >

    )
}

export default Register