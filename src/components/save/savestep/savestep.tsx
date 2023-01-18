import * as React from 'react';
import './SaveStep.css';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { toggleSaveStep } from '../../../slices/view-slice';
import { collectChordNotes } from '../../../common/helpers';
import axios from 'axios';

export const SaveStep: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState('');
  const [saveResponse, setSaveResponse] = useState('');

  const saveStep = () => {
    const noteids = collectChordNotes()[0].split(',');
    const data = { name: name, noteids: noteids };
    axios.post('/api-save-chord', data)
      .then(res => { setSaveResponse(res.data) })
      .catch(err => { throw err });
  };

  const updateName = (event) => { setName(event.target.value) };

  const cancel = () => { dispatch(toggleSaveStep(false)) };

  return (
    <div className="step-form-view form-view">
      <div className="name-wrapper">
        <div className="step-name-label">Name:</div>
        <input className="step-name-input" onChange={(e) => updateName(e)}/>
      </div>
      <div className="save-form-btns">
        <button
          className="save-btn save-form-btn"
          onClick={() => saveStep()}
        >
          Save
        </button>
        <button
          className="cancel-btn save-form-btn"
          onClick={() => cancel()}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default SaveStep;
