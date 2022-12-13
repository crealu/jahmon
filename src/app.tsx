import * as React from 'react';
import './app.css';
import Sequence from './components/sequence/sequence';
import Fretboard from './components/fretboard/fretboard';
import Eye from './components/fretboard/eye';
import Lyrics from './components/lyrics/lyrics';
import Library from './components/library/library';
import SequencesDB from './components/seqdb/seqdb';
import Save from './components/save/save';
import Settings from './components/settings/settings';
import Print from './components/print/print';
import { useAppSelector } from './hooks';
import { isPrinting } from './slices/view-slice';

export const App: React.FC = () => {
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
      <Save />
      <Settings />
      <Print />
    </div>
  )
}

export default App;
