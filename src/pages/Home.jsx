import React, { useContext } from 'react'
import DailyChallenge from '../components/DailyChallenge'
import MoodMeter from '../components/MoodMeter'
import Navbar from '../components/Navbar'
import QudoDB from '../components/QudoDB'
import { AuthContext } from '../context/AuthContext'
import MaakQudo from '../components/MaakQudo'

const Home = () => {
  const { currentUser } = useContext(AuthContext)


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
      <DailyChallenge />
      <MoodMeter />
      <QudoDB />
      <MaakQudo />
    </>
  )
}

export default Home