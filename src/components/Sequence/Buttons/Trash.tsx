import * as React from 'react';
import './Buttons.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';

export const Trash: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const checkTarget = (target, movedStep) => {
    if (event.target.classList[0] == 'lyrics-trash-btn') {
      target.parentNode.appendChild(movedStep);
      target.parentNode.removeChild(movedStep);
    } else {
      target.appendChild(movedStep);
      target.removeChild(movedStep);
    }
  }

  const dropHandler = (event) => {
    event.preventDefault();
    const movedPanelStep = document.getElementsByClassName('moved-panel-chord')[0];
    const payload = {
      number: movedPanelStep.parentNode.tabIndex,
      step: movedPanelStep.textContent
    }
    checkTarget(event.target, movedPanelStep);
    dispatch(deletePanelStep(payload));
  }

  const dragOverHandler = (event) => { event.preventDefault() }

  return (
    <div
      className="sequence-btn"
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
    >
      <img
        className="lyrics-trash-btn"
        src="img/icons/seq-btn-gray/trash.png"
      />
    </div>
  )
}

export default Trash;
