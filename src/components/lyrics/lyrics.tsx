import * as React from 'react';
import './lyrics.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { inputTest, changeSequenceName } from '../../slices/sequence-slice';
import axios from 'axios';

export const Lyrics: React.FC = (): React.ReactElement => {
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
    <div className="lyrics">
      <h3 className="section-title">Lyrics</h3>
      <div style={{position: 'absolute', bottom: '100px'}}>
        <p>{name}</p>
        <input onChange={(e) => { changeName(e) }}/>
        <button onClick={postHandler}>Post</button>
        <div>{returnSaved()}</div>
      </div>
    </div>
  )
}

export default Lyrics;
