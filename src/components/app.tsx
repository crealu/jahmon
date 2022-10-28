import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { sequenceName, changeSequenceName } from '../slices/sequence-slice';
import axios from 'axios';

import './app.css';

export const App: React.FC = (): React.ReactElement => {
  const name = useAppSelector(sequenceName);
  const dispatch = useDispatch<AppDispatch>();
  const [theSaved, setTheSaved] = useState([]);

  const changeName = (e) => { dispatch(changeSequenceName(e.target.value)) }

  async function postHandler() {
    const res = await axios.post('/save-type', { name: name }).then().catch();
    console.log(res);
  }

  function getHandler() {
    axios.get('/save-get-type')
      .then(res => { setTheSaved(res.data) })
      .catch(err => { throw err });
  }

  function deleteHandler() {
    axios.get('/save-get-type')
      .then(res => { setTheSaved(res.data) })
      .catch(err => { throw err });
  }

  const returnSaved = () => {
    return theSaved.map((s) => {
      return (
        <div className="saved-wrapper">
          <div className="saved">{s.name}</div>
          <span className="delete-btn" onClick={deleteHandler}>x</span>
        </div>
      )
    })
  }

  getHandler();

  return (
    <div>
      <h1>Welcome</h1>
      <p>{name}</p>
      <input onChange={(e) => { changeName(e) }}/>
      <button onClick={postHandler}>Post</button>
      <div>{returnSaved()}</div>
    </div>
  )
}
