import * as React from 'react';
import './fretboard.css';

const TheFretboard = () => {
  const strings = new Array(6).fill(0);
  const frets = new Array(22).fill(0);

  const returnFrets = (sn) => {
    return (
      <div className="string-row">
        <div class="string-div"></div>
        <div class="fret-open" data-noteid={`s${sn + 1}f0`}></div>
        {frets.map((fret, fn) => {
          return (
            <div className="fret">
              <div
                className="fret-note"
                data-noteid={`s${sn}f${fn}`}
              >
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="the-fretboard">
      {strings.map((string, sn) => { return returnFrets(sn) })}
    </div>
  )
}

export const Fretboard: React.FC = (): React.ReactElement => {
  return (
    <div className="fretboard">
      <div className="fretboard-top">
        <h3 className="section-title">Fretboard</h3>
        <div className="sequence-btn-wrapper">
          <img className="sequence-btn delete-btn" src="img/icons/delete-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
        </div>
      </div>
      <TheFretboard />
    </div>
  )
}

export default Fretboard;
