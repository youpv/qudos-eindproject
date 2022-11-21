import React from 'react'

const MoodMeter = () => {
  return (
    <div className="container mood-meter-block">
      <div className="row">
        <div className="col-sm-12 mood-meter-holder">
          <div className="mood-meter shadow-block blue-shadow">

            <p>Hoe voel je je vandaag?</p>

            <div className="mood-meter-btns">
              <input type="radio" name="mood" id="moodBlij" value="&#128516;" />
              <label className="mood" htmlFor="moodBlij">&#128516;</label>
              <input type="radio" name="mood" id="moodBoos" value="&#128545;" />
              <label className="mood" htmlFor="moodBoos">&#128545;</label>
              <input type="radio" name="mood" id="moodVerdrietig" value="&#128546;" />
              <label className="mood" htmlFor="moodVerdrietig">&#128546;</label>
              <input type="radio" name="mood" id="moodVerward" value="&#128565;" />
              <label className="mood" htmlFor="moodVerward">&#128565;</label>
              <input type="radio" name="mood" id="moodMoe" value="&#128564;" />
              <label className="mood" htmlFor="moodMoe">&#128564;</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MoodMeter