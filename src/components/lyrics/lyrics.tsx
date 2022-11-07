import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { inputTest, changeSequenceName } from '../../slices/sequence-slice';
import { lyricLines, updateLines } from '../../slices/lyrics-slice';
import axios from 'axios';
import './lyrics.css';
import Line from './line/line';

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

export const Lyrics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const name = useAppSelector(inputTest);
  const lines = useAppSelector(lyricLines);
  const [lineWidth, setLineWidth] = useState(100);
  const [currentBar, setCurrentBar] = useState(0);

  const changeName = (e) => {
    const textWidth = context.measureText(e.target.value).width;
    const factor = textWidth / 2.3;
    e.target.style.width = textWidth + factor + 'px';
    console.log(textWidth);
    setLineWidth(textWidth + factor);
    console.log(theSaved);
  }

  const changeBar = (idx) => { setCurrentBar(idx) };

  const postHandler = async () => {
    const res = await axios.post('/api-save-type', { name: name }).then().catch();
  }

  const getHandler = () => {
    axios.get('/api-get-type')
      .then(res => { dispatch(updateLines(res.data)) })
      .catch(err => { throw err });
  }

  async function deleteHandler(event) {
    // const nameToDelete = document.getElementsByClassName('saved')[idx].textContent;
    const nameToDelete = event.target.prevSibling.textContent;
    console.log(nameToDelete)
    const res = await axios.post('/api-delete-type', { name: nameToDelete }).then().catch();
    console.log(res);
  }

  useEffect(() => {
    getHandler();
  }, []);

  const returnLines = () => {
    return lines.map((s, i) => {
      return (
        <div className="lyric-wrapper">
          <Line width={lineWidth} />
          <input
            className="lyric-input"
            onChange={(e) => { changeName(e) }}
            onClick={(e) => { changeBar(i) }}
            placeholder={s.name}
          />
        </div>
      )
    })
  }

  return (
    <div className="lyrics">
      <h3 className="section-title">Lyrics</h3>
      <div className="all-lyrics">{returnLines()}</div>
    </div>
  )
}

// <div className="saved">{s.name}</div>
// <span className="delete-btn" onClick={(e) => { deleteHandler(e) }}>x</span>
// <div className="lyric-line" style={{width: lineWidth + 'px'}}></div>

// <div className="lyric-line" style={{width: lineWidth + 'px'}}></div>
// <input className="lyric-input" onChange={(e) => { changeName(e) }}/>
// <div style={{display: 'none', position: 'absolute', bottom: '100px'}}>
//   <p>{name}</p>
//   <input onChange={(e) => { changeName(e) }}/>
//   <button onClick={postHandler}>Post</button>
//   <div>{returnSaved()}</div>
// </div>

export default Lyrics;
