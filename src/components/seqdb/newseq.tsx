import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { setActiveSequence, setIsNew } from '../../slices/sequence-slice';
import { updateAllLines } from '../../slices/lyrics-slice';
import axios from 'axios';
import './seqdb.css';

export const NewSeqBtn: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const newSequence = (event) => {
    dispatch(setActiveSequence({title: 'untitled', steps: []}))
    dispatch(updateAllLines([
      {text: '...lyrics...', panel: [{chord: '', offset: ''}]}
    ]));
    dispatch(setIsNew(true));
  }

  return (
    <div
      className="db-sequence new-seq-btn"
      onClick={(e) => { newSequence(e) }}
    >
      <img
        className="new-seq-btn-img"
        src="img/icons/seq-btn-gray/add.png"
      />
      <p className="new-seq-btn-text">New</p>
    </div>
  )
}

export default NewSeqBtn;
