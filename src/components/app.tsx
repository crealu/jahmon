import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { sequenceName, changeSequenceName } from '../slices/sequence-slice';
import axios from 'axios';

import './app.css';

export const App: React.FC = (): React.ReactElement => {
  const name = useAppSelector(sequenceName);
  const dispatch = useDispatch<AppDispatch>();

  const changeName = (e) => { dispatch(changeSequenceName(e.target.value)) }

  async function buttonHandler2() {
    const res = await axios.post('/save-type', { name });
    console.log(res);
  }

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
      <button onClick={buttonHanlder2}>Req</button>
    </div>
  )
}
