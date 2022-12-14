import * as React from 'react';
import './base.css';
import Sequence from '../../components/sequence/sequence';
import Fretboard from '../../components/fretboard/fretboard';
import Eye from '../../components/fretboard/eye';
import Lyrics from '../../components/lyrics/lyrics';
import Library from '../../components/library/library';
import SequencesDB from '../../components/seqdb/seqdb';
import Save from '../../components/save/save';
import Settings from '../../components/settings/settings';

export const Base: React.FC = () => {
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
      <Save />
      <Settings />
    </div>
  )
}

export default Base;
