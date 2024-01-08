import * as React from 'react';
import { useState, useEffect } from 'react';
import Diagram from 'Diagram';
import './ChordBook.css';
// import axios from 'axios';

const musicKeys = [ 'A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];

export const ChordBook = () => {
	const [chords, setChords] = useState([]);
	const [selection, setSelection] = useState('s2f0');

  const updateChords = (data) => {
    console.log(data);
    chords = data;
    // setChords(data);
    // localStorage.setItem('chords', JSON.stringify(data));
  }

  const getChords = async () => {
  	await fetch('/api-get-lib')
  		.then(res => res.json())
  		.then(data => { updateChords(data) })
  		.catch(err => { throw err });
  }

  const renderChord = (chord) => {
  	return (
  		<div className="diagram-wrapper">
  			<Diagram step={chord} idx={0} />
  		</div>
  	)
  }

  const renderViewAll = (chords) => {
  	return (
			chords.map((chord, idx) => {
		  	return (
		  		<div className="diagram-wrapper">
		  			<Diagram step={chord} idx={idx} />
		  		</div>
		  	)
		  })
  	)
  }

  const chordFilter = (chord) => {
  	return chord.name.includes(selection);
  }

  const renderViewSelection = (chords) => {
  	const filtered = chords.filter(chord => chordFilter(chord))
  	return renderViewAll(filtered);
  }

  const renderKeys = () => {
  	return (
  		musicKeys.map((key, idx) => {
        return (
          <div
            className="nav-key"
            onClick={(e) => selectKey(e)}
            tabIndex={idx}
          >
            {key}
          </div>
        )
      })
    )
  }

  const selectKey = (event) => {
  	setSelection(event.target.textContent);
  }

	useEffect(() => {
		// console.log(chords);
		if (localStorage.getItem('chords')) {
			const theChords = JSON.parse(localStorage.getItem('chords'))
			setChords(theChords);
		} else {
			getChords();
		}
	}, []);

	return (
		<div className="chordbook">
			<p className="chords-title">Chords</p>

			<div className="selection-wrapper">
				<input 
					className="selection-input"
					value={selection}
					onChange={(e) => setSelection(e.target.value)}
				/>
			</div>
		  <div className="nav-keys">
        {musicKeys.map((key, idx) => {
          return (
            <div
              className="nav-key"
              onClick={(e) => selectKey(e)}
              tabIndex={idx}
            >
              {key}
            </div>
          )
        })}
      </div>

			<br/>
			<div className="chords">
				{/*{renderViewAll(chords)}*/}
				{renderViewSelection(chords)}
			</div>
		</div>
	)
}

export default ChordBook;