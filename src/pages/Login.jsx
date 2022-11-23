import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import Logo from '../img/QudosLogo.png'

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
        <div className="container login-page">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="logo">
                        <img src={Logo} alt="Qudos Logo" />
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="login-form">
                        <h1 className="login-title">Login</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="email" name="email" id="email" className="form-control" placeholder='Email' />
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" id="password" className="form-control" placeholder='Wachtwoord' />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <p className="text-center">Nog geen account? <Link to="/register">Registreer</Link></p>
                    </div>
                    {err && <span>Er is iets misgegaan</span>}
                </div>
            </div>
        </div>

        //         <div className="col-md-6 offset-md-3">
        //             <div className="card">
        //                 <div className="card-body">
        //                     <h3 className="text-center">Login</h3>
        //                     <form onSubmit={handleSubmit}>
        //                         <div className="mb-3">
        //                             <input type="email" className="form-control" id="email" name="email" placeholder='Email' />
        //                         </div>
        //                         <div className="mb-3">
        //                             <input type="password" className="form-control" id="password" name="password" placeholder='Wachtwoord'/>
        //                         </div>
        //                         <button type="submit" className="btn btn-primary">Login</button>
        //                     </form>
        //                     <p className="text-center mt-3">Nog geen account? <Link to="/register">Registreer</Link></p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    )
}

export default Login