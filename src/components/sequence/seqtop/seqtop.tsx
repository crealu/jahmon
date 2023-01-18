import * as React from 'react';
import './seqtop.css';
import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { setActionText, addStep } from '../../../slices/sequence-slice';
import { theSongTitle, setSongTitle } from '../../../slices/song-slice';
import { theDiagramNotes, theDiagramName, theDiagramMode } from '../../../slices/library-slice';
import Diagram from '../../Diagram/Diagram';
import Steps from '../steps/steps';
import { Step, Button } from '../../../common/classes';

export const SequenceTop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const songTitle = useAppSelector(theSongTitle);
  const diagramNotes = useAppSelector(theDiagramNotes);
  const diagramName = useAppSelector(theDiagramName);
  const diagramMode = useAppSelector(theDiagramMode);

  const updateTitle = (event) => { dispatch(setSongTitle(event.target.value)) }
  const addThisStep = () => { dispatch(addStep(newStep)) };
  const handleEnter = (event) => { dispatch(setActionText(event.target.alt)) };
  const handleLeave = () => { dispatch(setActionText('...')) };

  const newStep = useMemo(() => {
    // return new Step(diagramName, diagramMode, diagramNotes, '')
    return {
      title: diagramName,
      noteids: !diagramNotes[0] ? ',' : diagramNotes.join(','),
      mode: diagramMode,
      frenums: ''
    }
  }, [diagramName]);

  const addButton = useMemo(() => {
    return new Button('add-step-btn', 'add', 'Add chord', addThisStep);
  }, []);

  const diagramData = useMemo(() => {
    const title = diagramNotes[0] ? diagramName : '...';
    const noteids = diagramNotes[0] ? diagramNotes.join(',') : '';
    return new Step(title, 'chord', noteids, '');
  }, [diagramNotes]);

  return (
    <div className="sequence-top">
      <div className="sequence-top-left">
        <input
          className="sequence-title"
          onChange={(e) => updateTitle(e)}
          value={songTitle}
          placeholder="untitled"
        />
        <Steps />
      </div>
      <div className="diagram-view">
        <Diagram step={diagramData} idx={0} />
        <img
          className={addButton.classes}
          src={addButton.src}
          alt={addButton.action}
          onClick={() => addThisStep()}
          onMouseEnter={(e) => handleEnter(e)}
          onMouseLeave={() => handleLeave()}
        />
      </div>
    </div>
  )
}

export default SequenceTop;
