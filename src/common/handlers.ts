export const clearFretboard = () => {
  const fretNotes = document.getElementsByClassName('fret-note');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
    fretNotes[fn].style.background = 'red';
  }
}

export const clearRiffs = () => {
  const allRiffs = document.getElementsByClassName('riff-note');
  for (let i = 0; i < 3; i++) {
    for (let ar = 0; ar < allRiffs.length; ar++) {
      setTimeout(() => {
         allRiffs[ar].parentNode.removeChild(allRiffs[ar])
      }, 50)
    }
  }
}

export const toggleRiffs = (displayValue) => {
  const allRiffs = document.getElementsByClassName('riff-note');
  for (let ar = 0; ar < allRiffs.length; ar++) {
    allRiffs[ar].style.display = displayValue;
  }
}

export const restyleSteps = (step) => {
  const steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].classList.remove('active-step');
  }
  step.classList.add('active-step');
}

export const unstyleActive = () => {
  const steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].classList.remove('active-step');
  }
}

export const refresh = () => { location.reload() }
