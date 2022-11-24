import React from "react";
import Triangle from '../img/triangle-btn-orange.svg'


const Sent = (props) => {
  const qudos = props.data;
    try {
      return (
        <div className="verstuurde-qudo shadow-block">
          <div className="profile-picture-holder">
            <img className="profile-picture" src={qudos[0].receiverInfo.receiverImg} alt="" />
            <p className="profile-current-mood">{qudos[0].receiverInfo.receiverMood}</p>
          </div>
          <div className="profile-info">
            <p className="profile-name">Naar: {qudos[0].receiverInfo.receiverName}</p>
            <p className="qudo-excerpt">{qudos[0].text}</p>
            <span className="triangle-btn triangle-btn-orange"><img src={Triangle} alt="" /></span>
          </div>
        </div>
      );
    } catch (error) {
      console.log(error);
    }
};

export default Sent;