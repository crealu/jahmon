import * as React from 'react';
import './sequence.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { currentTitle, currentSeq } from '../../slices/sequence-slice';

const SequenceTitle = () => {
  const title = useAppSelector(currentTitle);

  return (
    <div className="section-title" data-isnew="new">
      {title == '' ? 'untitled' : title}
    </div>
  )
}

export const Sequence: React.FC = (): React.ReactElement => {
  const seq = useAppSelector(currentSeq);
  const [steps, setSteps] = useState(seq);
  const [activeStep, setActiveStep] = useState(0);

  function updateActiveStep(step, propers, idx) {
    console.log(step);
    let steps = document.getElementsByClassName('seq-step');
    for (let s = 0; s < steps.length; s++) {
      steps[s].style.background = 'none';
    }
    step.style.background = 'white';
    clearFretboard();
    populateFretboard(step, propers);
    setActiveStep(step.dataset.stepnum);
    // activeStep = step.dataset.stepnum;
  }

  function clearFretboard() {
    const noteBubbles = document.getElementsByClassName('note-bubble-fret');
    const fretNotes = document.getElementsByClassName('fret-note');

    for (let fn = 0; fn < fretNotes.length; fn++) {
      fretNotes[fn].style.display = 'none';
    }

    for (let nb = 0; nb < noteBubbles.length; nb++) {
      noteBubbles[nb].style.display = 'none';
    }

    for (let n = 0; n < noteBubbles.length; n++) {
      noteBubbles[n].remove();
    }
  }

  function populateFretboard(step, propers) {
    toggleMode(step.data.mode);
    const noteIds = propers.noteids.split(',');
    let fretnums, trueFretnums;

    if (propers.mode == 'riff') {
      fretnums = propers.fretnums.split(',');
      trueFretnums = fretnums.filter((fretnum) => fretnum != '');
    }

    placeNotes(step, noteIds, trueFretnums);
  }

  function placeNotes(step, noteIds, trueFretnums) {
    const fretNotes = document.getElementsByClassName('fret-note');
    console.log(noteIds, fretNotes)
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          console.log(noteIds[n], fretNotes[fn]);
          // console.log(fretNotes[fn].data.noteid)
          // if (step.dataset.mode == 'chord') {
            fretNotes[fn].style.display = 'block';
          // }
        }
      }
    }
  }

  function toggleMode(newMode) {
    let riffNumbers = document.getElementsByClassName('riff-numbers')[0];
    if (newMode == 'riff') {
      setModeStyle('rgba(0, 0, 0, 0)', '0');
      riffNumbers.style.opacity = '1';
      chordBtn.style.background = 'var(--skel_sel_color)';
      riffBtn.style.background = 'var(--skel_bg_color)';
    } else if (newMode == 'chord') {
      setModeStyle('lightgray', '1');
      riffNumbers.style.opacity = '0';
      chordBtn.style.background = 'var(--skel_bg_color)';
      riffBtn.style.background = 'var(--skel_sel_color)';
    }
    mode = newMode;
  }

  function setModeStyle(fretBorder, circleOpacity) {
    let frets = document.getElementsByClassName('fret');
    let fretCircles = document.getElementsByClassName('fret-circle');
    for (let f = 0; f < frets.length; f++) {
      frets[f].style.borderLeft = '1px solid ' + fretBorder;
    }
    for (let fc = 0; fc < fretCircles.length; fc++) {
      fretCircles[fc].style.opacity = circleOpacity;
    }
  }

  return (
    <div className="sequence">
      <div className="sequence-top">
        <SequenceTitle />
        <div className="sequence-btn-wrapper">
          <img className="sequence-btn delete-btn" src="img/icons/delete-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/clear-btn-gray.png"/>
          <img className="sequence-btn" src="img/icons/save-btn-gray.png"/>
        </div>
      </div>
      <div className="steps-wrapper">
        {seq.map((step, i) => {
          return (
              <div
                className="seq-step"
                onClick={(e) => { updateActiveStep(e.target, {
                  noteids: step.noteids,
                  mode: step.mode,
                  fretnums: step.fretnums
                }, i)}}
              >
                {step.title}
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Sequence;
