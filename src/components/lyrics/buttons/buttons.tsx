import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { theActiveLine, updateAllLines, addLine, deleteLine, deletePanelStep } from '../../../slices/lyrics-slice';
import { setCurrentScreen } from '../../../slices/view-slice';
import axios from 'axios';
import './buttons.css';

export const Buttons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const active = useAppSelector(theActiveLine);

  const addNewLine = () => {
    const newLine = { text: '...', panel: [{ chord: '', offset: ''}] };
    dispatch(addLine(newLine))
  }

  const deleteThisLine = (event) => {
    console.log(event.target.previousSibling.value)
    dispatch(deleteLine(event.target.previousSibling.value));
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

export default Buttons;
