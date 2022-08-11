const fretboard = document.getElementsByClassName('fretboard')[0];
const topbar = document.getElementsByClassName('sequence-wrapper')[0];
const currentTitle = document.getElementsByClassName('current-title')[0];
const setBtn = document.getElementsByClassName('set-btn')[0];
const clearBtn = document.getElementsByClassName('clear-btn')[0];
const finishBtn = document.getElementsByClassName('finish-btn')[0];
const clearTopbarBtn = document.getElementsByClassName('clear-topbar-btn')[0];
const fretNotes = document.getElementsByClassName('fret-note');
const sequences = document.getElementsByClassName('saved-sequence');
const newSequence = document.getElementsByClassName('new-sequence')[0];

let stepQuantity = 0;
let mode = 'chord';
let activeStep = 0;
let stepSelected = false;

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
    if (fret.children[0].style.display == 'block') {
      fret.children[0].style.display = 'none';
    } else {
      fret.children[0].style.display = 'block';
    }
  });
}

function setActiveStep(step) {
  let steps = document.getElementsByClassName('seq-step');
  for (let s = 0; s < steps.length; s++) {
    steps[s].style.background = 'white';
  }
  if (activeStep == step.dataset.step) {
    stepSelected = !stepSelected;
  } else {
    stepSelected = true;
    populateFretboard(step);
    step.style.background = 'green';
    activeStep = step.dataset.step;
  }
}

function addSeqStep() {
  let ids = collectStepNotes();
  let step = document.createElement('div');
  step.classList.add('seq-step');
  step.setAttribute('data-noteids', ids);
  step.setAttribute('data-step', stepQuantity + 1);
  step.addEventListener('click', () => { setActiveStep(step) });
  topbar.appendChild(step);
  step.innerHTML = 'Step ' + stepQuantity;
  stepQuantity++;
}

function updateSeqStep() {
  let step = document.getElementsByClassName('seq-step')[activeStep - 1];
  let ids = collectStepNotes();
  step.dataset.noteids = ids;
}

function collectStepNotes() {
  let noteIds = [];
  for (let fn = 0; fn < fretNotes.length; fn++) {
    if (fretNotes[fn].style.display == 'block') {
      noteIds.push(fretNotes[fn].dataset.noteid);
    }
  }
  return noteIds.join(',');
}

function populateFretboard(step) {
  clearFretboard();
  let steps = document.getElementsByClassName('seq-step');
  let noteIds = step.dataset.noteids.split(',');
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
  noteidsInput.value = savableIds;
  sequenceInput.value = savableSteps;
  document.getElementsByClassName('save-form')[0].style.display = 'block';
}

function startNewSequence() {
  clearTopbar();
  clearFretboard();
  currentTitle.textContent = 'untitled';
  stepSelected = false;
}

setBtn.addEventListener('click', () => {
  // setSelected ? updateSeqStep() : addSeqStep();
  if (stepSelected) {
    updateSeqStep();
  } else {
    addSeqStep();
  }
});
clearBtn.addEventListener('click', () => { clearFretboard() });
finishBtn.addEventListener('click', () => { finishSequence() });
clearTopbarBtn.addEventListener('click', () => { clearTopbar() });
newSequence.addEventListener('click', () => { startNewSequence() });

function populateSequence(sequence) {
  clearFretboard();
  clearTopbar();
  let noteids = sequence.dataset.noteids.split('.');
  let steps = sequence.dataset.steps.split('.');
  currentTitle.textContent = sequence.children[0].textContent;
  stepQuantity = steps.length;

  for (let n = 0; n < noteids.length; n++) {
    let step = document.createElement('div');
    step.classList.add('seq-step');
    step.setAttribute('data-noteids', noteids[n]);
    step.setAttribute('data-step', n + 1);
    step.addEventListener('click', () => { setActiveStep(step) });
    topbar.appendChild(step);
    step.innerHTML = steps[n];
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
