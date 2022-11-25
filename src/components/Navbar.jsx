import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import { UserContext } from '../context/UserContext'



const Navbar = () => {
  const { currentUser } = useContext(AuthContext)
  const { userData } = useContext(UserContext)

  return (
    <>
      <header className="shadow-block">
        <div className="container header">
          <div className="row">
            <div className="col-sm-8 profile-holder">
              <div className="profile-picture-holder">
                <div id="progress-bar"></div>
                <img className="profile-picture" src={currentUser.photoURL} alt='profilePic' />
                <p className="profile-current-mood">{userData.mood}</p>
              </div>
              <div className="profile-info">
                <p className="profile-name">{currentUser.displayName}</p>
                <p className="profile-rank">Qudo Rookie</p>
              </div>
            </div>
            <div className="col-sm-4 menu-holder">
              <span className="menu-button" onClick={() => signOut(auth)}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar