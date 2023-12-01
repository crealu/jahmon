import * as React from 'react';
import { useState, useEffect } from 'react';
import { theChords } from '../../slices/library-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import Diagram1 from '../../components/Diagram/Diagram1';
import './chordbook.css';

export const ChordBook: React.FC = () => {
	const [allChords, setAllChords] = useState(JSON.parse(localStorage.chords));
	// const [chords, setChords] = useState(theChords);
	const dispatch = useDispatch<AppDispatch>();
	const chords = useAppSelector(theChords);


	useEffect(() => {
		// console.log(JSON.parse(localStorage.chords))
		// let theChords = JSON.parse(localStorage.chords);
		// setAllChords(theChords);
		console.log(allChords[0]);
		console.log(chords);
	});

	return (
		<div className="chordbook">
			{/*<Diagram1 step={allChords[0]} idx={0} />*/}
			{allChords.map(chord => {
				return (
					<div className="diagram-wrapper">
						<Diagram1 step={chord} idx={0} />
					</div>
				)
			})}

		</div>
	)
}

export default ChordBook;