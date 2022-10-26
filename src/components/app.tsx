import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { sequenceName, changeSequenceName } from '../slices/sequence-slice';
import './app.css';

export const App: React.FC = (): React.ReactElement => {
  const name = useAppSelector(sequenceName);
  const dispatch = useDispatch<AppDispatch>();

  const changeName = (e) => { dispatch(changeSequenceName(e.target.value)) }

  const buttonHandler = () => {
    const theData = { name: name };
    const credentials = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(theData)
    };
    fetch('/save', credentials)
      .then(res => res.json())
      .catch(err => { throw err })
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>{name}</p>
      <input onChange={(e) => { changeName(e) }}/>
      <button onClick={buttonHanlder}>Req</button>
    </div>
  )
}
