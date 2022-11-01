import * as React from 'react';
import './fretboard.css';

const TheFretboard = () => {
  const strings = new Array(6).fill(0);
  const frets = new Array(22).fill(0);

  const returnFrets = (sn) => {
    return (
      <div className="string-row">
        <div className="string-div"></div>
        <div className="fret-open" data-noteid={`s${sn + 1}f0`}></div>
        {frets.map((fret, fn) => {
          return (
            <div className="fret">
              <div className="fret-note" data-noteid={`s${sn}f${fn}`}></div>
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
          <img className="sequence-btn add-btn" src="img/icons/add-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
        </div>
        <div className="mode-wrapper">
          <p className="mode-title mode-toggle">Mode</p>
          <img className="mode-trail mode-toggle" src="img/icons/mode-trail-chord.png"/>
          <div className="mode-type-wrapper mode-toggle">
            <div className="mode-toggle-btn chord-btn" onClick="">Chord</div>
            <div className="mode-toggle-btn riff-btn">Riff</div>
          </div>
        </div>
        <div className="seq-step-name"></div>
      </div>
      <TheFretboard />
    </div>
  )
}

export default Fretboard;
