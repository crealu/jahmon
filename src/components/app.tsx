import * as React from 'react';
import Sequence from './sequence/sequence';
import Fretboard from './fretboard/fretboard';
import Lyrics from './lyrics/lyrics';
import Library from './library/library';
import SequencesDB from './seqdb/seqdb';
import './app.css';

export const App: React.FC = (): React.ReactElement => {
  return (
    <div className="jahmon-ui">
      <div className="jahmon-ui-col">
        <Sequence />
        <Fretboard />
        <Lyrics />
      </div>
      <div className="jahmon-ui-col">
        <Library />
        <SequencesDB />
      </div>
    </div>
  )
}

export default App;
