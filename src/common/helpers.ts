export const clearFretboard = () => {
  const fretNotes = document.getElementsByClassName('fret-note');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
    fretNotes[fn].style.background = 'red';
  }
}

export const clearRiffs = () => {
  const allRiffs = document.getElementsByClassName('riff-note');
  while (allRiffs.length > 0) {
    for (let ar = 0; ar < allRiffs.length; ar++) {
      allRiffs[ar].remove();
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

export const collectChordNotes = () => {
  let notes = document.getElementsByClassName('fret-note');
  let noteids = [];
  for (let n = 0; n < notes.length; n++) {
    if (notes[n].style.display == 'block') {
      noteids.push(notes[n].dataset.noteid);
    }
  }
  return [noteids.join(','), '']
}

export const collectRiffNotes = () => {
  let notes = document.getElementsByClassName('riff-note');
  let noteids = [];
  let fretnums = [];
  for (let n = 0; n < notes.length; n++) {
    console.log(notes[n])
    noteids.push(notes[n].dataset.noteid);
    fretnums.push(notes[n].textContent);
  }
  return [noteids.join(','), fretnums.join(',')]
}

export const codifySnapshot = (snapshot) => {
  let arr = [], strArr = [];
  snapshot.forEach(id => {
    arr.push(parseInt(id.replace('s', '').replace('f', '')));
  });
  strArr = arr.sort().map(id => { return id.toString() });
  return parseInt(strArr.join(''));
}

export const convertChordIds = (tchords) => {
  let chordIds = [];
  let arr = [], strArr = [];
  tchords.forEach(chord => {
    arr = [];
    chord.noteids.forEach(noteid => {
      arr.push(parseInt(noteid.replace('s', '').replace('f', '')))
    })
    strArr = arr.sort().map(id => { return id.toString() })
    chordIds.push(parseInt(strArr.join('')));
  })
  return chordIds.join(',');
}

export const scrollSteps = (event) => {
  if (event.deltaY > 0) {
    event.target.parentNode.parentNode.scrollLeft += 40;
  } else {
    event.target.parentNode.parentNode.scrollLeft -= 40;
  }
}

export const refresh = () => { location.reload() }

// const resetFretNotes = () => {
//   const riffFretNotes = document.getElementsByClassName('riff-note');
//   for (let n = 0; n < riffFretNotes.length; n++) {
//     riffFretNotes[n].addEventListener('dragstart', (event) => {
//       dispatch(setRiffen(event.target));
//     });
//   }
// }
