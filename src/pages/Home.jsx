import React, { useContext } from 'react'
import DailyChallenge from '../components/DailyChallenge'
import MoodMeter from '../components/MoodMeter'
import Navbar from '../components/Navbar'
import QudoDB from '../components/QudoDB'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Home = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const newQudo = () => {
    navigate('/selecteerontvanger')
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="greetings-holder">
              <h2>Hey, <span className="greetings-name">{currentUser.displayName}</span>!</h2>
              <p className="greetings-text">Heb jij vandaag al een Qudo gestuurd?</p>
            </div>
          </div>
        </div>
      </div>
      <MoodMeter />
      <DailyChallenge />
      {/* <QudoDB /> */}
      {/* <Button className='bottomButton' onClick={newQudo}>Maak een Qudo </Button> */}
      <div className="container send-qudo-btn-block">
        <div className="row">
          <div className="col-sm-12 send-qudo-btn-holder">
            {/* <a href="/qudo-schrijven.html" className="send-qudo-btn">Maak Qudo <img src="img/triangle-btn-up-white.svg"></a> */}
            <button className='send-qudo-btn' onClick={newQudo}>Maak een Qudo </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home