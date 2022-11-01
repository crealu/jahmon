import * as React from 'react';
import './fretboard.css';

export const TheFretboard = () => {
  const strings = new Array(6).fill(0);
  const frets = new Array(22).fill(0);

  const returnStringClass = (sn) => {
    return `string-row ${ sn == 0 ? ' small-e-string' : sn == 5 ? ' big-e-string' : ''}`;
  }

  const toggleNote = (el) => {
    el.style.display = el.style.display == 'block' ? 'none' : 'block';
  }

  const placeNote = (e) => {
    e.target.children[0] ? toggleNote(e.target.children[0]) : toggleNote(e.target);
  }

  return (
    <div className="the-fretboard">
      {strings.map((string, sn) => {
        return (
          <div className={returnStringClass(sn)}>
            <div className="string-div"></div>
            <div className="fret-open" data-noteid={`s${sn + 1}f0`}></div>
            {frets.map((fret, fn) => {
              return (
                <div className="fret" onClick={(e) => placeNote(e)}>
                  <div className="fret-note" data-noteid={`s${sn}f${fn}`}></div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default TheFretboard;
