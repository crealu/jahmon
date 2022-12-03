import * as React from 'react';
import './app.css';
import Sequence from './sequence/sequence';
import Fretboard from './fretboard/fretboard';
import Eye from './fretboard/eye';
import Lyrics from './lyrics/lyrics';
import Library from './library/library';
import SequencesDB from './seqdb/seqdb';
import SaveForm from './saveform/saveform';
import Settings from './settings/settings';
import Print from './print/print';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { isPrinting } from '../slices/sequence-slice';

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const printing = useAppSelector(isPrinting);

  return (
    <div className="jahmon-ui">
      {printing ? '' :
        <div className="jahmon-ui-col ui-left">
          <Library />
          <SequencesDB />
        </div>
      }
      {printing ? '' :
        <div className="jahmon-ui-col ui-right">
          <Sequence />
          <Eye />
          <Fretboard />
          <Lyrics />
        </div>
      }
      <SaveForm />
      <Settings />
      <Print />
    </div>
  )
}

export default App;
