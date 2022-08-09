const fretboard = document.getElementsByClassName('fretboard')[0];
const topbar = document.getElementsByClassName('topbar')[0];
const setBtn = document.getElementsByClassName('set-btn')[0];
const clearBtn = document.getElementsByClassName('clear-btn')[0];
const finishBtn = document.getElementsByClassName('finish-btn')[0];
const clearTopbarBtn = document.getElementsByClassName('clear-topbar-btn')[0];
const fretNotes = document.getElementsByClassName('fret-note');
const sequences = document.getElementsByClassName('saved-sequence');

let stepQuantity = 0;
let mode = 'chord';

function createFretboard() {
  const stringQuantity = 6;
  for (let stringNum = 0; stringNum < stringQuantity; stringNum++) {
    let stringRow = document.createElement('div');
    let stringDiv = document.createElement('div');
    stringRow.classList.add('string-row');
    stringDiv.classList.add('string-div');
    stringRow.appendChild(stringDiv);
    addFrets(stringRow, stringNum);
    fretboard.appendChild(stringRow);
  }
}

function addFrets(stringRow, stringNum) {
  const fretQuantity = 20;
  for (let fretNum = 0; fretNum < fretQuantity; fretNum++) {
    let fret = document.createElement('div');
    let note = document.createElement('div');
    let noteID = 's' + (6 - stringNum) + 'f' + fretNum;
    fret.classList.add('fret');
    note.classList.add('fret-note');
    note.setAttribute('data-noteid', noteID);
    fret.appendChild(note);
    addFretControls(fret);
    stringRow.appendChild(fret);
  }
}

function addFretControls(fret) {
  fret.addEventListener('click', () => {
    console.dir(fret);
    if (fret.children[0].style.display == 'block') {
      fret.children[0].style.display = 'none';
    } else {
      fret.children[0].style.display = 'block';
    }
  });
}

function addStepToSequence() {
  let seq = document.createElement('div');
  seq.classList.add('seq-step');
  console.dir(fretNotes);
  let ids = collectStepNotes();
  seq.setAttribute('data-noteids', ids);
  seq.addEventListener('click', () => { populateFretboard(seq) });
  topbar.appendChild(seq);
  seq.innerHTML = 'Step ' + stepQuantity;
  stepQuantity++;
}

function collectStepNotes() {
  let noteIds = [];
  for (let fn = 0; fn < fretNotes.length; fn++) {
    if (fretNotes[fn].style.display == 'block') {
      noteIds.push(fretNotes[fn].dataset.noteid);
    }
  }
  console.log(noteIds);
  return noteIds.join(',');
}

function populateFretboard(seq) {
  clearFretboard();
  let noteIds = seq.dataset.noteids.split(',');
  for (let n = 0; n < noteIds.length; n++) {
    for (let fn = 0; fn < fretNotes.length; fn++) {
      if (noteIds[n] == fretNotes[fn].dataset.noteid) {
        fretNotes[fn].style.display = 'block';
      }
    }
  }
}

function clearFretboard() {
  for (let fn = 0; fn < fretNotes.length; fn++) {
    fretNotes[fn].style.display = 'none';
  }
}

function finishSequence() {
  const sequence = document.getElementsByClassName('seq-step');
  let allIds = [];
  let allSteps = [];
  for (let s = 0; s < sequence.length; s++) {
    allIds.push(sequence[s].dataset.noteids);
    allSteps.push(sequence[s].textContent);
  }
  let savableIds = allIds.join('.');
  let savableSteps = allSteps.join('.');
  let noteidsInput = document.getElementsByClassName('noteids-input')[0];
  let sequenceInput = document.getElementsByClassName('sequence-input')[0];
  console.dir(noteidsInput);
  noteidsInput.value = savableIds;
  sequenceInput.value = savableSteps;
  document.getElementsByClassName('save-form')[0].style.display = 'block';
}

setBtn.addEventListener('click', () => { addStepToSequence() });
clearBtn.addEventListener('click', () => { clearFretboard() });
finishBtn.addEventListener('click', () => { finishSequence() });
clearTopbarBtn.addEventListener('click', () => { clearTopbar() });

function populateSequence(sequence) {
  clearFretboard();
  clearTopbar();
  let noteidsData = sequence.dataset.noteids;
  let stepsData = sequence.dataset.sequence;

  let noteids = noteidsData.split('.');
  let steps = stepsData.split('.');
  stepQuantity = steps.length;

  for (let n = 0; n < noteids.length; n++) {
    let seq = document.createElement('div');
    seq.classList.add('seq-step');
    seq.setAttribute('data-noteids', noteids[n]);
    seq.addEventListener('click', () => { populateFretboard(seq) });
    topbar.appendChild(seq);
    seq.innerHTML = steps[n];
  }
}

for (let z = 0; z < sequences.length; z++) {
  sequences[z].addEventListener('click', () => {
    populateSequence(sequences[z]);
  });
}

function clearTopbar() {
  while (topbar.firstChild) {
    topbar.removeChild(topbar.firstChild);
  }
  stepQuantity = 0;
}

window.onload = createFretboard();
