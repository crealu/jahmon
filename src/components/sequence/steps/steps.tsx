import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { useAppSelector } from '../../../hooks';
import { currentSeq } from '../../../slices/sequence-slice';
import { setMode } from '../../../slices/fretboard-slice';
import '../sequence.css';

export const Steps: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const seq = useAppSelector(currentSeq);
  const [steps, setSteps] = useState(seq);
  const [activeStep, setActiveStep] = useState(0);

  function updateActiveStep(step, propers, idx) {
    restyleSteps(step);
    clearFretboard();
    updateMode(propers.mode);
    populateFretboard(step, propers);
    setActiveStep(step.dataset.stepnum);
  }

  const updateMode = (mode) => { dispatch(setMode(mode)) };

  function restyleSteps(step) {
    const steps = document.getElementsByClassName('seq-step');
    for (let s = 0; s < steps.length; s++) {
      steps[s].classList.remove('active-step');
    }
    step.classList.add('active-step');
  }

  const clearFretboard = () => {
    const fretNotes = document.getElementsByClassName('fret-note');
    for (let fn = 0; fn < fretNotes.length; fn++) {
      fretNotes[fn].style.display = 'none';
      fretNotes[fn].style.background = 'red';
      fretNotes[fn].textContent = '';
    }
  }

  function populateFretboard(step, propers) {
    // toggleMode(step.dataset.mode);
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
    for (let n = 0; n < noteIds.length; n++) {
      for (let fn = 0; fn < fretNotes.length; fn++) {
        if (noteIds[n] == fretNotes[fn].dataset.noteid) {
          fretNotes[fn].style.display = 'block';
          // if (step.dataset.mode == 'chord') {
          // }
        }
      }
    }
  }


  // function toggleMode(newMode) {
  //   let riffNumbers = document.getElementsByClassName('riff-numbers')[0];
  //   if (newMode == 'riff') {
  //     setModeStyle('rgba(0, 0, 0, 0)', '0');
  //     riffNumbers.style.opacity = '1';
  //     chordBtn.style.background = 'var(--skel_sel_color)';
  //     riffBtn.style.background = 'var(--skel_bg_color)';
  //   } else if (newMode == 'chord') {
  //     setModeStyle('lightgray', '1');
  //     riffNumbers.style.opacity = '0';
  //     chordBtn.style.background = 'var(--skel_bg_color)';
  //     riffBtn.style.background = 'var(--skel_sel_color)';
  //   }
  //   mode = newMode;
  // }
  //
  // function setModeStyle(fretBorder, circleOpacity) {
  //   let frets = document.getElementsByClassName('fret');
  //   let fretCircles = document.getElementsByClassName('fret-circle');
  //   for (let f = 0; f < frets.length; f++) {
  //     frets[f].style.borderLeft = '1px solid ' + fretBorder;
  //   }
  //   for (let fc = 0; fc < fretCircles.length; fc++) {
  //     fretCircles[fc].style.opacity = circleOpacity;
  //   }
  // }

  return (
    <div className="steps-wrapper">
      {seq.map((step, i) => {
        return (
            <div
              className="seq-step"
              data-test="test"
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
  )
}

export default Steps;
