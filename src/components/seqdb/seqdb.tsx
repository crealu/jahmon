import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './seqdb.css';

export const SequencesDB: React.FC = (): React.ReactElement => {
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    axios.get('/save-get-type')
      .then(res => { setSequences(res.data) })
      .catch(err => { throw err });
  }, [])

  return (
    <div className="db-sequences">
      <h3 className="section-title" onClick={() => {console.log(sequences)}}>Sequences</h3>
      <div class="saved-sequences">
        {sequences.map(sequence => {
          return (
            <div className="db-sequence">
              {sequence.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SequencesDB;
