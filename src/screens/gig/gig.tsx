import * as React from 'react';
import './gig.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useAppSelector } from '../../hooks';
import { theSongs } from '../../slices/song-slice';
import Diagram from '../../components/Diagram/Diagram';
import ChordFret from '../print/chordfret';
import Wrapper from '../../components/Lyrics/Wrapper/Wrapper';
import Carousel from '../../components/Carousel/Carousel';

export const Gig: React.FC = () => {
  const sequences = useAppSelector(theSongs);

  return (
    <div className="gig">
      <Carousel />
      {sequences.map(sequence => {
        return (
          <div className="gig-sequence">
            <h3 className="gig-sequence-title">{sequence.title}</h3>
            <div className="gig-seq-steps-wrapper">
              <div className="gig-sequence-steps">
                {sequence.steps.map((step, idx) => {
                  return <ChordFret step={step} idx={idx} />
                })}
              </div>
            </div>
            <div className="gig-seq-lyrics-wrapper">
              <div className="gig-sequence-lyrics">
                {sequence.lyrics.map((lyric) => {
                  return <Wrapper lines={new Array(lyric)} />
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Gig;
