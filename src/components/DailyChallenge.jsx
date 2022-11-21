import React, { useState } from 'react'
import Triangle from '../img/triangle-btn-blue.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const DailyChallenge = () => {
  const [show, toggleShow] = useState(false);

  const onCompleted = (state) => {
    toggleShow(!show);

    // hier logica om de challenge te verwijderen uit de database wanneer de challenge is voltooid
  }
  

  return (
    <>
      <div className="container daily-challenge" onClick={() => toggleShow(true)}>
        <div className="row">
          <div className="col-sm-12 daily-challenge-holder">
            <div className="daily-challenge shadow-block blue-shadow">
              <h3 className="block-title"><span className="small-title">Daily</span> Challenge</h3>
              <span className="triangle-btn triangle-btn-blue"><img src={Triangle} alt='triangle' /></span>
            </div>
          </div>
        </div>
      </div>

      {show && (
        <div className="container daily-challenge-block">
          <div className="row">
            <div className="col-sm-12 dc-popup-holder">
              <div className="dc-popup col-sm-8 shadow-block blue-shadow">
                <h3>Daily challenge</h3>

                <div id="challengeText">Hallo</div>
                <div className="dc-btns">
                  <button className="btn btn-afgerond" onClick={() => onCompleted(true)}>Afgerond</button>
                  <button className="btn sec-btn" onClick={() => onCompleted(false)}>Annuleren</button>
                </div>

                <FontAwesomeIcon icon={faXmark} className="close-btn-dc-popup" onClick={() => toggleShow(false)}/>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DailyChallenge