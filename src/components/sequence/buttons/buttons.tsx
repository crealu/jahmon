import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import '../sequence.css';

export const Buttons: React.FC = (): React.ReactElement => {
  return (
    <div className="sequence-btn-wrapper">
      <img className="sequence-btn delete-btn" src="img/icons/delete-btn-gray.png"/>
      <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
      <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
    </div>
  )
}

export default Buttons;
