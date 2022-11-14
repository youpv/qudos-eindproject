import React from 'react'
import DailyChallenge from '../components/DailyChallenge'
import MoodMeter from '../components/MoodMeter'
import Navbar from '../components/Navbar'
import QudoDB from '../components/QudoDB'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const newQudo = () => {
    navigate('/selecteerontvanger')
  }

  return (
    <div className="container">
      <Navbar />
      <div className='home'>
        <MoodMeter />
        <DailyChallenge />
        <QudoDB />
      </div>
      <button className='bottomButton' onClick={newQudo}>Maak een Qudo</button>
    </div>
  )
}

export default Home