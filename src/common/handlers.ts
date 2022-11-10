export const placeNoteHandler = (e) => {
  console.log(e.target.children[0].dataset.noteid);
}

export const clearFretboard = () => {
  const fretNotes = document.getElementsByClassName('fret-note');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
    fretNotes[fn].style.background = 'red';
  }
}

export const clearRiffs = () => {
  const allRiffs = document.getElementsByClassName('riff-note');
  for (let ar = 0; ar < allRiffs.length; ar++) {
    allRiffs[ar].parentNode.removeChild(allRiffs[ar]);
  }
}

export const toggleRiffs = (displayValue) => {
  const allRiffs = document.getElementsByClassName('riff-note');
  for (let ar = 0; ar < allRiffs.length; ar++) {
    allRiffs[ar].style.display = displayValue;
  }
}

export const refresh = () => { location.reload() }
