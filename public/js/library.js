const toLibBtn = document.getElementsByClassName('tolib-btn')[0];
const libraryShelf = document.getElementsByClassName('library-shelf')[0];
const addToLibForm = document.getElementsByClassName('add-to-lib-form')[0];

function setLibChordProps(chord, data) {
  step.classList.add('lib-chord');
  step.setAttribute('data-mode', mode);
  step.setAttribute('data-noteids', data[0]);
  step.setAttribute('data-fretnums', data[1]);
}

function addToLibrary() {
  let noteids = collectNotes()[0].split(',');
  for (let i = 0; i < noteids.length; i++) {
    let noteidsInput = document.createElement('input');
    noteidsInput.classList.add('lib-noteids-input');
    noteidsInput.setAttribute('name', 'noteids');
    noteidsInput.value = noteids[i];
    addToLibForm.appendChild(noteidsInput);
  }
}

function populateLibrary(json) {
  json.chords.forEach(chord => {
    const libChord = document.createElement('div');
    libChord.classList.add('lib-chord');
    libChord.innerHTML = chord.name;
    libChord.setAttribute('noteids', chord.noteids.join(','));
    libraryShelf.appendChild(libChord);
  });
}

function fetchLibrary() {
  fetch('/library')
    .then(res => { return res.json() })
    .then(data => { populateLibrary(data) })
}

toLibBtn.addEventListener('click', () => { addToLibrary() });

window.onload = fetchLibrary();
