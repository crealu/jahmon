import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq, isSaving, seqIsNew, toggleSave } from '../../slices/sequence-slice';
import { refresh } from '../../common/handlers';
import axios from 'axios';
import './saveform.css';

export const SaveForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const saving = useAppSelector(isSaving);
  const title = useAppSelector(currentTitle);
  const steps = useAppSelector(currentSeq);
  const isNew = useAppSelector(seqIsNew);

  const saveSeqToDB = () => {
    const data = { title: title, steps: steps }
    const url = isNew ? '/save-seq' : '/save-update-seq';
    axios.post(url, data)
      .then(res => { console.log(res)})
      .catch(err => { throw err });
  }

  const hideForm = () => { dispatch(toggleSave(false)) };

  return (
    <div className="save-form" style={{display: saving ? 'block' : 'none'}}>
      <div>{title}</div>
      {steps.map(step => {
        return <div>{step.title}</div>
      })}
      <button onClick={saveSeqToDB}>Save</button>
      <div onClick={hideForm} >X</div>
    </div>
  )
}

export default SaveForm;
