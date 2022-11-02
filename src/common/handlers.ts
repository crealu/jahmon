export const placeNoteHandler = (e) => {
  console.log(e.target.children[0].dataset.noteid);
}

export const clearFretboard = () => {
  const fretNotes = document.getElementsByClassName('fret-note');
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
    fretNotes[fn].style.background = 'red';
    fretNotes[fn].textContent = '';
    fretNotes[fn].classList.remove('riff-note');
  }
}

export const refresh = () => { location.reload() }
