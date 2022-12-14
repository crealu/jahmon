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

  const dropHandler = (event) => {
    event.preventDefault();
    const movedPanelStep = document.getElementsByClassName('moved-panel-chord')[0];
    if (event.target.classList[0] == 'lyrics-trash-btn') {
      console.log(event.target.parentNode);
      event.target.parentNode.appendChild(movedPanelStep);
      event.target.parentNode.removeChild(movedPanelStep);
    } else {
      event.target.appendChild(movedPanelStep);
      event.target.removeChild(movedPanelStep);
    }
    dispatch(deletePanelStep(movedPanelStep.textContent));
  }

  const dragOverHandler = (event) => {
    event.preventDefault();
  }

  const openPrintView = () => {
    dispatch(setCurrentScreen('print'))
  }

  return (
    <div className="lyrics-btns-wrapper">
      <img
        className="add-lyric-btn lyrics-btn"
        src="img/icons/seq-btn-gray/add.png"
        onClick={() => addNewLine()}
      />
      <div
        className="trash-wrapper lyrics-btn"
        onDrop={(e) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
      >
        <img
          className="lyrics-trash-btn"
          src="img/icons/trash-bin-gray.png"
        />
      </div>
      <img
        className="lyrics-btn print-btn"
        src="img/icons/seq-btn-gray/print.png"
        onClick={() => openPrintView()}
      />

    </div>
  )
}

export default Buttons;
