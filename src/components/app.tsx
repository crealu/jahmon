import * as React from 'react';
import Sequence from './sequence/sequence';
import Fretboard from './fretboard/fretboard';
import Eye from './fretboard/eye';
import Lyrics from './lyrics/lyrics';
import Library from './library/library';
import SequencesDB from './seqdb/seqdb';
import SaveForm from './saveform/saveform';
import Settings from './settings/settings';
import Print from './print/print';
import './app.css';

export const App: React.FC = () => {
  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col ui-left">
        <Library />
        <SequencesDB />
      </div>
      <div className="jahmon-ui-col ui-right">
        <Sequence />
        <Eye />
        <Fretboard />
        <Lyrics />
      </div>
      <SaveForm />
      <Settings />
      <Print />
    </div>
  )
}

export default App;
