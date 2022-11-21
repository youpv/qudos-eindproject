import React, { useContext } from 'react'
// import { signOut } from "firebase/auth"
// import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <>
      <header className="shadow-block">
        <div className="container header">
          <div className="row">
            <div className="col-sm-8 profile-holder">
              <div className="profile-picture-holder">
                <div id="progress-bar"></div>
                <img className="profile-picture" src={currentUser.photoURL} alt='profilePic' />
                <p className="profile-current-mood"></p>
              </div>
              <div className="profile-info">
                <p className="profile-name">{currentUser.displayName}</p>
                <p className="profile-rank">Nog niet toegevoegd</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar