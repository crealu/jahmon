import * as React from 'react';
import './gig.css';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../hooks';

export const Gig: React.FC = () => {
  return (
    <div className="gig">
      Gig screen
    </div>
  )
}

export default Gig;
