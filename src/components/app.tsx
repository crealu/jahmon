import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { inputTest, changeSequenceName } from '../slices/sequence-slice';
import axios from 'axios';

import Sequence from './sequence/sequence';
import Fretboard from './fretboard/fretboard';
import Lyrics from './lyrics/lyrics';
import Library from './library/library';
import SequencesDB from './seqdb/seqdb';

import './app.css';

export const App: React.FC = (): React.ReactElement => {
  const name = useAppSelector(inputTest);
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

  async function deleteHandler(idx) {
    const nameToDelete = document.getElementsByClassName('saved')[idx].textContent;
    console.log(idx, nameToDelete)
    const res = await axios.post('/save-delete', { name: nameToDelete }).then().catch();
    console.log(res);
  }

  const returnSaved = () => {
    return theSaved.map((s, i) => {
      return (
        <div className="saved-wrapper">
          <div className="saved">{s.name}</div>
          <span className="delete-btn" onClick={() => { deleteHandler(i) }}>x</span>
        </div>
      )
    })
  }

  useEffect((theSaved) => {
    getHandler();
  }, [theSaved])

  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col">
        <Sequence />
        <Fretboard />
        <Lyrics />
      </div>
      <div className="jahmon-ui-col">
        <Library />
        <SequencesDB />
        <div style={{position: 'absolute', bottom: '100px'}}>
          <p>{name}</p>
          <input onChange={(e) => { changeName(e) }}/>
          <button onClick={postHandler}>Post</button>
          <div>{returnSaved()}</div>
        </div>
      </div>
    </div>
  )
}
