import React from 'react'
import { Link } from 'react-router-dom'
import Triangle from '../img/triangle-btn-up-white.svg'


const MaakQudo = () => {
  return (
    <div className="container send-qudo-btn-block">
    <div className="row">
      <div className="col-sm-12 send-qudo-btn-holder">
        {/* <a href="/qudo-schrijven.html" className="send-qudo-btn">Maak Qudo <img src="img/triangle-btn-up-white.svg"></a> */}
        <Link className='send-qudo-btn' to="/selecteerontvanger">Maak een Qudo <img src={Triangle} alt="" /></Link>
      </div>
    </div>
  </div>
  )
}

export default MaakQudo