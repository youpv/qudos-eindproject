import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = e.target.elements
        try {
            await signInWithEmailAndPassword(auth, email.value, password.value)
            navigate('/')
        } catch (error) {
            setErr(true)
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="logo">Qudo's</h1>
                <h2 className="title">Inloggen</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" autoComplete='email' />
                    <input type="password" name="password" placeholder="Wachtwoord" autoComplete='current-password' />
                    <button>Inloggen</button>
                    {err && <span>Er is iets misgegaan</span>}
                </form>
                <p>
                    Heb je nog geen account? <Link to="/register">Registreer</Link>
                </p>
            </div>
        </div>
    )
}

export default Login