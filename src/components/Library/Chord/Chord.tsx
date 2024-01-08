import * as React from 'react';
import './Chord.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import {
  setGrabbed,
  setDiagramNotes,
  setDiagramName,
  setDiagramMode
} from '../../../slices/library-slice';

type ChordProps = {
  chord: object;
}

export const Chord: React.FC<ChordProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chord } = props;

  const placeNotes = (event) => {
    const noteIds = event.target.dataset.noteids.split(',');
    dispatch(setDiagramNotes(noteIds));
    dispatch(setDiagramName(event.target.textContent));
    dispatch(setDiagramMode('chord'));
  }

  const dragStartHandler = (event) => {
    const draggedChord = {
      name: event.target.dataset.name,
      noteids: event.target.dataset.noteids
    }
    dispatch(setGrabbed(draggedChord));
  }

  const dragHandler = (event) => { event.preventDefault() }

  return (
    <div
      className="library-chord"
      draggable="true"
      data-name={chord.name}
      data-noteids={chord.noteids.join(',')}
      onClick={(e) => placeNotes(e)}
      onDragStart={(e) => dragStartHandler(e)}
      onDrag={(e) => dragHandler(e)}
    >
      {chord.name}
    </div>
  )
}

export default Chord;
