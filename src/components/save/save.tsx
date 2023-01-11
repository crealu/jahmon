import * as React from 'react';
import './save.css';
import { useAppSelector } from '../../hooks';
import { isSavingSong, isSavingStep } from '../../slices/view-slice';
import SaveSong from './savesong/savesong';
import SaveStep from './savestep/savestep';

export const Save: React.FC = () => {
  const saveSong = useAppSelector(isSavingSong);
  const saveStep = useAppSelector(isSavingStep);

  const getStyle = () => {
    return saveSong || saveStep ? 'block' : 'none';
  }

  return (
    <div className="save-form modal" style={{display: getStyle()}}>
      {saveSong ? <SaveSong /> : <SaveStep />}
    </div>
  )
}

export default Save;
