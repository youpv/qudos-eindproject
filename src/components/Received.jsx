import React from "react";
import Triangle from '../img/triangle-btn-orange.svg'


const Received = (props) => {
  const qudos = props.data;
    try {
      return (
        <div className="ontvangen-qudo shadow-block">
          <div className="profile-picture-holder">
            <img className="profile-picture" src={qudos[0].senderInfo.senderImg} alt="" />
            <p className="profile-current-mood">{qudos[0].senderInfo.senderMood}</p>
          </div>
          <div className="profile-info">
            <p className="profile-name">Van: {qudos[0].senderInfo.senderName}</p>
            <p className="qudo-excerpt">{qudos[0].text}</p>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
}


export default Received;