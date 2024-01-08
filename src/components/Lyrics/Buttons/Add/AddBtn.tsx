import * as React from 'react';
import './AddBtn.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { useAppSelector } from '../../../../hooks';
import { theActiveLine, addLine } from '../../../../slices/lyrics-slice';

export const AddButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useAppSelector(theActiveLine);

  const addNewLine = () => {
    const newLine = { text: '...', panel: [{ chord: '', offset: ''}] };
    dispatch(addLine(newLine))
  }

  return (
    <div className="lyrics-btns-wrapper">
      <img
        className="add-lyric-btn lyrics-btn"
        src="img/icons/seq-btn-gray/add.png"
        onClick={() => addNewLine()}
      />
    </div>
  )
}

export default AddButton;
