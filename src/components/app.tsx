import * as React from 'react';
import Sequence from './sequence/sequence';
import Fretboard from './fretboard/fretboard';
import Lyrics from './lyrics/lyrics';
import Library from './library/library';
import SequencesDB from './seqdb/seqdb';
import SaveForm from './saveform/saveform';
import Settings from './settings/settings';
import './app.css';

export const App: React.FC = () => {
  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col">
        <Fretboard />
        <Sequence />
        <Lyrics />
      </div>
      <div className="jahmon-ui-col">
        <Library />
        <SequencesDB />
      </div>
      <SaveForm />
      <Settings />
    </div>
  )
}

export default App;
